import { chromium, type Browser, type Page } from 'playwright';
import { supabase } from '../supabase';

interface VesselData {
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  specs: Record<string, any>;
  location?: string;
  region?: string;
  images: string[];
  videos: string[];
  basePrice: number;
  currency: string;
  urlOriginal: string;
  link?: string;
  image?: string;
  priceText?: string;
  price?: number;
  source?: string;
}

class DeepCrawler {
  private browser: Browser | null = null;
  private page: Page | null = null;

  async init() {
    console.log('🌐 Launching browser...');
    this.browser = await chromium.launch({ 
      headless: true,
      args: ['--disable-blink-features=AutomationControlled', '--no-sandbox']
    });
    this.page = await this.browser.newPage();
    await this.page.setViewportSize({ width: 1920, height: 1080 });
  }

  async close() {
    if (this.browser) await this.browser.close();
  }

  async navigate(url: string) {
    if (!this.page) throw new Error('Browser not initialized');
    console.log(`\n📄 Loading: ${url}`);
    await this.page.goto(url, { waitUntil: 'networkidle', timeout: 90000 });
    await this.page.waitForTimeout(2000);
  }

  // Expand ALL collapsible elements
  async expandAll() {
    if (!this.page) return;
    
    console.log('🔽 Expanding all collapsible sections...');
    
    // Keep clicking expand buttons until no more
    let clicked = true;
    let attempts = 0;
    
    while (clicked && attempts < 10) {
      clicked = false;
      attempts++;
      
      // All types of expand/collapse buttons
      const buttons = await this.page.$$(
        'button, [role="button"], a[class*="expand"], a[class*="more"], ' +
        '[class*="toggle"], [class*="collapse"], ' +
        'button:has-text("More"), button:has-text("View All"), ' +
        'button:has-text("Show More"), button:has-text("+"), ' +
        '[aria-expanded="false"], [data-expanded="false"]'
      );
      
      for (const btn of buttons) {
        try {
          const isVisible = await btn.isVisible();
          if (isVisible) {
            await btn.click();
            await this.page.waitForTimeout(500);
            clicked = true;
          }
        } catch {}
      }
    }
    
    // Scroll to trigger lazy loading
    for (let i = 0; i < 5; i++) {
      await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await this.page.waitForTimeout(1000);
    }
    
    console.log(`✅ Expanded sections (${attempts} attempts)`);
  }

  // Find and follow ALL pagination
  async followPagination(baseUrl: string): Promise<string[]> {
    if (!this.page) return [baseUrl];
    
    const urls: string[] = [baseUrl];
    
    console.log('🔢 Finding pagination...');
    
    // Find next page buttons
    const nextSelectors = [
      'a:has-text("Next")',
      'a:has-text("›")',
      'a[rel="next"]',
      'a[class*="next"]',
      'button:has-text("Next")',
      '[class*="pagination"] a',
      '[class*="pager"] a',
      'nav a',
    ];
    
    for (const selector of nextSelectors) {
      const nextBtn = await this.page.$(selector);
      if (nextBtn) {
        const href = await nextBtn.getAttribute('href');
        if (href && !urls.includes(href)) {
          urls.push(href.startsWith('http') ? href : baseUrl + href);
        }
        
        // Get all page links
        const pageLinks = await this.page.$$('[class*="pagination"] a, [class*="pager"] a, nav a');
        for (const link of pageLinks) {
          const pageHref = await link.getAttribute('href');
          if (pageHref && pageHref.includes('page') && !urls.includes(pageHref)) {
            urls.push(pageHref.startsWith('http') ? pageHref : baseUrl + pageHref);
          }
        }
        break;
      }
    }
    
    console.log(`✅ Found ${urls.length} pages`);
    return urls;
  }

  // Extract ALL data from page
  async extractAll(): Promise<VesselData[]> {
    if (!this.page) return [];
    
    const data = await this.page.evaluate(() => {
      const results: any[] = [];
      
      // Find ALL cards/listings
      const selectors = [
        '[class*="yacht"]', '[class*="boat"]', '[class*="vessel"]',
        '[class*="card"]', '[class*="item"]', '[class*="listing"]',
        'article', '.result', '.product', '.listing-item'
      ];
      
      let cards: Element[] = [];
      for (const sel of selectors) {
        cards = [...cards, ...Array.from(document.querySelectorAll(sel))];
      }
      
      // Dedupe
      cards = [...new Set(cards)];
      
      for (const card of cards) {
        try {
          // Title
          const titleEl = card.querySelector('h1, h2, h3, h4, [class*="title"], [class*="name"]');
          const title = titleEl?.textContent?.trim() || '';
          
          if (!title || title.length < 3) continue;
          
          // Image
          const imgEl = card.querySelector('img');
          let image = imgEl?.getAttribute('src') || '';
          if (!image) image = imgEl?.getAttribute('data-src') || '';
          
          // Link to detail
          const linkEl = card.querySelector('a[href*="yacht"], a[href*="boat"], a[href*="charter"]');
          const link = linkEl?.getAttribute('href') || '';
          
          // Price
          const priceEl = card.querySelector('[class*="price"], [class*="rate"], [class*="cost"], [class*="from"]');
          const priceText = priceEl?.textContent?.trim() || '';
          const priceMatch = priceText.match(/[\d,]+/);
          const price = priceMatch ? parseFloat(priceText.replace(/[^0-9]/g, '')) : 0;
          
          // Location
          const locEl = card.querySelector('[class*="location"], [class*="region"], [class*="destination"], [class*="where"]');
          const location = locEl?.textContent?.trim() || '';
          
          // Specs
          const specEls = card.querySelectorAll('span, td, li, p');
          const specs: string[] = [];
          specEls.forEach(el => {
            const text = el.textContent?.trim() || '';
            if (text && text.length < 50 && !text.includes('...')) {
              specs.push(text);
            }
          });
          
          results.push({
            title,
            image,
            link: link?.startsWith('http') ? link : 'https://www.burgessyachts.com' + link,
            price,
            priceText,
            location,
            specs: specs.slice(0, 10)
          });
        } catch {}
      }
      
      return results;
    });
    
    console.log(`✅ Extracted ${data.length} items`);
    return data;
  }

  // Get full details from detail page
  async getDetail(url: string): Promise<any> {
    if (!this.page) return {};
    
    await this.navigate(url);
    await this.expandAll();
    
    const detail = await this.page.evaluate(() => {
      const data: any = {
        fullDescription: '',
        images: [],
        videos: [],
        specs: {}
      };
      
      // Description - get ALL text content
      const contentEls = document.querySelectorAll('[class*="description"], [class*="detail"], article, .content, main');
      for (const el of contentEls) {
        const text = el.textContent?.trim() || '';
        if (text.length > data.fullDescription.length) {
          data.fullDescription = text;
        }
      }
      
      // ALL images
      const imgs = document.querySelectorAll('img');
      for (const img of imgs) {
        const src = img.getAttribute('src') || '';
        if (src && !src.includes('logo') && !src.includes('icon') && !src.includes('avatar')) {
          data.images.push(src);
        }
      }
      
      // Videos
      const videos = document.querySelectorAll('video source, iframe[src*="youtube"], iframe[src*="vimeo"]');
      for (const v of videos) {
        data.videos.push(v.getAttribute('src') || v.getAttribute('data-src'));
      }
      
      // Specs table
      const rows = document.querySelectorAll('table tr, dl dt, dl dd, [class*="spec"]');
      for (const row of rows) {
        const key = row.querySelector('th, dt, [class*="label"], b, strong')?.textContent?.trim();
        const val = row.querySelector('td, dd, [class*="value"]')?.textContent?.trim();
        if (key && val) {
          data.specs[key] = val;
        }
      }
      
      return data;
    });
    
    return detail;
  }
}

// ============= SCRAPERS FOR EACH SOURCE =============

// Burgess Charter
export async function scrapeBurgessCharter(): Promise<VesselData[]> {
  const crawler = new DeepCrawler();
  const allData: VesselData[] = [];
  
  try {
    await crawler.init();
    
    const baseUrl = 'https://www.burgessyachts.com/en/charter-a-yacht/yachts-for-charter';
    
    // Get all pagination pages
    await crawler.navigate(baseUrl);
    await crawler.expandAll();
    const pages = await crawler.followPagination(baseUrl);
    
    // Scrape each page
    for (const pageUrl of pages.slice(0, 10)) { // Max 10 pages
      await crawler.navigate(pageUrl);
      await crawler.expandAll();
      
      const items = await crawler.extractAll();
      
      // Get detail for each (sample first 5)
      for (const item of items.slice(0, 5)) {
        if (item.link) {
          try {
            const detail = await crawler.getDetail(item.link);
            item.description = detail.fullDescription || item.specs?.join(' ');
            item.images = detail.images?.length ? detail.images : [item.image];
            item.videos = detail.videos || [];
            Object.assign(item.specs, detail.specs || {});
          } catch {}
        }
      }
      
      allData.push(...items);
    }
    
  } finally {
    await crawler.close();
  }
  
  return allData;
}

// Burgess Sale
export async function scrapeBurgessSale(): Promise<VesselData[]> {
  const crawler = new DeepCrawler();
  const allData: VesselData[] = [];
  
  try {
    await crawler.init();
    
    const baseUrl = 'https://www.burgessyachts.com/en/buy-a-yacht/yachts-for-sale';
    
    await crawler.navigate(baseUrl);
    await crawler.expandAll();
    const pages = await crawler.followPagination(baseUrl);
    
    for (const pageUrl of pages.slice(0, 10)) {
      await crawler.navigate(pageUrl);
      await crawler.expandAll();
      const items = await crawler.extractAll();
      allData.push(...items);
    }
  } finally {
    await crawler.close();
  }
  
  return allData;
}

// Global Charter
export async function scrapeGlobalCharter(): Promise<VesselData[]> {
  const crawler = new DeepCrawler();
  const allData: VesselData[] = [];
  
  try {
    await crawler.init();
    
    const pages = [
      'https://www.globalcharter.com/yacht-charter',
      'https://www.globalcharter.com/pt/yacht-charter'
    ];
    
    for (const pageUrl of pages) {
      await crawler.navigate(pageUrl);
      await crawler.expandAll();
      
      const items = await crawler.extractAll();
      allData.push(...items.map(i => ({ ...i, source: 'GLOBALCHARTER' })));
    }
  } finally {
    await crawler.close();
  }
  
  return allData;
}

// Nautal (European charter)
export async function scrapeNautal(): Promise<VesselData[]> {
  const crawler = new DeepCrawler();
  const allData: VesselData[] = [];
  
  try {
    await crawler.init();
    
    const baseUrl = 'https://www.nautal.com';
    const endpoints = [
      '/charter',
      '/yacht-charter'
    ];
    
    for (const endpoint of endpoints) {
      const url = baseUrl + endpoint;
      await crawler.navigate(url);
      await crawler.expandAll();
      
      const items = await crawler.extractAll();
      allData.push(...items.map(i => ({ ...i, source: 'NAUTAL' })));
    }
  } finally {
    await crawler.close();
  }
  
  return allData;
}

// Master function - scrape all
export async function scrapeAll(): Promise<VesselData[]> {
  console.log('\n🛥️ Starting FULL Neptune Marine Scraper...\n');
  
  const allData: VesselData[] = [];
  
  try {
    console.log('\n📡 Scraping BURGESS Charter...');
    const burgessCharter = await scrapeBurgessCharter();
    allData.push(...burgessCharter.map(d => ({ ...d, source: 'BURGESS' })));
    console.log(`✅ Got ${burgessCharter.length} from Burgess`);
    
    console.log('\n📡 Scraping BURGESS Sale...');
    const burgessSale = await scrapeBurgessSale();
    allData.push(...burgessSale.map(d => ({ ...d, source: 'BURGESS' })));
    console.log(`✅ Got ${burgessSale.length} from Burgess Sale`);
    
    console.log('\n📡 Scraping GLOBAL CHARTER...');
    const globalCharter = await scrapeGlobalCharter();
    allData.push(...globalCharter);
    console.log(`✅ Got ${globalCharter.length} from Global Charter`);
    
    console.log('\n📡 Scraping NAUTAL...');
    const nautal = await scrapeNautal();
    allData.push(...nautal);
    console.log(`✅ Got ${nautal.length} from Nautal`);
    
  } catch (e) {
    console.error('❌ Scraping error:', e);
  }
  
  console.log(`\n📊 TOTAL: ${allData.length} items scraped`);
  return allData;
}

// Save to database
export async function saveToDatabase(data: VesselData[]): Promise<number> {
  console.log(`\n💾 Saving ${data.length} vessels to database...`);
  
  let saved = 0;
  
  for (const vessel of data) {
    try {
      const slug = vessel.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      
      const { error } = await supabase.from('vessels').upsert({
        type: 'FULL_CHARTER',
        source: vessel.source || 'BURGESS',
        external_id: slug + '-' + Date.now(),
        title: vessel.title,
        slug: slug + '-' + Math.random().toString(36).substr(2, 9),
        description: vessel.description || vessel.specs?.join(' ') || '',
        short_description: vessel.shortDescription || vessel.priceText || '',
        specs: vessel.specs || {},
        location: vessel.location || '',
        region: vessel.location || '',
        images: vessel.images || (vessel.image ? [vessel.image] : []),
        videos: vessel.videos || [],
        base_price: vessel.basePrice || vessel.price || 0,
        currency: vessel.currency || 'EUR',
        url_original: vessel.urlOriginal || vessel.link || '',
      }, { onConflict: 'slug' });
      
      if (!error) saved++;
    } catch {}
  }
  
  console.log(`✅ Saved ${saved} vessels`);
  return saved;
}

// Run
export async function main() {
  const data = await scrapeAll();
  if (data.length > 0) {
    await saveToDatabase(data);
  }
  console.log('\n✨ COMPLETE!\n');
}
