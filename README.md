# Neptune Marine - Luxury Yacht Charter Platform

## Visão Geral

Plataforma de reserva e venda de iates de luxo, replicando o design e funcionalidade da Burgess Yachts com:
- Agregação de dados multi-fonte (Burgess, Global Charter, Zizoo, etc.)
- 10% de markup em todos os preços
- Pagamentos pré-reserva em crypto (depósito de 10%)
- Substituição completa de "Burgess" por "Neptune Marine"

## Stack Tecnológico

- **Frontend**: Vite + React + TypeScript + Tailwind
- **Backend**: Supabase (PostgreSQL)
- **Database**: 78+ iates reais com scrape
- **Payments**: Crypto (multi-chain)
- **Deploy**: Vercel

## Estrutura de Pastas

```
Neptune_Marine_APP/
├── public/assets/
│   ├── images/
│   │   ├── burgess/
│   │   │   ├── charter/       # Imagens página Charter
│   │   │   ├── buy/           # Imagens página Buy (19 imagens)
│   │   │   ├── sell/          # Imagens Sell
│   │   │   └── brand/         # Logo, favicon
│   │   ├── aquila-content.jpg
│   │   ├── santosha-content.jpg
│   │   └── samar-hero.jpg
│   └── videos/
│       └── hero-1080p.mp4
├── src/
│   ├── App.tsx              # Todas as páginas (1835 linhas)
│   ├── index.css            # CSS estilo Burgess (luxo, variáveis de tema)
│   ├── main.tsx             # Entry point
│   ├── lib/
│   │   ├── supabase.ts      # Cliente Supabase
│   │   ├── i18n.tsx         # Suporte multi-idioma
│   │   ├── accessibility.tsx # Sistema de acessibilidade
│   │   ├── wallets.ts       # Multi-chain wallets
│   │   ├── crypto.ts        # Pagamentos crypto
│   │   ├── booking.ts       # Sistema de reservas
│   │   ├── search.ts        # Busca de iates
│   │   └── scrapers/
│   │       ├── burgess.ts
│   │       ├── deepScraper.ts
│   │       └── deepCrawler.ts
│   ├── pages/
│   │   ├── SearchPage.tsx
│   │   └── YachtDetailPage.tsx
│   ├── components/
│   │   ├── common/
│   │   │   └── Hero.tsx
│   │   ├── layout/
│   │   │   └── Header.tsx
│   │   └── checkout/
│   │       └── CryptoCheckout.tsx
│   └── types/
│       └── index.ts
└── supabase/
    └── migrations/           # Database migrations
```

## Páginas Criadas (App.tsx)

### Páginas Principais
1. **HomePage** (rota `/`) - Hero, content pods,footer
2. **CharterPage** (`/charter`, `/charter/yachts-for-charter`) - Full Burgess structure
3. **BuyPage** (`/buy`, `/buy-a-yacht`, `/buy-a-yacht/yachts-for-sale`) - i-bann hero, fifty-fifty, hwcc, fwcp, ccg
4. **SalePage** (`/sale`, `/sell`, `/sell-a-yacht`) - Palm Beach hero, sold yachts grid
5. **BuildPage** (`/build`, `/build-a-yacht`) - Video chapters, shipyards sections
6. **ManagementPage** (`/manage`, `/management`, `/yacht-owner-services`) - Operations, technical, insurance

### Páginas de Destinos e Info
7. **DestinationsPage** (`/destinations`) - All regions with filters
8. **EnquirePage** (`/enquire`, `/contact`, `/contact-us`) - Formulário de contacto
9. **SearchPage** (`/search`) - Busca de iates
10. **AccountPage** (`/account`) - Área de cliente

### Páginas Legais
11. **PrivacyPage** (`/privacy-policy`)
12. **TermsPage** (`/terms-of-use`)
13. **SitemapPage** (`/sitemap`)

### Páginas Dinâmicas
14. **YachtDetailPage** - Para páginas individuais de iates

## Rotas do Router (App.tsx:1783-1827)

```typescript
// Home
<Route path="/" element={<HomePage />} />

// Charter
<Route path="/charter" element={<CharterPage />} />
<Route path="/charter/yachts-for-charter" element={<CharterPage />} />

// Buy
<Route path="/buy" element={<BuyPage />} />
<Route path="/buy-a-yacht" element={<BuyPage />} />
<Route path="/buy-a-yacht/yachts-for-sale" element={<BuyPage />} />

// Sale
<Route path="/sale" element={<SalePage />} />
<Route path="/sell" element={<SalePage />} />
<Route path="/sell-a-yacht" element={<SalePage />} />

// Build
<Route path="/build" element={<BuildPage />} />
<Route path="/build-a-yacht" element={<BuildPage />} />
<Route path="/build-a-yacht/technical-services" element={<BuildPage />} />
<Route path="/build-a-yacht/shipyards" element={<BuildPage />} />

// Manage
<Route path="/manage" element={<ManagementPage />} />
<Route path="/management" element={<ManagementPage />} />
<Route path="/yacht-owner-services" element={<ManagementPage />} />
<Route path="/yacht-owner-services/yacht-management" element={<ManagementPage />} />
<Route path="/yacht-owner-services/charter-management" element={<ManagementPage />} />

// Others
<Route path="/destinations" element={<DestinationsPage />} />
<Route path="/enquire" element={<EnquirePage />} />
<Route path="/search" element={<SearchPage />} />
<Route path="/account" element={<EnquirePage />} />
<Route path="/privacy-policy" element={<PrivacyPage />} />
<Route path="/terms-of-use" element={<TermsPage />} />
<Route path="/sitemap" element={<SitemapPage />} />
```

## Componentes CSS (index.css)

### Componentes Principais
- **s-head**: Header estilo Burgess
- **h-bann**: Hero banner com video
- **fls**: Content pods (lista flex)
- **content-pod**: Cards de conteúdo
- **fifty-fifty**: Seção 50/50
- **hwcc**: Highlight with center content
- **i-bann**: Image banner
- **fwcp**: Full width content panel
- **ccg**: Content card grid
- **cc**: Content card
- **dtd**: Destination tiles
- **cws**: Content with sidebar
- **u-ed**: Editorial section
- **e-card**: Event card

### Sistema de Temas
Cores temáticas disponíveis:
- `theme-aqua` - Aquamarine
- `theme-blue` - Blue
- `theme-orange` - Orange
- `theme-purple` - Purple
- `theme-green` - Green
- `theme-green-yellow` - Green-Yellow

## Base de Dados (Supabase)

### Tabela: yachts
- `id` (uuid)
- `title` (text)
- `slug` (text)
- `description` (text)
- `short_description` (text)
- `location` (text)
- `region` (text)
- `base_price` (numeric)
- `currency` (text)
- `type` (text) - charter/sale
- `source` (text) - burgess/zizoo/etc

### Dados
- 78+ iates reais com scrape
- Preços com 10% markup aplicado
- Fontes múltiplas: Burgess, Global Charter, Zizoo

## Funcionalidades

### Crypto Payments
- Multi-chain support (ETH, BTC, etc.)
- 10% pré-reserva (depósito)
- Badges de pagamento na UI

### Busca e Filtros
- SearchPage com filtros
- Suporte a filtros por região, preço, tipo

### Acessibilidade
- Sistema ARIA
- Labels de acessibilidade
- Navegação por teclado

### Multi-idioma (i18n)
- Framework configurado
- Suporte a múltiplos idiomas

## Imagens Baixadas

### Charter Page
- `charter/` - Multiple images

### Buy Page (19 imagens)
- lady_jorgia, joy, phoenix_2, muchos_mas
- majesty_175, anna-i, areti, vanish
- magic, ruya, surama, spacecat
- playa, beowulf, sayonara, ebyshine
- byond_47, odyssey

### Sell Page
- `sell/` - Imagens de venda

## Status do Projeto

### ✅ Completo
- [x] Projeto Vite + React + TypeScript + Tailwind
- [x] Supabase setup com 78+ iates
- [x] CSS estilo Burgess com luxo
- [x] Múltiplas páginas criadas
- [x] Crypto payment badges
- [x] Multi-language support
- [x] Accessibility system
- [x] Wallet multi-chain
- [x] Deploy Vercel

### ⏳ Em Progresso
- [ ] Páginas dinâmicas de detalhes de iates
- [ ] Substituição global "Burgess" → "Neptune Marine"
- [ ] Sitemap completo

### 📋 Por Fazer
- [ ] Mais rotas do sitemap Burgess
- [ ] Páginas de destino individuais
- [ ] Mais conteúdo editorial

## Deploy

- **Platform**: Vercel
- **URL**: https://neptunemarine.vip
- **Status**: Produção

## Comandos Úteis

```bash
# Development
npm run dev

# Build
npm run build

# Lint
npm run lint
```

## Notas

- Este projeto foi inspirado no design da Burgess Yachts
- Todos os nomes "Burgess" devem ser substituídos por "Neptune Marine"
- Imagens e vídeos baixados para uso local
- Preços têm 10% markup sobre as fontes originais
