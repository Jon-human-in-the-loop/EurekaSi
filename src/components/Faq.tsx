import { useState } from 'react'
import { useLang } from '../i18n'
import { PlusIcon } from '../icons'

export default function Faq() {
  const { t } = useLang()
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="container-page py-20 sm:py-28">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <span className="eyebrow">{t.faq.eyebrow}</span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tightest text-ink sm:text-4xl">
            {t.faq.title}
          </h2>
          <p className="mt-4 text-lg text-ink-muted">{t.faq.subtitle}</p>
        </div>

        <div className="divide-y divide-ink/[0.08] border-y border-ink/[0.08]">
          {t.faq.items.map((f, i) => {
            const isOpen = open === i
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-[17px] font-semibold text-ink">{f.q}</span>
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-ink/10 text-ink transition-transform duration-300 ${
                      isOpen ? 'rotate-45 bg-accent-500 text-white' : ''
                    }`}
                  >
                    <PlusIcon className="h-4 w-4" />
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr] pb-5 opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <p className="overflow-hidden text-[15px] leading-relaxed text-ink-muted">{f.a}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
