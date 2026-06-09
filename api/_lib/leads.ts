/** Validación y saneamiento de leads (entrada pública → no confiar nunca). */

export type LeadInput = {
  service?: unknown
  urgency?: unknown
  detail?: unknown
  name?: unknown
  phone?: unknown
  postal?: unknown
  lang?: unknown
  /** honeypot: si viene relleno, es un bot */
  company?: unknown
}

export type CleanLead = {
  service: string | null
  urgency: string | null
  detail: string | null
  name: string
  phone: string
  postal: string | null
  lang: string | null
}

export type ValidationResult =
  | { ok: true; lead: CleanLead }
  | { ok: false; error: string; spam?: boolean }

const str = (v: unknown, max: number): string | null => {
  if (typeof v !== 'string') return null
  const t = v.trim().slice(0, max)
  return t.length ? t : null
}

const ALLOWED_URGENCY = new Set(['hoje', 'esta-semana', 'flexivel'])
const ALLOWED_LANG = new Set(['pt', 'en', 'es'])

export function validateLead(body: LeadInput): ValidationResult {
  // Honeypot: campo oculto que un humano nunca rellena
  if (typeof body.company === 'string' && body.company.trim().length > 0) {
    return { ok: false, error: 'spam', spam: true }
  }

  const name = str(body.name, 120)
  if (!name) return { ok: false, error: 'El nombre es obligatorio.' }

  const phoneRaw = str(body.phone, 32)
  const phoneDigits = phoneRaw ? phoneRaw.replace(/[^\d+]/g, '') : ''
  if (phoneDigits.replace(/\D/g, '').length < 9) {
    return { ok: false, error: 'Teléfono inválido.' }
  }

  const urgencyRaw = str(body.urgency, 32)
  const langRaw = str(body.lang, 8)

  return {
    ok: true,
    lead: {
      service: str(body.service, 64),
      urgency: urgencyRaw && ALLOWED_URGENCY.has(urgencyRaw) ? urgencyRaw : null,
      detail: str(body.detail, 2000),
      name,
      phone: phoneDigits,
      postal: str(body.postal, 16),
      lang: langRaw && ALLOWED_LANG.has(langRaw) ? langRaw : null,
    },
  }
}
