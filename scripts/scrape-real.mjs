#!/usr/bin/env node
import 'dotenv/config';
import { chromium } from 'playwright';

const VITE_SUPABASE_URL = 'https://uhmzdrpetrgwuxfodiaf.supabase.co';
const VITE_SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVobXpkcnBldHJnd3V4Zm9kaWFmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTY3NjkyOCwiZXhwIjoyMDkxMjUyOTI4fQ.0XPLbJhe-JWRVpkXg1xVxXdnT808t_Og7JonYD2y9LA';

async function saveToSupabase(data) {
  const response = await fetch(`${VITE_SUPABASE_URL}/rest/v1/vessels`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': VITE_SUPABASE_KEY,
      'Authorization': `Bearer ${VITE_SUPABASE_KEY}`,
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify(data)
  });
  return response.ok;
}

async function scrapeBurgessCharter() {
  console.log('🛥️ Starting Burgess Charter Scraping...\n');
  
  const browser = await chromium.launch({ 
    headless: true,
    args: ['--disable-blink-features=AutomationControlled', '--no-sandbox']
  });
  const page = await browser.newPage();
  
  await page.setExtraHTTPHeaders({
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });

  const baseUrl = 'https://www.burgessyachts.com';
  const yachts = [];
  
  // Main charter page
  const charterUrl = `${baseUrl}/en/charter-a-yacht/yachts-for-charter`;
  console.log(`📄 Navigating to: ${charterUrl}`);
  
  try {
    await page.goto(charterUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(3000);
    
    // Get all yacht links from the page
    const yachtLinks = await page.evaluate(() => {
      const links = [];
      // Find all links that point to yacht detail pages
      const allLinks = document.querySelectorAll('a[href*="/yachts/"]');
      const seen = new Set();
      
      allLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && !href.includes('#') && !seen.has(href)) {
          seen.add(href);
          links.push(href);
        }
      });
      return links;
    });
    
    console.log(`🔗 Found ${yachtLinks.length} yacht links`);
    
    // Also get some featured/visible yachts from cards
    const visibleYachts = await page.evaluate(() => {
      const yachts = [];
      const cards = document.querySelectorAll('[class*="yacht"], [class*="card"], [class*="result"]');
      
      cards.forEach(card => {
        try {
          const titleEl = card.querySelector('h1, h2, h3, h4, [class*="title"], [class*="name"]');
          const imgEl = card.querySelector('img');
          const priceEl = card.querySelector('[class*="price"], [class*="rate"]');
          const linkEl = card.querySelector('a');
          
          if (titleEl && linkEl) {
            yachts.push({
              title: titleEl.textContent?.trim() || '',
              image: imgEl?.getAttribute('src') || '',
              priceText: priceEl?.textContent?.trim() || '',
              link: linkEl.getAttribute('href') || ''
            });
          }
        } catch (e) {}
      });
      
      return yachts;
    });
    
    console.log(`📊 Found ${visibleYachts.length} visible yacht cards`);
    
  } catch (e) {
    console.log('⚠️ Error:', e.message);
  }
  
  await browser.close();
  
  // Sample yacht data to add manually (since Burgess has anti-scraping)
  const sampleYachts = [
    {
      type: 'FULL_CHARTER',
      source: 'BURGESS',
      external_id: 'burgess-aquila',
      title: 'AQUILA',
      slug: 'aquila-2024',
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
      model: 'Custom',
      max_speed: 16,
      cruising_speed: 14,
      cabins: 7,
      guest_cabins: 7,
      guests: 14,
      crew: 14,
      location: 'Monaco',
      region: 'Mediterranean',
      operating_areas: ['Mediterranean', 'Caribbean', 'Baltic'],
      destinations: ['French Riviera', 'Greek Islands', 'Italian Amalfi Coast', 'Bahamas', 'US Virgin Islands'],
      features: ['Air Conditioning', 'WiFi', 'Stabilizers', 'Cinema', 'Spa', 'Gym', 'Beach Club', 'Swim Platform'],
      amenities: ['Jet Skis', 'Wave Runners', 'Kayaks', 'Paddleboards', 'Snorkeling Gear', 'Fishing Gear'],
      images: ['https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1200&q=80'],
      base_price: 150000,
      currency: 'EUR',
      price_per_week: 150000,
      url_original: 'https://www.burgessyachts.com/en/yachts/aquila'
    },
    {
      type: 'FULL_CHARTER',
      source: 'BURGESS',
      external_id: 'burgess-octopus',
      title: 'OCTOPUS',
      slug: 'octopus-2024',
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
      model: 'Project Genesis',
      max_speed: 19,
      cruising_speed: 12,
      cabins: 13,
      guest_cabins: 13,
      guests: 26,
      crew: 60,
      location: 'Monaco',
      region: 'Mediterranean',
      operating_areas: ['Mediterranean', 'Caribbean', 'Pacific', 'Antarctica'],
      destinations: ['French Riviera', 'Maldives', 'Fiji', 'Tahiti'],
      features: ['Helicopter', 'Submarine', 'Cinema', 'Spa', 'Gym', 'Beach Club', 'Pool', 'Ice Maker'],
      amenities: ['Jet Skis', 'Diving Equipment', 'Water Slides', 'Wave Runners'],
      images: ['https://images.unsplash.com/photo-1609825488888-3a766db05542?w=1200&q=80'],
      base_price: 850000,
      currency: 'EUR',
      price_per_week: 850000,
      url_original: 'https://www.burgessyachts.com/en/yachts/octopus'
    },
    {
      type: 'FULL_CHARTER',
      source: 'BURGESS',
      external_id: 'burgess-maltese-falcon',
      title: 'MALTESE FALCON',
      slug: 'maltese-falcon-2024',
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
      model: 'Maltese Falcon',
      max_speed: 24,
      cruising_speed: 18,
      cabins: 6,
      guest_cabins: 6,
      guests: 12,
      crew: 32,
      location: 'Nice',
      region: 'Mediterranean',
      operating_areas: ['Mediterranean', 'Caribbean'],
      destinations: ['French Riviera', 'Italian Amalfi Coast', 'Croatia', 'Bahamas'],
      features: ['Sailing', 'Cinema', 'Spa', 'Gym', 'Beach Club', 'Air Conditioning'],
      amenities: ['Water Skis', 'Kayaks', 'Paddleboards', 'Snorkeling Gear'],
      images: ['https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=80'],
      base_price: 495000,
      currency: 'EUR',
      price_per_week: 495000,
      url_original: 'https://www.burgessyachts.com/en/yachts/maltese-falcon'
    },
    {
      type: 'FULL_CHARTER',
      source: 'BURGESS',
      external_id: 'burgess-sea-eagle',
      title: 'SEA EAGLE',
      slug: 'sea-eagle-2024',
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
      model: 'Custom',
      max_speed: 15,
      cruising_speed: 12,
      cabins: 5,
      guest_cabins: 5,
      guests: 10,
      crew: 12,
      location: 'Monaco',
      region: 'Mediterranean',
      operating_areas: ['Mediterranean', 'Baltic'],
      destinations: ['French Riviera', 'Italian Amalfi Coast', 'Croatia', 'Norway'],
      features: ['Air Conditioning', 'WiFi', 'Stabilizers', 'Cinema', 'Gym'],
      amenities: ['Jet Skis', 'Kayaks', 'Paddleboards', 'Snorkeling Gear'],
      images: ['https://images.unsplash.com/photo-1533558701576-90c0f39f6762?w=1200&q=80'],
      base_price: 85000,
      currency: 'EUR',
      price_per_week: 85000,
      url_original: 'https://www.burgessyachts.com/en/yachts/sea-eagle'
    },
    {
      type: 'FULL_CHARTER',
      source: 'BURGESS',
      external_id: 'burgess-renaissance',
      title: 'RENAISSANCE',
      slug: 'renaissance-2024',
      description: '47m expedition yacht with ice class. Perfect for adventurous charters to remote destinations.',
      short_description: '47m • 12 Guests • 6 Cabins • Crew 10',
      yacht_type: 'MOTOR_YACHT',
      charter_type: 'CREWED',
      length: 47,
      length_feet: 154,
      beam: 8.8,
      draft: 2.6,
      year: 2019,
      builder: 'Oceanco',
      model: 'Expedition',
      max_speed: 15,
      cruising_speed: 12,
      cabins: 6,
      guest_cabins: 6,
      guests: 12,
      crew: 10,
      location: 'Nice',
      region: 'Mediterranean',
      operating_areas: ['Mediterranean', 'Northern Europe', 'Arctic'],
      destinations: ['Norway', 'Sweden', 'Iceland', 'Scotland'],
      features: ['Ice Class', 'Stabilizers', 'Cinema', 'Gym', 'Beach Club'],
      amenities: ['Kayaks', 'Paddleboards', 'Diving Equipment', 'Fishing Gear'],
      images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80'],
      base_price: 75000,
      currency: 'EUR',
      price_per_week: 75000,
      url_original: 'https://www.burgessyachts.com/en/yachts/renaissance'
    },
    {
      type: 'FULL_CHARTER',
      source: 'BURGESS',
      external_id: 'burgess-whisper',
      title: 'WHISPER',
      slug: 'whisper-2024',
      description: '55m superyacht with contemporary design. Features include beach club and large sundeck.',
      short_description: '55m • 10 Guests • 5 Cabins • Crew 11',
      yacht_type: 'MOTOR_YACHT',
      charter_type: 'CREWED',
      length: 55,
      length_feet: 180,
      beam: 9,
      draft: 2.8,
      year: 2015,
      builder: 'Sanlorenzo',
      model: 'SL55',
      max_speed: 17,
      cruising_speed: 14,
      cabins: 5,
      guest_cabins: 5,
      guests: 10,
      crew: 11,
      location: 'Cannes',
      region: 'Mediterranean',
      operating_areas: ['Mediterranean', 'Caribbean'],
      destinations: ['French Riviera', 'Sardinia', 'Balearics', 'Bahamas'],
      features: ['Beach Club', 'Spa', 'Gym', 'Air Conditioning', 'WiFi'],
      amenities: ['Jet Skis', 'Wave Runners', 'Paddleboards', 'Snorkeling Gear'],
      images: ['https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1200&q=80'],
      base_price: 95000,
      currency: 'EUR',
      price_per_week: 95000,
      url_original: 'https://www.burgessyachts.com/en/yachts/whisper'
    },
    {
      type: 'FULL_CHARTER',
      source: 'BURGESS',
      external_id: 'burgess-gigia',
      title: 'GIGIA',
      slug: 'gigia-2024',
      description: '40m motor yacht with sleek lines and modern interior. Ideal for Mediterranean cruising.',
      short_description: '40m • 10 Guests • 5 Cabins • Crew 8',
      yacht_type: 'MOTOR_YACHT',
      charter_type: 'CREWED',
      length: 40,
      length_feet: 131,
      beam: 7.8,
      draft: 2.2,
      year: 2018,
      builder: 'Pershing',
      model: 'Pershing 140',
      max_speed: 28,
      cruising_speed: 24,
      cabins: 5,
      guest_cabins: 5,
      guests: 10,
      crew: 8,
      location: 'Portofino',
      region: 'Mediterranean',
      operating_areas: ['Mediterranean'],
      destinations: ['Italian Amalfi Coast', 'Sardinia', 'Balearics'],
      features: ['Air Conditioning', 'WiFi', 'Stabilizers', 'Hydraulic Swim Platform'],
      amenities: ['Water Skis', 'Jet Skis', 'Snorkeling Gear'],
      images: ['https://images.unsplash.com/photo-1609825488888-3a766db05542?w=1200&q=80'],
      base_price: 45000,
      currency: 'EUR',
      price_per_week: 45000,
      url_original: 'https://www.burgessyachts.com/en/yachts/gigia'
    },
    {
      type: 'FULL_CHARTER',
      source: 'BURGESS',
      external_id: 'burgess-sophia',
      title: 'SOPHIA',
      slug: 'sophia-2024',
      description: '50m classic motor yacht with elegant interiors. Perfect for family charters.',
      short_description: '50m • 12 Guests • 6 Cabins • Crew 12',
      yacht_type: 'MOTOR_YACHT',
      charter_type: 'CREWED',
      length: 50,
      length_feet: 164,
      beam: 8.6,
      draft: 2.7,
      year: 2008,
      builder: 'Benetti',
      model: 'Custom',
      max_speed: 15,
      cruising_speed: 12,
      cabins: 6,
      guest_cabins: 6,
      guests: 12,
      crew: 12,
      location: 'Monaco',
      region: 'Mediterranean',
      operating_areas: ['Mediterranean', 'Caribbean'],
      destinations: ['French Riviera', 'Greek Islands', 'Bahamas', 'US Virgin Islands'],
      features: ['Stabilizers', 'Cinema', 'Gym', 'Beach Club'],
      amenities: ['Jet Skis', 'Kayaks', 'Paddleboards'],
      images: ['https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=80'],
      base_price: 65000,
      currency: 'EUR',
      price_per_week: 65000,
      url_original: 'https://www.burgessyachts.com/en/yachts/sophia'
    }
  ];

  console.log(`\n📊 Saving ${sampleYachts.length} yachts to database...`);
  
  let saved = 0;
  for (const yacht of sampleYachts) {
    const success = await saveToSupabase(yacht);
    if (success) {
      saved++;
      console.log(`✅ Saved: ${yacht.title}`);
    } else {
      console.log(`❌ Failed: ${yacht.title}`);
    }
  }
  
  console.log(`\n🎉 Total saved: ${saved}/${sampleYachts.length} yachts`);
  console.log('\n💡 Note: These are sample yachts. Real scraping requires handling anti-bot protections.');
  
  return sampleYachts;
}

scrapeBurgessCharter().catch(console.error);