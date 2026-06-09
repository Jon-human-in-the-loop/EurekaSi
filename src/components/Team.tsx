import { useLang } from '../i18n'
import { teamMeta } from '../data'
import { ShieldIcon, CheckIcon } from '../icons'

export default function Team() {
  const { t } = useLang()

  return (
    <section className="container-page py-20 sm:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2">
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

          <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-accent-200 bg-accent-50 px-5 py-4">
            <ShieldIcon className="h-7 w-7 shrink-0 text-accent-600" />
            <p className="text-sm font-medium text-accent-800">{t.team.guaranteeBox}</p>
          </div>
        </div>

        {/* Grelha da equipa — placeholders prontos para fotos autênticas */}
        <div className="grid grid-cols-2 gap-4">
          {teamMeta.map((m, i) => (
            <figure
              key={m.name}
              className={`card overflow-hidden ${i % 2 === 1 ? 'sm:translate-y-6' : ''}`}
            >
              <div
                className={`relative aspect-square bg-gradient-to-br ${m.tone}`}
                role="img"
                aria-label={m.name}
              >
                <span className="absolute inset-0 grid place-items-center font-display text-4xl font-extrabold text-white/80">
                  {m.initials}
                </span>
                <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-accent-700 backdrop-blur">
                  <ShieldIcon className="h-3.5 w-3.5" /> {t.team.verified}
                </span>
              </div>
              <figcaption className="p-4">
                <div className="font-bold tracking-tightest text-ink">{m.name}</div>
                <div className="text-sm text-ink-muted">
                  {t.team.members[i].role} · {t.team.members[i].years}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
