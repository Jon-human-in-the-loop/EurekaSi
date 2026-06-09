import { stats } from '../data'

export default function Stats() {
  return (
    <section className="container-page mt-16 sm:mt-24">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-4xl border border-ink/[0.06] bg-ink/[0.06] sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white px-5 py-7 text-center sm:py-9">
            <div className="font-display text-3xl font-extrabold tracking-tightest text-ink sm:text-4xl">
              {s.value}
            </div>
            <div className="mt-1.5 text-sm text-ink-muted">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
