import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Search, ArrowRight, Shield, CreditCard } from 'lucide-react';
import { supabase } from './lib/supabase';
import { YachtDetailPage } from './pages/YachtDetailPage';

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
        
        <Link to="/" className="s-head__logo" aria-label="Navigate to the home page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <img 
            src="/assets/images/brand/neptunebw.png" 
            alt="Neptune Marine" 
            style={{ height: '40px', width: 'auto', maxWidth: '164px' }}
          />
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
      <div className="s-head__container" style={{ height: '70px' }}></div>

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
    <div className="fls fls--home">
      {pods.map((pod, i) => (
        <div key={i} className={`fls__item ${pod.double ? 'fls__item--double' : ''}`}>
          <Link to={pod.link} className="content-pod">
            <img src={pod.image} alt={pod.title} className="media-fit content-pod__img" />
            <div className="content-pod__cont content-pod__cont--grad content-pod__cont--bottom">
              <div className="content-pod__cont-inner">
                <div className="content-pod__info">
                  <span>{pod.category}</span>
                </div>
                <h2 className="content-pod__title">{pod.title}</h2>
                <span className="a-link a-link--white">
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
      image: '/assets/images/aquila-content.jpg',
      category: 'Destinations',
      title: 'Breathtaking Balearics',
      link: '/destinations/balearics',
      cta: 'Take me there'
    },
    {
      image: '/assets/images/santosha-content.jpg',
      category: 'Sustainability',
      title: 'Marine Foundation in 2025',
      link: '/sustainability',
      cta: 'Read the report'
    },
    {
      image: '/assets/images/balearics-dest.jpg',
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
    <div className="html-area html-area--center">
      <div className="html-area__subtitle">BOLD. BRAVE. BRIGHT. BRILLIANT. BETTER.</div>
      <h2 className="html-area__title">Discover the difference</h2>
      <div className="html-area__standfirst html-area__standfirst--center">
        <p>As a Neptune Marine client, you always come first, whether that's charter, sale and purchase, build, refit or any aspect of yacht ownership. That's the Neptune Marine difference.</p>
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
          src="/assets/images/burgess/charter/excellence.jpg" 
          alt="Charter"
          className="media-fit hwcc__img"
        />
        <div className="hwcc__main hwcc__center">
          <h2 className="hwcc__title">charter a yacht</h2>
          <p className="und-title und-title--center und-title--inherit hwcc__subtitle">Your great escape. Tailored by Neptune Marine.</p>
          <p className="hwcc__summary">Cruise in inimitable style and experience real freedom. The adventure of a lifetime awaits aboard the world's greatest superyachts, all curated by your own professional broker.</p>
          <Link to="/charter" className="btn btn--primary btn--white">Charter a yacht</Link>
        </div>
      </div>
      
      <div className="hwcc">
        <img 
          src="/assets/images/burgess/charter/odyssey.jpg" 
          alt="Buy"
          className="media-fit hwcc__img"
        />
        <div className="hwcc__main hwcc__center">
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
          src="/assets/images/burgess/charter/lady_jorgia.jpg" 
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
        <div className="hwcc__main hwcc__center">
          <h2 className="hwcc__title">sell a yacht</h2>
          <p className="und-title und-title--center und-title--inherit hwcc__subtitle">Your perfect buyer. Our exclusive audience.</p>
          <p className="hwcc__summary">Our directly employed brokers share market-leading intelligence and powerful client database insights with our experienced global team to ensure the best outcome for you.</p>
          <Link to="/sell" className="btn btn--primary btn--white btn--white-grad">Sell a yacht</Link>
        </div>
      </div>
      
      <div className="hwcc">
        <img 
          src="/assets/images/burgess/charter/excellence.jpg" 
          alt="Build"
          className="media-fit hwcc__img"
        />
        <div className="hwcc__main hwcc__center">
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

// ============= CHARTER PAGE - FULL BURGESS STRUCTURE =============
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
      {/* Hero Section - Lady Jorgia Banner */}
      <section className="h-bann theme-orange">
        <div className="h-bann__bg" style={{ backgroundImage: 'url(/assets/images/burgess/charter/lady_jorgia.jpg)' }}></div>
        <div className="h-bann__overlay"></div>
        <div className="h-bann__cont theme-border">
          <span></span>
          <div>
            <p className="h-bann__title" style={{ fontSize: '2.5rem', fontWeight: '300' }}>Your great yacht<br/>charter escape.</p>
            <p className="h-bann__sub-title" style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '20px', color: '#fff' }}>Tailored by Neptune Marine.</p>
          </div>
        </div>
      </section>

      {/* Introduction Text */}
      <div className="html-area html-area__center">
        <h2 className="html-area__title">Ready for an extraordinary yacht charter experience?</h2>
        <div className="html-area__standfirst" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <p>When you charter a yacht with Neptune Marine, you'll be working with a team committed to delivering the best on board experience possible. Our team of world-class experts know the yachts, the crews and the destinations better than anyone else.</p>
        </div>
        <Link to="/enquire" className="btn btn--primary">Speak to a charter expert</Link>
      </div>

      {/* Content Pods - Yachts for Charter */}
      <div className="fls">
        <div className="fls__item fls__item--double">
          <Link to="/charter" className="content-pod">
            <img src="/assets/images/burgess/charter/excellence.jpg" alt="Yacht Charter" className="media-fit content-pod__img" />
            <div className="content-pod__cont content-pod__cont--grad">
              <div className="content-pod__cont-inner">
                <div className="content-pod__info"><span>Charter a yacht</span></div>
                <h2 className="content-pod__title">Yachts for charter</h2>
                <span className="a-link">
                  <span className="a-link__text">Step on board</span>
                  <ArrowRight className="a-link__icon" />
                </span>
              </div>
            </div>
          </Link>
        </div>
        <div className="fls__item">
          <Link to="/charter/inspiration" className="content-pod">
            <img src="/assets/images/burgess/charter/seanna.jpg" alt="Inspiration" className="media-fit content-pod__img" />
            <div className="content-pod__cont content-pod__cont--grad">
              <div className="content-pod__cont-inner">
                <div className="content-pod__info"><span>YACHT CHARTER INSPIRATION</span></div>
                <h2 className="content-pod__title">Be inspired</h2>
                <span className="a-link">
                  <span className="a-link__text">Find your escape</span>
                  <ArrowRight className="a-link__icon" />
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Destinations Section - Excellence International */}
      <div className="hl-panel theme-blue">
        <picture className="hl-panel__img">
          <img src="/assets/images/burgess/charter/excellence_int.jpg" alt="" />
        </picture>
        <div className="hl-panel__contents">
          <h2 className="hl-panel__title">Yacht charter destinations</h2>
          <p className="hl-panel__mt">Start your adventure</p>
          <p>Charter a private yacht and discover a world where anything is possible, and everything is within reach.</p>
          <Link to="/charter/destinations" className="btn btn--solid-grad hl-panel__btn">At your fingertips</Link>
        </div>
        <div className="hl-panel__border theme-border"></div>
      </div>

      {/* New to Charter Section */}
      <div className="html-area">
        <h2 className="html-area__title">new to charter? you're in expert hands.</h2>
        <div className="html-area__standfirst" style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
          <p>Our charter brokers are specialists in tailoring luxurious yachting experiences just for you, with every minute detail considered and curated. What do you love most? Cultural exploration or switch-off escapes? Endless family activities or spa-style wellness with friends?</p>
          <p>A luxury yacht charter is anything and everything, anywhere in the world. Tell us what you love to do and we will build an experience that's unforgettable.</p>
        </div>
      </div>

      {/* Corporate & New to Charter Cards */}
      <div className="fifty-fifty fifty-fifty--margins">
        <div className="hwcc">
          <div className="hwcc__main hwcc__main--pad">
            <h2 className="hwcc__title">Corporate yacht charter</h2>
            <p className="hwcc__summary">Give your brand the lustre of luxury and host an unforgettable event on board a superyacht.</p>
            <Link to="/enquire" className="btn btn--primary btn--white">Make your mark</Link>
          </div>
        </div>
        <div className="hwcc">
          <div className="hwcc__main hwcc__main--pad">
            <h2 className="hwcc__title">New to private yacht rental?</h2>
            <p className="hwcc__summary">You can only experience your first luxury yacht charter once, so let us create a unique experience you'll love.</p>
            <Link to="/enquire" className="btn btn--primary btn--white">Make it happen</Link>
          </div>
        </div>
      </div>

      {/* Motor vs Sailing */}
      <div className="fifty-fifty fifty-fifty--margins fifty-fifty--mb-0">
        <div className="hwcc">
          <div className="hwcc__main hwcc__main--pad">
            <h2 className="hwcc__title">Motor yachts for charter</h2>
            <p className="hwcc__summary">For larger spaces inside and out, a bigger crew, more watertoys and better stability, choose a luxury motor yacht for your charter.</p>
            <Link to="/charter?type=motor" className="btn btn--primary btn--white">Choose a motor yacht</Link>
          </div>
        </div>
        <div className="hwcc">
          <div className="hwcc__main hwcc__main--pad">
            <h2 className="hwcc__title">Sailing yachts for charter</h2>
            <p className="hwcc__summary">For lower fuel consumption, fewer emissions and the sheer exhilaration of surging through the seas powered only by nature, charter a luxury sailing yacht.</p>
            <Link to="/charter?type=sailing" className="btn btn--primary btn--white">Choose a sailing yacht</Link>
          </div>
        </div>
      </div>

      {/* Filters */}
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
      
      {/* Yacht Grid */}
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
                  €{yacht.base_price?.toLocaleString()}/week
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* FAQ Section */}
      <div className="html-area html-area__center">
        <h2 className="html-area__title">Frequently asked questions</h2>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
          <details className="faq-item">
            <summary>I've never chartered before, where do I start?</summary>
            <p>To get started, one of our brokers will ask you questions, like how many people you want to bring aboard, whether you know where you want to go and what you want to do. We'll shortlist yachts of a style, size and capability that match your preferences.</p>
          </details>
          <details className="faq-item">
            <summary>How many guests can be on board?</summary>
            <p>The majority of yachts can cruise with 8-12 guests, depending on their length. For bigger parties, some yachts built to the Passenger Yacht Code (PYC) can carry up to 36 guests.</p>
          </details>
          <details className="faq-item">
            <summary>Why do I need a charter broker?</summary>
            <p>Planning the perfect charter requires specialist knowledge, trusted contacts on board and on the ground, as well as first-hand knowledge of yachts, crews and locations. Creating the unforgettable is what we do at Neptune Marine.</p>
          </details>
        </div>
      </div>
    </div>
  );
}

// ============= BUY PAGE - FULL BURGESS STRUCTURE =============
function BuyPage() {
  return (
    <div>
      {/* Hero Section - Lady Jorgia Banner */}
      <section className="i-bann theme-orange-purple">
        <div className="i-bann__main">
          <picture>
            <img 
              src="/assets/images/burgess/buy/lady_jorgia.jpg" 
              alt="" 
              className="media-fit" 
              style={{ objectPosition: 'top' }}
            />
          </picture>
          <div className="i-bann__c">
            <nav className="breadcrumbs breadcrumbs--inline">
              <Link to="/" className="breadcrumbs__link">Home</Link>
              <span className="breadcrumbs__current">Buy a yacht</span>
            </nav>
            <div className="theme-border i-bann__ta">
              <span className="i-bann__t theme-text">Own your<br/>space.</span>
              <span className="i-bann__t i-bann__t--r theme-text">Find your<br/>sanctuary.</span>
            </div>
          </div>
        </div>
        <div className="i-bann__ti-a">
          <h1 className="i-bann__ti und-title und-title--center">Why choose Neptune Marine as your broker when buying a yacht?</h1>
        </div>
        <div className="i-bann__summary">Because we make sure you get the yacht you want to own and avoid the many pitfalls of the yacht purchase process. We have the global network, commercial insights and all-round expertise to find the right yacht and the right price, even if it is not on the open market. These transactions can be extremely complex and may take months to finalise. We take away all of the complexity and present you with straightforward decisions to make.</div>
      </section>

      {/* First fifty-fifty - Size Categories */}
      <div className="fifty-fifty fifty-fifty--margins">
        <div className="hwcc">
          <img src="/assets/images/burgess/buy/joy.jpg" alt="All Yachts" className="hwcc__img media-fit" />
          <div className="hwcc__main hwcc__main--pad">
            <h2 className="hwcc__title">buy a yacht</h2>
            <p className="und-title und-title--center und-title--inherit hwcc__subtitle">All yachts for sale</p>
            <p className="hwcc__summary">When it comes to buying a yacht we'll understand your requirements and handpick the best opportunities for you.</p>
            <Link to="/sale" className="btn btn--primary btn--white">Find your next yacht</Link>
          </div>
        </div>
        <div className="hwcc">
          <img src="/assets/images/burgess/buy/phoenix_2.jpg" alt="Over 200ft" className="hwcc__img media-fit" />
          <div className="hwcc__main hwcc__main--pad">
            <h2 className="hwcc__title">buy a yacht</h2>
            <p className="und-title und-title--center und-title--inherit hwcc__subtitle">Yachts for sale over 200ft</p>
            <p className="hwcc__summary">More volume means more guests, more toys, more crew and more space inside and out.</p>
            <Link to="/sale?size=over200" className="btn btn--primary btn--white">See what's available</Link>
          </div>
        </div>
      </div>

      {/* Second fifty-fifty - Medium & Small */}
      <div className="fifty-fifty fifty-fifty--margins fifty-fifty--mt-0">
        <div className="hwcc">
          <img src="/assets/images/burgess/buy/my_legacy.jpg" alt="150-200ft" className="hwcc__img media-fit" />
          <div className="hwcc__main hwcc__main--pad">
            <h2 className="hwcc__title">buy a yacht</h2>
            <p className="und-title und-title--center und-title--inherit hwcc__subtitle">Yachts for sale from 150-200ft</p>
            <p className="hwcc__summary">Buy a yacht with plenty of room for family and friends to relax and entertain, and for business to be done.</p>
            <Link to="/sale?size=150-200" className="btn btn--primary btn--white">Explore your options</Link>
          </div>
        </div>
        <div className="hwcc">
          <img src="/assets/images/burgess/buy/muchos_mas.jpg" alt="Under 150ft" className="hwcc__img media-fit" />
          <div className="hwcc__main hwcc__main--pad">
            <h2 className="hwcc__title">BUY A YACHT</h2>
            <p className="und-title und-title--center und-title--inherit hwcc__subtitle">Yachts for sale under 150ft</p>
            <p className="hwcc__summary">The most popular sector of the superyacht market where you'll find all you need for your yachting experience.</p>
            <Link to="/sale?size=under150" className="btn btn--primary btn--white">Check your choices</Link>
          </div>
        </div>
      </div>

      {/* fwcp - Register Account */}
      <div className="fwcp fwcp--themed fwcp--mt-0 fwcp--mb-0 theme-green">
        <div className="fwcp__inner">
          <div className="fwcp__main">
            <div className="fwcp__subtitle">personalise</div>
            <h2 className="fwcp__title">Register for an account today</h2>
            <p>Curate your own yachting space and find more of what's important to you.</p>
          </div>
          <div className="fwcp__footer">
            <Link className="btn btn--primary btn--white btn--white-grad fwcp__footer-btn" to="/account">Sign up now</Link>
          </div>
        </div>
      </div>

      {/* ccg cards - Virtual Tours, Videos, New Builds */}
      <div className="bg">
        <div className="rel-cont">
          <div className="ccg">
            <div className="ccg__item">
              <Link className="cc" to="/build">
                <picture className="cc__pic">
                  <img className="cc__img" src="/assets/images/burgess/buy/majesty_175.jpg" alt="" loading="lazy" />
                </picture>
                <span className="cc__cat">buy a yacht</span>
                <h3 className="cc__title und-title und-title--theme">Yachts under construction</h3>
                <div className="cc__sum">Save time by buying a yacht already in build. Neptune Marine will represent you and your interests on site.</div>
                <span className="a-link a-link--theme">
                  <span className="a-link__text">Discover dreams in build</span>
                  <svg className="a-link__icon"><use href="#svg-arrow-right" /></svg>
                </span>
              </Link>
            </div>
            <div className="ccg__item">
              <Link className="cc" to="/virtual-tours">
                <picture className="cc__pic">
                  <img className="cc__img" src="/assets/images/burgess/buy/anna-i.jpg" alt="" loading="lazy" />
                </picture>
                <span className="cc__cat">BUY A YACHT</span>
                <h3 className="cc__title und-title und-title--theme">360° yacht tours</h3>
                <div className="cc__sum">Explore dozens of superyachts as you walk the decks without taking a step.</div>
                <span className="a-link a-link--theme">
                  <span className="a-link__text">Get on board</span>
                  <svg className="a-link__icon"><use href="#svg-arrow-right" /></svg>
                </span>
              </Link>
            </div>
            <div className="ccg__item">
              <Link className="cc" to="/videos">
                <picture className="cc__pic">
                  <img className="cc__img" src="/assets/images/burgess/buy/areti.jpg" alt="" loading="lazy" />
                </picture>
                <span className="cc__cat">BUY A YACHT</span>
                <h3 className="cc__title und-title und-title--theme">Superyacht videos</h3>
                <div className="cc__sum">From inspiring aerial shots to underwater camera action, our bespoke films capture the essence of on board adventure.</div>
                <span className="a-link a-link--theme">
                  <span className="a-link__text">Lights, camera, action</span>
                  <svg className="a-link__icon"><use href="#svg-arrow-right" /></svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* dtd - Discover the Neptune Marine difference */}
      <div className="dtd loading">
        <div className="dtd__inner">
          <div className="dtd__content">
            <h2 className="dtd__title">Buy a yacht</h2>
            <p className="dtd__subtitle und-title und-title--center und-title--inherit">Discover the Neptune Marine difference</p>
            <p>At Neptune Marine, we always go the extra mile to find your perfect yacht and are here to guide you every step of the way during the process of buying a yacht. From securing private viewings to sourcing the best luxury yachts for sale from around the world, our expertise is your guarantee.</p>
          </div>
          <div className="dtd__grid">
            <div className="dtd__section">
              <h3 className="dtd__section-title">Access to luxury yachts unavailable on the open market</h3>
              <p>We don't just have access to the largest public inventory of new and pre-owned luxury yachts to buy on the market, we shortlist your selection from a wide-reaching network of yacht owners to ensure you only ever get the yacht that you truly want.</p>
            </div>
            <div className="dtd__section">
              <h3 className="dtd__section-title">Highly experienced yacht brokers with your needs in mind</h3>
              <p>Working together to deliver the best results is integral to the Neptune Marine DNA, so all Neptune Marine brokers share information globally to guarantee unrivalled market insight and ensure client requirements are always met. There is nothing more important than customer satisfaction.</p>
            </div>
            <div className="dtd__section">
              <h3 className="dtd__section-title">Unrivalled view of prevailing market opportunities</h3>
              <p>The market moves quickly in the superyacht world, which is why we have positioned ourselves to gain the best vantage point, with access to the most attractive yachts to buy, to ensure you have a tailored selection wherever you are in the world.</p>
            </div>
          </div>
          <div className="dtd__buts">
            <Link to="/enquire" className="dtd__but btn btn--primary btn--white btn--white-grad dtd__but">Meet the Brokerage team</Link>
            <Link to="/enquire" className="dtd__but btn btn--white btn--hollow btn--white-grad dtd__but">Contact us</Link>
          </div>
        </div>
      </div>

      {/* Motor vs Sailing - Grey background */}
      <div className="bg bg--grey theme-green">
        <div className="rel-cont">
          <div className="ccg">
            <div className="ccg__item ccg__item--double">
              <Link className="cc" to="/sale?type=motor">
                <picture className="cc__pic">
                  <img className="cc__img" src="/assets/images/burgess/buy/vanish.jpg" alt="" loading="lazy" />
                </picture>
                <h3 className="cc__title und-title und-title--theme">Motor yachts for sale</h3>
                <div className="cc__sum">Explore our unrivalled fleet of luxurious motor yachts for sale and discover the finest and most varied selection afloat. Your next motor yacht is just a click away.</div>
                <span className="a-link a-link--theme">
                  <span className="a-link__text">Buying a motor yacht</span>
                  <svg className="a-link__icon"><use href="#svg-arrow-right" /></svg>
                </span>
              </Link>
            </div>
            <div className="ccg__item ccg__item--double">
              <Link className="cc" to="/sale?type=sailing">
                <picture className="cc__pic">
                  <img className="cc__img" src="/assets/images/burgess/buy/magic.jpg" alt="" loading="lazy" />
                </picture>
                <h3 className="cc__title und-title und-title--theme">Sailing yachts for sale</h3>
                <div className="cc__sum">Browse the world's most distinguished fleet of luxury sailing yachts for sale. From performance cruisers to motor sailers, discover your next sailing superyacht here.</div>
                <span className="a-link a-link--theme">
                  <span className="a-link__text">Buying a sailing yacht</span>
                  <svg className="a-link__icon"><use href="#svg-arrow-right" /></svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Rich text - Why buy a superyacht? */}
      <div className="cws">
        <div className="cws__inner">
          <div className="rich-text loading">
            <h2>Why buy a superyacht? It is a question that can only be answered by you.</h2>
            <p>At Neptune Marine, we know that superyacht ownership gives you year-round access to the superyacht lifestyle; the opportunity to design a custom charter vacation for family and friends; to work from the privacy of your on board office base; explore new countries and cultures around the globe and more... The question is, why will <em>you</em> buy a superyacht?</p>
            <p>When it comes to how to buy a luxury superyacht, the 360-degree view offered by the Neptune Marine in-house team of expert brokers is invaluable. Our brokers are available to guide you through the entire yacht buying process. Whether you are a first-time buyer or a seasoned yacht owner, we will navigate the superyacht market for you.</p>
            <p>Be it a stunning <Link to="/sale?type=motor" target="_blank">motor yacht</Link> or a luxury <Link to="/sale?type=sailing" target="_blank">sailing yacht</Link>, we have the experience within our team to guide you through the process from negotiations to surveys to completion. Neptune Marine will protect your interests at every stage of the yacht buying process. We can even support you through <Link to="/build">building a custom yacht</Link> through our long-standing relationships with many of <Link to="/build">the world's leading shipyards</Link>.</p>
            <p>Or, if you're looking to purchase berths or tenders, our experienced brokers are on hand to meet your precise requirements.</p>
            <p>From finding The One to stepping aboard as the owner, the Neptune Marine brokerage team has your back.</p>
          </div>
        </div>
      </div>

      {/* Editorial Section */}
      <div className="u-ed bg bg--grey loading">
        <h2 className="u-ed__title und-title und-title--center">Editorial</h2>
        <div className="u-ed__grid">
          <Link to="/editorial" className="loading content-pod content-pod--fw">
            <img src="/assets/images/burgess/buy/ruya.jpg" alt="" className="media-fit content-pod__img" sizes="100vw" loading="lazy" />
            <div className="content-pod__cont content-pod__cont--grad">
              <div className="content-pod__cont-inner">
                <h2 className="content-pod__title">Behind the build: bringing RUYA to life</h2>
                <span className="a-link a-link--inherit"><span className="a-link__text">Read more</span><svg className="a-link__icon"><use href="#svg-arrow-right" /></svg></span>
              </div>
            </div>
          </Link>
          <div className="u-ed__art" data-scroll>
            <article className="e-card">
              <img className="e-card__img media-fit" src="/assets/images/burgess/buy/surama.jpg" alt="" loading="lazy" />
              <h3 className="e-card__title">SURAMA for auction</h3>
              <Link to="/editorial" className="a-link"><span className="a-link__text">Read more</span><svg className="a-link__icon"><use href="#svg-arrow-right" /></svg></Link>
            </article>
            <article className="e-card">
              <img className="e-card__img media-fit" src="/assets/images/burgess/buy/spacecat.jpg" alt="" loading="lazy" />
              <h3 className="e-card__title">SPACECAT sold</h3>
              <Link to="/editorial" className="a-link"><span className="a-link__text">Read more</span><svg className="a-link__icon"><use href="#svg-arrow-right" /></svg></Link>
            </article>
            <article className="e-card">
              <img className="e-card__img media-fit" src="/assets/images/burgess/buy/playa.jpg" alt="" loading="lazy" />
              <h3 className="e-card__title">Support yacht PLAYA for sale</h3>
              <Link to="/editorial" className="a-link"><span className="a-link__text">Read more</span><svg className="a-link__icon"><use href="#svg-arrow-right" /></svg></Link>
            </article>
            <article className="e-card">
              <img className="e-card__img media-fit" src="/assets/images/burgess/buy/beowulf.jpg" alt="" loading="lazy" />
              <h3 className="e-card__title">BEOWULF for sale</h3>
              <Link to="/editorial" className="a-link"><span className="a-link__text">Read more</span><svg className="a-link__icon"><use href="#svg-arrow-right" /></svg></Link>
            </article>
            <article className="e-card">
              <img className="e-card__img media-fit" src="/assets/images/burgess/buy/sayonara.jpg" alt="" loading="lazy" />
              <h3 className="e-card__title">SAYONARA price reduction</h3>
              <Link to="/editorial" className="a-link"><span className="a-link__text">Read more</span><svg className="a-link__icon"><use href="#svg-arrow-right" /></svg></Link>
            </article>
            <article className="e-card">
              <img className="e-card__img media-fit" src="/assets/images/burgess/buy/ebyshine.jpg" alt="" loading="lazy" />
              <h3 className="e-card__title">30m EBYSHINE for sale</h3>
              <Link to="/editorial" className="a-link"><span className="a-link__text">Read more</span><svg className="a-link__icon"><use href="#svg-arrow-right" /></svg></Link>
            </article>
            <article className="e-card">
              <img className="e-card__img media-fit" src="/assets/images/burgess/buy/byond_47.jpg" alt="" loading="lazy" />
              <h3 className="e-card__title">Fast-track to ownership: New builds nearing completion</h3>
              <Link to="/editorial" className="a-link"><span className="a-link__text">Read more</span><svg className="a-link__icon"><use href="#svg-arrow-right" /></svg></Link>
            </article>
            <article className="e-card">
              <img className="e-card__img media-fit" src="/assets/images/burgess/buy/odyssey.jpg" alt="" loading="lazy" />
              <h3 className="e-card__title">ODYSSEY for sale</h3>
              <Link to="/editorial" className="a-link"><span className="a-link__text">Read more</span><svg className="a-link__icon"><use href="#svg-arrow-right" /></svg></Link>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============= SELL PAGE - FULL BURGESS STRUCTURE =============
function SalePage() {
  const soldYachts = [
    { name: 'HERE COMES THE SUN', length: '89m (292ft)', year: '2017', builder: 'Amels, The Netherlands', image: 'here_comes_the_sun' },
    { name: 'CONFIDENTIAL', length: '80m (262.5ft)', year: '', builder: 'Confidential', image: 'placeholder' },
    { name: 'CONFIDENTIAL', length: '75m (246.1ft)', year: '2027', builder: 'Confidential', image: 'placeholder' },
    { name: 'CONFIDENTIAL', length: '70m (229.7ft)', year: '', builder: 'Confidential', image: 'placeholder' },
    { name: 'STELLA MI', length: '60.1m (197.2ft)', year: '2021', builder: 'Amels, The Netherlands', image: 'stella_mi' },
    { name: 'W', length: '57.6m (189ft)', year: '2013', builder: 'Feadship, De Vries, The Netherlands', image: 'w' },
    { name: 'AMANTI', length: '51.8m (169.9ft)', year: '2003', builder: 'Feadship, Royal Van Lent, The Netherlands', image: 'amanti' },
    { name: 'BIJIN', length: '49.9m (163.7ft)', year: '2015', builder: 'Heesen, The Netherlands', image: 'bijin' },
    { name: 'FOCUS', length: '46.6m (152.9ft)', year: '2002', builder: 'North American Shipbuilding, Italy', image: 'focus' },
    { name: 'NANA II', length: '45.3m (148.6ft)', year: '2023', builder: 'Overmarine, Italy', image: 'nana_ii' },
  ];

  const editorialArticles = [
    { title: 'Behind the build: bringing RUYA to life', image: 'ruya' },
    { title: 'SPACECAT sold', image: 'spacecat' },
    { title: 'Support yacht PLAYA for sale', image: 'playa' },
    { title: 'BEOWULF for sale', image: 'beowulf' },
    { title: '30m EBYSHINE for sale', image: 'ebyshine' },
    { title: 'ODYSSEY for sale', image: 'odyssey' },
    { title: '72m Feadship VANISH for sale', image: 'vanish' },
    { title: 'A strong start to March: Three yachts sold', image: 'royale_x' },
    { title: 'CONSTANCE for sale', image: 'constance' },
  ];

  return (
    <div>
      {/* Hero Section - Palm Beach */}
      <section className="h-bann theme-purple-yellow">
        <div className="h-bann__bg" style={{ backgroundImage: 'url(/assets/images/burgess/sell/palm_beach.jpg)' }}></div>
        <div className="h-bann__overlay"></div>
        
        {/* Breadcrumbs */}
        <div className="breadcrumbs breadcrumbs--inline">
          <Link to="/" className="breadcrumbs__link">Home</Link>
          <span className="breadcrumbs__current">Sell a yacht</span>
        </div>
        
        <div className="i-bann__ta theme-border">
          <span className="i-bann__t theme-text">Your perfect buyer.</span>
          <span className="i-bann__t i-bann__t--r theme-text">Our exclusive audience.</span>
        </div>
      </section>

      {/* Title Area */}
      <div className="i-bann__ti-a">
        <h1 className="i-bann__ti und-title und-title--center">Why choose Neptune Marine to sell your yacht?</h1>
      </div>

      {/* Summary */}
      <div className="i-bann__summary">
        Quite simply because you want to sell it. We have the expertise to maximise market exposure, the knowledge and networks to find the right buyer and the experience to create maximum value on the sale of your asset. Every year, sales statistics confirm that Neptune Marine is the world's number one broker for 40m+ yachts. Over half the yachts we sell every year are 50m (165ft) or under too so the message is: we sell yachts like yours.
      </div>

      {/* Discover the Neptune Marine difference - dtd section */}
      <div className="dtd">
        <div className="dtd__inner">
          <div className="dtd__content">
            <h2 className="dtd__title">Sell a yacht</h2>
            <p className="dtd__subtitle und-title und-title--center und-title--inherit">Discover the Neptune Marine difference</p>
            <p>Neptune Marine is a globally renowned leader in the yachting industry. We pride ourselves on achieving the best results in everything that we do. When it comes to superyacht sales this equates to on-point marketing and identifying qualified buyers. While synonymous with superyachts, our dynamic sales programme has enabled us to market and consistently sell some of the largest yachts in the world as well as luxury yachts under 40m (130ft). Speak to our expert team today.</p>
          </div>

          <div className="dtd__grid">
            <div className="dtd__section">
              <h3 className="dtd__section-title">A global player in an international market place</h3>
              <p>It takes an extensive network and accurate market intelligence to secure the best results in the global yachting market. That's why appointing us as exclusive agents is a wise decision if you want to maximise your opportunities and achieve successful yacht sales.</p>
            </div>
            <div className="dtd__section">
              <h3 className="dtd__section-title">Highly experienced brokers with your needs in mind</h3>
              <p>Our dynamic team of international brokers have the confidence of the entire superyacht market — an assurance that is founded upon and intrinsically linked to the trust of individual clients. Balancing the realism of the market and client discretion is where we excel.</p>
            </div>
            <div className="dtd__section">
              <h3 className="dtd__section-title">The most dynamic and successful sales programme</h3>
              <p>We consistently sell the most impressive superyachts on the market, dominating yacht sales in the UK and further afield. In-depth market knowledge, honest and transparent advice and unparalleled teamwork all contribute to optimising a successful and timely sale.</p>
            </div>
          </div>

          <div className="dtd__buts">
            <Link to="/meet-the-team/brokerage" className="dtd__but btn btn--primary btn--white btn--white-grad dtd__but">Meet the Brokerage team</Link>
            <Link to="/enquire" className="dtd__but btn btn--white btn--hollow btn--white-grad dtd__but">Contact us</Link>
          </div>
        </div>
      </div>

      {/* Sold Yachts Grid */}
      <div className="y-grid-wrap" id="sold-yachts">
        <h2 className="gh-title y-grid__title und-title und-title--center">Sold yachts</h2>
        <div className="gh-cont y-grid__cont">Year after year, we deliver the most successful sales programme in the world of superyachting, selling many of the most impressive yachts in the global fleet.</div>
        
        <div className="y-sort">
          <div className="y-sort__sel">
            <label className="inline-sel">
              Sort:
              <select id="sort" name="sort" className="inline-sel__sel">
                <option value="">Default</option>
                <option value="name-asc">Name (A - Z)</option>
                <option value="name-desc">Name (Z - A)</option>
                <option value="length-asc">Length (low - high)</option>
                <option value="length-desc">Length (high - low)</option>
                <option value="date-desc">Sold date (desc)</option>
              </select>
            </label>
          </div>
        </div>
        
        <div className="y-grid">
          {soldYachts.map((yacht, i) => (
            <Link key={i} to={`/sell-a-yacht/sold-yachts/${yacht.name.toLowerCase().replace(/ /g, '-')}`} className="yp">
              <div className="yp__visual">
                <div className="yp__placeholder" style={{ backgroundColor: '#f4f5f5', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#666', fontSize: '0.875rem' }}>{yacht.name}</span>
                </div>
                <div className="yp__flags">
                  <span className="yp__flag theme-orange-purple">Sold</span>
                </div>
              </div>
              <h2 className="yp__title yp__title--sold">{yacht.name}</h2>
              <ul className="yp__ms">
                <li className="yp__msi">Length: {yacht.length}</li>
                {yacht.year && <li className="yp__msi">Built: {yacht.year}</li>}
                <li className="yp__msi">{yacht.builder}</li>
              </ul>
            </Link>
          ))}
        </div>

        <div className="lm-pag">
          <p className="lm-pag__text">You've viewed <span>10</span> of <span>582</span></p>
          <progress className="lm-pag__prog" max="582" value="10"></progress>
          <Link to="/sell?page=2" className="btn lm-pag--hidden">Load more</Link>
        </div>
      </div>

      {/* Effective Marketing Section */}
      <div className="html-area">
        <h2 className="html-area__title und-title und-title--center">Effective marketing for your yacht</h2>
        <div className="html-area__standfirst">
          <p>Whether you're planning to make your yacht available for charter or find a new buyer, Neptune Marine is experienced in all aspects of yacht marketing. Our Marketing team will showcase your yacht effectively via multi-channel, global campaigns designed to drive sales and charter interest.</p>
        </div>
        <div className="rich-text">
          <p><Link to="/yacht-owner-services/yacht-marketing"><strong>Yacht Marketing</strong></Link></p>
        </div>
      </div>

      {/* Editorial Section */}
      <div className="u-ed bg bg--grey">
        <h2 className="u-ed__title und-title und-title--center">Editorial</h2>
        <div className="u-ed__grid">
          <Link to="/editorial/news/behind-the-build-ruya" className="content-pod content-pod--fw">
            <div className="yp__placeholder" style={{ backgroundColor: '#f4f5f5', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#666' }}>RUYA</span>
            </div>
            <div className="content-pod__cont content-pod__cont--grad">
              <div className="content-pod__cont-inner">
                <h2 className="content-pod__title">Behind the build: bringing RUYA to life</h2>
                <span className="a-link a-link--inherit">
                  <span className="a-link__text">Read more</span>
                  <ArrowRight className="a-link__icon" />
                </span>
              </div>
            </div>
          </Link>

          <div className="u-ed__art">
            {editorialArticles.slice(0, 8).map((article, i) => (
              <article key={i} className="e-card">
                <div className="e-card__img-placeholder">
                  <span>{article.title.substring(0, 20)}...</span>
                </div>
                <h3 className="e-card__title">{article.title}</h3>
                <Link to={`/editorial/news/${article.title.toLowerCase().replace(/ /g, '-')}`} className="a-link">
                  <span className="a-link__text">Read more</span>
                  <ArrowRight className="a-link__icon" />
                </Link>
              </article>
            ))}
          </div>
        </div>
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
      
      <div className="container">
        <form className="enquire-form">
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">First Name *</label>
              <input type="text" required className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Last Name *</label>
              <input type="text" required className="form-input" />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Email *</label>
              <input type="email" required className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input type="tel" className="form-input" />
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Interest *</label>
            <select className="form-input">
              <option>Charter</option>
              <option>Cabin Cruise</option>
              <option>Buy</option>
              <option>Sell</option>
              <option>Build</option>
              <option>Management</option>
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">Message</label>
            <textarea rows={6} className="form-input"></textarea>
          </div>
          
          <button type="submit" className="btn btn--primary">Send Enquiry</button>
        </form>
      </div>
    </div>
  );
}

// ============= DESTINATIONS PAGE - FULL BURGESS STRUCTURE =============
function DestinationsPage() {
  const regions = [
    { name: 'Caribbean & Bahamas', destinations: ['Caribbean', 'The Bahamas', 'Caribbean - Leeward Islands', 'Caribbean - Windward Islands', 'British Virgin Islands', 'US Virgin Islands'] },
    { name: 'Mediterranean', destinations: ['Mediterranean', 'Greece', 'French Riviera', 'Corsica & Sardinia', 'The Balearics', 'Italy', 'Croatia & Montenegro', 'Turkey', 'Mallorca', 'Ibiza', 'Corfu', 'Mykonos'] },
    { name: 'Asia & Oceania', destinations: ['Maldives', 'Thailand', 'Phuket', 'Indonesia', 'Australia', 'New Zealand', 'French Polynesia', 'Fiji', 'Seychelles'] },
    { name: 'Europe', destinations: ['Scotland', 'Northern Europe', 'Sicily & Aeolians'] },
    { name: 'USA & Canada', destinations: ['Alaska', 'New England'] },
    { name: 'Central & South America', destinations: ['Galapagos', 'Belize'] },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="h-bann theme-blue">
        <div className="h-bann__cont theme-border">
          <span></span>
          <div>
            <p className="h-bann__title" style={{ fontSize: '2.5rem', fontWeight: '300' }}>Yacht charter destinations</p>
            <p className="h-bann__sub-title" style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '20px', color: '#fff' }}>Start your adventure</p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <div className="html-area html-area__center">
        <h2 className="html-area__title">All regions</h2>
        <div className="html-area__standfirst" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <p>Charter a private yacht and discover a world where anything is possible, and everything is within reach.</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="filters">
        <div className="filters__inner">
          <button className="filter-btn-burgess filter-btn-burgess--active">All regions</button>
          <button className="filter-btn-burgess">Caribbean & Bahamas</button>
          <button className="filter-btn-burgess">Mediterranean</button>
          <button className="filter-btn-burgess">Asia & Oceania</button>
          <button className="filter-btn-burgess">Europe</button>
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        {regions.map((region, i) => (
          <div key={i} style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '20px', color: '#000' }}>{region.name}</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
              {region.destinations.map((dest, j) => (
                <Link 
                  key={j} 
                  to={`/charter/destinations/${dest.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  className="dest-link"
                >
                  {dest}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Popular Destinations */}
      <div className="fls">
        <div className="fls__item">
          <Link to="/charter/destinations/mediterranean" className="content-pod">
            <img src="/assets/images/aquila-content.jpg" alt="Mediterranean" className="media-fit content-pod__img" />
            <div className="content-pod__cont content-pod__cont--grad">
              <div className="content-pod__cont-inner">
                <div className="content-pod__info"><span>Mediterranean</span></div>
                <h2 className="content-pod__title">Discover the Mediterranean</h2>
                <span className="a-link">
                  <span className="a-link__text">Explore</span>
                  <ArrowRight className="a-link__icon" />
                </span>
              </div>
            </div>
          </Link>
        </div>
        <div className="fls__item">
          <Link to="/charter/destinations/caribbean" className="content-pod">
            <img src="/assets/images/santosha-content.jpg" alt="Caribbean" className="media-fit content-pod__img" />
            <div className="content-pod__cont content-pod__cont--grad">
              <div className="content-pod__cont-inner">
                <div className="content-pod__info"><span>Caribbean</span></div>
                <h2 className="content-pod__title">Explore the Caribbean</h2>
                <span className="a-link">
                  <span className="a-link__text">Explore</span>
                  <ArrowRight className="a-link__icon" />
                </span>
              </div>
            </div>
          </Link>
        </div>
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

// ============= SEARCH PAGE
function BuildPage() {
  const chapters = [
    { time: '04:45', title: 'Chapter 1 - Why build a superyacht?', desc: 'What makes an owner decide to build rather than buy a yacht?' },
    { time: '05:44', title: 'Chapter 2 - Choosing the right team', desc: 'Understanding the owner drives the selection of designer and shipyard' },
    { time: '05:45', title: 'Chapter 3 - Pre-contract development', desc: 'The success of any new-build project is defined by this critical phase' },
    { time: '04:28', title: 'Chapter 4 - Engineering, design and approval', desc: 'This phase is all about detail, removing any ambiguity from the project' },
    { time: '06:13', title: 'Chapter 5 - Construction and quality management', desc: 'Steel is cut, the keel is laid and concept becomes reality' },
    { time: '07:07', title: 'Chapter 6 - Commissioning, delivery and support', desc: 'Systems are tested, the crew learn their roles, and a new journey begins' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="h-bann theme-blue">
        <div className="h-bann__cont theme-border">
          <span></span>
          <div>
            <p className="h-bann__title" style={{ fontSize: '2.5rem', fontWeight: '300' }}>When we build together.</p>
            <p style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '20px', color: '#fff' }}>We build better.</p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <div className="html-area">
        <h2 className="html-area__title">Why do I need the Neptune Marine New Build team?</h2>
        <div className="html-area__standfirst" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <p>Because we are by your side, every step of the way. We are able to draw on our 360-degree expertise to combine the commercial experience of our Brokerage team, the build knowledge of our Technical Services team and the operational expertise of our Management team.</p>
        </div>
      </div>

      {/* Video Chapters */}
      <div className="html-area html-area__center" style={{ background: '#f5f5f5', padding: '60px 20px' }}>
        <h2 className="html-area__title">The fundamentals of superyacht new build</h2>
        <div className="chapter-grid">
          {chapters.map((chapter, i) => (
            <div key={i} className="chapter-card">
              <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '10px' }}>{chapter.time}</p>
              <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '10px' }}>{chapter.title}</h3>
              <p style={{ fontSize: '0.875rem', color: '#666' }}>{chapter.desc}</p>
              <button style={{ marginTop: '15px', padding: '10px 20px', background: '#000', color: '#fff', border: 'none', cursor: 'pointer' }}>WATCH VIDEO</button>
            </div>
          ))}
        </div>
      </div>

      {/* Service Cards */}
      <div className="fifty-fifty fifty-fifty--margins">
        <div className="hwcc">
          <img src="/assets/images/burgess/buy/majesty_175.jpg" alt="Technical Services" className="media-fit hwcc__img" />
          <div className="hwcc__main hwcc__main--pad">
            <h2 className="hwcc__title">Technical Services</h2>
            <p className="hwcc__summary">If the yacht you want to own doesn't exist, our expertise can help you realise your vision.</p>
            <Link to="/enquire" className="btn btn--primary btn--white">Your vision, our expertise</Link>
          </div>
        </div>
        <div className="hwcc">
          <img src="/assets/images/burgess/buy/odyssey.jpg" alt="Delivered Yachts" className="media-fit hwcc__img" />
          <div className="hwcc__main hwcc__main--pad">
            <h2 className="hwcc__title">Delivered yachts</h2>
            <p className="hwcc__summary">We successfully deliver more 30-180m yachts than any other new-build yacht construction team.</p>
            <Link to="/enquire" className="btn btn--primary btn--white">Discover our deliveries</Link>
          </div>
        </div>
      </div>

      <div className="fls">
        <div className="fls__item">
          <Link to="/enquire" className="content-pod">
            <img src="/assets/images/burgess/buy/anna-i.jpg" alt="Custom Tenders" className="media-fit content-pod__img" />
            <div className="content-pod__cont content-pod__cont--grad">
              <div className="content-pod__cont-inner">
                <div className="content-pod__info"><span>Custom tenders</span></div>
                <h2 className="content-pod__title">We can help you build custom tenders</h2>
                <span className="a-link">
                  <span className="a-link__text">The perfect pairing</span>
                  <ArrowRight className="a-link__icon" />
                </span>
              </div>
            </div>
          </Link>
        </div>
        <div className="fls__item">
          <Link to="/enquire" className="content-pod">
            <img src="/assets/images/balearics-dest.jpg" alt="Shipyards" className="media-fit content-pod__img" />
            <div className="content-pod__cont content-pod__cont--grad">
              <div className="content-pod__cont-inner">
                <div className="content-pod__info"><span>Shipyards</span></div>
                <h2 className="content-pod__title">The right build team for your project</h2>
                <span className="a-link">
                  <span className="a-link__text">Build a partnership</span>
                  <ArrowRight className="a-link__icon" />
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* New to Yacht Construction */}
      <div className="hl-panel theme-purple">
        <picture className="hl-panel__img">
          <img src="/assets/images/burgess/charter/excellence_int.jpg" alt="" />
        </picture>
        <div className="hl-panel__contents">
          <h2 className="hl-panel__title">NEW TO YACHT CONSTRUCTION</h2>
          <p className="hl-panel__mt">You can rely on our extensive in-house build expertise & experience</p>
          <p>We are the only yachting company that can offer the full build service from enquiry to delivery and into operation, maximising your enjoyment of the construction process.</p>
          <Link to="/enquire" className="btn btn--solid-grad hl-panel__btn">Get in touch</Link>
        </div>
        <div className="hl-panel__border theme-border"></div>
      </div>

      {/* Tailored Build Support */}
      <div className="html-area">
        <h2 className="html-area__title">Tailored Build Support</h2>
        <div className="html-area__standfirst" style={{ textAlign: 'left', maxWidth: '800px', margin: '0 auto' }}>
          <p>The Neptune Marine new build service provides dedicated support throughout your entire build journey, helping you to:</p>
          <ul style={{ marginTop: '20px', paddingLeft: '20px' }}>
            <li style={{ marginBottom: '10px' }}><strong>Maximise your opportunities</strong> – Our in depth understanding of the build, brokerage, charter and operational markets helps you to make the right selection.</li>
            <li style={{ marginBottom: '10px' }}><strong>Position commercially</strong> – Our expertise gives you the edge to negotiate on the price, contract and terms.</li>
            <li style={{ marginBottom: '10px' }}><strong>Decode technical</strong> – Our in-house team supports you at each stage of the project and interprets complex technical language.</li>
            <li style={{ marginBottom: '10px' }}><strong>Minimise risk & protect your asset</strong> – We ensure all risk is minimised and your financial investment is protected.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// ============= MANAGEMENT PAGE - FULL BURGESS STRUCTURE =============
function ManagementPage() {
  const services = [
    { title: 'Operations', desc: 'Our aim is to allow an owner to get maximum enjoyment from his yacht without the day-to-day worry of the yacht\'s operation.', icon: '⚓' },
    { title: 'Technical', desc: 'A suitably experienced Technical Manager is assigned to each management team to provide required technical support.', icon: '🔧' },
    { title: 'Safety and Security', desc: 'We provide safety and security services in-house as we believe their implementation must be fully integrated.', icon: '🛡️' },
    { title: 'Accounts', desc: 'Cost control is important to all yacht owners. Our experienced accounting team prepares accurate, fully-itemised budgets.', icon: '💰' },
  ];

  const ownerServices = [
    { title: 'Charter Management', desc: 'We optimise your yacht\'s charter potential, and take complexity out of the equation.', link: '/enquire' },
    { title: 'Sales Management', desc: 'Your yacht, our global network and track record. Expect the best possible outcome.', link: '/enquire' },
    { title: 'Yacht Insurance', desc: 'We provide competitive premiums for comprehensive cover delivered in a bespoke package.', link: '/enquire' },
    { title: 'Yacht Marketing', desc: 'From professional photography to creative print and digital solutions, we have it covered.', link: '/enquire' },
    { title: 'Berths for sale', desc: 'We negotiate prime berths in key locations for your peace of mind and investment.', link: '/enquire' },
    { title: 'Procurement', desc: 'Leverage our global purchasing power and first-class service to source the parts you need for less.', link: '/enquire' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="h-bann theme-aqua">
        <div className="h-bann__cont theme-border">
          <span></span>
          <div>
            <p className="h-bann__title" style={{ fontSize: '2.5rem', fontWeight: '300' }}>Your enjoyment.</p>
            <p style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '20px', color: '#fff' }}>Our responsibility.</p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <div className="html-area">
        <h2 className="html-area__title">Why choose Neptune Marine's yacht management services?</h2>
        <div className="html-area__standfirst" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <p>Yacht ownership should be an unqualified pleasure. If that's not your experience, let us take care of everything with our superyacht management services. Our dedicated team ensures absolute peace of mind for you and your captain.</p>
        </div>
      </div>

      {/* Management Services Grid */}
      <div className="mgmt-grid">
        {services.map((service, i) => (
          <div key={i} className="mgmt-card">
            <div className="mgmt-card__icon">{service.icon}</div>
            <h3 className="mgmt-card__title">{service.title}</h3>
            <p className="mgmt-card__desc">{service.desc}</p>
          </div>
        ))}
      </div>

      {/* You live the dream section */}
      <div className="html-area html-area__center" style={{ background: '#f5f5f5' }}>
        <h2 className="html-area__title">You live the dream. We manage it.</h2>
      </div>

      {/* Owner Services */}
      <div className="fifty-fifty fifty-fifty--margins">
        {ownerServices.slice(0, 2).map((service, i) => (
          <div key={i} className="hwcc">
            <div className="hwcc__main hwcc__main--pad">
              <h2 className="hwcc__title">{service.title}</h2>
              <p className="hwcc__summary">{service.desc}</p>
              <Link to={service.link} className="btn btn--primary btn--white">Learn more</Link>
            </div>
          </div>
        ))}
      </div>

      <div className="fls">
        {ownerServices.slice(2, 5).map((service, i) => (
          <div key={i} className="fls__item">
            <Link to={service.link} className="content-pod">
              <img src={['/assets/images/santosha-content.jpg', '/assets/images/burgess/buy/jet.jpg', '/assets/images/burgess/buy/anna-i.jpg'][i]} alt={service.title} className="media-fit content-pod__img" />
              <div className="content-pod__cont content-pod__cont--grad">
                <div className="content-pod__cont-inner">
                  <div className="content-pod__info"><span>{service.title}</span></div>
                  <h2 className="content-pod__title">{service.desc.substring(0, 40)}...</h2>
                  <span className="a-link">
                    <span className="a-link__text">Learn more</span>
                    <ArrowRight className="a-link__icon" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Refits Section */}
      <div className="hl-panel theme-orange">
        <picture className="hl-panel__img">
          <img src="/assets/images/burgess/charter/excellence_int.jpg" alt="" />
        </picture>
        <div className="hl-panel__contents">
          <h2 className="hl-panel__title">Refits, upgrades and design services</h2>
          <p className="hl-panel__mt">Yacht refits and upgrades can be complex</p>
          <p>Neptune Marine's Technical Services team has the expertise to transform your yacht into one you'll be proud to own.</p>
          <Link to="/enquire" className="btn btn--solid-grad hl-panel__btn">Yacht Refits</Link>
        </div>
        <div className="hl-panel__border theme-border"></div>
      </div>
    </div>
  );
}

// ============= CHARTER INSPIRATION PAGE =============
function CharterInspirationPage() {
  return (
    <div>
      <div className="page-header theme-aqua">
        <h1 className="page-header__title">Yacht Charter Inspiration</h1>
        <p className="page-header__subtitle">Be inspired for your next adventure</p>
      </div>
      
      <div className="html-area">
        <h2 className="html-area__title">A world beyond</h2>
        <p className="html-area__standfirst">Cruise hidden bays, dive undiscovered atolls, explore the extraordinary on your private yacht charter.</p>
      </div>
    </div>
  );
}

// ============= PRIVACY PAGE - FULL BURGESS STRUCTURE =============
function PrivacyPage() {
  const sections = [
    { title: '1. INTRODUCTION', content: 'This privacy policy contains a lot of information but we want you to be fully informed about your rights, and how Neptune Marine stores, uses and shares your personal data.' },
    { title: '2. ABOUT NEPTUNE MARINE', content: 'Neptune Marine is made up of a number of related companies. For the purposes of data protection legislation, the company below will act as controller in relation to your personal data.' },
    { title: '3. THE LEGAL BACKGROUND', content: 'We set out a number of different legal grounds on which we may collect and process personal data: Consent, Performance of a contract, Legal compliance, and Legitimate interest.' },
    { title: '4. WHOSE PERSONAL DATA DO WE COLLECT?', content: 'We collect data from: Website users and those who contact us, Customers and service users, Service providers, partners and personnel, and Individuals whose personal data is provided by third parties.' },
    { title: '5. WHAT SORT OF PERSONAL DATA DO WE COLLECT?', content: 'We collect: Your personal contact details such as name, title, postal addresses, email addresses and telephone numbers. Technical information from your visits to our website. Your communication preferences. Any other personal information you provide to us.' },
    { title: '6. HOW AND WHY DO WE USE YOUR PERSONAL DATA?', content: 'We use your information to respond and deal with your enquiry, to provide information requested by you, to protect our business from fraud and other illegal activities, and to keep you informed about relevant services and events.' },
    { title: '7. COOKIES', content: 'Cookies are text files which are stored on your computer or other device when you visit our website. They allow us to distinguish you from other users of our website.' },
    { title: '8. HOW WE STORE AND PROTECT YOUR PERSONAL DATA', content: 'We know how much data security matters. With this in mind, we will treat your personal data with the utmost care and take all appropriate steps to protect it.' },
    { title: '9. HOW LONG WILL WE KEEP YOUR PERSONAL DATA?', content: 'Whenever we collect or process your personal data, we will only keep it for as long as is necessary for the purpose for which it was collected.' },
    { title: '10. WHO DO WE SHARE YOUR PERSONAL DATA WITH?', content: 'We will routinely share information between the different Neptune Marine companies, as necessary for us to provide our products and services or to meet our legitimate business interests.' },
    { title: '11. WHAT ARE YOUR RIGHTS OVER YOUR PERSONAL DATA?', content: 'You have the right to make a Data Subject Access Request and to request: Access to the personal data we hold about you, The correction of your personal data when incorrect, The restriction on our processing of your personal data.' },
    { title: '12. CONTACTING THE REGULATOR', content: 'If you feel that your data has not been handled correctly, or you are unhappy with our response to any requests you have made to us, you have the right to lodge a complaint with the relevant supervisory body.' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="h-bann theme-blue">
        <div className="h-bann__cont theme-border">
          <span></span>
          <div>
            <p className="h-bann__title" style={{ fontSize: '2.5rem', fontWeight: '300' }}>Privacy policy</p>
          </div>
        </div>
      </section>

      {/* Protecting your privacy */}
      <div className="html-area">
        <h2 className="html-area__title">Protecting your privacy</h2>
        <div className="html-area__standfirst" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <p>You do not need to register or supply any personal information to browse our websites or apps.</p>
        </div>
      </div>

      {/* Privacy Sections */}
      <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto' }}>
        {sections.map((section, i) => (
          <div key={i} style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '15px', color: '#000' }}>{section.title}</h2>
            <p style={{ color: '#666', lineHeight: '1.6' }}>{section.content}</p>
          </div>
        ))}
      </div>

      {/* Contact */}
      <div className="hl-panel theme-aqua">
        <picture className="hl-panel__img">
          <img src="/assets/images/burgess/charter/excellence_int.jpg" alt="" />
        </picture>
        <div className="hl-panel__contents">
          <h2 className="hl-panel__title">ANY QUESTIONS?</h2>
          <p className="hl-panel__mt">We hope this privacy policy has been helpful</p>
          <p>If you have any questions that have not been covered, please contact our Data Protection Officer.</p>
          <Link to="/enquire" className="btn btn--solid-grad hl-panel__btn">Contact Us</Link>
        </div>
        <div className="hl-panel__border theme-border"></div>
      </div>
    </div>
  );
}

// ============= TERMS PAGE - FULL BURGESS STRUCTURE =============
function TermsPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="h-bann theme-blue">
        <div className="h-bann__cont theme-border">
          <span></span>
          <div>
            <p className="h-bann__title" style={{ fontSize: '2.5rem', fontWeight: '300' }}>Terms of use</p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <div className="html-area">
        <h2 className="html-area__title">Terms of Use</h2>
        <div className="html-area__standfirst" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <p>Welcome to Neptune Marine. By using this website, you agree to these terms of use.</p>
        </div>
      </div>

      {/* Terms Sections */}
      <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '15px', color: '#000' }}>ACCEPTABLE USE</h2>
          <p style={{ color: '#666', lineHeight: '1.6' }}>You may use this website for lawful purposes only. You must not use our site in any way that breaches any applicable laws or regulations.</p>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '15px', color: '#000' }}>INTELLECTUAL PROPERTY</h2>
          <p style={{ color: '#666', lineHeight: '1.6' }}>All content on this website is the property of Neptune Marine and may not be reproduced, distributed, modified, or transmitted without our written consent.</p>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '15px', color: '#000' }}>LIMITATION OF LIABILITY</h2>
          <p style={{ color: '#666', lineHeight: '1.6' }}>Neptune Marine will not be liable for any damages arising from the use of this website. This includes direct, indirect, incidental, or consequential damages.</p>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '15px', color: '#000' }}>LINKS TO OTHER WEBSITES</h2>
          <p style={{ color: '#666', lineHeight: '1.6' }}>Our website may contain links to other websites of interest. However, once you have used these links to leave our site, we cannot be responsible for the protection and privacy of any information which you provide.</p>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '15px', color: '#000' }}>GOVERNING LAW</h2>
          <p style={{ color: '#666', lineHeight: '1.6' }}>These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which Neptune Marine operates.</p>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '15px', color: '#000' }}>CONTACT US</h2>
          <p style={{ color: '#666', lineHeight: '1.6' }}>For questions about these terms, contact us at info@neptunemarine.com</p>
        </div>
      </div>
    </div>
  );
}

// ============= SITEMAP PAGE - FULL BURGESS STRUCTURE =============
function SitemapPage() {
  const sitemapLinks = [
    { title: 'Charter', links: ['Yachts for Charter', 'Destinations', 'Inspiring Charter Ideas', 'Charter FAQs', 'Meet the Charter Team'] },
    { title: 'Buy', links: ['Yachts for Sale', 'Virtual Yacht Experiences', 'Berths for Sale', 'Meet the Brokerage Team'] },
    { title: 'Sell', links: ['Sold Yachts', 'Yacht Marketing', 'Meet the Brokerage Team'] },
    { title: 'Build', links: ['Technical Services', 'Shipyards', 'Delivered Yachts', 'Meet the Technical Services Team'] },
    { title: 'Management', links: ['Yacht Management', 'Charter Management', 'Meet the Yacht Management Team'] },
    { title: 'Yacht Owners', links: ['Charter Management', 'Sell a Yacht', 'Yacht Marketing', 'Yacht Management', 'Berths for Sale', 'Procurement', 'Refit a Yacht', 'Crew Recruitment', 'Insurance'] },
  ];

  const offices = ['London', 'Monaco', 'New York', 'Miami', 'Dubai', 'Hong Kong', 'Beverly Hills', 'Palma', 'Athens', 'Singapore', 'Phuket', 'Tokyo', 'Sydney', 'Mumbai', 'Shanghai', 'Rio de Janeiro', 'Aspen', 'Guernsey', 'Palm Beach'];

  return (
    <div>
      {/* Hero Section */}
      <section className="h-bann theme-blue">
        <div className="h-bann__cont theme-border">
          <span></span>
          <div>
            <p className="h-bann__title" style={{ fontSize: '2.5rem', fontWeight: '300' }}>Sitemap</p>
          </div>
        </div>
      </section>

      {/* Main Navigation */}
      <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>
          {sitemapLinks.map((section, i) => (
            <div key={i}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '20px', color: '#000' }}>{section.title}</h2>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {section.links.map((link, j) => (
                  <li key={j} style={{ marginBottom: '10px' }}>
                    <Link to={`/${section.title.toLowerCase()}`} style={{ color: '#666', textDecoration: 'none' }}>{link}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Our Offices */}
      <div className="html-area" style={{ background: '#f5f5f5' }}>
        <h2 className="html-area__title">Our offices</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center', maxWidth: '800px', margin: '20px auto 0' }}>
          {offices.map((office, i) => (
            <span key={i} style={{ padding: '10px 20px', background: '#fff', border: '1px solid #ddd', fontSize: '0.875rem' }}>{office}</span>
          ))}
        </div>
      </div>

      {/* Legal Links */}
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <Link to="/privacy-policy" style={{ margin: '0 20px', color: '#000' }}>Privacy Policy</Link>
        <Link to="/terms-of-use" style={{ margin: '0 20px', color: '#000' }}>Terms of Use</Link>
        <Link to="/" style={{ margin: '0 20px', color: '#000' }}>Home</Link>
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

// ============= ABOUT PAGE =============
function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="h-bann theme-blue">
        <div className="h-bann__cont theme-border">
          <span></span>
          <div>
            <p className="h-bann__title" style={{ fontSize: '2.5rem', fontWeight: '300' }}>About us</p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <div className="html-area html-area--center">
        <div className="html-area__subtitle">OUR STORY</div>
        <h2 className="html-area__title">About Neptune Marine</h2>
        <div className="html-area__standfirst html-area__standfirst--center">
          <p>Neptune Marine is a premier luxury yacht charter and sales brokerage, specializing in bespoke maritime experiences and exclusive yacht transactions worldwide.</p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="html-area" style={{ background: '#f5f5f5', padding: '60px 20px' }}>
        <h2 className="html-area__title">Our Mission & Vision</h2>
        <div className="fifty-fifty fifty-fifty--margins">
          <div className="hwcc">
            <div className="hwcc__main hwcc__center">
              <h3 className="hwcc__title">Mission</h3>
              <p className="hwcc__summary">To provide unparalleled luxury yacht experiences through personalized service, expert knowledge, and access to the world's finest vessels.</p>
            </div>
          </div>
          <div className="hwcc">
            <div className="hwcc__main hwcc__center">
              <h3 className="hwcc__title">Vision</h3>
              <p className="hwcc__summary">To be the most trusted and innovative yacht brokerage, setting new standards for excellence in the global yachting industry.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Team */}
      <div className="html-area html-area--center">
        <h2 className="html-area__title">Our Expert Team</h2>
        <p className="html-area__standfirst">Our team of seasoned yacht professionals brings decades of combined experience to every charter and transaction.</p>
      </div>
      <div className="mgmt-grid">
        <div className="mgmt-card">
          <div className="mgmt-card__icon">⚓</div>
          <h3 className="mgmt-card__title">Charter Specialists</h3>
          <p className="mgmt-card__desc">Experts in matching clients with their perfect yacht charter experiences worldwide.</p>
        </div>
        <div className="mgmt-card">
          <div className="mgmt-card__icon">🏠</div>
          <h3 className="mgmt-card__title">Sales & Brokerage</h3>
          <p className="mgmt-card__desc">Specialists in yacht sales, acquisitions, and market analysis for buyers and sellers.</p>
        </div>
        <div className="mgmt-card">
          <div className="mgmt-card__icon">🔧</div>
          <h3 className="mgmt-card__title">Technical Services</h3>
          <p className="mgmt-card__desc">Full-service yacht maintenance, refits, and technical support for optimal performance.</p>
        </div>
        <div className="mgmt-card">
          <div className="mgmt-card__icon">📊</div>
          <h3 className="mgmt-card__title">Operations & Logistics</h3>
          <p className="mgmt-card__desc">Seamless coordination of itineraries, provisions, and on-water support for flawless execution.</p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="html-area">
        <h2 className="html-area__title">Why Choose Neptune Marine?</h2>
        <div className="fifty-fifty fifty-fifty--margins">
          <div className="hwcc">
            <div className="hwcc__main hwcc__center">
              <h3 className="hwcc__title">Global Network</h3>
              <p className="hwcc__summary">Access to exclusive yachts and destinations through our worldwide partnerships and relationships.</p>
            </div>
          </div>
          <div className="hwcc">
            <div className="hwcc__main hwcc__center">
              <h3 className="hwcc__title">Personalized Service</h3>
              <p className="hwcc__summary">Tailored experiences from initial inquiry to post-charter follow-up, ensuring every detail exceeds expectations.</p>
            </div>
          </div>
        </div>
        <div className="fifty-fifty fifty-fifty--margins fifty-fifty--mt-0">
          <div className="hwcc">
            <div className="hwcc__main hwcc__center">
              <h3 className="hwcc__title">Transparent Pricing</h3>
              <p className="hwcc__summary">Clear, upfront pricing with no hidden fees. Our 10% markup is openly disclosed for complete transparency.</p>
            </div>
          </div>
          <div className="hwcc">
            <div className="hwcc__main hwcc__center">
              <h3 className="hwcc__title">Crypto-Friendly</h3>
              <p className="hwcc__summary">Seamless cryptocurrency payments for secure, fast, and private transactions worldwide.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="html-area html-area--center" style={{ background: '#f5f5f5' }}>
        <h2 className="html-area__title">Client Testimonials</h2>
        <p className="html-area__standfirst">Hear from our satisfied clients about their Neptune Marine experiences.</p>
      </div>
      <div className="dtd">
        <div className="dtd__inner">
          <div className="dtd__content">
            <h2 className="dtd__title">Exceptional Service</h2>
            <p className="dtd__subtitle">"From the first contact to the final farewell, Neptune Marine delivered a flawless charter experience. The yacht was immaculate, the crew professional, and the itinerary perfectly tailored to our desires."</p>
          </div>
          <div className="dtd__grid">
            <div className="dtd__section">
              <h3 className="dtd__section-title">Charter Experience</h3>
              <p>5-star ratings for service, vessel quality, and itinerary planning across all major yachting destinations.</p>
            </div>
            <div className="dtd__section">
              <h3 className="dtd__section-title">Sales Expertise</h3>
              <p>Proven track record in yacht sales with clients ranging from first-time buyers to seasoned yacht owners.</p>
            </div>
            <div className="dtd__section">
              <h3 className="dtd__section-title">Technical Excellence</h3>
              <p>Award-winning maintenance and refit services ensuring vessels are always in peak condition.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
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
             <Route path="/about" element={<AboutPage />} />
             <Route path="/charter" element={<CharterPage />} />
            <Route path="/charter/yachts" element={<CharterPage />} />
            <Route path="/charter/yachts-for-charter" element={<CharterPage />} />
            <Route path="/charter/inspiration" element={<CharterInspirationPage />} />
            <Route path="/charter/destinations" element={<DestinationsPage />} />
            <Route path="/charter/destinations/:region" element={<DestinationsPage />} />
            <Route path="/charter/new-to-charter" element={<CharterPage />} />
            <Route path="/charter/corporate-yacht-charter" element={<CharterPage />} />
            <Route path="/charter/*" element={<CharterPage />} />
            
            <Route path="/buy" element={<BuyPage />} />
            <Route path="/buy-a-yacht" element={<BuyPage />} />
            <Route path="/buy-a-yacht/yachts-for-sale" element={<BuyPage />} />
            <Route path="/sale" element={<SalePage />} />
            <Route path="/sell" element={<SalePage />} />
            <Route path="/sell-a-yacht" element={<SalePage />} />
            
            <Route path="/build" element={<BuildPage />} />
            <Route path="/build-a-yacht" element={<BuildPage />} />
            <Route path="/build-a-yacht/technical-services" element={<BuildPage />} />
            <Route path="/build-a-yacht/shipyards" element={<BuildPage />} />
            
            <Route path="/manage" element={<ManagementPage />} />
            <Route path="/management" element={<ManagementPage />} />
            <Route path="/yacht-owner-services" element={<ManagementPage />} />
            <Route path="/yacht-owner-services/yacht-management" element={<ManagementPage />} />
            <Route path="/yacht-owner-services/charter-management" element={<ManagementPage />} />
            
            <Route path="/destinations" element={<DestinationsPage />} />
            <Route path="/enquire" element={<EnquirePage />} />
            <Route path="/contact" element={<EnquirePage />} />
            <Route path="/contact-us" element={<EnquirePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/account" element={<EnquirePage />} />
            
            <Route path="/privacy-policy" element={<PrivacyPage />} />
            <Route path="/terms-of-use" element={<TermsPage />} />
            <Route path="/sitemap" element={<SitemapPage />} />
            
            <Route path="/charter/yachts-for-charter/:slug" element={<YachtDetailPage />} />
            <Route path="/buy/yachts-for-sale/:slug" element={<YachtDetailPage />} />
            <Route path="/yacht/:slug" element={<YachtDetailPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;