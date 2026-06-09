/**
 * DADOS PRIVADOS — apenas para a área de administração (não público).
 * Investigação de mercado de preços de serviços de manutenção do lar em
 * Portugal (2024–2026). Fonte: relatório interno + referências no fim.
 *
 * Estes valores NÃO devem ser mostrados no site público; servem de apoio
 * interno à equipa para orçamentar leads.
 */

export type PriceRow = {
  concepto: string
  desde: string
  rango: string
  notas: string
}

export type PriceCategory = {
  id: string
  titulo: string
  subtitulo: string
  filas: PriceRow[]
}

export const priceCategories: PriceCategory[] = [
  {
    id: 'canalizacao',
    titulo: 'Canalização (Fontanería)',
    subtitulo: 'Reparar fuga de agua / desatascar',
    filas: [
      { concepto: 'Visita / Hora de trabajo', desde: '30€ – 50€', rango: '30€ – 60€/h', notas: 'La primera hora suele ser más cara o incluir desplazamiento.' },
      { concepto: 'Reparar fuga de agua', desde: '50€', rango: '50€ – 150€+', notas: 'Depende de la complejidad y localización de la fuga.' },
      { concepto: 'Desatascar (desentupimento)', desde: '35€', rango: '35€ – 125€', notas: 'Desatascos simples (sanitarios/lavabos).' },
      { concepto: 'Desatasco complejo', desde: '100€', rango: '100€ – 350€', notas: 'Tuberías principales o maquinaria específica.' },
    ],
  },
  {
    id: 'eletricidade',
    titulo: 'Eletricidade (Electricidad)',
    subtitulo: 'Avería / instalar tomas, cuadro',
    filas: [
      { concepto: 'Hora de trabajo', desde: '12€ – 25€', rango: '20€ – 40€/h', notas: 'Varía según región (Lisboa/Oporto más caros).' },
      { concepto: 'Instalar tomas (enchufes)', desde: '15€ – 25€', rango: '25€ – 50€/ud', notas: 'Menos por unidad si son varias.' },
      { concepto: 'Sustituir cuadro eléctrico', desde: '250€', rango: '250€ – 450€', notas: 'Incluye el cuadro y mano de obra básica.' },
      { concepto: 'Urgencias (24h/festivos)', desde: '60€', rango: '60€ – 90€/h', notas: 'Tasa de urgencia o desplazamiento nocturno.' },
      { concepto: 'Instalación por m²', desde: '10€', rango: '10€ – 25€/m²', notas: 'Obra nueva o renovación completa.' },
    ],
  },
  {
    id: 'pintura',
    titulo: 'Pintura',
    subtitulo: 'Pintura de interiores (por m²)',
    filas: [
      { concepto: 'Interiores (solo mano de obra)', desde: '4€ – 5,50€/m²', rango: '7€ – 13€/m²', notas: 'El precio sube si incluye materiales/pintura de calidad.' },
      { concepto: 'Pintura total (techo + paredes)', desde: '7€/m²', rango: '10€ – 15€/m²', notas: 'Incluye preparación (lijar, tapar grietas).' },
      { concepto: 'Pintura exterior', desde: '13€/m²', rango: '15€ – 30€/m²', notas: 'Requiere andamios y pinturas más resistentes.' },
    ],
  },
  {
    id: 'telhados',
    titulo: 'Telhados (Tejados)',
    subtitulo: 'Reparar gotera / sustituir tejas',
    filas: [
      { concepto: 'Visita técnica / diagnóstico', desde: '40€', rango: '40€ – 80€', notas: 'A menudo se descuenta si se acepta el presupuesto.' },
      { concepto: 'Sustituir tejas / reparación puntual', desde: '50€ – 100€', rango: '150€ – 500€', notas: 'Depende del nº de tejas y accesibilidad.' },
      { concepto: 'Impermeabilización (por m²)', desde: '45€/m²', rango: '45€ – 90€/m²', notas: 'Incluye aislamiento y tratamiento de filtraciones.' },
      { concepto: 'Rehabilitación completa', desde: '70€/m²', rango: '120€ – 300€/m²', notas: 'Cambio total de estructura y cobertura.' },
    ],
  },
  {
    id: 'limpeza',
    titulo: 'Limpeza (Limpieza)',
    subtitulo: 'Limpieza profunda (vivienda estándar)',
    filas: [
      { concepto: 'Limpieza regular (por hora)', desde: '8€ – 10€', rango: '10€ – 15€/h', notas: 'Contratación directa más barata que por empresa.' },
      { concepto: 'Limpieza profunda (por hora)', desde: '14€', rango: '15€ – 20€/h', notas: 'Cristales, persianas, interiores de armarios.' },
      { concepto: 'Limpieza profunda (vivienda)', desde: '60€', rango: '150€ – 350€', notas: 'Apartamento de 2-3 habitaciones.' },
      { concepto: 'Limpieza post-obra', desde: '200€', rango: '300€ – 600€', notas: 'Productos específicos y retirada de residuos.' },
    ],
  },
  {
    id: 'montagens',
    titulo: 'Montagens & Reparos',
    subtitulo: 'Montar muebles / fijar estantes',
    filas: [
      { concepto: 'Valor mínimo de servicio', desde: '19€ – 35€', rango: '35€ – 60€', notas: 'Cubre desplazamiento y primera tarea pequeña.' },
      { concepto: 'Montar muebles (por hora)', desde: '15€', rango: '20€ – 45€/h', notas: 'Montadores especializados (IKEA) cobran más.' },
      { concepto: 'Fijar estantes / cuadros', desde: '20€', rango: '35€ – 70€', notas: 'Depende del nº de piezas y tipo de pared.' },
      { concepto: 'Montaje de muebles grandes', desde: '50€', rango: '80€ – 150€', notas: 'Armarios grandes o muebles de cocina.' },
    ],
  },
  {
    id: 'ar-condicionado',
    titulo: 'Ar Condicionado (Aire Acondicionado)',
    subtitulo: 'Mantenimiento/limpieza de 1 split',
    filas: [
      { concepto: 'Limpieza de 1 split (estándar)', desde: '50€', rango: '50€ – 85€', notas: 'Incluye filtros y unidad interior.' },
      { concepto: 'Mantenimiento completo', desde: '80€', rango: '100€ – 180€', notas: 'Revisión de gas, limpieza profunda y desinfección.' },
      { concepto: 'Recarga de gas', desde: '60€', rango: '80€ – 150€', notas: 'Depende del tipo de gas y cantidad.' },
      { concepto: 'Reparación técnica', desde: '80€', rango: '80€ – 250€', notas: 'Avería en compresor o placa.' },
    ],
  },
  {
    id: 'paineis-solares',
    titulo: 'Painéis Solares (Paneles Solares)',
    subtitulo: 'Mantenimiento/limpieza de instalación',
    filas: [
      { concepto: 'Limpieza básica (hasta 8 paneles)', desde: '79€', rango: '80€ – 150€', notas: 'Agua desmineralizada para eficiencia.' },
      { concepto: 'Mantenimiento preventivo', desde: '120€', rango: '150€ – 250€', notas: 'Revisión de conexiones, inversor y limpieza.' },
      { concepto: 'Limpieza por panel individual', desde: '15€', rango: '15€ – 50€', notas: 'Para instalaciones grandes.' },
      { concepto: 'Contrato de mantenimiento anual', desde: '150€', rango: '150€ – 300€', notas: 'Suele incluir 1-2 visitas al año.' },
    ],
  },
]

export type MaterialRow = { servicio: string; incluido: string; observacion: string }

export const materialsSummary: MaterialRow[] = [
  { servicio: 'Fontanería / Electricidad', incluido: 'No', observacion: 'Se detalla en la factura como "Materiais" (tuberías, grifos, cuadro…).' },
  { servicio: 'Pintura', incluido: 'Depende', observacion: 'El presupuesto debe especificar "com" o "sem" materiales. ~10–15€/m² ya incluye pintura.' },
  { servicio: 'Limpieza', incluido: 'Sí', observacion: 'Productos químicos y utensilios suelen estar incluidos.' },
  { servicio: 'Aire acondicionado', incluido: 'Parcial', observacion: 'Limpieza incluida; recarga de gas o piezas mecánicas se cobran aparte.' },
  { servicio: 'Paneles solares', incluido: 'Sí', observacion: 'Mantenimiento/limpieza incluye insumos básicos; repuestos aparte.' },
  { servicio: 'Montajes', incluido: 'No', observacion: 'Se asume mueble y herrajes del cliente; tacos/silicona pueden ser extra.' },
]

export const ivaNote =
  'IVA en Portugal: los presupuestos a particulares suelen indicarse con IVA incluido (23%). En obras de mejora en vivienda pueden aplicar tipos reducidos bajo ciertas condiciones. Confirmar siempre si el valor es "Líquido" (sin IVA) o "Final" (con IVA): puede variar el coste un 23%.'

/* ------------------------------------------------------------------ */
/*  Datos NUMÉRICOS para la calculadora de presupuestos                 */
/* ------------------------------------------------------------------ */

/** Unidad de cobro de cada partida. */
export type CalcUnit = 'fijo' | 'hora' | 'm2' | 'ud'

export const unitLabels: Record<CalcUnit, { short: string; qty: string }> = {
  fijo: { short: '', qty: 'cantidad' },
  hora: { short: '/h', qty: 'horas' },
  m2: { short: '/m²', qty: 'm²' },
  ud: { short: '/ud', qty: 'unidades' },
}

export type CalcItem = {
  id: string
  label: string
  unit: CalcUnit
  min: number
  max: number
}

export type CalcCategory = {
  id: string
  titulo: string
  items: CalcItem[]
}

/** Rangos derivados del informe de mercado (valores promedio de referencia). */
export const calcCategories: CalcCategory[] = [
  {
    id: 'canalizacao',
    titulo: 'Canalização',
    items: [
      { id: 'can-hora', label: 'Hora de trabajo', unit: 'hora', min: 30, max: 60 },
      { id: 'can-fuga', label: 'Reparar fuga de agua', unit: 'fijo', min: 50, max: 150 },
      { id: 'can-desat', label: 'Desatasco simple', unit: 'fijo', min: 35, max: 125 },
      { id: 'can-desat-x', label: 'Desatasco complejo', unit: 'fijo', min: 100, max: 350 },
    ],
  },
  {
    id: 'eletricidade',
    titulo: 'Eletricidade',
    items: [
      { id: 'ele-hora', label: 'Hora de trabajo', unit: 'hora', min: 20, max: 40 },
      { id: 'ele-toma', label: 'Instalar toma (enchufe)', unit: 'ud', min: 25, max: 50 },
      { id: 'ele-quadro', label: 'Sustituir cuadro eléctrico', unit: 'fijo', min: 250, max: 450 },
      { id: 'ele-urg', label: 'Urgencia 24h (hora)', unit: 'hora', min: 60, max: 90 },
      { id: 'ele-m2', label: 'Instalación por m²', unit: 'm2', min: 10, max: 25 },
    ],
  },
  {
    id: 'pintura',
    titulo: 'Pintura',
    items: [
      { id: 'pin-int', label: 'Interiores (mano de obra)', unit: 'm2', min: 7, max: 13 },
      { id: 'pin-total', label: 'Total (techo + paredes)', unit: 'm2', min: 10, max: 15 },
      { id: 'pin-ext', label: 'Exterior', unit: 'm2', min: 15, max: 30 },
    ],
  },
  {
    id: 'telhados',
    titulo: 'Telhados',
    items: [
      { id: 'tel-visita', label: 'Visita técnica / diagnóstico', unit: 'fijo', min: 40, max: 80 },
      { id: 'tel-tejas', label: 'Sustituir tejas / reparación puntual', unit: 'fijo', min: 150, max: 500 },
      { id: 'tel-imper', label: 'Impermeabilización', unit: 'm2', min: 45, max: 90 },
      { id: 'tel-rehab', label: 'Rehabilitación completa', unit: 'm2', min: 120, max: 300 },
    ],
  },
  {
    id: 'limpeza',
    titulo: 'Limpeza',
    items: [
      { id: 'lim-reg', label: 'Limpieza regular (hora)', unit: 'hora', min: 10, max: 15 },
      { id: 'lim-prof-h', label: 'Limpieza profunda (hora)', unit: 'hora', min: 15, max: 20 },
      { id: 'lim-prof', label: 'Limpieza profunda (vivienda)', unit: 'fijo', min: 150, max: 350 },
      { id: 'lim-obra', label: 'Limpieza post-obra', unit: 'fijo', min: 300, max: 600 },
    ],
  },
  {
    id: 'montagens',
    titulo: 'Montagens & Reparos',
    items: [
      { id: 'mon-min', label: 'Valor mínimo de servicio', unit: 'fijo', min: 35, max: 60 },
      { id: 'mon-hora', label: 'Montar muebles (hora)', unit: 'hora', min: 20, max: 45 },
      { id: 'mon-estante', label: 'Fijar estantes / cuadros', unit: 'fijo', min: 35, max: 70 },
      { id: 'mon-grande', label: 'Mueble grande', unit: 'fijo', min: 80, max: 150 },
    ],
  },
  {
    id: 'ar-condicionado',
    titulo: 'Ar Condicionado',
    items: [
      { id: 'ac-split', label: 'Limpieza de 1 split', unit: 'ud', min: 50, max: 85 },
      { id: 'ac-mant', label: 'Mantenimiento completo', unit: 'fijo', min: 100, max: 180 },
      { id: 'ac-gas', label: 'Recarga de gas', unit: 'fijo', min: 80, max: 150 },
      { id: 'ac-rep', label: 'Reparación técnica', unit: 'fijo', min: 80, max: 250 },
    ],
  },
  {
    id: 'paineis-solares',
    titulo: 'Painéis Solares',
    items: [
      { id: 'sol-8', label: 'Limpieza (hasta 8 paneles)', unit: 'fijo', min: 80, max: 150 },
      { id: 'sol-prev', label: 'Mantenimiento preventivo', unit: 'fijo', min: 150, max: 250 },
      { id: 'sol-panel', label: 'Limpieza por panel', unit: 'ud', min: 15, max: 50 },
      { id: 'sol-anual', label: 'Contrato anual', unit: 'fijo', min: 150, max: 300 },
    ],
  },
]

export type Reference = { n: number; label: string; url: string }

export const references: Reference[] = [
  { n: 1, label: 'Zaask.pt — Tabela preços Canalização', url: 'https://www.zaask.pt/quanto-custa/canalizadores' },
  { n: 2, label: 'Canalizadordelisboa.pt — Preço médio de reparação de canos', url: 'https://canalizadordelisboa.pt/preco-medio-de-reparacao-de-canos/' },
  { n: 3, label: 'Habitissimo.pt — Tabela preços canalização', url: 'https://www.habitissimo.pt/orcamentos/canalizacao' },
  { n: 4, label: 'Sergiomatoslda.com — Quanto custa um serviço de eletricista?', url: 'https://sergiomatoslda.com/gallery/custo-eletricista-porto-matosinhos-maia-gaia.pdf' },
  { n: 5, label: 'Zaask.pt — Quanto custa contratar eletricistas?', url: 'https://www.zaask.pt/quanto-custa/electricistas' },
  { n: 6, label: 'FixHome — Eletricista Preços 2026', url: 'https://fixhomeservicios.com/quanto-custa-eletricista/' },
  { n: 8, label: 'BBC Obras em Casa — Preço de Pintura por m²', url: 'https://bbc-obras-em-casa.com/tabela-precos-pintura-m2-casas-2025/' },
  { n: 9, label: 'Zaask.pt — Quanto custa uma pintura de interiores?', url: 'https://www.zaask.pt/quanto-custa/pintura-de-interiores' },
  { n: 10, label: 'Santander.pt — Quanto custa pintar a casa?', url: 'https://www.santander.pt/salto/quanto-custa-pintar-casa' },
  { n: 11, label: 'Grupobdp.pt — Reparação de Telhados Preços 2026', url: 'https://grupobdp.pt/reparacao-de-telhados-precos-guia-completo-de-custos-e-orcamentos-para-2026/' },
  { n: 12, label: 'Pom-lda.pt — Quanto Custa Reparar um Telhado', url: 'https://pom-lda.pt/quanto-custa-reparar-um-telhado-o-inicio-de-tudo-e-perceber-o-problema-e-o-impacto-no-seu-bolso/' },
  { n: 13, label: 'Zaask.pt — Remodelação de telhados', url: 'https://www.zaask.pt/quanto-custa/remodelacao-de-telhados' },
  { n: 14, label: 'Habitissimo.pt — Remodelação de telhados', url: 'https://www.habitissimo.pt/orcamentos/remodelacao-de-telhados' },
  { n: 15, label: 'Zaask.pt — Limpezas domésticas', url: 'https://www.zaask.pt/quanto-custa/limpezas-domesticas' },
  { n: 16, label: 'Lipclean.pt — Quanto Custa uma Limpeza Doméstica? 2026', url: 'https://lipclean.pt/blog/quanto-custa-limpeza-domestica-profissional/' },
  { n: 17, label: 'Worten.pt — Limpeza profunda (Worten Resolve)', url: 'https://www.worten.pt/servicos-worten-resolve/servicos-para-casa/limpezas/limpeza-profunda' },
  { n: 19, label: 'IKEA.com — Serviço de montagem TaskRabbit', url: 'https://www.ikea.com/pt/pt/customer-service/services/assembly/' },
  { n: 20, label: 'Zaask.pt — Quanto custa montar móveis?', url: 'https://www.zaask.pt/quanto-custa/montar-moveis' },
  { n: 23, label: 'Cleansplitportugal.com — Limpeza de Ar-condicionado Lisboa', url: 'https://www.cleansplitportugal.com/' },
  { n: 24, label: 'Habitissimo.pt — Manutenção de ar condicionado 2024', url: 'https://www.habitissimo.pt/orcamentos/manutencao-de-ar-condicionado' },
  { n: 26, label: 'Leroymerlin.pt — Manutenção e limpeza até 8 painéis', url: 'https://www.leroymerlin.pt/servicos/servicos-para-paineis-solares-fotovoltaicos/manutencao-preventiva-e-limpeza-ate-8-paineis-fotovoltaicos.html' },
  { n: 27, label: 'Habitissimo.pt — Preço da limpeza dos painéis solares', url: 'https://www.habitissimo.pt/orcamentos/limpeza-de-painel-solar' },
]
