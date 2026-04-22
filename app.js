import * as THREE from "/vendor/three.module.js";

const STORAGE_KEY = "roadready-accounts-v1";
const EMPTY_STATE = {
  activeCompanyId: "",
  companies: []
};
const TRUCK_LIMITS = {
  free: 3,
  starter: 199,
  fleet: 999,
  enterprise: Infinity
};

const translations = {
  en: {
    login: "Login",
    register: "Register",
    heroTitle: "Pre-trip truck checks before dispatch.",
    companyCodeLabel: "Company code",
    openDashboard: "Open Dashboard",
    registerCompanyNameLabel: "Company name",
    registerCompanyCodeLabel: "Company code",
    registerCompanyDotLabel: "DOT or account number",
    registerCompanyEmailLabel: "Company email",
    registerCompanyPhoneLabel: "Company phone",
    registerAdminPinLabel: "Admin PIN",
    createCompany: "Create Company",
    adminPinLabel: "Admin PIN",
    unlockAdmin: "Unlock Admin",
    lockAdmin: "Lock Admin",
    adminLocked: "Admin tools locked.",
    adminUnlocked: "Admin tools unlocked.",
    adminPinRequired: "Create an admin PIN for this company.",
    adminPinWrong: "Admin PIN does not match.",
    adminLockedTitle: "Admin tools are locked.",
    adminLockedCopy: "Unlock admin access to add trucks, add drivers, and view previous checks.",
    currentCompany: "Current company: {name}",
    noActiveCompany: "Create or open a company account.",
    readyLabel: "ready trucks",
    failedLabel: "failed checks",
    pendingLabel: "not inspected",
    inspectionLabel: "inspection records",
    walkaroundTitle: "Click a truck part to inspect it.",
    walkaroundCopy: "Drag to rotate. Failed items require a note before the driver and inspector can sign and submit.",
    checklistTitle: "Safety checklist",
    resetForm: "Reset Form",
    truckLabel: "Truck",
    driverCodeLabel: "Driver code",
    inspectorCodeLabel: "Inspector code",
    equipmentConfigLabel: "Equipment setup",
    truckOnly: "Truck only",
    truckTrailer: "Truck + trailer connected",
    trailerUnitLabel: "Trailer or load unit",
    loadStatusLabel: "Load status",
    loadEmpty: "Empty",
    loadLoaded: "Loaded",
    loadReturning: "Returning with trailer",
    truckQr: "Truck QR",
    qrCopy: "Print this code and place it inside the cab. Scanning it opens the truck inspection form.",
    openQr: "Open QR",
    photoLabel: "Damage photo or document",
    photoHelpTruckOnly: "Take 4 photos now, even with no damage: truck front, truck back, left side, and right side.",
    photoHelpTruckTrailer: "Take 8 photos now, even with no damage: truck front, truck back, truck left, truck right, trailer front, trailer back, trailer left, and trailer right.",
    photoStatusLabel: "Photo set",
    photoStatusClear: "No visible damage",
    photoStatusIssue: "Damage or issue documented",
    photoUploadLabel: "Inspection photos",
    noFile: "No file attached",
    photosAdded: "{count} of {required} required photos attached",
    removePhoto: "Remove",
    takePhoto: "Take photo",
    retakePhoto: "Retake photo",
    truckFront: "Truck Front",
    truckBack: "Truck Back",
    truckLeft: "Truck Left Side",
    truckRight: "Truck Right Side",
    trailerFront: "Trailer Front",
    trailerBack: "Trailer Back",
    trailerLeft: "Trailer Left Side",
    trailerRight: "Trailer Right Side",
    photoRequiredBeforeSign: "Take all {required} required inspection photos before signing.",
    photoRequiredBeforeSubmit: "Take all {required} required inspection photos before submitting the inspection.",
    driverSignatureLabel: "Driver signature",
    inspectorSignatureLabel: "Inspector signature",
    clear: "Clear",
    submitInspection: "Submit Inspection",
    fleetTitle: "Fleet status",
    setupTitle: "Register trucks and drivers",
    newTruckNameLabel: "Truck name",
    newTruckPlateLabel: "Plate or unit number",
    newTruckVinLabel: "VIN ending",
    addTruck: "Add Truck",
    newDriverNameLabel: "Driver name",
    newDriverCodeLabel: "Driver code",
    addDriver: "Add Driver",
    historyTitle: "Recent records",
    billingTitle: "Subscription",
    subscriptionStatus: "Subscription: {status}",
    stripeNotConfigured: "Subscription checkout is ready. Add Stripe keys and price IDs in .env, then restart the server.",
    checkoutStarted: "Opening secure checkout...",
    starterPlanTitle: "Starter",
    starterPlanCopy: "Small fleet essentials.",
    fleetPlanTitle: "Fleet",
    fleetPlanCopy: "Growing fleet operations.",
    enterprisePlanTitle: "Enterprise",
    enterprisePlanCopy: "Larger teams and compliance needs.",
    subscribe: "Subscribe",
    aiSummary: "AI summary",
    aiSummaryLoading: "Creating AI summary...",
    aiSummaryUnavailable: "AI summaries need OPENAI_API_KEY configured on the server.",
    selected: "Selected: {part}",
    selectedPartLabel: "Selected part",
    noCompany: "No company found with that code.",
    companyRequired: "Add a company name, code, email, and phone number.",
    companyEmailInvalid: "Enter a valid company email.",
    companyExists: "That company code is already registered.",
    openedCompany: "Opened {name}. Dispatch board is ready.",
    createdCompany: "{name} was created. Register each truck before dispatch checks.",
    truckRequired: "Add a truck name and plate number first.",
    truckAdded: "{name} was added to the company fleet.",
    truckLimitReached: "{plan} accounts can register up to {limit} trucks. Upgrade to add more trucks.",
    driverRequired: "Add a driver name and code first.",
    driverCodeExists: "That driver code is already in use.",
    driverAdded: "{name} can now submit safety checks.",
    registerTruckFirst: "Register a truck first",
    noTrucks: "No trucks registered yet. Add every truck this company owns.",
    noDrivers: "No driver codes registered yet.",
    noInspections: "No inspections have been submitted for this company.",
    removedTruck: "Removed truck",
    noFailures: "No failures",
    driverFile: "Driver file",
    records: "{count} records",
    at: "at",
    noDriverRecords: "No pre-road checks saved yet.",
    registerTruckSubmit: "Register a truck before submitting an inspection.",
    validDriver: "Enter a valid driver code before submitting.",
    validInspector: "Enter the inspector code before submitting.",
    trailerUnitRequired: "Enter the trailer or load unit when a trailer is connected.",
    completeMissing: "Finish every checklist item. Missing: {items}.",
    failedNotes: "Failed items need a short note before dispatch can review them.",
    driverSignatureRequired: "Driver signature is required.",
    inspectorSignatureRequired: "Inspector signature is required.",
    cleared: "{truck} is cleared to leave.",
    blocked: "{truck} is blocked until a manager clears repairs.",
    repairSummary: "Repair summary",
    repairReferral: "Refer to mechanic",
    mechanicEmailLabel: "Mechanic email",
    mechanicEmailPlaceholder: "mechanic@shop.com",
    mechanicEmailInvalid: "Enter a valid mechanic email.",
    referralSent: "Repair referral sent to {email}.",
    referralConfigMissing: "Email is not configured on the server yet. Add SMTP settings before sending mechanic referrals.",
    viewRepair: "View repair details",
    hideRepair: "Hide repair details",
    noRepairNotes: "No repair notes were added.",
    latestInspectionLabel: "Latest failed inspection",
    dispatchStatusLabel: "Dispatch status",
    reportedIssuesLabel: "Reported issues",
    repairNotesLabel: "Repair notes",
    trailerLabel: "Trailer / load unit",
    noRepairHistory: "No repair inspection is saved for this truck yet.",
    referralSentAt: "Referral sent to {email} on {date}.",
    sendReferral: "Send referral",
    resetDone: "Inspection form reset.",
    pass: "Pass",
    fail: "Fail",
    na: "N/A",
    failureNote: "Failure note",
    notePlaceholder: "Describe the issue. Example: left brake light is out.",
    critical: "Critical",
    standard: "Standard",
    statusReady: "Ready",
    statusRepair: "Needs repair",
    statusPending: "Not inspected",
    statusDoNotDispatch: "Do not dispatch",
    part_tires: "Tires",
    part_brakes: "Brakes",
    part_lights: "Lights",
    part_mirrors: "Mirrors",
    part_windshield: "Windshield and wipers",
    part_fluids: "Fluids and leaks",
    part_coupling: "Fifth wheel and coupling",
    part_load: "Load securement",
    part_safety: "Safety equipment",
    prompt_tires: "No flats, exposed cord, low tread, or loose lug nuts.",
    prompt_brakes: "Service brake, parking brake, and air pressure look safe.",
    prompt_lights: "Headlights, brake lights, hazards, and turn signals work.",
    prompt_mirrors: "Mirrors are secure, clean, and properly adjusted.",
    prompt_windshield: "Glass is clear and wipers are working.",
    prompt_fluids: "Oil, coolant, fuel, and visible leak check passed.",
    prompt_coupling: "Trailer connection, pins, lines, and landing gear are secure.",
    prompt_load: "Cargo, straps, doors, and seals are secure.",
    prompt_safety: "Fire extinguisher, triangles, horn, and seatbelt are ready."
  },
  es: {
    login: "Iniciar sesión",
    register: "Registrar",
    heroTitle: "Inspecciones del camión antes de salir.",
    companyCodeLabel: "Código de la compañía",
    openDashboard: "Abrir panel",
    registerCompanyNameLabel: "Nombre de la compañía",
    registerCompanyCodeLabel: "Código de la compañía",
    registerCompanyDotLabel: "Número DOT o cuenta",
    registerCompanyEmailLabel: "Correo de la compañía",
    registerCompanyPhoneLabel: "Teléfono de la compañía",
    registerAdminPinLabel: "PIN de administrador",
    createCompany: "Crear compañía",
    adminPinLabel: "PIN de administrador",
    unlockAdmin: "Desbloquear admin",
    lockAdmin: "Bloquear admin",
    adminLocked: "Herramientas de administrador bloqueadas.",
    adminUnlocked: "Herramientas de administrador desbloqueadas.",
    adminPinRequired: "Crea un PIN de administrador para esta compañía.",
    adminPinWrong: "El PIN de administrador no coincide.",
    adminLockedTitle: "Herramientas de administrador bloqueadas.",
    adminLockedCopy: "Desbloquea el acceso de administrador para agregar camiones, agregar conductores y ver inspecciones anteriores.",
    currentCompany: "Compañía actual: {name}",
    noActiveCompany: "Crea o abre una cuenta de compañía.",
    readyLabel: "camiones listos",
    failedLabel: "inspecciones fallidas",
    pendingLabel: "sin inspeccionar",
    inspectionLabel: "registros",
    walkaroundTitle: "Haz clic en una parte del camión.",
    walkaroundCopy: "Arrastra para girar. Las fallas requieren una nota antes de que el conductor y el inspector firmen.",
    checklistTitle: "Lista de seguridad",
    resetForm: "Reiniciar formulario",
    truckLabel: "Camión",
    driverCodeLabel: "Código del conductor",
    inspectorCodeLabel: "Código del inspector",
    equipmentConfigLabel: "Configuración del equipo",
    truckOnly: "Solo camión",
    truckTrailer: "Camión + remolque conectado",
    trailerUnitLabel: "Remolque o unidad de carga",
    loadStatusLabel: "Estado de la carga",
    loadEmpty: "Vacío",
    loadLoaded: "Cargado",
    loadReturning: "Regreso con remolque",
    truckQr: "QR del camión",
    qrCopy: "Imprime este código y colócalo dentro de la cabina. Al escanearlo se abre el formulario.",
    openQr: "Abrir QR",
    photoLabel: "Foto o documento del daño",
    photoHelpTruckOnly: "Toma 4 fotos ahora, aunque no haya daños: frente del camión, parte trasera, lado izquierdo y lado derecho.",
    photoHelpTruckTrailer: "Toma 8 fotos ahora, aunque no haya daños: frente y parte trasera del camión, lados izquierdo y derecho del camión, frente y parte trasera del remolque, lados izquierdo y derecho del remolque.",
    photoStatusLabel: "Juego de fotos",
    photoStatusClear: "Sin daños visibles",
    photoStatusIssue: "Daño o problema documentado",
    photoUploadLabel: "Fotos de inspección",
    noFile: "Sin archivo adjunto",
    photosAdded: "{count} de {required} fotos requeridas adjuntas",
    removePhoto: "Quitar",
    takePhoto: "Tomar foto",
    retakePhoto: "Volver a tomar",
    truckFront: "Frente del camión",
    truckBack: "Parte trasera del camión",
    truckLeft: "Lado izquierdo del camión",
    truckRight: "Lado derecho del camión",
    trailerFront: "Frente del remolque",
    trailerBack: "Parte trasera del remolque",
    trailerLeft: "Lado izquierdo del remolque",
    trailerRight: "Lado derecho del remolque",
    photoRequiredBeforeSign: "Toma las {required} fotos requeridas antes de firmar.",
    photoRequiredBeforeSubmit: "Toma las {required} fotos requeridas antes de enviar la inspección.",
    driverSignatureLabel: "Firma del conductor",
    inspectorSignatureLabel: "Firma del inspector",
    clear: "Borrar",
    submitInspection: "Enviar inspección",
    fleetTitle: "Estado de la flota",
    setupTitle: "Registrar camiones y conductores",
    newTruckNameLabel: "Nombre del camión",
    newTruckPlateLabel: "Placa o número de unidad",
    newTruckVinLabel: "Final del VIN",
    addTruck: "Agregar camión",
    newDriverNameLabel: "Nombre del conductor",
    newDriverCodeLabel: "Código del conductor",
    addDriver: "Agregar conductor",
    historyTitle: "Registros recientes",
    billingTitle: "Suscripción",
    subscriptionStatus: "Suscripción: {status}",
    stripeNotConfigured: "El pago por suscripción está listo. Agrega las claves y precios de Stripe en .env y reinicia el servidor.",
    checkoutStarted: "Abriendo pago seguro...",
    starterPlanTitle: "Inicial",
    starterPlanCopy: "Lo esencial para flotas pequeñas.",
    fleetPlanTitle: "Flota",
    fleetPlanCopy: "Operaciones para flotas en crecimiento.",
    enterprisePlanTitle: "Empresa",
    enterprisePlanCopy: "Equipos grandes y necesidades de cumplimiento.",
    subscribe: "Suscribirse",
    aiSummary: "Resumen IA",
    aiSummaryLoading: "Creando resumen IA...",
    aiSummaryUnavailable: "Los resúmenes IA necesitan OPENAI_API_KEY en el servidor.",
    selected: "Seleccionado: {part}",
    selectedPartLabel: "Parte seleccionada",
    noCompany: "No se encontró una compañía con ese código.",
    companyRequired: "Agrega el nombre, código, correo y teléfono de la compañía.",
    companyEmailInvalid: "Ingresa un correo válido de la compañía.",
    companyExists: "Ese código de compañía ya está registrado.",
    openedCompany: "Se abrió {name}. El panel está listo.",
    createdCompany: "Se creó {name}. Registra cada camión antes de las inspecciones.",
    truckRequired: "Agrega el nombre del camión y la placa.",
    truckAdded: "{name} fue agregado a la flota.",
    truckLimitReached: "Las cuentas {plan} pueden registrar hasta {limit} camiones. Mejora tu plan para agregar más.",
    driverRequired: "Agrega el nombre y el código del conductor.",
    driverCodeExists: "Ese código de conductor ya está en uso.",
    driverAdded: "{name} ya puede enviar inspecciones.",
    registerTruckFirst: "Registra un camión primero",
    noTrucks: "Todavía no hay camiones registrados. Agrega todos los camiones de esta compañía.",
    noDrivers: "Todavía no hay códigos de conductor.",
    noInspections: "Todavía no hay inspecciones para esta compañía.",
    removedTruck: "Camión eliminado",
    noFailures: "Sin fallas",
    driverFile: "Archivo del conductor",
    records: "{count} registros",
    at: "a las",
    noDriverRecords: "Todavía no hay inspecciones guardadas.",
    registerTruckSubmit: "Registra un camión antes de enviar la inspección.",
    validDriver: "Ingresa un código de conductor válido.",
    validInspector: "Ingresa el código del inspector.",
    trailerUnitRequired: "Ingresa el remolque o unidad de carga cuando haya un remolque conectado.",
    completeMissing: "Completa todos los puntos. Faltan: {items}.",
    failedNotes: "Los puntos fallidos necesitan una nota.",
    driverSignatureRequired: "La firma del conductor es obligatoria.",
    inspectorSignatureRequired: "La firma del inspector es obligatoria.",
    cleared: "{truck} está autorizado para salir.",
    blocked: "{truck} queda bloqueado hasta que un gerente apruebe las reparaciones.",
    repairSummary: "Resumen de reparación",
    repairReferral: "Enviar al mecánico",
    mechanicEmailLabel: "Correo del mecánico",
    mechanicEmailPlaceholder: "mecanico@taller.com",
    mechanicEmailInvalid: "Ingresa un correo válido del mecánico.",
    referralSent: "El aviso de reparación se envió a {email}.",
    referralConfigMissing: "El correo no está configurado todavía en el servidor. Agrega SMTP antes de enviar avisos al mecánico.",
    viewRepair: "Ver detalles de reparación",
    hideRepair: "Ocultar detalles de reparación",
    noRepairNotes: "No se agregaron notas de reparación.",
    latestInspectionLabel: "Última inspección fallida",
    dispatchStatusLabel: "Estado de salida",
    reportedIssuesLabel: "Problemas reportados",
    repairNotesLabel: "Notas de reparación",
    trailerLabel: "Remolque / unidad de carga",
    noRepairHistory: "Todavía no hay una inspección de reparación guardada para este camión.",
    referralSentAt: "El aviso se envió a {email} el {date}.",
    sendReferral: "Enviar aviso",
    resetDone: "Formulario reiniciado.",
    pass: "Pasa",
    fail: "Falla",
    na: "N/A",
    failureNote: "Nota de falla",
    notePlaceholder: "Describe el problema. Ejemplo: la luz de freno izquierda no funciona.",
    critical: "Crítico",
    standard: "Estándar",
    statusReady: "Listo",
    statusRepair: "Necesita reparación",
    statusPending: "Sin inspeccionar",
    statusDoNotDispatch: "No despachar",
    part_tires: "Llantas",
    part_brakes: "Frenos",
    part_lights: "Luces",
    part_mirrors: "Espejos",
    part_windshield: "Parabrisas y limpiaparabrisas",
    part_fluids: "Fluidos y fugas",
    part_coupling: "Quinta rueda y acople",
    part_load: "Carga asegurada",
    part_safety: "Equipo de seguridad",
    prompt_tires: "Sin ponchaduras, cables expuestos, poco dibujo o tuercas flojas.",
    prompt_brakes: "Freno de servicio, freno de estacionamiento y presión de aire seguros.",
    prompt_lights: "Faros, luces de freno, intermitentes y direccionales funcionan.",
    prompt_mirrors: "Los espejos están firmes, limpios y ajustados.",
    prompt_windshield: "El vidrio está despejado y los limpiaparabrisas funcionan.",
    prompt_fluids: "Aceite, refrigerante, combustible y revisión de fugas aprobados.",
    prompt_coupling: "Conexión del remolque, pernos, líneas y patas están seguros.",
    prompt_load: "Carga, correas, puertas y sellos están seguros.",
    prompt_safety: "Extintor, triángulos, claxon y cinturón están listos."
  }
};

const defaultChecklist = [
  { id: "tires", label: "Tires", prompt: "No flats, exposed cord, low tread, or loose lug nuts.", critical: true },
  { id: "brakes", label: "Brakes", prompt: "Service brake, parking brake, and air pressure look safe.", critical: true },
  { id: "lights", label: "Lights", prompt: "Headlights, brake lights, hazards, and turn signals work.", critical: true },
  { id: "mirrors", label: "Mirrors", prompt: "Mirrors are secure, clean, and properly adjusted.", critical: false },
  { id: "windshield", label: "Windshield and wipers", prompt: "Glass is clear and wipers are working.", critical: false },
  { id: "fluids", label: "Fluids and leaks", prompt: "Oil, coolant, fuel, and visible leak check passed.", critical: true },
  { id: "coupling", label: "Fifth wheel and coupling", prompt: "Trailer connection, pins, lines, and landing gear are secure.", critical: true },
  { id: "load", label: "Load securement", prompt: "Cargo, straps, doors, and seals are secure.", critical: true },
  { id: "safety", label: "Safety equipment", prompt: "Fire extinguisher, triangles, horn, and seatbelt are ready.", critical: false }
];

const els = {
  englishButton: document.getElementById("englishButton"),
  spanishButton: document.getElementById("spanishButton"),
  heroTitle: document.getElementById("heroTitle"),
  companyCode: document.getElementById("companyCode"),
  loginForm: document.getElementById("loginForm"),
  registerForm: document.getElementById("registerForm"),
  showLogin: document.getElementById("showLogin"),
  showRegister: document.getElementById("showRegister"),
  registerCompanyName: document.getElementById("registerCompanyName"),
  registerCompanyCode: document.getElementById("registerCompanyCode"),
  registerCompanyDot: document.getElementById("registerCompanyDot"),
  registerCompanyEmail: document.getElementById("registerCompanyEmail"),
  registerCompanyPhone: document.getElementById("registerCompanyPhone"),
  registerAdminPin: document.getElementById("registerAdminPin"),
  accountStatus: document.getElementById("accountStatus"),
  adminForm: document.getElementById("adminForm"),
  adminPin: document.getElementById("adminPin"),
  unlockAdmin: document.getElementById("unlockAdmin"),
  lockAdmin: document.getElementById("lockAdmin"),
  adminStatus: document.getElementById("adminStatus"),
  companyCodeLabel: document.getElementById("companyCodeLabel"),
  registerCompanyNameLabel: document.getElementById("registerCompanyNameLabel"),
  registerCompanyCodeLabel: document.getElementById("registerCompanyCodeLabel"),
  registerCompanyDotLabel: document.getElementById("registerCompanyDotLabel"),
  registerCompanyEmailLabel: document.getElementById("registerCompanyEmailLabel"),
  registerCompanyPhoneLabel: document.getElementById("registerCompanyPhoneLabel"),
  registerAdminPinLabel: document.getElementById("registerAdminPinLabel"),
  adminPinLabel: document.getElementById("adminPinLabel"),
  statusStrip: document.getElementById("statusStrip"),
  operationsGrid: document.getElementById("operationsGrid"),
  fleetPanel: document.getElementById("fleetPanel"),
  setupPanel: document.getElementById("setupPanel"),
  billingPanel: document.getElementById("billingPanel"),
  historyPanel: document.getElementById("historyPanel"),
  adminLockedNotice: document.getElementById("adminLockedNotice"),
  adminLockedTitle: document.getElementById("adminLockedTitle"),
  adminLockedCopy: document.getElementById("adminLockedCopy"),
  readyLabel: document.getElementById("readyLabel"),
  failedLabel: document.getElementById("failedLabel"),
  pendingLabel: document.getElementById("pendingLabel"),
  inspectionLabel: document.getElementById("inspectionLabel"),
  walkaroundTitle: document.getElementById("walkaroundTitle"),
  walkaroundCopy: document.getElementById("walkaroundCopy"),
  checklistTitle: document.getElementById("checklistTitle"),
  truckLabel: document.getElementById("truckLabel"),
  driverCodeLabel: document.getElementById("driverCodeLabel"),
  inspectorCodeLabel: document.getElementById("inspectorCodeLabel"),
  equipmentConfigLabel: document.getElementById("equipmentConfigLabel"),
  equipmentConfig: document.getElementById("equipmentConfig"),
  trailerUnitField: document.getElementById("trailerUnitField"),
  trailerUnitLabel: document.getElementById("trailerUnitLabel"),
  trailerUnit: document.getElementById("trailerUnit"),
  loadStatusLabel: document.getElementById("loadStatusLabel"),
  loadStatus: document.getElementById("loadStatus"),
  truckSelect: document.getElementById("truckSelect"),
  driverCode: document.getElementById("driverCode"),
  inspectorCode: document.getElementById("inspectorCode"),
  checklist: document.getElementById("checklist"),
  qrPreview: document.getElementById("qrPreview"),
  qrTruckLabel: document.getElementById("qrTruckLabel"),
  qrCopy: document.getElementById("qrCopy"),
  openQrButton: document.getElementById("openQrButton"),
  selectedPart: document.getElementById("selectedPart"),
  selectedPartLabel: document.getElementById("selectedPartLabel"),
  selectedPartSelect: document.getElementById("selectedPartSelect"),
  formStatus: document.getElementById("formStatus"),
  submitInspection: document.getElementById("submitInspection"),
  resetInspection: document.getElementById("resetInspection"),
  photoInput: document.getElementById("photoInput"),
  photoLabel: document.getElementById("photoLabel"),
  photoHelp: document.getElementById("photoHelp"),
  photoStatusLabel: document.getElementById("photoStatusLabel"),
  photoStatus: document.getElementById("photoStatus"),
  photoUploadLabel: document.getElementById("photoUploadLabel"),
  photoName: document.getElementById("photoName"),
  photoPreviewList: document.getElementById("photoPreviewList"),
  signaturePad: document.getElementById("signaturePad"),
  inspectorSignaturePad: document.getElementById("inspectorSignaturePad"),
  clearSignature: document.getElementById("clearSignature"),
  clearInspectorSignature: document.getElementById("clearInspectorSignature"),
  driverSignatureLabel: document.getElementById("driverSignatureLabel"),
  inspectorSignatureLabel: document.getElementById("inspectorSignatureLabel"),
  truckList: document.getElementById("truckList"),
  driverList: document.getElementById("driverList"),
  historyList: document.getElementById("historyList"),
  truckForm: document.getElementById("truckForm"),
  driverForm: document.getElementById("driverForm"),
  readyCount: document.getElementById("readyCount"),
  failedCount: document.getElementById("failedCount"),
  pendingCount: document.getElementById("pendingCount"),
  inspectionCount: document.getElementById("inspectionCount"),
  fleetTitle: document.getElementById("fleetTitle"),
  setupTitle: document.getElementById("setupTitle"),
  historyTitle: document.getElementById("historyTitle"),
  billingTitle: document.getElementById("billingTitle"),
  billingStatus: document.getElementById("billingStatus"),
  starterPlanTitle: document.getElementById("starterPlanTitle"),
  starterPlanCopy: document.getElementById("starterPlanCopy"),
  fleetPlanTitle: document.getElementById("fleetPlanTitle"),
  fleetPlanCopy: document.getElementById("fleetPlanCopy"),
  enterprisePlanTitle: document.getElementById("enterprisePlanTitle"),
  enterprisePlanCopy: document.getElementById("enterprisePlanCopy"),
  newTruckNameLabel: document.getElementById("newTruckNameLabel"),
  newTruckPlateLabel: document.getElementById("newTruckPlateLabel"),
  newTruckVinLabel: document.getElementById("newTruckVinLabel"),
  newDriverNameLabel: document.getElementById("newDriverNameLabel"),
  newDriverCodeLabel: document.getElementById("newDriverCodeLabel"),
  newTruckName: document.getElementById("newTruckName"),
  newTruckPlate: document.getElementById("newTruckPlate"),
  newTruckVin: document.getElementById("newTruckVin"),
  newDriverName: document.getElementById("newDriverName"),
  newDriverCode: document.getElementById("newDriverCode")
};

const formState = {
  language: localStorage.getItem("roadready-language") || "en",
  isAdmin: false,
  selectedPartId: "tires",
  expandedRepairTruckId: "",
  signatureDrawn: false,
  inspectorSignatureDrawn: false,
  pendingPhotoSlotId: "",
  attachedPhotos: [],
  checks: Object.fromEntries(defaultChecklist.map((item) => [item.id, { value: "", note: "" }]))
};

let appState = structuredClone(EMPTY_STATE);
let truckScene;

await initializeApp();

async function initializeApp() {
  appState = await loadState();
  await syncCheckoutIfNeeded();
  applyQrDeepLink();
  renderAll();
  setupEvents();
  setupSignaturePad();
  setupTruckScene();
}

function applyQrDeepLink() {
  const params = new URLSearchParams(window.location.search);
  const companyCode = normalizeCode(params.get("company") || "");
  const truckId = params.get("truck");
  if (!companyCode && !truckId) {
    return;
  }

  const company = appState.companies.find((item) => normalizeCode(item.code) === companyCode);
  if (company) {
    appState.activeCompanyId = company.id;
  }

  if (truckId) {
    queueMicrotask(() => {
      if ([...els.truckSelect.options].some((option) => option.value === truckId)) {
        els.truckSelect.value = truckId;
        renderQrPreview();
      }
    });
  }
}

async function syncCheckoutIfNeeded() {
  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get("session_id");
  if (params.get("checkout") !== "success" || !sessionId) {
    return;
  }

  try {
    const response = await fetch("/api/billing/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId })
    });
    const data = await response.json();
    if (response.ok) {
      appState = normalizeState(data.state);
      window.history.replaceState({}, "", window.location.pathname);
    }
  } catch (error) {
    console.warn("Could not sync Stripe checkout session.", error);
  }
}

async function loadState() {
  try {
    const response = await fetch("/api/state");
    if (response.ok) {
      return normalizeState(await response.json());
    }
  } catch (error) {
    console.warn("Using empty RoadReady state because the server state could not be loaded.", error);
  }

  return structuredClone(EMPTY_STATE);
}

function saveState() {
  fetch("/api/state", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(appState)
  }).catch((error) => {
    console.warn("RoadReady state could not be saved.", error);
  });
}

function normalizeState(value) {
  if (!value || !Array.isArray(value.companies)) {
    return structuredClone(EMPTY_STATE);
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

  return {
    activeCompanyId: companies.some((company) => company.id === value.activeCompanyId)
      ? value.activeCompanyId
      : companies[0]?.id || "",
    companies
  };
}

function getCompany() {
  return appState.companies.find((company) => company.id === appState.activeCompanyId) || null;
}

function getTrucks() {
  return getCompany()?.trucks || [];
}

function getDrivers() {
  return getCompany()?.drivers || [];
}

function getInspections() {
  return getCompany()?.inspections || [];
}

function setupEvents() {
  els.englishButton.addEventListener("click", () => setLanguage("en"));
  els.spanishButton.addEventListener("click", () => setLanguage("es"));
  els.showLogin.addEventListener("click", () => toggleAccountMode("login"));
  els.showRegister.addEventListener("click", () => toggleAccountMode("register"));
  els.adminForm.addEventListener("submit", (event) => {
    event.preventDefault();
    unlockAdmin();
  });
  els.lockAdmin.addEventListener("click", lockAdmin);

  els.loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const code = normalizeCode(els.companyCode.value);
    const company = appState.companies.find((item) => normalizeCode(item.code) === code);

    if (!company) {
      setAccountStatus(t("noCompany"), "error");
      return;
    }

    appState.activeCompanyId = company.id;
    formState.isAdmin = false;
    els.companyCode.value = company.code;
    els.adminPin.value = "";
    saveState();
    resetInspectionForm({ silent: true });
    renderAll();
    setAccountStatus(t("currentCompany", { name: company.name }), "success");
    setFormStatus(t("openedCompany", { name: company.name }), "success");
  });

  els.registerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = els.registerCompanyName.value.trim();
    const code = normalizeCode(els.registerCompanyCode.value);
    const dot = els.registerCompanyDot.value.trim();
    const email = els.registerCompanyEmail.value.trim();
    const phone = els.registerCompanyPhone.value.trim();
    const adminPin = els.registerAdminPin.value.trim();

    if (!name || !code || !email || !phone) {
      setAccountStatus(t("companyRequired"), "error");
      return;
    }

    if (!isValidEmail(email)) {
      setAccountStatus(t("companyEmailInvalid"), "error");
      return;
    }

    if (!adminPin) {
      setAccountStatus(t("adminPinRequired"), "error");
      return;
    }

    if (appState.companies.some((company) => normalizeCode(company.code) === code)) {
      setAccountStatus(t("companyExists"), "error");
      return;
    }

    const company = {
      id: `company-${Date.now()}`,
      name,
      code,
      dot,
      email,
      phone,
      adminPin,
      trucks: [],
      drivers: [],
      inspections: [],
      subscription: { plan: "", status: "inactive" }
    };

    appState.companies.push(company);
    appState.activeCompanyId = company.id;
    els.companyCode.value = company.code;
    els.registerCompanyName.value = "";
    els.registerCompanyCode.value = "";
    els.registerCompanyDot.value = "";
    els.registerCompanyEmail.value = "";
    els.registerCompanyPhone.value = "";
    els.registerAdminPin.value = "";
    formState.isAdmin = true;
    saveState();
    resetInspectionForm({ silent: true });
    renderAll();
    toggleAccountMode("login");
    setAccountStatus(t("currentCompany", { name: company.name }), "success");
    setFormStatus(t("createdCompany", { name: company.name }), "success");
  });

  els.truckSelect.addEventListener("change", renderQrPreview);
  els.equipmentConfig.addEventListener("change", renderInspectionMeta);
  els.openQrButton.addEventListener("click", openSelectedTruckQr);
  els.selectedPartSelect.addEventListener("change", () => selectPart(els.selectedPartSelect.value));
  document.querySelectorAll(".checkout-form").forEach((form) => {
    form.addEventListener("submit", handleCheckoutSubmit);
  });
  els.historyList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-summary-id]");
    if (button) {
      createAiSummary(button.dataset.summaryId);
    }
  });
  els.truckList.addEventListener("click", (event) => {
    const toggle = event.target.closest("[data-repair-toggle]");
    if (toggle) {
      const truckId = toggle.dataset.repairToggle || "";
      formState.expandedRepairTruckId = formState.expandedRepairTruckId === truckId ? "" : truckId;
      renderDashboard();
      return;
    }

    const refer = event.target.closest("[data-refer-mechanic]");
    if (refer) {
      referToMechanic(refer.dataset.referMechanic || "");
    }
  });
  els.resetInspection.addEventListener("click", resetInspectionForm);
  els.submitInspection.addEventListener("click", submitInspection);

  els.photoInput.addEventListener("change", async () => {
    const file = els.photoInput.files[0];
    const slotId = formState.pendingPhotoSlotId;
    if (!file || !slotId) {
      els.photoInput.value = "";
      return;
    }
    const slot = getRequiredPhotoSlots().find((item) => item.id === slotId);
    const nextPhoto = {
      id: `${Date.now()}-${slotId}`,
      slotId,
      slotLabel: slot ? t(slot.labelKey) : file.name,
      name: file.name,
      type: file.type,
      dataUrl: await readFileAsDataUrl(file)
    };
    formState.attachedPhotos = [
      ...formState.attachedPhotos.filter((photo) => photo.slotId !== slotId),
      nextPhoto
    ];
    formState.pendingPhotoSlotId = "";
    els.photoInput.value = "";
    renderPhotoPreviewList();
  });

  els.truckForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const company = getCompany();
    const name = els.newTruckName.value.trim();
    const plate = els.newTruckPlate.value.trim();
    const vin = els.newTruckVin.value.trim();
    if (!company) {
      setFormStatus(t("noActiveCompany"), "error");
      return;
    }

    if (!formState.isAdmin) {
      setFormStatus(t("adminLocked"), "error");
      return;
    }

    if (!name || !plate) {
      setFormStatus(t("truckRequired"), "error");
      return;
    }

    const truckLimit = getTruckLimit(company);
    if (company.trucks.length >= truckLimit.limit) {
      setFormStatus(t("truckLimitReached", {
        plan: truckLimit.label,
        limit: formatTruckLimit(truckLimit.limit)
      }), "error");
      return;
    }

    const id = `truck-${Date.now()}`;
    company.trucks.push({ id, name, plate, vin, status: "Not inspected", qr: `RR-${plate.replace(/\W/g, "").slice(-6) || Date.now()}` });
    els.newTruckName.value = "";
    els.newTruckPlate.value = "";
    els.newTruckVin.value = "";
    saveState();
    renderAll();
    setFormStatus(t("truckAdded", { name }), "success");
  });

  els.driverForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const company = getCompany();
    const name = els.newDriverName.value.trim();
    const code = els.newDriverCode.value.trim();
    if (!company) {
      setFormStatus(t("noActiveCompany"), "error");
      return;
    }

    if (!formState.isAdmin) {
      setFormStatus(t("adminLocked"), "error");
      return;
    }

    if (!name || !code) {
      setFormStatus(t("driverRequired"), "error");
      return;
    }

    if (getDrivers().some((driver) => driver.code === code)) {
      setFormStatus(t("driverCodeExists"), "error");
      return;
    }

    company.drivers.push({ id: `driver-${Date.now()}`, name, code });
    els.newDriverName.value = "";
    els.newDriverCode.value = "";
    saveState();
    renderAll();
    setFormStatus(t("driverAdded", { name }), "success");
  });
}

function renderAll() {
  renderLanguage();
  renderAccount();
  renderTruckSelect();
  renderInspectionMeta();
  renderChecklist();
  renderPhotoPreviewList();
  renderQrPreview();
  renderSignatureAccess();
  renderDashboard();
  renderDrivers();
  renderHistory();
  renderBilling();
}

function renderAccount() {
  const company = getCompany();
  if (!company) {
    formState.isAdmin = false;
    els.accountStatus.textContent = t("noActiveCompany");
    els.accountStatus.className = "account-status";
    toggleAccountMode("register");
    return;
  }

  els.companyCode.value = company.code;
  els.accountStatus.textContent = t("currentCompany", { name: company.name });
  els.accountStatus.className = "account-status success";
}

function renderAdminAccess() {
  const hasCompany = Boolean(getCompany());
  els.adminForm.classList.toggle("hidden", !hasCompany);
  els.adminLockedNotice.classList.toggle("hidden", !hasCompany || formState.isAdmin);
  els.statusStrip.classList.toggle("hidden", !formState.isAdmin);
  els.operationsGrid.classList.toggle("hidden", !hasCompany);
  els.fleetPanel.classList.toggle("hidden", !hasCompany);
  els.historyPanel.classList.toggle("hidden", !hasCompany);
  els.setupPanel.classList.toggle("hidden", !formState.isAdmin);
  els.billingPanel.classList.toggle("hidden", !formState.isAdmin);
  els.lockAdmin.classList.toggle("hidden", !formState.isAdmin);
  els.unlockAdmin.classList.toggle("hidden", formState.isAdmin);
  els.adminPin.disabled = formState.isAdmin;
  els.adminStatus.textContent = formState.isAdmin ? t("adminUnlocked") : t("adminLocked");
  els.adminStatus.className = `account-status ${formState.isAdmin ? "success" : ""}`;
}

function renderLanguage() {
  document.documentElement.lang = formState.language;
  els.englishButton.classList.toggle("active", formState.language === "en");
  els.spanishButton.classList.toggle("active", formState.language === "es");
  els.showLogin.textContent = t("login");
  els.showRegister.textContent = t("register");
  els.heroTitle.textContent = t("heroTitle");
  els.companyCodeLabel.textContent = t("companyCodeLabel");
  document.getElementById("loginButton").textContent = t("openDashboard");
  els.registerCompanyNameLabel.textContent = t("registerCompanyNameLabel");
  els.registerCompanyCodeLabel.textContent = t("registerCompanyCodeLabel");
  els.registerCompanyDotLabel.textContent = t("registerCompanyDotLabel");
  els.registerCompanyEmailLabel.textContent = t("registerCompanyEmailLabel");
  els.registerCompanyPhoneLabel.textContent = t("registerCompanyPhoneLabel");
  els.registerAdminPinLabel.textContent = t("registerAdminPinLabel");
  els.registerForm.querySelector("button[type='submit']").textContent = t("createCompany");
  els.adminPinLabel.textContent = t("adminPinLabel");
  els.unlockAdmin.textContent = t("unlockAdmin");
  els.lockAdmin.textContent = t("lockAdmin");
  els.adminLockedTitle.textContent = t("adminLockedTitle");
  els.adminLockedCopy.textContent = t("adminLockedCopy");
  els.readyLabel.textContent = t("readyLabel");
  els.failedLabel.textContent = t("failedLabel");
  els.pendingLabel.textContent = t("pendingLabel");
  els.inspectionLabel.textContent = t("inspectionLabel");
  els.walkaroundTitle.textContent = t("walkaroundTitle");
  els.walkaroundCopy.textContent = t("walkaroundCopy");
  els.checklistTitle.textContent = t("checklistTitle");
  els.resetInspection.textContent = t("resetForm");
  els.truckLabel.textContent = t("truckLabel");
  els.driverCodeLabel.textContent = t("driverCodeLabel");
  els.inspectorCodeLabel.textContent = t("inspectorCodeLabel");
  els.equipmentConfigLabel.textContent = t("equipmentConfigLabel");
  setSelectOptions(els.equipmentConfig, [
    { value: "truck-only", label: t("truckOnly") },
    { value: "truck-trailer", label: t("truckTrailer") }
  ]);
  els.trailerUnitLabel.textContent = t("trailerUnitLabel");
  els.loadStatusLabel.textContent = t("loadStatusLabel");
  setSelectOptions(els.loadStatus, [
    { value: "empty", label: t("loadEmpty") },
    { value: "loaded", label: t("loadLoaded") },
    { value: "returning", label: t("loadReturning") }
  ]);
  els.qrCopy.textContent = t("qrCopy");
  els.openQrButton.textContent = t("openQr");
  els.photoLabel.textContent = t("photoLabel");
  els.photoHelp.textContent = getPhotoRequirementText();
  els.photoStatusLabel.textContent = t("photoStatusLabel");
  setSelectOptions(els.photoStatus, [
    { value: "clear", label: t("photoStatusClear") },
    { value: "issue", label: t("photoStatusIssue") }
  ]);
  els.photoUploadLabel.textContent = t("photoUploadLabel");
  updatePhotoSummary();
  els.driverSignatureLabel.textContent = t("driverSignatureLabel");
  els.inspectorSignatureLabel.textContent = t("inspectorSignatureLabel");
  els.clearSignature.textContent = t("clear");
  els.clearInspectorSignature.textContent = t("clear");
  els.submitInspection.textContent = t("submitInspection");
  els.fleetTitle.textContent = t("fleetTitle");
  els.setupTitle.textContent = t("setupTitle");
  els.historyTitle.textContent = t("historyTitle");
  els.billingTitle.textContent = t("billingTitle");
  els.starterPlanTitle.textContent = t("starterPlanTitle");
  els.starterPlanCopy.textContent = t("starterPlanCopy");
  els.fleetPlanTitle.textContent = t("fleetPlanTitle");
  els.fleetPlanCopy.textContent = t("fleetPlanCopy");
  els.enterprisePlanTitle.textContent = t("enterprisePlanTitle");
  els.enterprisePlanCopy.textContent = t("enterprisePlanCopy");
  document.querySelectorAll("[data-plan]").forEach((button) => {
    button.textContent = t("subscribe");
  });
  els.newTruckNameLabel.textContent = t("newTruckNameLabel");
  els.newTruckPlateLabel.textContent = t("newTruckPlateLabel");
  els.newTruckVinLabel.textContent = t("newTruckVinLabel");
  els.truckForm.querySelector("button[type='submit']").textContent = t("addTruck");
  els.newDriverNameLabel.textContent = t("newDriverNameLabel");
  els.newDriverCodeLabel.textContent = t("newDriverCodeLabel");
  els.driverForm.querySelector("button[type='submit']").textContent = t("addDriver");
  els.selectedPartLabel.textContent = t("selectedPartLabel");
  renderPartSelect();
  renderAdminAccess();
  updateSelectedPartText();
}

function renderPartSelect() {
  els.selectedPartSelect.innerHTML = defaultChecklist.map((item) => {
    return `<option value="${item.id}">${escapeHtml(partLabel(item.id))}</option>`;
  }).join("");
  els.selectedPartSelect.value = formState.selectedPartId;
}

function renderPhotoPreviewList() {
  const slots = getRequiredPhotoSlots();
  els.photoPreviewList.innerHTML = slots.map((slot) => {
    const photo = formState.attachedPhotos.find((item) => item.slotId === slot.id);
    return `
      <article class="photo-slot ${photo ? "filled" : ""}">
        <div class="photo-slot-header">
          <strong>${escapeHtml(t(slot.labelKey))}</strong>
          ${photo ? `<button type="button" class="text-button" data-remove-photo-slot="${escapeHtml(slot.id)}">${t("removePhoto")}</button>` : ""}
        </div>
        ${photo
          ? `<img src="${photo.dataUrl}" alt="${escapeHtml(t(slot.labelKey))}">`
          : `<div class="photo-slot-placeholder">${escapeHtml(t(slot.labelKey))}</div>`}
        <button type="button" class="${photo ? "secondary" : ""}" data-photo-slot="${escapeHtml(slot.id)}">
          ${photo ? t("retakePhoto") : t("takePhoto")}
        </button>
      </article>
    `;
  }).join("");

  els.photoPreviewList.querySelectorAll("[data-photo-slot]").forEach((button) => {
    button.addEventListener("click", () => {
      formState.pendingPhotoSlotId = button.dataset.photoSlot || "";
      els.photoInput.click();
    });
  });

  els.photoPreviewList.querySelectorAll("[data-remove-photo-slot]").forEach((button) => {
    button.addEventListener("click", () => {
      formState.attachedPhotos = formState.attachedPhotos.filter((photo) => photo.slotId !== button.dataset.removePhotoSlot);
      renderPhotoPreviewList();
    });
  });

  updatePhotoSummary();
  renderSignatureAccess();
}

function updatePhotoSummary() {
  const required = getRequiredPhotoCount();
  els.photoName.textContent = formState.attachedPhotos.length
    ? t("photosAdded", { count: formState.attachedPhotos.length, required })
    : t("noFile");
}

function setSelectOptions(select, options) {
  const currentValue = select.value;
  select.innerHTML = options.map((option) => `<option value="${option.value}">${escapeHtml(option.label)}</option>`).join("");
  select.value = options.some((option) => option.value === currentValue) ? currentValue : options[0]?.value || "";
}

function setLanguage(language) {
  formState.language = language;
  localStorage.setItem("roadready-language", language);
  renderAll();
}

function renderTruckSelect() {
  const trucks = getTrucks();
  els.truckSelect.innerHTML = trucks.length
    ? trucks.map((truck) => `<option value="${truck.id}">${escapeHtml(truck.name)} - ${escapeHtml(truck.plate)}</option>`).join("")
    : `<option value="">${escapeHtml(t("registerTruckFirst"))}</option>`;
}

function renderInspectionMeta() {
  const trailerConnected = els.equipmentConfig.value === "truck-trailer";
  els.trailerUnitField.classList.toggle("hidden", !trailerConnected);
  els.photoHelp.textContent = getPhotoRequirementText();
  formState.attachedPhotos = formState.attachedPhotos.filter((photo) => {
    return getRequiredPhotoSlots().some((slot) => slot.id === photo.slotId);
  });
  renderPhotoPreviewList();
  updatePhotoSummary();
}

function renderSignatureAccess() {
  const locked = formState.attachedPhotos.length < getRequiredPhotoCount();
  els.signaturePad.classList.toggle("signature-locked", locked);
  els.inspectorSignaturePad.classList.toggle("signature-locked", locked);
}

function renderChecklist() {
  els.checklist.innerHTML = "";

  defaultChecklist.forEach((item) => {
    const check = formState.checks[item.id];
    const row = document.createElement("article");
    row.className = `check-item ${formState.selectedPartId === item.id ? "active" : ""}`;
    row.id = `check-${item.id}`;
    row.innerHTML = `
      <div class="check-main">
        <button class="part-jump" type="button" data-part="${item.id}">${escapeHtml(partLabel(item.id))}</button>
        <p>${escapeHtml(t(`prompt_${item.id}`))}</p>
        <span>${item.critical ? t("critical") : t("standard")}</span>
      </div>
      <div class="pass-fail" role="group" aria-label="${escapeHtml(item.label)} result">
        <button type="button" class="${check.value === "pass" ? "selected pass" : ""}" data-result="pass" data-id="${item.id}">${t("pass")}</button>
        <button type="button" class="${check.value === "fail" ? "selected fail" : ""}" data-result="fail" data-id="${item.id}">${t("fail")}</button>
        <button type="button" class="${check.value === "na" ? "selected" : ""}" data-result="na" data-id="${item.id}">${t("na")}</button>
      </div>
      <label class="note-field ${check.value === "fail" ? "visible" : ""}">
        ${t("failureNote")}
        <textarea data-note="${item.id}" rows="2" placeholder="${escapeHtml(t("notePlaceholder"))}">${escapeHtml(check.note)}</textarea>
      </label>
    `;

    row.querySelector(".part-jump").addEventListener("click", () => selectPart(item.id));
    row.querySelectorAll("[data-result]").forEach((button) => {
      button.addEventListener("click", () => {
        formState.checks[item.id].value = button.dataset.result;
        if (button.dataset.result !== "fail") {
          formState.checks[item.id].note = "";
        }
        renderChecklist();
        updateTruckPartColor(item.id);
      });
    });
    row.querySelector("[data-note]").addEventListener("input", (event) => {
      formState.checks[item.id].note = event.target.value;
    });

    els.checklist.appendChild(row);
  });
}

function renderQrPreview() {
  const truck = getSelectedTruck();
  if (!truck) {
    els.qrTruckLabel.textContent = t("truckQr");
    els.qrPreview.innerHTML = "";
    els.openQrButton.disabled = true;
    els.openQrButton.dataset.qrImageUrl = "";
    return;
  }

  els.qrTruckLabel.textContent = `${truck.name} QR`;
  const qrImageUrl = buildQrImageUrl(truck);
  els.qrPreview.innerHTML = `<img src="${qrImageUrl}" alt="${escapeHtml(truck.name)} QR code">`;
  els.openQrButton.disabled = false;
  els.openQrButton.dataset.qrImageUrl = qrImageUrl;
}

function renderDashboard() {
  const trucks = getTrucks();
  const inspections = getInspections();
  const ready = trucks.filter((truck) => truck.status === "Ready").length;
  const failed = trucks.filter((truck) => truck.status === "Needs repair").length;
  const pending = trucks.filter((truck) => truck.status === "Not inspected").length;

  els.readyCount.textContent = ready;
  els.failedCount.textContent = failed;
  els.pendingCount.textContent = pending;
  els.inspectionCount.textContent = inspections.length;

  els.truckList.innerHTML = trucks.length ? trucks.map((truck) => {
    const className = truck.status === "Ready" ? "ready" : truck.status === "Needs repair" ? "repair" : "pending";
    const repairInspection = getLatestRepairInspectionForTruck(truck.id);
    const isExpanded = formState.expandedRepairTruckId === truck.id && truck.status === "Needs repair";
    const repairDetails = truck.status === "Needs repair"
      ? renderRepairDetails(truck, repairInspection, isExpanded)
      : "";
    const statusControl = truck.status === "Needs repair"
      ? `<button type="button" class="repair-toggle ${className}" data-repair-toggle="${escapeHtml(truck.id)}" aria-expanded="${String(isExpanded)}">${escapeHtml(isExpanded ? t("hideRepair") : statusLabel(truck.status))}</button>`
      : `<mark class="${className}">${escapeHtml(statusLabel(truck.status))}</mark>`;
    return `
      <article class="truck-row">
        <div>
          <strong>${escapeHtml(truck.name)}</strong>
          <span>${escapeHtml(truck.plate)}${truck.vin ? ` - VIN ${escapeHtml(truck.vin)}` : ""} - QR ${escapeHtml(truck.qr)}</span>
        </div>
        ${statusControl}
        ${repairDetails}
      </article>
    `;
  }).join("") : `<p class="empty-state">${escapeHtml(t("noTrucks"))}</p>`;
}

function renderRepairDetails(truck, inspection, isExpanded) {
  if (!isExpanded) {
    return "";
  }

  if (!inspection) {
    return `<div class="repair-detail"><p class="empty-state">${escapeHtml(t("noRepairHistory"))}</p></div>`;
  }

  const failedItems = inspection.failed?.length
    ? inspection.failed.map((item) => translatedFailure(item)).join(", ")
    : t("noFailures");
  const notes = getInspectionFailureNotes(inspection);
  const notesMarkup = notes.length
    ? `<ul class="repair-notes">${notes.map((note) => `<li>${escapeHtml(note)}</li>`).join("")}</ul>`
    : `<p class="repair-detail-copy">${escapeHtml(t("noRepairNotes"))}</p>`;
  const existingEmail = inspection.repairReferral?.mechanicEmail || "";
  const sentMarkup = inspection.repairReferral?.sentAt
    ? `<p class="repair-referral-status">${escapeHtml(t("referralSentAt", { email: inspection.repairReferral.mechanicEmail, date: formatDate(inspection.repairReferral.sentAt) }))}</p>`
    : "";
  const trailerLine = inspection.equipmentConfig === "truck-trailer"
    ? `<p><strong>${escapeHtml(t("trailerLabel"))}:</strong> ${escapeHtml(inspection.trailerUnit || t("trailerUnitLabel"))}</p>`
    : "";
  const summaryText = inspection.aiSummary || notes.join(" ") || failedItems;

  return `
    <section class="repair-detail">
      <div class="repair-detail-grid">
        <div class="repair-summary-card">
          <p class="eyebrow">${escapeHtml(t("repairSummary"))}</p>
          <strong>${escapeHtml(t("latestInspectionLabel"))}</strong>
          <p class="repair-detail-copy">${escapeHtml(formatDate(inspection.createdAt))}</p>
          <p><strong>${escapeHtml(t("dispatchStatusLabel"))}:</strong> ${escapeHtml(statusLabel(inspection.status))}</p>
          <p><strong>${escapeHtml(t("reportedIssuesLabel"))}:</strong> ${escapeHtml(failedItems)}</p>
          ${trailerLine}
          <p><strong>${escapeHtml(t("repairSummary"))}:</strong> ${escapeHtml(summaryText)}</p>
        </div>
        <div class="repair-summary-card">
          <p class="eyebrow">${escapeHtml(t("repairNotesLabel"))}</p>
          ${notesMarkup}
          ${sentMarkup}
          <label class="repair-email-field">
            <span>${escapeHtml(t("mechanicEmailLabel"))}</span>
            <input type="email" data-mechanic-email="${escapeHtml(truck.id)}" value="${escapeHtml(existingEmail)}" placeholder="${escapeHtml(t("mechanicEmailPlaceholder"))}">
          </label>
          <button type="button" data-refer-mechanic="${escapeHtml(truck.id)}">${escapeHtml(t("sendReferral"))}</button>
        </div>
      </div>
    </section>
  `;
}

function renderDrivers() {
  const drivers = getDrivers();
  const records = getInspections();
  els.driverList.innerHTML = drivers.length ? drivers.map((driver) => {
    const driverRecords = records
      .filter((record) => record.driverId === driver.id || record.driverName === driver.name)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return `
      <article class="driver-file">
        <div>
          <strong>${escapeHtml(driver.name)}</strong>
          <span>${t("driverFile")} - ${escapeHtml(driver.code)} - ${t("records", { count: driverRecords.length })}</span>
        </div>
        <div class="driver-records">
          ${driverRecords.length ? driverRecords.slice(0, 4).map((record) => {
            const truck = getTrucks().find((item) => item.id === record.truckId);
            return `<p>${escapeHtml(formatDate(record.createdAt))} - ${escapeHtml(truck?.name || t("removedTruck"))} - ${escapeHtml(statusLabel(record.status))}</p>`;
          }).join("") : `<p>${escapeHtml(t("noDriverRecords"))}</p>`}
        </div>
      </article>
    `;
  }).join("") : `<p class="empty-state">${escapeHtml(t("noDrivers"))}</p>`;
}

function renderHistory() {
  const records = [...getInspections()].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  els.historyList.innerHTML = records.length ? records.map((record) => {
    const truck = getTrucks().find((item) => item.id === record.truckId);
    const failed = record.failed.length ? record.failed.map((label) => translatedFailure(label)).join(", ") : t("noFailures");
    const trailerLine = record.equipmentConfig === "truck-trailer"
      ? `${t("truckTrailer")} - ${escapeHtml(record.trailerUnit || t("trailerUnitLabel"))}`
      : t("truckOnly");
    const photoLine = record.photos?.length
      ? t("photosAdded", { count: record.photos.length })
      : t("noFile");
    return `
      <article class="history-row">
        <div>
          <strong>${escapeHtml(truck?.name || t("removedTruck"))} - ${escapeHtml(statusLabel(record.status))}</strong>
          <span>${escapeHtml(record.driverName)} / ${escapeHtml(record.inspectorName || record.inspectorCode || "Inspector")} ${t("at")} ${formatDate(record.createdAt)}</span>
        </div>
        <div class="history-actions">
          <p>${escapeHtml(failed)}</p>
          <p>${trailerLine} - ${escapeHtml(loadStatusLabel(record.loadStatus || "empty"))} - ${escapeHtml(photoLine)}</p>
          <button type="button" class="secondary" data-summary-id="${escapeHtml(record.id)}">${t("aiSummary")}</button>
        </div>
        ${record.aiSummary ? `<div class="summary-box">${escapeHtml(record.aiSummary)}</div>` : ""}
      </article>
    `;
  }).join("") : `<p class="empty-state">${escapeHtml(t("noInspections"))}</p>`;
}

function getLatestRepairInspectionForTruck(truckId) {
  return [...getInspections()]
    .filter((inspection) => inspection.truckId === truckId && inspection.failed?.length)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0] || null;
}

function getInspectionFailureNotes(inspection) {
  return Object.entries(inspection.checks || {})
    .filter(([, check]) => check?.value === "fail")
    .map(([partId, check]) => `${translatedFailure(partId)}: ${check.note?.trim() || t("noRepairNotes")}`);
}

function renderBilling() {
  const company = getCompany();
  const status = company?.subscription?.status || "inactive";
  const plan = company?.subscription?.plan ? ` / ${company.subscription.plan}` : "";
  els.billingStatus.textContent = t("subscriptionStatus", { status: `${status}${plan}` });
  document.querySelectorAll('input[name="company_id"]').forEach((input) => {
    input.value = company?.id || "";
  });
}

function submitInspection() {
  const company = getCompany();
  const driver = getDrivers().find((item) => item.code === els.driverCode.value.trim());
  const inspector = getDrivers().find((item) => item.code === els.inspectorCode.value.trim());
  const truck = getSelectedTruck();

  if (!company) {
    setFormStatus(t("noActiveCompany"), "error");
    return;
  }

  if (!truck) {
    setFormStatus(t("registerTruckSubmit"), "error");
    return;
  }

  if (!driver) {
    setFormStatus(t("validDriver"), "error");
    return;
  }

  if (!els.inspectorCode.value.trim()) {
    setFormStatus(t("validInspector"), "error");
    return;
  }

  if (els.equipmentConfig.value === "truck-trailer" && !els.trailerUnit.value.trim()) {
    setFormStatus(t("trailerUnitRequired"), "error");
    return;
  }

  const requiredPhotos = getRequiredPhotoCount();
  if (formState.attachedPhotos.length < requiredPhotos) {
    setFormStatus(t("photoRequiredBeforeSubmit", { required: requiredPhotos }), "error");
    return;
  }

  const missing = defaultChecklist.filter((item) => !formState.checks[item.id].value);
  if (missing.length) {
    setFormStatus(t("completeMissing", { items: missing.map((item) => partLabel(item.id)).join(", ") }), "error");
    return;
  }

  const failedWithoutNote = defaultChecklist.filter((item) => {
    const check = formState.checks[item.id];
    return check.value === "fail" && !check.note.trim();
  });
  if (failedWithoutNote.length) {
    setFormStatus(t("failedNotes"), "error");
    return;
  }

  if (!formState.signatureDrawn) {
    setFormStatus(t("driverSignatureRequired"), "error");
    return;
  }

  if (!formState.inspectorSignatureDrawn) {
    setFormStatus(t("inspectorSignatureRequired"), "error");
    return;
  }

  const failedItems = defaultChecklist
    .filter((item) => formState.checks[item.id].value === "fail")
    .map((item) => item.id);
  const status = failedItems.length ? "Do not dispatch" : "Ready";

  truck.status = failedItems.length ? "Needs repair" : "Ready";
  company.inspections.push({
    id: `inspection-${Date.now()}`,
    truckId: truck.id,
    driverId: driver.id,
    driverName: driver.name,
    inspectorId: inspector?.id || "",
    inspectorName: inspector?.name || els.inspectorCode.value.trim(),
    inspectorCode: els.inspectorCode.value.trim(),
    equipmentConfig: els.equipmentConfig.value,
    trailerUnit: els.trailerUnit.value.trim(),
    loadStatus: els.loadStatus.value,
    status,
    failed: failedItems,
    photoStatus: els.photoStatus.value,
    photos: structuredClone(formState.attachedPhotos),
    driverSignature: els.signaturePad.toDataURL("image/png"),
    inspectorSignature: els.inspectorSignaturePad.toDataURL("image/png"),
    checks: structuredClone(formState.checks),
    createdAt: new Date().toISOString()
  });

  saveState();
  renderDashboard();
  renderHistory();
  renderDrivers();
  setFormStatus(status === "Ready" ? t("cleared", { truck: truck.name }) : t("blocked", { truck: truck.name }), status === "Ready" ? "success" : "error");
}

function resetInspectionForm(options = {}) {
  Object.keys(formState.checks).forEach((id) => {
    formState.checks[id] = { value: "", note: "" };
    updateTruckPartColor(id);
  });
  formState.attachedPhotos = [];
  formState.signatureDrawn = false;
  formState.inspectorSignatureDrawn = false;
  els.equipmentConfig.value = "truck-only";
  els.trailerUnit.value = "";
  els.loadStatus.value = "empty";
  els.photoStatus.value = "clear";
  els.photoInput.value = "";
  els.driverCode.value = "";
  els.inspectorCode.value = "";
  clearSignature();
  clearInspectorSignature();
  renderInspectionMeta();
  renderPhotoPreviewList();
  renderChecklist();
  if (!options.silent) {
    setFormStatus(t("resetDone"), "success");
  }
}

function selectPart(partId) {
  formState.selectedPartId = partId;
  updateSelectedPartText();
  renderChecklist();
  document.getElementById(`check-${partId}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  truckScene?.focusPart(partId);
}

function getSelectedTruck() {
  return getTrucks().find((truck) => truck.id === els.truckSelect.value) || getTrucks()[0];
}

function buildTruckScanUrl(truck) {
  const company = getCompany();
  const qrUrl = new URL(window.location.pathname || "/", window.location.origin);
  qrUrl.searchParams.set("company", company?.code || "");
  qrUrl.searchParams.set("truck", truck.id);
  return qrUrl.toString();
}

function buildQrImageUrl(truck) {
  return `/api/qr?data=${encodeURIComponent(buildTruckScanUrl(truck))}`;
}

function getRequiredPhotoCount() {
  return getRequiredPhotoSlots().length;
}

function getPhotoRequirementText() {
  return els.equipmentConfig.value === "truck-trailer"
    ? t("photoHelpTruckTrailer")
    : t("photoHelpTruckOnly");
}

function getRequiredPhotoSlots() {
  const truckOnlySlots = [
    { id: "truck-front", labelKey: "truckFront" },
    { id: "truck-back", labelKey: "truckBack" },
    { id: "truck-left", labelKey: "truckLeft" },
    { id: "truck-right", labelKey: "truckRight" }
  ];

  if (els.equipmentConfig.value !== "truck-trailer") {
    return truckOnlySlots;
  }

  return [
    ...truckOnlySlots,
    { id: "trailer-front", labelKey: "trailerFront" },
    { id: "trailer-back", labelKey: "trailerBack" },
    { id: "trailer-left", labelKey: "trailerLeft" },
    { id: "trailer-right", labelKey: "trailerRight" }
  ];
}

function openSelectedTruckQr() {
  const truck = getSelectedTruck();
  if (!truck) {
    setFormStatus(t("registerTruckSubmit"), "error");
    return;
  }

  window.open(buildQrImageUrl(truck), "_blank", "noopener");
}

function getTruckLimit(company) {
  const subscriptionStatus = String(company?.subscription?.status || "").toLowerCase();
  const plan = String(company?.subscription?.plan || "free").toLowerCase();
  const isPaid = ["active", "trialing"].includes(subscriptionStatus);
  const normalizedPlan = isPaid && Object.hasOwn(TRUCK_LIMITS, plan) ? plan : "free";

  return {
    plan: normalizedPlan,
    label: planLabel(normalizedPlan),
    limit: TRUCK_LIMITS[normalizedPlan]
  };
}

function planLabel(plan) {
  const labels = {
    free: "Free",
    starter: "Starter",
    fleet: "Fleet",
    enterprise: "Enterprise"
  };
  return labels[plan] || labels.free;
}

function formatTruckLimit(limit) {
  return Number.isFinite(limit) ? String(limit) : "unlimited";
}

function setFormStatus(message, type) {
  els.formStatus.textContent = message;
  els.formStatus.className = `form-status ${type}`;
}

function setAccountStatus(message, type) {
  els.accountStatus.textContent = message;
  els.accountStatus.className = `account-status ${type}`;
}

function unlockAdmin() {
  const company = getCompany();
  if (!company) {
    setAccountStatus(t("noActiveCompany"), "error");
    return;
  }

  if (els.adminPin.value.trim() !== company.adminPin) {
    els.adminStatus.textContent = t("adminPinWrong");
    els.adminStatus.className = "account-status error";
    return;
  }

  formState.isAdmin = true;
  renderAdminAccess();
}

function lockAdmin() {
  formState.isAdmin = false;
  els.adminPin.value = "";
  renderAdminAccess();
}

function handleCheckoutSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  startCheckout(String(formData.get("lookup_key") || ""));
}

async function startCheckout(plan) {
  const company = getCompany();
  if (!company) {
    setFormStatus(t("noActiveCompany"), "error");
    return;
  }
  if (!formState.isAdmin) {
    setFormStatus(t("adminLocked"), "error");
    return;
  }

  try {
    els.billingStatus.textContent = t("checkoutStarted");
    const response = await fetch("/api/billing/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ companyId: company.id, plan })
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || t("stripeNotConfigured"));
    }
    window.location.href = data.url;
  } catch (error) {
    els.billingStatus.textContent = error.message || t("stripeNotConfigured");
  }
}

async function createAiSummary(inspectionId) {
  const company = getCompany();
  if (!company) {
    return;
  }
  if (!formState.isAdmin) {
    setFormStatus(t("adminLocked"), "error");
    return;
  }

  const button = els.historyList.querySelector(`[data-summary-id="${CSS.escape(inspectionId)}"]`);
  const originalText = button?.textContent;
  if (button) {
    button.textContent = t("aiSummaryLoading");
    button.disabled = true;
  }

  try {
    const response = await fetch("/api/inspections/summary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ companyId: company.id, inspectionId })
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || t("aiSummaryUnavailable"));
    }
    appState = normalizeState(data.state);
    renderAll();
  } catch (error) {
    setFormStatus(error.message || t("aiSummaryUnavailable"), "error");
    if (button) {
      button.textContent = originalText;
      button.disabled = false;
    }
  }
}

async function referToMechanic(truckId) {
  const company = getCompany();
  const inspection = getLatestRepairInspectionForTruck(truckId);
  const input = els.truckList.querySelector(`[data-mechanic-email="${CSS.escape(truckId)}"]`);
  const mechanicEmail = input?.value.trim() || "";

  if (!company || !inspection) {
    setFormStatus(t("noRepairHistory"), "error");
    return;
  }

  if (!isValidEmail(mechanicEmail)) {
    setFormStatus(t("mechanicEmailInvalid"), "error");
    input?.focus();
    return;
  }

  const button = els.truckList.querySelector(`[data-refer-mechanic="${CSS.escape(truckId)}"]`);
  const originalText = button?.textContent || t("sendReferral");
  if (button) {
    button.disabled = true;
    button.textContent = t("repairReferral");
  }

  try {
    const response = await fetch("/api/repairs/refer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        companyId: company.id,
        truckId,
        inspectionId: inspection.id,
        mechanicEmail
      })
    });
    const data = await response.json();
    if (!response.ok) {
      const fallback = response.status === 503 ? t("referralConfigMissing") : t("mechanicEmailInvalid");
      throw new Error(data.error || fallback);
    }
    appState = normalizeState(data.state);
    formState.expandedRepairTruckId = truckId;
    renderAll();
    setFormStatus(t("referralSent", { email: mechanicEmail }), "success");
  } catch (error) {
    setFormStatus(error.message || t("referralConfigMissing"), "error");
    if (button) {
      button.disabled = false;
      button.textContent = originalText;
    }
  }
}

function toggleAccountMode(mode) {
  const showingLogin = mode === "login";
  els.loginForm.classList.toggle("hidden", !showingLogin);
  els.registerForm.classList.toggle("hidden", showingLogin);
  els.showLogin.classList.toggle("active", showingLogin);
  els.showRegister.classList.toggle("active", !showingLogin);
}

function normalizeCode(value) {
  return value.trim().toUpperCase().replace(/\s+/g, "-");
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(reader.error || new Error("Could not read file."));
    reader.readAsDataURL(file);
  });
}

function setupSignaturePad() {
  setupPad({
    canvas: els.signaturePad,
    clearButton: els.clearSignature,
    onDraw: () => {
      formState.signatureDrawn = true;
    },
    clear: clearSignature
  });
  setupPad({
    canvas: els.inspectorSignaturePad,
    clearButton: els.clearInspectorSignature,
    onDraw: () => {
      formState.inspectorSignatureDrawn = true;
    },
    clear: clearInspectorSignature
  });
}

function setupPad({ canvas, clearButton, onDraw, clear }) {
  const ctx = canvas.getContext("2d");
  let drawing = false;

  clear();
  clearButton.addEventListener("click", clear);

  const getPoint = (event) => {
    const rect = canvas.getBoundingClientRect();
    const pointer = event.touches?.[0] || event;
    return {
      x: (pointer.clientX - rect.left) * (canvas.width / rect.width),
      y: (pointer.clientY - rect.top) * (canvas.height / rect.height)
    };
  };

  const start = (event) => {
    event.preventDefault();
    const requiredPhotos = getRequiredPhotoCount();
    if (formState.attachedPhotos.length < requiredPhotos) {
      setFormStatus(t("photoRequiredBeforeSign", { required: requiredPhotos }), "error");
      return;
    }
    drawing = true;
    const point = getPoint(event);
    ctx.beginPath();
    ctx.moveTo(point.x, point.y);
  };

  const move = (event) => {
    if (!drawing) {
      return;
    }
    event.preventDefault();
    const point = getPoint(event);
    ctx.lineTo(point.x, point.y);
    ctx.strokeStyle = "#18212f";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.stroke();
    onDraw();
  };

  const stop = () => {
    drawing = false;
  };

  canvas.addEventListener("mousedown", start);
  canvas.addEventListener("mousemove", move);
  window.addEventListener("mouseup", stop);
  canvas.addEventListener("touchstart", start, { passive: false });
  canvas.addEventListener("touchmove", move, { passive: false });
  window.addEventListener("touchend", stop);
}

function clearSignature() {
  clearPad(els.signaturePad);
  formState.signatureDrawn = false;
}

function clearInspectorSignature() {
  clearPad(els.inspectorSignaturePad);
  formState.inspectorSignatureDrawn = false;
}

function clearPad(canvas) {
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#d7dde7";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(24, 118);
  ctx.lineTo(canvas.width - 24, 118);
  ctx.stroke();
}

function setupTruckScene() {
  const host = document.getElementById("truckCanvas");
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x202322);

  const camera = new THREE.PerspectiveCamera(34, host.clientWidth / host.clientHeight, 0.1, 100);
  camera.position.set(7.0, 3.25, 7.4);
  camera.lookAt(-0.4, 0, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(host.clientWidth, host.clientHeight);
  host.appendChild(renderer.domElement);

  const group = new THREE.Group();
  scene.add(group);

  scene.add(new THREE.HemisphereLight(0xffffff, 0x79808f, 2.4));
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
  keyLight.position.set(5, 7, 4);
  scene.add(keyLight);
  const rimLight = new THREE.DirectionalLight(0xbad7ff, 1.3);
  rimLight.position.set(-5, 4, -5);
  scene.add(rimLight);

  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(15, 9),
    new THREE.MeshStandardMaterial({ color: 0x242827, roughness: 0.82 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -1.12;
  scene.add(ground);

  const parts = new Map();
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x6f7469, roughness: 0.64, metalness: 0.04 });
  const cabMat = new THREE.MeshStandardMaterial({ color: 0x777c70, roughness: 0.58, metalness: 0.04 });
  const trimMat = new THREE.MeshStandardMaterial({ color: 0xb8bcad, roughness: 0.4, metalness: 0.32 });
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x2b2f2d, roughness: 0.78 });
  const glassMat = new THREE.MeshStandardMaterial({ color: 0x4f554f, roughness: 0.24, metalness: 0.12 });
  const markerMat = new THREE.MeshStandardMaterial({ color: 0xc6c9bb, roughness: 0.45, metalness: 0.12 });
  const tireMat = new THREE.MeshStandardMaterial({ color: 0xe4e8d8, roughness: 0.88 });
  const brakeMat = new THREE.MeshStandardMaterial({ color: 0x373b38, roughness: 0.62 });
  const edgeMat = new THREE.LineBasicMaterial({ color: 0xf7f8e9, transparent: true, opacity: 0.88 });
  const fineLineMat = new THREE.LineBasicMaterial({ color: 0xf7f8e9, transparent: true, opacity: 0.76 });
  const wireOverlayMat = new THREE.MeshBasicMaterial({ color: 0xf7f8e9, wireframe: true, transparent: true, opacity: 0.34 });

  const ribXs = [-4.5, -3.8, -3.1, -2.4, -1.7, -1.0, -0.3, 0.4];

  addPart("load", new THREE.BoxGeometry(5.35, 1.92, 2.18, 18, 8, 6), bodyMat, [-2.05, 0.18, 0]);
  addPart("load", new THREE.BoxGeometry(5.45, 0.08, 2.28), trimMat, [-2.05, 1.18, 0]);
  addPart("load", new THREE.BoxGeometry(5.48, 0.08, 2.28), trimMat, [-2.05, -0.82, 0]);
  addPart("load", new THREE.BoxGeometry(0.08, 1.86, 2.26), trimMat, [0.68, 0.18, 0]);
  addPart("load", new THREE.BoxGeometry(0.08, 1.86, 2.26), trimMat, [-4.78, 0.18, 0]);
  ribXs.forEach((x) => {
    addPart("load", new THREE.BoxGeometry(0.035, 1.82, 0.035), trimMat, [x, 0.18, -1.13]);
    addPart("load", new THREE.BoxGeometry(0.035, 1.82, 0.035), trimMat, [x, 0.18, 1.13]);
  });
  addPart("load", new THREE.BoxGeometry(0.04, 1.56, 0.04), darkMat, [-4.82, 0.12, 0]);
  addPart("load", new THREE.BoxGeometry(0.05, 0.08, 2.04), darkMat, [-4.86, 0.9, 0]);
  addPart("load", new THREE.BoxGeometry(0.05, 0.08, 2.04), darkMat, [-4.86, -0.55, 0]);
  addPart("load", new THREE.BoxGeometry(0.78, 0.14, 0.18), trimMat, [-3.05, -0.98, -1.18]);
  addPart("load", new THREE.BoxGeometry(0.78, 0.14, 0.18), trimMat, [-3.05, -0.98, 1.18]);

  addPart("coupling", new THREE.BoxGeometry(0.9, 0.14, 1.28), darkMat, [0.95, -0.78, 0]);
  addPart("coupling", new THREE.CylinderGeometry(0.26, 0.26, 0.16, 36), trimMat, [0.82, -0.65, 0], { rotation: [Math.PI / 2, 0, 0] });
  addPart("coupling", new THREE.BoxGeometry(0.12, 0.18, 1.42), darkMat, [1.22, -0.56, 0]);
  addPart("coupling", new THREE.BoxGeometry(0.08, 1.05, 0.08), trimMat, [0.3, -1.03, -0.82]);
  addPart("coupling", new THREE.BoxGeometry(0.08, 1.05, 0.08), trimMat, [0.3, -1.03, 0.82]);

  addPart("windshield", new THREE.BoxGeometry(0.94, 1.15, 1.86, 5, 8, 6), cabMat, [2.02, -0.02, 0]);
  addPart("windshield", new THREE.BoxGeometry(0.98, 1.24, 1.92, 5, 8, 6), cabMat, [1.36, 0.02, 0]);
  addPart("windshield", new THREE.BoxGeometry(0.82, 0.42, 1.54), glassMat, [2.5, 0.5, 0], { rotation: [0, 0, -0.12] });
  addPart("windshield", new THREE.BoxGeometry(0.08, 0.46, 0.04), darkMat, [2.93, 0.5, 0]);
  addPart("windshield", new THREE.BoxGeometry(0.48, 0.34, 0.05), glassMat, [2.06, 0.22, -0.98]);
  addPart("windshield", new THREE.BoxGeometry(0.48, 0.34, 0.05), glassMat, [2.06, 0.22, 0.98]);
  addPart("windshield", new THREE.BoxGeometry(0.84, 0.14, 1.65), trimMat, [1.55, 0.72, 0]);
  addPart("windshield", new THREE.BoxGeometry(0.72, 0.22, 1.52), cabMat, [1.3, 1.0, 0]);

  addPart("fluids", new THREE.BoxGeometry(1.35, 0.44, 1.62, 8, 3, 5), cabMat, [3.05, -0.47, 0], { rotation: [0, 0, -0.06] });
  addPart("fluids", new THREE.BoxGeometry(0.22, 0.76, 1.74), trimMat, [3.83, -0.48, 0]);
  addPart("fluids", new THREE.BoxGeometry(0.08, 0.5, 1.28), darkMat, [3.98, -0.44, 0]);
  addPart("fluids", new THREE.BoxGeometry(0.92, 0.1, 1.22), darkMat, [3.1, -0.19, 0]);
  addPart("fluids", new THREE.CylinderGeometry(0.22, 0.22, 0.92, 32), trimMat, [2.2, -0.78, -1.15], { rotation: [0, 0, Math.PI / 2] });
  addPart("fluids", new THREE.CylinderGeometry(0.22, 0.22, 0.92, 32), trimMat, [2.2, -0.78, 1.15], { rotation: [0, 0, Math.PI / 2] });
  addPart("fluids", new THREE.BoxGeometry(0.65, 0.08, 0.22), darkMat, [2.2, -0.52, -1.16]);
  addPart("fluids", new THREE.BoxGeometry(0.65, 0.08, 0.22), darkMat, [2.2, -0.52, 1.16]);

  addPart("lights", new THREE.BoxGeometry(0.06, 0.2, 0.36), markerMat, [3.98, -0.42, -0.56]);
  addPart("lights", new THREE.BoxGeometry(0.06, 0.2, 0.36), markerMat, [3.98, -0.42, 0.56]);
  addPart("lights", new THREE.BoxGeometry(0.05, 0.18, 0.28), markerMat, [-4.86, -0.08, -0.72]);
  addPart("lights", new THREE.BoxGeometry(0.05, 0.18, 0.28), markerMat, [-4.86, -0.08, 0.72]);
  addPart("lights", new THREE.BoxGeometry(0.36, 0.05, 0.07), markerMat, [1.72, 1.18, -0.48]);
  addPart("lights", new THREE.BoxGeometry(0.36, 0.05, 0.07), markerMat, [1.72, 1.18, 0.48]);
  addPart("lights", new THREE.BoxGeometry(0.52, 0.16, 1.58), trimMat, [4.05, -0.82, 0]);

  addPart("mirrors", new THREE.BoxGeometry(0.08, 0.62, 0.08), darkMat, [2.62, 0.3, -1.18]);
  addPart("mirrors", new THREE.BoxGeometry(0.08, 0.62, 0.08), darkMat, [2.62, 0.3, 1.18]);
  addPart("mirrors", new THREE.BoxGeometry(0.08, 0.42, 0.32), trimMat, [2.76, 0.44, -1.38]);
  addPart("mirrors", new THREE.BoxGeometry(0.08, 0.42, 0.32), trimMat, [2.76, 0.44, 1.38]);
  addPart("mirrors", new THREE.BoxGeometry(0.56, 0.06, 0.06), darkMat, [2.56, 0.45, -1.18]);
  addPart("mirrors", new THREE.BoxGeometry(0.56, 0.06, 0.06), darkMat, [2.56, 0.45, 1.18]);

  addPart("safety", new THREE.BoxGeometry(0.26, 0.52, 0.28), darkMat, [2.55, -0.16, -0.78]);
  addPart("safety", new THREE.BoxGeometry(0.7, 0.08, 0.34), trimMat, [1.9, -0.5, -1.16]);
  addPart("safety", new THREE.BoxGeometry(0.7, 0.08, 0.34), trimMat, [1.9, -0.5, 1.16]);
  addPart("safety", new THREE.CylinderGeometry(0.08, 0.08, 1.58, 22), trimMat, [1.35, 0.55, -1.12]);
  addPart("safety", new THREE.CylinderGeometry(0.08, 0.08, 1.58, 22), trimMat, [1.35, 0.55, 1.12]);
  addPart("safety", new THREE.CylinderGeometry(0.13, 0.08, 0.18, 22), trimMat, [1.35, 1.42, -1.12]);
  addPart("safety", new THREE.CylinderGeometry(0.13, 0.08, 0.18, 22), trimMat, [1.35, 1.42, 1.12]);

  addPart("brakes", new THREE.BoxGeometry(6.1, 0.12, 0.1), brakeMat, [-0.7, -0.86, -1.17]);
  addPart("brakes", new THREE.BoxGeometry(6.1, 0.12, 0.1), brakeMat, [-0.7, -0.86, 1.17]);
  addPart("brakes", new THREE.BoxGeometry(1.15, 0.12, 2.05), brakeMat, [-3.2, -0.86, 0]);
  addPart("brakes", new THREE.BoxGeometry(1.15, 0.12, 1.82), brakeMat, [1.25, -0.86, 0]);

  [
    [-3.75, -0.82, -1.16],
    [-3.25, -0.82, -1.16],
    [-3.75, -0.82, 1.16],
    [-3.25, -0.82, 1.16],
    [-0.55, -0.82, -1.16],
    [-0.05, -0.82, -1.16],
    [-0.55, -0.82, 1.16],
    [-0.05, -0.82, 1.16],
    [1.22, -0.82, -1.16],
    [1.72, -0.82, -1.16],
    [1.22, -0.82, 1.16],
    [1.72, -0.82, 1.16],
    [3.2, -0.82, -1.05],
    [3.2, -0.82, 1.05]
  ].forEach((position) => {
    addWheel(position, tireMat);
  });

  addWireframeDetail();

  let dragging = false;
  let lastX = 0;
  let lastY = 0;
  let targetRotationY = -0.35;
  let targetRotationX = 0.08;

  renderer.domElement.addEventListener("pointerdown", (event) => {
    dragging = true;
    lastX = event.clientX;
    lastY = event.clientY;
    renderer.domElement.setPointerCapture(event.pointerId);
  });

  renderer.domElement.addEventListener("pointermove", (event) => {
    if (!dragging) {
      return;
    }
    targetRotationY += (event.clientX - lastX) * 0.01;
    targetRotationX += (event.clientY - lastY) * 0.006;
    targetRotationX = Math.max(-0.35, Math.min(0.45, targetRotationX));
    lastX = event.clientX;
    lastY = event.clientY;
  });

  renderer.domElement.addEventListener("pointerup", (event) => {
    dragging = false;
    renderer.domElement.releasePointerCapture(event.pointerId);
  });

  renderer.domElement.addEventListener("click", (event) => {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects(group.children, false)[0];
    if (hit?.object?.userData?.partId) {
      selectPart(hit.object.userData.partId);
    }
  });

  window.addEventListener("resize", () => {
    camera.aspect = host.clientWidth / host.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(host.clientWidth, host.clientHeight);
  });

  function addPart(id, geometry, material, position, options = {}) {
    const mesh = new THREE.Mesh(geometry, material.clone());
    mesh.position.set(...position);
    if (options.rotation) {
      mesh.rotation.set(...options.rotation);
    }
    if (!options.noEdges) {
      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geometry, 24), edgeMat);
      mesh.add(edges);
      const wireOverlay = new THREE.Mesh(geometry, wireOverlayMat.clone());
      mesh.add(wireOverlay);
    }
    mesh.userData.partId = id;
    mesh.userData.baseColor = mesh.material.color.getHex();
    group.add(mesh);
    if (!parts.has(id)) {
      parts.set(id, []);
    }
    parts.get(id).push(mesh);
    return mesh;
  }

  function addWheel(position, material) {
    const tire = addPart("tires", new THREE.CylinderGeometry(0.48, 0.48, 0.34, 42), material, position, { rotation: [Math.PI / 2, 0, 0] });
    addPart("tires", new THREE.TorusGeometry(0.36, 0.035, 10, 48), trimMat, position, { noEdges: true });
    addPart("tires", new THREE.TorusGeometry(0.22, 0.018, 8, 36), trimMat, position, { noEdges: true });
    addPart("tires", new THREE.CylinderGeometry(0.18, 0.18, 0.37, 32), trimMat, position, { rotation: [Math.PI / 2, 0, 0] });
    for (let index = 0; index < 12; index += 1) {
      const angle = (Math.PI * 2 * index) / 12;
      const start = new THREE.Vector3(position[0] + Math.cos(angle) * 0.18, position[1] + Math.sin(angle) * 0.18, position[2] + 0.19);
      const end = new THREE.Vector3(position[0] + Math.cos(angle) * 0.36, position[1] + Math.sin(angle) * 0.36, position[2] + 0.19);
      addLine("tires", [start, end], edgeMat);
    }
    tire.material.roughness = 0.85;
  }

  function addWireframeDetail() {
    [-1.13, 1.13].forEach((z) => {
      for (let x = -4.7; x <= 0.55; x += 0.35) {
        addLine("load", [[x, -0.72, z], [x, 1.11, z]]);
      }
      for (let y = -0.64; y <= 1.08; y += 0.28) {
        addLine("load", [[-4.76, y, z], [0.64, y, z]]);
      }
      for (let x = -4.55; x <= 0.35; x += 0.42) {
        addRivetColumn("load", x, z);
      }
    });

    for (let x = -4.65; x <= 0.55; x += 0.42) {
      addLine("load", [[x, 1.22, -1.08], [x, 1.22, 1.08]]);
    }
    for (let z = -1.05; z <= 1.05; z += 0.32) {
      addLine("load", [[-4.72, 1.22, z], [0.62, 1.22, z]]);
    }

    [-0.98, 0.98].forEach((z) => {
      for (let x = 1.12; x <= 2.84; x += 0.22) {
        const roofY = x < 1.55 ? 0.94 + (x - 1.12) * 0.28 : 1.06 - (x - 1.55) * 0.09;
        addLine("windshield", [[x, -0.62, z], [x, roofY, z]]);
      }
      for (let y = -0.54; y <= 0.98; y += 0.25) {
        addLine("windshield", [[1.12, y, z], [2.78, y, z]]);
      }
      addLine("windshield", [[1.12, 1.03, z], [1.5, 1.16, z], [2.16, 1.04, z], [2.78, 0.72, z]]);
      addLine("windshield", [[2.08, 0.54, z], [2.82, 0.56, z]]);
      addLine("windshield", [[2.08, 0.2, z], [2.78, 0.2, z]]);
    });

    for (let z = -0.75; z <= 0.75; z += 0.25) {
      addLine("fluids", [[2.55, -0.17, z], [3.78, -0.23, z]]);
      addLine("fluids", [[2.55, -0.58, z], [3.86, -0.66, z]]);
    }
    for (let x = 2.58; x <= 3.75; x += 0.18) {
      addLine("fluids", [[x, -0.15, -0.78], [x, -0.6, -0.78]]);
      addLine("fluids", [[x, -0.15, 0.78], [x, -0.6, 0.78]]);
    }

    for (let y = -0.66; y <= -0.22; y += 0.12) {
      addLine("lights", [[4.09, y, -0.7], [4.09, y, 0.7]]);
    }
    for (let z = -0.64; z <= 0.64; z += 0.18) {
      addLine("lights", [[4.1, -0.67, z], [4.1, -0.22, z]]);
    }

    [-1.38, 1.38].forEach((z) => {
      addLine("mirrors", [[2.36, 0.48, z * 0.83], [2.92, 0.56, z]]);
      addLine("mirrors", [[2.36, 0.24, z * 0.83], [2.92, 0.32, z]]);
    });

    addPart("lights", new THREE.TorusGeometry(0.16, 0.012, 8, 26), trimMat, [4.11, -0.43, -0.55], { rotation: [0, Math.PI / 2, 0], noEdges: true });
    addPart("lights", new THREE.TorusGeometry(0.16, 0.012, 8, 26), trimMat, [4.11, -0.43, 0.55], { rotation: [0, Math.PI / 2, 0], noEdges: true });
  }

  function addRivetColumn(id, x, z) {
    for (let y = -0.58; y <= 0.95; y += 0.12) {
      addLine(id, [[x, y, z], [x, y + 0.035, z]], fineLineMat);
    }
  }

  function addLine(id, points, material = fineLineMat) {
    const geometry = new THREE.BufferGeometry().setFromPoints(points.map((point) => {
      return Array.isArray(point) ? new THREE.Vector3(...point) : point;
    }));
    const line = new THREE.Line(geometry, material.clone());
    line.userData.partId = id;
    line.userData.baseColor = line.material.color.getHex();
    group.add(line);
    if (!parts.has(id)) {
      parts.set(id, []);
    }
    parts.get(id).push(line);
    return line;
  }

  function animate() {
    requestAnimationFrame(animate);
    group.rotation.y += (targetRotationY - group.rotation.y) * 0.08;
    group.rotation.x += (targetRotationX - group.rotation.x) * 0.08;
    if (!dragging) {
      targetRotationY += 0.0018;
    }
    renderer.render(scene, camera);
  }

  truckScene = {
    focusPart(partId) {
      parts.forEach((meshes, id) => {
        meshes.forEach((mesh) => {
          mesh.scale.setScalar(id === partId ? 1.08 : 1);
        });
      });
    },
    colorPart(partId, color) {
      const meshes = parts.get(partId) || [];
      meshes.forEach((mesh) => {
        mesh.material.color.set(color);
      });
    },
    resetPart(partId) {
      const meshes = parts.get(partId) || [];
      meshes.forEach((mesh) => {
        mesh.material.color.set(mesh.userData.baseColor);
      });
    }
  };

  animate();
  selectPart("tires");
}

function updateTruckPartColor(partId) {
  const value = formState.checks[partId]?.value;
  if (!value) {
    truckScene?.resetPart(partId);
    return;
  }

  const color = value === "pass" ? 0x18a058 : value === "fail" ? 0xd64545 : 0x8f98a6;
  truckScene?.colorPart(partId, color);
}

function buildQrPattern(seed) {
  let hash = 0;
  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash << 5) - hash + seed.charCodeAt(index);
    hash |= 0;
  }

  const cells = Array.from({ length: 49 }, (_, index) => {
    const row = Math.floor(index / 7);
    const col = index % 7;
    const finder = (row < 2 && col < 2) || (row < 2 && col > 4) || (row > 4 && col < 2);
    const filled = finder || ((hash >> ((index + row + col) % 24)) & 1);
    return `<span class="${filled ? "filled" : ""}"></span>`;
  }).join("");

  return `<div class="qr-grid">${cells}</div>`;
}

function formatDate(value) {
  return new Intl.DateTimeFormat(formState.language === "es" ? "es" : "en", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(value));
}

function t(key, replacements = {}) {
  const dictionary = translations[formState.language] || translations.en;
  let value = dictionary[key] || translations.en[key] || key;

  Object.entries(replacements).forEach(([name, replacement]) => {
    value = value.replaceAll(`{${name}}`, String(replacement));
  });

  return value;
}

function partLabel(partId) {
  return t(`part_${partId}`);
}

function statusLabel(status) {
  const statusKeys = {
    Ready: "statusReady",
    "Needs repair": "statusRepair",
    "Not inspected": "statusPending",
    "Do not dispatch": "statusDoNotDispatch"
  };

  return t(statusKeys[status] || status);
}

function loadStatusLabel(value) {
  const statusKeys = {
    empty: "loadEmpty",
    loaded: "loadLoaded",
    returning: "loadReturning"
  };

  return t(statusKeys[value] || value);
}

function translatedFailure(value) {
  const matchingItem = defaultChecklist.find((item) => item.id === value || item.label === value);
  return matchingItem ? partLabel(matchingItem.id) : value;
}

function updateSelectedPartText() {
  els.selectedPartSelect.value = formState.selectedPartId;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
