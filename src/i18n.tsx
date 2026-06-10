import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type Lang = 'pt' | 'en' | 'es'

export const LANGS: { code: Lang; label: string; htmlLang: string }[] = [
  { code: 'pt', label: 'PT', htmlLang: 'pt-PT' },
  { code: 'en', label: 'EN', htmlLang: 'en' },
  { code: 'es', label: 'ES', htmlLang: 'es' },
]

/* ------------------------------------------------------------------ */
/*  Dicionários — Português (PT-PT) é a forma de referência            */
/* ------------------------------------------------------------------ */

const pt = {
  brand: 'EurekaSi',
  nav: ['Serviços', 'Como funciona', 'Trabalhos', 'Avaliações'],
  common: {
    requestQuote: 'Pedir orçamento',
    requestQuoteFree: 'Pedir orçamento grátis',
  },
  hero: {
    badge: 'Profissionais disponíveis agora na sua zona',
    titleLine1: 'O seu lar, resolvido.',
    titleLine2: 'Em minutos, não em dias.',
    subtitle:
      'Canalização, eletricidade, pintura, ar condicionado, painéis solares e mais. Profissionais verificados, preços fixos e sem surpresas. Peça já o seu orçamento gratuito.',
    ctaPrimary: 'Pedir orçamento grátis',
    ctaSecondary: 'Ver como funciona',
    trust: ['Preço fixo, sem surpresas', 'Profissionais verificados', 'Resposta em < 30 min'],
    reviewsLine: '+2 400 avaliações de clientes em Portugal',
    quickAccess: 'Toque no que precisa',
  },
  stats: [
    { value: '4,9/5', label: 'Avaliação média' },
    { value: '12 000+', label: 'Serviços concluídos' },
    { value: '< 30 min', label: 'Resposta em emergência' },
    { value: '100%', label: 'Profissionais verificados' },
  ],
  services: {
    eyebrow: 'Serviços',
    title: 'Tudo para o seu lar, num só sítio.',
    subtitle:
      'Preços fixos e transparentes. Sabe sempre quanto vai pagar antes de avançar.',
    urgentBadge: 'Urgências',
    freeQuote: 'Orçamento grátis',
    cardCta: 'Pedir',
    items: [
      {
        name: 'Canalização',
        tagline: 'Fugas, entupimentos e torneiras — resolvidos hoje.',
        examples: ['Reparar fuga de água', 'Desentupir canos', 'Substituir torneira'],
      },
      {
        name: 'Eletricidade',
        tagline: 'Quadros, tomadas e avarias com técnicos certificados.',
        examples: ['Quadro ao corte', 'Instalar tomadas', 'Iluminação LED'],
      },
      {
        name: 'Pintura',
        tagline: 'Paredes e tetos como novos, sem sujidade.',
        examples: ['Pintura de interiores', 'Reparar humidades', 'Pintura de fachadas'],
      },
      {
        name: 'Telhados',
        tagline: 'Infiltrações e telhas partidas antes da próxima chuva.',
        examples: ['Reparar infiltrações', 'Substituir telhas', 'Impermeabilização'],
      },
      {
        name: 'Limpeza',
        tagline: 'Limpeza profunda e profissional, ao seu ritmo.',
        examples: ['Limpeza profunda', 'Fim de obra', 'Limpeza regular'],
      },
      {
        name: 'Montagens & Reparos',
        tagline: 'Móveis, prateleiras e os pequenos arranjos do dia a dia.',
        examples: ['Montar móveis', 'Fixar prateleiras', 'Trocar fechaduras'],
      },
      {
        name: 'Ar Condicionado',
        tagline: 'Instalação e manutenção para conforto todo o ano.',
        examples: ['Instalar split', 'Manutenção e limpeza', 'Carga de gás'],
      },
      {
        name: 'Painéis Solares',
        tagline: 'Energia mais barata com instalação certificada.',
        examples: ['Instalar painéis', 'Manutenção e limpeza', 'Otimizar produção'],
      },
    ],
  },
  how: {
    eyebrow: 'Como funciona',
    title: 'Simples como deve ser. Três passos.',
    subtitle:
      'Sem chamadas intermináveis nem orçamentos que demoram dias. Resolva em três toques.',
    cta: 'Começar agora',
    steps: [
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
    ],
  },
  work: {
    eyebrow: 'Trabalhos reais',
    title: 'Antes e depois. Sem filtros, sem stock.',
    subtitle:
      'Resultados de clientes reais em Portugal. Cada projeto é fotografado pela nossa equipa.',
    before: 'Antes',
    after: 'Depois',
    items: [
      {
        service: 'Pintura de interiores',
        duration: '2 dias',
        summary: 'Sala com humidade e tinta a descascar, recuperada e pintada de fresco.',
      },
      {
        service: 'Reparação de telhado',
        duration: '1 dia',
        summary: 'Infiltração tratada, telhas substituídas e impermeabilização aplicada.',
      },
      {
        service: 'Renovação de casa de banho',
        duration: '3 dias',
        summary: 'Canalização antiga substituída e loiças novas instaladas.',
      },
    ],
  },
  reviews: {
    eyebrow: 'Prova social',
    title: 'Quem nos abriu a porta, voltou a chamar.',
    ratingCount: '+2 400 avaliações',
    items: [
      {
        service: 'Canalização',
        quote:
          'Tinha uma fuga debaixo do lava-loiça e em menos de uma hora estava resolvido. O preço foi exatamente o que me indicaram. Recomendo sem hesitar.',
      },
      {
        service: 'Eletricidade',
        quote:
          'O quadro ia abaixo constantemente. O técnico chegou à hora, explicou tudo e deixou tudo a funcionar. Profissionalismo do início ao fim.',
      },
      {
        service: 'Pintura',
        quote:
          'Pintaram a sala e dois quartos num fim de semana. Cuidado com os móveis, limpos no final. O antes e depois é impressionante.',
      },
      {
        service: 'Telhados',
        quote:
          'Infiltração no teto a piorar com a chuva. Vieram no próprio dia, identificaram a telha partida e impermeabilizaram. Tranquilidade total.',
      },
      {
        service: 'Limpeza',
        quote:
          'Limpeza de fim de obra impecável. A casa parecia nova. Pontuais, simpáticos e muito minuciosos. Já agendei a limpeza mensal.',
      },
      {
        service: 'Montagens',
        quote:
          'Montaram um roupeiro grande e fixaram prateleiras. Rápido, sem estragos na parede e a um preço justo. Voltarei a usar.',
      },
    ],
  },
  team: {
    eyebrow: 'Quem somos',
    title: 'Tratamos do seu lar como se fosse o nosso.',
    subtitle:
      'Somos uma equipa pequena e dedicada: fazemos tudo nós, sem subcontratação. Fala sempre diretamente com quem executa o trabalho.',
    guarantees: [
      'Sem subcontratação — sempre os mesmos profissionais',
      'Experiência comprovada no ofício',
      'Orçamento claro antes de começar',
      'Seguro de responsabilidade civil',
    ],
    promiseTitle: 'Garantia EurekaSi',
    promiseText:
      'Se algo não ficar bem, voltamos sem custos. A sua satisfação é a condição para fecharmos o trabalho.',
    promisePoints: [
      'Resposta rápida, muitas vezes no próprio dia',
      'Preço combinado, sem surpresas',
      'Trato próximo e de confiança',
    ],
  },
  faq: {
    eyebrow: 'Perguntas frequentes',
    title: 'Tudo o que precisa de saber.',
    subtitle:
      'Sem letras pequenas. Se ficar com dúvidas, fale connosco — respondemos a sério.',
    items: [
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
        a: 'Todos os profissionais EurekaSi são verificados: validamos identidade, experiência e avaliações reais de clientes. Trabalhamos apenas com quem mantém uma classificação elevada.',
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
        a: 'Todos os serviços têm garantia EurekaSi. Se algo não ficar bem, voltamos sem custos adicionais. A sua satisfação é a condição para fecharmos o trabalho.',
      },
    ],
  },
  finalCta: {
    badge: 'Resposta em menos de 30 minutos',
    title: 'Pronto para resolver?',
    subtitle:
      'Orçamento gratuito e sem compromisso. Só paga quando o trabalho estiver feito.',
  },
  footer: {
    tagline:
      'Serviços para o seu lar com profissionais verificados, preços fixos e resposta em minutos. Em todo o Portugal Continental.',
    servicesHead: 'Serviços',
    companyHead: 'Empresa',
    companyLinks: [
      { label: 'Trabalhos', href: '#trabalhos' },
      { label: 'Avaliações', href: '#avaliacoes' },
      { label: 'Como funciona', href: '#como-funciona' },
      { label: 'Trabalhar connosco', href: '#' },
    ],
    contactHead: 'Contacto',
    hours: 'Seg–Dom · 8h–22h',
    rights: '© {year} EurekaSi Serviços. Todos os direitos reservados.',
    legal: ['Termos', 'Privacidade', 'Cookies'],
  },
  modal: {
    eyebrow: 'Orçamento grátis',
    title: 'Pedir orçamento',
    successTitle: 'Pedido recebido',
    step0Legend: 'De que serviço precisa?',
    step1Legend: 'Para quando precisa?',
    urgencyOptions: {
      hoje: { label: 'É urgente — o mais cedo possível', hint: 'Procuramos técnico para hoje' },
      'esta-semana': { label: 'Esta semana', hint: 'Marcamos o melhor dia' },
      flexivel: { label: 'Sou flexível', hint: 'Sem pressa' },
    },
    detailLabel: 'Descreva o problema',
    optional: '(opcional)',
    detailPlaceholder: 'Ex.: fuga de água debaixo do lava-loiça da cozinha…',
    contactIntro: 'Para onde enviamos o orçamento e a confirmação?',
    nameLabel: 'Nome',
    namePlaceholder: 'O seu nome',
    phoneLabel: 'Telemóvel',
    phonePlaceholder: '9XX XXX XXX',
    postalLabel: 'Código postal',
    postalHint: '(para confirmar cobertura)',
    postalPlaceholder: '0000-000',
    privacy: 'Os seus dados são usados apenas para este pedido. Sem spam.',
    successTitleTpl: 'Pedido enviado, {name}!',
    thanksWord: 'obrigado',
    successBodyTpl:
      'Um profissional verificado de {service} vai contactá-lo no número {phone} {when} com o seu preço fixo.',
    serviceFallback: 'serviços',
    phoneFallback: 'indicado',
    whenToday: 'nos próximos minutos',
    whenSoon: 'em breve',
    responseTime: 'Tempo médio de resposta: menos de 30 minutos',
    back: 'Voltar',
    continue: 'Continuar',
    submit: 'Pedir orçamento grátis',
    sending: 'A enviar…',
    sendError: 'Não foi possível enviar. Tente novamente.',
    finish: 'Concluir',
    close: 'Fechar',
  },
}

export type Dict = typeof pt

/* ------------------------------------------------------------------ */
/*  English                                                            */
/* ------------------------------------------------------------------ */

const en: Dict = {
  brand: 'EurekaSi',
  nav: ['Services', 'How it works', 'Work', 'Reviews'],
  common: {
    requestQuote: 'Get a quote',
    requestQuoteFree: 'Get a free quote',
  },
  hero: {
    badge: 'Professionals available now in your area',
    titleLine1: 'Your home, sorted.',
    titleLine2: 'In minutes, not days.',
    subtitle:
      'Plumbing, electrical, painting, air conditioning, solar panels and more. Verified professionals, fixed prices and no surprises. Get your free quote now.',
    ctaPrimary: 'Get a free quote',
    ctaSecondary: 'See how it works',
    trust: ['Fixed price, no surprises', 'Verified professionals', 'Response in < 30 min'],
    reviewsLine: '+2,400 customer reviews in Portugal',
    quickAccess: 'Tap what you need',
  },
  stats: [
    { value: '4.9/5', label: 'Average rating' },
    { value: '12,000+', label: 'Jobs completed' },
    { value: '< 30 min', label: 'Emergency response' },
    { value: '100%', label: 'Verified professionals' },
  ],
  services: {
    eyebrow: 'Services',
    title: 'Everything for your home, in one place.',
    subtitle: "Fixed, transparent prices. You always know what you'll pay before you commit.",
    urgentBadge: 'Emergencies',
    freeQuote: 'Free quote',
    cardCta: 'Request',
    items: [
      {
        name: 'Plumbing',
        tagline: 'Leaks, clogs and taps — fixed today.',
        examples: ['Fix a water leak', 'Unclog drains', 'Replace a tap'],
      },
      {
        name: 'Electrical',
        tagline: 'Panels, sockets and faults with certified electricians.',
        examples: ['Tripping breaker box', 'Install sockets', 'LED lighting'],
      },
      {
        name: 'Painting',
        tagline: 'Walls and ceilings like new, mess-free.',
        examples: ['Interior painting', 'Fix damp patches', 'Façade painting'],
      },
      {
        name: 'Roofing',
        tagline: 'Leaks and broken tiles before the next rain.',
        examples: ['Fix roof leaks', 'Replace tiles', 'Waterproofing'],
      },
      {
        name: 'Cleaning',
        tagline: 'Deep, professional cleaning, at your pace.',
        examples: ['Deep cleaning', 'Post-renovation', 'Regular cleaning'],
      },
      {
        name: 'Assembly & Repairs',
        tagline: 'Furniture, shelves and the small everyday fixes.',
        examples: ['Assemble furniture', 'Mount shelves', 'Change locks'],
      },
      {
        name: 'Air Conditioning',
        tagline: 'Installation and maintenance for year-round comfort.',
        examples: ['Install a split unit', 'Service & cleaning', 'Gas recharge'],
      },
      {
        name: 'Solar Panels',
        tagline: 'Cheaper energy with certified installation.',
        examples: ['Install panels', 'Service & cleaning', 'Optimise output'],
      },
    ],
  },
  how: {
    eyebrow: 'How it works',
    title: 'Simple as it should be. Three steps.',
    subtitle: 'No endless calls or quotes that take days. Sort it in three taps.',
    cta: 'Start now',
    steps: [
      {
        title: 'Tell us what you need',
        text: 'Pick the service and describe the issue in 30 seconds. No long sign-ups.',
      },
      {
        title: 'Get a fixed price',
        text: 'We show a transparent price before you commit. No surprises on the bill.',
      },
      {
        title: 'A pro at your door',
        text: 'A verified technician confirms the visit — often the same day.',
      },
    ],
  },
  work: {
    eyebrow: 'Real work',
    title: 'Before and after. No filters, no stock.',
    subtitle: 'Results from real customers in Portugal. Every project is photographed by our team.',
    before: 'Before',
    after: 'After',
    items: [
      {
        service: 'Interior painting',
        duration: '2 days',
        summary: 'Living room with damp and peeling paint, restored and freshly painted.',
      },
      {
        service: 'Roof repair',
        duration: '1 day',
        summary: 'Leak treated, tiles replaced and waterproofing applied.',
      },
      {
        service: 'Bathroom renovation',
        duration: '3 days',
        summary: 'Old plumbing replaced and new fixtures installed.',
      },
    ],
  },
  reviews: {
    eyebrow: 'Social proof',
    title: 'Those who opened the door called us back.',
    ratingCount: '+2,400 reviews',
    items: [
      {
        service: 'Plumbing',
        quote:
          'I had a leak under the kitchen sink and it was fixed in under an hour. The price was exactly what they quoted. I recommend them without hesitation.',
      },
      {
        service: 'Electrical',
        quote:
          'The breaker kept tripping. The technician arrived on time, explained everything and left it all working. Professional from start to finish.',
      },
      {
        service: 'Painting',
        quote:
          'They painted the living room and two bedrooms in a weekend. Careful with the furniture, spotless at the end. The before and after is impressive.',
      },
      {
        service: 'Roofing',
        quote:
          'A ceiling leak getting worse with the rain. They came the same day, found the broken tile and waterproofed it. Total peace of mind.',
      },
      {
        service: 'Cleaning',
        quote:
          'Impeccable post-renovation cleaning. The house looked brand new. Punctual, friendly and very thorough. I already booked the monthly clean.',
      },
      {
        service: 'Assembly',
        quote:
          'They assembled a large wardrobe and mounted shelves. Fast, no damage to the wall and a fair price. I will use them again.',
      },
    ],
  },
  team: {
    eyebrow: 'Who we are',
    title: 'We treat your home as if it were ours.',
    subtitle:
      "We're a small, dedicated team: we do everything ourselves, no subcontracting. You always deal directly with the people doing the work.",
    guarantees: [
      'No subcontracting — always the same people',
      'Proven experience in the trade',
      'Clear quote before we start',
      'Civil liability insurance',
    ],
    promiseTitle: 'EurekaSi guarantee',
    promiseText:
      "If something isn't right, we come back at no cost. Your satisfaction is the condition for closing the job.",
    promisePoints: [
      'Fast response, often the same day',
      'Agreed price, no surprises',
      'Close, trustworthy service',
    ],
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Everything you need to know.',
    subtitle: 'No fine print. If you have questions, talk to us — we really answer.',
    items: [
      {
        q: 'Are the prices really fixed?',
        a: 'Yes. For the most common services we show a fixed price before you confirm. For larger jobs, we send a free, detailed quote — you only proceed if you agree. There are never hidden costs.',
      },
      {
        q: 'How fast does a professional show up?',
        a: 'For emergencies (plumbing, electrical, leaks) we look for a technician available the same day, often within hours. For other services, you choose the date and time that suits you best.',
      },
      {
        q: 'Are the professionals trustworthy?',
        a: 'Every EurekaSi professional is verified: we validate identity, experience and real customer reviews. We only work with those who keep a high rating.',
      },
      {
        q: 'Is the quote free?',
        a: 'Always. Requesting a quote has no cost and no commitment. You only pay once the service is done and you are satisfied.',
      },
      {
        q: 'Which areas do you cover?',
        a: 'We operate in the main areas of mainland Portugal — Greater Lisbon, Greater Porto, Braga, Coimbra, Aveiro, Faro and surroundings. Enter your postcode to confirm coverage.',
      },
      {
        q: 'What if something goes wrong?',
        a: 'Every service carries the EurekaSi guarantee. If something is not right, we come back at no extra cost. Your satisfaction is the condition for closing the job.',
      },
    ],
  },
  finalCta: {
    badge: 'Response in under 30 minutes',
    title: 'Ready to sort it?',
    subtitle: 'Free, no-obligation quote. You only pay when the job is done.',
  },
  footer: {
    tagline:
      'Home services with verified professionals, fixed prices and response in minutes. Across mainland Portugal.',
    servicesHead: 'Services',
    companyHead: 'Company',
    companyLinks: [
      { label: 'Work', href: '#trabalhos' },
      { label: 'Reviews', href: '#avaliacoes' },
      { label: 'How it works', href: '#como-funciona' },
      { label: 'Work with us', href: '#' },
    ],
    contactHead: 'Contact',
    hours: 'Mon–Sun · 8am–10pm',
    rights: '© {year} EurekaSi Services. All rights reserved.',
    legal: ['Terms', 'Privacy', 'Cookies'],
  },
  modal: {
    eyebrow: 'Free quote',
    title: 'Get a quote',
    successTitle: 'Request received',
    step0Legend: 'Which service do you need?',
    step1Legend: 'When do you need it?',
    urgencyOptions: {
      hoje: { label: "It's urgent — as soon as possible", hint: 'We look for a technician today' },
      'esta-semana': { label: 'This week', hint: 'We book the best day' },
      flexivel: { label: "I'm flexible", hint: 'No rush' },
    },
    detailLabel: 'Describe the problem',
    optional: '(optional)',
    detailPlaceholder: 'E.g.: water leak under the kitchen sink…',
    contactIntro: 'Where do we send the quote and confirmation?',
    nameLabel: 'Name',
    namePlaceholder: 'Your name',
    phoneLabel: 'Mobile',
    phonePlaceholder: '9XX XXX XXX',
    postalLabel: 'Postcode',
    postalHint: '(to confirm coverage)',
    postalPlaceholder: '0000-000',
    privacy: 'Your data is used only for this request. No spam.',
    successTitleTpl: 'Request sent, {name}!',
    thanksWord: 'thank you',
    successBodyTpl:
      'A verified {service} professional will call you at {phone} {when} with your fixed price.',
    serviceFallback: 'services',
    phoneFallback: 'provided',
    whenToday: 'in the next few minutes',
    whenSoon: 'soon',
    responseTime: 'Average response time: under 30 minutes',
    back: 'Back',
    continue: 'Continue',
    submit: 'Get a free quote',
    sending: 'Sending…',
    sendError: 'Could not send. Please try again.',
    finish: 'Done',
    close: 'Close',
  },
}

/* ------------------------------------------------------------------ */
/*  Español                                                            */
/* ------------------------------------------------------------------ */

const es: Dict = {
  brand: 'EurekaSi',
  nav: ['Servicios', 'Cómo funciona', 'Trabajos', 'Reseñas'],
  common: {
    requestQuote: 'Pedir presupuesto',
    requestQuoteFree: 'Pedir presupuesto gratis',
  },
  hero: {
    badge: 'Profesionales disponibles ahora en tu zona',
    titleLine1: 'Tu hogar, resuelto.',
    titleLine2: 'En minutos, no en días.',
    subtitle:
      'Fontanería, electricidad, pintura, aire acondicionado, paneles solares y más. Profesionales verificados, precios fijos y sin sorpresas. Pide ya tu presupuesto gratuito.',
    ctaPrimary: 'Pedir presupuesto gratis',
    ctaSecondary: 'Ver cómo funciona',
    trust: ['Precio fijo, sin sorpresas', 'Profesionales verificados', 'Respuesta en < 30 min'],
    reviewsLine: '+2 400 reseñas de clientes en Portugal',
    quickAccess: 'Toca lo que necesitas',
  },
  stats: [
    { value: '4,9/5', label: 'Valoración media' },
    { value: '12 000+', label: 'Servicios completados' },
    { value: '< 30 min', label: 'Respuesta en emergencia' },
    { value: '100%', label: 'Profesionales verificados' },
  ],
  services: {
    eyebrow: 'Servicios',
    title: 'Todo para tu hogar, en un solo sitio.',
    subtitle: 'Precios fijos y transparentes. Siempre sabes cuánto vas a pagar antes de avanzar.',
    urgentBadge: 'Urgencias',
    freeQuote: 'Presupuesto gratis',
    cardCta: 'Pedir',
    items: [
      {
        name: 'Fontanería',
        tagline: 'Fugas, atascos y grifos — resueltos hoy.',
        examples: ['Reparar fuga de agua', 'Desatascar tuberías', 'Cambiar grifo'],
      },
      {
        name: 'Electricidad',
        tagline: 'Cuadros, enchufes y averías con técnicos certificados.',
        examples: ['Cuadro que salta', 'Instalar enchufes', 'Iluminación LED'],
      },
      {
        name: 'Pintura',
        tagline: 'Paredes y techos como nuevos, sin suciedad.',
        examples: ['Pintura de interiores', 'Reparar humedades', 'Pintura de fachadas'],
      },
      {
        name: 'Tejados',
        tagline: 'Goteras y tejas rotas antes de la próxima lluvia.',
        examples: ['Reparar goteras', 'Sustituir tejas', 'Impermeabilización'],
      },
      {
        name: 'Limpieza',
        tagline: 'Limpieza profunda y profesional, a tu ritmo.',
        examples: ['Limpieza profunda', 'Fin de obra', 'Limpieza regular'],
      },
      {
        name: 'Montajes y Arreglos',
        tagline: 'Muebles, estantes y los pequeños arreglos del día a día.',
        examples: ['Montar muebles', 'Fijar estantes', 'Cambiar cerraduras'],
      },
      {
        name: 'Aire Acondicionado',
        tagline: 'Instalación y mantenimiento para confort todo el año.',
        examples: ['Instalar split', 'Mantenimiento y limpieza', 'Recarga de gas'],
      },
      {
        name: 'Paneles Solares',
        tagline: 'Energía más barata con instalación certificada.',
        examples: ['Instalar paneles', 'Mantenimiento y limpieza', 'Optimizar producción'],
      },
    ],
  },
  how: {
    eyebrow: 'Cómo funciona',
    title: 'Simple como debe ser. Tres pasos.',
    subtitle:
      'Sin llamadas interminables ni presupuestos que tardan días. Resuélvelo en tres toques.',
    cta: 'Empezar ahora',
    steps: [
      {
        title: 'Dinos qué necesitas',
        text: 'Elige el servicio y describe el problema en 30 segundos. Sin registros largos.',
      },
      {
        title: 'Recibe un precio fijo',
        text: 'Mostramos un precio transparente antes de avanzar. Sin sorpresas en la factura.',
      },
      {
        title: 'Profesional en tu puerta',
        text: 'Un técnico verificado confirma la visita — a menudo el mismo día.',
      },
    ],
  },
  work: {
    eyebrow: 'Trabajos reales',
    title: 'Antes y después. Sin filtros, sin stock.',
    subtitle:
      'Resultados de clientes reales en Portugal. Cada proyecto es fotografiado por nuestro equipo.',
    before: 'Antes',
    after: 'Después',
    items: [
      {
        service: 'Pintura de interiores',
        duration: '2 días',
        summary: 'Salón con humedad y pintura descascarada, recuperado y pintado de nuevo.',
      },
      {
        service: 'Reparación de tejado',
        duration: '1 día',
        summary: 'Gotera tratada, tejas sustituidas e impermeabilización aplicada.',
      },
      {
        service: 'Reforma de baño',
        duration: '3 días',
        summary: 'Fontanería antigua sustituida y sanitarios nuevos instalados.',
      },
    ],
  },
  reviews: {
    eyebrow: 'Prueba social',
    title: 'Quien nos abrió la puerta, volvió a llamar.',
    ratingCount: '+2 400 reseñas',
    items: [
      {
        service: 'Fontanería',
        quote:
          'Tenía una fuga debajo del fregadero y en menos de una hora estaba resuelto. El precio fue exactamente el que me indicaron. Lo recomiendo sin dudar.',
      },
      {
        service: 'Electricidad',
        quote:
          'El cuadro saltaba constantemente. El técnico llegó puntual, lo explicó todo y lo dejó funcionando. Profesionalidad de principio a fin.',
      },
      {
        service: 'Pintura',
        quote:
          'Pintaron el salón y dos habitaciones en un fin de semana. Cuidado con los muebles, todo limpio al final. El antes y después es impresionante.',
      },
      {
        service: 'Tejados',
        quote:
          'Una gotera en el techo que empeoraba con la lluvia. Vinieron el mismo día, encontraron la teja rota e impermeabilizaron. Tranquilidad total.',
      },
      {
        service: 'Limpieza',
        quote:
          'Limpieza de fin de obra impecable. La casa parecía nueva. Puntuales, amables y muy minuciosos. Ya reservé la limpieza mensual.',
      },
      {
        service: 'Montajes',
        quote:
          'Montaron un armario grande y fijaron estantes. Rápido, sin daños en la pared y a un precio justo. Volveré a usarlos.',
      },
    ],
  },
  team: {
    eyebrow: 'Quiénes somos',
    title: 'Cuidamos tu hogar como si fuera el nuestro.',
    subtitle:
      'Somos un equipo pequeño y dedicado: lo hacemos todo nosotros, sin subcontratación. Siempre tratas directamente con quien ejecuta el trabajo.',
    guarantees: [
      'Sin subcontratación — siempre las mismas personas',
      'Experiencia comprobada en el oficio',
      'Presupuesto claro antes de empezar',
      'Seguro de responsabilidad civil',
    ],
    promiseTitle: 'Garantía EurekaSi',
    promiseText:
      'Si algo no queda bien, volvemos sin coste. Tu satisfacción es la condición para cerrar el trabajo.',
    promisePoints: [
      'Respuesta rápida, a menudo el mismo día',
      'Precio acordado, sin sorpresas',
      'Trato cercano y de confianza',
    ],
  },
  faq: {
    eyebrow: 'Preguntas frecuentes',
    title: 'Todo lo que necesitas saber.',
    subtitle: 'Sin letra pequeña. Si te quedan dudas, habla con nosotros — respondemos de verdad.',
    items: [
      {
        q: '¿Los precios son realmente fijos?',
        a: 'Sí. Para los servicios más comunes mostramos un precio fijo antes de confirmar. En trabajos mayores, enviamos un presupuesto gratuito y detallado — solo avanzas si estás de acuerdo. Nunca hay costes ocultos.',
      },
      {
        q: '¿En cuánto tiempo llega un profesional?',
        a: 'Para emergencias (fontanería, electricidad, goteras) buscamos un técnico disponible el mismo día, a menudo en pocas horas. Para los demás servicios, eliges la fecha y la hora que mejor te venga.',
      },
      {
        q: '¿Los profesionales son de confianza?',
        a: 'Todos los profesionales EurekaSi están verificados: validamos identidad, experiencia y reseñas reales de clientes. Solo trabajamos con quienes mantienen una valoración alta.',
      },
      {
        q: '¿El presupuesto es gratuito?',
        a: 'Siempre. Pedir un presupuesto no tiene ningún coste ni compromiso. Solo pagas cuando el servicio esté terminado y estés satisfecho.',
      },
      {
        q: '¿Qué zonas cubren?',
        a: 'Estamos presentes en las principales áreas de Portugal Continental — Gran Lisboa, Gran Oporto, Braga, Coímbra, Aveiro, Faro y alrededores. Indica tu código postal para confirmar la cobertura.',
      },
      {
        q: '¿Y si algo sale mal?',
        a: 'Todos los servicios tienen garantía EurekaSi. Si algo no queda bien, volvemos sin coste adicional. Tu satisfacción es la condición para cerrar el trabajo.',
      },
    ],
  },
  finalCta: {
    badge: 'Respuesta en menos de 30 minutos',
    title: '¿Listo para resolverlo?',
    subtitle: 'Presupuesto gratuito y sin compromiso. Solo pagas cuando el trabajo está hecho.',
  },
  footer: {
    tagline:
      'Servicios para tu hogar con profesionales verificados, precios fijos y respuesta en minutos. En todo Portugal Continental.',
    servicesHead: 'Servicios',
    companyHead: 'Empresa',
    companyLinks: [
      { label: 'Trabajos', href: '#trabalhos' },
      { label: 'Reseñas', href: '#avaliacoes' },
      { label: 'Cómo funciona', href: '#como-funciona' },
      { label: 'Trabaja con nosotros', href: '#' },
    ],
    contactHead: 'Contacto',
    hours: 'Lun–Dom · 8h–22h',
    rights: '© {year} EurekaSi Servicios. Todos los derechos reservados.',
    legal: ['Términos', 'Privacidad', 'Cookies'],
  },
  modal: {
    eyebrow: 'Presupuesto gratis',
    title: 'Pedir presupuesto',
    successTitle: 'Solicitud recibida',
    step0Legend: '¿Qué servicio necesitas?',
    step1Legend: '¿Para cuándo lo necesitas?',
    urgencyOptions: {
      hoje: { label: 'Es urgente — lo antes posible', hint: 'Buscamos técnico para hoy' },
      'esta-semana': { label: 'Esta semana', hint: 'Reservamos el mejor día' },
      flexivel: { label: 'Soy flexible', hint: 'Sin prisa' },
    },
    detailLabel: 'Describe el problema',
    optional: '(opcional)',
    detailPlaceholder: 'Ej.: fuga de agua debajo del fregadero de la cocina…',
    contactIntro: '¿A dónde enviamos el presupuesto y la confirmación?',
    nameLabel: 'Nombre',
    namePlaceholder: 'Tu nombre',
    phoneLabel: 'Móvil',
    phonePlaceholder: '9XX XXX XXX',
    postalLabel: 'Código postal',
    postalHint: '(para confirmar cobertura)',
    postalPlaceholder: '0000-000',
    privacy: 'Tus datos se usan solo para esta solicitud. Sin spam.',
    successTitleTpl: '¡Solicitud enviada, {name}!',
    thanksWord: 'gracias',
    successBodyTpl:
      'Un profesional verificado de {service} te llamará al {phone} {when} con tu precio fijo.',
    serviceFallback: 'servicios',
    phoneFallback: 'indicado',
    whenToday: 'en los próximos minutos',
    whenSoon: 'pronto',
    responseTime: 'Tiempo medio de respuesta: menos de 30 minutos',
    back: 'Atrás',
    continue: 'Continuar',
    submit: 'Pedir presupuesto gratis',
    sending: 'Enviando…',
    sendError: 'No se pudo enviar. Inténtalo de nuevo.',
    finish: 'Listo',
    close: 'Cerrar',
  },
}

const dicts: Record<Lang, Dict> = { pt, en, es }

/** Substitui tokens {chave} numa string. */
export function fill(tpl: string, vars: Record<string, string>): string {
  return tpl.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '')
}

/* ------------------------------------------------------------------ */
/*  Contexto                                                           */
/* ------------------------------------------------------------------ */

type LangContextValue = {
  lang: Lang
  setLang: (l: Lang) => void
  t: Dict
}

const LangContext = createContext<LangContextValue | null>(null)

const STORAGE_KEY = 'eurekasi.lang'

function detectInitial(): Lang {
  if (typeof window === 'undefined') return 'pt'
  const stored = window.localStorage.getItem(STORAGE_KEY) as Lang | null
  if (stored && stored in dicts) return stored
  const nav = window.navigator.language.toLowerCase()
  if (nav.startsWith('es')) return 'es'
  if (nav.startsWith('pt')) return 'pt'
  if (nav.startsWith('en')) return 'en'
  return 'pt'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectInitial)

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    window.localStorage.setItem(STORAGE_KEY, l)
  }, [])

  useEffect(() => {
    const meta = LANGS.find((l) => l.code === lang)
    document.documentElement.lang = meta?.htmlLang ?? 'pt-PT'
  }, [lang])

  const value = useMemo(() => ({ lang, setLang, t: dicts[lang] }), [lang, setLang])

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang deve ser usado dentro de <LangProvider>')
  return ctx
}
