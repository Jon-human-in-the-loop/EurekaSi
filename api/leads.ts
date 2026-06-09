import type { VercelRequest, VercelResponse } from '@vercel/node'
import { ensureSchema, getSql } from './_lib/db'
import { validateLead } from './_lib/leads'
import { notifyNewLead } from './_lib/email'
import { applySecurityHeaders, rateLimit, readJsonBody, requireMethod } from './_lib/http'

/** POST /api/leads — endpoint PÚBLICO para crear un lead desde el formulario. */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  applySecurityHeaders(res)
  if (!requireMethod(req, res, 'POST')) return

  // Barrera básica anti-abuso (ver nota en http.ts)
  if (!rateLimit(req, 8, 60_000)) {
    return res.status(429).json({ error: 'Demasiadas solicitudes. Inténtalo en un momento.' })
  }

  const result = validateLead(readJsonBody(req))
  if (!result.ok) {
    // A los bots (honeypot) les devolvemos 200 para no darles pistas
    if (result.spam) return res.status(200).json({ ok: true })
    return res.status(400).json({ error: result.error })
  }

  const lead = result.lead
  try {
    await ensureSchema()
    const sql = getSql()
    await sql`
      insert into leads (service, urgency, detail, name, phone, postal, lang, source)
      values (${lead.service}, ${lead.urgency}, ${lead.detail}, ${lead.name},
              ${lead.phone}, ${lead.postal}, ${lead.lang}, 'web')
    `
    // El email no debe bloquear ni hacer fallar la respuesta
    await notifyNewLead(lead)
    return res.status(201).json({ ok: true })
  } catch (err) {
    console.error('POST /api/leads failed', err)
    return res.status(500).json({ error: 'No se pudo registrar la solicitud.' })
  }
}
