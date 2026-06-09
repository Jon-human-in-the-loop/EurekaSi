import type { VercelRequest, VercelResponse } from '@vercel/node'
import { isAuthenticated } from '../_lib/auth'
import { ensureSchema, getSql } from '../_lib/db'
import { applySecurityHeaders, requireMethod } from '../_lib/http'

/** GET /api/admin/leads — lista de leads (PROTEGIDO). */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  applySecurityHeaders(res)
  if (!requireMethod(req, res, 'GET')) return
  if (!isAuthenticated(req)) return res.status(401).json({ error: 'No autorizado' })

  try {
    await ensureSchema()
    const sql = getSql()
    const leads = await sql`
      select id, service, urgency, detail, name, phone, postal, lang, status, created_at
      from leads
      order by created_at desc
      limit 500
    `
    return res.status(200).json({ leads })
  } catch (err) {
    console.error('GET /api/admin/leads failed', err)
    return res.status(500).json({ error: 'No se pudieron cargar los leads.' })
  }
}
