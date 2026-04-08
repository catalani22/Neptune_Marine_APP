import { chromium } from 'playwright';
import { supabase } from '../supabase';

const BURGESS_BASE = 'https://www.burgessyachts.com';

// Source configuration
const SOURCE_CONFIG = {
  source: 'BURGESS',
  depositPercentage: 0.30, // 30% at booking
  paymentTiming: 'immediate',
  requiresCard: true,
  cancellationPolicy: 'Standard Burgess terms - 30% deposit non-refundable',
  formFields: [
    { name: 'firstName', label: 'First Name', type: 'text', required: true },
    { name: 'lastName', label: 'Last Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'phone', label: 'Phone', type: 'tel', required: false },
    { name: 'guests', label: 'Number of Guests', type: 'text', required: true },
    { name: 'dates', label: 'Preferred Dates', type: 'text', required: true },
    { name: 'message', label: 'Message', type: 'textarea', required: false },
  ]
};

interface YachtData {
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  specs: {
    length?: number;
    beam?: number;
    draft?: number;
    year?: number;
    engines?: string;
    speed?: number;
    cabins?: number;
    guests?: number;
    crew?: number;
  };
  location?: string;
  region?: string;
  images: string[];
  videos?: string[];
  basePrice: number;
  currency: string;
  urlOriginal: string;
}

async function scrapeBurgessCharter() {
  console.log('🔍 Starting Burgess Charter scraper...');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  });
  const page = await context.newPage();

  const yachts: YachtData[] = [];

  try {
    // Scrape Motor Yachts for Charter
    const charterUrl = `${BURGESS_BASE}/en/charter-a-yacht/yachts-for-charter`;
    console.log(`📄 Loading ${charterUrl}...`);
    
    await page.goto(charterUrl, { waitUntil: 'networkidle', timeout: 60000 });
    
    // Wait for yacht cards to load
    await page.waitForSelector('[class*="yacht"], [class*="card"]', { timeout: 30000 }).catch(() => {
      console.log('⚠️ No standard selectors found, trying alternative...');
    });

    // Get all yacht links from the page
    const yachtLinks = await page.evaluate(() => {
      const links: string[] = [];
      document.querySelectorAll('a[href*="/yachts-for-charter/"]').forEach(a => {
        const href = a.getAttribute('href');
        if (href && !href.includes('#') && href !== '/en/charter-a-yacht/yachts-for-charter') {
          links.push(href);
        }
      });
      return [...new Set(links)];
    });

    console.log(`📋 Found ${yachtLinks.length} yacht links`);

    // If no links found, try alternative method
    if (yachtLinks.length === 0) {
      console.log('🔄 Trying alternative method...');
      
      // Get featured yachts from homepage
      await page.goto(BURGESS_BASE, { waitUntil: 'networkidle', timeout: 60000 });
      
      const featuredLinks = await page.evaluate(() => {
        const links: string[] = [];
        document.querySelectorAll('a[href*="yachts-for-charter"]').forEach(a => {
          const href = a.getAttribute('href');
          if (href && href.includes('-')) {
            links.push(href);
          }
        });
        return [...new Set(links)];
      });
      
      console.log(`📋 Found ${featuredLinks.length} featured yacht links`);
    }

    // Try to get some sample data even if links aren't found
    const sampleData = await page.evaluate(() => {
      // Try to find yacht names
      const names = Array.from(document.querySelectorAll('h1, h2, h3, [class*="title"]'))
        .map(el => el.textContent?.trim())
        .filter(Boolean)
        .slice(0, 20);
      
      // Try to find images
      const images = Array.from(document.querySelectorAll('img[src*="yacht"], img[src*="burgess"]'))
        .map(img => img.getAttribute('src'))
        .filter(src => src && !src.includes('logo') && !src.includes('icon'))
        .slice(0, 20);
      
      return { names, images };
    });

    console.log('📊 Sample data found:', JSON.stringify(sampleData, null, 2));

  } catch (error) {
    console.error('❌ Error scraping:', error);
  } finally {
    await browser.close();
  }

  return yachts;
}

// Alternative: Simple HTTP scraper for basic data
async function scrapeWithCheerio() {
  const axios = (await import('axios')).default;
  const cheerio = await import('cheerio');

  console.log('🔍 Starting HTTP scraper...');

  try {
    const response = await axios.get('https://www.burgessyachts.com/en/charter-a-yacht/yachts-for-charter', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 30000
    });

    const $ = cheerio.load(response.data);

    // Extract yacht cards
    const yachts: Partial<YachtData>[] = [];

    // Try various selectors
    const cards = $('[class*="yacht-card"], [class*="yacht-item"], [class*="boat-card"], article, .card');

    console.log(`📋 Found ${cards.length} potential yacht elements`);

    cards.each((_i: number, el: any) => {
      const $card = $(el);
      
      // Try to extract data
      const title = $card.find('h1, h2, h3, [class*="title"]').first().text().trim();
      const description = $card.find('p').first().text().trim();
      $card.find('[class*="price"], [class*="rate"]').first().text().trim();
      const image = $card.find('img').attr('src');
      const link = $card.find('a').attr('href');

      if (title && title.length > 3) {
        yachts.push({
          title,
          description,
          urlOriginal: link ? `${BURGESS_BASE}${link}` : '',
          images: image ? [image] : []
        });
      }
    });

    console.log(`✅ Extracted ${yachts.length} yachts from page`);
    return yachts;

  } catch (error) {
    console.error('❌ HTTP scraper error:', error);
    return [];
  }
}

// Save to Supabase
async function saveToDatabase(yachts: Partial<YachtData>[]) {
  console.log('💾 Saving to database...');

  // First, save source rules
  const { error: rulesError } = await supabase
    .from('source_rules')
    .upsert({
      ...SOURCE_CONFIG
    }, { onConflict: 'source' });

  if (rulesError) {
    console.error('❌ Error saving source rules:', rulesError);
  } else {
    console.log('✅ Source rules saved');
  }

  // Save vessels
  let savedCount = 0;
  for (const yacht of yachts) {
    if (!yacht.title) continue;

    const slug = yacht.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    const { error } = await supabase.from('vessels').upsert({
      type: 'FULL_CHARTER',
      source: SOURCE_CONFIG.source,
      external_id: slug,
      title: yacht.title,
      slug: slug + '-' + Date.now(),
      description: yacht.description || '',
      short_description: yacht.shortDescription,
      specs: yacht.specs || {},
      location: yacht.location,
      region: yacht.region,
      images: yacht.images || [],
      videos: yacht.videos || [],
      base_price: yacht.basePrice || 0,
      currency: yacht.currency || 'EUR',
      url_original: yacht.urlOriginal || '',
    }, { onConflict: 'slug' });

    if (!error) savedCount++;
  }

  console.log(`✅ Saved ${savedCount} yachts to database`);
  return savedCount;
}

// Main execution
async function main() {
  console.log('🚀 Starting Neptune Marine Scraper...\n');

  // Scrape with HTTP first (faster)
  const httpYachts = await scrapeWithCheerio();
  
  if (httpYachts.length > 0) {
    await saveToDatabase(httpYachts);
  } else {
    // Fallback to Playwright
    console.log('🔄 Falling back to Playwright...');
    await scrapeBurgessCharter();
  }

  console.log('\n✨ Scraping complete!');
}

main().catch(console.error);
