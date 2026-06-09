import { useBooking } from '../booking'
import { steps } from '../data'
import { ArrowIcon } from '../icons'

export default function HowItWorks() {
  const { open } = useBooking()

  return (
    <section
      id="como-funciona"
      className="scroll-mt-24 bg-ink py-20 text-white sm:py-28"
    >
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent-300">
            Como funciona
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tightest sm:text-4xl">
            Simples como deve ser. Três passos.
          </h2>
          <p className="mt-4 text-lg text-white/60">
            Sem chamadas intermináveis nem orçamentos que demoram dias. Resolva em três toques.
          </p>
        </div>

        <ol className="mt-12 grid gap-8 sm:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="relative">
              <div className="flex items-center gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/15 font-display text-xl font-bold text-accent-300">
                  {i + 1}
                </span>
                {i < steps.length - 1 && (
                  <span className="hidden h-px flex-1 bg-gradient-to-r from-white/20 to-transparent sm:block" />
                )}
              </div>
              <h3 className="mt-5 text-xl font-bold tracking-tightest">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-white/60">{s.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12">
          <button onClick={() => open()} className="btn-accent px-8 py-4">
            Começar agora
            <ArrowIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
