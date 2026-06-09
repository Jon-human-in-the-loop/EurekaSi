import { useCallback, useEffect, useState } from 'react'
import { checkSession, fetchLeads, fetchPricing, login, logout } from './api'
import type { Lead, PricingPayload } from './types'
import { LockIcon } from '../icons'
import Logo from '../components/Logo'
import BudgetCalculator from './BudgetCalculator'

type Phase = 'checking' | 'locked' | 'ready'

export default function AdminPage() {
  const [phase, setPhase] = useState<Phase>('checking')
  const [pricing, setPricing] = useState<PricingPayload | null>(null)
  const [leads, setLeads] = useState<Lead[]>([])
  const [loadError, setLoadError] = useState(false)

  const loadData = useCallback(async () => {
    try {
      const [p, l] = await Promise.all([fetchPricing(), fetchLeads()])
      setPricing(p)
      setLeads(l.leads)
      setLoadError(false)
      setPhase('ready')
    } catch {
      // Sesión inválida/expirada o error de red
      setPhase('locked')
    }
  }, [])

  useEffect(() => {
    checkSession().then((ok) => (ok ? loadData() : setPhase('locked')))
  }, [loadData])

  const onLogout = async () => {
    await logout()
    setPricing(null)
    setLeads([])
    setPhase('locked')
  }

  if (phase === 'checking') {
    return (
      <div className="grid min-h-screen place-items-center bg-cream text-ink-muted">
        <div className="animate-pulse text-sm">Cargando…</div>
      </div>
    )
  }

  if (phase === 'locked') return <Gate onSuccess={loadData} />

  return (
    <Dashboard
      pricing={pricing!}
      leads={leads}
      loadError={loadError}
      onRefresh={loadData}
      onLogout={onLogout}
    />
  )
}

function Gate({ onSuccess }: { onSuccess: () => void }) {
  const [pw, setPw] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(false)
    const ok = await login(pw)
    setLoading(false)
    if (ok) onSuccess()
    else setError(true)
  }

  return (
    <div className="grid min-h-screen place-items-center bg-cream px-5">
      <form onSubmit={submit} className="card w-full max-w-sm p-8 text-center">
        <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full bg-ink text-white">
          <LockIcon className="h-7 w-7" />
        </div>
        <Logo className="justify-center" />
        <h1 className="mt-4 font-display text-xl font-bold tracking-tightest">Área reservada</h1>
        <p className="mt-1 text-sm text-ink-muted">
          Painel interno. Acceso solo para el equipo.
        </p>

        <input
          type="password"
          value={pw}
          autoFocus
          autoComplete="current-password"
          onChange={(e) => {
            setPw(e.target.value)
            setError(false)
          }}
          placeholder="Contraseña"
          className={`mt-6 w-full rounded-2xl border p-4 text-sm outline-none transition focus:ring-2 ${
            error
              ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20'
              : 'border-ink/10 focus:border-accent-500 focus:ring-accent-500/20'
          }`}
        />
        {error && <p className="mt-2 text-sm font-medium text-red-500">Contraseña incorrecta.</p>}

        <button type="submit" disabled={loading} className="btn-primary mt-4 w-full disabled:opacity-50">
          {loading ? 'Entrando…' : 'Entrar'}
        </button>
        <a href="#" className="mt-4 inline-block text-xs text-ink-muted hover:text-ink">
          ← Voltar ao site
        </a>
      </form>
    </div>
  )
}

function Dashboard({
  pricing,
  leads,
  loadError,
  onRefresh,
  onLogout,
}: {
  pricing: PricingPayload
  leads: Lead[]
  loadError: boolean
  onRefresh: () => void
  onLogout: () => void
}) {
  return (
    <div className="min-h-screen bg-cream pb-20">
      <header className="sticky top-0 z-10 border-b border-ink/[0.06] bg-cream/90 backdrop-blur-lg">
        <div className="container-page flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="hidden items-center gap-1.5 rounded-full bg-ink px-3 py-1 text-xs font-bold text-white sm:inline-flex">
              <LockIcon className="h-3.5 w-3.5" /> ADMIN
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a href="#" className="text-sm font-medium text-ink-muted transition hover:text-ink">
              Ver site
            </a>
            <button onClick={onLogout} className="btn-ghost h-10 px-4 py-0 text-sm">
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="container-page pt-10">
        <div className="max-w-3xl">
          <span className="eyebrow">Uso interno · No público</span>
          <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tightest sm:text-4xl">
            Painel EurekaSi
          </h1>
          <p className="mt-3 text-lg text-ink-muted">
            Leads captados, calculadora de presupuestos e investigación de precios. Datos servidos
            de forma segura desde el servidor.
          </p>
        </div>

        {/* Leads */}
        <div className="mt-10">
          <LeadsTable leads={leads} loadError={loadError} onRefresh={onRefresh} />
        </div>

        {/* Calculadora */}
        <div className="mt-10">
          <BudgetCalculator
            calcCategories={pricing.calcCategories}
            unitLabels={pricing.unitLabels}
          />
        </div>

        {/* Tablas de referencia */}
        <div className="mt-10 space-y-8">
          <h2 className="font-display text-xl font-bold tracking-tightest">
            Tablas de referencia de mercado
          </h2>
          {pricing.priceCategories.map((cat) => (
            <section key={cat.id} className="card overflow-hidden">
              <div className="border-b border-ink/[0.06] bg-sand/40 px-5 py-4">
                <h3 className="font-display text-lg font-bold tracking-tightest">{cat.titulo}</h3>
                <p className="text-sm text-ink-muted">{cat.subtitulo}</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-ink/[0.06] text-xs uppercase tracking-wide text-ink-faint">
                      <th className="px-5 py-3 font-semibold">Concepto</th>
                      <th className="px-5 py-3 font-semibold">Desde</th>
                      <th className="px-5 py-3 font-semibold">Rango promedio</th>
                      <th className="px-5 py-3 font-semibold">Notas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cat.filas.map((f) => (
                      <tr key={f.concepto} className="border-b border-ink/[0.04] last:border-0">
                        <td className="px-5 py-3 font-semibold text-ink">{f.concepto}</td>
                        <td className="whitespace-nowrap px-5 py-3 font-bold text-accent-700">{f.desde}</td>
                        <td className="whitespace-nowrap px-5 py-3 text-ink-soft">{f.rango}</td>
                        <td className="px-5 py-3 text-ink-muted">{f.notas}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ))}
        </div>

        {/* Materiales */}
        <section className="card mt-10 overflow-hidden">
          <div className="border-b border-ink/[0.06] bg-sand/40 px-5 py-4">
            <h2 className="font-display text-lg font-bold tracking-tightest">¿Incluye materiales?</h2>
            <p className="text-sm text-ink-muted">Resumen de facturación en Portugal</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-ink/[0.06] text-xs uppercase tracking-wide text-ink-faint">
                  <th className="px-5 py-3 font-semibold">Servicio</th>
                  <th className="px-5 py-3 font-semibold">¿Material incluido?</th>
                  <th className="px-5 py-3 font-semibold">Observación</th>
                </tr>
              </thead>
              <tbody>
                {pricing.materialsSummary.map((m) => (
                  <tr key={m.servicio} className="border-b border-ink/[0.04] last:border-0">
                    <td className="px-5 py-3 font-semibold text-ink">{m.servicio}</td>
                    <td className="whitespace-nowrap px-5 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                          m.incluido === 'Sí'
                            ? 'bg-accent-50 text-accent-700'
                            : m.incluido === 'No'
                              ? 'bg-red-50 text-red-600'
                              : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {m.incluido}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-ink-muted">{m.observacion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="mt-6 rounded-2xl border border-ink/10 bg-white p-5 text-sm text-ink-soft">
          <strong className="text-ink">IVA · </strong>
          {pricing.ivaNote}
        </div>

        <section className="mt-10">
          <h2 className="font-display text-lg font-bold tracking-tightest">Fuentes</h2>
          <ol className="mt-3 grid gap-1.5 sm:grid-cols-2">
            {pricing.references.map((r) => (
              <li key={r.n} className="text-xs text-ink-muted">
                <span className="font-semibold text-ink-soft">[{r.n}]</span>{' '}
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-2 hover:text-accent-700 hover:underline"
                >
                  {r.label}
                </a>
              </li>
            ))}
          </ol>
        </section>
      </main>
    </div>
  )
}

const dateFmt = new Intl.DateTimeFormat('pt-PT', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})

const urgencyLabel: Record<string, string> = {
  hoje: 'Urgente',
  'esta-semana': 'Esta semana',
  flexivel: 'Flexible',
}

function LeadsTable({
  leads,
  loadError,
  onRefresh,
}: {
  leads: Lead[]
  loadError: boolean
  onRefresh: () => void
}) {
  return (
    <section className="card overflow-hidden">
      <div className="flex items-center justify-between border-b border-ink/[0.06] bg-sand/40 px-5 py-4">
        <div>
          <h2 className="font-display text-lg font-bold tracking-tightest">
            Leads <span className="text-ink-muted">({leads.length})</span>
          </h2>
          <p className="text-sm text-ink-muted">Contactos captados en el formulario público.</p>
        </div>
        <button onClick={onRefresh} className="btn-ghost h-10 px-4 py-0 text-sm">
          Actualizar
        </button>
      </div>

      {loadError ? (
        <p className="px-5 py-8 text-center text-sm text-red-500">No se pudieron cargar los leads.</p>
      ) : leads.length === 0 ? (
        <p className="px-5 py-10 text-center text-sm text-ink-muted">
          Aún no hay leads. Aparecerán aquí en cuanto alguien envíe el formulario.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-ink/[0.06] text-xs uppercase tracking-wide text-ink-faint">
                <th className="px-5 py-3 font-semibold">Fecha</th>
                <th className="px-5 py-3 font-semibold">Nombre</th>
                <th className="px-5 py-3 font-semibold">Teléfono</th>
                <th className="px-5 py-3 font-semibold">Servicio</th>
                <th className="px-5 py-3 font-semibold">Urgencia</th>
                <th className="px-5 py-3 font-semibold">C. postal</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.id} className="border-b border-ink/[0.04] align-top last:border-0">
                  <td className="whitespace-nowrap px-5 py-3 text-ink-muted">
                    {dateFmt.format(new Date(l.created_at))}
                  </td>
                  <td className="px-5 py-3 font-semibold text-ink">
                    {l.name}
                    {l.detail && (
                      <span className="mt-0.5 block max-w-[220px] truncate text-xs font-normal text-ink-faint">
                        {l.detail}
                      </span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3">
                    <a href={`tel:${l.phone}`} className="font-medium text-accent-700 hover:underline">
                      {l.phone}
                    </a>
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 text-ink-soft">{l.service ?? '—'}</td>
                  <td className="whitespace-nowrap px-5 py-3">
                    {l.urgency ? (
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                          l.urgency === 'hoje'
                            ? 'bg-red-50 text-red-600'
                            : 'bg-sand text-ink-soft'
                        }`}
                      >
                        {urgencyLabel[l.urgency] ?? l.urgency}
                      </span>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 text-ink-soft">{l.postal ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
