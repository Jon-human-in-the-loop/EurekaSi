import { useLang } from '../i18n'
import { countries } from '../data'
import { StarIcon } from '../icons'
import Flag from './Flag'

export default function Experience() {
  const { t } = useLang()

  return (
    <section id="experiencia" className="scroll-mt-24 bg-sand/60 py-20 sm:py-28">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="eyebrow">{t.experience.eyebrow}</span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tightest text-ink sm:text-4xl">
            {t.experience.title}
          </h2>
          <p className="mt-4 text-lg text-ink-muted">{t.experience.subtitle}</p>
        </div>

        {/* Países onde a equipa já trabalhou */}
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {countries.map((c, i) => (
            <li
              key={c.code}
              className="card flex items-center gap-3 p-4 transition hover:-translate-y-0.5 hover:shadow-lift"
            >
              <Flag colors={c.colors} className="h-6 w-9 shrink-0" />
              <span className="text-sm font-semibold tracking-tightest text-ink">
                {t.countries[i]}
              </span>
            </li>
          ))}
        </ul>

        {/* Hueco preparado para reseñas reales futuras */}
        <div className="mt-8 flex flex-col items-start gap-4 rounded-3xl border border-dashed border-ink/15 bg-white/60 p-6 sm:flex-row sm:items-center sm:gap-6">
          <div className="flex shrink-0 items-center gap-1 text-ink-faint">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon key={i} className="h-5 w-5" />
            ))}
          </div>
          <div>
            <h3 className="font-display text-lg font-bold tracking-tightest text-ink">
              {t.experience.reviewsSoonTitle}
            </h3>
            <p className="mt-1 text-sm text-ink-muted">{t.experience.reviewsSoonText}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
