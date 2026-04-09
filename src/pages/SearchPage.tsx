import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, SlidersHorizontal, Ship, Anchor, Ruler, Users, MapPin, ChevronRight
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { formatPriceWithMarkup } from '../lib/booking';

interface Vessel {
  id: string;
  title: string;
  slug: string;
  images: string[];
  location: string;
  region: string;
  base_price: number;
  currency: string;
  length: number;
  guests: number;
  cabins: number;
  yacht_type: string;
  charter_type: string;
}

export function SearchPage() {
  const [vessels, setVessels] = useState<Vessel[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    region: '',
    yachtType: '',
    minPrice: '',
    maxPrice: '',
    minLength: '',
    maxLength: '',
    guests: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchVessels();
  }, []);

  const fetchVessels = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('vessels')
        .select('id, title, slug, images, location, region, base_price, currency, length, guests, cabins, yacht_type, charter_type')
        .eq('is_available', true)
        .order('created_at', { ascending: false })
        .limit(50);

      if (filters.search) {
        query = query.ilike('title', `%${filters.search}%`);
      }
      if (filters.region) {
        query = query.ilike('region', `%${filters.region}%`);
      }
      if (filters.yachtType) {
        query = query.eq('yacht_type', filters.yachtType);
      }
      if (filters.minPrice) {
        query = query.gte('base_price', parseFloat(filters.minPrice));
      }
      if (filters.maxPrice) {
        query = query.lte('base_price', parseFloat(filters.maxPrice));
      }
      if (filters.minLength) {
        query = query.gte('length', parseFloat(filters.minLength));
      }
      if (filters.maxLength) {
        query = query.lte('length', parseFloat(filters.maxLength));
      }
      if (filters.guests) {
        query = query.gte('guests', parseInt(filters.guests));
      }

      const { data, error } = await query;

      if (error) throw error;
      setVessels(data || []);
    } catch (error) {
      console.error('Error fetching vessels:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      region: '',
      yachtType: '',
      minPrice: '',
      maxPrice: '',
      minLength: '',
      maxLength: '',
      guests: '',
    });
  };

  const regions = [...new Set(vessels.map(v => v.region).filter(Boolean))];
  const yachtTypes = [...new Set(vessels.map(v => v.yacht_type).filter(Boolean))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-serif font-medium mb-6">Find Your Perfect Yacht</h1>
          
          {/* Search Bar */}
          <div className="flex gap-4 max-w-4xl">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, location..."
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
                className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-4 bg-white/20 rounded-lg hover:bg-white/30 flex items-center gap-2"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filters
            </button>
            <button
              onClick={fetchVessels}
              className="px-8 py-4 bg-[#c9a227] text-white font-medium rounded-lg hover:bg-[#b8921f]"
            >
              Search
            </button>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            {regions.slice(0, 6).map(region => (
              <button
                key={region}
                onClick={() => setFilters({...filters, region})}
                className={`px-4 py-2 rounded-full text-sm ${
                  filters.region === region 
                    ? 'bg-[#c9a227] text-white' 
                    : 'bg-white/20 hover:bg-white/30'
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="bg-white border-b p-6">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Advanced Filters</h3>
              <button onClick={clearFilters} className="text-sm text-blue-600 hover:underline">
                Clear All
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              <select
                value={filters.yachtType}
                onChange={(e) => setFilters({...filters, yachtType: e.target.value})}
                className="p-2 border rounded"
              >
                <option value="">All Types</option>
                {yachtTypes.map(t => (
                  <option key={t} value={t}>{t.replace('_', ' ')}</option>
                ))}
              </select>
              
              <select
                value={filters.minPrice}
                onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                className="p-2 border rounded"
              >
                <option value="">Min Price</option>
                <option value="10000">€10,000</option>
                <option value="25000">€25,000</option>
                <option value="50000">€50,000</option>
                <option value="100000">€100,000</option>
              </select>
              
              <select
                value={filters.maxPrice}
                onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                className="p-2 border rounded"
              >
                <option value="">Max Price</option>
                <option value="25000">€25,000</option>
                <option value="50000">€50,000</option>
                <option value="100000">€100,000</option>
                <option value="200000">€200,000</option>
              </select>
              
              <select
                value={filters.minLength}
                onChange={(e) => setFilters({...filters, minLength: e.target.value})}
                className="p-2 border rounded"
              >
                <option value="">Min Length</option>
                <option value="20">20m</option>
                <option value="30">30m</option>
                <option value="40">40m</option>
                <option value="50">50m</option>
              </select>
              
              <select
                value={filters.maxLength}
                onChange={(e) => setFilters({...filters, maxLength: e.target.value})}
                className="p-2 border rounded"
              >
                <option value="">Max Length</option>
                <option value="30">30m</option>
                <option value="40">40m</option>
                <option value="50">50m</option>
                <option value="100">100m</option>
              </select>
              
              <select
                value={filters.guests}
                onChange={(e) => setFilters({...filters, guests: e.target.value})}
                className="p-2 border rounded"
              >
                <option value="">Guests</option>
                <option value="6">6+</option>
                <option value="10">10+</option>
                <option value="12">12+</option>
                <option value="20">20+</option>
              </select>
              
              <button
                onClick={fetchVessels}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <p className="text-muted-foreground">
            {loading ? 'Searching...' : `${vessels.length} yachts found`}
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : vessels.length === 0 ? (
            <div className="text-center py-12">
            <Ship className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">No yachts found</h3>
            <p className="text-muted-foreground mb-6">Try adjusting your filters</p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {vessels.map((vessel) => {
              const prices = formatPriceWithMarkup(vessel.base_price, vessel.currency);
              
              return (
                <Link 
                  key={vessel.id} 
                  to={`/yacht/${vessel.slug}`}
                  className="bg-white rounded-lg overflow-hidden shadow hover:shadow-xl transition-all group"
                >
                  <div className="relative h-48 overflow-hidden">
                    {vessel.images?.[0] ? (
                      <img 
                        src={vessel.images[0]} 
                        alt={vessel.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <Ship className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                    <div className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full text-xs font-medium">
                      {vessel.yacht_type?.replace('_', ' ') || 'Yacht'}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-medium text-lg mb-1 line-clamp-1">{vessel.title}</h3>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <MapPin className="w-4 h-4" />
                      {vessel.region || vessel.location || 'Mediterranean'}
                    </div>
                    
                    <div className="flex gap-4 text-sm text-muted-foreground mb-4">
                      {vessel.length && (
                        <span className="flex items-center gap-1">
                          <Ruler className="w-4 h-4" />
                          {vessel.length}m
                        </span>
                      )}
                      {vessel.guests && (
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {vessel.guests} guests
                        </span>
                      )}
                      {vessel.cabins && (
                        <span className="flex items-center gap-1">
                          <Anchor className="w-4 h-4" />
                          {vessel.cabins} cabins
                        </span>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-xs text-muted-foreground">From</p>
                        <p className="text-lg font-medium text-[#c9a227]">
                          {prices.withMarkup}
                        </p>
                      </div>
                      <span className="text-[#c9a227] text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                        View 
                        <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchPage;