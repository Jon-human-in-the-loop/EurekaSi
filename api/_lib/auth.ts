import { createHmac, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto'
import type { VercelRequest, VercelResponse } from '@vercel/node'

/**
 * Autenticación de administrador — sin dependencias externas.
 *
 * - La contraseña NO se guarda en claro: se compara contra un hash scrypt
 *   en ADMIN_PASSWORD_HASH (formato "salt:hash" en hex). Generar con
 *   `npm run hash:password -- <password>`.
 * - La sesión es un token firmado con HMAC-SHA256 (SESSION_SECRET), enviado
 *   en una cookie HttpOnly + Secure + SameSite=Lax. No hay estado en servidor.
 */

const COOKIE_NAME = 'eurekasi_session'
const SESSION_TTL_SECONDS = 60 * 60 * 8 // 8 horas

function b64url(input: Buffer | string): string {
  return Buffer.from(input).toString('base64url')
}

/** Verifica una contraseña contra ADMIN_PASSWORD_HASH ("salt:hash" en hex). */
export function verifyPassword(password: string): boolean {
  const stored = process.env.ADMIN_PASSWORD_HASH
  if (!stored || !stored.includes(':')) return false
  const [saltHex, hashHex] = stored.split(':')
  const salt = Buffer.from(saltHex, 'hex')
  const expected = Buffer.from(hashHex, 'hex')
  let derived: Buffer
  try {
    derived = scryptSync(password, salt, expected.length)
  } catch {
    return false
  }
  return derived.length === expected.length && timingSafeEqual(derived, expected)
}

function secret(): string {
  const s = process.env.SESSION_SECRET
  if (!s || s.length < 16) {
    throw new Error('Falta SESSION_SECRET (mínimo 16 caracteres)')
  }
  return s
}

function sign(payload: string): string {
  return createHmac('sha256', secret()).update(payload).digest('base64url')
}

/** Crea un token de sesión firmado con expiración. */
export function createSessionToken(): string {
  const body = b64url(
    JSON.stringify({ sub: 'admin', exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS }),
  )
  return `${body}.${sign(body)}`
}

/** Valida el token: firma correcta (constante en tiempo) y no expirado. */
export function verifySessionToken(token: string | undefined): boolean {
  if (!token || !token.includes('.')) return false
  const [body, sig] = token.split('.')
  const expectedSig = sign(body)
  const a = Buffer.from(sig)
  const b = Buffer.from(expectedSig)
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false
  try {
    const data = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'))
    return data.sub === 'admin' && typeof data.exp === 'number' && data.exp > Date.now() / 1000
  } catch {
    return false
  }
}

function parseCookies(header: string | undefined): Record<string, string> {
  const out: Record<string, string> = {}
  if (!header) return out
  for (const part of header.split(';')) {
    const idx = part.indexOf('=')
    if (idx === -1) continue
    out[part.slice(0, idx).trim()] = decodeURIComponent(part.slice(idx + 1).trim())
  }
  return out
}

export function setSessionCookie(res: VercelResponse, token: string): void {
  res.setHeader('Set-Cookie', [
    `${COOKIE_NAME}=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${SESSION_TTL_SECONDS}`,
  ])
}

export function clearSessionCookie(res: VercelResponse): void {
  res.setHeader('Set-Cookie', [`${COOKIE_NAME}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`])
}

/** True si la petición trae una cookie de sesión válida. */
export function isAuthenticated(req: VercelRequest): boolean {
  const cookies = parseCookies(req.headers.cookie)
  return verifySessionToken(cookies[COOKIE_NAME])
}

/** Genera un par salt:hash para una contraseña (uso en script CLI). */
export function hashPassword(password: string): string {
  const salt = randomBytes(16)
  const hash = scryptSync(password, salt, 64)
  return `${salt.toString('hex')}:${hash.toString('hex')}`
}
