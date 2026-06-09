import { useEffect, useState } from 'react'
import { useBooking } from '../booking'
import { useLang } from '../i18n'
import { MenuIcon, CloseIcon } from '../icons'
import Logo from './Logo'
import LangSwitcher from './LangSwitcher'

const hrefs = ['#servicos', '#como-funciona', '#trabalhos', '#avaliacoes']

export default function Header() {
  const { open } = useBooking()
  const { t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = hrefs.map((href, i) => ({ href, label: t.nav[i] }))

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-ink/[0.06] bg-cream/85 backdrop-blur-lg' : 'bg-transparent'
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between sm:h-20">
        <a href="#topo" className="flex items-center" aria-label={`${t.brand} — início`}>
          <Logo />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-ink-muted transition hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LangSwitcher className="hidden sm:inline-flex" />
          <button onClick={() => open()} className="btn-accent hidden h-11 px-5 py-0 text-sm sm:inline-flex">
            {t.common.requestQuote}
          </button>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
            className="grid h-11 w-11 place-items-center rounded-full text-ink transition hover:bg-sand md:hidden"
          >
            {menuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="border-t border-ink/[0.06] bg-cream md:hidden">
          <nav className="container-page flex flex-col py-2">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-ink/[0.05] py-3.5 text-base font-medium text-ink"
              >
                {l.label}
              </a>
            ))}
            <div className="flex items-center justify-between py-4">
              <LangSwitcher />
            </div>
            <button
              onClick={() => {
                setMenuOpen(false)
                open()
              }}
              className="btn-accent mb-3 w-full"
            >
              {t.common.requestQuoteFree}
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}
