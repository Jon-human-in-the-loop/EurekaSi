/** Tipos del lado cliente que reflejan las respuestas JSON de la API admin. */

export type PriceRow = { concepto: string; desde: string; rango: string; notas: string }
export type PriceCategory = { id: string; titulo: string; subtitulo: string; filas: PriceRow[] }

export type CalcUnit = 'fijo' | 'hora' | 'm2' | 'ud'
export type CalcItem = { id: string; label: string; unit: CalcUnit; min: number; max: number }
export type CalcCategory = { id: string; titulo: string; items: CalcItem[] }
export type UnitLabels = Record<CalcUnit, { short: string; qty: string }>

export type MaterialRow = { servicio: string; incluido: string; observacion: string }
export type Reference = { n: number; label: string; url: string }

export type PricingPayload = {
  priceCategories: PriceCategory[]
  calcCategories: CalcCategory[]
  unitLabels: UnitLabels
  materialsSummary: MaterialRow[]
  ivaNote: string
  references: Reference[]
}

export type Lead = {
  id: string
  service: string | null
  urgency: string | null
  detail: string | null
  name: string
  phone: string
  postal: string | null
  lang: string | null
  status: string
  created_at: string
}
