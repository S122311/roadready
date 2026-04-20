# RoadReady Setup

## Run Locally

```bash
npm install
npm start
```

RoadReady runs at:

```text
http://localhost:3002
```

## Stripe Subscriptions

Create a `.env` file from `.env.example`, then add your Stripe values:

```text
STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_PRICE_STARTER=price_your_starter_price
STRIPE_PRICE_FLEET=price_your_fleet_price
STRIPE_PRICE_ENTERPRISE=price_your_enterprise_price
```

The Subscribe buttons only create real Stripe Checkout sessions after those values are set.

## AI Inspection Summaries

Add your OpenAI key to `.env`:

```text
OPENAI_API_KEY=sk-your_openai_key
OPENAI_MODEL=gpt-5
```

Restart the server after changing `.env`.
