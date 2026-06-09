import { LANGS, useLang } from '../i18n'

/**
 * Seletor de idioma compacto (PT / EN / ES) em estilo segmented control.
 */
export default function LangSwitcher({ className = '' }: { className?: string }) {
  const { lang, setLang } = useLang()

  return (
    <div
      role="group"
      aria-label="Idioma / Language / Idioma"
      className={`inline-flex items-center gap-0.5 rounded-full border border-ink/10 bg-white p-0.5 ${className}`}
    >
      {LANGS.map((l) => {
        const active = l.code === lang
        return (
          <button
            key={l.code}
            onClick={() => setLang(l.code)}
            aria-pressed={active}
            className={`rounded-full px-2.5 py-1 text-xs font-bold tracking-wide transition ${
              active ? 'bg-ink text-white' : 'text-ink-muted hover:text-ink'
            }`}
          >
            {l.label}
          </button>
        )
      })}
    </div>
  )
}
