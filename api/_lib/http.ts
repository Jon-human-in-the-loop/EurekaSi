import type { VercelRequest, VercelResponse } from '@vercel/node'

/** Cabeceras de seguridad básicas para todas las respuestas de la API. */
export function applySecurityHeaders(res: VercelResponse): void {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('Cache-Control', 'no-store')
}

/** Exige un método concreto; responde 405 si no coincide. Devuelve true si OK. */
export function requireMethod(req: VercelRequest, res: VercelResponse, method: string): boolean {
  if (req.method !== method) {
    res.setHeader('Allow', method)
    res.status(405).json({ error: 'Método no permitido' })
    return false
  }
  return true
}

/**
 * Rate limiting best-effort en memoria (por instancia). En serverless el
 * estado no es global, así que es solo una primera barrera; la protección
 * real debe configurarse a nivel de plataforma (Vercel WAF / Cloudflare).
 */
const hits = new Map<string, { count: number; resetAt: number }>()

export function rateLimit(req: VercelRequest, max: number, windowMs: number): boolean {
  const ip =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    req.socket?.remoteAddress ||
    'unknown'
  const now = Date.now()
  const entry = hits.get(ip)
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + windowMs })
    return true
  }
  entry.count += 1
  return entry.count <= max
}

/** Parsea el body JSON de forma tolerante (Vercel suele parsearlo ya). */
export function readJsonBody<T = Record<string, unknown>>(req: VercelRequest): T {
  if (req.body && typeof req.body === 'object') return req.body as T
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body) as T
    } catch {
      return {} as T
    }
  }
  return {} as T
}
