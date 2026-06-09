import { useBooking } from '../booking'
import { services } from '../data'
import { StarIcon, ShieldIcon, ClockIcon, TagIcon, ArrowIcon } from '../icons'

export default function Hero() {
  const { open } = useBooking()

  return (
    <section id="topo" className="relative overflow-hidden pt-28 sm:pt-36">
      {/* Brilho suave de fundo — minimalista */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-accent-200/40 blur-[120px]"
      />

      <div className="container-page relative">
        <div className="mx-auto max-w-3xl text-center">
          {/* Prova de imediatez */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-4 py-1.5 text-sm font-medium text-ink-soft shadow-soft backdrop-blur animate-fade-up">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-500" />
            </span>
            Profissionais disponíveis agora na sua zona
          </div>

          <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tightest text-ink sm:text-6xl animate-fade-up">
            O seu lar, resolvido.
            <br />
            <span className="text-accent-600">Em minutos, não em dias.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-muted animate-fade-up">
            Canalização, eletricidade, pintura, telhados e limpeza. Profissionais verificados,
            preços fixos e sem surpresas. Peça já o seu orçamento gratuito.
          </p>

          {/* CTA protagonista (inspiração PreFix) */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row animate-fade-up">
            <button onClick={() => open()} className="btn-accent w-full px-9 py-5 text-lg sm:w-auto">
              Pedir orçamento grátis
              <ArrowIcon className="h-5 w-5" />
            </button>
            <a href="#como-funciona" className="btn-ghost w-full px-7 py-5 text-base sm:w-auto">
              Ver como funciona
            </a>
          </div>

          {/* Micro-confiança */}
          <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink-muted animate-fade-up">
            <li className="flex items-center gap-1.5">
              <TagIcon className="h-4 w-4 text-accent-600" /> Preço fixo, sem surpresas
            </li>
            <li className="flex items-center gap-1.5">
              <ShieldIcon className="h-4 w-4 text-accent-600" /> Profissionais verificados
            </li>
            <li className="flex items-center gap-1.5">
              <ClockIcon className="h-4 w-4 text-accent-600" /> Resposta em &lt; 30 min
            </li>
          </ul>

          {/* Prova social imediata (inspiração Absolute Home Services) */}
          <div className="mt-9 flex items-center justify-center gap-3 animate-fade-up">
            <div className="flex -space-x-2">
              {['MC', 'JA', 'SM', 'RN'].map((i, idx) => (
                <span
                  key={i}
                  className="grid h-9 w-9 place-items-center rounded-full border-2 border-cream bg-ink text-[11px] font-bold text-white"
                  style={{ zIndex: 4 - idx }}
                >
                  {i}
                </span>
              ))}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1 text-accent-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} className="h-4 w-4" />
                ))}
                <span className="ml-1 text-sm font-bold text-ink">4,9</span>
              </div>
              <p className="text-xs text-ink-muted">+2 400 avaliações de clientes em Portugal</p>
            </div>
          </div>
        </div>

        {/* Acesso rápido aos serviços */}
        <div className="mx-auto mt-14 max-w-3xl animate-fade-up">
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.16em] text-ink-faint">
            Toque no que precisa
          </p>
          <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-6">
            {services.map((s) => {
              const Icon = s.icon
              return (
                <button
                  key={s.id}
                  onClick={() => open(s.id)}
                  className="group flex flex-col items-center gap-2 rounded-2xl border border-ink/[0.06] bg-white p-3 shadow-soft transition hover:-translate-y-0.5 hover:border-accent-300 hover:shadow-lift"
                >
                  <Icon className="h-7 w-7 text-ink transition group-hover:text-accent-600" />
                  <span className="text-center text-xs font-semibold leading-tight text-ink-soft">
                    {s.name}
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
