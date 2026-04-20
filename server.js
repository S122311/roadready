import "dotenv/config";
import express from "express";
import fs from "fs/promises";
import OpenAI from "openai";
import path from "path";
import QRCode from "qrcode";
import Stripe from "stripe";
import { fileURLToPath } from "url";

const app = express();
const port = Number(process.env.PORT || 3002);
const appUrl = process.env.APP_URL || `http://localhost:${port}`;
const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;
const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;
const stripePrices = {
  starter: process.env.STRIPE_PRICE_STARTER || "",
  fleet: process.env.STRIPE_PRICE_FLEET || "",
  enterprise: process.env.STRIPE_PRICE_ENTERPRISE || ""
};
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, "data");
const stateFile = path.join(dataDir, "roadready-state.json");
const emptyState = {
  activeCompanyId: "",
  companies: []
};

app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: false }));
app.use("/vendor", express.static(path.join(__dirname, "node_modules", "three", "build")));
app.use("/vendor", express.static(path.join(__dirname, "..", "node_modules", "three", "build")));
app.use(express.static(path.join(__dirname, "public")));

app.get("/health", (req, res) => {
  res.json({
    ok: true,
    appName: "RoadReady",
    date: new Date().toISOString()
  });
});

app.get("/api/state", async (req, res) => {
  res.json(await readState());
});

app.put("/api/state", async (req, res) => {
  const state = sanitizeState(req.body);
  await writeState(state);
  res.json({
    ok: true,
    state
  });
});

app.get("/api/qr", async (req, res) => {
  const data = String(req.query.data || "");
  if (!data) {
    res.status(400).json({ error: "QR data is required." });
    return;
  }

  try {
    const png = await QRCode.toBuffer(data, {
      margin: 1,
      width: 320,
      errorCorrectionLevel: "M",
      color: {
        dark: "#17202b",
        light: "#ffffff"
      }
    });
    res.type("png").send(png);
  } catch (error) {
    res.status(500).json({ error: error.message || "Could not generate QR code." });
  }
});

app.post("/api/billing/checkout", async (req, res) => {
  const { companyId, plan } = req.body || {};
  try {
    const session = await createCheckoutSession({ companyId, plan });
    res.json({ url: session.url });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message || "Could not create checkout session." });
  }
});

app.post("/create-checkout-session", async (req, res) => {
  const lookupKey = String(req.body.lookup_key || "");
  const companyId = String(req.body.company_id || "");
  try {
    const session = await createCheckoutSession({ companyId, plan: lookupKey });
    res.redirect(303, session.url);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message || "Could not create checkout session.");
  }
});

app.post("/api/billing/sync", async (req, res) => {
  if (!stripe) {
    res.status(503).json({ error: "Stripe is not configured." });
    return;
  }

  const { sessionId } = req.body || {};
  if (!sessionId) {
    res.status(400).json({ error: "A Checkout Session ID is required." });
    return;
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["subscription"]
  });
  const state = await readState();
  const company = state.companies.find((item) => item.id === session.metadata?.companyId || item.id === session.client_reference_id);
  if (!company) {
    res.status(404).json({ error: "Company not found." });
    return;
  }
  const subscriptionPlan = session.metadata?.plan || session.subscription?.metadata?.plan || company.subscription?.plan || "active";

  company.subscription = {
    plan: subscriptionPlan,
    status: session.subscription?.status || session.payment_status || "active",
    stripeCustomerId: session.customer || company.stripeCustomerId || "",
    stripeSubscriptionId: session.subscription?.id || ""
  };
  company.stripeCustomerId = company.subscription.stripeCustomerId;
  await writeState(state);
  res.json({ ok: true, state });
});

app.post("/api/inspections/summary", async (req, res) => {
  const { companyId, inspectionId } = req.body || {};
  const state = await readState();
  const company = state.companies.find((item) => item.id === companyId);
  const inspection = company?.inspections.find((item) => item.id === inspectionId);
  const truck = company?.trucks.find((item) => item.id === inspection?.truckId);

  if (!company || !inspection) {
    res.status(404).json({ error: "Inspection not found." });
    return;
  }

  if (!openai) {
    res.status(503).json({ error: "OpenAI is not configured. Add OPENAI_API_KEY to enable AI report summaries." });
    return;
  }

  const failed = (inspection.failed || []).join(", ") || "none";
  const checklist = Object.entries(inspection.checks || {})
    .map(([part, check]) => `${part}: ${check.value || "missing"}${check.note ? ` (${check.note})` : ""}`)
    .join("\n");

  const response = await openai.responses.create({
    model: process.env.OPENAI_MODEL || "gpt-5",
    instructions: "Write a concise fleet safety summary for a pre-road truck inspection. Include dispatch status, key failures, repair urgency, and what the manager should review. Use plain language.",
    input: [
      `Truck: ${truck?.name || "Unknown"} ${truck?.plate || ""}`,
      `Driver: ${inspection.driverName}`,
      `Inspector: ${inspection.inspectorName || inspection.inspectorCode || "Unknown"}`,
      `Status: ${inspection.status}`,
      `Failed parts: ${failed}`,
      "Checklist:",
      checklist
    ].join("\n")
  });

  inspection.aiSummary = response.output_text || "No AI summary returned.";
  inspection.aiSummaryCreatedAt = new Date().toISOString();
  await writeState(state);
  res.json({ summary: inspection.aiSummary, state });
});

app.listen(port, () => {
  console.log(`RoadReady listening on http://localhost:${port}`);
});

async function readState() {
  try {
    const raw = await fs.readFile(stateFile, "utf8");
    return sanitizeState(JSON.parse(raw));
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.warn("Could not read RoadReady state:", error.message);
    }
    await writeState(emptyState);
    return structuredClone(emptyState);
  }
}

async function writeState(state) {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(stateFile, JSON.stringify(state, null, 2));
}

async function createCheckoutSession({ companyId, plan }) {
  if (!stripe) {
    throw httpError(503, "Stripe is not configured. Add STRIPE_SECRET_KEY and Stripe price IDs or lookup keys in .env, then restart the server.");
  }

  if (!companyId || !plan) {
    throw httpError(400, "A valid company and subscription plan are required.");
  }

  const configuredPrice = stripePrices[plan];
  if (configuredPrice && !configuredPrice.startsWith("price_")) {
    throw httpError(400, `STRIPE_PRICE_${plan.toUpperCase()} must be a Stripe price ID that starts with price_.`);
  }

  const price = configuredPrice || await getStripePriceByLookupKey(plan);
  if (!price) {
    throw httpError(400, "A valid Stripe price ID or lookup key is required for this plan.");
  }

  const state = await readState();
  const company = state.companies.find((item) => item.id === companyId);
  if (!company) {
    throw httpError(404, "Company not found.");
  }

  const customer = company.stripeCustomerId
    ? { id: company.stripeCustomerId }
    : await stripe.customers.create({
        name: company.name,
        email: company.email || undefined,
        phone: company.phone || undefined,
        metadata: { companyId: company.id }
      });

  company.stripeCustomerId = customer.id;
  await writeState(state);

  return stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customer.id,
    line_items: [{ price, quantity: 1 }],
    client_reference_id: company.id,
    success_url: `${appUrl}/?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/?checkout=cancelled`,
    subscription_data: {
      metadata: { companyId: company.id, plan }
    },
    metadata: { companyId: company.id, plan }
  });
}

async function getStripePriceByLookupKey(lookupKey) {
  if (!lookupKey) {
    return "";
  }

  const prices = await stripe.prices.list({
    lookup_keys: [lookupKey],
    limit: 1
  });

  return prices.data[0]?.id || "";
}

function httpError(statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function sanitizeState(value) {
  if (!value || !Array.isArray(value.companies)) {
    return structuredClone(emptyState);
  }

  const companies = value.companies.map((company) => ({
    id: String(company.id || `company-${Date.now()}`),
    name: String(company.name || ""),
    code: String(company.code || ""),
    dot: String(company.dot || ""),
    email: String(company.email || ""),
    phone: String(company.phone || ""),
    adminPin: String(company.adminPin || ""),
    stripeCustomerId: String(company.stripeCustomerId || ""),
    subscription: company.subscription || { plan: "", status: "inactive" },
    trucks: Array.isArray(company.trucks) ? company.trucks : [],
    drivers: Array.isArray(company.drivers) ? company.drivers : [],
    inspections: Array.isArray(company.inspections) ? company.inspections : []
  }));

  const activeCompanyId = companies.some((company) => company.id === value.activeCompanyId)
    ? value.activeCompanyId
    : companies[0]?.id || "";

  return {
    activeCompanyId,
    companies
  };
}
