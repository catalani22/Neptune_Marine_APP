import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Search, ArrowRight, Shield, CreditCard } from 'lucide-react';
import { supabase } from './lib/supabase';

interface Yacht {
  id: string;
  title: string;
  slug: string;
  description: string;
  short_description: string;
  location: string;
  region: string;
  base_price: number;
  currency: string;
  type: string;
  source: string;
}

// ============= HEADER BURGESS STYLE =============
function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  
  return (
    <>
      <header className="s-head">
        <nav className="s-head-nav">
          <button 
            className="s-head-nav__link s-head-nav__link--i" 
            aria-label="Open main navigation"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="menu-i">
              <span className="menu-i__line"></span>
              <span className="menu-i__line"></span>
              <span className="menu-i__line"></span>
            </span>
          </button>
          <button 
            className="s-head-nav__link s-head-nav__link--i s-head__hd" 
            aria-label="Open the search panel"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Search size={20} />
          </button>

          <Link to="/charter" className="s-head-nav__link s-head__sd">Charter</Link>
          <Link to="/sale" className="s-head-nav__link s-head__sd">Buy</Link>
          <Link to="/sell" className="s-head-nav__link s-head__sd">Sell</Link>
          <Link to="/build" className="s-head-nav__link s-head__sd">Build</Link>
          <Link to="/manage" className="s-head-nav__link s-head__sd">Manage</Link>
        </nav>
        
        <Link to="/" className="s-head__logo" aria-label="Navigate to the home page">
          <svg width="164" height="27" viewBox="0 0 164 27" fill="currentColor">
            <text x="0" y="22" fontFamily="serif" fontSize="24" fontWeight="bold">NEPTUNE</text>
            <text x="95" y="22" fontFamily="serif" fontSize="24" fontWeight="bold" fill="#18c0d6">MARINE</text>
          </svg>
        </Link>
        
        <nav className="s-head-nav s-head-nav--right">
          <Link className="s-head-nav__link s-head-nav__link--i s-head__hd" to="/account">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </Link>
          <Link className="s-head-nav__link s-head-nav__link--i s-head__hd" to="/enquire">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </Link>
          <button className="s-head-nav__link s-head-nav__link--i s-head__sd" onClick={() => setSearchOpen(!searchOpen)}>
            <Search size={20} />
          </button>
          <Link to="/account" className="s-head-nav__link s-head__sd">My account</Link>
          <Link to="/enquire" className="s-head-nav__link s-head__sd">Contact Us</Link>
        </nav>
      </header>
      <div className="s-head__container"></div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'mobile-menu--open' : ''}`}>
        <Link to="/charter" className="mobile-menu__link" onClick={() => setMobileMenuOpen(false)}>Charter</Link>
        <Link to="/sale" className="mobile-menu__link" onClick={() => setMobileMenuOpen(false)}>Buy</Link>
        <Link to="/sell" className="mobile-menu__link" onClick={() => setMobileMenuOpen(false)}>Sell</Link>
        <Link to="/build" className="mobile-menu__link" onClick={() => setMobileMenuOpen(false)}>Build</Link>
        <Link to="/manage" className="mobile-menu__link" onClick={() => setMobileMenuOpen(false)}>Manage</Link>
        <Link to="/account" className="mobile-menu__link" onClick={() => setMobileMenuOpen(false)}>My account</Link>
        <Link to="/enquire" className="mobile-menu__link" onClick={() => setMobileMenuOpen(false)}>Contact Us</Link>
      </div>
    </>
  );
}

// ============= HERO BURGESS STYLE =============
function Hero() {
  const [isMuted, setIsMuted] = useState(true);
  
  return (
    <section className="h-bann theme-aqua">
      <video 
        playsInline 
        autoPlay 
        loop 
        muted={isMuted}
        controlsList="nodownload"
        className="media-fit h-bann__media"
        poster="/assets/images/samar-hero.jpg"
      >
        <source src="/assets/videos/hero-1080p.mp4" type="video/mp4" />
      </video>
      
      <div className="h-ban__grad"></div>
      
      <div className="h-bann__cont theme-border">
        <span></span>
        <div>
          <button 
            className="h-bann__mute"
            onClick={() => setIsMuted(!isMuted)}
            style={{ display: 'flex' }}
          >
            {isMuted ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <line x1="23" y1="9" x2="17" y2="15"></line>
                <line x1="17" y1="9" x2="23" y2="15"></line>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
            )}
          </button>
          
          <p className="h-bann__title">When it comes to luxury yachting, Neptune Marine is all you need to know</p>
          <div>
            <span className="h-bann__sub-title h-bann__sub-title--outline">Discover the</span>
            <span className="h-bann__sub-title theme-text">Difference</span>
          </div>
          
          {/* Crypto Badge */}
          <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <div className="crypto-badge-burgess">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
              Pay with Crypto
            </div>
            <div className="crypto-badge-burgess">
              <Shield size={16} />
              Secure Booking
            </div>
            <div className="crypto-badge-burgess">
              <CreditCard size={16} />
              10% Pre-reserve
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============= CONTENT PODS =============
function ContentPods() {
  const pods = [
    {
      image: '/assets/images/aquila-content.jpg',
      category: 'Yacht charters',
      title: 'Last-minute availability',
      link: '/charter',
      cta: 'Book now'
    },
    {
      image: '/assets/images/santosha-content.jpg',
      category: 'Unbeatable holidays',
      title: 'Yachts for charter',
      link: '/charter',
      cta: 'Find your favourite'
    },
    {
      image: '/assets/images/samar-hero.jpg',
      category: 'Buy a yacht',
      title: 'Yachts for sale',
      link: '/sale',
      cta: 'Yours to own',
      double: true
    }
  ];

  return (
    <div className="fls">
      {pods.map((pod, i) => (
        <div key={i} className={`fls__item ${pod.double ? 'fls__item--double' : ''}`}>
          <Link to={pod.link} className="content-pod">
            <img src={pod.image} alt={pod.title} className="media-fit content-pod__img" />
            <div className="content-pod__cont content-pod__cont--grad">
              <div className="content-pod__cont-inner">
                <div className="content-pod__info">
                  <span>{pod.category}</span>
                </div>
                <h2 className="content-pod__title">{pod.title}</h2>
                <span className="a-link">
                  <span className="a-link__text">{pod.cta}</span>
                  <ArrowRight className="a-link__icon" />
                </span>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

// ============= DESTINATIONS PODS =============
function DestinationPods() {
  const destinations = [
    {
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&rmode=crop&q=80',
      category: 'Destinations',
      title: 'Breathtaking Balearics',
      link: '/destinations/balearics',
      cta: 'Take me there'
    },
    {
      image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&h=400&rmode=crop&q=80',
      category: 'Sustainability',
      title: 'Marine Foundation in 2025',
      link: '/sustainability',
      cta: 'Read the report'
    },
    {
      image: 'https://images.unsplash.com/photo-1533558701576-90c0f39f6762?w=800&h=400&rmode=crop&q=80',
      category: 'Yacht management',
      title: 'Let us take care of everything',
      link: '/manage',
      cta: 'Maximum owner enjoyment',
      gradient: true,
      theme: 'theme-aqua'
    }
  ];

  return (
    <div className="fls">
      {destinations.map((dest, i) => (
        <div key={i} className={`fls__item ${i === 0 ? 'fls__item--double' : ''}`}>
          <Link to={dest.link} className={`content-pod ${dest.gradient ? `content-pod--grad ${dest.theme || ''}` : ''}`}>
            {!dest.gradient && <img src={dest.image} alt={dest.title} className="media-fit content-pod__img" />}
            <div className={`content-pod__cont ${!dest.gradient ? 'content-pod__cont--grad' : ''}`}>
              <div className="content-pod__cont-inner">
                <div className="content-pod__info">
                  <span>{dest.category}</span>
                </div>
                <h2 className="content-pod__title">{dest.title}</h2>
                <span className="a-link">
                  <span className="a-link__text">{dest.cta}</span>
                  <ArrowRight className="a-link__icon" />
                </span>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

// ============= HTML AREA SECTION =============
function HtmlArea() {
  return (
    <div className="html-area">
      <div className="html-area__subtitle">BOLD. BRAVE. BRIGHT. BRILLIANT. BETTER.</div>
      <h2 className="html-area__title">Discover the difference</h2>
      <div className="html-area__standfirst">
        <p style={{ textAlign: 'center' }}>As a Neptune Marine client, you always come first, whether that's charter, sale and purchase, build, refit or any aspect of yacht ownership. That's the Neptune Marine difference.</p>
      </div>
    </div>
  );
}

// ============= FIFTY FIFTY SECTIONS =============
function FiftyFifty() {
  return (
    <div className="fifty-fifty fifty-fifty--margins">
      <div className="hwcc">
        <img 
          src="https://images.unsplash.com/photo-1609825488888-3a766db05542?w=800&h=1200&rmode=crop&q=80" 
          alt="Charter"
          className="media-fit hwcc__img"
        />
        <div className="hwcc__main">
          <h2 className="hwcc__title">charter a yacht</h2>
          <p className="und-title und-title--center und-title--inherit hwcc__subtitle">Your great escape. Tailored by Neptune Marine.</p>
          <p className="hwcc__summary">Cruise in inimitable style and experience real freedom. The adventure of a lifetime awaits aboard the world's greatest superyachts, all curated by your own professional broker.</p>
          <Link to="/charter" className="btn btn--primary btn--white">Charter a yacht</Link>
        </div>
      </div>
      
      <div className="hwcc">
        <img 
          src="https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&h=1200&rmode=crop&q=80" 
          alt="Buy"
          className="media-fit hwcc__img"
        />
        <div className="hwcc__main">
          <h2 className="hwcc__title">BUY A Yacht</h2>
          <p className="und-title und-title--center und-title--inherit hwcc__subtitle">Your life. Spent wisely.</p>
          <p className="hwcc__summary">From the global fleet of mega yachts offered for sale, we hand-pick the best opportunities and share our expert knowledge, so that you can make the best decisions.</p>
          <Link to="/sale" className="btn btn--primary btn--white">Yachts for sale</Link>
        </div>
      </div>
    </div>
  );
}

// ============= HIGHLIGHT PANEL =============
function HighlightPanel() {
  return (
    <div className="hl-panel theme-orange">
      <picture className="hl-panel__img">
        <img 
          src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1600&h=900&rmode=crop&q=60" 
          alt=""
        />
      </picture>
      <div className="hl-panel__contents">
        <h2 className="hl-panel__title">About us</h2>
        <p className="hl-panel__mt">Your wish. Our world.</p>
        <p>Our reputation is your recommendation. Since 1975 all our knowledge has been distilled into one goal, making sure you enjoy the best yachting experience. If it involves yachts, we've got you covered.</p>
        <Link to="/about" className="btn btn--solid-grad hl-panel__btn">About us</Link>
      </div>
      <div className="hl-panel__border theme-border"></div>
    </div>
  );
}

// ============= SECOND FIFTY FIFTY =============
function SecondFiftyFifty() {
  return (
    <div className="fifty-fifty fifty-fifty--margins fifty-fifty--mb-0">
      <div className="hwcc hwcc--gradient theme-purple-yellow">
        <div className="hwcc__main">
          <h2 className="hwcc__title">sell a yacht</h2>
          <p className="und-title und-title--center und-title--inherit hwcc__subtitle">Your perfect buyer. Our exclusive audience.</p>
          <p className="hwcc__summary">Our directly employed brokers share market-leading intelligence and powerful client database insights with our experienced global team to ensure the best outcome for you.</p>
          <Link to="/sell" className="btn btn--primary btn--white btn--white-grad">Sell a yacht</Link>
        </div>
      </div>
      
      <div className="hwcc">
        <img 
          src="https://images.unsplash.com/photo-1533558701576-90c0f39f6762?w=800&h=1200&rmode=crop&q=80" 
          alt="Build"
          className="media-fit hwcc__img"
        />
        <div className="hwcc__main">
          <h2 className="hwcc__title">BUILD A Yacht</h2>
          <p className="und-title und-title--center und-title--inherit hwcc__subtitle">Your vision. Our expertise.</p>
          <p className="hwcc__summary">From concept to launch, our new build team will guide you through every step of the construction process, ensuring your dream yacht becomes a reality.</p>
          <Link to="/build" className="btn btn--primary btn--white">Start building</Link>
        </div>
      </div>
    </div>
  );
}

// ============= FOOTER BURGESS STYLE =============
function Footer() {
  return (
    <footer className="s-foot">
      <div className="s-foot__grid">
        <div>
          <h3 className="s-foot__title">Charter</h3>
          <ul className="s-foot__links">
            <li><Link to="/charter">Yachts for Charter</Link></li>
            <li><Link to="/charter/destinations">Destinations</Link></li>
            <li><Link to="/charter/new-to-charter">New to Charter</Link></li>
            <li><Link to="/charter/special-offers">Special Offers</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="s-foot__title">Buy</h3>
          <ul className="s-foot__links">
            <li><Link to="/sale">Yachts for Sale</Link></li>
            <li><Link to="/sale/new-builds">New Builds</Link></li>
            <li><Link to="/sale/projects">Projects</Link></li>
            <li><Link to="/sale/buying-guide">Buying Guide</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="s-foot__title">Sell</h3>
          <ul className="s-foot__links">
            <li><Link to="/sell">Sell Your Yacht</Link></li>
            <li><Link to="/sell/valuation">Valuation</Link></li>
            <li><Link to="/sell/marketing">Marketing</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="s-foot__title">Contact</h3>
          <ul className="s-foot__links">
            <li><a href="tel:+442076964500">+44 20 7696 4500</a></li>
            <li><a href="mailto:info@neptunemarine.com">info@neptunemarine.com</a></li>
            <li><Link to="/enquire">Enquire Now</Link></li>
            <li><Link to="/offices">Our Offices</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="s-foot__bottom">
        <p>© 2025 Neptune Marine. All rights reserved. | <Link to="/privacy">Privacy Policy</Link> | <Link to="/terms">Terms of Use</Link></p>
      </div>
    </footer>
  );
}

// ============= CHARTER PAGE =============
function CharterPage() {
  const [filter, setFilter] = useState('all');
  const [yachts, setYachts] = useState<Yacht[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchYachts() {
      const { data, error } = await supabase
        .from('vessels')
        .select('id, title, slug, description, short_description, location, region, base_price, currency, type, source')
        .eq('type', 'FULL_CHARTER')
        .order('base_price', { ascending: true })
        .limit(50);
      
      if (!error && data) {
        setYachts(data);
      }
      setLoading(false);
    }
    fetchYachts();
  }, []);
  
  const filters = [
    { id: 'all', label: 'All' },
    { id: 'motor', label: 'Motor' },
    { id: 'sailing', label: 'Sailing' },
    { id: 'available', label: 'Available Now' },
    { id: 'below-50m', label: 'Below 50m' },
    { id: 'above-50m', label: 'Above 50m' }
  ];
  
  const yachtImages: Record<string, string> = {
    'AQUILA': 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=80',
    'OCTOPUS': 'https://images.unsplash.com/photo-1609825488888-3a766db05542?w=800&q=80',
    'MALTESE FALCON': 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80',
    'SEA EAGLE': 'https://images.unsplash.com/photo-1533558701576-90c0f39f6762?w=800&q=80',
    'RENAISSANCE': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    'WHISPER': 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=80',
    'GIGIA': 'https://images.unsplash.com/photo-1609825488888-3a766db05542?w=800&q=80',
    'SOPHIA': 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80',
    'O PTASIA': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    'OCEAN NOVA': 'https://images.unsplash.com/photo-1533558701576-90c0f39f6762?w=800&q=80',
    'BARBARA': 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=80',
    'ECLIPSE': 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80',
  };
  
  return (
    <div>
      <div className="page-header theme-aqua">
        <h1 className="page-header__title">Yachts for Charter</h1>
        <p className="page-header__subtitle">Cruise in style aboard the world's most extraordinary superyachts</p>
      </div>
      
      <div className="filters">
        <div className="filters__inner">
          {filters.map(f => (
            <button 
              key={f.id}
              className={`filter-btn-burgess ${filter === f.id ? 'filter-btn-burgess--active' : ''}`}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="yacht-grid">
        {loading ? (
          <p style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px' }}>Loading yachts...</p>
        ) : yachts.length === 0 ? (
          <p style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px' }}>No yachts found</p>
        ) : (
          yachts.map(yacht => (
            <Link key={yacht.id} to={`/yacht/${yacht.slug}`} className="yacht-card-burgess">
              <img 
                src={yachtImages[yacht.title] || 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=80'} 
                alt={yacht.title}
                className="yacht-card-burgess__img"
              />
              <div className="yacht-card-burgess__content">
                <p className="yacht-card-burgess__type">{yacht.source}</p>
                <h3 className="yacht-card-burgess__name">{yacht.title}</h3>
                <p className="yacht-card-burgess__specs">{yacht.short_description || yacht.description?.substring(0, 80)}</p>
                <p className="yacht-card-burgess__location">{yacht.location} • {yacht.region}</p>
                <div className="yacht-card-burgess__price">
                  {yacht.type === 'SALE' ? 'Price on request' : `€${yacht.base_price?.toLocaleString()}/week`}
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

// ============= SALE PAGE =============
function SalePage() {
  const [yachts, setYachts] = useState<Yacht[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchYachts() {
      const { data, error } = await supabase
        .from('vessels')
        .select('id, title, slug, description, short_description, location, region, base_price, currency, type, source')
        .eq('type', 'SALE')
        .order('base_price', { ascending: false })
        .limit(50);
      
      if (!error && data) {
        setYachts(data);
      }
      setLoading(false);
    }
    fetchYachts();
  }, []);
  
  const yachtImages: Record<string, string> = {
    'ECLIPSE': 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80',
    'AQUILA': 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=80',
    'OCTOPUS': 'https://images.unsplash.com/photo-1609825488888-3a766db05542?w=800&q=80',
  };
  
  return (
    <div>
      <div className="page-header theme-purple">
        <h1 className="page-header__title">Yachts for Sale</h1>
        <p className="page-header__subtitle">Discover the finest superyachts available on the global market</p>
      </div>
      
      <div className="filters">
        <div className="filters__inner">
          <button className="filter-btn-burgess filter-btn-burgess--active">All</button>
          <button className="filter-btn-burgess">Motor</button>
          <button className="filter-btn-burgess">Sailing</button>
          <button className="filter-btn-burgess">New Builds</button>
        </div>
      </div>
      
      <div className="yacht-grid">
        {loading ? (
          <p style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px' }}>Loading yachts...</p>
        ) : yachts.length === 0 ? (
          <p style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px' }}>No yachts for sale currently</p>
        ) : (
          yachts.map(yacht => (
            <Link key={yacht.id} to={`/yacht/${yacht.slug}`} className="yacht-card-burgess">
              <img 
                src={yachtImages[yacht.title] || 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=80'} 
                alt={yacht.title}
                className="yacht-card-burgess__img"
              />
              <div className="yacht-card-burgess__content">
                <p className="yacht-card-burgess__type">{yacht.source}</p>
                <h3 className="yacht-card-burgess__name">{yacht.title}</h3>
                <p className="yacht-card-burgess__specs">{yacht.short_description || yacht.description?.substring(0, 80)}</p>
                <p className="yacht-card-burgess__location">{yacht.location} • {yacht.region}</p>
                <div className="yacht-card-burgess__price">
                  €{yacht.base_price?.toLocaleString()}
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

// ============= ENQUIRE PAGE =============
function EnquirePage() {
  return (
    <div>
      <div className="page-header theme-aqua">
        <h1 className="page-header__title">Contact Us</h1>
        <p className="page-header__subtitle">Tell us about your dream yachting experience</p>
      </div>
      
      <div style={{ padding: '60px 20px', maxWidth: '800px', margin: '0 auto' }}>
        <form style={{ display: 'grid', gap: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '700', fontSize: '0.875rem', textTransform: 'uppercase' }}>First Name *</label>
              <input type="text" required style={{ width: '100%', padding: '16px', border: '1px solid #ccc', fontSize: '1rem' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '700', fontSize: '0.875rem', textTransform: 'uppercase' }}>Last Name *</label>
              <input type="text" required style={{ width: '100%', padding: '16px', border: '1px solid #ccc', fontSize: '1rem' }} />
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '700', fontSize: '0.875rem', textTransform: 'uppercase' }}>Email *</label>
              <input type="email" required style={{ width: '100%', padding: '16px', border: '1px solid #ccc', fontSize: '1rem' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '700', fontSize: '0.875rem', textTransform: 'uppercase' }}>Phone</label>
              <input type="tel" style={{ width: '100%', padding: '16px', border: '1px solid #ccc', fontSize: '1rem' }} />
            </div>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '700', fontSize: '0.875rem', textTransform: 'uppercase' }}>Interest *</label>
            <select style={{ width: '100%', padding: '16px', border: '1px solid #ccc', fontSize: '1rem' }}>
              <option>Charter</option>
              <option>Cabin Cruise</option>
              <option>Buy</option>
              <option>Sell</option>
              <option>Build</option>
              <option>Management</option>
            </select>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '700', fontSize: '0.875rem', textTransform: 'uppercase' }}>Message</label>
            <textarea rows={6} style={{ width: '100%', padding: '16px', border: '1px solid #ccc', fontSize: '1rem' }}></textarea>
          </div>
          
          <button type="submit" className="btn btn--primary" style={{ justifySelf: 'start' }}>Send Enquiry</button>
        </form>
      </div>
    </div>
  );
}

// ============= DESTINATIONS PAGE =============
function DestinationsPage() {
  const destinations = [
    { name: 'The Balearics', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&rmode=crop&q=80', count: 85 },
    { name: 'The Caribbean', image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&h=600&rmode=crop&q=80', count: 120 },
    { name: 'The Mediterranean', image: 'https://images.unsplash.com/photo-1533558701576-90c0f39f6762?w=800&h=600&rmode=crop&q=80', count: 200 },
    { name: 'The Maldives', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&h=600&rmode=crop&q=80', count: 45 },
    { name: 'South East Asia', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&rmode=crop&q=80', count: 60 },
    { name: 'Indian Ocean', image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&h=600&rmode=crop&q=80', count: 35 }
  ];
  
  return (
    <div>
      <div className="page-header theme-blue">
        <h1 className="page-header__title">Destinations</h1>
        <p className="page-header__subtitle">Explore the world's most beautiful cruising grounds</p>
      </div>
      
      <div className="fifty-fifty">
        {destinations.map((dest, i) => (
          <div key={i} className="hwcc">
            <img src={dest.image} alt={dest.name} className="media-fit hwcc__img" />
            <Link to={`/charter/destinations/${dest.name.toLowerCase().replace(/ /g, '-')}`} className="hwcc__main">
              <h2 className="hwcc__title" style={{ color: '#fff' }}>{dest.name}</h2>
              <p style={{ color: '#fff', fontSize: '1.25rem', fontWeight: '700' }}>{dest.count} yachts available</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============= SEARCH PAGE =============
function SearchPage() {
  return (
    <div>
      <div className="page-header theme-aqua">
        <h1 className="page-header__title">Search Yachts</h1>
        <p className="page-header__subtitle">Find your perfect yacht from our global fleet</p>
      </div>
      
      <div className="search-section">
        <form className="search-form">
          <select className="search-input">
            <option value="">Destination</option>
            <option>Mediterranean</option>
            <option>Caribbean</option>
            <option>Maldives</option>
            <option>South East Asia</option>
          </select>
          
          <select className="search-input">
            <option value="">Yacht Type</option>
            <option>Motor</option>
            <option>Sailing</option>
            <option>Catamaran</option>
            <option>Gulet</option>
          </select>
          
          <select className="search-input">
            <option value="">Length</option>
            <option>0-30m</option>
            <option>30-50m</option>
            <option>50-80m</option>
            <option>80m+</option>
          </select>
          
          <button type="submit" className="search-btn">Search</button>
        </form>
      </div>
      
      <div className="yacht-grid">
        {/* Results from database */}
      </div>
    </div>
  );
}

// ============= HOME PAGE =============
function Home() {
  return (
    <>
      <Hero />
      <ContentPods />
      <DestinationPods />
      <HtmlArea />
      <FiftyFifty />
      <HighlightPanel />
      <SecondFiftyFifty />
    </>
  );
}

// ============= MAIN APP =============
function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/charter" element={<CharterPage />} />
            <Route path="/charter/*" element={<CharterPage />} />
            <Route path="/sale" element={<SalePage />} />
            <Route path="/buy" element={<SalePage />} />
            <Route path="/sell" element={<SalePage />} />
            <Route path="/build" element={<SalePage />} />
            <Route path="/manage" element={<SalePage />} />
            <Route path="/destinations" element={<DestinationsPage />} />
            <Route path="/enquire" element={<EnquirePage />} />
            <Route path="/contact" element={<EnquirePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/account" element={<EnquirePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;