import { useMemo, useState } from 'react'
import type { CalcCategory, CalcItem, UnitLabels } from './types'

const fmt = (n: number) =>
  new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(
    Math.round(n),
  )

/**
 * Calculadora de presupuestos (uso interno). Los datos de precios llegan por
 * props desde el endpoint protegido — nunca están en el bundle público.
 */
export default function BudgetCalculator({
  calcCategories,
  unitLabels,
}: {
  calcCategories: CalcCategory[]
  unitLabels: UnitLabels
}) {
  const [activeCat, setActiveCat] = useState(calcCategories[0]?.id ?? '')
  const [qty, setQty] = useState<Record<string, number>>({})
  const [margin, setMargin] = useState(30)
  const [iva, setIva] = useState(true)

  const allItems = useMemo<CalcItem[]>(
    () => calcCategories.flatMap((c) => c.items),
    [calcCategories],
  )

  const setItemQty = (id: string, value: number) =>
    setQty((q) => ({ ...q, [id]: Number.isFinite(value) && value > 0 ? value : 0 }))

  const lines = useMemo(
    () =>
      allItems
        .filter((it) => (qty[it.id] ?? 0) > 0)
        .map((it) => {
          const q = qty[it.id]
          return { ...it, q, min: it.min * q, max: it.max * q, avg: ((it.min + it.max) / 2) * q }
        }),
    [qty, allItems],
  )

  const totals = useMemo(() => {
    const min = lines.reduce((s, l) => s + l.min, 0)
    const max = lines.reduce((s, l) => s + l.max, 0)
    const avg = lines.reduce((s, l) => s + l.avg, 0)
    const withMargin = avg * (1 + margin / 100)
    const suggested = iva ? withMargin * 1.23 : withMargin
    return { min, max, avg, suggested }
  }, [lines, margin, iva])

  const category = calcCategories.find((c) => c.id === activeCat) ?? calcCategories[0]

  return (
    <section className="card overflow-hidden">
      <div className="border-b border-ink/[0.06] bg-sand/40 px-5 py-4">
        <h2 className="font-display text-lg font-bold tracking-tightest">
          Calculadora de presupuestos
        </h2>
        <p className="text-sm text-ink-muted">
          Añade partidas con cantidad y obtén el presupuesto promedio al instante.
        </p>
      </div>

      <div className="grid gap-6 p-5 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <div className="flex flex-wrap gap-1.5">
            {calcCategories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCat(c.id)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  c.id === category?.id ? 'bg-ink text-white' : 'bg-sand text-ink-soft hover:bg-sand/70'
                }`}
              >
                {c.titulo}
              </button>
            ))}
          </div>

          <div className="mt-4 space-y-2">
            {category?.items.map((it) => {
              const u = unitLabels[it.unit]
              const avgUnit = (it.min + it.max) / 2
              return (
                <div
                  key={it.id}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-ink/[0.08] px-4 py-3"
                >
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-ink">{it.label}</div>
                    <div className="text-xs text-ink-muted">
                      {fmt(it.min)} – {fmt(it.max)}
                      {u.short} · prom. {fmt(avgUnit)}
                      {u.short}
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-1.5">
                    <input
                      type="number"
                      min={0}
                      step={it.unit === 'm2' ? 0.5 : 1}
                      value={qty[it.id] ?? ''}
                      onChange={(e) => setItemQty(it.id, parseFloat(e.target.value))}
                      placeholder="0"
                      className="w-20 rounded-xl border border-ink/10 px-3 py-2 text-right text-sm outline-none transition focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20"
                    />
                    <span className="w-14 text-xs text-ink-faint">{u.qty}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="lg:sticky lg:top-20 lg:self-start">
          <div className="rounded-2xl border border-ink/[0.08] bg-cream p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wide text-ink-faint">Resumen</h3>
              {lines.length > 0 && (
                <button
                  onClick={() => setQty({})}
                  className="text-xs font-semibold text-ink-muted hover:text-red-500"
                >
                  Limpiar
                </button>
              )}
            </div>

            {lines.length === 0 ? (
              <p className="mt-4 text-sm text-ink-muted">
                Añade cantidades a las partidas para calcular el presupuesto.
              </p>
            ) : (
              <ul className="mt-3 space-y-1.5 border-b border-ink/[0.08] pb-3">
                {lines.map((l) => (
                  <li key={l.id} className="flex items-center justify-between gap-2 text-sm">
                    <span className="min-w-0 truncate text-ink-soft">
                      {l.q}× {l.label}
                    </span>
                    <span className="shrink-0 font-semibold text-ink">{fmt(l.avg)}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-3 space-y-1.5 text-sm">
              <div className="flex justify-between text-ink-muted">
                <span>Rango de mercado</span>
                <span>
                  {fmt(totals.min)} – {fmt(totals.max)}
                </span>
              </div>
              <div className="flex justify-between font-semibold text-ink">
                <span>Coste promedio</span>
                <span>{fmt(totals.avg)}</span>
              </div>
            </div>

            <div className="mt-4 space-y-3 border-t border-ink/[0.08] pt-4">
              <label className="flex items-center justify-between gap-3 text-sm">
                <span className="font-medium text-ink-soft">Margen</span>
                <span className="flex items-center gap-1">
                  <input
                    type="number"
                    min={0}
                    value={margin}
                    onChange={(e) => setMargin(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-16 rounded-xl border border-ink/10 px-3 py-1.5 text-right text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20"
                  />
                  <span className="text-ink-faint">%</span>
                </span>
              </label>
              <label className="flex cursor-pointer items-center justify-between gap-3 text-sm">
                <span className="font-medium text-ink-soft">Añadir IVA (23%)</span>
                <input
                  type="checkbox"
                  checked={iva}
                  onChange={(e) => setIva(e.target.checked)}
                  className="h-5 w-5 accent-accent-600"
                />
              </label>
            </div>

            <div className="mt-4 rounded-2xl bg-ink p-4 text-white">
              <div className="text-xs uppercase tracking-wide text-white/60">
                Precio sugerido al cliente
              </div>
              <div className="mt-1 font-display text-3xl font-extrabold tracking-tightest">
                {fmt(totals.suggested)}
              </div>
              <div className="mt-1 text-xs text-white/50">
                Promedio {fmt(totals.avg)} · margen {margin}%{iva ? ' · IVA 23%' : ' · sin IVA'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
