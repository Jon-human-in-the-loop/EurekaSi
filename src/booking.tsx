import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

type BookingContextValue = {
  isOpen: boolean
  /** serviço pré-selecionado, se o utilizador clicou num cartão */
  preselectedService: string | null
  open: (serviceId?: string) => void
  close: () => void
}

const BookingContext = createContext<BookingContextValue | null>(null)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [preselectedService, setPreselectedService] = useState<string | null>(null)

  const open = useCallback((serviceId?: string) => {
    setPreselectedService(serviceId ?? null)
    setIsOpen(true)
    // Bloqueia o scroll do fundo enquanto o modal está aberto
    document.documentElement.style.overflow = 'hidden'
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
    document.documentElement.style.overflow = ''
  }, [])

  const value = useMemo(
    () => ({ isOpen, preselectedService, open, close }),
    [isOpen, preselectedService, open, close],
  )

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking deve ser usado dentro de <BookingProvider>')
  return ctx
}
