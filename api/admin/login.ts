import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createSessionToken, setSessionCookie, verifyPassword } from '../_lib/auth'
import { applySecurityHeaders, rateLimit, readJsonBody, requireMethod } from '../_lib/http'

/** POST /api/admin/login — { password } → cookie de sesión HttpOnly. */
export default function handler(req: VercelRequest, res: VercelResponse) {
  applySecurityHeaders(res)
  if (!requireMethod(req, res, 'POST')) return

  // Limita los intentos de fuerza bruta (best-effort por instancia)
  if (!rateLimit(req, 5, 60_000)) {
    return res.status(429).json({ error: 'Demasiados intentos. Espera un momento.' })
  }

  const { password } = readJsonBody<{ password?: string }>(req)
  if (typeof password !== 'string' || !verifyPassword(password)) {
    return res.status(401).json({ error: 'Contraseña incorrecta.' })
  }

  setSessionCookie(res, createSessionToken())
  return res.status(200).json({ ok: true })
}
