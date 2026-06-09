# EurekaSi · Serviços para o seu lar

Web app de **serviços do lar para o mercado português** — canalização, eletricidade,
pintura, telhados, limpeza e montagens. Estética minimalista premium, focada na
**conversão máxima** e **mobile-first**.

**Trilingue:** Português (PT-PT) · English · Español — com seletor de idioma e
deteção automática a partir do navegador.

> O seu lar, resolvido. Em minutos, não em dias.

## ✨ Princípios de design

- **Minimalismo radical** — muito espaço em branco, tipografia sans-serif moderna
  (Inter + Plus Jakarta Sans), zero desordem visual.
- **Mobile-first** — pensado para quem procura no telemóvel numa emergência, com uma
  só mão. Barra de CTA fixa inferior + acesso rápido aos serviços.
- **O botão é o protagonista** (inspiração PreFix) — o CTA *“Pedir orçamento grátis”*
  domina cada secção.
- **Foco em conversão** — o site público não mostra preços; cada serviço leva ao modal
  de orçamento grátis para **captar o lead** (nome + telemóvel). Os preços de referência
  vivem na área de admin (ver abaixo).
- **Prova social imediata** (inspiração Absolute Home Services) — avaliações e rating
  4,9/5 logo no hero.
- **Imediatez** — “resposta em < 30 min”, profissionais disponíveis agora.
- **Autenticidade** — secções *Antes/Depois* e *Equipa* estruturadas para **fotos reais**
  (placeholders prontos a substituir), sem imagens de stock genéricas.
- **Tom de voz** profissional e de confiança, em **Português de Portugal** (pt-PT),
  **inglês** e **espanhol**.

## 🌍 Internacionalização (i18n)

O site está disponível em **três idiomas**: Português europeu (`pt`), Inglês (`en`) e
Espanhol (`es`).

- Todo o texto vive em `src/i18n.tsx`, num dicionário por idioma. O tipo `Dict` é
  derivado do dicionário PT, pelo que o TypeScript **garante em tempo de compilação**
  que EN e ES têm todas as chaves traduzidas — sem strings em falta.
- O `src/data.ts` mantém apenas dados **estruturais** (ícones, preços, tons, nomes
  próprios), alinhados por índice com os textos do `i18n`.
- O idioma é detetado a partir do navegador, persistido em `localStorage`
  (`eurekasi.lang`) e alternável pelo seletor **PT / EN / ES** no cabeçalho. O atributo
  `<html lang>` é atualizado dinamicamente.

Para adicionar um idioma: acrescente o código a `LANGS`, crie um novo dicionário do
tipo `Dict` e adicione-o ao mapa `dicts`.

## 🔒 Área de administração (privada, com backend seguro)

O site público **não mostra preços** — o objetivo é **captar leads** (o modal recolhe
nome, telemóvel e código postal e envia-os para `POST /api/leads`). A área reservada
está em `/#admin` (ou no cadeado do rodapé) e é protegida por **autenticação real do
lado do servidor**:

- **Login** contra uma palavra-passe com hash **scrypt** (`ADMIN_PASSWORD_HASH`); a
  sessão é uma cookie **HttpOnly + Secure + SameSite** assinada com HMAC
  (`SESSION_SECRET`). Não há palavra-passe nem dados sensíveis no bundle.
- **Leads** — guardados em **PostgreSQL** e listados no painel (`GET /api/admin/leads`).
  Notificação opcional por **email** (Resend) a cada novo lead.
- **Calculadora de orçamentos** e **tabelas de preços** — os dados de preços vivem
  **só no servidor** e servem-se via endpoint protegido (`GET /api/admin/pricing`),
  fora do bundle público. O chunk da UI do painel também é carregado em separado.

### Endpoints (`/api`, funções serverless)

| Método | Rota | Acesso | Função |
| --- | --- | --- | --- |
| `POST` | `/api/leads` | Público | Cria um lead (validação + honeypot + rate-limit) |
| `POST` | `/api/admin/login` | Público | Verifica a palavra-passe → cookie de sessão |
| `POST` | `/api/admin/logout` | Sessão | Termina a sessão |
| `GET` | `/api/admin/session` | — | Indica se a sessão é válida |
| `GET` | `/api/admin/leads` | Sessão | Lista de leads |
| `GET` | `/api/admin/pricing` | Sessão | Dados de preços + calculadora |

## 🚢 Produção (Vercel / Netlify + PostgreSQL)

1. **Base de dados**: cria um PostgreSQL gestionado (Neon, Supabase ou Vercel Postgres)
   e copia a `DATABASE_URL`. As tabelas criam-se sozinhas no primeiro pedido.
2. **Palavra-passe do admin**: `npm run hash:password -- "a-tua-password-longa"` e
   guarda o resultado em `ADMIN_PASSWORD_HASH`.
3. **Segredo de sessão**: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
   → `SESSION_SECRET`.
4. **Email (opcional)**: cria uma API key em [Resend](https://resend.com) e define
   `RESEND_API_KEY`, `LEAD_NOTIFY_FROM`, `LEAD_NOTIFY_TO`.
5. Define todas as variáveis no painel do host (ver `.env.example`) e faz deploy.
   No Vercel, a pasta `/api` vira funções serverless automaticamente e o frontend Vite
   é servido como estático (config em `vercel.json`).

> **Netlify:** funciona com um pequeno adaptador (`netlify/functions` + redirects de
> `/api/*`). O Vercel é o caminho recomendado pela convenção `/api` sem configuração.

### Endurecimento recomendado (próximos passos)

- Ativar **rate-limiting / WAF a nível de plataforma** (o limitador em memória é
  best-effort, reinicia por instância serverless).
- Rotação periódica de `SESSION_SECRET` e política de palavra-passe forte.
- `Content-Security-Policy` afinada e, se necessário, **2FA** para o admin.

## 🧱 Stack

- **Frontend:** [Vite](https://vite.dev) + [React 18](https://react.dev) + TypeScript (strict)
  + [Tailwind CSS](https://tailwindcss.com). Sem dependências de UI/ícones (SVG em linha).
- **Backend:** funções serverless TypeScript em `/api` + **PostgreSQL** (driver `postgres`).
  Auth com `node:crypto` (scrypt + HMAC), sem dependências pesadas. Email via Resend.

## 🚀 Começar

```bash
npm install              # instalar dependências
npm run dev              # frontend em desenvolvimento (http://localhost:5173)
npm run build            # type-check + build de produção do frontend
npm run typecheck        # type-check do frontend E das funções /api
npm run hash:password -- "minha-password"   # gerar ADMIN_PASSWORD_HASH
```

> Para correr as funções `/api` localmente, usa o Vercel CLI (`vercel dev`) com um
> ficheiro `.env` baseado em `.env.example` (precisa de uma `DATABASE_URL` válida).

## 📁 Estrutura

```
api/                      # FUNÇÕES SERVERLESS (backend seguro)
├── leads.ts              # POST público: criar lead
├── admin/                # endpoints protegidos por sessão
│   ├── login.ts · logout.ts · session.ts · leads.ts · pricing.ts
└── _lib/                 # db (Postgres) · auth (scrypt+HMAC) · email · pricing · http

src/
├── App.tsx               # composição da página pública
├── booking.tsx           # contexto do fluxo de orçamento (abrir/fechar modal)
├── i18n.tsx              # dicionários PT/EN/ES + contexto de idioma
├── Root.tsx              # router por hash: #admin (lazy) → painel; resto → site
├── data.ts               # dados estruturais públicos: ícones, urgência
├── icons.tsx             # ícones SVG em linha
├── admin/                # UI PRIVADA (dados vêm da API, não do bundle)
│   ├── AdminPage.tsx     # login real + dashboard (leads, calculadora, preços)
│   ├── BudgetCalculator.tsx  # calculadora de orçamentos (dados via props)
│   ├── api.ts            # cliente da API admin
│   └── types.ts          # tipos das respostas JSON
└── components/
    ├── LangSwitcher.tsx  # seletor de idioma PT / EN / ES
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
