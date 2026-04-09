import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  MapPin, Ruler, Users, Anchor, ChevronLeft, ChevronRight, Heart, Share2, Loader2, CheckCircle, Bitcoin
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { formatPriceWithMarkup } from '../lib/booking';
import { CryptoCheckout } from '../components/checkout/CryptoCheckout';

interface Vessel {
  id: string;
  title: string;
  slug: string;
  description: string;
  short_description: string;
  images: string[];
  videos: string[];
  location: string;
  region: string;
  base_price: number;
  currency: string;
  length: number;
  guests: number;
  cabins: number;
  bathrooms: number;
  crew: number;
  yacht_type: string;
  charter_type: string;
  specs: Record<string, any>;
  features: string[];
  amenities: string[];
  water_toys: string[];
}

export function YachtDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [vessel, setVessel] = useState<Vessel | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showCheckout, setShowCheckout] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'features' | 'itinerary'>('overview');

  useEffect(() => {
    if (slug) fetchVessel(slug);
  }, [slug]);

  const fetchVessel = async (slug: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('vessels')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) throw error;
      setVessel(data);
    } catch (error) {
      console.error('Error fetching vessel:', error);
      navigate('/search');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#c9a227]" />
      </div>
    );
  }

  if (!vessel) return null;

  const prices = formatPriceWithMarkup(vessel.base_price, vessel.currency);
  const images = vessel.images?.length ? vessel.images : [
    'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1200&q=80'
  ];

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

  // Checkout Flow
  if (showCheckout) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <button 
            onClick={() => setShowCheckout(false)}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-6"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to yacht
          </button>
          <CryptoCheckout 
            vessel={{
              id: vessel.id,
              title: vessel.title,
              basePrice: vessel.base_price,
              currency: vessel.currency,
              images: images
            }}
            onSuccess={(booking) => {
              console.log('Booking confirmed:', booking);
            }}
            onCancel={() => setShowCheckout(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Image Gallery */}
      <div className="relative h-[60vh] md:h-[70vh] bg-gray-900">
        <img 
          src={images[currentImageIndex]} 
          alt={vessel.title}
          className="w-full h-full object-cover"
        />
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/40 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/40 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </>
        )}
        
        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 bg-black/50 px-3 py-1 rounded-full text-white text-sm">
          {currentImageIndex + 1} / {images.length}
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        
        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
          <div className="container mx-auto">
            <div className="flex items-center gap-2 text-sm mb-2 opacity-80">
              <MapPin className="w-4 h-4" />
              {vessel.region || vessel.location}
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-medium mb-4">{vessel.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm">
              {vessel.length && <span className="flex items-center gap-1"><Ruler className="w-4 h-4" /> {vessel.length}m</span>}
              {vessel.guests && <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {vessel.guests} Guests</span>}
              {vessel.cabins && <span className="flex items-center gap-1"><Anchor className="w-4 h-4" /> {vessel.cabins} Cabins</span>}
              {vessel.crew && <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {vessel.crew} Crew</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex border-b mb-6">
              {(['overview', 'specs', 'features', 'itinerary'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 text-sm font-medium capitalize border-b-2 transition-colors ${
                    activeTab === tab 
                      ? 'border-[#c9a227] text-[#c9a227]' 
                      : 'border-transparent text-muted-foreground hover:text-primary'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-medium mb-3">About this Yacht</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {vessel.description || vessel.short_description || `Experience the ultimate luxury aboard ${vessel.title}. This magnificent ${vessel.yacht_type?.replace('_', ' ').toLowerCase() || 'yacht'} offers unparalleled comfort and style for your charter experience.`}
                  </p>
                </div>
                
                {vessel.specs && Object.keys(vessel.specs).length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium mb-3">Specifications</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(vessel.specs).slice(0, 10).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b">
                          <span className="text-muted-foreground">{key}</span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="space-y-4">
                {[
                  { label: 'Length', value: `${vessel.length}m`, icon: Ruler },
                  { label: 'Guests', value: vessel.guests?.toString() || 'N/A', icon: Users },
                  { label: 'Cabins', value: vessel.cabins?.toString() || 'N/A', icon: Anchor },
                  { label: 'Crew', value: vessel.crew?.toString() || 'N/A', icon: Users },
                  { label: 'Bathrooms', value: vessel.bathrooms?.toString() || 'N/A', icon: Anchor },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <item.icon className="w-5 h-5 text-[#c9a227]" />
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="ml-auto font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'features' && (
              <div>
                {vessel.features?.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-3">Features</h3>
                    <div className="flex flex-wrap gap-2">
                      {vessel.features.map((feature, i) => (
                        <span key={i} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {vessel.amenities?.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-3">Amenities</h3>
                    <div className="flex flex-wrap gap-2">
                      {vessel.amenities.map((item, i) => (
                        <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {vessel.water_toys?.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium mb-3">Water Toys</h3>
                    <div className="flex flex-wrap gap-2">
                      {vessel.water_toys.map((toy, i) => (
                        <span key={i} className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                          {toy}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'itinerary' && (
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium mb-4">Sample Itinerary</h3>
                <p className="text-muted-foreground mb-4">
                  Custom itineraries can be arranged based on your preferences and destination.
                </p>
                <div className="space-y-4">
                  {['Day 1: Arrival & Welcome', 'Day 2-3: Exploring Islands', 'Day 4: Water Activities', 'Day 5: Departure'].map((day, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-[#c9a227] rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {i + 1}
                      </div>
                      <span>{day}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Booking */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-lg shadow-lg p-6">
              <div className="mb-4">
                <p className="text-sm text-muted-foreground">From</p>
                <p className="text-3xl font-medium text-[#c9a227]">{prices.withMarkup}</p>
                <p className="text-xs text-muted-foreground">per week (incl. 10% service fee)</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Best Price Guarantee</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>24/7 Concierge</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Bitcoin className="w-4 h-4 text-orange-500" />
                  <span>Pay 10% in Crypto</span>
                </div>
              </div>

              <button
                onClick={() => setShowCheckout(true)}
                className="w-full py-4 bg-[#c9a227] text-white font-medium rounded-lg hover:bg-[#b8921f] transition-colors"
              >
                Reserve Now
              </button>

              <p className="text-xs text-center text-muted-foreground mt-4">
                Secure your booking with just 10% deposit
              </p>

              <div className="flex gap-2 mt-6 justify-center">
                <button className="p-2 border rounded-full hover:bg-gray-50">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="p-2 border rounded-full hover:bg-gray-50">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YachtDetailPage;