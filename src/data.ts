import {
  PlumbingIcon,
  ElectricIcon,
  PaintIcon,
  RoofIcon,
  CleanIcon,
  CarpentryIcon,
  AcIcon,
  SolarIcon,
} from './icons'
import type { ComponentType, SVGProps } from 'react'

type IconType = ComponentType<SVGProps<SVGSVGElement>>

/**
 * Metadados ESTRUTURAIS dos serviços (não traduzíveis): ícone e se é uma
 * categoria de urgências. O texto (nome, tagline, exemplos) vive em
 * src/i18n.tsx. Os PREÇOS não são públicos — vivem na área de admin
 * (src/admin/pricingData.ts), para captação de leads sem mostrar valores.
 */
export type ServiceMeta = {
  id: string
  icon: IconType
  urgent?: boolean
}

export const serviceMeta: ServiceMeta[] = [
  { id: 'canalizacao', icon: PlumbingIcon, urgent: true },
  { id: 'eletricidade', icon: ElectricIcon, urgent: true },
  { id: 'pintura', icon: PaintIcon },
  { id: 'telhados', icon: RoofIcon, urgent: true },
  { id: 'limpeza', icon: CleanIcon },
  { id: 'montagens', icon: CarpentryIcon },
  { id: 'ar-condicionado', icon: AcIcon, urgent: true },
  { id: 'paineis-solares', icon: SolarIcon },
]

/** Avaliações — dados estáveis (nomes, cidades, rating). O texto traduz-se no i18n. */
export type TestimonialMeta = {
  name: string
  city: string
  rating: number
  initials: string
}

export const testimonialMeta: TestimonialMeta[] = [
  { name: 'Mariana Costa', city: 'Lisboa, Alvalade', rating: 5, initials: 'MC' },
  { name: 'João Almeida', city: 'Porto, Cedofeita', rating: 5, initials: 'JA' },
  { name: 'Sofia Marques', city: 'Cascais', rating: 5, initials: 'SM' },
  { name: 'Ricardo Nunes', city: 'Braga', rating: 5, initials: 'RN' },
  { name: 'Inês Ferreira', city: 'Lisboa, Telheiras', rating: 5, initials: 'IF' },
  { name: 'Pedro Tavares', city: 'Almada', rating: 5, initials: 'PT' },
]

/** Antes/Depois — tons dos placeholders + localização (nome próprio, não traduz). */
export type BeforeAfterMeta = {
  id: string
  location: string
  beforeTone: string
  afterTone: string
}

export const beforeAfterMeta: BeforeAfterMeta[] = [
  {
    id: 'ba-pintura',
    location: 'Lisboa, Campo de Ourique',
    beforeTone: 'from-stone-300 to-stone-400',
    afterTone: 'from-accent-100 to-accent-200',
  },
  {
    id: 'ba-telhado',
    location: 'Sintra',
    beforeTone: 'from-zinc-400 to-zinc-500',
    afterTone: 'from-sky-100 to-accent-100',
  },
  {
    id: 'ba-canalizacao',
    location: 'Porto, Foz',
    beforeTone: 'from-neutral-300 to-neutral-400',
    afterTone: 'from-accent-100 to-emerald-100',
  },
]

