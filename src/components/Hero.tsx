import { useBooking } from '../booking'
import { useLang } from '../i18n'
import { serviceMeta, testimonialMeta } from '../data'
import { StarIcon, ShieldIcon, ClockIcon, TagIcon, ArrowIcon } from '../icons'

const trustIcons = [TagIcon, ShieldIcon, ClockIcon]

export default function Hero() {
  const { open } = useBooking()
  const { t } = useLang()

  return (
    <section id="topo" className="relative overflow-hidden pt-28 sm:pt-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-accent-200/40 blur-[120px]"
      />

      <div className="container-page relative">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-4 py-1.5 text-sm font-medium text-ink-soft shadow-soft backdrop-blur animate-fade-up">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-500" />
            </span>
            {t.hero.badge}
          </div>

          <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tightest text-ink sm:text-6xl animate-fade-up">
            {t.hero.titleLine1}
            <br />
            <span className="text-accent-600">{t.hero.titleLine2}</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-muted animate-fade-up">
            {t.hero.subtitle}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row animate-fade-up">
            <button onClick={() => open()} className="btn-accent w-full px-9 py-5 text-lg sm:w-auto">
              {t.hero.ctaPrimary}
              <ArrowIcon className="h-5 w-5" />
            </button>
            <a href="#como-funciona" className="btn-ghost w-full px-7 py-5 text-base sm:w-auto">
              {t.hero.ctaSecondary}
            </a>
          </div>

          <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink-muted animate-fade-up">
            {t.hero.trust.map((label, i) => {
              const Icon = trustIcons[i]
              return (
                <li key={label} className="flex items-center gap-1.5">
                  <Icon className="h-4 w-4 text-accent-600" /> {label}
                </li>
              )
            })}
          </ul>

          <div className="mt-9 flex items-center justify-center gap-3 animate-fade-up">
            <div className="flex -space-x-2">
              {testimonialMeta.slice(0, 4).map((m, idx) => (
                <span
                  key={m.initials}
                  className="grid h-9 w-9 place-items-center rounded-full border-2 border-cream bg-ink text-[11px] font-bold text-white"
                  style={{ zIndex: 4 - idx }}
                >
                  {m.initials}
                </span>
              ))}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1 text-accent-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} className="h-4 w-4" />
                ))}
                <span className="ml-1 text-sm font-bold text-ink">{t.stats[0].value.split('/')[0]}</span>
              </div>
              <p className="text-xs text-ink-muted">{t.hero.reviewsLine}</p>
            </div>
          </div>
        </div>

        {/* Acesso rápido aos serviços */}
        <div className="mx-auto mt-14 max-w-3xl animate-fade-up">
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.16em] text-ink-faint">
            {t.hero.quickAccess}
          </p>
          <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-6">
            {serviceMeta.map((s, i) => {
              const Icon = s.icon
              return (
                <button
                  key={s.id}
                  onClick={() => open(s.id)}
                  className="group flex flex-col items-center gap-2 rounded-2xl border border-ink/[0.06] bg-white p-3 shadow-soft transition hover:-translate-y-0.5 hover:border-accent-300 hover:shadow-lift"
                >
                  <Icon className="h-7 w-7 text-ink transition group-hover:text-accent-600" />
                  <span className="text-center text-xs font-semibold leading-tight text-ink-soft">
                    {t.services.items[i].name}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
