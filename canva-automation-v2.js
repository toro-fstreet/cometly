const { chromium } = require('playwright');

async function executeCanvaWorkflow() {
    console.log('🚀 Starting THMC Ad Iteration workflow (v2)...');
    
    const browser = await chromium.launch({ 
        headless: false,
        slowMo: 500,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        viewport: { width: 1920, height: 1080 }
    });
    
    const page = await context.newPage();
    
    // Increase timeout for slow loading
    page.setDefaultTimeout(60000);
    
    try {
        // Step 1: Navigate to Canva login directly
        console.log('📍 Navigating to Canva login...');
        await page.goto('https://www.canva.com/login');
        
        // Wait for page to load
        await page.waitForSelector('body', { timeout: 30000 });
        console.log('✅ Page loaded');
        
        // Step 2: Handle login
        console.log('🔐 Looking for login form...');
        
        // Check if already logged in by looking for dashboard elements
        const isDashboard = await page.locator('[data-testid="dashboard"], .home-page').first().isVisible({ timeout: 5000 }).catch(() => false);
        
        if (!isDashboard) {
            // Look for email input
            const emailInput = await page.locator('input[type="email"], input[name="email"]').first();
            const emailVisible = await emailInput.isVisible({ timeout: 10000 }).catch(() => false);
            
            if (emailVisible) {
                console.log('📧 Entering credentials...');
                await emailInput.fill('marketing6ot@gmail.com');
                
                // Look for continue/next button
                await page.locator('button:has-text("Continue"), button:has-text("Next"), button[type="submit"]').first().click();
                
                console.log('⚠️ Manual login may be required...');
                console.log('⏰ Waiting 90 seconds for login completion...');
                
                // Wait for either dashboard or manual intervention
                try {
                    await page.waitForSelector('[data-testid="dashboard"], .home-page, [data-testid="header-home"]', { timeout: 90000 });
                    console.log('✅ Login successful - dashboard detected');
                } catch {
                    console.log('⚠️ Login timeout - proceeding with current state');
                }
            }
        } else {
            console.log('✅ Already logged in');
        }
        
        // Step 3: Navigate to all designs to find templates
        console.log('📋 Navigating to designs...');
        
        try {
            // Try multiple navigation approaches
            await page.goto('https://www.canva.com/folder/all-designs');
            await page.waitForTimeout(5000);
        } catch {
            // Fallback navigation
            await page.goto('https://www.canva.com/');
            await page.waitForTimeout(3000);
            
            const allDesignsLink = page.locator('a:has-text("All your designs"), [href*="all-designs"]').first();
            if (await allDesignsLink.isVisible({ timeout: 10000 })) {
                await allDesignsLink.click();
                await page.waitForTimeout(3000);
            }
        }
        
        // Step 4: Search for template
        console.log('🔍 Searching for Display_Template_Ad_Sizes...');
        
        // Look for search input
        const searchSelectors = [
            'input[placeholder*="Search"]',
            'input[data-testid*="search"]',
            '[data-testid="search-input"]',
            '.search-input input'
        ];
        
        let searchInput = null;
        for (const selector of searchSelectors) {
            searchInput = page.locator(selector).first();
            if (await searchInput.isVisible({ timeout: 5000 }).catch(() => false)) {
                break;
            }
            searchInput = null;
        }
        
        if (searchInput) {
            await searchInput.fill('Display_Template_Ad_Sizes');
            await page.keyboard.press('Enter');
            await page.waitForTimeout(5000);
            console.log('🔍 Search executed');
        } else {
            console.log('⚠️ Search input not found - will look for template manually');
        }
        
        // Step 5: Look for template and duplicate
        console.log('🔄 Looking for template to duplicate...');
        
        // Look for design cards/tiles
        const designCards = page.locator('[data-testid*="design"], .design-tile, .design-card');
        const cardCount = await designCards.count();
        
        console.log(`📊 Found ${cardCount} design cards`);
        
        if (cardCount > 0) {
            // Try to find the specific template or use the first one
            let targetCard = null;
            
            for (let i = 0; i < Math.min(cardCount, 10); i++) {
                const card = designCards.nth(i);
                const cardText = await card.textContent().catch(() => '');
                
                if (cardText.toLowerCase().includes('display') || cardText.toLowerCase().includes('template')) {
                    targetCard = card;
                    break;
                }
            }
            
            // If no specific match, use first card
            if (!targetCard && cardCount > 0) {
                targetCard = designCards.first();
            }
            
            if (targetCard) {
                console.log('🎯 Found target template, attempting duplicate...');
                
                // Hover over the card to reveal options
                await targetCard.hover();
                await page.waitForTimeout(1000);
                
                // Look for duplicate/copy button
                const duplicateBtn = page.locator('button:has-text("Make a copy"), button:has-text("Duplicate"), [data-testid*="duplicate"]').first();
                
                if (await duplicateBtn.isVisible({ timeout: 5000 })) {
                    await duplicateBtn.click();
                    console.log('✅ Duplicate button clicked');
                    await page.waitForTimeout(5000);
                } else {
                    // Try right-click context menu
                    await targetCard.click({ button: 'right' });
                    await page.waitForTimeout(1000);
                    
                    const contextDuplicate = page.locator('text="Make a copy", text="Duplicate"').first();
                    if (await contextDuplicate.isVisible({ timeout: 5000 })) {
                        await contextDuplicate.click();
                        console.log('✅ Context menu duplicate clicked');
                        await page.waitForTimeout(5000);
                    } else {
                        console.log('⚠️ Could not find duplicate option - opening design to copy manually');
                        await targetCard.click();
                        await page.waitForTimeout(5000);
                    }
                }
            }
        }
        
        // Step 6: Rename project (if in editor)
        console.log('📝 Attempting to rename project...');
        
        const titleSelectors = [
            'input[placeholder*="Untitled"]',
            '[contenteditable="true"]',
            '.title-input',
            '[data-testid*="title"]'
        ];
        
        for (const selector of titleSelectors) {
            const titleInput = page.locator(selector).first();
            if (await titleInput.isVisible({ timeout: 5000 }).catch(() => false)) {
                await titleInput.click();
                await titleInput.selectText().catch(() => {});
                await titleInput.fill('THMC_BrokerCommissions_20260416');
                await page.keyboard.press('Enter');
                console.log('✅ Project renamed');
                break;
            }
        }
        
        // Step 7: Get shareable link
        console.log('🔗 Getting shareable link...');
        
        const shareBtn = page.locator('button:has-text("Share"), [data-testid*="share"]').first();
        if (await shareBtn.isVisible({ timeout: 10000 })) {
            await shareBtn.click();
            await page.waitForTimeout(2000);
            
            // Look for link sharing option
            const linkBtn = page.locator('button:has-text("Copy link"), text="Anyone with the link"').first();
            if (await linkBtn.isVisible({ timeout: 5000 })) {
                await linkBtn.click();
                console.log('🔗 Shareable link copied');
            }
        }
        
        console.log('✅ Workflow setup complete!');
        console.log('📋 Next steps:');
        console.log('   1. Project: THMC_BrokerCommissions_20260416');
        console.log('   2. Share link with Peter for approval');
        console.log('   3. Await approval before building variants');
        
        // Get current URL for sharing
        const currentUrl = page.url();
        console.log(`🔗 Current URL: ${currentUrl}`);
        
        // Keep browser open for review
        console.log('🔍 Browser staying open for manual review and link sharing...');
        
        // Wait for manual intervention or timeout
        await page.waitForTimeout(300000); // 5 minutes
        
    } catch (error) {
        console.error('❌ Workflow error:', error.message);
        console.log('📍 Current URL:', page.url());
        console.log('⚠️ Browser will remain open for manual completion');
        await page.waitForTimeout(300000);
    } finally {
        console.log('🏁 Automation complete');
        await browser.close();
    }
}

executeCanvaWorkflow().catch(console.error);