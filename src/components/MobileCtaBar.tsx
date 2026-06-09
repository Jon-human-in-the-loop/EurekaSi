import { useEffect, useState } from 'react'
import { useBooking } from '../booking'
import { useLang } from '../i18n'
import { ArrowIcon, WhatsappIcon } from '../icons'

/**
 * Barra fixa inferior só em mobile — mantém o CTA sempre ao alcance do polegar
 * (uso com uma só mão numa emergência). Aparece após o scroll inicial.
 */
export default function MobileCtaBar() {
  const { open, isOpen } = useBooking()
  const { t } = useLang()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (isOpen) return null

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-ink/[0.06] bg-cream/90 px-4 pb-[calc(env(safe-area-inset-bottom)+0.6rem)] pt-3 backdrop-blur-lg transition-transform duration-300 md:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="flex items-center gap-2.5">
        <a
          href="https://wa.me/351300000000"
          aria-label="WhatsApp"
          className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-ink/10 bg-white p-3 text-accent-600"
        >
          <WhatsappIcon className="h-6 w-6" />
        </a>
        <button onClick={() => open()} className="btn-accent h-14 flex-1 py-0">
          {t.common.requestQuoteFree}
          <ArrowIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
