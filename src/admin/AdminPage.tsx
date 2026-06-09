import { useState } from 'react'
import {
  priceCategories,
  materialsSummary,
  ivaNote,
  references,
} from './pricingData'
import { LockIcon, ShieldIcon } from '../icons'
import Logo from '../components/Logo'
import BudgetCalculator from './BudgetCalculator'

/**
 * Área PRIVADA de administração — tablero interno de precios.
 *
 * ⚠️ AVISO DE SEGURIDAD: esta app es solo frontend. Este "gate" por
 * contraseña oculta la sección de la vista pública, pero NO es seguridad
 * real: tanto la contraseña como los datos acaban en el bundle del cliente.
 * Para producción, mover estos datos a un backend y protegerlos con
 * autenticación real del lado del servidor (ver README).
 */

const ADMIN_PASSWORD = (import.meta.env.VITE_ADMIN_PASSWORD as string) || 'eurekasi2026'
const SESSION_KEY = 'eurekasi.admin'

function Gate({ onUnlock }: { onUnlock: () => void }) {
  const [pw, setPw] = useState('')
  const [error, setError] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1')
      onUnlock()
    } else {
      setError(true)
    }
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
          Painel interno de preços. Acceso solo para el equipo.
        </p>

        <input
          type="password"
          value={pw}
          autoFocus
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

        <button type="submit" className="btn-primary mt-4 w-full">
          Entrar
        </button>
        <a href="#" className="mt-4 inline-block text-xs text-ink-muted hover:text-ink">
          ← Voltar ao site
        </a>
      </form>
    </div>
  )
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="min-h-screen bg-cream pb-20">
      {/* Barra superior */}
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
            Investigación de precios — Portugal
          </h1>
          <p className="mt-3 text-lg text-ink-muted">
            Tabla de referencia de mercado (2024–2026) para orçamentar leads. Estos valores
            <strong> no se muestran</strong> en el site público.
          </p>
        </div>

        {/* Aviso de seguridad */}
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-300 bg-amber-50 px-5 py-4 text-sm text-amber-900">
          <ShieldIcon className="mt-0.5 h-5 w-5 shrink-0" />
          <p>
            <strong>Nota:</strong> este panel es un gate de cliente (oculta, no protege). Para
            datos realmente privados, moverlos a un backend con autenticación. Ver README.
          </p>
        </div>

        {/* Calculadora de presupuestos */}
        <div className="mt-10">
          <BudgetCalculator />
        </div>

        {/* Tablas por categoría */}
        <div className="mt-10 space-y-8">
          <h2 className="font-display text-xl font-bold tracking-tightest">
            Tablas de referencia de mercado
          </h2>
          {priceCategories.map((cat) => (
            <section key={cat.id} className="card overflow-hidden">
              <div className="border-b border-ink/[0.06] bg-sand/40 px-5 py-4">
                <h2 className="font-display text-lg font-bold tracking-tightest">{cat.titulo}</h2>
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

        {/* Materiales incluidos */}
        <section className="card mt-10 overflow-hidden">
          <div className="border-b border-ink/[0.06] bg-sand/40 px-5 py-4">
            <h2 className="font-display text-lg font-bold tracking-tightest">
              ¿Incluye materiales?
            </h2>
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
                {materialsSummary.map((m) => (
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

        {/* IVA */}
        <div className="mt-6 rounded-2xl border border-ink/10 bg-white p-5 text-sm text-ink-soft">
          <strong className="text-ink">IVA · </strong>
          {ivaNote}
        </div>

        {/* Referencias */}
        <section className="mt-10">
          <h2 className="font-display text-lg font-bold tracking-tightest">Fuentes</h2>
          <ol className="mt-3 grid gap-1.5 sm:grid-cols-2">
            {references.map((r) => (
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

export default function AdminPage() {
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === '1',
  )

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY)
    setUnlocked(false)
  }

  if (!unlocked) return <Gate onUnlock={() => setUnlocked(true)} />
  return <Dashboard onLogout={logout} />
}
