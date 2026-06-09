import { services } from '../data'
import { useBooking } from '../booking'
import Logo from './Logo'

export default function Footer() {
  const { open } = useBooking()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-ink/[0.06] bg-cream">
      <div className="container-page py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-muted">
              Serviços para o seu lar com profissionais verificados, preços fixos e resposta em
              minutos. Em todo o Portugal Continental.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-ink">Serviços</h3>
            <ul className="mt-4 space-y-2.5">
              {services.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => open(s.id)}
                    className="text-sm text-ink-muted transition hover:text-ink"
                  >
                    {s.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-ink">Empresa</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-ink-muted">
              <li><a href="#trabalhos" className="transition hover:text-ink">Trabalhos</a></li>
              <li><a href="#avaliacoes" className="transition hover:text-ink">Avaliações</a></li>
              <li><a href="#como-funciona" className="transition hover:text-ink">Como funciona</a></li>
              <li><a href="#" className="transition hover:text-ink">Trabalhar connosco</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-ink">Contacto</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-ink-muted">
              <li><a href="tel:+351300000000" className="transition hover:text-ink">300 000 000</a></li>
              <li><a href="mailto:ola@eureka.pt" className="transition hover:text-ink">ola@eureka.pt</a></li>
              <li className="text-ink-faint">Seg–Dom · 8h–22h</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-ink/[0.06] pt-6 text-xs text-ink-faint sm:flex-row sm:items-center">
          <p>© {year} Eureka Serviços. Todos os direitos reservados.</p>
          <div className="flex gap-5">
            <a href="#" className="transition hover:text-ink">Termos</a>
            <a href="#" className="transition hover:text-ink">Privacidade</a>
            <a href="#" className="transition hover:text-ink">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
