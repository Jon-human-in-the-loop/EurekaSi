import { useBooking } from '../booking'
import { useLang, fill } from '../i18n'
import { serviceMeta, contact } from '../data'
import { LockIcon } from '../icons'
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
              <li>
                <span className="block text-xs text-ink-faint">{t.footer.callLabel}</span>
                <a href={contact.callHref} className="font-medium transition hover:text-ink">
                  {contact.callPhone}
                </a>
              </li>
              <li>
                <span className="block text-xs text-ink-faint">{t.footer.whatsappLabel}</span>
                <a
                  href={contact.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium transition hover:text-ink"
                >
                  {contact.whatsappPhone}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="transition hover:text-ink">
                  {contact.email}
                </a>
              </li>
              <li className="text-ink-faint">{t.footer.hours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-ink/[0.06] pt-6 text-xs text-ink-faint sm:flex-row sm:items-center">
          <p>{fill(t.footer.rights, { year: String(year) })}</p>
          <div className="flex items-center gap-5">
            {t.footer.legal.map((l) => (
              <a key={l} href="#" className="transition hover:text-ink">
                {l}
              </a>
            ))}
            <a
              href="#admin"
              aria-label="Área reservada"
              title="Área reservada"
              className="text-ink-faint/60 transition hover:text-ink"
            >
              <LockIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
