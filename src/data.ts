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
 * Metadados ESTRUTURAIS dos serviços (não traduzíveis): ícone, preço de
 * referência, unidade e se é uma categoria de urgências. O texto (nome,
 * tagline, exemplos) vive em src/i18n.tsx, alinhado por índice/id.
 */
export type ServiceMeta = {
  id: string
  icon: IconType
  priceFrom: number
  /** sufixo de unidade, ex.: "/m²" para pintura */
  unit?: string
  urgent?: boolean
}

export const serviceMeta: ServiceMeta[] = [
  { id: 'canalizacao', icon: PlumbingIcon, priceFrom: 39, urgent: true },
  { id: 'eletricidade', icon: ElectricIcon, priceFrom: 45, urgent: true },
  { id: 'pintura', icon: PaintIcon, priceFrom: 6, unit: '/m²' },
  { id: 'telhados', icon: RoofIcon, priceFrom: 79, urgent: true },
  { id: 'limpeza', icon: CleanIcon, priceFrom: 29 },
  { id: 'montagens', icon: CarpentryIcon, priceFrom: 25 },
  { id: 'ar-condicionado', icon: AcIcon, priceFrom: 49, urgent: true },
  { id: 'paineis-solares', icon: SolarIcon, priceFrom: 99 },
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

/** Equipa — nome e iniciais estáveis; função/anos traduzem-se no i18n. */
export type TeamMeta = {
  name: string
  initials: string
  tone: string
}

export const teamMeta: TeamMeta[] = [
  { name: 'Tiago R.', initials: 'TR', tone: 'from-accent-200 to-accent-300' },
  { name: 'Carla M.', initials: 'CM', tone: 'from-sky-200 to-accent-200' },
  { name: 'André P.', initials: 'AP', tone: 'from-amber-200 to-accent-200' },
  { name: 'Helena S.', initials: 'HS', tone: 'from-emerald-200 to-accent-200' },
]
