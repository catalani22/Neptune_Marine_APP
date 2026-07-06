# Neptune Marine — GROWTH ENGINE

> Automação social + Share dialogs virais + i18n nativo  
> *Status: Arquitetado. Aguardando contas sociais e chaves de API.*

---

## CONTAS SOCIAIS NECESSÁRIAS

| Plataforma | Handle | Formato | Prioridade |
|-----------|--------|---------|-----------|
| Twitter/X | `@NeptuneMarine` | Deals, novos iates, charter spots | 🔴 Alta |
| **Instagram** | `@NeptuneMarine` | **Principal** — yachts são visuais | 🔴 Alta |
| **YouTube** | `Neptune Marine` | Tours de iates, destinos de charter | 🔴 Alta |
| Telegram | `@NeptuneMarineDeals` | Last-minute deals | 🟡 Média |
| TikTok | `@NeptuneMarine` | Clips curtos de iates em movimento | 🟠 Baixa |

> ⚠️ **Instagram + YouTube são PRINCIPAIS** para Neptune Marine.  
> Yachts de luxo = conteúdo visual premium = engagement alto.

---

## AUTOMAÇÃO TWITTER/X — `@NeptuneMarine`

### Posts automáticos

#### 1. Novo iate disponível para charter
```
Trigger: iate com status 'active' e tipo 'charter' adicionado ao Supabase

Tweet:
"⚓ New charter available on Neptune Marine!

🛥️ [Yacht Name]
📍 Based in [Location]
👥 Up to [N] guests | [N] cabins
💰 From $[price]/week

Pay with crypto. No banks. Pure luxury.
👉 neptunemarine.vip/charter/[slug]
#YachtCharter #LuxuryYacht #[Destination] #CryptoPayment"
```

#### 2. Last-Minute Charter Deal (conteúdo mais viral)
```
Trigger: iate disponível nos próximos 21 dias sem reserva

Tweet:
"🔥 LAST MINUTE CHARTER DEAL

🛥️ [Yacht Name] — [LOA]m | [N] guests
📍 [Current Location] → wherever you want
📅 Available from [date]
💰 $[price]/week (10% off for last minute!)

Pay with ETH, SOL, USDC or BNB 🚀
👉 neptunemarine.vip/charter/[slug]
#LastMinute #YachtCharter #LuxuryTravel"
```

#### 3. Iate à venda
```
Tweet:
"🏆 New yacht for sale on Neptune Marine

🛥️ [Name] — [Year] | [LOA]m | [Builder]
⚓ [N] cabins | [Speed] knots
💰 $[price] (crypto accepted)

View full specs & make an offer 👇
neptunemarine.vip/buy/[slug]
#YachtForSale #LuxuryYacht #Web3"
```

#### 4. Weekly charter digest
```
Schedule: Todo domingo 12PM UTC

Tweet:
"🌊 This week's top charters on Neptune Marine:

🇪🇸 Mediterranean — [N] yachts available
🇬🇷 Greek Islands — [N] available
🇲🇻 Indian Ocean — [N] available
🌴 Caribbean — [N] available

All bookable with crypto 🚀
neptunemarine.vip
#YachtCharter #LuxuryTravel #Web3"
```

### Keywords para monitorar (auto-reply)
```
["yacht charter", "rent a yacht", "luxury boat", "charter mediterranean",
 "yacht for sale", "buy yacht crypto", "superyacht charter"]

Reply:
"Check Neptune Marine — luxury yacht charter & sales with crypto payments ⚓
Best rates + 10% markup transparency. No hidden fees.
👉 neptunemarine.vip"
```

---

## AUTOMAÇÃO YOUTUBE — `Neptune Marine`

### Vídeos automáticos gerados

#### 1. "Yacht Spotlight" — por novo listing
```
Conteúdo gerado automaticamente:
- Slideshow das fotos do iate com Ken Burns effect
- Narração AI (ElevenLabs ou Google TTS)
- Texto: specs do iate + preço + como reservar com crypto
- Background music: lounge/ocean vibes
- Duração: 2-3 minutos
- Thumbnail: foto hero + "Charter from $[price]/week"
```

#### 2. "Destination Guide" — semanal por destino
```
"Mediterranean Charter Guide 2026 — Neptune Marine"
"Greek Islands by Yacht — Best Routes & Charter Tips"
"Caribbean Last Minute Yachts — This Week's Deals"
```

#### 3. "Last Minute Alert" — urgência
```
Vídeo rápido (45s) quando surge last-minute deal:
"🔥 LAST MINUTE: [Yacht] available [dates] — [price]"
Gera urgência + SEO de long tail
```

---

## SHARE DIALOGS (Usuários nos divulgam)

### 1. Reserva de charter confirmada
```
Modal: "Charter confirmado! Compartilhe sua aventura ⚓"

Twitter/X:
"Just booked a [LOA]m yacht in [Destination] with crypto! ⚓✨
[N] days of pure luxury via @NeptuneMarine

ETH. SOL. USDC. No banks needed.
👉 neptunemarine.vip
#YachtLife #Web3 #LuxuryTravel #[Destination]"

WhatsApp:
"Reservei um iate de [LOA]m em [Destino] pagando com crypto!
Tudo via Neptune Marine — confere: neptunemarine.vip"
```

### 2. Iate visto/favoritado (menor fricção)
```
"Just found my dream yacht on Neptune Marine 😍
[Yacht Name] — [Destination] — $[price]/week
Who's joining? 🛥️
neptunemarine.vip/charter/[slug]"
```

### OG Image Dinâmica por Iate
```typescript
// api/og/yacht.tsx — Vercel Edge Function
// Gera card 1200x630 com:
// ├── Foto hero do iate (background fullbleed)
// ├── Overlay com gradiente azul profundo
// ├── Nome do iate (grande, branca)
// ├── LOA + guests + location
// ├── Preço/semana (destaque)
// └── "Neptune Marine" logo + "Pay with Crypto"
```

---

## i18n — INTERNACIONALIZAÇÃO

### Idiomas prioritários para mercado náutico
| Idioma | Mercado | Prioridade |
|--------|---------|-----------|
| Inglês | Global / Internacional | 🔴 P0 |
| Português | Brasil + Portugal (alto interesse náutico) | 🔴 P0 |
| Italiano | Maior mercado de charter no Mediterrâneo | 🔴 P0 |
| Russo | Clientes de mega-yachts | 🟡 P1 |
| Espanhol | Espanha + LATAM | 🟡 P1 |
| Francês | Côte d'Azur, Monaco | 🟡 P1 |
| Alemão | Maior mercado norte-europeu de charter | 🟠 P2 |
| Árabe | Golfo Pérsico — clientes de superyachts | 🟠 P2 |

> 🔑 **Italiano é P0** — Mediterrâneo = maior mercado de yacht charter do mundo.  
> 🔑 **Russo é P1** — mercado de mega-yachts historicamente forte.

### Nota: Neptune Marine já tem i18n iniciado
```
src/lib/i18n.tsx já existe no projeto — EXPANDIR, não recriar.
Adicionar traduções IT, RU, FR ao framework existente.
```

---

## SECRETS NECESSÁRIOS

```bash
# Twitter/X (@NeptuneMarine)
NM_TWITTER_API_KEY=...
NM_TWITTER_API_SECRET=...
NM_TWITTER_ACCESS_TOKEN=...
NM_TWITTER_ACCESS_TOKEN_SECRET=...
NM_TWITTER_BEARER_TOKEN=...

# Instagram Business (Meta Graph API)
NM_INSTAGRAM_ACCESS_TOKEN=...
NM_INSTAGRAM_BUSINESS_ACCOUNT_ID=...
NM_META_APP_ID=...
NM_META_APP_SECRET=...

# YouTube (Google OAuth)
NM_YOUTUBE_CLIENT_ID=...
NM_YOUTUBE_CLIENT_SECRET=...
NM_YOUTUBE_REFRESH_TOKEN=...
NM_YOUTUBE_CHANNEL_ID=...

# Telegram
NM_TELEGRAM_BOT_TOKEN=...
NM_TELEGRAM_CHANNEL_ID=...
```

**Infra pronta para implementar. Chaves chegam → plugar → funciona.**

---

## RESUMO ESTRATÉGICO

```
Neptune Marine = YACHTS + WEB3 + AUTOMAÇÃO VISUAL

Cada iate listado = post automático Twitter + Instagram + YouTube Spotlight
Last-minute deals = tweets de urgência = conversão alta
Reserva confirmada = share dialog = viral orgânico
i18n IT + RU + FR = cobre 90% do mercado de yacht charter premium
YouTube = SEO de longo prazo ("yacht charter [destination] 2026")
```
