import type { VercelRequest, VercelResponse } from '@vercel/node'
import { isAuthenticated } from '../_lib/auth'
import { pricingPayload } from '../_lib/pricing'
import { applySecurityHeaders, requireMethod } from '../_lib/http'

/** GET /api/admin/pricing — datos de precios (PROTEGIDO, no público). */
export default function handler(req: VercelRequest, res: VercelResponse) {
  applySecurityHeaders(res)
  if (!requireMethod(req, res, 'GET')) return
  if (!isAuthenticated(req)) return res.status(401).json({ error: 'No autorizado' })
  return res.status(200).json(pricingPayload())
}
