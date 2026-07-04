# Neptune Marine — Alinhamento Visual Burgess + Rotas Faltantes

> Objetivo: similaridade total com Burgess, preservando identidade Neptune Marine.
> Status: Em execução.

---

## 1. Diagnóstico de Similaridade

### Estrutura Burgess observada
- **Header fixo**: logo central + nav esquerda (Charter, Buy, Sell, Build, Manage) + direita (Account, Contact, Search)
- **Hero**: vídeo background + overlay gradiente + moldura borda gradient
- **Content Pods**: grid 1→2→4 colunas, imagem full-bleed + overlay gradient + texto inferior
- **Fifty-Fifty**: 2 colunas, imagem fundo + texto centralizado + botão
- **Highlight Panel**: imagem fundo + texto + botão gradient + borda theme
- **HTML Area**: texto centralizado, título grande, subtítulo, texto corrido
- **Editorial**: grid 2fr/1fr desktop, cards com imagem + título + link
- **Footer accordion**: menus expansíveis + newsletter + social + offices

### O que já temos ✅
- Header Burgess-style com `.s-head`
- Hero com vídeo e overlay
- Content pods com `.fls`
- Fifty-fifty com `.hwcc`
- Highlight panel com `.hl-panel`
- HTML area com `.html-area`
- Editorial grid com `.u-ed`
- Footer básico

### O que precisa ajustar 🔧
1. **Header**: centralização do logo, espaçamento dos nav items, ícones corretos
2. **Hero**: moldura/inset alinhado, tipografia maior, badges posicionados
3. **Content Pods**: grid 4 colunas desktop, aspect ratio consistentes
4. **Fifty-Fifty**: min-height consistente, padding desktop maior
5. **Highlight Panel**: centralização do texto, botão alinhado
6. **Editorial**: grid exato 2fr/1fr, cards com hover states
7. **Footer**: transformar em accordion mobile, adicionar newsletter
8. **Tipografia**: títulos maiores, weights consistentes
9. **Cores**: garantir gradientes idênticos Burgess
10. **Spacing**: padding/margin consistentes entre seções

---

## 2. Rotas Faltantes (Burgess → Neptune)

### Diretas
- `/about` — About us
- `/team` — Meet the team
- `/meet-the-team/brokerage` — Brokerage team
- `/meet-the-team/technical-services` — Technical team
- `/meet-the-team/yacht-management` — Management team
- `/new-to-charter` — New to charter
- `/charter/special-offers` — Special offers
- `/charter/yacht-types/motor` — Motor yachts
- `/charter/yacht-types/sailing` — Sailing yachts
- `/sale/new-builds` — New builds for sale
- `/sale/projects` — Projects
- `/sale/buying-guide` — Buying guide
- `/sell/valuation` — Valuation
- `/sell/marketing` — Marketing
- `/virtual-tours` — Virtual tours
- `/videos` — Superyacht videos
- `/editorial` — Editorial hub
- `/editorial/news/:slug` — Individual articles
- `/yacht-owner-services/yacht-marketing` — Yacht marketing
- `/offices` — Our offices
- `/cabin-cruise` — Cabin cruises

### Dinâmicas
- `/charter/destinations/:region/:destination` — Destino individual
- `/sell-a-yacht/sold-yachts/:slug` — Yacht vendido individual
- `/build-a-yacht/shipyards/:shipyard` — Shipyard individual

---

## 3. Plano de Ação Visual

### Fase 1 — Ajustes CSS finos (index.css)
- [ ] Refinar `.s-head` grid e alinhamento
- [ ] Ajustar `.h-bann__cont` inset e tipografia
- [ ] Corrigir `.fls` gap e backgrounds
- [ ] Ajustar `.hwcc__main` padding desktop
- [ ] Refinar `.hl-panel` centralização
- [ ] Ajustar `.u-ed__grid` para exato 2fr/1fr
- [ ] Adicionar `.accordion` styles para footer
- [ ] Adicionar `.newsletter-signup` styles
- [ ] Refinar `.yacht-card-burgess` hover states

### Fase 2 — Ajustes JSX (App.tsx)
- [ ] Revisar todas as seções da Home
- [ ] Aplicar classes CSS ao invés de inline styles restantes
- [ ] Garantir que todas as imagens usam `.media-fit`
- [ ] Verificar alt tags e acessibilidade

### Fase 3 — Novas Páginas
- [ ] Criar página About
- [ ] Criar página Team
- [ ] Criar página Cabin Cruise
- [ ] Criar página Virtual Tours
- [ ] Criar página Videos
- [ ] Criar página Editorial hub
- [ ] Criar páginas de destinos individuais
- [ ] Expandir footer com accordion

### Fase 4 — Assets
- [ ] Mapear todas as imagens Burgess disponíveis
- [ ] Copiar para estrutura de pastas correta
- [ ] Atualizar todas as referências

---

## 4. Prioridade

1. **Alta**: Ajustes Home (header, hero, content pods, fifty-fifty)
2. **Alta**: Rotas principais faltantes (/about, /team, /cabin-cruise)
3. **Média**: Editorial e páginas de conteúdo
4. **Baixa**: Páginas secundárias (offices, buying guide, etc.)

