const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || "concierge-secret-change-me";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "conciergeconservacao@gmail.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";

// ─── Dirs ────────────────────────────────────────────────────────────────────
const DATA_DIR = path.join(__dirname, "data");
const UPLOADS_DIR = path.join(__dirname, "uploads", "gallery");
[DATA_DIR, UPLOADS_DIR].forEach((d) => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

// ─── JSON helpers ────────────────────────────────────────────────────────────
const readJSON = (file, fallback) => {
  const fp = path.join(DATA_DIR, file);
  if (!fs.existsSync(fp)) return fallback;
  try { return JSON.parse(fs.readFileSync(fp, "utf8")); } catch { return fallback; }
};
const writeJSON = (file, data) =>
  fs.writeFileSync(path.join(DATA_DIR, file), JSON.stringify(data, null, 2));

// ─── Default data ─────────────────────────────────────────────────────────────
const DEFAULT_SETTINGS = {
  phone: "(62) 9244-0750",
  whatsapp: "556292440750",
  email: "conciergeconservacao@gmail.com",
  instagram: "conciergeconservacao",
};

const DEFAULT_JOBS = [
  { id: uuidv4(), title: "Porteiro 24h", description: "Controle de acesso e segurança em condomínios", active: true, display_order: 1 },
  { id: uuidv4(), title: "Zelador(a)", description: "Manutenção e conservação das áreas comuns", active: true, display_order: 2 },
  { id: uuidv4(), title: "Auxiliar de Limpeza", description: "Limpeza e higienização de ambientes", active: true, display_order: 3 },
  { id: uuidv4(), title: "Recepcionista", description: "Atendimento e controle de visitantes", active: true, display_order: 4 },
  { id: uuidv4(), title: "Vigia Noturno", description: "Vigilância e rondas noturnas", active: true, display_order: 5 },
];

// Init data files
if (!fs.existsSync(path.join(DATA_DIR, "settings.json"))) writeJSON("settings.json", DEFAULT_SETTINGS);
if (!fs.existsSync(path.join(DATA_DIR, "jobs.json"))) writeJSON("jobs.json", DEFAULT_JOBS);
if (!fs.existsSync(path.join(DATA_DIR, "gallery.json"))) writeJSON("gallery.json", []);

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"] }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Multer
const storage = multer.diskStorage({
  destination: UPLOADS_DIR,
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${Date.now()}-${uuidv4().slice(0, 8)}${ext}`);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Apenas imagens são permitidas"));
  },
});

// Auth middleware
const auth = (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "Token obrigatório" });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Token inválido ou expirado" });
  }
};

// ─── Routes ───────────────────────────────────────────────────────────────────

app.get("/", (req, res) =>
  res.json({ ok: true, service: "Concierge Brasil API", version: "1.0.0" })
);

// AUTH
app.post("/auth/login", (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password)
    return res.status(400).json({ error: "Email e senha obrigatórios" });
  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD)
    return res.status(401).json({ error: "Credenciais inválidas" });

  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "30d" });
  res.json({ token, email });
});

app.get("/auth/me", auth, (req, res) => res.json({ email: req.user.email }));

// SETTINGS
app.get("/settings", (req, res) => {
  res.json(readJSON("settings.json", DEFAULT_SETTINGS));
});

app.put("/settings", auth, (req, res) => {
  const current = readJSON("settings.json", DEFAULT_SETTINGS);
  const updated = { ...current, ...req.body };
  writeJSON("settings.json", updated);
  res.json(updated);
});

// GALLERY — public (only active, optional ?section= filter)
app.get("/gallery", (req, res) => {
  const images = readJSON("gallery.json", []);
  const { section } = req.query;
  let result = images.filter((img) => img.active !== false);
  if (section) result = result.filter((img) => (img.section || "gallery") === section);
  res.json(result.sort((a, b) => a.display_order - b.display_order));
});

// GALLERY — all (admin, optional ?section= filter)
app.get("/gallery/all", auth, (req, res) => {
  const images = readJSON("gallery.json", []);
  const { section } = req.query;
  let result = [...images];
  if (section) result = result.filter((img) => (img.section || "gallery") === section);
  res.json(result.sort((a, b) => a.display_order - b.display_order));
});

// GALLERY — upload
app.post("/gallery", auth, upload.array("images", 20), (req, res) => {
  if (!req.files?.length) return res.status(400).json({ error: "Nenhuma imagem enviada" });

  const images = readJSON("gallery.json", []);
  const BASE_URL = (process.env.BASE_URL || `http://localhost:${PORT}`).replace(/\/$/, "");
  const section = req.body.section || "gallery";

  // For single-image sections, deactivate existing images of that section
  const singleSections = ["about", "differentials", "hero"];
  if (singleSections.includes(section)) {
    images.forEach((img) => {
      if ((img.section || "gallery") === section) img.active = false;
    });
  }

  const newImages = req.files.map((file, i) => ({
    id: uuidv4(),
    src: `${BASE_URL}/uploads/gallery/${file.filename}`,
    alt: req.body.alt || file.originalname.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "),
    section,
    active: true,
    display_order: images.length + i + 1,
    created_at: new Date().toISOString(),
  }));

  images.push(...newImages);
  writeJSON("gallery.json", images);
  res.json(newImages);
});

// GALLERY — update
app.patch("/gallery/:id", auth, (req, res) => {
  const images = readJSON("gallery.json", []);
  const idx = images.findIndex((img) => img.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Imagem não encontrada" });
  images[idx] = { ...images[idx], ...req.body };
  writeJSON("gallery.json", images);
  res.json(images[idx]);
});

// GALLERY — delete
app.delete("/gallery/:id", auth, (req, res) => {
  const images = readJSON("gallery.json", []);
  const img = images.find((i) => i.id === req.params.id);
  if (!img) return res.status(404).json({ error: "Imagem não encontrada" });

  // Remove file from disk
  if (img.src) {
    const filename = path.basename(img.src);
    const filepath = path.join(UPLOADS_DIR, filename);
    if (fs.existsSync(filepath)) {
      try { fs.unlinkSync(filepath); } catch {}
    }
  }

  writeJSON("gallery.json", images.filter((i) => i.id !== req.params.id));
  res.json({ ok: true });
});

// JOBS — public
app.get("/jobs", (req, res) => {
  const jobs = readJSON("jobs.json", DEFAULT_JOBS);
  res.json(jobs.filter((j) => j.active !== false).sort((a, b) => a.display_order - b.display_order));
});

// JOBS — all (admin)
app.get("/jobs/all", auth, (req, res) => {
  res.json(readJSON("jobs.json", DEFAULT_JOBS).sort((a, b) => a.display_order - b.display_order));
});

// JOBS — create
app.post("/jobs", auth, (req, res) => {
  const jobs = readJSON("jobs.json", DEFAULT_JOBS);
  const job = {
    id: uuidv4(),
    title: req.body.title,
    description: req.body.description || "",
    active: true,
    display_order: jobs.length + 1,
    created_at: new Date().toISOString(),
  };
  jobs.push(job);
  writeJSON("jobs.json", jobs);
  res.json(job);
});

// JOBS — update
app.put("/jobs/:id", auth, (req, res) => {
  const jobs = readJSON("jobs.json", DEFAULT_JOBS);
  const idx = jobs.findIndex((j) => j.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Vaga não encontrada" });
  jobs[idx] = { ...jobs[idx], ...req.body };
  writeJSON("jobs.json", jobs);
  res.json(jobs[idx]);
});

// JOBS — delete
app.delete("/jobs/:id", auth, (req, res) => {
  const jobs = readJSON("jobs.json", DEFAULT_JOBS);
  writeJSON("jobs.json", jobs.filter((j) => j.id !== req.params.id));
  res.json({ ok: true });
});

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Concierge Brasil API — porta ${PORT}`);
  console.log(`📧 Admin: ${ADMIN_EMAIL}`);
});
