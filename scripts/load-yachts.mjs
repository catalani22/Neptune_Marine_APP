#!/usr/bin/env node
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

console.log('🔗 Connecting to Supabase:', supabaseUrl);

const supabase = createClient(supabaseUrl, supabaseKey);

// Sample yacht data with 10% markup
const yachts = [
  {
    type: 'FULL_CHARTER',
    source: 'BURGESS',
    external_id: 'burgess-aquila',
    title: 'AQUILA',
    slug: 'aquila-2024-burgess',
    description: '60m luxury superyacht available for charter in the Mediterranean and Caribbean. Features include cinema, spa, gym, and beach club. Professional crew of 14.',
    short_description: '60m • 14 Guests • 7 Cabins • Crew 14',
    yacht_type: 'MOTOR_YACHT',
    charter_type: 'CREWED',
    length: 60,
    length_feet: 197,
    beam: 10.2,
    draft: 3.2,
    year: 2010,
    builder: 'Royal Huisman',
    max_speed: 16,
    cruising_speed: 14,
    cabins: 7,
    guest_cabins: 7,
    guests: 14,
    crew: 14,
    location: 'Monaco',
    region: 'Mediterranean',
    operating_areas: ['Mediterranean', 'Caribbean', 'Baltic'],
    destinations: ['French Riviera', 'Greek Islands', 'Italian Amalfi Coast'],
    features: ['Air Conditioning', 'WiFi', 'Stabilizers', 'Cinema', 'Spa', 'Gym', 'Beach Club', 'Swim Platform'],
    amenities: ['Jet Skis', 'Wave Runners', 'Kayaks', 'Paddleboards', 'Snorkeling Gear'],
    images: ['https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1200&q=80'],
    base_price: 165000, // 10% markup from 150,000
    currency: 'EUR',
    price_per_week: 165000,
    is_available: true,
    url_original: 'https://www.burgessyachts.com/en/yachts/aquila'
  },
  {
    type: 'FULL_CHARTER',
    source: 'BURGESS',
    external_id: 'burgess-octopus',
    title: 'OCTOPUS',
    slug: 'octopus-2024-burgess',
    description: '126m mega yacht with 2 helicopters, submarine, and cinema. The ultimate explorer yacht with unparalleled facilities.',
    short_description: '126m • 26 Guests • 13 Cabins • Crew 60',
    yacht_type: 'MOTOR_YACHT',
    charter_type: 'CREWED',
    length: 126,
    length_feet: 413,
    beam: 21,
    draft: 5.8,
    year: 2003,
    builder: 'Lurssen',
    max_speed: 19,
    cruising_speed: 12,
    cabins: 13,
    guest_cabins: 13,
    guests: 26,
    crew: 60,
    location: 'Monaco',
    region: 'Mediterranean',
    operating_areas: ['Mediterranean', 'Caribbean', 'Pacific'],
    destinations: ['French Riviera', 'Maldives', 'Fiji'],
    features: ['Helicopter', 'Submarine', 'Cinema', 'Spa', 'Gym', 'Beach Club', 'Pool'],
    amenities: ['Jet Skis', 'Diving Equipment', 'Water Slides'],
    images: ['https://images.unsplash.com/photo-1609825488888-3a766db05542?w=1200&q=80'],
    base_price: 935000, // 10% markup from 850,000
    currency: 'EUR',
    price_per_week: 935000,
    is_available: true,
    url_original: 'https://www.burgessyachts.com/en/yachts/octopus'
  },
  {
    type: 'FULL_CHARTER',
    source: 'BURGESS',
    external_id: 'burgess-maltese-falcon',
    title: 'MALTESE FALCON',
    slug: 'maltese-falcon-2024-burgess',
    description: '115m sailing mega yacht with innovative rig system. One of the most iconic sailing yachts in the world.',
    short_description: '115m • 12 Guests • 6 Cabins • Crew 32',
    yacht_type: 'SAILING_YACHT',
    charter_type: 'CREWED',
    length: 115,
    length_feet: 377,
    beam: 15.4,
    draft: 6,
    year: 2006,
    builder: 'Perini Navi',
    max_speed: 24,
    cruising_speed: 18,
    cabins: 6,
    guest_cabins: 6,
    guests: 12,
    crew: 32,
    location: 'Nice',
    region: 'Mediterranean',
    operating_areas: ['Mediterranean', 'Caribbean'],
    destinations: ['French Riviera', 'Italian Amalfi Coast', 'Croatia'],
    features: ['Sailing', 'Cinema', 'Spa', 'Gym', 'Beach Club', 'Air Conditioning'],
    amenities: ['Water Skis', 'Kayaks', 'Paddleboards'],
    images: ['https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=80'],
    base_price: 544500, // 10% markup from 495,000
    currency: 'EUR',
    price_per_week: 544500,
    is_available: true,
    url_original: 'https://www.burgessyachts.com/en/yachts/maltese-falcon'
  },
  {
    type: 'FULL_CHARTER',
    source: 'BURGESS',
    external_id: 'burgess-sea-eagle',
    title: 'SEA EAGLE',
    slug: 'sea-eagle-2024-burgess',
    description: '55m custom displacement yacht with classic styling. Features include spacious interior and excellent seakeeping.',
    short_description: '55m • 10 Guests • 5 Cabins • Crew 12',
    yacht_type: 'MOTOR_YACHT',
    charter_type: 'CREWED',
    length: 55,
    length_feet: 180,
    beam: 9.2,
    draft: 3,
    year: 2020,
    builder: 'Holland Jachtbouw',
    max_speed: 15,
    cruising_speed: 12,
    cabins: 5,
    guest_cabins: 5,
    guests: 10,
    crew: 12,
    location: 'Monaco',
    region: 'Mediterranean',
    operating_areas: ['Mediterranean', 'Baltic'],
    destinations: ['French Riviera', 'Croatia', 'Norway'],
    features: ['Air Conditioning', 'WiFi', 'Stabilizers', 'Cinema', 'Gym'],
    amenities: ['Jet Skis', 'Kayaks', 'Paddleboards'],
    images: ['https://images.unsplash.com/photo-1533558701576-90c0f39f6762?w=1200&q=80'],
    base_price: 93500, // 10% markup from 85,000
    currency: 'EUR',
    price_per_week: 93500,
    is_available: true,
    url_original: 'https://www.burgessyachts.com/en/yachts/sea-eagle'
  },
  {
    type: 'FULL_CHARTER',
    source: 'GLOBALCHARTER',
    external_id: 'global-o-ptasia',
    title: 'O PTASIA',
    slug: 'o-ptasia-2024-global',
    description: '65m superyacht with contemporary design. Features include large beach club and spa.',
    short_description: '65m • 12 Guests • 6 Cabins • Crew 16',
    yacht_type: 'MOTOR_YACHT',
    charter_type: 'CREWED',
    length: 65,
    length_feet: 213,
    beam: 11,
    draft: 3.4,
    year: 2021,
    builder: 'Oceanco',
    max_speed: 18,
    cruising_speed: 14,
    cabins: 6,
    guest_cabins: 6,
    guests: 12,
    crew: 16,
    location: 'Athens',
    region: 'Mediterranean',
    operating_areas: ['Mediterranean'],
    destinations: ['Greek Islands', 'Turkish Coast', 'Croatia'],
    features: ['Beach Club', 'Spa', 'Gym', 'Cinema', 'Air Conditioning'],
    amenities: ['Jet Skis', 'Paddleboards', 'Snorkeling Gear'],
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80'],
    base_price: 115500, // 10% markup from 105,000
    currency: 'EUR',
    price_per_week: 115500,
    is_available: true,
    url_original: 'https://www.globalcharter.com/yachts/o-ptasia'
  },
  {
    type: 'FULL_CHARTER',
    source: 'GLOBALCHARTER',
    external_id: 'global-ocean-nova',
    title: 'OCEAN NOVA',
    slug: 'ocean-nova-2024-global',
    description: '55m expedition yacht perfect for adventure cruising. Ice class and remote destination specialist.',
    short_description: '55m • 12 Guests • 6 Cabins • Crew 12',
    yacht_type: 'MOTOR_YACHT',
    charter_type: 'CREWED',
    length: 55,
    length_feet: 180,
    beam: 10,
    draft: 3,
    year: 2022,
    builder: 'Admiral',
    max_speed: 16,
    cruising_speed: 12,
    cabins: 6,
    guest_cabins: 6,
    guests: 12,
    crew: 12,
    location: 'Fiji',
    region: 'Pacific',
    operating_areas: ['Pacific', 'Antarctica', 'Arctic'],
    destinations: ['Fiji', 'Tahiti', 'New Zealand', 'Norway'],
    features: ['Ice Class', 'Stabilizers', 'Gym', 'Beach Club'],
    amenities: ['Diving Equipment', 'Kayaks', 'Fishing Gear'],
    images: ['https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1200&q=80'],
    base_price: 88000, // 10% markup from 80,000
    currency: 'EUR',
    price_per_week: 88000,
    is_available: true,
    url_original: 'https://www.globalcharter.com/yachts/ocean-nova'
  },
  {
    type: 'FULL_CHARTER',
    source: 'ZIZOO',
    external_id: 'zizoo-barbara',
    title: 'BARBARA',
    slug: 'barbara-2024-zizoo',
    description: '35m luxury motor yacht ideal for Mediterranean cruising. Modern design with excellent outdoor spaces.',
    short_description: '35m • 8 Guests • 4 Cabins • Crew 7',
    yacht_type: 'MOTOR_YACHT',
    charter_type: 'CREWED',
    length: 35,
    length_feet: 115,
    beam: 7.2,
    draft: 2.2,
    year: 2019,
    builder: 'Azimut',
    max_speed: 26,
    cruising_speed: 22,
    cabins: 4,
    guest_cabins: 4,
    guests: 8,
    crew: 7,
    location: 'Cannes',
    region: 'Mediterranean',
    operating_areas: ['Mediterranean'],
    destinations: ['French Riviera', 'Sardinia', 'Balearics'],
    features: ['Air Conditioning', 'WiFi', 'Stabilizers', 'Swim Platform'],
    amenities: ['Water Skis', 'Jet Skis', 'Snorkeling Gear'],
    images: ['https://images.unsplash.com/photo-1609825488888-3a766db05542?w=1200&q=80'],
    base_price: 33000, // 10% markup from 30,000
    currency: 'EUR',
    price_per_week: 33000,
    is_available: true,
    url_original: 'https://www.zizoo.com/yachts/barbara'
  },
  {
    type: 'CABIN_CHART',
    source: 'ZIZOO',
    external_id: 'zizoo-cabin-mediterranean',
    title: 'Mediterranean Cabin Cruise',
    slug: 'mediterranean-cabin-cruise-2024',
    description: '7-day luxury cabin cruise through the Greek Islands. Experience the best of the Mediterranean aboard a stunning superyacht.',
    short_description: '7 Days • Athens to Dubrovnik • From €1,980/person',
    yacht_type: 'MOTOR_YACHT',
    charter_type: 'CABIN',
    length: 50,
    length_feet: 164,
    cabins: 5,
    guests: 10,
    location: 'Athens',
    region: 'Mediterranean',
    destinations: ['Greek Islands', 'Greek Islands', 'Croatia'],
    features: ['All Meals', 'Wine Included', 'Excursions', 'WiFi', 'Air Conditioning'],
    images: ['https://images.unsplash.com/photo-1533558701576-90c0f39f6762?w=1200&q=80'],
    base_price: 1980,
    currency: 'EUR',
    price_per_week: 1980,
    is_available: true,
    url_original: 'https://www.zizoo.com/cabins/mediterranean'
  },
  {
    type: 'SALE',
    source: 'BURGESS',
    external_id: 'burgess-yacht-for-sale-1',
    title: 'Eclipse - 80m Superyacht',
    slug: 'eclipse-80m-for-sale',
    description: '80m mega yacht for sale. One of the most impressive vessels ever built. Features include helipad, cinema, spa, and 2 submarines.',
    short_description: '80m • 2014 • €65,000,000',
    yacht_type: 'MOTOR_YACHT',
    charter_type: 'CREWED',
    length: 80,
    length_feet: 262,
    beam: 17,
    draft: 4.5,
    year: 2014,
    builder: 'Blohm+Voss',
    max_speed: 21,
    cruising_speed: 15,
    cabins: 8,
    guests: 16,
    crew: 30,
    location: 'Monaco',
    region: 'Mediterranean',
    features: ['Helipad', 'Cinema', 'Spa', 'Gym', '2 Submarines', 'Pool', 'Beach Club'],
    images: ['https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=80'],
    base_price: 65000000,
    currency: 'EUR',
    is_available: true,
    url_original: 'https://www.burgessyachts.com/yachts-for-sale/eclipse'
  }
];

async function main() {
  console.log('🛥️ Neptune Marine - Loading Yacht Data\n');
  
  // First, check if we can access the database
  const { data: testData, error: testError } = await supabase
    .from('vessels')
    .select('id')
    .limit(1);
  
  if (testError) {
    console.log('⚠️ Database access error:', testError.message);
    console.log('\n📝 Please ensure your Supabase database has the vessels table created.');
    console.log('   Run the migrations in supabase/migrations/ to set up the schema.');
    
    // Save data to local JSON as backup
    const fs = await import('fs');
    fs.writeFileSync('./yachts-backup.json', JSON.stringify(yachts, null, 2));
    console.log('\n✅ Data saved to yachts-backup.json');
    return;
  }
  
  console.log('✅ Connected to database');
  
  // Try to insert each yacht
  let saved = 0;
  for (const yacht of yachts) {
    const { error } = await supabase
      .from('vessels')
      .upsert([yacht], { onConflict: 'slug' });
    
    if (error) {
      console.log(`❌ ${yacht.title}: ${error.message}`);
    } else {
      saved++;
      console.log(`✅ Saved: ${yacht.title} - €${yacht.base_price.toLocaleString()}`);
    }
  }
  
  console.log(`\n🎉 Total saved: ${saved}/${yachts.length} yachts`);
  
  // Get total count
  const { count } = await supabase
    .from('vessels')
    .select('*', { count: 'exact', head: true });
  
  console.log(`📊 Total yachts in database: ${count}`);
}

main().catch(console.error);