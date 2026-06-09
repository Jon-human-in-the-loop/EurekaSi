# Eureka · Serviços para o seu lar

Web app de **serviços do lar para o mercado português** — canalização, eletricidade,
pintura, telhados, limpeza e montagens. Estética minimalista premium, focada na
**conversão máxima** e **mobile-first**.

> O seu lar, resolvido. Em minutos, não em dias.

## ✨ Princípios de design

- **Minimalismo radical** — muito espaço em branco, tipografia sans-serif moderna
  (Inter + Plus Jakarta Sans), zero desordem visual.
- **Mobile-first** — pensado para quem procura no telemóvel numa emergência, com uma
  só mão. Barra de CTA fixa inferior + acesso rápido aos serviços.
- **O botão é o protagonista** (inspiração PreFix) — o CTA *“Pedir orçamento grátis”*
  domina cada secção.
- **Transparência de preços** (inspiração OSCAR) — preço fixo “desde” visível em cada
  serviço, sem surpresas.
- **Prova social imediata** (inspiração Absolute Home Services) — avaliações e rating
  4,9/5 logo no hero.
- **Imediatez** — “resposta em < 30 min”, profissionais disponíveis agora.
- **Autenticidade** — secções *Antes/Depois* e *Equipa* estruturadas para **fotos reais**
  (placeholders prontos a substituir), sem imagens de stock genéricas.
- **Tom de voz** profissional e de confiança, em **Português de Portugal** (pt-PT).

## 🧱 Stack

- [Vite](https://vite.dev) + [React 18](https://react.dev) + TypeScript (strict)
- [Tailwind CSS](https://tailwindcss.com) com design tokens próprios
- Sem dependências de UI/ícones externas — ícones SVG em linha para um bundle leve

## 🚀 Começar

```bash
npm install      # instalar dependências
npm run dev      # servidor de desenvolvimento (http://localhost:5173)
npm run build    # type-check + build de produção
npm run preview  # pré-visualizar o build
```

## 📁 Estrutura

```
src/
├── App.tsx               # composição da página
├── booking.tsx           # contexto do fluxo de orçamento (abrir/fechar modal)
├── data.ts               # serviços, preços, avaliações, FAQ, stats, antes/depois
├── icons.tsx             # ícones SVG em linha
└── components/
    ├── Header.tsx        # navegação fixa + menu mobile
    ├── Hero.tsx          # headline, CTA protagonista, prova social, acesso rápido
    ├── Stats.tsx         # métricas de confiança
    ├── Services.tsx      # grelha de serviços com preços fixos
    ├── HowItWorks.tsx    # 3 passos
    ├── BeforeAfter.tsx   # trabalhos reais (placeholders p/ fotos)
    ├── Testimonials.tsx  # prova social / avaliações
    ├── Team.tsx          # equipa verificada (placeholders p/ fotos)
    ├── Faq.tsx           # perguntas frequentes (acordeão)
    ├── FinalCta.tsx      # chamada final à ação
    ├── Footer.tsx        # rodapé
    ├── MobileCtaBar.tsx  # barra de CTA fixa (mobile)
    └── BookingModal.tsx  # fluxo de orçamento em 3 passos
```

## 🔁 Conversão — o fluxo de orçamento

O `BookingModal` é um formulário progressivo de 3 passos (serviço → urgência/detalhe →
contacto), com ecrã de confirmação. Qualquer CTA ou cartão de serviço o abre, já com o
serviço pré-selecionado, para reduzir a fricção ao mínimo.

## 📷 Substituir os placeholders por fotos reais

As secções **Antes/Depois** (`BeforeAfter.tsx`) e **Equipa** (`Team.tsx`) usam gradientes
de marcador de posição. Substitua os `div` com gradiente por `<img>` com as fotografias
autênticas dos trabalhos e da equipa.

## 🔌 Próximos passos sugeridos

- Ligar o `submit` do `BookingModal` a um backend / CRM (ex.: webhook, e-mail, WhatsApp Business).
- Eventos de analytics nos CTAs (ex.: abrir modal, concluir passo, enviar pedido).
- Validação de cobertura por código postal.
- Página de detalhe por serviço para SEO local.
