import { useState, useCallback, useContext, createContext, type ReactNode } from 'react';

export type Language = 'en' | 'es' | 'pt' | 'fr' | 'de' | 'it' | 'zh';

interface LanguageOption {
  code: Language;
  name: string;
  flag: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
];

interface Translations {
  [key: string]: {
    [lang: string]: string;
  };
}

const translations: Translations = {
  // Navigation
  'nav.home': { en: 'Home', es: 'Inicio', pt: 'Início', fr: 'Accueil', de: 'Startseite', it: 'Home', zh: '首页' },
  'nav.charter': { en: 'Charter', es: 'Alquiler', pt: 'Aluguer', fr: 'Location', de: 'Chartern', it: 'Noleggio', zh: '租赁' },
  'nav.buy': { en: 'Buy', es: 'Comprar', pt: 'Comprar', fr: 'Acheter', de: 'Kaufen', it: 'Acquista', zh: '购买' },
  'nav.sell': { en: 'Sell', es: 'Vender', pt: 'Vender', fr: 'Vendre', de: 'Verkaufen', it: 'Vendi', zh: '出售' },
  'nav.destinations': { en: 'Destinations', es: 'Destinos', pt: 'Destinos', fr: 'Destinations', de: 'Reiseziele', it: 'Destinazioni', zh: '目的地' },
  'nav.contact': { en: 'Contact', es: 'Contacto', pt: 'Contacto', fr: 'Contact', de: 'Kontakt', it: 'Contatti', zh: '联系' },
  'nav.search': { en: 'Search', es: 'Buscar', pt: 'Pesquisar', fr: 'Rechercher', de: 'Suchen', it: 'Cerca', zh: '搜索' },
  
  // Home
  'home.hero.title': { en: 'Experience the Extraordinary', es: 'Vive lo Extraordinario', pt: 'Experimente o Extraordinário', fr: 'Vivez l\'Extraordinaire', it: 'Vivere l\'Straordinario', zh: '体验非凡' },
  'home.hero.subtitle': { en: 'Luxury yacht charters worldwide', es: 'Alquiler de yates de lujo mundial', pt: 'Aluguer de iates de luxo mundial', fr: 'Location de yachts de luxe mondiale', it: 'Noleggio yacht di lusso mondiale', zh: '全球豪华游艇租赁' },
  'home.cta.explore': { en: 'Explore Yachts', es: 'Explorar Yates', pt: 'Explorar Iates', fr: 'Explorer les Yachts', it: 'Esplora Yacht', zh: '探索游艇' },
  'home.cta.cabin': { en: 'Cabin Cruises', es: 'Cruceros de Cabina', pt: 'Cruzeiros de Cabina', fr: 'Croisières Cabine', it: 'Crociere Cabina', zh: '舱室巡游' },
  
  // Search
  'search.title': { en: 'Find Your Perfect Yacht', es: 'Encuentra tu Yacht Perfecto', pt: 'Encontre o Seu Iate Perfeito', fr: 'Trouvez Votre Yacht Parfait', it: 'Trova il Tuo Yacht Perfetto', zh: '找到完美的游艇' },
  'search.filters': { en: 'Filters', es: 'Filtros', pt: 'Filtros', fr: 'Filtres', it: 'Filtri', zh: '筛选' },
  'search.results': { en: 'yachts found', es: 'yates encontrados', pt: 'iates encontrados', fr: 'yachts trouvés', it: 'yacht trovati', zh: '艘游艇' },
  'search.noResults': { en: 'No yachts found', es: 'No se encontraron yates', pt: 'Nenhum iate encontrado', fr: 'Aucun yacht trouvé', it: 'Ness yacht trovato', zh: '未找到游艇' },
  
  // Yacht Detail
  'yacht.overview': { en: 'Overview', es: 'Resumen', pt: 'Visão Geral', fr: 'Aperçu', it: 'Panoramica', zh: '概览' },
  'yacht.specs': { en: 'Specifications', es: 'Especificaciones', pt: 'Especificações', fr: 'Spécifications', it: 'Specifiche', zh: '规格' },
  'yacht.features': { en: 'Features', es: 'Características', pt: 'Características', fr: 'Équipements', it: 'Caratteristiche', zh: '特色' },
  'yacht.itinerary': { en: 'Itinerary', es: 'Itinerario', pt: 'Itinerário', fr: 'Itinéraire', it: 'Itinerario', zh: '行程' },
  'yacht.reserve': { en: 'Reserve Now', es: 'Reservar Ahora', pt: 'Reservar Agora', fr: 'Réserver Maintenant', it: 'Prenota Ora', zh: '立即预订' },
  'yacht.from': { en: 'From', es: 'Desde', pt: 'A partir de', fr: 'À partir de', it: 'Da', zh: '起价' },
  'yacht.perWeek': { en: 'per week', es: 'por semana', pt: 'por semana', fr: 'par semaine', it: 'a settimana', zh: '每周' },
  
  // Checkout
  'checkout.title': { en: 'Reserve Your Yacht', es: 'Reserva tu Yacht', pt: 'Reserve o Seu Iate', fr: 'Réservez Votre Yacht', it: 'Prenota il Tuo Yacht', zh: '预订您的游艇' },
  'checkout.details': { en: 'Your Details', es: 'Tus Datos', pt: 'Os Seus Dados', fr: 'Vos Coordonnées', it: 'I Tuoi Dati', zh: '您的详细信息' },
  'checkout.name': { en: 'Full Name', es: 'Nombre Completo', pt: 'Nome Completo', fr: 'Nom Complet', it: 'Nome Completo', zh: '全名' },
  'checkout.email': { en: 'Email Address', es: 'Correo Electrónico', pt: 'Endereço de Email', fr: 'Adresse Email', it: 'Email', zh: '邮箱地址' },
  'checkout.phone': { en: 'Phone', es: 'Teléfono', pt: 'Telefone', fr: 'Téléphone', it: 'Telefono', zh: '电话' },
  'checkout.crypto': { en: 'Pay with Crypto', es: 'Pagar con Cripto', pt: 'Pagar com Cripto', fr: 'Payer en Crypto', it: 'Paga con Cripto', zh: '使用加密货币支付' },
  'checkout.card': { en: 'Pay with Card', es: 'Pagar con Tarjeta', pt: 'Pagar com Cartão', fr: 'Payer par Carte', it: 'Paga con Carta', zh: '使用银行卡支付' },
  'checkout.deposit': { en: 'Deposit (10%)', es: 'Depósito (10%)', pt: 'Depósito (10%)', fr: 'Acompte (10%)', it: 'Caparra (10%)', zh: '定金 (10%)' },
  'checkout.continue': { en: 'Continue to Payment', es: 'Continuar al Pago', pt: 'Continuar para Pagamento', fr: 'Continuer vers le Paiement', it: 'Continua al Pagamento', zh: '继续支付' },
  'checkout.confirmed': { en: 'Booking Confirmed!', es: '¡Reserva Confirmada!', pt: 'Reserva Confirmada!', fr: 'Réservation Confirmée!', it: 'Prenotazione Confermata!', zh: '预订已确认！' },
  
  // Accessibility
  'a11y.fontSize': { en: 'Font Size', es: 'Tamaño de Fuente', pt: 'Tamanho da Fonte', fr: 'Taille de Police', it: 'Dimensione Font', zh: '字体大小' },
  'a11y.highContrast': { en: 'High Contrast', es: 'Alto Contraste', pt: 'Alto Contraste', fr: 'Haut Contraste', it: 'Alto Contrasto', zh: '高对比度' },
  'a11y.reduceMotion': { en: 'Reduce Motion', es: 'Reducir Movimiento', pt: 'Reduzir Movimento', fr: 'Réduire le Mouvement', it: 'Riduci Movimento', zh: '减少动画' },
  
  // Common
  'common.loading': { en: 'Loading...', es: 'Cargando...', pt: 'A Carregar...', fr: 'Chargement...', it: 'Caricamento...', zh: '加载中...' },
  'common.error': { en: 'Error', es: 'Error', pt: 'Erro', fr: 'Erreur', it: 'Errore', zh: '错误' },
  'common.cancel': { en: 'Cancel', es: 'Cancelar', pt: 'Cancelar', fr: 'Annuler', it: 'Annulla', zh: '取消' },
  'common.back': { en: 'Back', es: 'Atrás', pt: 'Voltar', fr: 'Retour', it: 'Indietro', zh: '返回' },
  'common.view': { en: 'View', es: 'Ver', pt: 'Ver', fr: 'Voir', it: 'Vedi', zh: '查看' },
};

const LanguageContext = createContext<{
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
} | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language');
      if (saved && LANGUAGES.find(l => l.code === saved)) {
        return saved as Language;
      }
    }
    return 'en';
  });

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', newLang);
    }
  }, []);

  const t = useCallback((key: string): string => {
    return translations[key]?.[lang] || translations[key]?.['en'] || key;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    return { lang: 'en' as Language, setLang: () => {}, t: (key: string) => key };
  }
  return context;
}

export function LanguageSelector() {
  const { lang, setLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  
  const currentLang = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-white"
        aria-label={`Select language, current: ${currentLang.name}`}
      >
        <span className="text-lg">{currentLang.flag}</span>
        <span className="text-sm hidden sm:inline">{currentLang.code.toUpperCase()}</span>
      </button>
      
      {isOpen && (
        <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg border py-2 z-50 min-w-40">
          {LANGUAGES.map(l => (
            <button
              key={l.code}
              onClick={() => {
                setLang(l.code);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 ${
                lang === l.code ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
              }`}
            >
              <span>{l.flag}</span>
              <span>{l.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}