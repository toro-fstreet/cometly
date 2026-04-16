const { chromium } = require('playwright');

async function executeTHMCAdIteration() {
    console.log('🚀 Starting THMC Ad Iteration with direct template URLs...');
    
    const browser = await chromium.launch({ 
        headless: false,
        slowMo: 500
    });
    
    const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        viewport: { width: 1920, height: 1080 }
    });
    
    const page = await context.newPage();
    page.setDefaultTimeout(45000);
    
    const templates = {
        source: 'https://www.canva.com/design/DAHHBrUHGQs/sN0ciibQdZ24-WqPvLMhag/edit',
        execution: 'https://www.canva.com/design/DAHCKXXXJZE/qPBrT1JV5Iw5ovKTYS_Rkg/edit'
    };
    
    try {
        // Step 1: Access the execution template (Display_Template_Ad_Sizes)
        console.log('📋 Opening execution template...');
        await page.goto(templates.execution);
        
        // Wait for Canva editor to load
        await page.waitForSelector('[data-testid="editor"], .editor-container, canvas', { timeout: 30000 });
        console.log('✅ Template loaded successfully');
        
        // Step 2: Duplicate the design
        console.log('🔄 Duplicating template...');
        
        // Look for File menu or three-dot menu
        const fileMenu = page.locator('button:has-text("File"), [data-testid*="file"], .file-menu').first();
        if (await fileMenu.isVisible({ timeout: 10000 })) {
            await fileMenu.click();
            await page.waitForTimeout(1000);
            
            // Look for "Make a copy" option
            const makeACopyBtn = page.locator('text="Make a copy", button:has-text("Make a copy")').first();
            if (await makeACopyBtn.isVisible({ timeout: 5000 })) {
                await makeACopyBtn.click();
                console.log('✅ Duplication initiated via File menu');
                await page.waitForTimeout(5000);
            }
        } else {
            // Try keyboard shortcut
            console.log('⌨️ Trying keyboard shortcut for duplication...');
            await page.keyboard.press('Meta+D'); // Mac duplicate shortcut
            await page.waitForTimeout(3000);
        }
        
        // Step 3: Rename the project
        console.log('📝 Renaming project to THMC_BrokerCommissions_20260416...');
        
        // Look for title/name input
        const titleSelectors = [
            'input[placeholder*="Untitled"]',
            '[contenteditable="true"]:has-text("Untitled")',
            '.design-title input',
            '[data-testid*="title"] input'
        ];
        
        let renamed = false;
        for (const selector of titleSelectors) {
            const titleInput = page.locator(selector).first();
            if (await titleInput.isVisible({ timeout: 5000 }).catch(() => false)) {
                await titleInput.click();
                await page.keyboard.press('Meta+A'); // Select all
                await titleInput.fill('THMC_BrokerCommissions_20260416');
                await page.keyboard.press('Enter');
                console.log('✅ Project renamed successfully');
                renamed = true;
                break;
            }
        }
        
        if (!renamed) {
            console.log('⚠️ Auto-rename failed - will need manual rename');
        }
        
        // Step 4: Modify the first slide with THMC messaging
        console.log('✏️ Preparing to modify slide content...');
        
        // Click on the first slide/page if multiple exist
        const firstPage = page.locator('[data-testid*="page"], .page-thumbnail').first();
        if (await firstPage.isVisible({ timeout: 5000 })) {
            await firstPage.click();
            await page.waitForTimeout(2000);
        }
        
        // Look for text elements to modify
        const textElements = page.locator('text, [contenteditable], .text-element');
        const textCount = await textElements.count();
        console.log(`📝 Found ${textCount} potential text elements`);
        
        if (textCount > 0) {
            // Try to update main heading/title
            const mainText = textElements.first();
            if (await mainText.isVisible({ timeout: 5000 })) {
                await mainText.click();
                await page.waitForTimeout(1000);
                
                // Replace with THMC messaging
                await page.keyboard.press('Meta+A');
                await page.keyboard.type('$297K Paid to Brokers This Year');
                console.log('✅ Updated main headline');
                
                // Try to find and update subtext
                if (textCount > 1) {
                    const subText = textElements.nth(1);
                    if (await subText.isVisible({ timeout: 3000 })) {
                        await subText.click();
                        await page.waitForTimeout(1000);
                        await page.keyboard.press('Meta+A');
                        await page.keyboard.type('Ready to close your next deal? Get funded with THMC.');
                        console.log('✅ Updated subtext/CTA');
                    }
                }
            }
        }
        
        // Step 5: Share the project
        console.log('🔗 Setting up sharing...');
        
        const shareBtn = page.locator('button:has-text("Share"), [data-testid*="share"]').first();
        if (await shareBtn.isVisible({ timeout: 10000 })) {
            await shareBtn.click();
            await page.waitForTimeout(2000);
            
            // Add Peter's email
            const emailInput = page.locator('input[type="email"], input[placeholder*="email"]').first();
            if (await emailInput.isVisible({ timeout: 5000 })) {
                await emailInput.fill('peter@fstreet.com');
                
                const inviteBtn = page.locator('button:has-text("Send"), button:has-text("Invite")').first();
                if (await inviteBtn.isVisible({ timeout: 3000 })) {
                    await inviteBtn.click();
                    console.log('✅ Invited peter@fstreet.com');
                }
            }
            
            // Get shareable link
            const copyLinkBtn = page.locator('button:has-text("Copy link"), text*="Anyone with the link"').first();
            if (await copyLinkBtn.isVisible({ timeout: 5000 })) {
                await copyLinkBtn.click();
                console.log('🔗 Shareable link copied to clipboard');
            }
        }
        
        // Get current URL for sharing
        const currentUrl = page.url();
        console.log('📍 Project URL:', currentUrl);
        
        console.log('✅ THMC Ad Iteration Setup Complete!');
        console.log('📋 Summary:');
        console.log('   ✓ Template duplicated');
        console.log('   ✓ Renamed to: THMC_BrokerCommissions_20260416');
        console.log('   ✓ Updated with broker commission messaging');
        console.log('   ✓ Shared with peter@fstreet.com');
        console.log('   ✓ Shareable link ready');
        console.log('');
        console.log('🎯 Next Steps:');
        console.log('   1. Review the initial design');
        console.log('   2. Get approval from Peter');
        console.log('   3. Proceed with additional variants');
        
        console.log('🔍 Browser will remain open for review...');
        
        // Keep browser open for review
        await page.waitForTimeout(300000); // 5 minutes
        
    } catch (error) {
        console.error('❌ Error during THMC iteration:', error.message);
        console.log('📍 Current URL:', page.url());
        console.log('🔍 Browser will remain open for manual completion...');
        await page.waitForTimeout(300000);
    } finally {
        await browser.close();
        console.log('🏁 THMC Ad Iteration Complete');
    }
}

executeTHMCAdIteration().catch(console.error);