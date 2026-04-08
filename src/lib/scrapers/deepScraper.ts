import { chromium, type Browser, type Page } from 'playwright';
import { supabase } from '../supabase';

interface ScraperConfig {
  name: string;
  source: string;
  baseUrl: string;
  selectors: {
    vesselCard: string;
    vesselLink: string;
    vesselTitle: string;
    vesselImage: string;
    vesselPrice: string;
    vesselSpecs: string;
    vesselLocation: string;
  };
}

const SOURCES: Record<string, ScraperConfig> = {
  burgess: {
    name: 'Burgess Yachts',
    source: 'BURGESS',
    baseUrl: 'https://www.burgessyachts.com',
    selectors: {
      vesselCard: '[class*="yacht"], [class*="card"], article, .yacht-item',
      vesselLink: 'a[href*="/yacht"]',
      vesselTitle: 'h1, h2, h3, [class*="title"], [class*="name"]',
      vesselImage: 'img',
      vesselPrice: '[class*="price"], [class*="rate"], [class*="rate-from"]',
      vesselSpecs: '[class*="spec"], [class*="detail"], td, li',
      vesselLocation: '[class*="location"], [class*="region"], [class*="destination"]',
    }
  },
  globalcharter: {
    name: 'Global Charter',
    source: 'GLOBALCHARTER',
    baseUrl: 'https://www.globalcharter.com',
    selectors: {
      vesselCard: '[class*="yacht"], [class*="boat"], .card, article',
      vesselLink: 'a[href*="/yacht"]',
      vesselTitle: 'h1, h2, h3, [class*="title"]',
      vesselImage: 'img',
      vesselPrice: '[class*="price"], [class*="cost"]',
      vesselSpecs: '[class*="spec"], [class*="detail"], td',
      vesselLocation: '[class*="location"], [class*="region"]',
    }
  },
  zizoo: {
    name: 'Zizoo',
    source: 'ZIZOO',
    baseUrl: 'https://www.zizoo.com',
    selectors: {
      vesselCard: '[class*="yacht"], [class*="boat"], [class*="rental"], .card',
      vesselLink: 'a[href*="/boat"], a[href*="/yacht"]',
      vesselTitle: 'h1, h2, h3, [class*="title"], [class*="name"]',
      vesselImage: 'img',
      vesselPrice: '[class*="price"], [class*="cost"], [data-price]',
      vesselSpecs: '[class*="spec"], [class*="detail"], .specs-item',
      vesselLocation: '[class*="location"], [class*="region"], [class*="where"]',
    }
  },
  nautal: {
    name: 'Nautal',
    source: 'NAUTAL',
    baseUrl: 'https://www.nautal.com',
    selectors: {
      vesselCard: '[class*="yacht"], [class*="boat"], [class*="listing"], .card',
      vesselLink: 'a[href*="/boat"], a[href*="/yacht"], a[href*="/charter"]',
      vesselTitle: 'h1, h2, h3, [class*="title"], [class*="name"]',
      vesselImage: 'img',
      vesselPrice: '[class*="price"], [class*="rate"], [data-price]',
      vesselSpecs: '[class*="spec"], [class*="characteristic"], td',
      vesselLocation: '[class*="location"], [class*="port"], [class*="region"]',
    }
  },
  clickandboat: {
    name: 'Click and Boat',
    source: 'CLICKANDBOAT',
    baseUrl: 'https://www.clickandboat.com',
    selectors: {
      vesselCard: '[class*="boat"], [class*="yacht"], [class*="ad"], .result-item',
      vesselLink: 'a[href*="/boat"], a[href*="/yacht"], a[href*="/search"]',
      vesselTitle: 'h2, h3, [class*="title"], [class*="name"]',
      vesselImage: 'img',
      vesselPrice: '[class*="price"], [class*="rate"], .price-value',
      vesselSpecs: '[class*="specs"], [class*="details"], li',
      vesselLocation: '[class*="location"], [class*="port"], [class*="city"]',
    }
  },
  dreamYacht: {
    name: 'Dream Yacht Charter',
    source: 'DREAM_YACHT',
    baseUrl: 'https://www.dreamyachtcharter.com',
    selectors: {
      vesselCard: '[class*="yacht"], [class*="boat"], [class*="charter"], .boat-card',
      vesselLink: 'a[href*="/yacht"], a[href*="/boat"]',
      vesselTitle: 'h1, h2, h3, [class*="title"], [class*="boat-name"]',
      vesselImage: 'img',
      vesselPrice: '[class*="price"], [class*="rate"], [data-price]',
      vesselSpecs: '[class*="spec"], [class*="boat-specs"], td',
      vesselLocation: '[class*="base"], [class*="marina"], [class*="destination"]',
    }
  },
  sevenStars: {
    name: 'Seven Stars Yachts',
    source: 'SEVEN_STARS',
    baseUrl: 'https://www.sevenstarsyachts.com',
    selectors: {
      vesselCard: '[class*="yacht"], [class*="boat"], .yacht-card',
      vesselLink: 'a[href*="/yacht"]',
      vesselTitle: 'h1, h2, h3, [class*="yacht-name"]',
      vesselImage: 'img',
      vesselPrice: '[class*="price"], [class*="rate"], [class*="charter-rate"]',
      vesselSpecs: '[class*="specs"], [class*="specifications"], td',
      vesselLocation: '[class*="location"], [class*="base"], [class*="cruise-area"]',
    }
  }
};

class DeepScraper {
  private browser: Browser | null = null;
  private page: Page | null = null;
  private config: ScraperConfig;
  private scrapedData: any[] = [];

  constructor(config: ScraperConfig) {
    this.config = config;
  }

  async init() {
    console.log('🌐 Launching browser...');
    this.browser = await chromium.launch({ 
      headless: true,
      args: ['--disable-blink-features=AutomationControlled', '--no-sandbox']
    });
    this.page = await this.browser.newPage();
    await this.page.setViewportSize({ width: 1920, height: 1080 });
    await this.page.setExtraHTTPHeaders({
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    });
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  // Navigate and wait for content to load
  async navigateAndWait(url: string, waitFor?: string, timeout = 90000) {
    if (!this.page) throw new Error('Browser not initialized');
    
    console.log(`\n📄 Navigating to: ${url}`);
    await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout });
    
    if (waitFor) {
      await this.page.waitForSelector(waitFor, { timeout: 30000 }).catch(() => {
        console.log('⚠️ Wait selector not found, continuing...');
      });
    }
    
    // Wait for any lazy-loaded images
    await this.page.waitForTimeout(2000);
  }

  // Handle collapsible/accordion elements
  async expandAllCollapsible() {
    if (!this.page) return;
    
    console.log('🔽 Expanding collapsible sections...');
    
    // Click all expand buttons
    const expandButtons = await this.page.$$('[class*="expand"], [class*="collapse"], [class*="toggle"], button:has-text("More"), button:has-text("View All"), button:has-text("Show More")');
    
    for (const button of expandButtons) {
      try {
        await button.click();
        await this.page.waitForTimeout(500);
      } catch (e) {
        // Ignore errors
      }
    }
    
    console.log(`✅ Expanded ${expandButtons.length} collapsible sections`);
  }

  // Handle infinite scroll
  async scrollToBottom(maxScrolls = 10) {
    if (!this.page) return;
    
    console.log('📜 Scrolling to bottom...');
    
    for (let i = 0; i < maxScrolls; i++) {
      const before = await this.page.evaluate(() => window.scrollY);
      await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await this.page.waitForTimeout(1000);
      
      const after = await this.page.evaluate(() => window.scrollY);
      if (after === before) {
        console.log('✅ Reached bottom');
        break;
      }
    }
  }

  // Click through pagination
  async scrapePagination(baseUrl: string, pageSelector: string): Promise<string[]> {
    if (!this.page) return [];
    
    const pages: string[] = [baseUrl];
    
    // Find pagination links
    const pageLinks = await this.page.$$(pageSelector);
    
    for (const link of pageLinks) {
      const href = await link.getAttribute('href');
      if (href && !pages.includes(href)) {
        pages.push(href);
      }
    }
    
    console.log(`📄 Found ${pages.length} pages to scrape`);
    return pages;
  }

  // Extract data from current page
  async extractPageData(): Promise<any[]> {
    if (!this.page) return [];
    
    console.log('📊 Extracting data from page...');
    
    const selectors = this.config.selectors;
    const baseUrl = this.config.baseUrl;
    
    const data = await this.page.evaluate(({ baseUrl }) => {
      const results: any[] = [];
      
      // Find all links that might be yachts
      const allLinks = document.querySelectorAll('a[href*="yacht"], a[href*="boat"], a[href*="charter"]');
      
      // Dedupe by href
      const seen = new Set<string>();
      
      allLinks.forEach((link) => {
        try {
          const href = link.getAttribute('href');
          if (!href || href === '#' || seen.has(href)) return;
          seen.add(href);
          
          // Get parent card/container
          const card = link.closest('[class*="card"], article, li, div');
          if (!card) return;
          
          // Skip non-yacht links
          const text = card.textContent?.toLowerCase() || '';
          if (text.includes('destination') || text.includes('journal') || text.includes('news')) {
            return;
          }
          
          // Get title
          const titleEl = card.querySelector('h1, h2, h3, h4, [class*="title"], [class*="name"]');
          let title = titleEl?.textContent?.trim() || '';
          
          // Fallback: use link text
          if (!title) {
            title = link.textContent?.trim() || '';
          }
          
          if (!title || title.length < 3) return;
          
          // Get image
          const imgEl = card.querySelector('img');
          let image = imgEl?.getAttribute('src') || '';
          if (!image) image = imgEl?.getAttribute('data-src') || '';
          
          // Skip logos/icons
          if (image && (image.includes('logo') || image.includes('icon') || image.includes('avatar'))) {
            image = '';
          }
          
          // Skip if no image
          if (!image) return;
          
          // Get price
          const priceEl = card.querySelector('[class*="price"], [class*="rate"], [class*="from"], [class*="cost"]');
          const priceText = priceEl?.textContent?.trim() || '';
          const priceMatch = priceText.match(/[\d,]+/);
          const price = priceMatch ? parseFloat(priceText.replace(/[^0-9]/g, '')) : 0;
          
          // Get location
          const locEl = card.querySelector('[class*="location"], [class*="region"], [class*="destination"], [class*="where"]');
          const location = locEl?.textContent?.trim() || '';
          
          const fullUrl = href.startsWith('http') ? href : baseUrl + href;
          
          results.push({
            title,
            image,
            link: fullUrl,
            priceText,
            price,
            specs: [],
            location,
          });
        } catch (e) {
          // Skip failed
        }
      });
      
      return results;
    }, { selectors, baseUrl });
    
    console.log(`✅ Extracted ${data.length} items from current page`);
    return data;
  }

  // Scrape detail page for full data
  async scrapeDetailPage(url: string): Promise<any> {
    if (!this.page) return {};
    
    console.log(`🔍 Scraping detail: ${url}`);
    
    try {
      await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90000 });
      
      // Wait for main content
      await this.page.waitForTimeout(3000);
      
      // Expand all collapsible sections
      await this.expandAllCollapsible();
      await this.scrollToBottom(3);
      
      const detail = await this.page.evaluate(() => {
        const data: any = {
          title: '',
          description: '',
          fullDescription: '',
          shortDescription: '',
          specs: {},
          images: [],
          videos: [],
          features: [],
          layout: {},
          location: '',
          price: 0,
          priceText: '',
          year: '',
          length: '',
          builder: '',
          speed: '',
          cabins: '',
          guests: '',
          crew: ''
        };
        
        // Get title
        const titleEl = document.querySelector('h1, [class*="title"]');
        data.title = titleEl?.textContent?.trim() || '';
        
        // Get description - multiple attempts
        const descSelectors = [
          '[class*="description"]',
          '[class*="about"]', 
          '[class*="details"]',
          'article',
          '[class*="content"]'
        ];
        
        for (const sel of descSelectors) {
          const el = document.querySelector(sel);
          if (el && el.textContent?.length > 100) {
            data.description = el.textContent?.trim().substring(0, 5000) || '';
            break;
          }
        }
        
        // Get specs from tables
        const specTables = document.querySelectorAll('table, [class*="specs"], [class*="specifications"]');
        specTables.forEach(table => {
          const rows = table.querySelectorAll('tr, li, .row');
          rows.forEach(row => {
            const keyEl = row.querySelector('th, [class*="label"], [class*="name"], td:first-child');
            const valEl = row.querySelector('td:last-child, [class*="value"], td:nth-child(2)');
            const key = keyEl?.textContent?.trim();
            const val = valEl?.textContent?.trim();
            if (key && val && key.length < 50) {
              data.specs[key] = val;
              
              // Store individual fields with type conversion
              const lowerKey = key.toLowerCase();
              const numMatch = val.match(/[\d,.]+/);
              const numVal = numMatch ? parseFloat(numMatch[0].replace(/,/g, '')) : null;
              
              if (lowerKey.includes('length') && numVal) {
                data.length = numVal.toString();
                data.lengthFeet = (numVal * 3.28084).toString();
              }
              if (lowerKey.includes('year') && numVal) data.year = Math.round(numVal).toString();
              if (lowerKey.includes('beam') && numVal) data.beam = numVal.toString();
              if (lowerKey.includes('draft') && numVal) data.draft = numVal.toString();
              if (lowerKey.includes('speed') && numVal) data.speed = numVal.toString();
              if (lowerKey.includes('cabin') && numVal) data.cabins = Math.round(numVal).toString();
              if (lowerKey.includes('guest') && numVal) data.guests = Math.round(numVal).toString();
              if (lowerKey.includes('crew') && numVal) data.crew = Math.round(numVal).toString();
              if (lowerKey.includes('builder') || lowerKey.includes('manufacturer')) data.builder = val;
              if (lowerKey.includes('engine')) data.engine = val;
              if (lowerKey.includes('fuel')) data.fuelCapacity = numVal?.toString();
              if (lowerKey.includes('water')) data.waterCapacity = numVal?.toString();
              if (lowerKey.includes('bath') && numVal) data.bathrooms = Math.round(numVal).toString();
            }
          });
        });
        
        // Get yacht type (motor, sailing, catamaran, etc.)
        const typeEl = document.querySelector('[class*="type"], [class*="category"], [class*="yacht-type"], .yacht-type');
        if (typeEl) {
          const typeText = typeEl.textContent?.toLowerCase() || '';
          if (typeText.includes('motor')) data.yachtType = 'MOTOR_YACHT';
          else if (typeText.includes('sailing') || typeText.includes('sail')) data.yachtType = 'SAILING_YACHT';
          else if (typeText.includes('catamaran')) data.yachtType = 'CATAMARAN';
          else if (typeText.includes('gulet')) data.yachtType = 'GULLET';
        }
        
        // Get charter type
        const charterTypeEl = document.querySelector('[class*="charter-type"], [class*="charterType"]');
        if (charterTypeEl) {
          const charterText = charterTypeEl.textContent?.toLowerCase() || '';
          if (charterText.includes('crew')) data.charterType = 'CREWED';
          else if (charterText.includes('cabin')) data.charterType = 'CABIN';
          else if (charterText.includes('bareboat')) data.charterType = 'BAREBOAT';
          else if (charterText.includes('day')) data.charterType = 'DAY';
        }
        
        // Get operating areas / destinations
        const destEls = document.querySelectorAll('[class*="destination"], [class*="operating"], [class*="region"], [class*="where"]');
        const destinations: string[] = [];
        destEls.forEach(el => {
          const text = el.textContent?.trim();
          if (text && text.length < 50 && text.length > 2) {
            destinations.push(text);
          }
        });
        if (destinations.length > 0) data.destinations = destinations;
        
        // Get deck info
        const deckInfo = document.querySelectorAll('[class*="deck"], [class*="layout"]');
        const layout: Record<string, string> = {};
        deckInfo.forEach(deck => {
          const title = deck.querySelector('h2, h3, h4, [class*="title"]')?.textContent?.trim();
          const content = deck.textContent?.trim();
          if (title && content) {
            layout[title] = content.substring(0, 500);
          }
        });
        if (Object.keys(layout).length > 0) data.layout = layout;
        
        // Get ALL images - gallery, slideshow, thumbnails
        const allImages = document.querySelectorAll('img');
        const imageUrls = new Set<string>();
        allImages.forEach(img => {
          let src = img.getAttribute('src') || img.getAttribute('data-src') || '';
          if (src && !src.includes('logo') && !src.includes('icon') && !src.includes('avatar') && !src.includes('pixel')) {
            // Clean URL
            if (src.startsWith('//')) src = 'https:' + src;
            imageUrls.add(src);
          }
        });
        data.images = Array.from(imageUrls).slice(0, 30);
        
        // Get videos - embeds, iframes, video tags
        const videoElements = document.querySelectorAll('iframe[src*="youtube"], iframe[src*="vimeo"], video source, video[src]');
        const videoUrls = new Set<string>();
        videoElements.forEach(v => {
          const src = v.getAttribute('src');
          if (src) videoUrls.add(src);
        });
        data.videos = Array.from(videoUrls);
        
        // Get location/region
        const locSelectors = ['[class*="location"]', '[class*="region"]', '[class*="destination"]', '[class*="where"]'];
        for (const sel of locSelectors) {
          const el = document.querySelector(sel);
          if (el) {
            data.location = el.textContent?.trim() || '';
            break;
          }
        }
        
        // Get price
        const priceSelectors = ['[class*="price"]', '[class*="rate"]', '[class*="cost"]', '[class*="from"]'];
        for (const sel of priceSelectors) {
          const el = document.querySelector(sel);
          if (el) {
            data.priceText = el.textContent?.trim() || '';
            const match = data.priceText.match(/[\d,]+/);
            if (match) data.price = parseFloat(match[0].replace(/,/g, ''));
            break;
          }
        }
        
        // Get features/amenities
        const featureLists = document.querySelectorAll('[class*="feature"], [class*="amenity"], [class*="equipment"]');
        const features: string[] = [];
        featureLists.forEach(list => {
          const items = list.querySelectorAll('li, span, a');
          items.forEach(item => {
            const text = item.textContent?.trim();
            if (text && text.length < 50 && text.length > 2) {
              features.push(text);
            }
          });
        });
        data.features = features.slice(0, 30);
        
        return data;
      });
      
      return detail;
    } catch (e) {
      console.log(`⚠️ Error scraping detail: ${url}`);
      return {};
    }
  }

  // Main scrape function
  async scrape(options: {
    pages?: string[];
    detailPages?: boolean;
    maxItems?: number;
  } = {}): Promise<any[]> {
    const allData: any[] = [];
    const { detailPages = false, maxItems = 100 } = options;
    let pagesToScrape = options.pages || [this.config.baseUrl];

    for (const pageUrl of pagesToScrape) {
      if (allData.length >= maxItems) break;
      
      await this.navigateAndWait(pageUrl);
      await this.expandAllCollapsible();
      await this.scrollToBottom(5);
      
      const pageData = await this.extractPageData();
      
      if (detailPages && pageData.length > 0) {
        // Scrape detail pages for full data
        const detailPromises = pageData.slice(0, 10).map(async (item) => {
          if (item.link) {
            const detail = await this.scrapeDetailPage(item.link);
            return { ...item, ...detail };
          }
          return item;
        });
        
        const detailedData = await Promise.all(detailPromises);
        allData.push(...detailedData);
      } else {
        allData.push(...pageData);
      }
      
      console.log(`📊 Total scraped: ${allData.length}`);
    }
    
    this.scrapedData = allData;
    return allData;
  }

  getData() {
    return this.scrapedData;
  }
}

// Specific scraper for Burgess
export async function scrapeBurgess(): Promise<any[]> {
  console.log('\n🛥️ Starting BURGESS scraper...\n');
  
  const scraper = new DeepScraper(SOURCES.burgess);
  
  try {
    await scraper.init();
    
    // Scrape charter page
    const charterUrl = 'https://www.burgessyachts.com/en/charter-a-yacht/yachts-for-charter';
    const data = await scraper.scrape({
      pages: [charterUrl],
      detailPages: true,
      maxItems: 50
    });
    
    return data;
  } finally {
    await scraper.close();
  }
}

// Specific scraper for Global Charter
export async function scrapeGlobalCharter(): Promise<any[]> {
  console.log('\n🌐 Starting GLOBAL CHARTER scraper...\n');
  
  const scraper = new DeepScraper(SOURCES.globalcharter);
  
  try {
    await scraper.init();
    
    const yachtUrl = 'https://www.globalcharter.com/pt/yacht-charter';
    const data = await scraper.scrape({
      pages: [yachtUrl],
      detailPages: true,
      maxItems: 50
    });
    
    return data;
  } finally {
    await scraper.close();
  }
}

// Multi-source scraper
export async function scrapeAllSources(): Promise<any[]> {
  const allData: any[] = [];
  
  try {
    // Burgess
    const burgessData = await scrapeBurgess();
    allData.push(...burgessData.map(d => ({ ...d, source: 'BURGESS' })));
    
    // Global Charter  
    const globalData = await scrapeGlobalCharter();
    allData.push(...globalData.map(d => ({ ...d, source: 'GLOBALCHARTER' })));
    
    // Zizoo
    const zizooData = await scrapeZizoo();
    allData.push(...zizooData.map(d => ({ ...d, source: 'ZIZOO' })));
    
    // Nautal
    const nautalData = await scrapeNautal();
    allData.push(...nautalData.map(d => ({ ...d, source: 'NAUTAL' })));
    
    // Click and Boat
    const clickandboatData = await scrapeClickAndBoat();
    allData.push(...clickandboatData.map(d => ({ ...d, source: 'CLICKANDBOAT' })));
    
    // Dream Yacht
    const dreamYachtData = await scrapeDreamYacht();
    allData.push(...dreamYachtData.map(d => ({ ...d, source: 'DREAM_YACHT' })));
    
    // Seven Stars
    const sevenStarsData = await scrapeSevenStars();
    allData.push(...sevenStarsData.map(d => ({ ...d, source: 'SEVEN_STARS' })));
    
  } catch (e) {
    console.error('❌ Scraping error:', e);
  }
  
  return allData;
}

// Specific scraper for Zizoo
export async function scrapeZizoo(): Promise<any[]> {
  console.log('\n🚤 Starting ZIZOO scraper...\n');
  
  const scraper = new DeepScraper(SOURCES.zizoo);
  
  try {
    await scraper.init();
    
    const yachtUrl = 'https://www.zizoo.com/en/yacht-charter';
    const data = await scraper.scrape({
      pages: [yachtUrl],
      detailPages: true,
      maxItems: 30
    });
    
    return data;
  } finally {
    await scraper.close();
  }
}

// Specific scraper for Nautal
export async function scrapeNautal(): Promise<any[]> {
  console.log('\n⚓ Starting NAUTAL scraper...\n');
  
  const scraper = new DeepScraper(SOURCES.nautal);
  
  try {
    await scraper.init();
    
    const yachtUrl = 'https://www.nautal.com/yacht-charter';
    const data = await scraper.scrape({
      pages: [yachtUrl],
      detailPages: true,
      maxItems: 30
    });
    
    return data;
  } finally {
    await scraper.close();
  }
}

// Specific scraper for Click and Boat
export async function scrapeClickAndBoat(): Promise<any[]> {
  console.log('\n🚤 Starting CLICK AND BOAT scraper...\n');
  
  const scraper = new DeepScraper(SOURCES.clickandboat);
  
  try {
    await scraper.init();
    
    const yachtUrl = 'https://www.clickandboat.com/en/yacht-charter';
    const data = await scraper.scrape({
      pages: [yachtUrl],
      detailPages: true,
      maxItems: 30
    });
    
    return data;
  } finally {
    await scraper.close();
  }
}

// Specific scraper for Dream Yacht
export async function scrapeDreamYacht(): Promise<any[]> {
  console.log('\n🌊 Starting DREAM YACHT scraper...\n');
  
  const scraper = new DeepScraper(SOURCES.dreamYacht);
  
  try {
    await scraper.init();
    
    const yachtUrl = 'https://www.dreamyachtcharter.com/yachts';
    const data = await scraper.scrape({
      pages: [yachtUrl],
      detailPages: true,
      maxItems: 30
    });
    
    return data;
  } finally {
    await scraper.close();
  }
}

// Specific scraper for Seven Stars
export async function scrapeSevenStars(): Promise<any[]> {
  console.log('\n⭐ Starting SEVEN STARS scraper...\n');
  
  const scraper = new DeepScraper(SOURCES.sevenStars);
  
  try {
    await scraper.init();
    
    const yachtUrl = 'https://www.sevenstarsyachts.com/yachts';
    const data = await scraper.scrape({
      pages: [yachtUrl],
      detailPages: true,
      maxItems: 30
    });
    
    return data;
  } finally {
    await scraper.close();
  }
}

// Save to database
export async function saveScrapedData(data: any[]): Promise<number> {
  console.log(`\n💾 Saving ${data.length} items to database...`);
  console.log('📋 Sample data:', JSON.stringify(data.slice(0, 2), null, 2));
  
  let saved = 0;
  
  for (const item of data) {
    try {
      const slug = item.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      
      // Parse numeric values
      const parseNum = (val: any) => {
        if (typeof val === 'number') return val;
        if (typeof val === 'string') {
          const match = val.match(/[\d,.]+/);
          return match ? parseFloat(match[0].replace(/,/g, '')) : null;
        }
        return null;
      };
      
      const vesselData = {
        type: 'FULL_CHARTER',
        source: (item.source || 'BURGESS') as any,
        external_id: slug + '-' + Date.now(),
        title: item.title,
        slug: slug + '-' + Math.random().toString(36).substr(2, 9),
        description: item.description || item.fullDescription || item.specs?.join(' ') || '',
        short_description: item.shortDescription || item.priceText || '',
        
        // Categorization
        yacht_type: item.yachtType || null,
        charter_type: item.charterType || 'CREWED',
        
        // Specs
        length: parseNum(item.length),
        length_feet: parseNum(item.lengthFeet),
        beam: parseNum(item.beam),
        draft: parseNum(item.draft),
        year: parseNum(item.year),
        builder: item.builder || null,
        model: item.model || null,
        refit_year: parseNum(item.refitYear),
        engine: item.engine || null,
        max_speed: parseNum(item.maxSpeed) || parseNum(item.speed),
        cruising_speed: parseNum(item.cruisingSpeed),
        fuel_capacity: parseNum(item.fuelCapacity),
        water_capacity: parseNum(item.waterCapacity),
        
        cabins: parseNum(item.cabins) || parseNum(item.guestCabins),
        guest_cabins: parseNum(item.guestCabins),
        beds: parseNum(item.beds),
        bathrooms: parseNum(item.bathrooms),
        guests: parseNum(item.guests) || 0,
        crew: parseNum(item.crew) || 0,
        
        specs: item.specs || {},
        
        // Locations & Regions
        location: item.location || '',
        region: item.region || item.location || '',
        departure_port: item.departurePort || null,
        arrival_port: item.arrivalPort || null,
        operating_areas: item.operatingAreas || item.destinations || [],
        destinations: item.destinations || [],
        
        // Features & Amenities
        features: item.features || [],
        amenities: item.amenities || [],
        water_toys: item.waterToys || [],
        entertainment: item.entertainment || [],
        
        // Media
        images: item.images?.length ? item.images : (item.image ? [item.image] : []),
        videos: item.videos || [],
        virtual_tour_url: item.virtualTourUrl || null,
        
        // Pricing
        base_price: parseNum(item.price) || parseNum(item.pricePerWeek) || 0,
        currency: item.priceText?.includes('€') ? 'EUR' : 'USD',
        price_per_week: parseNum(item.pricePerWeek),
        price_per_day: parseNum(item.pricePerDay),
        price_plus_expenses: item.pricePlusExpenses || false,
        
        // Availability
        is_available: true,
        
        url_original: item.link || '',
      };
      
      const { error } = await supabase
        .from('vessels')
        .upsert(vesselData, { onConflict: 'slug' });
      
      if (error) {
        console.log('❌ Save error:', error.message);
      } else {
        saved++;
      }
    } catch (e: any) {
      console.log('❌ Exception:', e.message);
    }
  }
  
  console.log(`✅ Saved ${saved} vessels`);
  return saved;
}

// Save images to disk
export async function saveImagesToDisk(data: any[]): Promise<void> {
  const axios = (await import('axios')).default;
  const fs = (await import('fs')).default;
  const path = (await import('path')).default;
  
  const baseDir = path.join(process.cwd(), 'public', 'images', 'yachts');
  
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
  }
  
  let totalSaved = 0;
  
  for (const item of data) {
    const slug = item.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 50);
    
    // Save thumbnail
    if (item.image) {
      const imageUrl = item.image.startsWith('http') 
        ? item.image 
        : `https://www.burgessyachts.com${item.image}`;
      
      if (imageUrl.includes('/') && imageUrl.match(/\.(jpg|jpeg|png|webp|gif)/i)) {
        const ext = path.extname(new URL(imageUrl).pathname) || '.jpg';
        const filename = `${slug}-thumb${ext}`;
        const filepath = path.join(baseDir, filename);
        
        try {
          const response = await axios.get(imageUrl, {
            responseType: 'arraybuffer',
            timeout: 10000
          });
          fs.writeFileSync(filepath, response.data);
          totalSaved++;
          item.localImage = `/images/yachts/${filename}`;
        } catch (e) {}
      }
    }
    
    // Save all gallery images
    if (item.images && item.images.length > 0) {
      const galleryDir = path.join(baseDir, slug);
      if (!fs.existsSync(galleryDir)) {
        fs.mkdirSync(galleryDir, { recursive: true });
      }
      
      for (let i = 0; i < item.images.length; i++) {
        const imgUrl = item.images[i];
        if (!imgUrl) continue;
        
        let fullUrl = imgUrl;
        if (!imgUrl.startsWith('http')) {
          if (imgUrl.startsWith('//')) {
            fullUrl = 'https:' + imgUrl;
          } else {
            fullUrl = `https://www.burgessyachts.com${imgUrl}`;
          }
        }
        
        if (!fullUrl.match(/\.(jpg|jpeg|png|webp|gif)/i)) continue;
        
        try {
          const ext = path.extname(new URL(fullUrl).pathname) || '.jpg';
          const filename = `${slug}-${i + 1}${ext}`;
          const filepath = path.join(galleryDir, filename);
          
          const response = await axios.get(fullUrl, {
            responseType: 'arraybuffer',
            timeout: 10000
          });
          fs.writeFileSync(filepath, response.data);
          totalSaved++;
        } catch (e) {}
      }
    }
  }
  
  console.log(`✅ Saved ${totalSaved} images to ${baseDir}`);
}

// Export for use in scripts
export { DeepScraper, SOURCES };
