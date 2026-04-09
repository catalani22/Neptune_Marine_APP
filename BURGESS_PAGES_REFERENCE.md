# Burgess Yachts - Source Pages Reference

Este arquivo contém os links para os códigos fontes de todas as páginas do site Burgess.
Usar como referência para replicar o design e estrutura no projeto Neptune Marine.

## Páginas Principais

### Home
- view-source:https://www.burgessyachts.com/en

### Charter
- view-source:https://www.burgessyachts.com/en/charter-a-yacht
- view-source:https://www.burgessyachts.com/en/charter-a-yacht/yachts-for-charter
- view-source:https://www.burgessyachts.com/en/charter-a-yacht/inspiration
- view-source:https://www.burgessyachts.com/en/charter-a-yacht/destinations
- https://www.burgessyachts.com/en/charter-a-yacht/destinations

### Buy (Venda)
- view-source:https://www.burgessyachts.com/en/buy-a-yacht

### Sell (Vender)
- view-source:https://www.burgessyachts.com/en/sell-a-yacht

### Build (Construir)
- view-source:https://www.burgessyachts.com/en/build-a-yacht

### Yacht Owner Services
- view-source:https://www.burgessyachts.com/en/yacht-owner-services
- view-source:https://www.burgessyachts.com/en/yacht-owner-services/yacht-management
- view-source:https://www.burgessyachts.com/en/yacht-owner-services/charter-management

### Legal & Info
- view-source:https://www.burgessyachts.com/en/terms-of-use
- view-source:https://www.burgessyachts.com/en/sitemap
- view-source:https://www.burgessyachts.com/en/privacy-policy

## Estrutura de Componentes Identificados

### Header (s-head)
- Logo SVG (use href="#svg-logo")
- Navigation: Charter, Buy, Sell, Build, Manage
- Right nav: Account, Contact Us, Search

### Hero Banner (h-bann)
- Vídeo background com múltiplas resoluções
- Gradiente overlay (h-ban__grad)
- Conteúdo com theme-border
- Título e subtítulo com theme-text gradient

### Content Pods (fls)
- Grid system: 1fr -> 1fr 1fr -> repeat(4, 1fr)
- Categories: Yacht charters, Buy a yacht, Destinations, etc.
- Images com srcset para responsive

### Fifty-Fifty Sections (fifty-fifty)
- Two column grid
- hwcc component com imagem de fundo
- Button styling: btn--primary, btn--white

### Highlight Panels (hl-panel)
- Background com imagem
- Theme colors: orange, green-yellow, blue
- Border styling com theme-border

### Footer
- Accordion menus
- Newsletter signup (n-letter)
- Social links
- Language selector
- Office locations

## Cores e Variáveis CSS

```css
--theme-grad-start: #4a6fa5
--theme-grad-end: #33aabe
--theme-color: #4a71a6
--btnColor: #18c0d6
--btnHover: #15a9bd

/* Theme variations */
.theme-aqua
.theme-blue
.theme-orange
.theme-purple
.theme-green
.theme-green-yellow
```

## Fontes
- FF Mark (custom font)
- Fallback: Arial, Helvetica

## Progresso de Implementação

- [x] Header básico
- [x] Hero Banner com vídeo
- [x] Content Pods (fls)
- [x] Fifty-Fifty sections
- [ ] Complete Footer
- [ ] Menu Mobile
- [ ] Newsletter
- [ ] All Pages Charter

## Próximas Pages a construir
1. Charter Page
2. Yachts for Charter Listing
3. Destinations Page
4. Buy Page
5. Sell Page
6. Build Page
7. Yacht Management Page