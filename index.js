// server/index.ts
import "dotenv/config";
import express from "express";
import { rateLimit } from "express-rate-limit";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// server/contact-schema.ts
import { z } from "zod";
var contactSchema = z.object({
  name: z.string().trim().min(2, "Indiquez votre nom.").max(100, "Le nom est trop long."),
  email: z.string().trim().max(254, "Adresse email trop longue.").email("Adresse email invalide."),
  subject: z.string().trim().min(3, "L\u2019objet doit contenir au moins 3 caract\xE8res.").max(160, "L\u2019objet est trop long."),
  message: z.string().trim().min(10, "Le message doit contenir au moins 10 caract\xE8res.").max(5e3, "Le message est trop long."),
  website: z.string().max(200).optional()
});

// server/mail.ts
import nodemailer from "nodemailer";
var MailNotConfiguredError = class extends Error {
  constructor() {
    super("Le formulaire email n\u2019est pas encore activ\xE9. Utilisez WhatsApp ou votre application email pour me contacter.");
    this.name = "MailNotConfiguredError";
  }
};
async function sendContactMessage(message) {
  const host = process.env.SMTP_HOST?.trim();
  const port2 = Number(process.env.SMTP_PORT || "587");
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS;
  const recipient = process.env.MAIL_TO?.trim() || "jeysonudalric150@gmail.com";
  const sender = process.env.MAIL_FROM?.trim() || user;
  if (!host || !Number.isInteger(port2) || port2 < 1 || port2 > 65535 || !user || !pass || !recipient || !sender) {
    throw new MailNotConfiguredError();
  }
  const transporter = nodemailer.createTransport({
    host,
    port: port2,
    secure: port2 === 465,
    auth: { user, pass },
    connectionTimeout: 1e4,
    greetingTimeout: 1e4,
    socketTimeout: 15e3
  });
  const safeSubject = message.subject.replace(/[\r\n]+/g, " ").trim();
  await transporter.sendMail({
    from: { name: "ONEJEYSIRDEV \u2014 portfolio", address: sender },
    to: recipient,
    replyTo: { name: message.name, address: message.email },
    subject: `Portfolio \xB7 ${safeSubject}`,
    text: [
      `Nouveau message envoy\xE9 depuis le portfolio ONEJEYSIRDEV.`,
      "",
      `Nom : ${message.name}`,
      `Email : ${message.email}`,
      `Objet : ${safeSubject}`,
      "",
      "Message :",
      message.message
    ].join("\n")
  });
}

// server/index.ts
var app = express();
var port = Number(process.env.PORT || "3000");
var here = path.dirname(fileURLToPath(import.meta.url));
var rootDir = path.resolve(here, "..");
var distDir = path.join(rootDir, "dist");
var htmlFile = path.join(distDir, "index.html");
var publicSiteUrl = getPublicSiteUrl();
function getPublicSiteUrl() {
  const configured = process.env.PUBLIC_SITE_URL?.trim();
  if (!configured) return void 0;
  try {
    const parsed = new URL(configured);
    const validProtocol = parsed.protocol === "https:" || process.env.NODE_ENV !== "production" && parsed.protocol === "http:";
    if (!validProtocol || parsed.username || parsed.password || parsed.pathname !== "/" || parsed.search || parsed.hash) return void 0;
    return parsed.origin;
  } catch {
    return void 0;
  }
}
app.disable("x-powered-by");
app.use(express.json({ limit: "20kb", strict: true }));
app.get("/api/health", (_req, res) => res.status(200).json({ ok: true, service: "onejeys-portfolio" }));
app.get("/api/site-config", (_req, res) => res.status(200).json({ publicSiteUrl: publicSiteUrl || null }));
var contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1e3,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { success: false, message: "Trop de tentatives. R\xE9essayez dans quelques minutes ou contactez-moi sur WhatsApp." }
});
app.post("/api/contact", contactLimiter, async (req, res) => {
  const body = req.body;
  if (body && typeof body === "object" && !Array.isArray(body) && typeof body.website === "string" && body.website.trim().length > 0) {
    return res.status(400).json({ success: false, message: "Le formulaire contient une entr\xE9e invalide." });
  }
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      error: "VALIDATION_ERROR",
      message: "V\xE9rifiez les champs : nom, adresse email, objet et message.",
      fields: parsed.error.flatten().fieldErrors
    });
  }
  try {
    await sendContactMessage(parsed.data);
    return res.status(200).json({ success: true, message: "Votre message a bien \xE9t\xE9 transmis. Merci pour votre prise de contact." });
  } catch (error) {
    if (error instanceof MailNotConfiguredError) {
      return res.status(503).json({ success: false, error: "EMAIL_NOT_CONFIGURED", message: error.message });
    }
    console.error("\xC9chec de la transmission SMTP du formulaire de contact.");
    return res.status(502).json({ success: false, error: "EMAIL_DELIVERY_FAILED", message: "Le message n\u2019a pas pu \xEAtre envoy\xE9. Veuillez r\xE9essayer ou utiliser WhatsApp." });
  }
});
app.get("/robots.txt", (_req, res) => {
  const sitemapLine = publicSiteUrl ? `Sitemap: ${publicSiteUrl}/sitemap.xml
` : "";
  res.type("text/plain").send(`User-agent: *
Allow: /
Disallow: /api/
${sitemapLine}`);
});
app.get("/sitemap.xml", (_req, res) => {
  if (!publicSiteUrl) return res.status(503).type("text/plain").send("Configurez PUBLIC_SITE_URL avec le domaine canonique public pour g\xE9n\xE9rer le sitemap.");
  const lastmod = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  res.type("application/xml").send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${publicSiteUrl}/</loc><lastmod>${lastmod}</lastmod><changefreq>monthly</changefreq><priority>1.0</priority></url></urlset>`);
});
app.use("/api", (_req, res) => res.status(404).json({ success: false, message: "Route API introuvable." }));
var jsonErrorHandler = (error, req, res, next) => {
  if (res.headersSent) return next(error);
  if (req.path.startsWith("/api/")) {
    const tooLarge = error instanceof Error && "type" in error && error.type === "entity.too.large";
    return res.status(tooLarge ? 413 : 400).json({ success: false, message: tooLarge ? "La requ\xEAte d\xE9passe la taille autoris\xE9e." : "La requ\xEAte JSON est invalide." });
  }
  return next(error);
};
app.use(jsonErrorHandler);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(distDir, {
    index: false,
    setHeaders(res, filePath) {
      if (filePath.includes(`${path.sep}assets${path.sep}`)) res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    }
  }));
  app.get("/", async (_req, res, next) => {
    try {
      let html = await readFile(htmlFile, "utf8");
      const metadata = publicSiteUrl ? `<link rel="canonical" href="${publicSiteUrl}/" />
<meta property="og:url" content="${publicSiteUrl}/" />
<meta property="og:image" content="${publicSiteUrl}/og-cover.svg" />
<meta property="og:image:type" content="image/svg+xml" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="ONEJEYSIRDEV \u2014 portfolio de Fokou Jeyson Udalric" />
<meta name="twitter:image" content="${publicSiteUrl}/og-cover.svg" />` : "";
      html = html.replace("<!--PUBLIC_URL_META-->", metadata);
      res.status(200).type("html").send(html);
    } catch (error) {
      next(error);
    }
  });
  app.use((_req, res) => res.status(404).type("text/plain").send("Page introuvable."));
}
app.listen(port, "0.0.0.0", () => {
  console.log(`ONEJEYSIRDEV server listening on port ${port}`);
});
