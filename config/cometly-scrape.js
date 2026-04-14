/**
 * Cometly Scraper — Configurable Date Range
 * Pulls Meta + Google campaign and ad-level data for The Hard Money Co.
 * 
 * Usage: node cometly-scrape.js [days]  (default: 14)
 */

const { chromium } = require('/opt/homebrew/lib/node_modules/playwright');
const fs = require('fs');

const EMAIL = 'toro6ot@gmail.com';
const PASS  = '1getshitdone!';
const LOGIN_URL  = 'https://app.cometly.com/login';
const META_URL   = 'https://app.cometly.com/ad_accounts/fb_3377699796000006';
const GOOGLE_URL = 'https://app.cometly.com/ad_accounts/gg_3377699775000010';

const DAYS = parseInt(process.argv[2] || '14');
const DATE_LABEL = DAYS === 7 ? 'Last 7 Days' :
                   DAYS === 14 ? 'Last 14 Days' :
                   DAYS === 30 ? 'Last 30 Days' :
                   DAYS === 60 ? 'Last 60 Days' :
                   DAYS === 90 ? 'Last 90 Days' : 'Last 14 Days';

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function createPage(browser) {
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    viewport: { width: 1920, height: 1080 },
  });
  const page = await context.newPage();
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
    window.chrome = { runtime: {} };
  });
  return { context, page };
}

async function login(page) {
  console.log('→ Logging in...');
  await page.goto(LOGIN_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await sleep(2000);
  await page.fill('input[name="email"]', EMAIL);
  await page.fill('input[type="password"]', PASS);
  await page.evaluate(() => {
    document.querySelectorAll('button[type="submit"]').forEach(b => { b.removeAttribute('disabled'); b.disabled = false; });
  });
  await page.locator('button[type="submit"]').first().click();
  await page.waitForFunction(() => !window.location.pathname.includes('/login'), { timeout: 20000 });
  console.log('✓ Logged in');
  await sleep(2000);
}

async function setAttribution(page) {
  console.log('  → Setting attribution: Linear Paid / 30-day window...');

  // --- Attribution MODEL: click the first dropdown, pick "Linear Paid" ---
  const modelBtn = await page.evaluate(() => {
    for (const el of document.querySelectorAll('button')) {
      const t = (el.textContent || '').trim();
      if (t.includes('Touch') || t.includes('Linear') || t.includes('Last Touch') || t.includes('Attribution model')) {
        const r = el.getBoundingClientRect();
        if (r.width > 0 && r.width < 400) return { x: r.x, y: r.y, w: r.width, h: r.height, t };
      }
    }
    return null;
  });
  if (modelBtn) {
    await page.mouse.click(modelBtn.x + modelBtn.w/2, modelBtn.y + modelBtn.h/2);
    await sleep(1500);
    // Click "Linear Paid" option
    const clicked = await page.evaluate(() => {
      for (const el of document.querySelectorAll('li, div, span, button, a')) {
        const t = (el.textContent || '').trim();
        if (t === 'Linear Paid' || t.startsWith('Linear Paid')) {
          const r = el.getBoundingClientRect();
          if (r.width > 0 && r.height > 0) { el.click(); return t; }
        }
      }
      return null;
    });
    if (clicked) {
      console.log('    ✓ Attribution model set to:', clicked);
      await sleep(1500);
    } else {
      console.log('    ⚠ "Linear Paid" option not found in dropdown');
      await page.keyboard.press('Escape');
      await sleep(500);
    }
  } else {
    console.log('    ⚠ Attribution model button not found');
  }

  // --- Attribution WINDOW: click the window dropdown, pick "30 days" ---
  const windowBtn = await page.evaluate(() => {
    for (const el of document.querySelectorAll('button')) {
      const t = (el.textContent || '').trim();
      if (t.includes('Attribution window') || t.includes('window:')) {
        const r = el.getBoundingClientRect();
        if (r.width > 0 && r.width < 400) return { x: r.x, y: r.y, w: r.width, h: r.height, t };
      }
    }
    return null;
  });
  if (windowBtn) {
    await page.mouse.click(windowBtn.x + windowBtn.w/2, windowBtn.y + windowBtn.h/2);
    await sleep(2000); // wait for dropdown to fully render
    const clicked = await page.evaluate(() => {
      // Options are: LTV, 1 Day, 7 Days, 14 Days, 28 Days, 30 Days
      for (const el of document.querySelectorAll('li, div, span, button, a, [role="option"]')) {
        const t = (el.textContent || '').trim();
        if (t === '30 Days' || t === '30 days' || t === '30d') {
          const r = el.getBoundingClientRect();
          if (r.width > 0 && r.height > 0 && r.top > 0 && r.top < window.innerHeight) {
            el.click();
            return t;
          }
        }
      }
      return null;
    });
    if (clicked) {
      console.log('    ✓ Attribution window set to:', clicked);
      await sleep(1500);
    } else {
      console.log('    ⚠ "30 Days" option not found — dumping visible options:');
      const opts = await page.evaluate(() => {
        const seen = [];
        document.querySelectorAll('li, [role="option"]').forEach(el => {
          const t = (el.textContent || '').trim();
          const r = el.getBoundingClientRect();
          if (t && r.width > 0 && r.height > 0 && t.length < 40) seen.push(t);
        });
        return seen;
      });
      console.log('    Options found:', opts.join(' | '));
      await page.keyboard.press('Escape');
      await sleep(500);
    }
  } else {
    console.log('    ⚠ Attribution window button not found');
  }
}

async function setDate(page, dateLabel) {
  console.log(`  → Setting date: ${dateLabel}`);
  await page.$eval('.dp__input_wrap', el => el.click());
  await sleep(1500);
  
  const bbox = await page.evaluate((label) => {
    const menu = document.querySelector('.dp__outer_menu_wrap');
    if (!menu) return null;
    for (const el of menu.querySelectorAll('*')) {
      if ((el.textContent || '').trim() === label) {
        const r = el.getBoundingClientRect();
        return { x: r.x, y: r.y, w: r.width, h: r.height };
      }
    }
    return null;
  }, dateLabel);
  
  if (bbox) {
    await page.mouse.click(bbox.x + bbox.w/2, bbox.y + bbox.h/2);
    await sleep(2000);
    console.log('    ✓ Date set');
  } else {
    console.log(`    ⚠ "${dateLabel}" not found`);
    await page.keyboard.press('Escape');
    await sleep(500);
  }
}

async function selectTorobotPreset(page) {
  console.log('  → Selecting Toro-Bot preset...');
  
  // Debug: show what's on the page
  const pageText = await page.evaluate(() => {
    const items = [];
    document.querySelectorAll('button, [class*="cursor-pointer"]').forEach(el => {
      const t = (el.textContent || '').trim().substring(0, 60);
      if (t && !items.includes(t)) items.push(t);
    });
    return items.slice(0, 30);
  });
  console.log('    Page buttons/clickable:', pageText.join(' | '));
  
  const colsBBox = await page.evaluate(() => {
    // Find the Columns button — could have Material Icon text prepended
    // Look for elements containing 'Columns:' somewhere in text, small and clickable
    const candidates = [];
    for (const el of document.querySelectorAll('button, [class*="cursor-pointer"], div, span')) {
      if (el.children.length > 3) continue; // skip containers
      const txt = (el.textContent || '').trim();
      if (txt.includes('Columns:') || txt.includes('Columns: Default') || txt.includes('Columns: Toro-Bot')) {
        const r = el.getBoundingClientRect();
        if (r.width > 0 && r.height > 0 && r.width < 300) {
          candidates.push({ x: r.x, y: r.y, w: r.width, h: r.height, txt: txt.substring(0, 80) });
        }
      }
    }
    // pick the smallest (most specific) element
    if (candidates.length > 0) {
      candidates.sort((a, b) => (a.w * a.h) - (b.w * b.h));
      return candidates[0];
    }
    return null;
  });
  if (!colsBBox) { console.log('    ⚠ Columns btn not found'); return false; }
  console.log(`    Found Columns btn: "${colsBBox.txt}" at (${Math.round(colsBBox.x)},${Math.round(colsBBox.y)})`);
  await page.mouse.click(colsBBox.x + colsBBox.w/2, colsBBox.y + colsBBox.h/2);
  await sleep(1500);
  
  // The dropdown opened after clicking Columns — find it by looking for a container
  // positioned near the Columns button (right side of page, x > 1000) that contains Toro-Bot
  const tbPos = await page.evaluate(() => {
    // Find all elements with exact text "Toro-Bot"
    const allTB = [];
    for (const el of document.querySelectorAll('*')) {
      if ((el.textContent || '').trim() === 'Toro-Bot') {
        const r = el.getBoundingClientRect();
        allTB.push({ el, r, tag: el.tagName, cls: el.className });
      }
    }
    // The preset option will be inside a dropdown on the right side (x > 1000)
    // Filter out sidebar items (x < 200)
    const rightSide = allTB.filter(item => item.r.x > 200 && item.r.width > 0 && item.r.height > 0);
    if (rightSide.length > 0) {
      // If the dropdown is open but Toro-Bot is off-screen (y > viewport), scroll it into view
      const item = rightSide[0];
      if (item.r.top < 0 || item.r.top > window.innerHeight) {
        item.el.scrollIntoView({ block: 'center', behavior: 'instant' });
        return 'scroll-needed';
      }
      return { x: item.r.x, y: item.r.y, w: item.r.width, h: item.r.height };
    }
    return null;
  });

  if (!tbPos) { console.log('    ⚠ Toro-Bot option not found (no right-side match)'); return false; }
  
  if (tbPos === 'scroll-needed') {
    await sleep(400);
    // Re-query after scroll
    const tbPos2 = await page.evaluate(() => {
      for (const el of document.querySelectorAll('*')) {
        if ((el.textContent || '').trim() === 'Toro-Bot') {
          const r = el.getBoundingClientRect();
          if (r.x > 200 && r.width > 0 && r.height > 0 && r.top >= 0 && r.top < window.innerHeight) {
            return { x: r.x, y: r.y, w: r.width, h: r.height };
          }
        }
      }
      return null;
    });
    if (!tbPos2) { console.log('    ⚠ Toro-Bot not in viewport after scroll'); return false; }
    await page.mouse.click(tbPos2.x + tbPos2.w/2, tbPos2.y + tbPos2.h/2);
  } else {
    await page.mouse.click(tbPos.x + tbPos.w/2, tbPos.y + tbPos.h/2);
  }
  await sleep(3500); // wait for column reload
  console.log('    ✓ Toro-Bot applied');
  return true;
}

async function extractAllData(page) {
  // Collect all headers by scrolling
  const allHeaders = {};
  
  for (const scrollLeft of [0, 500, 1000, 1500, 2000, 2500, 3000]) {
    await page.evaluate((sl) => {
      const vp = document.querySelector('.ag-body-horizontal-scroll-viewport');
      if (vp) vp.scrollLeft = sl;
    }, scrollLeft);
    await sleep(200);
    
    const headers = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('.ag-header-cell')).map(h => {
        const t = h.querySelector('.ag-header-cell-text');
        return { text: (t ? t.innerText : h.innerText || '').trim(), colId: h.getAttribute('col-id') || '' };
      }).filter(h => h.text && h.text !== 'Off/On' && h.colId);
    });
    headers.forEach(h => { if (!allHeaders[h.colId]) allHeaders[h.colId] = h.text; });
    
    // Collect cells at this scroll position
    const cells = await page.evaluate(() => {
      const result = {};
      document.querySelectorAll('.ag-row').forEach(row => {
        const rowId = row.getAttribute('row-id');
        if (rowId === null || rowId === undefined || rowId === '') return;
        if (!result[rowId]) result[rowId] = {};
        row.querySelectorAll('.ag-cell').forEach(cell => {
          const colId = cell.getAttribute('col-id');
          if (colId) result[rowId][colId] = (cell.innerText || '').trim();
        });
      });
      return result;
    });
    
    // Store in allCells
    if (!this._allCells) this._allCells = {};
    for (const [rowId, rowCells] of Object.entries(cells)) {
      if (!this._allCells[rowId]) this._allCells[rowId] = {};
      Object.assign(this._allCells[rowId], rowCells);
    }
  }
  
  // Reset scroll
  await page.evaluate(() => {
    const vp = document.querySelector('.ag-body-horizontal-scroll-viewport');
    if (vp) vp.scrollLeft = 0;
  });
  
  return { headers: allHeaders, cells: this._allCells || {} };
}

// Cleaner approach - use page.evaluate closure
async function collectData(page) {
  const allHeaders = {};
  const allCells = {};
  
  for (const scrollLeft of [0, 500, 1000, 1500, 2000, 2500, 3000]) {
    await page.evaluate((sl) => {
      const vp = document.querySelector('.ag-body-horizontal-scroll-viewport');
      if (vp) vp.scrollLeft = sl;
    }, scrollLeft);
    await sleep(200);
    
    const snapshot = await page.evaluate(() => {
      const headers = {};
      document.querySelectorAll('.ag-header-cell').forEach(h => {
        const t = h.querySelector('.ag-header-cell-text');
        const colId = h.getAttribute('col-id');
        const text = (t ? t.innerText : h.innerText || '').trim();
        if (colId && text && text !== 'Off/On') headers[colId] = text;
      });
      
      const cells = {};
      document.querySelectorAll('.ag-row').forEach(row => {
        const rowId = row.getAttribute('row-id');
        if (rowId === null || rowId === undefined || rowId === '') return;
        if (!cells[rowId]) cells[rowId] = {};
        row.querySelectorAll('.ag-cell').forEach(cell => {
          const colId = cell.getAttribute('col-id');
          if (colId) {
            cells[rowId][colId] = (cell.innerText || '').trim();
            // Capture external platform link (e.g. Meta Ads Manager, Google Ads)
            if (colId === 'name') {
              const anchors = cell.querySelectorAll('a');
              anchors.forEach(a => {
                const href = a.href || '';
                if (href.includes('adsmanager.facebook.com') || href.includes('google.com/aw') || href.includes('ads.google.com')) {
                  cells[rowId]['_platform_url'] = href;
                }
              });
            }
          }
        });
      });
      
      return { headers, cells };
    });
    
    Object.assign(allHeaders, snapshot.headers);
    for (const [rowId, rowCells] of Object.entries(snapshot.cells)) {
      if (!allCells[rowId]) allCells[rowId] = {};
      Object.assign(allCells[rowId], rowCells);
    }
  }
  
  // Reset scroll
  await page.evaluate(() => {
    const vp = document.querySelector('.ag-body-horizontal-scroll-viewport');
    if (vp) vp.scrollLeft = 0;
  });
  
  return { headers: allHeaders, rows: Object.entries(allCells).map(([id, cells]) => ({ id, cells })) };
}

async function scrapeTab(page, tabText, label) {
  console.log(`\n  → "${tabText}" tab...`);
  
  // Try multiple selectors for tabs
  let tabClicked = false;
  const selectors = [
    `a:has-text("${tabText}")`,
    `button:has-text("${tabText}")`,
    `[role="tab"]:has-text("${tabText}")`,
    `span:has-text("${tabText}")`,
  ];
  for (const sel of selectors) {
    const el = page.locator(sel).first();
    if (await el.isVisible({ timeout: 2000 }).catch(() => false)) {
      await el.click();
      await sleep(3000);
      tabClicked = true;
      break;
    }
  }
  if (!tabClicked) {
    // Try via evaluate — tabs may have Material Icon prefix
    const found = await page.evaluate((text) => {
      for (const el of document.querySelectorAll('a, button, [role="tab"], li, span, div')) {
        const t = (el.textContent || '').trim();
        // Exact match or ends with the tab name (icon prefix pattern)
        if (t === text || t.endsWith(text) || t.toLowerCase().endsWith(text.toLowerCase())) {
          const r = el.getBoundingClientRect();
          if (r.width > 0 && r.height > 0) {
            el.click();
            return { found: true, txt: t.substring(0, 60) };
          }
        }
      }
      return { found: false };
    }, tabText);
    if (!found.found) {
      console.log(`    ⚠ Tab not found`);
      const navItems = await page.evaluate(() => {
        const items = [];
        document.querySelectorAll('a, [role="tab"]').forEach(el => {
          items.push((el.textContent || '').trim().substring(0, 50));
        });
        return items.filter(t => t).slice(0, 20);
      });
      console.log(`    Available nav/tab items: ${navItems.join(' | ')}`);
      return { headers: {}, rows: [] };
    }
    console.log(`    ✓ Clicked tab: "${found.txt}"`);
    await sleep(3000);
  }
  
  const data = await collectData(page);
  
  console.log(`    Headers: ${Object.values(data.headers).join(' | ')}`);
  console.log(`    Rows: ${data.rows.length}`);
  if (data.rows.length > 0) {
    const r = data.rows[0];
    const summary = Object.entries(r.cells).filter(([k,v]) => v && v !== 'Use setting').map(([k,v]) => `${k}:${v}`).slice(0, 6).join(', ');
    console.log(`    Sample: ${summary}`);
  }
  
  return data;
}

async function scrapeChannel(page, channelUrl, channelLabel) {
  console.log(`\n====== ${channelLabel.toUpperCase()} ======`);
  await page.goto(channelUrl, { waitUntil: 'networkidle', timeout: 30000 });
  await sleep(4000);

  await setAttribution(page);
  await setDate(page, DATE_LABEL);
  // Confirm date range actually set
  const confirmedDate = await page.evaluate(() => {
    const el = document.querySelector('.dp__input_wrap input, .dp__input');
    return el ? el.value : 'unknown';
  });
  console.log(`    Confirmed date range: ${confirmedDate}`);
  await selectTorobotPreset(page);
  await sleep(500);

  const campaigns = await scrapeTab(page, 'Campaigns', channelLabel);
  // Meta uses "Ad Sets", Google uses "Ad Groups"
  const adsetTabName = channelLabel === 'meta' ? 'Ad Sets' : 'Ad Groups';
  const adsets = await scrapeTab(page, adsetTabName, channelLabel);
  const ads = await scrapeTab(page, 'Ads', channelLabel);
  
  return { campaigns, adsets, ads };
}

async function main() {
  console.log(`=== Cometly Scraper — ${DATE_LABEL} ===`);
  console.log('Started:', new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' }));

  const browser = await chromium.launch({
    headless: false,
    args: ['--disable-blink-features=AutomationControlled', '--no-sandbox'],
  });

  try {
    const { context, page } = await createPage(browser);
    await login(page);

    const meta = await scrapeChannel(page, META_URL, 'meta');
    const google = await scrapeChannel(page, GOOGLE_URL, 'google');

    const results = { dateRange: DATE_LABEL, scrapeTime: new Date().toISOString(), meta, google };
    fs.writeFileSync('/tmp/cometly-raw.json', JSON.stringify(results, null, 2));

    console.log('\n=== DONE ===');
    console.log(`Meta: ${meta.campaigns.rows.length} campaigns, ${meta.adsets.rows.length} adsets, ${meta.ads.rows.length} ads`);
    console.log(`Google: ${google.campaigns.rows.length} campaigns, ${google.adsets.rows.length} adsets, ${google.ads.rows.length} ads`);
    console.log('Saved: /tmp/cometly-raw.json');

    await context.close();
  } finally {
    await browser.close();
  }
}

main().catch(err => {
  console.error('Fatal:', err.message, err.stack);
  process.exit(1);
});
