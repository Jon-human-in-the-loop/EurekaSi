import {
  PlumbingIcon,
  ElectricIcon,
  PaintIcon,
  RoofIcon,
  CleanIcon,
  CarpentryIcon,
} from './icons'
import type { ComponentType, SVGProps } from 'react'

export type Service = {
  id: string
  name: string
  tagline: string
  /** Preço fixo de referência "desde" — transparência ao estilo OSCAR */
  priceFrom: number
  examples: string[]
  icon: ComponentType<SVGProps<SVGSVGElement>>
  /** Resposta típica para emergências */
  urgent?: boolean
}

export const services: Service[] = [
  {
    id: 'canalizacao',
    name: 'Canalização',
    tagline: 'Fugas, entupimentos e torneiras — resolvidos hoje.',
    priceFrom: 39,
    examples: ['Reparar fuga de água', 'Desentupir canos', 'Substituir torneira', 'Instalar autoclismo'],
    icon: PlumbingIcon,
    urgent: true,
  },
  {
    id: 'eletricidade',
    name: 'Eletricidade',
    tagline: 'Quadros, tomadas e avarias com técnicos certificados.',
    priceFrom: 45,
    examples: ['Quadro elétrico ao corte', 'Instalar tomadas', 'Iluminação LED', 'Avaria sem luz'],
    icon: ElectricIcon,
    urgent: true,
  },
  {
    id: 'pintura',
    name: 'Pintura',
    tagline: 'Paredes e tetos como novos, sem sujidade.',
    priceFrom: 6,
    examples: ['Pintura de interiores', 'Reparar humidades', 'Estuque e acabamentos', 'Pintura de fachadas'],
    icon: PaintIcon,
  },
  {
    id: 'telhados',
    name: 'Telhados',
    tagline: 'Infiltrações e telhas partidas antes da próxima chuva.',
    priceFrom: 79,
    examples: ['Reparar infiltrações', 'Substituir telhas', 'Limpeza de caleiras', 'Impermeabilização'],
    icon: RoofIcon,
    urgent: true,
  },
  {
    id: 'limpeza',
    name: 'Limpeza',
    tagline: 'Limpeza profunda e profissional, ao seu ritmo.',
    priceFrom: 29,
    examples: ['Limpeza profunda', 'Fim de obra', 'Mudança de casa', 'Limpeza regular'],
    icon: CleanIcon,
  },
  {
    id: 'montagens',
    name: 'Montagens & Reparos',
    tagline: 'Móveis, prateleiras e os pequenos arranjos do dia a dia.',
    priceFrom: 25,
    examples: ['Montar móveis', 'Fixar prateleiras', 'Trocar fechaduras', 'Pequenas reparações'],
    icon: CarpentryIcon,
  },
]

export type Step = {
  title: string
  text: string
}

export const steps: Step[] = [
  {
    title: 'Diga-nos o que precisa',
    text: 'Escolha o serviço e descreva o problema em 30 segundos. Sem registos longos.',
  },
  {
    title: 'Receba um preço fixo',
    text: 'Mostramos um valor transparente antes de avançar. Sem surpresas na fatura.',
  },
  {
    title: 'Profissional à sua porta',
    text: 'Um técnico verificado confirma a visita — muitas vezes no próprio dia.',
  },
]

export type Testimonial = {
  name: string
  city: string
  service: string
  rating: number
  quote: string
  initials: string
}

export const testimonials: Testimonial[] = [
  {
    name: 'Mariana Costa',
    city: 'Lisboa, Alvalade',
    service: 'Canalização',
    rating: 5,
    quote:
      'Tinha uma fuga debaixo do lava-loiça e em menos de uma hora estava resolvido. O preço foi exatamente o que me indicaram. Recomendo sem hesitar.',
    initials: 'MC',
  },
  {
    name: 'João Almeida',
    city: 'Porto, Cedofeita',
    service: 'Eletricidade',
    rating: 5,
    quote:
      'O quadro ia abaixo constantemente. O técnico chegou à hora, explicou tudo e deixou tudo a funcionar. Profissionalismo do início ao fim.',
    initials: 'JA',
  },
  {
    name: 'Sofia Marques',
    city: 'Cascais',
    service: 'Pintura',
    rating: 5,
    quote:
      'Pintaram a sala e dois quartos num fim de semana. Cuidado com os móveis, limpos no final. O antes e depois é impressionante.',
    initials: 'SM',
  },
  {
    name: 'Ricardo Nunes',
    city: 'Braga',
    service: 'Telhados',
    rating: 5,
    quote:
      'Infiltração no teto a piorar com a chuva. Vieram no próprio dia, identificaram a telha partida e impermeabilizaram. Tranquilidade total.',
    initials: 'RN',
  },
  {
    name: 'Inês Ferreira',
    city: 'Lisboa, Telheiras',
    service: 'Limpeza',
    rating: 5,
    quote:
      'Limpeza de fim de obra impecável. A casa parecia nova. Pontuais, simpáticos e muito minuciosos. Já agendei a limpeza mensal.',
    initials: 'IF',
  },
  {
    name: 'Pedro Tavares',
    city: 'Almada',
    service: 'Montagens',
    rating: 5,
    quote:
      'Montaram um roupeiro grande e fixaram prateleiras. Rápido, sem estragos na parede e a um preço justo. Voltarei a usar.',
    initials: 'PT',
  },
]

export type Faq = {
  q: string
  a: string
}

export const faqs: Faq[] = [
  {
    q: 'Os preços são mesmo fixos?',
    a: 'Sim. Para os serviços mais comuns mostramos um preço fixo antes de confirmar. Em trabalhos maiores, enviamos um orçamento gratuito e detalhado — só avança se concordar. Nunca há custos escondidos.',
  },
  {
    q: 'Em quanto tempo aparece um profissional?',
    a: 'Para emergências (canalização, eletricidade, infiltrações) procuramos um técnico disponível no próprio dia, muitas vezes em poucas horas. Para os restantes serviços, escolhe a data e hora que lhe der mais jeito.',
  },
  {
    q: 'Os profissionais são de confiança?',
    a: 'Todos os profissionais Eureka são verificados: validamos identidade, experiência e avaliações reais de clientes. Trabalhamos apenas com quem mantém uma classificação elevada.',
  },
  {
    q: 'O orçamento é gratuito?',
    a: 'Sempre. Pedir um orçamento não tem qualquer custo nem compromisso. Só paga quando o serviço estiver concluído e ficar satisfeito.',
  },
  {
    q: 'Que zonas cobrem?',
    a: 'Estamos presentes nas principais áreas de Portugal Continental — Grande Lisboa, Grande Porto, Braga, Coimbra, Aveiro, Faro e arredores. Indique o seu código postal para confirmar a cobertura.',
  },
  {
    q: 'E se algo correr mal?',
    a: 'Todos os serviços têm garantia Eureka. Se algo não ficar bem, voltamos sem custos adicionais. A sua satisfação é a condição para fecharmos o trabalho.',
  },
]

export type Stat = { value: string; label: string }

export const stats: Stat[] = [
  { value: '4,9/5', label: 'Avaliação média' },
  { value: '12 000+', label: 'Serviços concluídos' },
  { value: '< 30 min', label: 'Resposta em emergência' },
  { value: '100%', label: 'Profissionais verificados' },
]

/** Casos reais Antes/Depois (placeholders para fotos autênticas do equipa). */
export type BeforeAfter = {
  id: string
  service: string
  location: string
  duration: string
  /** descrição curta do trabalho */
  summary: string
  /** tons usados no placeholder (sem stock genérico) */
  beforeTone: string
  afterTone: string
}

export const beforeAfters: BeforeAfter[] = [
  {
    id: 'ba-pintura',
    service: 'Pintura de interiores',
    location: 'Lisboa, Campo de Ourique',
    duration: '2 dias',
    summary: 'Sala com humidade e tinta a descascar, recuperada e pintada de fresco.',
    beforeTone: 'from-stone-300 to-stone-400',
    afterTone: 'from-accent-100 to-accent-200',
  },
  {
    id: 'ba-telhado',
    service: 'Reparação de telhado',
    location: 'Sintra',
    duration: '1 dia',
    summary: 'Infiltração tratada, telhas substituídas e impermeabilização aplicada.',
    beforeTone: 'from-zinc-400 to-zinc-500',
    afterTone: 'from-sky-100 to-accent-100',
  },
  {
    id: 'ba-canalizacao',
    service: 'Renovação de casa de banho',
    location: 'Porto, Foz',
    duration: '3 dias',
    summary: 'Canalização antiga substituída e loiças novas instaladas.',
    beforeTone: 'from-neutral-300 to-neutral-400',
    afterTone: 'from-accent-100 to-emerald-100',
  },
]
