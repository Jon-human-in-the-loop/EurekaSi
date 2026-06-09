import type { CleanLead } from './leads'

/**
 * Notificación por email vía Resend (HTTP API — funciona en serverless).
 * Es opcional: si no hay RESEND_API_KEY configurada, se omite silenciosamente
 * (el lead igualmente queda guardado en la base de datos).
 */
export async function notifyNewLead(lead: CleanLead): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.LEAD_NOTIFY_FROM
  const to = process.env.LEAD_NOTIFY_TO
  if (!apiKey || !from || !to) return

  const rows: [string, string][] = [
    ['Nome', lead.name],
    ['Telefone', lead.phone],
    ['Serviço', lead.service ?? '—'],
    ['Urgência', lead.urgency ?? '—'],
    ['Código postal', lead.postal ?? '—'],
    ['Idioma', lead.lang ?? '—'],
    ['Detalhe', lead.detail ?? '—'],
  ]
  const html = `
    <h2 style="font-family:sans-serif">Novo pedido de orçamento — EurekaSi</h2>
    <table style="font-family:sans-serif;border-collapse:collapse">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:4px 12px 4px 0;color:#666">${k}</td><td style="padding:4px 0"><strong>${escapeHtml(
              v,
            )}</strong></td></tr>`,
        )
        .join('')}
    </table>
  `

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: to.split(',').map((s) => s.trim()),
        subject: `Novo lead: ${lead.name}${lead.service ? ` · ${lead.service}` : ''}`,
        html,
      }),
    })
    if (!res.ok) {
      console.error('Resend error', res.status, await res.text())
    }
  } catch (err) {
    // No interrumpe la respuesta al cliente si el email falla
    console.error('notifyNewLead failed', err)
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
