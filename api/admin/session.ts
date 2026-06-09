import type { VercelRequest, VercelResponse } from '@vercel/node'
import { isAuthenticated } from '../_lib/auth'
import { applySecurityHeaders, requireMethod } from '../_lib/http'

/** GET /api/admin/session — indica si la sesión actual es válida. */
export default function handler(req: VercelRequest, res: VercelResponse) {
  applySecurityHeaders(res)
  if (!requireMethod(req, res, 'GET')) return
  return res.status(200).json({ authenticated: isAuthenticated(req) })
}
