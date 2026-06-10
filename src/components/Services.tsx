import { useState } from 'react'
import { useBooking } from '../booking'
import { useLang } from '../i18n'
import { serviceMeta, type ServiceMeta } from '../data'
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

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {serviceMeta.map((s, i) => (
          <ServiceCard
            key={s.id}
            service={s}
            name={t.services.items[i].name}
            tagline={t.services.items[i].tagline}
            urgentBadge={t.services.urgentBadge}
            freeQuote={t.services.freeQuote}
            cardCta={t.services.cardCta}
            onClick={() => open(s.id)}
          />
        ))}
      </div>
    </section>
  )
}

function ServiceCard({
  service,
  name,
  tagline,
  urgentBadge,
  freeQuote,
  cardCta,
  onClick,
}: {
  service: ServiceMeta
  name: string
  tagline: string
  urgentBadge: string
  freeQuote: string
  cardCta: string
  onClick: () => void
}) {
  const Icon = service.icon
  const [imgFailed, setImgFailed] = useState(false)
  const showImage = service.image && !imgFailed

  return (
    <button
      onClick={onClick}
      className="card group flex flex-col overflow-hidden p-0 text-left transition hover:-translate-y-1 hover:shadow-lift"
    >
      {/* Imagem / placeholder */}
      <div className={`relative aspect-[4/3] overflow-hidden bg-gradient-to-br ${service.tone}`}>
        {/* Placeholder: ícone de traço ultra-fino (sem cliché de stock) */}
        <Icon className="absolute inset-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 text-ink/25" />

        {showImage && (
          <>
            <img
              src={service.image}
              alt={name}
              loading="lazy"
              onError={() => setImgFailed(true)}
              className="absolute inset-0 h-full w-full object-cover saturate-[1.05]"
            />
            {/* Filtro cálido para coesão entre fotos */}
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-amber-900/15 via-transparent to-amber-100/10 mix-blend-multiply"
            />
          </>
        )}

        {service.urgent && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-accent-700 shadow-soft backdrop-blur">
            {urgentBadge}
          </span>
        )}
      </div>

      {/* Conteúdo */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold tracking-tightest text-ink">{name}</h3>
        <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-muted">{tagline}</p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm font-semibold text-accent-700">{freeQuote}</span>
          <span className="flex items-center gap-1 text-sm font-semibold text-ink">
            {cardCta}
            <ArrowIcon className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </button>
  )
}
