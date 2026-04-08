import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { ArrowRight, Anchor, TrendingUp, Shield, Zap } from 'lucide-react';
import { listVessels } from '../../lib/client';
import type { Vessel } from '../../types';

// Hero Section
export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center hero-gradient">
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-serif font-medium text-white mb-6 leading-tight">
          Experience the <span className="text-[#c9a227]">Extraordinary</span>
        </h1>
        <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
          Exclusive yacht charters, cabin cruises, and sales. 
          Secure your voyage with the future of payment.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/charter" className="btn-gold text-lg">
            Explore Charters
          </Link>
          <Link to="/cabin-cruise" className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 font-medium tracking-wide hover:bg-white/20 transition-all border border-white/30">
            Cabin Cruises
          </Link>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowRight className="w-6 h-6 text-white/60 rotate-90" />
      </div>
    </section>
  );
}

// Features Section
export function Features() {
  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Secure Payments',
      description: 'Blockchain-secured transactions with instant confirmation'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Instant Booking',
      description: 'Pre-reserve with crypto, confirm within minutes'
    },
    {
      icon: <Anchor className="w-8 h-8" />,
      title: 'Global Fleet',
      description: 'Access to 1000+ yachts from world-leading operators'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Best Prices',
      description: 'Curated selection with exclusive preferential rates'
    },
  ];
  
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <div key={i} className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#c9a227]/10 text-[#c9a227] mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Featured Yachts
export function FeaturedYachts() {
  const { data: vessels, isLoading } = useQuery({
    queryKey: ['vessels', 'charter'],
    queryFn: () => listVessels({ type: 'FULL_CHARTER' }),
    staleTime: 5 * 60 * 1000,
  });
  
  return (
    <section className="py-20 bg-[#f5f5f0]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="section-title">Featured Yachts</h2>
            <p className="text-gray-600 mt-2">Handpicked selection of the finest vessels</p>
          </div>
          <Link to="/charter" className="hidden md:flex items-center gap-2 text-[#c9a227] font-medium hover:underline">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-gray-200 h-96 animate-pulse" />
            ))}
          </div>
        ) : vessels && vessels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {vessels.slice(0, 6).map(vessel => (
              <YachtCard key={vessel.id} vessel={vessel} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <YachtCardSkeleton key={i} />
            ))}
          </div>
        )}
        
        <div className="text-center mt-12 md:hidden">
          <Link to="/charter" className="btn-primary">
            View All Yachts
          </Link>
        </div>
      </div>
    </section>
  );
}

// Yacht Card Component
interface YachtCardProps {
  vessel: Vessel;
}

function YachtCard({ vessel }: YachtCardProps) {
  const image = vessel.images?.[0] || 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=80';
  
  return (
    <Link to={`/yacht/${vessel.slug}`} className="yacht-card group overflow-hidden">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={image} 
          alt={vessel.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 bg-[#c9a227] text-white text-xs px-3 py-1 uppercase tracking-wide">
          {vessel.source}
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-sm text-[#c9a227] mb-2">{vessel.location || 'Mediterranean'}</p>
        <h3 className="text-lg font-serif font-medium mb-2 line-clamp-1">{vessel.title}</h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
          {vessel.shortDescription || 'Luxury motor yacht available for charter'}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          {vessel.specs?.length && <span>{vessel.specs.length}m</span>}
          {vessel.specs?.guests && <span>{vessel.specs.guests} Guests</span>}
        </div>
        
        <div className="flex items-baseline justify-between border-t pt-4">
          <span className="text-gray-500 text-sm">From</span>
          <span className="text-lg font-semibold">
            €{vessel.basePrice.toLocaleString()}
            <span className="text-gray-400 font-normal text-sm"> / {vessel.currency}</span>
          </span>
        </div>
      </div>
    </Link>
  );
}

function YachtCardSkeleton() {
  return (
    <div className="bg-white shadow-md overflow-hidden">
      <div className="h-64 bg-gray-200 animate-pulse" />
      <div className="p-6">
        <div className="h-4 w-16 bg-gray-200 mb-2 animate-pulse" />
        <div className="h-6 w-3/4 bg-gray-200 mb-2 animate-pulse" />
        <div className="h-4 w-full bg-gray-200 mb-4 animate-pulse" />
        <div className="flex justify-between">
          <div className="h-4 w-12 bg-gray-200 animate-pulse" />
          <div className="h-4 w-20 bg-gray-200 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

// CTA Section
export function CTASection() {
  return (
    <section className="py-20 bg-[#0f172a] text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-serif mb-6">
          Ready for Your Next Adventure?
        </h2>
        <p className="text-gray-300 mb-8 text-lg">
          Join the future of yacht chartering. Pay with crypto, travel with style.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/charter" className="btn-gold text-lg">
            Start Searching
          </Link>
          <Link to="/contact" className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 font-medium hover:bg-white/20 transition-all border border-white/30">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
