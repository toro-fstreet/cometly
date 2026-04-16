# Google Ads Notes — Quick Reference
**Created:** March 26, 2026

## Key Takeaways for THMC & F Street

### Account Structure
- Use MCC with 3 sub-accounts: THMC Borrowers, THMC Brokers, F Street Investors
- Campaigns organized by product type (Fix & Flip, Bridge, DSCR, etc.)
- Ad groups: 5-15 tightly themed keywords each
- Full playbook: `google-ads-playbook.md`

### Critical Compliance Point
- Hard money loans are NOT "personal loans" under Google's policy
- Mortgages and commercial loans are explicitly exempt from personal loan restrictions
- BUT: Keywords like "hard money lender" sometimes trigger automated policy flags
- May need to complete Google's Financial Services Verification (1-4 weeks)
- Landing pages must show: physical address, NMLS #, state licensing, fees

### Cost Benchmarks (Estimated for Hard Money Niche)
- CPC: $8-25 for core keywords (much lower than traditional mortgage at $30-50+)
- CPL: $50-200 depending on keyword intent level
- Conversion Rate: Target 5-12%
- Finance & Insurance industry avg CTR: 8.33%, CPC: $3.46
- Real Estate industry avg CTR: 8.43%, CPC: $2.53

### Quality Score Impact (Critical)
- QS 8 = 37% lower CPC than QS 5 (same position)
- QS 5 = 10% HIGHER than baseline CPC
- QS 3 = 67% HIGHER than baseline
- Components: Expected CTR, Ad Relevance, Landing Page Experience
- Fix: Tight ad groups, keyword in headline, fast landing pages, message match

### Bidding Progression
1. Weeks 1-2: Manual CPC / Maximize Clicks (data gathering)
2. Weeks 3-6: Maximize Conversions (after 15+ conversions)
3. Weeks 7+: Target CPA (after 30-50 conversions)
4. Mature: Target ROAS (with conversion value tracking)

### Offline Conversion Import — #1 Priority
- Capture GCLID in form hidden fields → store in HubSpot
- Upload conversion events back to Google: Qualified → Application → Funded
- This teaches Google's AI which leads actually close
- Without this, Smart Bidding optimizes for junk leads
- Can automate via Google Ads API + HubSpot webhooks

### Performance Max for Lead Gen — Be Careful
- Only launch AFTER Search campaigns have conversion data
- Must feed offline conversion data or it optimizes for low-quality leads
- Add negative keywords (now allowed at account level for PMax)
- Use audience signals, not audience targeting
- Allow 1-2 weeks learning period

### SEC / Capital Raising (F Street)
- If using Reg D 506(c): CAN advertise to general public (Google Ads OK)
- If using 506(b): CANNOT use Google Ads for capital raising
- March 2025 SEC guidance loosened 506(c) verification requirements
- Ad copy must: Not guarantee returns, include disclaimers, gate content behind accredited investor verification
- Target: Household income top 10-20%, in-market RE investment audiences

### Key Negative Keywords (THMC)
Personal loan, payday, student loan, car loan, credit card, cash advance, FHA, VA, conventional mortgage, first-time home buyer, free, cheap, jobs, salary, career, scam, complaint

### Landing Pages Needed
- /fix-and-flip-loans
- /bridge-loans
- /dscr-loans
- /new-construction-loans
- /broker-program
- /get-a-quote
- Each must: Match ad copy, load <3 sec, mobile-optimized, clear CTA, trust signals

### Google Ads API
- Developer token from MCC → API Center
- OAuth2 via Google Cloud Console
- Python: `pip install google-ads`
- Basic Access = 15,000 ops/day (sufficient for THMC)
- Key uses: Automated reporting, offline conversion import, bid management

### Budget Recommendations
- Month 1: $3K-5K (testing)
- Months 2-3: $5K-10K (optimization)
- Months 4+: $10K-25K+ (scaling)

### Weekly Checklist Highlights
- Search terms report → add negatives
- Check Quality Scores on top keywords
- Review conversion volume and CPL
- Monitor competitor ads
- Check landing page speed

### Top Competitors to Watch
Kiavi, Lima One Capital, RCN Capital, Easy Street Capital, New Silver, CoreVest
- They emphasize: Speed (48hr-14 day closing), rates, LTV, experience, funded volume

### ROAS Target
- Financial services benchmark: 3:1 to 6:1
- Calculate: (Funded Loans × Revenue per Loan) ÷ Ad Spend
- Example: 8 funded loans × $5K revenue = $40K / $10K spend = 4:1 ✅
