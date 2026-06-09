import type { Lead, PricingPayload } from './types'

/** Cliente de la API admin. La sesión viaja en una cookie HttpOnly. */

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { credentials: 'same-origin' })
  if (!res.ok) throw new Error(String(res.status))
  return res.json() as Promise<T>
}

export async function checkSession(): Promise<boolean> {
  try {
    const { authenticated } = await getJson<{ authenticated: boolean }>('/api/admin/session')
    return authenticated
  } catch {
    return false
  }
}

export async function login(password: string): Promise<boolean> {
  const res = await fetch('/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'same-origin',
    body: JSON.stringify({ password }),
  })
  return res.ok
}

export async function logout(): Promise<void> {
  await fetch('/api/admin/logout', { method: 'POST', credentials: 'same-origin' })
}

export function fetchPricing(): Promise<PricingPayload> {
  return getJson<PricingPayload>('/api/admin/pricing')
}

export function fetchLeads(): Promise<{ leads: Lead[] }> {
  return getJson<{ leads: Lead[] }>('/api/admin/leads')
}
