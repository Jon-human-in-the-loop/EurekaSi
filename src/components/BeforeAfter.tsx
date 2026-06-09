import { useLang } from '../i18n'
import { beforeAfterMeta } from '../data'

export default function BeforeAfter() {
  const { t } = useLang()

  return (
    <section id="trabalhos" className="container-page scroll-mt-24 py-20 sm:py-28">
      <div className="max-w-2xl">
        <span className="eyebrow">{t.work.eyebrow}</span>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tightest text-ink sm:text-4xl">
          {t.work.title}
        </h2>
        <p className="mt-4 text-lg text-ink-muted">{t.work.subtitle}</p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {beforeAfterMeta.map((b, i) => {
          const tx = t.work.items[i]
          return (
            <figure key={b.id} className="card overflow-hidden">
              <div className="grid grid-cols-2 gap-px bg-ink/[0.06]">
                <div
                  className={`relative aspect-[4/5] bg-gradient-to-br ${b.beforeTone}`}
                  role="img"
                  aria-label={`${t.work.before} — ${tx.service}`}
                >
                  <span className="absolute left-3 top-3 rounded-full bg-ink/70 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white backdrop-blur">
                    {t.work.before}
                  </span>
                </div>
                <div
                  className={`relative aspect-[4/5] bg-gradient-to-br ${b.afterTone}`}
                  role="img"
                  aria-label={`${t.work.after} — ${tx.service}`}
                >
                  <span className="absolute right-3 top-3 rounded-full bg-accent-600 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                    {t.work.after}
                  </span>
                </div>
              </div>
              <figcaption className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-bold tracking-tightest text-ink">{tx.service}</h3>
                  <span className="shrink-0 rounded-full bg-sand px-2.5 py-1 text-xs font-semibold text-ink-soft">
                    {tx.duration}
                  </span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{tx.summary}</p>
                <p className="mt-2 text-xs font-medium text-ink-faint">{b.location}</p>
              </figcaption>
            </figure>
          )
        })}
      </div>
    </section>
  )
}
