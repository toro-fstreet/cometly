const { chromium } = require('playwright');

async function executeCanvaWorkflow() {
    console.log('🚀 Starting THMC Ad Iteration workflow...');
    
    // Launch browser with persistent context to maintain login
    const browser = await chromium.launch({ 
        headless: false,  // Show browser for debugging
        slowMo: 1000      // Slow down actions for stability
    });
    
    const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    });
    
    const page = await context.newPage();
    
    try {
        // Step 1: Navigate to Canva
        console.log('📍 Navigating to Canva...');
        await page.goto('https://www.canva.com');
        await page.waitForLoadState('networkidle');
        
        // Step 2: Login with marketing6ot@gmail.com
        console.log('🔐 Initiating login...');
        
        // Look for login button
        const loginButton = page.locator('button:has-text("Log in"), a:has-text("Log in")').first();
        if (await loginButton.isVisible()) {
            await loginButton.click();
        }
        
        // Wait for login form or check if already logged in
        await page.waitForTimeout(3000);
        
        // If login form is present, fill it
        const emailInput = page.locator('input[type="email"]');
        if (await emailInput.isVisible()) {
            console.log('📧 Entering email credentials...');
            await emailInput.fill('marketing6ot@gmail.com');
            
            // Continue button or submit
            const continueBtn = page.locator('button:has-text("Continue"), button[type="submit"]').first();
            await continueBtn.click();
            
            console.log('⚠️ Please complete login manually in the browser...');
            console.log('Waiting 60 seconds for manual login completion...');
            await page.waitForTimeout(60000);
        }
        
        // Step 3: Navigate to team workspace
        console.log('🏢 Looking for F Street team workspace...');
        await page.goto('https://www.canva.com/teams');
        await page.waitForLoadState('networkidle');
        
        // Step 4: Look for templates
        console.log('📋 Searching for Display_Template_Ad_Sizes...');
        
        // Use Canva's search functionality
        const searchInput = page.locator('input[placeholder*="Search"], input[data-testid*="search"]').first();
        if (await searchInput.isVisible()) {
            await searchInput.fill('Display_Template_Ad_Sizes');
            await page.keyboard.press('Enter');
            await page.waitForTimeout(3000);
        }
        
        // Step 5: Look for the template and duplicate it
        console.log('🔄 Looking for template to duplicate...');
        
        // Try to find the template in search results
        const templateCard = page.locator('[data-testid*="design-card"], .design-card').first();
        if (await templateCard.isVisible()) {
            // Right-click to open context menu
            await templateCard.click({ button: 'right' });
            
            // Look for duplicate/copy option
            const duplicateOption = page.locator('text="Make a copy", text="Duplicate"').first();
            if (await duplicateOption.isVisible()) {
                await duplicateOption.click();
                console.log('✅ Template duplication initiated...');
                
                // Wait for duplication to complete
                await page.waitForTimeout(5000);
                
                // Rename the project
                const renameInput = page.locator('input[placeholder*="Untitled"], [contenteditable="true"]').first();
                if (await renameInput.isVisible()) {
                    await renameInput.clear();
                    await renameInput.fill('THMC_BrokerCommissions_20260416');
                    await page.keyboard.press('Enter');
                    console.log('📝 Project renamed to: THMC_BrokerCommissions_20260416');
                }
            }
        }
        
        // Step 6: Share the project
        console.log('🔗 Setting up project sharing...');
        
        // Look for share button
        const shareButton = page.locator('button:has-text("Share"), [data-testid*="share"]').first();
        if (await shareButton.isVisible()) {
            await shareButton.click();
            await page.waitForTimeout(2000);
            
            // Add peter@fstreet.com
            const inviteInput = page.locator('input[placeholder*="email"], input[type="email"]').first();
            if (await inviteInput.isVisible()) {
                await inviteInput.fill('peter@fstreet.com');
                
                const inviteButton = page.locator('button:has-text("Send"), button:has-text("Invite")').first();
                if (await inviteButton.isVisible()) {
                    await inviteButton.click();
                }
            }
            
            // Get shareable link
            const linkButton = page.locator('button:has-text("Copy link"), text="Anyone with the link"').first();
            if (await linkButton.isVisible()) {
                await linkButton.click();
                console.log('🔗 Shareable link copied to clipboard');
            }
        }
        
        console.log('✅ Workflow setup complete! Ready for approval before proceeding with variants.');
        console.log('📋 Next steps:');
        console.log('   1. Share the project link with Peter');
        console.log('   2. Wait for approval');
        console.log('   3. Proceed with variant creation');
        
        // Keep browser open for manual review
        console.log('🔍 Browser will remain open for manual review...');
        await page.waitForTimeout(300000); // 5 minutes
        
    } catch (error) {
        console.error('❌ Error during workflow:', error);
    } finally {
        await browser.close();
    }
}

// Run the workflow
executeCanvaWorkflow().catch(console.error);