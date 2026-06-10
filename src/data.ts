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
 * src/i18n.tsx. Os PREÇOS não são públicos — vivem no servidor
 * (api/_lib/pricing.ts) e servem-se à área de admin via endpoint protegido.
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

/**
 * Países onde a equipa já trabalhou (experiência internacional real).
 * As cores aproximam a bandeira em barras minimalistas — fiáveis em todas
 * as plataformas (ao contrário dos emoji de bandeira). Os nomes traduzem-se
 * no i18n (array `countries`, alinhado por índice).
 */
export type Country = { code: string; colors: string[] }

export const countries: Country[] = [
  { code: 'ar', colors: ['#74ACDF', '#FFFFFF', '#74ACDF'] },
  { code: 've', colors: ['#FCDD09', '#003893', '#CF142B'] },
  { code: 'us', colors: ['#B22234', '#FFFFFF', '#3C3B6E'] },
  { code: 'de', colors: ['#000000', '#DD0000', '#FFCE00'] },
  { code: 'pt', colors: ['#006600', '#FF0000'] },
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

