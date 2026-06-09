import type { VercelRequest, VercelResponse } from '@vercel/node'
import { clearSessionCookie } from '../_lib/auth'
import { applySecurityHeaders, requireMethod } from '../_lib/http'

/** POST /api/admin/logout — borra la cookie de sesión. */
export default function handler(req: VercelRequest, res: VercelResponse) {
  applySecurityHeaders(res)
  if (!requireMethod(req, res, 'POST')) return
  clearSessionCookie(res)
  return res.status(200).json({ ok: true })
}
