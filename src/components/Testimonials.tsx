import { useLang } from '../i18n'
import { testimonialMeta } from '../data'
import { StarIcon } from '../icons'

export default function Testimonials() {
  const { t } = useLang()

  return (
    <section id="avaliacoes" className="scroll-mt-24 bg-sand/60 py-20 sm:py-28">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="eyebrow">{t.reviews.eyebrow}</span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tightest text-ink sm:text-4xl">
              {t.reviews.title}
            </h2>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-ink/[0.06] bg-white px-5 py-3 shadow-soft">
            <div className="flex text-accent-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} className="h-5 w-5" />
              ))}
            </div>
            <div>
              <div className="font-display text-xl font-extrabold tracking-tightest text-ink">
                {t.stats[0].value}
              </div>
              <div className="text-xs text-ink-muted">{t.reviews.ratingCount}</div>
            </div>
          </div>
        </div>

        <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {testimonialMeta.map((m, i) => {
            const tx = t.reviews.items[i]
            return (
              <figure key={m.name} className="card break-inside-avoid p-6">
                <div className="flex items-center gap-1 text-accent-500">
                  {Array.from({ length: m.rating }).map((_, j) => (
                    <StarIcon key={j} className="h-4 w-4" />
                  ))}
                </div>
                <blockquote className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                  “{tx.quote}”
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-xs font-bold text-white">
                    {m.initials}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-ink">{m.name}</span>
                    <span className="block text-xs text-ink-muted">
                      {tx.service} · {m.city}
                    </span>
                  </span>
                </figcaption>
              </figure>
            )
          })}
        </div>
      </div>
    </section>
  )
}
