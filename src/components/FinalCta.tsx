import { useBooking } from '../booking'
import { ArrowIcon, PhoneIcon, ClockIcon } from '../icons'

export default function FinalCta() {
  const { open } = useBooking()

  return (
    <section className="container-page pb-24 pt-4 sm:pb-32">
      <div className="relative overflow-hidden rounded-4xl bg-accent-600 px-6 py-14 text-center text-white sm:px-12 sm:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-ink/10 blur-3xl"
        />

        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium backdrop-blur">
            <ClockIcon className="h-4 w-4" /> Resposta em menos de 30 minutos
          </div>
          <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-extrabold leading-tight tracking-tightest sm:text-5xl">
            Pronto para resolver?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
            Orçamento gratuito e sem compromisso. Só paga quando o trabalho estiver feito.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              onClick={() => open()}
              className="btn w-full bg-white px-9 py-5 text-lg text-accent-700 shadow-lift hover:bg-white/90 sm:w-auto"
            >
              Pedir orçamento grátis
              <ArrowIcon className="h-5 w-5" />
            </button>
            <a
              href="tel:+351300000000"
              className="btn w-full border border-white/30 px-7 py-5 text-base text-white hover:bg-white/10 sm:w-auto"
            >
              <PhoneIcon className="h-5 w-5" /> 300 000 000
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
