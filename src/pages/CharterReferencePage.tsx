import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/charter-reference.css';

type Yacht = {
  id: string;
  name: string;
  image: string;
  length: string;
  guests: number;
  basePrice: number; // per week in USD
  currency: string;
  destination: string;
  slug: string;
  shortDesc: string;
};

const YACHTS: Yacht[] = [
  {
    id: 'joy',
    name: 'JOY',
    image: '/assets/reference/charter/imgi_13_joy_00007704_vb1014912_3840x2560.jpg',
    length: '48m',
    guests: 10,
    basePrice: 70000,
    currency: 'USD',
    destination: 'Mediterranean',
    slug: 'joy',
    shortDesc: 'Spacious superyacht perfect for Mediterranean cruises.'
  },
  {
    id: 'alvia',
    name: 'ALVIA',
    image: '/assets/reference/charter/imgi_26_alvia_10000956_vb5273762.jpg',
    length: '55m',
    guests: 12,
    basePrice: 85000,
    currency: 'USD',
    destination: 'Mediterranean',
    slug: 'alvia',
    shortDesc: 'Elegant yacht with contemporary interiors.'
  },
  {
    id: 'synthesis',
    name: 'SYNTHESIS',
    image: '/assets/reference/charter/imgi_17_synthesis_10000180_vb5700849_3200x2134.jpg',
    length: '62m',
    guests: 14,
    basePrice: 120000,
    currency: 'USD',
    destination: 'Caribbean',
    slug: 'synthesis',
    shortDesc: 'Award-winning motor yacht for ultimate comfort.'
  }
];

function formatCurrency(value: number, currency = 'USD') {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value);
}

function applyMarkup(value: number, percent = 10) {
  return Math.round(value * (1 + percent / 100));
}

const CharterReferencePage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [destination, setDestination] = useState('');
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');

  useEffect(() => {
    document.title = 'Charter — Neptune Marine | The Ultimate Standard in Luxury Yachting';

    const setMeta = (selector: string, attr: string, value: string) => {
      const exists = document.querySelector(selector) as HTMLMetaElement | null;
      if (exists) {
        exists.setAttribute(attr, value);
      } else {
        const m = document.createElement('meta');
        if (selector.startsWith('meta[property')) {
          m.setAttribute('property', 'og:title');
          m.setAttribute('content', value);
        } else {
          m.setAttribute('name', 'description');
          m.setAttribute('content', value);
        }
        document.head.appendChild(m);
      }
    };

    setMeta('meta[name="description"]', 'content', 'Charter world-class yachts with Neptune Marine. Prices include a transparent 10% service markup; deposits accepted in crypto.');
    setMeta('meta[property="og:title"]', 'content', 'Charter — Neptune Marine');
    setMeta('meta[property="og:description"]', 'content', 'The Ultimate Standard in Luxury Yachting — handpicked yachts for charter worldwide.');

    // og:image: first yacht image if present
    const ogImageSelector = 'meta[property="og:image"]';
    const existingOgImage = document.querySelector(ogImageSelector) as HTMLMetaElement | null;
    const ogImage = YACHTS[0]?.image || '/assets/images/home/fifty-charter.jpg';
    if (existingOgImage) existingOgImage.setAttribute('content', ogImage);
    else {
      const m = document.createElement('meta');
      m.setAttribute('property', 'og:image');
      m.setAttribute('content', ogImage);
      document.head.appendChild(m);
    }
  }, []);

  const destinations = useMemo(() => Array.from(new Set(YACHTS.map(y => y.destination))), []);

  const filtered = useMemo(() => {
    return YACHTS.filter(y => {
      if (destination && y.destination !== destination) return false;
      if (query && !(`${y.name} ${y.shortDesc} ${y.destination}`.toLowerCase().includes(query.toLowerCase()))) return false;
      const priceWithMarkup = applyMarkup(y.basePrice);
      if (minPrice !== '' && priceWithMarkup < Number(minPrice)) return false;
      if (maxPrice !== '' && priceWithMarkup > Number(maxPrice)) return false;
      return true;
    });
  }, [destination, query, minPrice, maxPrice]);

  return (
    <main className="charter-ref-page" aria-label="Charter page">
      <section className="charter-hero" role="banner">
        <video className="charter-hero__video" autoPlay muted loop playsInline poster="/assets/reference/charter/imgi_25_hero-3.jpg">
          <source src="/assets/reference/charter/Superyachts Luxury Mega Yachts for Sale Charter Burgess.mp4" type="video/mp4" />
        </video>
        <div className="charter-hero__overlay">
          <div className="container">
            <h1 className="charter-hero__title">Charter</h1>
            <p className="charter-hero__subtitle">The Ultimate Standard in Luxury Yachting</p>
          </div>
        </div>
      </section>

      <nav className="charter-subnav" aria-label="Charter sub-navigation">
        <div className="container">
          <Link to="/charter" className="charter-subnav__link">Yachts for Charter</Link>
          <Link to="/destinations" className="charter-subnav__link">Destinations</Link>
          <Link to="/new-to-charter" className="charter-subnav__link">New to charter</Link>
          <Link to="/corporate" className="charter-subnav__link">Corporate</Link>
        </div>
      </nav>

      <section className="charter-filters">
        <div className="container charter-filters__inner">
          <div className="filter-group">
            <label htmlFor="dest">Destination</label>
            <select id="dest" value={destination} onChange={e => setDestination(e.target.value)} aria-label="Select destination">
              <option value="">All destinations</option>
              {destinations.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="search">Search</label>
            <input id="search" type="search" placeholder="Search yachts" value={query} onChange={e => setQuery(e.target.value)} aria-label="Search yachts" />
          </div>

          <div className="filter-group">
            <label>Price (USD)</label>
            <div className="price-inputs">
              <input type="number" placeholder="Min" value={minPrice as any} onChange={e => setMinPrice(e.target.value === '' ? '' : Number(e.target.value))} aria-label="Minimum price" />
              <span className="price-sep">—</span>
              <input type="number" placeholder="Max" value={maxPrice as any} onChange={e => setMaxPrice(e.target.value === '' ? '' : Number(e.target.value))} aria-label="Maximum price" />
            </div>
          </div>

          <div className="filter-actions">
            <button className="btn" onClick={() => { setQuery(''); setDestination(''); setMinPrice(''); setMaxPrice(''); }} aria-label="Reset filters">Reset</button>
          </div>
        </div>
      </section>

      <section className="charter-grid">
        <div className="container">
          <div className="grid">
            {filtered.map(y => {
              const priceWithMarkup = applyMarkup(y.basePrice);
              return (
                <article className="card" key={y.id} aria-labelledby={`yacht-${y.id}`}>
                  <img src={y.image} alt={`${y.name} yacht`} loading="lazy" />
                  <div className="card-body">
                    <h3 id={`yacht-${y.id}`}>{y.name}</h3>
                    <p className="muted">{y.length} • Sleeps {y.guests} • {y.destination}</p>
                    <p className="card-desc">{y.shortDesc}</p>
                    <div className="card-footer">
                      <div className="price">
                        <span className="price-main">From {formatCurrency(priceWithMarkup, y.currency)}</span>
                        <span className="price-sub">({formatCurrency(y.basePrice, y.currency)} + 10% service fee)</span>
                      </div>
                      <div className="card-actions">
                        <Link to={`/yacht/${y.slug}`} className="btn btn--ghost">View details</Link>
                        <a className="btn" href={`mailto:ale.catalani@neptunemarine.vip?subject=Enquiry%20about%20${encodeURIComponent(y.name)}`} aria-label={`Enquire about ${y.name}`}>Enquire</a>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="charter-cta">
        <div className="container">
          <p className="muted">Deposit: 10% (crypto accepted). For bespoke requests contact <a href="mailto:ale.catalani@neptunemarine.vip">ale.catalani@neptunemarine.vip</a></p>
        </div>
      </section>
    </main>
  );
};

export default CharterReferencePage;
