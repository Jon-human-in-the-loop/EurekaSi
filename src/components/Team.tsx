import { useLang } from '../i18n'
import { ShieldIcon, CheckIcon } from '../icons'

export default function Team() {
  const { t } = useLang()

  return (
    <section className="container-page py-20 sm:py-28">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Texto de confianza */}
        <div>
          <span className="eyebrow">{t.team.eyebrow}</span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tightest text-ink sm:text-4xl">
            {t.team.title}
          </h2>
          <p className="mt-4 text-lg text-ink-muted">{t.team.subtitle}</p>

          <ul className="mt-8 space-y-3">
            {t.team.guarantees.map((g) => (
              <li key={g} className="flex items-center gap-3 text-ink-soft">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent-100 text-accent-600">
                  <CheckIcon className="h-4 w-4" strokeWidth={2.5} />
                </span>
                <span className="text-[15px]">{g}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Promessa / garantia */}
        <div className="relative overflow-hidden rounded-4xl bg-ink p-8 text-white sm:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent-500/20 blur-3xl"
          />
          <div className="relative">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10 text-accent-300">
              <ShieldIcon className="h-7 w-7" />
            </span>
            <h3 className="mt-5 font-display text-2xl font-bold tracking-tightest">
              {t.team.promiseTitle}
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-white/70">{t.team.promiseText}</p>

            <ul className="mt-7 space-y-3 border-t border-white/10 pt-6">
              {t.team.promisePoints.map((p) => (
                <li key={p} className="flex items-center gap-3">
                  <CheckIcon className="h-5 w-5 shrink-0 text-accent-300" strokeWidth={2.5} />
                  <span className="text-sm text-white/90">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
