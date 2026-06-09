import { useBooking } from '../booking'
import { useLang, fill } from '../i18n'
import { serviceMeta } from '../data'
import Logo from './Logo'

export default function Footer() {
  const { open } = useBooking()
  const { t } = useLang()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-ink/[0.06] bg-cream">
      <div className="container-page py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-muted">{t.footer.tagline}</p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-ink">
              {t.footer.servicesHead}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {serviceMeta.map((s, i) => (
                <li key={s.id}>
                  <button
                    onClick={() => open(s.id)}
                    className="text-sm text-ink-muted transition hover:text-ink"
                  >
                    {t.services.items[i].name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-ink">
              {t.footer.companyHead}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-ink-muted">
              {t.footer.companyLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="transition hover:text-ink">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-ink">
              {t.footer.contactHead}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-ink-muted">
              <li><a href="tel:+351300000000" className="transition hover:text-ink">300 000 000</a></li>
              <li><a href="mailto:ola@eurekasi.pt" className="transition hover:text-ink">ola@eurekasi.pt</a></li>
              <li className="text-ink-faint">{t.footer.hours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-ink/[0.06] pt-6 text-xs text-ink-faint sm:flex-row sm:items-center">
          <p>{fill(t.footer.rights, { year: String(year) })}</p>
          <div className="flex gap-5">
            {t.footer.legal.map((l) => (
              <a key={l} href="#" className="transition hover:text-ink">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
