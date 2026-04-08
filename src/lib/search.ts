import { supabase } from './supabase';

export interface VesselFilters {
  // Categorization
  type?: 'CABIN_CHART' | 'FULL_CHARTER' | 'SALE' | 'DAY_CHART';
  yachtType?: string;
  charterType?: string;
  
  // Specs
  minLength?: number;
  maxLength?: number;
  minYear?: number;
  maxYear?: number;
  minCabins?: number;
  maxCabins?: number;
  minGuests?: number;
  maxGuests?: number;
  
  // Location
  region?: string;
  location?: string;
  departurePort?: string;
  operatingArea?: string;
  destination?: string;
  
  // Price
  minPrice?: number;
  maxPrice?: number;
  currency?: string;
  
  // Features
  features?: string[];
  amenities?: string[];
  waterToys?: string[];
  
  // Availability
  isAvailable?: boolean;
  availableFrom?: Date;
  availableTo?: Date;
  
  // Source
  source?: string;
  
  // Search
  search?: string;
  
  // Sorting
  sortBy?: 'price' | 'length' | 'year' | 'title' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  
  // Pagination
  page?: number;
  perPage?: number;
}

export interface SearchResult {
  vessels: any[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
  facets: {
    regions: { name: string; count: number }[];
    locations: { name: string; count: number }[];
    yachtTypes: { name: string; count: number }[];
    charterTypes: { name: string; count: number }[];
    priceRanges: { min: number; max: number; count: number }[];
    lengthRanges: { min: number; max: number; count: number }[];
  };
}

export async function searchVessels(filters: VesselFilters = {}): Promise<SearchResult> {
  const {
    type,
    yachtType,
    charterType,
    minLength,
    maxLength,
    minYear,
    maxYear,
    minCabins,
    maxCabins,
    minGuests,
    maxGuests,
    region,
    location,
    departurePort,
    operatingArea,
    destination,
    minPrice,
    maxPrice,
    currency,
    features,
    amenities,
    waterToys,
    isAvailable = true,
    source,
    search,
    sortBy = 'createdAt',
    sortOrder = 'desc',
    page = 1,
    perPage = 12,
  } = filters;

  let query = supabase.from('vessels').select('*', { count: 'exact' });

  // Apply filters
  if (type) query = query.eq('type', type);
  if (yachtType) query = query.eq('yacht_type', yachtType);
  if (charterType) query = query.eq('charter_type', charterType);
  
  if (minLength) query = query.gte('length', minLength);
  if (maxLength) query = query.lte('length', maxLength);
  if (minYear) query = query.gte('year', minYear);
  if (maxYear) query = query.lte('year', maxYear);
  if (minCabins) query = query.gte('cabins', minCabins);
  if (maxCabins) query = query.lte('cabins', maxCabins);
  if (minGuests) query = query.gte('guests', minGuests);
  if (maxGuests) query = query.lte('guests', maxGuests);
  
  if (region) query = query.ilike('region', `%${region}%`);
  if (location) query = query.ilike('location', `%${location}%`);
  if (departurePort) query = query.eq('departure_port', departurePort);
  if (operatingArea) query = query.contains('operating_areas', [operatingArea]);
  if (destination) query = query.contains('destinations', [destination]);
  
  if (minPrice) query = query.gte('base_price', minPrice);
  if (maxPrice) query = query.lte('base_price', maxPrice);
  if (currency) query = query.eq('currency', currency);
  
  if (features?.length) query = query.contains('features', features);
  if (amenities?.length) query = query.contains('amenities', amenities);
  if (waterToys?.length) query = query.contains('water_toys', waterToys);
  
  if (isAvailable !== undefined) query = query.eq('is_available', isAvailable);
  if (source) query = query.eq('source', source);
  
  // Text search
  if (search) {
    query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%,location.ilike.%${search}%,region.ilike.%${search}%`);
  }

  // Sorting
  const sortColumn = {
    price: 'base_price',
    length: 'length',
    year: 'year',
    title: 'title',
    createdAt: 'created_at',
  }[sortBy] || 'created_at';
  
  query = query.order(sortColumn, { ascending: sortOrder === 'asc' });

  // Pagination
  const start = (page - 1) * perPage;
  query = query.range(start, start + perPage - 1);

  const { data: vessels, count, error } = await query;

  if (error) {
    console.error('Search error:', error);
    throw error;
  }

  // Get facets for filter options
  const facets = await getFacets(filters);

  return {
    vessels: vessels || [],
    total: count || 0,
    page,
    perPage,
    totalPages: Math.ceil((count || 0) / perPage),
    facets,
  };
}

async function getFacets(_baseFilters: VesselFilters = {}): Promise<SearchResult['facets']> {
  // Get unique regions with counts
  const { data: regions } = await supabase
    .from('vessels')
    .select('region')
    .not('region', 'is', 'null')
    .neq('region', '');
  
  const regionCounts = new Map<string, number>();
  regions?.forEach((v: any) => {
    if (v.region) {
      regionCounts.set(v.region, (regionCounts.get(v.region) || 0) + 1);
    }
  });

  // Get unique locations with counts
  const { data: locations } = await supabase
    .from('vessels')
    .select('location')
    .not('location', 'is', 'null')
    .neq('location', '');
  
  const locationCounts = new Map<string, number>();
  locations?.forEach((v: any) => {
    if (v.location) {
      locationCounts.set(v.location, (locationCounts.get(v.location) || 0) + 1);
    }
  });

  // Get yacht types
  const { data: yachtTypes } = await supabase
    .from('vessels')
    .select('yacht_type')
    .not('yacht_type', 'is', 'null');
  
  const typeCounts = new Map<string, number>();
  yachtTypes?.forEach((v: any) => {
    if (v.yacht_type) {
      typeCounts.set(v.yacht_type, (typeCounts.get(v.yacht_type) || 0) + 1);
    }
  });

  // Get charter types
  const { data: charterTypes } = await supabase
    .from('vessels')
    .select('charter_type')
    .not('charter_type', 'is', 'null');
  
  const charterTypeCounts = new Map<string, number>();
  charterTypes?.forEach((v: any) => {
    if (v.charter_type) {
      charterTypeCounts.set(v.charter_type, (charterTypeCounts.get(v.charter_type) || 0) + 1);
    }
  });

  // Get price ranges
  const { data: priceData } = await supabase
    .from('vessels')
    .select('base_price')
    .gt('base_price', 0);
  
  const prices = priceData?.map((p: any) => p.base_price).filter(Boolean) || [];
  const priceRanges = calculateRanges(prices, 5);

  // Get length ranges
  const { data: lengthData } = await supabase
    .from('vessels')
    .select('length')
    .not('length', 'is', 'null')
    .gt('length', 0);
  
  const lengths = lengthData?.map((l: any) => l.length).filter(Boolean) || [];
  const lengthRanges = calculateRanges(lengths, 5);

  return {
    regions: Array.from(regionCounts.entries()).map(([name, count]) => ({ name, count })),
    locations: Array.from(locationCounts.entries()).map(([name, count]) => ({ name, count })),
    yachtTypes: Array.from(typeCounts.entries()).map(([name, count]) => ({ name, count })),
    charterTypes: Array.from(charterTypeCounts.entries()).map(([name, count]) => ({ name, count })),
    priceRanges,
    lengthRanges,
  };
}

function calculateRanges(values: number[], numRanges: number): { min: number; max: number; count: number }[] {
  if (values.length === 0) return [];
  
  const min = Math.min(...values);
  const max = Math.max(...values);
  const step = (max - min) / numRanges;
  
  const ranges: { min: number; max: number; count: number }[] = [];
  
  for (let i = 0; i < numRanges; i++) {
    const rangeMin = min + (step * i);
    const rangeMax = min + (step * (i + 1));
    const count = values.filter(v => v >= rangeMin && v < rangeMax).length;
    if (count > 0) {
      ranges.push({ min: Math.round(rangeMin), max: Math.round(rangeMax), count });
    }
  }
  
  return ranges;
}

// Quick search for autocomplete
export async function searchVesselsQuick(search: string, limit = 5): Promise<any[]> {
  const { data, error } = await supabase
    .from('vessels')
    .select('id, title, slug, images, location, region, base_price, currency')
    .or(`title.ilike.%${search}%,location.ilike.%${search}%,region.ilike.%${search}%`)
    .eq('is_available', true)
    .limit(limit);

  if (error) throw error;
  return data || [];
}

// Get single vessel by slug
export async function getVesselBySlug(slug: string): Promise<any | null> {
  const { data, error } = await supabase
    .from('vessels')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) return null;
  return data;
}

// Get related vessels
export async function getRelatedVessels(vesselId: string, limit = 4): Promise<any[]> {
  // For now, just get random available vessels
  const { data, error } = await supabase
    .from('vessels')
    .select('id, title, slug, images, location, region, base_price, currency')
    .eq('is_available', true)
    .neq('id', vesselId)
    .limit(limit);

  if (error) return [];
  return data || [];
}

// Get featured/popular vessels
export async function getFeaturedVessels(limit = 6): Promise<any[]> {
  const { data, error } = await supabase
    .from('vessels')
    .select('id, title, slug, images, location, region, base_price, currency, yacht_type, guests, cabins')
    .eq('is_available', true)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data || [];
}

// Get vessels by region
export async function getVesselsByRegion(region: string, limit = 12): Promise<any[]> {
  const { data, error } = await supabase
    .from('vessels')
    .select('id, title, slug, images, location, region, base_price, currency')
    .ilike('region', `%${region}%`)
    .eq('is_available', true)
    .limit(limit);

  if (error) throw error;
  return data || [];
}
