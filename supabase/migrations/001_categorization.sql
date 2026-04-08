-- Update vessels table with new categorization fields
-- Run this in Supabase SQL Editor

-- Add new columns for categorization
ALTER TABLE vessels ADD COLUMN IF NOT EXISTS yacht_type VARCHAR(50);
ALTER TABLE vessels ADD COLUMN IF NOT EXISTS charter_type VARCHAR(50);

-- Specs (previously in JSON, now as individual columns for filtering)
ALTER TABLE vessels ADD COLUMN IF NOT EXISTS length FLOAT;
ALTER TABLE vessels ADD COLUMN IF NOT EXISTS length_feet FLOAT;
ALTER TABLE vessels ADD COLUMN IF NOT EXISTS beam FLOAT;
ALTER TABLE vessels ADD COLUMN IF NOT EXISTS draft FLOAT;
ALTER TABLE vessels ADD COLUMN IF NOT EXISTS year INTEGER;
ALTER TABLE vessels ADD COLUMN IF NOT EXISTS builder VARCHAR(255);
ALTER TABLE vessels ADD COLUMN IF NOT EXISTS model VARCHAR(255);
ALTER TABLE vessels ADD COLUMN IF NOT EXISTS refit_year INTEGER;
ALTER TABLE vessels ADD COLUMN IF NOT EXISTS engine VARCHAR(255);
ALTER TABLE vessels ADD COLUMN IF NOT EXISTS max_speed FLOAT;
ALTER TABLE vessels ADD COLUMN IF NOT EXISTS cruising_speed FLOAT;
ALTER TABLE vessels ADD COLUMN IF NOT EXISTS fuel_capacity FLOAT;
ALTER TABLE vessels ADD COLUMN IF NOT EXISTS water_capacity FLOAT;
ALTER TABLE vessels ADD COLUMN IF NOT EXISTS cabins INTEGER;
ALTER TABLE vessels ADD COLUMN IF NOT EXISTS guest_cabins INTEGER;
ALTER TABLE vessels ADD COLUMN IF NOT EXISTS beds INTEGER;
ALTER TABLE vessels ADD COLUMN IF NOT EXISTS bathrooms INTEGER;
ALTER TABLE vessels ADD COLUMN IF NOT EXISTS crew INTEGER DEFAULT 0;

-- Operating areas and destinations
ALTER TABLE vessels ADD COLUMN IF NOT EXISTS operating_areas TEXT[];
ALTER TABLE vessels ADD COLUMN IF NOT EXISTS destinations TEXT[];

-- Features and amenities
ALTER TABLE vessels ADD COLUMN IF NOT EXISTS features TEXT[];
ALTER TABLE vessels ADD COLUMN IF NOT EXISTS amenities TEXT[];
ALTER TABLE vessels ADD COLUMN IF NOT EXISTS water_toys TEXT[];
ALTER TABLE vessels ADD COLUMN IF NOT EXISTS entertainment TEXT[];

-- Additional pricing
ALTER TABLE vessels ADD COLUMN IF NOT EXISTS price_per_week DECIMAL(12,2);
ALTER TABLE vessels ADD COLUMN IF NOT EXISTS price_per_day DECIMAL(12,2);
ALTER TABLE vessels ADD COLUMN IF NOT EXISTS price_plus_expenses BOOLEAN DEFAULT FALSE;

-- Availability
ALTER TABLE vessels ADD COLUMN IF NOT EXISTS available_from TIMESTAMP;
ALTER TABLE vessels ADD COLUMN IF NOT EXISTS available_to TIMESTAMP;
ALTER TABLE vessels ADD COLUMN IF NOT EXISTS is_available BOOLEAN DEFAULT TRUE;

-- Virtual tour
ALTER TABLE vessels ADD COLUMN IF NOT EXISTS virtual_tour_url VARCHAR(500);

-- Create new Destination table
CREATE TABLE IF NOT EXISTS destinations (
  id VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  country VARCHAR(100),
  region VARCHAR(100),
  continent VARCHAR(50),
  description TEXT,
  highlights TEXT[],
  image VARCHAR(500),
  departure_ports TEXT[],
  nearby_islands TEXT[],
  best_time_to_visit TEXT[],
  avg_temperature FLOAT,
  latitude FLOAT,
  longitude FLOAT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for filtering
CREATE INDEX IF NOT EXISTS idx_vessels_yacht_type ON vessels(yacht_type);
CREATE INDEX IF NOT EXISTS idx_vessels_charter_type ON vessels(charter_type);
CREATE INDEX IF NOT EXISTS idx_vessels_length ON vessels(length);
CREATE INDEX IF NOT EXISTS idx_vessels_year ON vessels(year);
CREATE INDEX IF NOT EXISTS idx_vessels_cabins ON vessels(cabins);
CREATE INDEX IF NOT EXISTS idx_vessels_guests ON vessels(guests);
CREATE INDEX IF NOT EXISTS idx_vessels_is_available ON vessels(is_available);
CREATE INDEX IF NOT EXISTS idx_vessels_region ON vessels(region);
CREATE INDEX IF NOT EXISTS idx_vessels_departure_port ON vessels(departure_port);

-- Enable Row Level Security
ALTER TABLE vessels ENABLE ROW LEVEL SECURITY;
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Public read access" ON vessels FOR SELECT USING (true);
CREATE POLICY "Public read access" ON destinations FOR SELECT USING (true);

-- Insert sample destinations from all sources
INSERT INTO destinations (name, slug, country, region, continent, highlights) VALUES
-- Mediterranean
  ('French Riviera', 'french-riviera', 'France', 'Mediterranean', 'Europe', ARRAY['Monaco', 'Nice', 'St Tropez', 'Cannes', 'Antibes']),
  ('Greek Islands', 'greek-islands', 'Greece', 'Mediterranean', 'Europe', ARRAY['Santorini', 'Mykonos', 'Crete', 'Cyclades', 'Skiathos']),
  ('Italian Amalfi Coast', 'amalfi-coast', 'Italy', 'Mediterranean', 'Europe', ARRAY['Positano', 'Capri', 'Ravello', 'Sorrento', 'Amalfi']),
  ('Croatia', 'croatia', 'Croatia', 'Adriatic', 'Europe', ARRAY['Dubrovnik', 'Split', 'Hvar', 'Korcula', 'Brac']),
  ('Spain Balearics', 'balearic-islands', 'Spain', 'Mediterranean', 'Europe', ARRAY['Ibiza', 'Mallorca', 'Menorca', 'Formentera']),
  ('Turkey', 'turkey', 'Turkey', 'Mediterranean', 'Europe', ARRAY['Bodrum', 'Marmaris', 'Fethiye', 'Gocek']),
  ('Sicily', 'sicily', 'Italy', 'Mediterranean', 'Europe', ARRAY['Palermo', 'Taormina', 'Lipari', 'Stromboli']),
  ('Corsica', 'corsica', 'France', 'Mediterranean', 'Europe', ARRAY['Bonifacio', 'Ajaccio', 'Calvi', 'Porto Vecchio']),
  ('Sardinia', 'sardinia', 'Italy', 'Mediterranean', 'Europe', ARRAY['Porto Cervo', 'Costa Smeralda', 'Alghero', 'Olbia']),
  
-- Caribbean
  ('Bahamas', 'bahamas', 'Bahamas', 'Caribbean', 'North America', ARRAY['Exumas', 'Nassau', 'Bimini', 'Eleuthera', 'Andros']),
  ('US Virgin Islands', 'us-virgin-islands', 'USA', 'Caribbean', 'North America', ARRAY['St Thomas', 'St John', 'St Croix', 'Tortola']),
  ('British Virgin Islands', 'british-virgin-islands', 'UK', 'Caribbean', 'North America', ARRAY['Tortola', 'Virgin Gorda', 'Jost Van Dyke', 'Anegada']),
  ('St Martin', 'st-martin', 'France', 'Caribbean', 'North America', ARRAY['Marigot', 'Grand Case', 'Orient Bay']),
  ('Antigua', 'antigua', 'Antigua', 'Caribbean', 'North America', ARRAY['St Johns', 'English Harbour', 'Falmouth']),
  ('St Barts', 'st-barts', 'France', 'Caribbean', 'North America', ARRAY['Gustavia', 'St Jean', 'Colombier']),
  
-- Indian Ocean & Asia
  ('Maldives', 'maldives', 'Maldives', 'Indian Ocean', 'Asia', ARRAY['Male', 'Baa Atoll', 'North Male', 'South Male', 'Ari Atoll']),
  ('Thailand', 'thailand', 'Thailand', 'Asia', 'Asia', ARRAY['Phuket', 'Koh Samui', 'Phi Phi', 'Similan', 'Koh Lanta']),
  ('Sri Lanka', 'sri-lanka', 'Sri Lanka', 'Asia', 'Asia', ARRAY['Colombo', 'Galle', 'Trincomalee']),
  ('Seychelles', 'seychelles', 'Seychelles', 'Indian Ocean', 'Africa', ARRAY['Mahe', 'Praslin', 'La Digue', 'Silhouette']),
  ('Mauritius', 'mauritius', 'Mauritius', 'Indian Ocean', 'Africa', ARRAY['Port Louis', 'Le Morne', 'Blue Bay']),
  
-- Pacific
  ('Fiji', 'fiji', 'Fiji', 'Pacific', 'Oceania', ARRAY['Nadi', 'Suva', 'Mamanuca', 'Yasawa']),
  ('Tahiti', 'tahiti', 'French Polynesia', 'Pacific', 'Oceania', ARRAY['Papeete', 'Bora Bora', 'Moorea', 'Rangiroa']),
  ('Palau', 'palau', 'Palau', 'Pacific', 'Oceania', ARRAY['Koror', 'Rock Islands', 'Peleliu']),
  ('New Zealand', 'new-zealand', 'New Zealand', 'Pacific', 'Oceania', ARRAY['Auckland', 'Bay of Islands', 'Wellington', 'Queenstown']),
  
-- Middle East
  ('Dubai', 'dubai', 'UAE', 'Middle East', 'Asia', ARRAY['Dubai Marina', 'Palm Jumeirah', 'Jebel Ali']),
  ('Oman', 'oman', 'Oman', 'Middle East', 'Asia', ARRAY['Muscat', 'Sur', 'Salalah', 'Fujairah']),
  
-- Americas
  ('Florida Keys', 'florida-keys', 'USA', 'Atlantic', 'North America', ARRAY['Key West', 'Key Largo', 'Marathon', 'Islamorada']),
  ('Mexico Pacific', 'mexico-pacific', 'Mexico', 'Pacific', 'North America', ARRAY['Cabo San Lucas', 'Puerto Vallarta', 'Los Cabos']),
  ('Belize', 'belize', 'Belize', 'Caribbean', 'North America', ARRAY['Belize City', 'Ambergris Caye', 'Caye Caulker']),
  ('Panama', 'panama', 'Panama', 'Central America', 'North America', ARRAY['Panama City', 'Bocas del Toro', 'San Blas']),
  
-- Northern Europe
  ('Norway', 'norway', 'Norway', 'Scandinavia', 'Europe', ARRAY['Bergen', 'Oslo', 'Lofoten', 'Flåm']),
  ('Sweden', 'sweden', 'Sweden', 'Scandinavia', 'Europe', ARRAY['Stockholm', 'Gothenburg', 'Marstrand']),
  ('Netherlands', 'netherlands', 'Netherlands', 'Northern Europe', 'Europe', ARRAY['Amsterdam', 'Rotterdam', 'IJsselmeer']),
  ('UK Coast', 'uk-coast', 'UK', 'Northern Europe', 'Europe', ARRAY['London', 'Southampton', 'Cowes', 'Plymouth'])
ON CONFLICT (slug) DO NOTHING;

-- Update existing short_description to be more descriptive if empty
UPDATE vessels 
SET short_description = CONCAT(
  '• ', COALESCE(length::TEXT, ''), 'm • ',
  COALESCE(cabins::TEXT, ''), ' Cabins • ',
  COALESCE(guests::TEXT, ''), ' Guests'
)
WHERE short_description IS NULL OR short_description = '';
