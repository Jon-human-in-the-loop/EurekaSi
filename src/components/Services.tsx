import { useBooking } from '../booking'
import { useLang } from '../i18n'
import { serviceMeta } from '../data'
import { ArrowIcon } from '../icons'

export default function Services() {
  const { open } = useBooking()
  const { t } = useLang()

  return (
    <section id="servicos" className="container-page scroll-mt-24 py-20 sm:py-28">
      <div className="max-w-2xl">
        <span className="eyebrow">{t.services.eyebrow}</span>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tightest text-ink sm:text-4xl">
          {t.services.title}
        </h2>
        <p className="mt-4 text-lg text-ink-muted">{t.services.subtitle}</p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {serviceMeta.map((s, i) => {
          const Icon = s.icon
          const tx = t.services.items[i]
          return (
            <button
              key={s.id}
              onClick={() => open(s.id)}
              className="card group flex flex-col p-6 text-left transition hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="flex items-start justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sand text-ink transition group-hover:bg-accent-500 group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </span>
                {s.urgent && (
                  <span className="rounded-full bg-accent-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-accent-700">
                    {t.services.urgentBadge}
                  </span>
                )}
              </div>

              <h3 className="mt-5 text-xl font-bold tracking-tightest text-ink">{tx.name}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{tx.tagline}</p>

              <ul className="mt-4 flex flex-wrap gap-1.5">
                {tx.examples.map((e) => (
                  <li
                    key={e}
                    className="rounded-full bg-sand/70 px-2.5 py-1 text-xs font-medium text-ink-soft"
                  >
                    {e}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-center justify-between border-t border-ink/[0.06] pt-4">
                <span className="text-sm text-ink-muted">
                  {t.services.priceFrom}{' '}
                  <strong className="text-lg font-bold text-ink">{s.priceFrom}&nbsp;€</strong>
                  {s.unit && <span className="text-xs">{s.unit}</span>}
                </span>
                <span className="flex items-center gap-1 text-sm font-semibold text-accent-700">
                  {t.services.cardCta}
                  <ArrowIcon className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}
