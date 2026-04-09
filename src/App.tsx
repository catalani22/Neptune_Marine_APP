import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, Search, ChevronDown, Star, Globe, Shield, CreditCard, Bitcoin, MapPin, Ship, Users, Calendar, ArrowRight } from 'lucide-react';
import { Footer } from './components/layout/Header';
import { SearchPage } from './pages/SearchPage';
import { YachtDetailPage } from './pages/YachtDetailPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

// ============= HERO SECTION =============
function Hero() {
  const destinations = [
    { name: 'Mediterranean', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80' },
    { name: 'Caribbean', image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=80' },
    { name: 'Maldives', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80' },
    { name: 'South East Asia', image: 'https://images.unsplash.com/photo-1533558701576-90c0f39f6762?w=800&q=80' },
  ];

  return (
    <section className="relative h-screen">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1920&q=80" 
          alt="Luxury Yacht"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-white px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4 animate-fade-in-up">
            <span className="px-3 py-1 bg-[#c9a227] text-xs uppercase tracking-widest">
              Luxury Yacht Charter
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-serif font-medium mb-6 animate-fade-in-up delay-100">
            Experience the <span className="gold-text">Extraordinary</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto animate-fade-in-up delay-200">
            From the sun-drenched Mediterranean to the pristine waters of the Maldives. 
            Your luxury yachting adventure awaits.
          </p>

          {/* Crypto Payment Badge - Global Charter style */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-up delay-300">
            <div className="crypto-badge">
              <Bitcoin className="w-4 h-4" />
              Pay with Crypto
            </div>
            <div className="crypto-badge">
              <Shield className="w-4 h-4" />
              Secure Booking
            </div>
            <div className="crypto-badge">
              <CreditCard className="w-4 h-4" />
              10% Pre-reserve
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-400">
            <Link to="/charter" className="btn-gold text-lg px-8 py-4">
              Explore Yachts
            </Link>
            <Link to="/cabin-cruise" className="btn-outline text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-[#1a1a1a]">
              Cabin Cruises
            </Link>
          </div>
        </div>

        {/* Destination Pills - Global Charter style */}
        <div className="absolute bottom-8 left-0 right-0">
          <div className="flex flex-wrap justify-center gap-4">
            {destinations.map((dest, i) => (
              <Link 
                key={i} 
                to={`/charter/destinations/${dest.name.toLowerCase().replace(' ', '-')}`}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white text-sm hover:bg-white/20 transition-all"
              >
                <MapPin className="w-4 h-4" />
                {dest.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============= SERVICES SECTION =============
function Services() {
  const services = [
    {
      icon: <Ship className="w-10 h-10" />,
      title: 'Full Charter',
      description: 'Exclusive use of the entire yacht with professional crew',
      link: '/charter',
      cta: 'View Yachts'
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: 'Cabin Cruises',
      description: 'Luxury cabin charter - experience yachting from €1,800/week',
      link: '/cabin-cruise',
      cta: 'View Cruises'
    },
    {
      icon: <Star className="w-10 h-10" />,
      title: 'Yacht Sales',
      description: 'Curated selection of the finest superyachts for sale',
      link: '/sale',
      cta: 'View Collection'
    },
  ];

  return (
    <section className="py-24 bg-[#f5f5f0]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle mx-auto">
            Whether you seek the ultimate privacy of a full charter, the adventure of a cabin cruise, 
            or investing in a piece of maritime excellence - we deliver unparalleled luxury.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <div key={i} className="bg-white p-8 shadow-lg hover:shadow-2xl transition-all group">
              <div className="text-[#c9a227] mb-6">{service.icon}</div>
              <h3 className="text-2xl font-serif mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <Link 
                to={service.link} 
                className="inline-flex items-center gap-2 text-[#c9a227] font-medium group-hover:gap-3 transition-all"
              >
                {service.cta} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============= FEATURED YACHTS =============
function FeaturedYachts() {
  const yachts = [
    { name: 'AQUILA', location: 'Mediterranean', price: '€150,000', image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=80', specs: '60m • 12 Guests' },
    { name: 'OCTAVE', location: 'South East Asia', price: '€120,000', image: 'https://images.unsplash.com/photo-1609825488888-3a766db05542?w=800&q=80', specs: '55m • 10 Guests' },
    { name: 'GALAXY', location: 'West Mediterranean', price: '€180,000', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80', specs: '72m • 14 Guests' },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="section-title">Featured Yachts</h2>
            <p className="section-subtitle">Handpicked selection of the finest vessels</p>
          </div>
          <Link to="/charter" className="hidden md:flex items-center gap-2 text-[#c9a227] font-medium hover:underline">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {yachts.map((yacht, i) => (
            <Link key={i} to={`/yacht/${yacht.name.toLowerCase()}`} className="yacht-card img-zoom-hover group">
              <div className="relative h-72">
                <img src={yacht.image} alt={yacht.name} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 bg-[#c9a227] text-white text-xs px-3 py-1 uppercase">
                  Available
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-[#c9a227] mb-2 flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {yacht.location}
                </p>
                <h3 className="text-xl font-serif font-medium mb-2 group-hover:text-[#c9a227] transition-colors">
                  {yacht.name}
                </h3>
                <p className="text-gray-500 text-sm mb-4">{yacht.specs}</p>
                <div className="flex justify-between items-center border-t pt-4">
                  <span className="text-gray-500 text-sm">Weekly Rate</span>
                  <span className="text-lg font-semibold">{yacht.price}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12 md:hidden">
          <Link to="/charter" className="btn-navy">
            View All Yachts
          </Link>
        </div>
      </div>
    </section>
  );
}

// ============= CABIN CRUISES PREVIEW =============
function CabinCruises() {
  const cruises = [
    { route: 'Mediterranean Adventure', duration: '7 days', price: '€1,800', ports: 'Athens → Dubrovnik', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80' },
    { route: 'Caribbean Paradise', duration: '7 days', price: '€2,200', ports: 'St. Martin → Antigua', image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=80' },
    { route: 'Maldives Escape', duration: '10 days', price: '€2,800', ports: 'Male → Baa Atoll', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80' },
    { route: 'Greek Islands', duration: '7 days', price: '€1,900', ports: 'Mykonos → Santorini', image: 'https://images.unsplash.com/photo-1533558701576-90c0f39f6762?w=800&q=80' },
  ];

  return (
    <section className="py-24 bg-[#1a1a1a] text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-[#c9a227] uppercase tracking-widest text-sm">From €1,800/person</span>
          <h2 className="text-4xl md:text-5xl font-serif mt-4 mb-6">Cabin Cruises</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Experience the luxury of superyachting without the cost of a private charter. 
            Share unforgettable moments with fellow travelers on curated itineraries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cruises.map((cruise, i) => (
            <Link key={i} to={`/cabin/${cruise.route.toLowerCase().replace(' ', '-')}`} className="group">
              <div className="relative h-64 mb-4 overflow-hidden">
                <img src={cruise.image} alt={cruise.route} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-sm text-white/80">{cruise.duration}</p>
                </div>
              </div>
              <h3 className="text-lg font-serif mb-2 group-hover:text-[#c9a227] transition-colors">{cruise.route}</h3>
              <div className="flex justify-between text-sm text-white/60">
                <span>{cruise.ports}</span>
                <span className="text-[#c9a227]">From {cruise.price}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/cabin-cruise" className="btn-gold-outline border-white text-white hover:bg-white hover:text-[#1a1a1a]">
            View All Cruises
          </Link>
        </div>
      </div>
    </section>
  );
}

// ============= WHY CHOOSE US =============
function WhyChooseUs() {
  const features = [
    { icon: <Shield className="w-8 h-8" />, title: 'Secure Payments', desc: 'Blockchain-secured crypto transactions with instant confirmation' },
    { icon: <Globe className="w-8 h-8" />, title: 'Global Fleet', desc: 'Access to 1000+ yachts from world-leading operators' },
    { icon: <Star className="w-8 h-8" />, title: 'Best Prices', desc: 'Curated selection with exclusive preferential rates' },
    { icon: <Calendar className="w-8 h-8" />, title: 'Instant Booking', desc: 'Pre-reserve with crypto, confirm within minutes' },
    { icon: <CreditCard className="w-8 h-8" />, title: 'Flexible Payment', desc: 'Crypto (10%) or Card (full) - you choose' },
    { icon: <Users className="w-8 h-8" />, title: 'Concierge Service', desc: '24/7 support in multiple languages' },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">Why Choose Neptune Marine</h2>
          <p className="section-subtitle mx-auto">
            We combine the prestige of Burgess with the innovation of crypto payments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div key={i} className="flex gap-4 p-6 hover:bg-gray-50 transition-colors">
              <div className="text-[#c9a227] flex-shrink-0">{feature.icon}</div>
              <div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============= CTA SECTION =============
function CTASection() {
  return (
    <section className="py-24 bg-[#1a1a1a] text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-serif mb-6">
          Ready for Your Next Adventure?
        </h2>
        <p className="text-white/70 text-lg mb-8">
          Join the future of yacht chartering. Pay with crypto, travel with style.
          <br />
          <span className="text-[#c9a227]">Pre-reserve with just 10%</span> and secure your dream voyage.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/charter" className="btn-gold text-lg">
            Start Searching
          </Link>
          <Link to="/enquire" className="btn-outline text-lg">
            Contact Us
          </Link>
        </div>

        {/* Payment Methods */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-sm text-white/50 mb-4">We accept</p>
          <div className="flex justify-center gap-6">
            <div className="flex items-center gap-2 text-white/60">
              <Bitcoin className="w-6 h-6" />
              <span>Bitcoin</span>
            </div>
            <div className="flex items-center gap-2 text-white/60">
              <CreditCard className="w-6 h-6" />
              <span>Card</span>
            </div>
            <div className="flex items-center gap-2 text-white/60">
              <Globe className="w-6 h-6" />
              <span>Bank Transfer</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============= NAVBAR =============
function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-serif font-bold tracking-wider text-white">
              NEPTUNE <span className="text-[#c9a227]">MARINE</span>
            </span>
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            <div className="relative group">
              <button className="nav-link flex items-center gap-1">
                Charter <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <Link to="/charter" className="block px-4 py-3 text-sm hover:bg-gray-50 border-b">Yachts for Charter</Link>
                <Link to="/charter/destinations" className="block px-4 py-3 text-sm hover:bg-gray-50 border-b">Destinations</Link>
                <Link to="/charter/new-to-charter" className="block px-4 py-3 text-sm hover:bg-gray-50">New to Charter</Link>
              </div>
            </div>
            
            <div className="relative group">
              <button className="nav-link flex items-center gap-1">
                Cabin Cruises <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <Link to="/cabin-cruise/mediterranean" className="block px-4 py-3 text-sm hover:bg-gray-50 border-b">Mediterranean</Link>
                <Link to="/cabin-cruise/caribbean" className="block px-4 py-3 text-sm hover:bg-gray-50 border-b">Caribbean</Link>
                <Link to="/cabin-cruise/maldives" className="block px-4 py-3 text-sm hover:bg-gray-50">Maldives</Link>
              </div>
            </div>
            
            <div className="relative group">
              <button className="nav-link flex items-center gap-1">
                Buy <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <Link to="/sale" className="block px-4 py-3 text-sm hover:bg-gray-50 border-b">Yachts for Sale</Link>
                <Link to="/sale/new-builds" className="block px-4 py-3 text-sm hover:bg-gray-50">New Builds</Link>
              </div>
            </div>
            
            <Link to="/sale" className="nav-link">Sell</Link>
            <Link to="/destinations" className="nav-link">Destinations</Link>
          </nav>
          
          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <button className="p-2 hover:text-[#c9a227] text-white">
              <Search className="w-5 h-5" />
            </button>
            <Link to="/enquire" className="btn-gold text-sm">
              Enquire Now
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button className="lg:hidden p-2 text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#1a1a1a] border-t border-white/10">
          <nav className="flex flex-col p-4 gap-2">
            <Link to="/charter" className="text-base font-medium text-white py-3 border-b border-white/10">Charter</Link>
            <Link to="/cabin-cruise" className="text-base font-medium text-white py-3 border-b border-white/10">Cabin Cruises</Link>
            <Link to="/sale" className="text-base font-medium text-white py-3 border-b border-white/10">Buy</Link>
            <Link to="/sale" className="text-base font-medium text-white py-3 border-b border-white/10">Sell</Link>
            <Link to="/destinations" className="text-base font-medium text-white py-3">Destinations</Link>
            <Link to="/enquire" className="btn-gold text-sm mt-4 text-center">Enquire Now</Link>
          </nav>
        </div>
      )}
    </header>
  );
}

// ============= PAGES =============

function CharterPage() {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="section-title">Luxury Yacht Charter</h1>
        <p className="section-subtitle">Experience the world's most exclusive superyachts</p>
        
        <div className="flex flex-wrap gap-3 mb-8">
          <button className="filter-btn filter-btn-active">All</button>
          <button className="filter-btn">Motor</button>
          <button className="filter-btn">Sailing</button>
          <button className="filter-btn">Available Now</button>
        </div>
        
        <FeaturedYachts />
      </div>
    </div>
  );
}

function CabinCruisePage() {
  const cruises = [
    { route: 'Mediterranean', duration: '7 days', price: 1800, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80' },
    { route: 'Caribbean', duration: '7 days', price: 2200, image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=80' },
    { route: 'Maldives', duration: '10 days', price: 2800, image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80' },
    { route: 'Greek Islands', duration: '7 days', price: 1900, image: 'https://images.unsplash.com/photo-1533558701576-90c0f39f6762?w=800&q=80' },
  ];

  return (
    <div className="pt-32 pb-20 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="section-title">Cabin Cruises</h1>
        <p className="section-subtitle">Luxury cabin charters - your gateway to exclusive yacht experiences</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cruises.map((cruise, i) => (
            <Link key={i} to={`/cabin/${cruise.route.toLowerCase()}`} className="yacht-card img-zoom-hover flex">
              <div className="w-2/5">
                <img src={cruise.image} alt={cruise.route} className="w-full h-full object-cover" />
              </div>
              <div className="w-3/5 p-6">
                <h3 className="text-xl font-serif">{cruise.route}</h3>
                <p className="text-gray-500 text-sm">{cruise.duration}</p>
                <div className="flex justify-between items-end mt-4">
                  <div>
                    <span className="text-xs text-gray-500 block">From</span>
                    <span className="text-xl text-[#c9a227] font-semibold">€{cruise.price}/person</span>
                  </div>
                  <Link to={`/cabin/${cruise.route.toLowerCase()}`} className="btn-gold text-sm">Details</Link>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function SalePage() {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="section-title">Yachts for Sale</h1>
        <p className="section-subtitle">Curated selection of the finest superyachts</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="yacht-card img-zoom-hover">
              <div className="h-64 bg-gray-200">
                <img src={`https://images.unsplash.com/photo-1609825488888-3a766db05542?w=800&q=80`} alt="Yacht" className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif mb-2">Motor Yacht {i}</h3>
                <p className="text-gray-500 text-sm mb-4">{80 + i}m • 2022 • 12 Cabins</p>
                <div className="border-t pt-4">
                  <span className="text-gray-500 text-sm">Price on request</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EnquirePage() {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="section-title text-center">Enquire Now</h1>
        <p className="section-subtitle text-center">Tell us about your dream yachting experience</p>
        
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">First Name *</label>
              <input type="text" className="w-full px-4 py-3 border border-gray-300 focus:border-[#c9a227] focus:outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Last Name *</label>
              <input type="text" className="w-full px-4 py-3 border border-gray-300 focus:border-[#c9a227] focus:outline-none" required />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Email *</label>
              <input type="email" className="w-full px-4 py-3 border border-gray-300 focus:border-[#c9a227] focus:outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <input type="tel" className="w-full px-4 py-3 border border-gray-300 focus:border-[#c9a227] focus:outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Interest *</label>
            <select className="w-full px-4 py-3 border border-gray-300 focus:border-[#c9a227] focus:outline-none">
              <option>Charter</option>
              <option>Cabin Cruise</option>
              <option>Buy</option>
              <option>Sell</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Message</label>
            <textarea rows={5} className="w-full px-4 py-3 border border-gray-300 focus:border-[#c9a227] focus:outline-none"></textarea>
          </div>
          <button type="submit" className="btn-gold w-full">Send Enquiry</button>
        </form>
      </div>
    </div>
  );
}

function DestinationsPage() {
  const destinations = [
    { name: 'Mediterranean', count: 450, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80' },
    { name: 'Caribbean', count: 320, image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=80' },
    { name: 'Maldives', count: 180, image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80' },
    { name: 'South East Asia', count: 250, image: 'https://images.unsplash.com/photo-1533558701576-90c0f39f6762?w=800&q=80' },
  ];

  return (
    <div className="pt-32 pb-20 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="section-title">Destinations</h1>
        <p className="section-subtitle">Explore luxury yacht charters in the world's most beautiful destinations</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {destinations.map((dest, i) => (
            <Link key={i} to={`/charter/destinations/${dest.name.toLowerCase().replace(' ', '-')}`} className="relative h-64 group overflow-hidden">
              <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-serif">{dest.name}</h3>
                <p className="text-white/80">{dest.count} yachts available</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============= MAIN APP =============
function Home() {
  return (
    <>
      <Hero />
      <Services />
      <FeaturedYachts />
      <CabinCruises />
      <WhyChooseUs />
      <CTASection />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/charter" element={<CharterPage />} />
              <Route path="/charter/*" element={<CharterPage />} />
              <Route path="/cabin-cruise" element={<CabinCruisePage />} />
              <Route path="/cabin-cruise/*" element={<CabinCruisePage />} />
              <Route path="/sale" element={<SalePage />} />
              <Route path="/buy" element={<SalePage />} />
              <Route path="/sell" element={<SalePage />} />
              <Route path="/destinations" element={<DestinationsPage />} />
              <Route path="/enquire" element={<EnquirePage />} />
              <Route path="/contact" element={<EnquirePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/yacht/:slug" element={<YachtDetailPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
