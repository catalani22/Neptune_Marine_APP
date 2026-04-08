#!/usr/bin/env node
import 'dotenv/config';
import { scrapeAllSources, saveScrapedData, saveImagesToDisk } from '../src/lib/scrapers/deepScraper';

async function main() {
  console.log('🛥️ Neptune Marine Scraper CLI\n');
  
  const data = await scrapeAllSources();
  
  if (data.length > 0) {
    console.log('\n📥 Saving images to disk...');
    await saveImagesToDisk(data);
    
    console.log('\n💾 Saving to database...');
    await saveScrapedData(data);
  }
  
  console.log(`\n✅ Scraped ${data.length} items`);
}

main().catch(console.error);
