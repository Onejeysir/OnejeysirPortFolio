import 'dotenv/config'
import express, { type ErrorRequestHandler } from 'express'
import { rateLimit } from 'express-rate-limit'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { contactSchema } from './contact-schema'
import { MailNotConfiguredError, sendContactMessage } from './mail'

const app = express()
const port = Number(process.env.PORT || '3000')
const here = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(here, '..')
const distDir = path.join(rootDir, 'dist')
const htmlFile = path.join(distDir, 'index.html')
const publicSiteUrl = getPublicSiteUrl()

function getPublicSiteUrl(): string | undefined {
  const configured = process.env.PUBLIC_SITE_URL?.trim()
  if (!configured) return undefined
  try {
    const parsed = new URL(configured)
    const validProtocol = parsed.protocol === 'https:' || (process.env.NODE_ENV !== 'production' && parsed.protocol === 'http:')
    if (!validProtocol || parsed.username || parsed.password || parsed.pathname !== '/' || parsed.search || parsed.hash) return undefined
    return parsed.origin
  } catch {
    return undefined
  }
}

app.disable('x-powered-by')
app.use(express.json({ limit: '20kb', strict: true }))
app.get('/api/health', (_req, res) => res.status(200).json({ ok: true, service: 'onejeys-portfolio' }))
app.get('/api/site-config', (_req, res) => res.status(200).json({ publicSiteUrl: publicSiteUrl || null }))

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { success: false, message: 'Trop de tentatives. Réessayez dans quelques minutes ou contactez-moi sur WhatsApp.' },
})

app.post('/api/contact', contactLimiter, async (req, res) => {
  const body = req.body
  if (body && typeof body === 'object' && !Array.isArray(body) && typeof body.website === 'string' && body.website.trim().length > 0) {
    return res.status(400).json({ success: false, message: 'Le formulaire contient une entrée invalide.' })
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      error: 'VALIDATION_ERROR',
      message: 'Vérifiez les champs : nom, adresse email, objet et message.',
      fields: parsed.error.flatten().fieldErrors,
    })
  }

  try {
    await sendContactMessage(parsed.data)
    return res.status(200).json({ success: true, message: 'Votre message a bien été transmis. Merci pour votre prise de contact.' })
  } catch (error) {
    if (error instanceof MailNotConfiguredError) {
      return res.status(503).json({ success: false, error: 'EMAIL_NOT_CONFIGURED', message: error.message })
    }
    console.error('Échec de la transmission SMTP du formulaire de contact.')
    return res.status(502).json({ success: false, error: 'EMAIL_DELIVERY_FAILED', message: 'Le message n’a pas pu être envoyé. Veuillez réessayer ou utiliser WhatsApp.' })
  }
})

app.get('/robots.txt', (_req, res) => {
  const sitemapLine = publicSiteUrl ? `Sitemap: ${publicSiteUrl}/sitemap.xml\n` : ''
  res.type('text/plain').send(`User-agent: *\nAllow: /\nDisallow: /api/\n${sitemapLine}`)
})

app.get('/sitemap.xml', (_req, res) => {
  if (!publicSiteUrl) return res.status(503).type('text/plain').send('Configurez PUBLIC_SITE_URL avec le domaine canonique public pour générer le sitemap.')
  const lastmod = new Date().toISOString().slice(0, 10)
  res.type('application/xml').send(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${publicSiteUrl}/</loc><lastmod>${lastmod}</lastmod><changefreq>monthly</changefreq><priority>1.0</priority></url></urlset>`)
})

app.use('/api', (_req, res) => res.status(404).json({ success: false, message: 'Route API introuvable.' }))

const jsonErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (res.headersSent) return next(error)
  if (req.path.startsWith('/api/')) {
    const tooLarge = error instanceof Error && 'type' in error && error.type === 'entity.too.large'
    return res.status(tooLarge ? 413 : 400).json({ success: false, message: tooLarge ? 'La requête dépasse la taille autorisée.' : 'La requête JSON est invalide.' })
  }
  return next(error)
}
app.use(jsonErrorHandler)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(distDir, {
    index: false,
    setHeaders(res, filePath) {
      if (filePath.includes(`${path.sep}assets${path.sep}`)) res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
    },
  }))
  app.get('/', async (_req, res, next) => {
    try {
      let html = await readFile(htmlFile, 'utf8')
      const metadata = publicSiteUrl
        ? `<link rel="canonical" href="${publicSiteUrl}/" />\n<meta property="og:url" content="${publicSiteUrl}/" />\n<meta property="og:image" content="${publicSiteUrl}/og-cover.svg" />\n<meta property="og:image:type" content="image/svg+xml" />\n<meta property="og:image:width" content="1200" />\n<meta property="og:image:height" content="630" />\n<meta property="og:image:alt" content="ONEJEYSIRDEV — portfolio de Fokou Jeyson Udalric" />\n<meta name="twitter:image" content="${publicSiteUrl}/og-cover.svg" />`
        : ''
      html = html.replace('<!--PUBLIC_URL_META-->', metadata)
      res.status(200).type('html').send(html)
    } catch (error) {
      next(error)
    }
  })
  app.use((_req, res) => res.status(404).type('text/plain').send('Page introuvable.'))
}

app.listen(port, '0.0.0.0', () => {
  console.log(`ONEJEYSIRDEV server listening on port ${port}`)
})
