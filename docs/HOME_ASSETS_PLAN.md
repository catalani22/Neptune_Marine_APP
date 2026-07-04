# Neptune Marine — Plano de Assets da Home

> Objetivo: deixar a home com total similaridade visual ao Burgess, preservando identidade, proporções, fontes e cores.

---

## 1. Inventário

### Já temos no projeto
- **Vídeo hero**: `public/assets/videos/hero-1080p.mp4`
- **Charter**: `lady_jorgia.jpg`, `seanna.jpg`, `excellence.jpg`, `excellence_int.jpg`
- **Buy**: `joy.jpg`, `phoenix_2.jpg`, `my_legacy.jpg`, `muchos_mas.jpg`, `majesty_175.jpg`, `anna-i.jpg`, `areti.jpg`, `vanish.jpg`, `magic.jpg`, `ruya.jpg`, `surama.jpg`, `spacecat.jpg`, `playa.jpg`, `beowulf.jpg`, `sayonara.jpg`, `ebyshine.jpg`, `byond_47.jpg`, `odyssey.jpg`
- **Sell**: `palm_beach.jpg`
- **Brand**: `neptunebw.png`, `watermarked_img_...jpg`
- **Content pods avulsas**: `aquila-content.jpg`, `santosha-content.jpg`, `samar-hero.jpg`

### Disponibilizados pelo usuário (pasta Downloads/Superyachts...)
`87 arquivos` incluindo:
- Heros/pôsteres: `imgi_2_hero-3.jpg`, `imgi_25_hero-3.jpg`
- Lady Jorgia variações: `imgi_8_...`, `imgi_34_...`, `imgi_42_...`
- Seanna variações: `imgi_9_...`, `imgi_10_...`, `imgi_35_...`, `imgi_36_...`, etc.
- Synthesis: `imgi_5_...`, `imgi_17_...`, `imgi_28_...`, `imgi_53_...`, etc.
- Joy: `imgi_13_...`, `imgi_39_...`, `imgi_47_...`, `imgi_51_...`, etc.
- Alvia: `imgi_3_...`, `imgi_26_...`
- Riva Corsaro: `imgi_7_...`
- Joro: `imgi_6_...`, `imgi_29_...`
- Rox Star: `imgi_15_...`, `imgi_49_...`, `imgi_50_...`
- Blue Marine Foundation: `imgi_14_...`, `imgi_40_...`, `imgi_48_...`
- St Jean St Barth: `imgi_20_...`, `imgi_59_...`, `imgi_60_...`
- Marina Castelsardo: `imgi_4_...`, `imgi_27_...`
- Monaco Yacht Show: `imgi_21_...`, `imgi_61_...`, `imgi_62_...`
- Food: `imgi_18_...`, `imgi_55_...`, `imgi_56_...`
- Neninka: `imgi_19_...`, `imgi_57_...`, `imgi_58_...`
- Welding: `imgi_12_...`, `imgi_38_...`, `imgi_46_...`
- BTS Oceanco: `imgi_11_...`, `imgi_37_...`, `imgi_45_...`
- Burgess wordmark: `imgi_88_burgesswordmarkrgb.png`
- Vídeos extras: 2x mp4

### Faltam nomear/mapear (a definir uso)
- `imgi_31_samar_...` (samar já temos)
- `imgi_32` e `imgi_33` (duplicatas de samar?)
- `imgi_22_aziza_...`
- `imgi_23_va_bene_...`
- `imgi_30_riva_corsaro...` (já temos riva corsaro)

---

## 2. Mapa de Uso na Home (Burgess vs Neptune Marine)

### Hero Section
- **Burgess**: vídeo background + gradiente overlay + título grande
- **Neptune**: manter `hero-1080p.mp4` + overlay
- **Poster local sugerido**: `imgi_2_hero-3.jpg` → `home/hero-poster.jpg`

### Content Pods (fls) — 3 pods
1. **Yacht charters / Last-minute availability**
   - Burgess: imagem de charter premium
   - Neptune: `imgi_8_lady-jorgia.jpg` ou `imgi_34_lady-jorgia.jpg`
2. **Unbeatable holidays / Yachts for charter**
   - Burgess: imagem de float/social
   - Neptune: `imgi_9_seanna.jpg` ou `imgi_35_seanna.jpg`
3. **Buy a yacht / Yachts for sale**
   - Burgess: imagem de grande iate
   - Neptune: `imgi_13_joy.jpg` ou `imgi_39_joy.jpg`

### Destination Pods — 3 pods
1. **Destinations / Breathtaking Balearics**
   - Neptune: `imgi_27_marina-castelsardo.jpg`
2. **Sustainability / Marine Foundation**
   - Neptune: `imgi_14_blue-marine-foundation.jpg`
3. **Yacht management / Editorial**
   - Neptune: `imgi_17_synthesis.jpg`

### Fifty-Fifty Sections (2 blocos)
#### Bloco 1
1. **Charter a yacht** — `imgi_35_seanna.jpg` ou `imgi_36_seanna.jpg`
2. **Buy a yacht** — `imgi_3_alvia.jpg` ou `imgi_39_joy.jpg`

#### Bloco 2
1. **Sell a yacht** — `imgi_20_st-jean-st-barth.jpg` (Burgess usa Palm Beach, manteremos destaque)
2. **Build a yacht** — `imgi_5_synthesis.jpg` ou `imgi_53_synthesis.jpg`

### Highlight Panel (About us)
- Burgess: imagem de iate premium com overlay
- Neptune: `imgi_7_riva-corsaro.jpg` ou `imgi_30_riva-corsaro.jpg`

### Editorial Section
- Main: `imgi_61_monaco-yacht-show.jpg`
- Side cards: `imgi_6_joro.jpg`, `imgi_15_rox-star.jpg`, `imgi_21_monaco-show.jpg`, `imgi_23_va-bene.jpg`, `imgi_22_aziza.jpg`

---

## 3. Estrutura de Pastas Alvo

```
public/assets/images/
├── home/
│   ├── hero-poster.jpg
│   ├── charter-1.jpg
│   ├── charter-2.jpg
│   ├── buy-1.jpg
│   ├── dest-marina.jpg
│   ├── dest-marine-foundation.jpg
│   ├── dest-management.jpg
│   ├── fifty-charter.jpg
│   ├── fifty-buy.jpg
│   ├── fifty-sell.jpg
│   ├── fifty-build.jpg
│   └── highlight.jpg
├── editorial/
│   ├── main.jpg
│   ├── card-1.jpg
│   ├── card-2.jpg
│   └── card-3.jpg
├── brand/
│   └── ... (já existe)
└── burgess/
    └── ... (manter para páginas internas)
```

---

## 4. Ações

1. **Copiar** arquivos da pasta Downloads para a estrutura acima
2. **Renomear** seguindo padrão `categoria-nome.jpg`
3. **Atualizar** referências em `App.tsx` -> home
4. **Garantir** que todas as imagens usam `.media-fit` e tamanhos consistentes
5. **Build + commit**

---

## 5. Waitlist de dúvidas para o usuário

- Manter `hero-1080p.mp4` ou substituir por outro vídeo?
- A imagem `imgi_2_hero-3.jpg` deve ser usada como poster do vídeo?
- O conteúdo textual segue o mesmo do Burgess ou já temos versão adaptada?
