# Google Ads Playbook for Hard Money Lending & Private Lending
## The Hard Money Company (THMC) & F Street

**Last Updated:** March 26, 2026
**Purpose:** Comprehensive guide to running profitable Google Ads campaigns for hard money/private lending lead generation and investor capital raising.

---

## Table of Contents

1. [Google Ads Fundamentals for Lead Gen / Financial Services](#1-google-ads-fundamentals)
2. [Google Ads for Hard Money / Private Lending](#2-hard-money--private-lending-specific)
3. [Google Ads for Capital Raising / Investor Acquisition (F Street)](#3-capital-raising--investor-acquisition)
4. [Advanced Optimization](#4-advanced-optimization)
5. [Google Ads API Setup](#5-google-ads-api-setup)
6. [Reporting & KPIs](#6-reporting--kpis)

---

# 1. Google Ads Fundamentals

## Campaign Types & When to Use Each

### Search Campaigns
- **What:** Text ads on Google search results (SERPs)
- **When to use:** Primary campaign type for lead gen. Captures high-intent users actively searching for your services
- **Best for THMC:** Borrowers searching "hard money lender," "bridge loan," "fix and flip financing"
- **Expected performance:** ~8.33% CTR for Finance & Insurance (2025 benchmark), ~8.43% for Real Estate
- **Priority:** ★★★★★ — This is your bread and butter. Start here.

### Performance Max (PMax)
- **What:** AI-driven campaigns across ALL Google surfaces (Search, Display, YouTube, Discover, Gmail, Maps)
- **When to use:** After Search campaigns are mature and converting well. Needs strong conversion data to optimize
- **CTR benchmark:** ~1.65% (much lower than Search alone — this is expected)
- **Lead gen caution:** PMax for lead gen is trickier than e-commerce. You MUST feed it quality signals (offline conversions, lead scoring) or it will optimize for junk leads
- **Priority:** ★★★☆☆ — Add after 60-90 days of Search data

### Display Campaigns
- **What:** Banner/image ads across Google Display Network (millions of websites)
- **When to use:** Brand awareness and remarketing. NOT for direct lead gen as primary channel
- **CTR benchmark:** ~1.32% for financial services
- **Best for THMC:** Remarketing to site visitors who didn't convert
- **Priority:** ★★☆☆☆ — Only for remarketing initially

### Demand Gen Campaigns
- **What:** Visual ads across YouTube, Discover, Gmail feeds
- **When to use:** Mid-funnel nurturing. Good for reaching audiences who've shown interest but haven't searched yet
- **Best for THMC:** Could work for capital raising/investor acquisition campaigns
- **Priority:** ★★☆☆☆ — Test after core campaigns profitable

### Video Campaigns (YouTube)
- **What:** Video ads before/during YouTube content
- **When to use:** Brand building, thought leadership, education
- **Best for THMC:** Investor education content, broker relationship building
- **Priority:** ★☆☆☆☆ — Nice-to-have, not priority

### Local Services Ads
- **What:** Ads at very top of search with "contact" button. Pay per lead, not per click
- **When to use:** For local service businesses. Financial advisors see ~13.8% conversion rate
- **Note:** May require verification. Check if THMC qualifies in your states
- **Priority:** ★★★☆☆ — Investigate availability for lending

---

## Account Structure Best Practices

### Manager Account (MCC) Setup
- Create an MCC (My Client Center) at the top level
- Under it, create separate accounts for:
  - **THMC Borrower Acquisition** (hard money leads)
  - **THMC Broker Acquisition** (broker/wholesale channel)
  - **F Street Investor Acquisition** (capital raising)
- Benefits: Centralized billing, unified reporting, easy API access, separate budgets

### Campaign Structure
```
MCC (Manager Account)
├── THMC Borrower Account
│   ├── Campaign: Search - Fix & Flip Loans
│   │   ├── Ad Group: Fix and Flip Loans (General)
│   │   ├── Ad Group: Fix and Flip Financing [City/State]
│   │   └── Ad Group: Rehab Loans
│   ├── Campaign: Search - Bridge Loans
│   │   ├── Ad Group: Bridge Loans (General)
│   │   ├── Ad Group: Short-Term Bridge Financing
│   │   └── Ad Group: Commercial Bridge Loans
│   ├── Campaign: Search - DSCR Loans
│   │   ├── Ad Group: DSCR Loans (General)
│   │   ├── Ad Group: Rental Property Loans
│   │   └── Ad Group: Investment Property Financing
│   ├── Campaign: Search - Hard Money (General)
│   │   ├── Ad Group: Hard Money Lender
│   │   ├── Ad Group: Hard Money Loans [State]
│   │   └── Ad Group: Private Money Lender
│   ├── Campaign: Search - Brand
│   │   └── Ad Group: The Hard Money Company (brand terms)
│   ├── Campaign: PMax - Borrower Leads
│   └── Campaign: Remarketing - Display
├── THMC Broker Account
│   ├── Campaign: Search - Wholesale/Broker
│   │   ├── Ad Group: Wholesale Hard Money Lender
│   │   ├── Ad Group: Broker Partnership Programs
│   │   └── Ad Group: Correspondent Lending
│   └── Campaign: Display - Broker Remarketing
└── F Street Investor Account
    ├── Campaign: Search - Real Estate Investment
    ├── Campaign: Search - Passive Income
    ├── Campaign: Demand Gen - Investor Acquisition
    └── Campaign: Remarketing - Investor Nurturing
```

### Ad Group Best Practices
- **5-15 tightly related keywords per ad group** (not 50+)
- Each ad group should have a clear theme that ONE ad can serve well
- Match the keyword theme → ad copy → landing page (message match)
- 1 enabled RSA per ad group (can have 2-3 for testing, but 1 active recommended)

---

## Bidding Strategies

### Manual CPC
- **What:** You set max bid per keyword manually
- **When:** Brand new accounts, very low budgets, or keywords you want precise control over
- **Pros:** Full control, good for learning phase
- **Cons:** Time-intensive, can't optimize in real-time like Smart Bidding
- **Recommendation for THMC:** Start here for first 2-4 weeks to gather data

### Enhanced CPC (eCPC)
- **What:** Manual CPC + Google can adjust bids up/down based on conversion likelihood
- **When:** Transitional strategy between manual and full automation
- **Note:** Google has been deprecating this in favor of Smart Bidding

### Maximize Clicks
- **What:** Auto-bids to get most clicks within budget
- **When:** Very early in account life when you have zero conversion data. Useful for first 1-2 weeks to generate traffic and gather data
- **Caution:** Will NOT optimize for quality. Gets cheap clicks, not necessarily good ones

### Maximize Conversions
- **What:** Uses AI to get most conversions within budget
- **When:** After you have 15-30 conversions in 30 days. This is often the first smart bidding strategy to try
- **Recommendation for THMC:** Switch to this after initial data gathering phase (30+ conversions)

### Target CPA (tCPA)
- **What:** Maximize Conversions with a target cost-per-acquisition cap
- **When:** After 30-50 conversions and you know your acceptable CPL
- **How to set:** Start at your actual CPA, then gradually lower by 10-15% increments
- **Recommendation for THMC:** Ultimate goal. Set tCPA at your profitable CPL threshold

### Target ROAS (tROAS)
- **What:** Optimizes for return on ad spend
- **When:** When you can assign conversion values (e.g., different loan types have different revenue)
- **For THMC:** Could work if you assign values: Fix & Flip lead = $X, DSCR lead = $Y based on close rates × loan margins
- **Formula:** Conversion Value = Close Rate × Average Loan Revenue
  - Example: 10% close rate × $5,000 avg revenue per loan = $500 conversion value

### Smart Bidding Progression for THMC
1. **Weeks 1-2:** Manual CPC or Maximize Clicks (data gathering)
2. **Weeks 3-6:** Maximize Conversions (once tracking is solid and 15+ conversions)
3. **Weeks 7+:** Target CPA (once you have 30-50 conversions and know your CPL)
4. **Mature:** Target ROAS (if you implement conversion value tracking)

---

## Quality Score Optimization

Quality Score (1-10) directly impacts how much you pay per click. **A QS of 8 pays ~37% LESS per click than QS of 5 for the same position.**

### Quality Score Impact on CPC

| Quality Score | CPC Adjustment vs Baseline | Effective CPC at $5 Base |
|:---:|:---:|:---:|
| 10 | -30% | $3.50 |
| 9 | -25% | $3.75 |
| 8 | -20% | $4.00 |
| 7 | -10% | $4.50 |
| 6 | Baseline (0%) | $5.00 |
| 5 | +10% | $5.50 |
| 4 | +25% | $6.25 |
| 3 | +67% | $8.35 |
| 2 | +150% | $12.50 |
| 1 | +400% | $25.00 |

### Three Components of Quality Score

#### 1. Expected Click-Through Rate (CTR)
- Include exact keyword in at least one headline
- Use specific numbers and value propositions
- Strong CTAs that clarify what happens on click
- Use all available ad extensions
- **Target:** Above Average (6%+ for search)

**Headline Progression Example:**
| Version | Headline | Expected Performance |
|---|---|---|
| Weak | "Get a Loan Today" | Below Average |
| Average | "Hard Money Loans Available" | Average |
| Strong | "Close Your Hard Money Loan in 7 Days — Rates from 9.99%" | Above Average |

#### 2. Ad Relevance
- Tightly themed ad groups (5-15 related keywords)
- Primary keyword in headline
- Ad copy directly addresses search intent
- Use Dynamic Keyword Insertion where appropriate

#### 3. Landing Page Experience
- **Speed:** Sub-3 seconds load time (sub-2 is competitive advantage). Each additional second reduces conversions ~7%
- **Mobile-first:** 60%+ of traffic is mobile
- **Message match:** Landing page headline must echo the ad promise
- **Content:** Substantive info beyond just a lead form
- **Trust signals:** HTTPS, reviews/testimonials, licensing info, privacy policy
- **Dedicated pages:** One landing page per major keyword theme (fix & flip page, bridge loan page, DSCR page, etc.)

---

## Match Types

### Exact Match `[hard money lender]`
- **When:** High-intent, proven converting keywords. Maximum control
- **Use for:** Core money keywords, brand terms
- **Example:** `[hard money lender]`, `[fix and flip loans]`, `[bridge loan rates]`

### Phrase Match `"hard money lender"`
- **When:** Capture variations while maintaining intent. Good balance of reach and relevance
- **Use for:** Most of your keywords. Catches "best hard money lender near me," "hard money lender for beginners," etc.
- **Example:** `"hard money lender"`, `"bridge loan financing"`, `"DSCR loan rates"`

### Broad Match `hard money lender`
- **When:** Only with Smart Bidding (tCPA, Max Conversions) and strong conversion data. Google uses context signals to match intent
- **Caution:** Without Smart Bidding, broad match burns money on irrelevant queries
- **Use for:** Expanding reach AFTER proving exact/phrase profitability
- **Google's 2024-2025 push:** They're increasingly recommending broad match + Smart Bidding as the "best" combo. Test carefully

### Recommended Strategy for THMC
1. **Start:** Exact + Phrase match for core keywords
2. **Month 2-3:** Add broad match in a separate campaign with Smart Bidding once you have conversion data
3. **Ongoing:** Monitor search terms report weekly to catch irrelevant queries

---

## Negative Keyword Strategy

### Why It Matters
Without negatives, your ads will show for irrelevant searches, wasting budget and reducing Quality Score.

### THMC Negative Keyword Master List

**Personal/Consumer Finance (exclude):**
- personal loan / personal loans
- payday loan / payday loans
- student loan / student loans
- car loan / auto loan
- credit card
- cash advance
- title loan
- pawn shop
- bad credit loan
- no credit check loan
- credit repair
- debt consolidation
- bankruptcy

**Education/Information (exclude unless targeting content):**
- what is / what are
- definition
- meaning
- wikipedia
- how does (unless targeting early funnel)
- salary / jobs / career

**Unrelated Real Estate:**
- home loan (owner-occupied)
- FHA loan
- VA loan
- conventional mortgage
- first-time home buyer
- USDA loan
- reverse mortgage

**Competitor Brands (exclude if not bidding on competitors):**
- Kiavi
- Lima One
- LendingTree
- Quicken Loans
- Rocket Mortgage

**Negative Intent:**
- free
- cheap
- scam
- complaint
- lawsuit
- reviews (unless targeting review-stage buyers)

**Job-Related:**
- jobs
- hiring
- career
- salary
- loan officer (unless recruiting)

### Negative Keyword Organization
- **Account-level negatives:** Universal excludes (payday, student, personal, free, jobs)
- **Campaign-level negatives:** Specific to campaign (e.g., borrower campaigns exclude "broker," broker campaigns exclude "borrower" terms)
- **Review weekly:** Check Search Terms report and add new negatives

---

## Ad Extensions / Assets

### Must-Have Extensions for THMC

#### Sitelinks (4-8 per campaign)
```
Fix & Flip Loans → /fix-and-flip
Bridge Loans → /bridge-loans
DSCR Loans → /dscr-loans
New Construction Loans → /new-construction
Get a Rate Quote → /apply
Broker Programs → /broker-partner
About Us → /about
Contact Us → /contact
```

#### Callout Extensions (4-6)
```
Close in 7-10 Days
No Income Verification
Up to 90% LTV
Rates from 9.99%
Nationwide Lending
$100K - $5M Loan Amounts
Experienced Investor Friendly
```

#### Structured Snippets
```
Types: Fix & Flip, Bridge, DSCR, New Construction, Multifamily, Commercial
Services: Quick Closing, Flexible Terms, No Prepayment Penalty, Cash-Out Refinance
```

#### Call Extensions
- Add phone number with call tracking
- Schedule to show during business hours only (or 24/7 if you have after-hours staff)
- Call extensions can generate 5-15% more conversions

#### Location Extensions
- Link Google Business Profile if you have physical offices
- Shows address, map, and directions

#### Lead Form Extensions
- In-ad lead form (user doesn't need to visit your website)
- Useful for mobile users
- Lower intent than website form fills — use with caution and track quality

---

## Responsive Search Ads (RSA) Best Practices

### Structure
- Up to **15 headlines** (30 characters each) — use all 15
- Up to **4 descriptions** (90 characters each) — use all 4
- Google tests combinations and optimizes for best performers

### Headline Writing Strategy

**Include variety across these categories:**

1. **Keyword headlines (3-4):**
   - "Hard Money Loans — Fast Closing"
   - "Fix & Flip Financing Available"
   - "Bridge Loans for Real Estate"

2. **Value proposition headlines (3-4):**
   - "Close in as Few as 7 Days"
   - "Rates Starting at 9.99%"
   - "Up to 90% Loan-to-Value"

3. **Social proof/trust headlines (2-3):**
   - "$500M+ in Loans Funded"
   - "Trusted by 1,000+ Investors"
   - "A+ BBB Rating"

4. **CTA headlines (2-3):**
   - "Get Your Rate Quote Today"
   - "Apply Now — Quick Approval"
   - "Talk to a Loan Officer"

5. **Differentiator headlines (2-3):**
   - "No Income Verification Required"
   - "Nationwide Lending — All 50 States"
   - "First-Time Flippers Welcome"

### Pinning Strategy
- **Minimize pinning** — Google's AI performs better with flexibility
- **When to pin:** Only for compliance/legal requirements (e.g., "NMLS #XXXXX" if required)
- **If you must pin:** Pin 2-3 headlines to the same position to maintain some variety
- **Data:** Unpinned RSAs consistently outperform heavily pinned versions on CTR and conversions

### Ad Strength
- Target "Good" or "Excellent" (not just "Average")
- Maximize headline diversity and uniqueness
- Include keywords naturally but don't stuff every headline
- Each headline should make sense standalone AND in combination with others

### Description Writing
```
Description 1: "The Hard Money Company offers fast, flexible financing for real estate investors. Close your loan in as few as 7 days with competitive rates."

Description 2: "Fix & flip, bridge, DSCR, and new construction loans from $100K-$5M. No income verification. Apply online in minutes."

Description 3: "Trusted by thousands of investors nationwide. Get pre-approved today with our simple application process. Competitive rates and terms."

Description 4: "Need fast capital for your next deal? We fund loans others won't. Experienced team, quick decisions, and reliable closings."
```

---

## Conversion Tracking Setup

### Conversion Actions to Track (Priority Order)

1. **Phone Call (from ad)** — Highest intent
2. **Phone Call (from website)** — High intent
3. **Form Submission (loan application)** — High intent
4. **Form Submission (rate quote request)** — Medium-high intent
5. **Chat initiated** — Medium intent
6. **Page visit (key pages: pricing, apply, contact)** — Low intent (use as micro-conversion)

### Google Tag Setup
1. Install Google Tag (gtag.js) on all THMC pages
2. Configure conversion actions in Google Ads:
   - Go to Measurement → Conversions → + New conversion action
   - Set up website, phone call, and import conversions
3. Verify firing with Google Tag Assistant

### Enhanced Conversions
- Sends hashed first-party data (email, phone) back to Google for better matching
- Improves conversion attribution accuracy by 5-15%
- Setup: Enable in conversion settings, add enhanced conversion tag, pass user-provided data

### Offline Conversion Import (CRITICAL for Lead Gen)
This is the **most important optimization for THMC.** Google needs to know which leads actually became loans.

**How it works:**
1. Capture GCLID (Google Click ID) when leads submit forms
2. Store GCLID in your CRM (HubSpot) alongside the lead
3. When a lead progresses (qualified → application → funded), upload that conversion back to Google Ads
4. Google's AI then optimizes for leads that actually close, not just form fills

**Setup Steps:**
1. Add hidden field to forms capturing GCLID from URL parameter
2. Store in HubSpot custom property
3. Create conversion actions: "Qualified Lead," "Loan Application," "Loan Funded"
4. Upload via:
   - Google Ads Data Manager (manual/scheduled CSV upload)
   - Google Ads API (automated — see Section 5)
   - HubSpot → Google Ads integration
5. Import should happen within 90 days of click (sooner = better)

**Value assignment:**
- Form Fill: $10 (placeholder)
- Qualified Lead: $50
- Loan Application: $200
- Loan Funded: $2,000+ (based on actual revenue per funded loan)

### Attribution Models

**Available Models:**
| Model | Description | Best For |
|---|---|---|
| Last Click | 100% credit to last interaction | Conservative, low data |
| Data-Driven | ML distributes credit based on your data | **Recommended** — use this |
| First Click | 100% credit to first interaction | Understanding acquisition |
| Linear | Equal credit across all touchpoints | Understanding full journey |
| Time Decay | More credit to recent touchpoints | Short sales cycles |
| Position-Based | 40% first, 40% last, 20% middle | Balanced view |

**Recommendation for THMC:** Use **Data-Driven Attribution** (DDA). It's Google's default and best option. It uses ML to analyze your actual conversion paths and distributes credit based on what actually drives results. Google deprecated most other models in favor of DDA in 2023-2024.

---

# 2. Hard Money / Private Lending Specific

## Top Keywords — Borrower Acquisition

### Tier 1: Highest Intent (Exact + Phrase match)
These are the money keywords. People searching these are ready to apply.

**Hard Money / Private Lending:**
- hard money lender
- hard money loans
- hard money lender near me
- private money lender
- private lending
- hard money loan rates
- best hard money lender
- hard money lender [state name]
- hard money loan requirements

**Fix & Flip:**
- fix and flip loans
- fix and flip financing
- fix and flip lender
- rehab loans for investors
- house flipping loans
- renovation loans for investors
- fixer upper financing

**Bridge Loans:**
- bridge loan
- bridge loan lender
- short term bridge loan
- real estate bridge loan
- bridge financing
- bridge loan rates
- commercial bridge loan

**DSCR Loans:**
- DSCR loan
- DSCR lender
- DSCR loan rates
- debt service coverage ratio loan
- rental property loan no income verification
- investment property loan DSCR
- DSCR mortgage

**New Construction:**
- new construction loan
- ground up construction loan
- construction financing investors
- spec home loan
- builder financing

**General Investment Property:**
- investment property loan
- real estate investor loan
- rental property financing
- multifamily loan
- commercial real estate loan
- no doc investment loan

### Tier 2: Medium Intent (Phrase match)
- how to get a hard money loan
- hard money vs conventional loan
- best bridge loan companies
- hard money loan calculator
- fix and flip loan requirements
- DSCR loan requirements
- investment property loan options

### Tier 3: Long-Tail / Niche (Phrase + Broad)
- hard money loan for first time investor
- no experience required fix and flip loan
- 90% LTV hard money loan
- fast closing real estate loan
- same day real estate loan approval
- hard money loan no appraisal
- cross collateral hard money loan
- blanket loan real estate investors
- portfolio loan real estate

### Geographic Modifiers (Add to Tier 1 keywords)
For each state THMC lends in, create geo-modified versions:
- hard money lender [Wisconsin / Milwaukee / Madison]
- bridge loans [Texas / Houston / Dallas]
- fix and flip loans [Florida / Miami / Tampa]
- (Repeat for all active lending states)

---

## Top Keywords — Broker Acquisition

Brokers search differently than borrowers. They're looking for wholesale partners and programs.

### Broker-Specific Keywords
- wholesale hard money lender
- hard money broker program
- broker partnership lending
- wholesale bridge loans
- wholesale DSCR lender
- correspondent lender hard money
- hard money loan broker
- become a loan broker
- broker commission hard money
- TPO lender real estate
- wholesale lending program
- hard money wholesale rates
- broker portal hard money
- loan originator partner program

---

## Competitor Landscape

### Top Hard Money Lenders Running Google Ads
| Lender | Specialty | USP in Ads | Est. Monthly Budget |
|---|---|---|---|
| **Kiavi** | Tech-driven, speed | "Close in 48 hours," streamlined app | $100K+ |
| **Lima One Capital** | Full service, $10B+ funded | Scale, multiple products | $50-100K |
| **RCN Capital** | Larger loans, experienced investors | "Nationwide Direct Lender" | $50-100K |
| **Easy Street Capital** | Fix & flip speed | "48-hour closings, no appraisal" | $25-50K |
| **Fund That Flip** (now Upright) | Fix & flip focused | Tech platform, fast draws | $25-50K |
| **New Silver** | Fintech speed | "Instant term sheet" | $25-50K |
| **CoreVest (Redwood Trust)** | Rental portfolios | Institutional backing | $50-100K |

### Competitor Ad Copy Themes
Common messaging across competitors:
- Speed: "Close in X days" (7-14 days is common claim)
- Rate transparency: "Rates from X%" 
- LTV: "Up to 85-93% LTC"
- Experience: "Funded $XB+ in loans"
- Ease: "No income verification," "Simple application"
- Draws: "100% rehab financing," "Fast draws"

### THMC Differentiation Opportunities
To stand out from the noise, THMC should emphasize:
- **Speed** (if competitive on closing time)
- **Rates** (if competitive — specific number beats "competitive rates")
- **Reliability** (funded X loans, % of loans that close on time)
- **Niche expertise** (specific property types or states)
- **Personal service** (vs. fintech/automated competitors)
- **First-time investor friendly** (many competitors focus on experienced only)

---

## Landing Page Best Practices for Hard Money Lead Gen

### Essential Elements
1. **Headline matching ad copy** — If ad says "Fix & Flip Loans — Close in 7 Days," the landing page headline must reinforce this
2. **Clear, prominent CTA** — "Get Your Rate Quote" or "Apply Now" above the fold
3. **Simple form** — Name, email, phone, loan amount, property type (5-7 fields max for initial inquiry)
4. **Social proof:**
   - Total loans funded / dollar volume
   - Customer testimonials with names/photos
   - Star ratings (Google, Trustpilot, BBB)
   - Number of states served
5. **Trust signals:**
   - NMLS number displayed
   - State licensing info
   - BBB badge
   - SSL/HTTPS
   - Privacy policy link
6. **Speed indicators:**
   - "Close in X days"
   - "Pre-approval in 24 hours"
   - Application process timeline
7. **Rate/term preview:**
   - Starting rates
   - LTV range
   - Loan amount range
   - Term lengths
8. **FAQ section** addressing common objections:
   - What credit score do I need?
   - How fast can you close?
   - What are the fees?
   - What properties do you lend on?

### Page Speed
- Target under 3 seconds load time (under 2 is ideal)
- Compress images, minify CSS/JS
- Use CDN
- Each additional second = ~7% fewer conversions

### Mobile Optimization
- 60%+ of traffic is mobile
- Click-to-call button prominent
- Form fields must be easy to tap
- Sticky CTA button that follows scroll

### Separate Landing Pages (Build One per Product)
```
thehardmoneyco.com/fix-and-flip-loans
thehardmoneyco.com/bridge-loans
thehardmoneyco.com/dscr-loans
thehardmoneyco.com/new-construction-loans
thehardmoneyco.com/broker-program
thehardmoneyco.com/get-a-quote
```

---

## Geographic Targeting Strategies

### For Multi-State Lenders (THMC)
- **Option A:** Single nationwide campaign with location targeting to all active states
- **Option B (Recommended):** Separate campaigns per region/state cluster for budget control
  - Campaign: Search - Hard Money [Southeast]
  - Campaign: Search - Hard Money [Midwest]
  - Campaign: Search - Hard Money [Northeast]
  - etc.
- **Bid adjustments:** Increase bids 10-25% in states with higher deal flow / higher close rates
- **Exclude:** States where you don't lend (avoid wasting clicks)

### Location Targeting Settings
- **Target:** "People in or regularly in your targeted locations" (default — use this)
- **Exclude:** "People in your excluded locations" (not just "interest in")
- This prevents someone in a non-lending state from seeing your ad because they searched "hard money lender Florida"

### Radius Targeting
- Less useful for THMC (lending is state-based, not radius-based)
- Could use for targeting around specific metros with high deal flow

---

## Compliance & Policy

### Google's Financial Services Ad Policies — Key Points for THMC

#### Good News: Hard Money is NOT "Personal Loans"
Google's personal loan restrictions (61+ day repayment, APR under 36%, etc.) explicitly **do NOT apply to:**
- Mortgages ✅
- Business loans ✅
- Commercial loans ✅

Hard money loans secured by real estate are mortgage/commercial products, NOT personal loans under Google's definition.

#### However — Common Issues
- **Policy flags:** Keywords like "hard money lender" sometimes trigger Google's automated "consumer finance" policy checks
- **Solution:** If flagged, you may need to complete Google's **Financial Services Verification** process
- This involves submitting business licenses, NMLS registration, and other documentation
- A third-party verifier (like G2 Risk Solutions) may check your credentials
- Process can take 1-4 weeks

#### Required Disclosures on Landing Pages
Even though hard money isn't "personal loans," best practice is to include:
- Physical business address
- NMLS number
- State licensing information
- Link to privacy policy
- Any associated fees/costs disclosed
- Link to BBB or other third-party accreditation where claimed

#### Avoiding Policy Violations
- **Don't** guarantee loan approval in ad copy ("Guaranteed Approval" = violation)
- **Don't** promise specific rates without disclosing conditions
- **Do** include "subject to qualification" language
- **Do** make disclosures visible (not hidden in hover text or other pages)
- **Do** ensure consistency between ad claims and landing page content

#### February 2024 Targeting Restrictions
Google now restricts targeting based on sensitive categories (age, gender, ZIP code) for consumer finance ads in US and Canada. This may affect some audience layering strategies. Workaround: Use keyword intent + contextual signals instead of demographic targeting.

### State-Level Compliance
- Each state has its own lending regulations
- Ad copy claiming specific rates should note they're subject to state requirements
- Landing pages should list states where THMC is licensed
- Consider state-specific landing pages for high-volume markets

---

## Cost Benchmarks for Hard Money / Private Lending

### Expected CPC Ranges
| Keyword Category | Estimated CPC Range |
|---|---|
| Hard money lender | $8-25 |
| Fix and flip loans | $6-18 |
| Bridge loans | $10-30 |
| DSCR loans | $5-15 |
| Private money lender | $8-20 |
| Investment property loan | $5-15 |
| Broker-targeted keywords | $3-10 |
| Long-tail variations | $3-8 |

**Note:** Hard money/private lending CPCs are significantly lower than traditional mortgage keywords (which can be $30-50+). This is because the niche is smaller and has fewer large competitors.

### Industry Benchmark Context (2025 WordStream Data)
- **Finance & Insurance:** Avg CPC $3.46, Avg CTR 8.33%
- **Real Estate:** Avg CPC $2.53, Avg CTR 8.43%
- Hard money falls somewhere in between — more expensive than general real estate, cheaper than mortgage/personal finance

### Expected CPL (Cost Per Lead) Ranges
| Lead Type | Estimated CPL |
|---|---|
| Form fill (general inquiry) | $25-75 |
| Rate quote request | $40-100 |
| Phone call from ad | $30-80 |
| Loan application started | $75-200 |
| Broker inquiry | $20-50 |

### Budget Recommendations for THMC
| Phase | Monthly Budget | Goal |
|---|---|---|
| Testing (Month 1) | $3,000-5,000 | Gather data, test keywords, establish baselines |
| Optimization (Months 2-3) | $5,000-10,000 | Refine keywords, improve QS, lower CPA |
| Scaling (Months 4+) | $10,000-25,000+ | Expand profitable campaigns, add PMax |

### Key Metric: What Can THMC Afford Per Lead?
```
Average Loan Revenue: $X (origination fees + points)
Close Rate from Google leads: estimate 5-15%
Maximum CPL = Close Rate × Average Revenue per Funded Loan × Target Margin

Example:
- Average revenue per funded loan: $5,000 (2 points on $250K loan)
- Close rate from Google leads: 10%
- Acceptable CPL = 10% × $5,000 = $500 breakeven
- Target CPL (50% margin): $250
```

---

# 3. Capital Raising / Investor Acquisition

## Keywords for Investor/Capital Raising (F Street)

### Tier 1: High Intent
- real estate investment opportunity
- passive income real estate
- real estate syndication
- invest in real estate
- multifamily investment
- real estate fund
- accredited investor opportunities
- private real estate investment
- real estate limited partnership
- invest in apartment buildings

### Tier 2: Research Phase
- passive income investments
- alternative investments
- how to invest in real estate passively
- real estate crowdfunding
- 1031 exchange investment
- tax-advantaged real estate investment
- real estate private equity
- cash flow real estate investing
- preferred return real estate
- real estate investment trust alternatives

### Tier 3: Wealth-Focused
- high yield investments
- wealth building real estate
- portfolio diversification real estate
- inflation hedge investments
- accredited investor deal flow
- family office real estate
- institutional real estate investment

### Negative Keywords for Investor Campaigns
- REIT (unless you want comparison traffic)
- stocks
- crypto / cryptocurrency
- day trading
- free / cheap
- loan / lending / borrow (they're not borrowers — they're investors)
- jobs / career
- course / class / training (unless targeting that funnel)

---

## Ad Copy for Investor Acquisition

### Headlines:
```
"Earn 8-12% Preferred Returns"
"Passive Real Estate Income"
"Invest in Multifamily Real Estate"
"Accredited Investor Opportunities"
"Diversify Your Portfolio"
"Tax-Advantaged RE Investments"
"Current Offerings Available"
"Institutional-Quality Deals"
"$50K Minimum Investment"
"Real Estate Fund — Open Now"
"F Street Investment Opportunities"
"Build Wealth Through Real Estate"
"Join 200+ Investors"
"Quarterly Cash Distributions"
"Professional Asset Management"
```

### Descriptions:
```
"F Street offers accredited investors access to institutional-quality real estate investments with attractive risk-adjusted returns. View current offerings."

"Earn passive income through professionally managed multifamily and commercial real estate. Preferred returns, tax advantages, and quarterly distributions."

"Join hundreds of investors building wealth through F Street's real estate funds. Minimum $50K investment. Download our investor presentation today."

"Looking for alternatives to stocks and bonds? F Street's real estate investments offer stable cash flow, appreciation potential, and tax benefits."
```

---

## SEC Compliance for Ad Copy (CRITICAL)

### Rule 506(c) — General Solicitation Allowed
If F Street is raising capital under **Reg D Rule 506(c)**, you CAN advertise and generally solicit. This was introduced by the JOBS Act in 2013.

**Requirements under 506(c):**
- All purchasers must be **accredited investors**
- Issuer must take **"reasonable steps" to verify** accredited investor status
- March 2025 SEC guidance relaxed verification requirements (good news — verification burden is now lighter)

**If F Street uses 506(b):** NO general solicitation allowed. Cannot use Google Ads for capital raising. Only pre-existing relationships.

### Ad Copy Do's and Don'ts

**DO:**
- State that offerings are for accredited investors only
- Mention general investment categories (multifamily, real estate)
- Reference general return ranges with appropriate disclaimers
- Include "Past performance is not indicative of future results"
- Direct to a landing page that gates content behind accredited investor verification
- Use language like "investment opportunity" or "offering available"

**DON'T:**
- Guarantee returns ("Guaranteed 12% returns!")
- Make promissory statements ("You WILL earn $X")
- Use language that suggests specific securities without proper context
- Fail to include required disclaimers
- Allow non-accredited investors to invest without verification
- Omit material risk factors

### Landing Page for Capital Raising
Must include:
- Accredited investor self-certification or verification gate
- Forward-looking statement disclaimers
- Risk factors prominently displayed
- "Not FDIC insured, not a bank deposit, may lose value"
- Link to full offering documents (PPM)
- SEC filing number where applicable

---

## Audience Targeting for High-Net-Worth Individuals

### Google Ads Options

#### Household Income Targeting (US Only)
Google allows targeting by income tier:
- Top 10% of household income
- 11-20%
- 21-30%
- 31-40%
- 41-50%
- Lower 50%
- Unknown

**Recommendation:** For investor acquisition, target **Top 10%** and **11-20%** tiers. Exclude Lower 50%.
**Caveat:** Income data is estimated and imperfect. Use as a layer, not sole targeting.

#### In-Market Audiences
Relevant in-market segments:
- Real Estate > Investment Property
- Financial Services > Investment Services
- Real Estate > Residential Properties
- Business Services > Financial Planning & Management

#### Affinity Audiences
- Luxury Travelers
- Business Professionals
- Investment Enthusiasts
- Avid Investors
- High-End Computing Enthusiasts

#### Custom Audiences (Custom Intent)
Create custom audiences based on:
- **URLs:** Competitor websites (crowdstreet.com, fundrise.com, realtyshares.com, yieldstreet.com)
- **Search terms:** "accredited investor opportunities," "passive real estate investment," "real estate syndication"
- **Apps:** Real estate investment apps, financial planning apps

#### Remarketing
- Site visitors who viewed investment pages but didn't convert
- YouTube viewers of investment content
- Email list upload (Customer Match) — upload existing investor list

### Layering Strategy
For Search campaigns: Use audience layering in "Observation" mode (not "Targeting" mode) to see which audiences perform best, then increase bids for high-performing segments without limiting reach.

For Display/Demand Gen: Use "Targeting" mode with combined audience criteria (in-market + income tier + age 35+).

---

# 4. Advanced Optimization

## A/B Testing Framework

### What to Test (Priority Order)
1. **Landing pages** — Biggest impact on conversion rate
   - Test: Form length (short vs. long)
   - Test: Hero image vs. no image
   - Test: CTA copy ("Get a Quote" vs. "Apply Now" vs. "Talk to an Expert")
   - Test: Social proof placement
   - Test: Rate display (showing rates vs. "Request rates")

2. **Ad copy** — Impacts CTR and QS
   - Test: Different headline themes (speed vs. rate vs. trust)
   - Test: Specific numbers vs. general claims
   - Test: Different CTAs
   - Test: Emotional vs. rational messaging

3. **Bidding strategies** — Impacts CPA efficiency
   - Test: Manual CPC vs. Maximize Conversions
   - Test: Different tCPA targets

4. **Keywords** — Impacts reach and relevance
   - Test: Exact vs. phrase vs. broad match
   - Test: Adding new keyword themes

### Testing Rules
- Only test ONE variable at a time
- Run tests for minimum 2 weeks or 100 conversions (whichever comes first)
- Use Google Ads Experiments for bid strategy and campaign-level tests
- Use RSA asset-level reporting for ad copy tests
- Document ALL tests and results

---

## Budget Pacing & Allocation

### Allocation Framework
| Campaign Type | % of Total Budget |
|---|---|
| Search - Core Keywords (proven) | 50-60% |
| Search - Expansion Keywords | 15-20% |
| Performance Max | 10-15% |
| Remarketing (Display) | 5-10% |
| Brand Protection | 5% |

### Pacing Rules
- Check pacing every Monday and Thursday
- If underspending: Raise bids or expand targeting
- If overspending: Lower bids, add negatives, or tighten geo targeting
- Don't let campaigns exhaust daily budget by noon (wasting peak hours)
- Use shared budgets cautiously (can cause one campaign to starve others)

---

## Dayparting / Ad Scheduling

### Recommended Schedule for Hard Money Lending
| Day | Hours | Bid Adjustment |
|---|---|---|
| Monday-Friday | 6 AM - 9 PM | +0% (full bid) |
| Monday-Friday | 9 PM - 12 AM | -20% |
| Monday-Friday | 12 AM - 6 AM | -50% or pause |
| Saturday | 8 AM - 6 PM | -10% |
| Saturday | 6 PM - 12 AM | -30% |
| Sunday | 10 AM - 4 PM | -20% |
| Sunday | Other hours | -50% or pause |

### Why Daypart for Financial Services
- Borrowers research during business hours when they can also call and talk to loan officers
- Best lead quality comes during weekday business hours
- After-hours leads tend to be lower quality (more tire-kickers)
- Save budget for when your team is available to respond quickly

### Data-Driven Approach
1. Run ads 24/7 for first 30 days
2. Analyze conversion data by hour-of-day and day-of-week
3. Apply bid adjustments based on actual performance
4. Review monthly and adjust

---

## Device Bid Adjustments

### Recommended Starting Adjustments
| Device | Bid Adjustment | Rationale |
|---|---|---|
| Desktop | +0% (baseline) | Highest conversion rate for form fills |
| Mobile | -10% to +10% | Depends on mobile landing page quality |
| Tablet | -20% | Generally lowest traffic and conversion |

### Key Insight for Lending
- Desktop typically has higher form completion rates (easier to fill out applications)
- Mobile has higher call rates (click-to-call)
- If your main conversion is phone calls, mobile bids should be higher
- If your main conversion is form fills, desktop should be higher
- Track separately and adjust based on YOUR data

---

## Audience Layering

### Search Campaign Layering (Observation Mode)
Add these audiences in "Observation" mode to Search campaigns to gather data without limiting reach:

1. **In-Market:** Real Estate > Investment Property
2. **In-Market:** Financial Services > Investment Services
3. **Remarketing:** All site visitors (past 30/60/90 days)
4. **Customer Match:** Upload existing client email list → create similar audience
5. **Custom Segments:** URLs of competitor websites

Once you have data (2-4 weeks), increase bids for high-performing audience segments and decrease for low-performing ones.

### Display/PMax Layering (Targeting Mode)
For Display and Performance Max, use "Targeting" mode:
- Combine in-market segments + income tier + geography
- Create separate asset groups per audience theme

---

## Performance Max Optimization for Lead Gen

### Setup Best Practices
1. **Use lead gen specific goals:** "Contact," "Submit Lead Form," "Request Quote," "Qualified Lead"
2. **Import offline conversions** — Without this, PMax will optimize for junk leads
3. **Add negative keywords** — As of early 2025, you can add account-level negatives to PMax
4. **Feed strong creative:** Minimum 5 text assets, 5 images, 1 video per asset group
5. **Use audience signals** (not targeting): Your data lists, custom segments, and in-market audiences

### Guardrails
- Set a Target CPA that's realistic based on your Search campaign data
- Don't expect PMax to outperform Search for lead quality initially
- Monitor lead quality closely — PMax may generate high volume but lower quality
- Use URL expansion settings carefully — exclude URLs you don't want traffic on (blog, careers, etc.)
- Allow 1-2 weeks learning period before making changes

### What NOT to Do
- Don't launch PMax before Search campaigns have conversion data
- Don't use PMax as your only campaign type for lead gen
- Don't ignore the search terms report (check under Insights)
- Don't let PMax cannibalize your brand terms (add brand as negative)

---

## Google Ads Scripts & Automation

### Useful Scripts for THMC

#### 1. Budget Monitor Script
Alerts you if any campaign is overspending or underspending vs. target pacing.

#### 2. Quality Score Tracker
Weekly snapshot of Quality Score by keyword. Alerts if any key keyword drops below 6.

#### 3. Search Query Mining
Automatically flags high-volume search terms not in your keyword list (opportunities) and high-spend irrelevant terms (negative keyword candidates).

#### 4. Ad Schedule Bid Modifier
Adjusts bids by hour-of-day based on conversion rate data from the past 30 days.

#### 5. Landing Page Status Check
Monitors landing page URLs for errors (404, slow load, etc.) and pauses ads if detected.

### Where to Find Scripts
- **Google's Script Library:** https://developers.google.com/google-ads/scripts/docs/solutions
- **Community Scripts:** Search Engine Land, PPC Hero, and r/PPC frequently share useful scripts
- **Custom scripts:** Can be built in JavaScript within Google Ads interface

### Automated Rules (Built-in)
Set up these rules in Google Ads without coding:
- Pause keywords with 0 conversions and >$200 spend in 30 days
- Increase bids by 10% for keywords with CPA below target
- Decrease bids by 10% for keywords with CPA 50%+ above target
- Email alerts for daily spend anomalies

---

## Monthly / Weekly Optimization Checklist

### Daily (5 minutes)
- [ ] Check spend pacing vs. budget
- [ ] Review any disapprovals or policy issues
- [ ] Check conversion volume (any anomalies?)

### Weekly (30-60 minutes)
- [ ] Search Terms Report: Add negatives, find new keyword opportunities
- [ ] Check Quality Scores on top keywords
- [ ] Review ad performance: Pause underperformers
- [ ] Check landing page load speed
- [ ] Review device and location performance
- [ ] Monitor competitor ads (manual search of key terms)
- [ ] Check call tracking: Quality of phone leads

### Bi-Weekly (60 minutes)
- [ ] A/B test review: Are tests running? Do we have statistical significance?
- [ ] Audience performance review
- [ ] Geographic performance: Any states/metros to adjust bids?
- [ ] Ad extension performance: Refresh underperformers

### Monthly (2-3 hours)
- [ ] Full performance review: CPC, CTR, CPA, CPL, conversion rate trends
- [ ] Budget reallocation based on campaign performance
- [ ] Bidding strategy review: Is current strategy optimal?
- [ ] Quality Score trending analysis
- [ ] Landing page conversion rate analysis
- [ ] Competitor analysis: Any new players or messaging changes?
- [ ] Update negative keyword lists
- [ ] Write and test new ad copy
- [ ] Review offline conversion import accuracy
- [ ] Update reporting dashboards
- [ ] Report to stakeholders with insights and recommendations

### Quarterly (Half day)
- [ ] Account structure review: Any campaigns to consolidate or split?
- [ ] Full audit against best practices
- [ ] Landing page refresh/redesign consideration
- [ ] Seasonal strategy adjustments
- [ ] Budget planning for next quarter
- [ ] Review and update conversion values
- [ ] Test new campaign types (PMax, Demand Gen)

---

# 5. Google Ads API Setup

## Overview
The Google Ads API allows programmatic access to manage campaigns, pull reports, and automate optimizations. Essential for building custom dashboards, automated bid management, and offline conversion imports.

## Step-by-Step Setup Process

### Step 1: Create a Google Ads Manager Account (MCC)
1. Go to https://ads.google.com/home/tools/manager-accounts/
2. Create a manager account (if you don't have one)
3. Link all THMC/F Street ad accounts under this MCC

### Step 2: Get a Developer Token
1. Sign into your MCC at https://ads.google.com
2. Navigate to **Tools & Settings → Setup → API Center** (https://ads.google.com/aw/apicenter)
3. Accept the API Terms and Conditions
4. You'll receive a developer token with **Test Account Access** level
5. Your developer token is displayed in the API Center

### Step 3: Set Up OAuth2 Credentials
1. Go to **Google Cloud Console:** https://console.cloud.google.com
2. Create a new project (or select existing)
3. Enable the **Google Ads API** for the project
4. Go to **APIs & Services → Credentials**
5. Click **Create Credentials → OAuth 2.0 Client ID**
6. Choose **Desktop application** (for scripts/automation) or **Web application** (for web-based tools)
7. Download the JSON file containing `client_id` and `client_secret`

### Step 4: Generate Refresh Token
1. Use Google's OAuth2 flow to authorize access:
```python
# Install the library
pip install google-ads

# Run the refresh token generator
python -c "
from google_auth_oauthlib.flow import InstalledAppFlow

flow = InstalledAppFlow.from_client_secrets_file(
    'client_secrets.json',
    scopes=['https://www.googleapis.com/auth/adwords']
)
credentials = flow.run_local_server(port=0)
print(f'Refresh token: {credentials.refresh_token}')
"
```
2. This opens a browser, asks you to log in and authorize
3. Copy the refresh token — you'll need this for API calls

### Step 5: Create Configuration File
Create `google-ads.yaml`:
```yaml
developer_token: YOUR_DEVELOPER_TOKEN
client_id: YOUR_CLIENT_ID
client_secret: YOUR_CLIENT_SECRET
refresh_token: YOUR_REFRESH_TOKEN
login_customer_id: YOUR_MCC_ID  # Without hyphens, e.g., 1234567890
```

### Step 6: Apply for Production Access

#### Access Levels

| Level | Production Access | Daily Operations | Review Time |
|---|---|---|---|
| Test Account | No | 15,000 | Instant |
| Explorer | Yes | 2,880 | Auto-upgraded sometimes |
| Basic | Yes | 15,000 | ~2 business days |
| Standard | Yes | Unlimited | ~10 business days |

**For THMC:** Basic Access is sufficient. 15,000 operations/day handles reporting, bid adjustments, and conversion uploads easily.

**To apply for Basic Access:**
1. Go to https://ads.google.com/aw/apicenter
2. Ensure your API contact email is up-to-date
3. Link all active Google Ads accounts to your MCC
4. Click the dropdown next to "Access level" → "Apply for Basic Access"
5. Complete the application form
6. Wait ~2 business days for approval

### Step 7: Install Python Client Library
```bash
pip install google-ads
```

### Step 8: Test the Connection
```python
from google.ads.googleads.client import GoogleAdsClient

# Initialize client from config file
client = GoogleAdsClient.load_from_storage("google-ads.yaml")

# Test: List accessible accounts
customer_service = client.get_service("CustomerService")
accessible = customer_service.list_accessible_customers()
print(f"Accessible customers: {accessible.resource_names}")
```

---

## Common API Operations

### Pull Campaign Performance Report
```python
from google.ads.googleads.client import GoogleAdsClient

client = GoogleAdsClient.load_from_storage("google-ads.yaml")
ga_service = client.get_service("GoogleAdsService")

query = """
    SELECT
        campaign.name,
        campaign.status,
        metrics.impressions,
        metrics.clicks,
        metrics.cost_micros,
        metrics.conversions,
        metrics.cost_per_conversion
    FROM campaign
    WHERE segments.date DURING LAST_30_DAYS
    AND campaign.status != 'REMOVED'
    ORDER BY metrics.cost_micros DESC
"""

response = ga_service.search_stream(
    customer_id="YOUR_CUSTOMER_ID",  # Without hyphens
    query=query
)

for batch in response:
    for row in batch.results:
        cost = row.metrics.cost_micros / 1_000_000
        print(f"{row.campaign.name}: "
              f"Clicks={row.metrics.clicks}, "
              f"Conv={row.metrics.conversions:.0f}, "
              f"Cost=${cost:.2f}, "
              f"CPA=${row.metrics.cost_per_conversion / 1_000_000:.2f}")
```

### Upload Offline Conversions
```python
from google.ads.googleads.client import GoogleAdsClient

client = GoogleAdsClient.load_from_storage("google-ads.yaml")
conversion_upload_service = client.get_service("ConversionUploadService")

# Create conversion
click_conversion = client.get_type("ClickConversion")
click_conversion.gclid = "GCLID_FROM_LEAD_FORM"
click_conversion.conversion_action = (
    f"customers/YOUR_CUSTOMER_ID/conversionActions/CONVERSION_ACTION_ID"
)
click_conversion.conversion_date_time = "2026-03-26 18:00:00-05:00"
click_conversion.conversion_value = 500.0  # Value of the conversion
click_conversion.currency_code = "USD"

# Upload
request = client.get_type("UploadClickConversionsRequest")
request.customer_id = "YOUR_CUSTOMER_ID"
request.conversions = [click_conversion]
request.partial_failure = True

response = conversion_upload_service.upload_click_conversions(request=request)
print(f"Upload result: {response.results[0].gclid}")
```

### Adjust Campaign Bids
```python
from google.ads.googleads.client import GoogleAdsClient

client = GoogleAdsClient.load_from_storage("google-ads.yaml")
campaign_service = client.get_service("CampaignService")

# Update campaign bid strategy
operation = client.get_type("CampaignOperation")
campaign = operation.update
campaign.resource_name = f"customers/CUSTOMER_ID/campaigns/CAMPAIGN_ID"

# Set target CPA
campaign.target_cpa.target_cpa_micros = 100_000_000  # $100 target CPA

# Set field mask
client.copy_from(
    operation.update_mask,
    protobuf_helpers.field_mask(None, campaign._pb)
)

response = campaign_service.mutate_campaigns(
    customer_id="CUSTOMER_ID",
    operations=[operation]
)
```

---

## API Rate Limits & Best Practices

### Rate Limits
| Access Level | Daily Operations |
|---|---|
| Test | 15,000 |
| Explorer | 2,880 (production), 15,000 (test) |
| Basic | 15,000 |
| Standard | Unlimited |

- Each `Search` or `SearchStream` call = 1 operation
- Each `Mutate` call = 1 operation per entity mutated
- Paginated requests (valid page_token) = free
- Failed requests still count against quota

### Best Practices
- Use `SearchStream` instead of `Search` for large reports (single operation regardless of result size)
- Batch mutations: Up to 10,000 operations per mutate request
- Implement exponential backoff for rate limit errors (RESOURCE_EXHAUSTED)
- Cache results when possible
- Schedule heavy reporting during off-peak hours
- Use partial_failure=True for batch uploads to handle individual errors

### Connecting to HubSpot Workflow
For automated offline conversion import:
1. HubSpot workflow triggers when lead status changes (e.g., "Qualified" → "Application" → "Funded")
2. Webhook sends GCLID + conversion details to your API endpoint
3. Python script receives webhook, formats data, uploads to Google Ads API
4. Can be run as a cron job (batch upload daily) or real-time via webhook

---

# 6. Reporting & KPIs

## Key Metrics to Track

### Weekly Metrics
| Metric | Definition | Target for THMC |
|---|---|---|
| Impressions | Times ad was shown | Tracking (no target) |
| Clicks | Times ad was clicked | Tracking |
| CTR | Clicks ÷ Impressions | >6% for Search |
| Avg. CPC | Cost ÷ Clicks | Varies by keyword ($5-25) |
| Conversions | Leads generated | Maximize |
| Conversion Rate | Conversions ÷ Clicks | >5% (aim for 8-12%) |
| Cost / Conversion (CPL) | Cost ÷ Conversions | <$150 (depends on loan value) |
| Quality Score | 1-10 per keyword | >7 on core keywords |
| Search Impression Share | % of eligible impressions received | >60% for core terms |

### Monthly Metrics
| Metric | Definition | Target |
|---|---|---|
| Total Spend | Monthly ad spend | Within budget |
| Total Leads | All form fills + calls | Growth month-over-month |
| Cost Per Lead (CPL) | Total cost ÷ total leads | Declining trend |
| Lead-to-Qualified Rate | % of leads that are qualified | >30% |
| Qualified Lead Cost | Cost ÷ qualified leads | <$300 |
| Lead-to-Funded Rate | % of leads that fund | >5% |
| Cost Per Funded Loan | Total cost ÷ funded loans | Track and optimize |
| ROAS | Revenue from funded loans ÷ ad spend | >3:1 |

### ROAS Calculation for Lead Gen
Standard ROAS for lead gen businesses:
```
ROAS = (Number of Funded Loans × Revenue per Loan) ÷ Total Ad Spend

Example:
- Monthly spend: $10,000
- Leads generated: 100
- Qualified leads: 35 (35% qualification rate)
- Applications: 15 (15% application rate)
- Funded loans: 8 (8% close rate from lead)
- Revenue per loan: $5,000
- Total revenue: $40,000
- ROAS: $40,000 ÷ $10,000 = 4:1 ✅
```

**Target ROAS for financial services:** 3:1 to 6:1 is considered good.

---

## Dashboard Setup

### Option 1: Google Ads Built-In
- Use custom columns to show CPL, ROAS, and lead quality metrics
- Create saved reports for weekly/monthly review
- Set up email alerts for anomalies

### Option 2: Looker Studio (Free)
- Connect Google Ads data source
- Build visual dashboard with:
  - Spend vs. budget pacing
  - CPL trend over time
  - Top performing keywords
  - Geographic performance heat map
  - Device breakdown
  - Day/hour performance grid
  - Quality Score distribution

### Option 3: Third-Party Tools
- **AgencyAnalytics** — Great for client reporting
- **Supermetrics** — Pulls data into Google Sheets/Looker
- **Databox** — Real-time KPI tracking
- **Porter Metrics** — Free templates for Looker Studio

### Essential Dashboard Sections
1. **Executive Summary:** Spend, leads, CPL, ROAS (this month vs. last month vs. target)
2. **Campaign Performance:** Each campaign's key metrics
3. **Keyword Performance:** Top 20 keywords by spend, CPL, conversions
4. **Lead Quality Funnel:** Leads → Qualified → Application → Funded
5. **Geographic Performance:** By state/metro
6. **Trend Charts:** CPL over time, conversion rate over time, spend over time
7. **Search Terms Report:** Top new terms and waste terms

---

## Benchmark KPIs for Financial Services / Lending

### 2025 Benchmarks (WordStream / Industry Data)

| Metric | Finance & Insurance | Real Estate | Hard Money (Estimated) |
|---|---|---|---|
| Avg CTR | 8.33% | 8.43% | 6-10% |
| Avg CPC | $3.46 | $2.53 | $8-25 |
| Avg Conversion Rate | 4-8% | 3-6% | 5-12% |
| Avg CPL | $50-100 | $40-80 | $50-200 |

### Lead Quality Tracking
Beyond quantity metrics, track:
- **Lead Score:** Rate leads 1-5 based on loan amount, experience, property type, credit
- **Response Time:** How fast does your team respond to leads? (<5 minutes = 8x higher contact rate)
- **Source Attribution:** Which keywords/campaigns produce the best leads?
- **Time to Close:** How long from lead to funded loan for Google Ads leads?
- **Loan Size by Source:** Are Google leads bringing bigger or smaller deals?

### Attribution Best Practices
1. Use Data-Driven Attribution in Google Ads
2. Track GCLID through entire funnel (lead → qualification → application → closing)
3. Import offline conversions back to Google with conversion values
4. Use UTM parameters for cross-platform tracking (Google Analytics + HubSpot)
5. Monthly reconciliation: Compare Google Ads reported conversions vs. actual CRM leads
6. Calculate "true ROAS" including full sales cycle, not just initial lead cost

---

## Quick Reference: Ad Copy Examples for THMC

### Fix & Flip Campaign
```
Headline 1: Fix & Flip Loans — Close in 7 Days
Headline 2: Up to 90% LTV | Rates from 9.99%
Headline 3: Fast Rehab Financing for Investors
Description 1: Get fast, reliable fix & flip financing from The Hard Money Company. Up to 90% LTV, competitive rates, and closings in as few as 7 days. Apply now.
Description 2: Fund your next flip with confidence. Simple application, quick approvals, and flexible terms. First-time flippers welcome. Get a rate quote today.
```

### Bridge Loan Campaign
```
Headline 1: Bridge Loans — Quick Capital Now
Headline 2: Short-Term Financing | 12-24 Months
Headline 3: Bridge the Gap on Your Next Deal
Description 1: Need short-term capital to close a deal? The Hard Money Company offers bridge loans with quick closings and competitive terms. Get pre-approved today.
Description 2: Don't lose your deal waiting for permanent financing. Our bridge loans keep your projects moving. Flexible terms, fast funding. Apply in minutes.
```

### DSCR Loan Campaign
```
Headline 1: DSCR Loans — No Income Docs Required
Headline 2: Rental Property Financing | 30-Year Terms
Headline 3: Build Your Portfolio with DSCR Loans
Description 1: Qualify based on property cash flow, not personal income. The Hard Money Company's DSCR loans offer long-term financing for rental investors. Rates from X%.
Description 2: Grow your rental portfolio with no income documentation required. 30-year fixed terms, competitive rates, and a simple qualification process.
```

### Broker Program Campaign
```
Headline 1: Hard Money Broker Partnership Program
Headline 2: Earn Top Commissions | Fast Closings
Headline 3: Wholesale Hard Money — Partner With Us
Description 1: Join The Hard Money Company's broker program. Competitive comp, dedicated support, and fast closings that make you look good. Apply for partnership today.
Description 2: Give your clients access to fix & flip, bridge, and DSCR loans from a reliable nationwide lender. Broker portal, competitive pricing, same-day answers.
```

---

## Implementation Roadmap for THMC

### Phase 1: Foundation (Week 1-2)
- [ ] Set up Google Ads MCC and sub-accounts
- [ ] Install Google Tag on all THMC pages
- [ ] Set up conversion tracking (form fills, phone calls)
- [ ] Build landing pages for each product (fix & flip, bridge, DSCR, broker)
- [ ] Complete financial services verification if required
- [ ] Write initial RSAs for all campaigns
- [ ] Configure all ad extensions
- [ ] Launch Search campaigns with exact + phrase match keywords
- [ ] Set up negative keyword lists
- [ ] Budget: $3,000-5,000/month

### Phase 2: Optimization (Weeks 3-6)
- [ ] Review search terms weekly — add negatives
- [ ] Monitor Quality Scores — improve any below 6
- [ ] A/B test landing pages
- [ ] Switch to Smart Bidding once 30+ conversions accumulated
- [ ] Set up enhanced conversions
- [ ] Begin offline conversion import (GCLID → HubSpot → Google)
- [ ] Add geographic bid adjustments
- [ ] Implement dayparting
- [ ] Budget: $5,000-10,000/month

### Phase 3: Scaling (Months 2-3)
- [ ] Launch Performance Max campaign
- [ ] Add remarketing campaign
- [ ] Expand keyword coverage (broad match + Smart Bidding test)
- [ ] Launch broker acquisition campaign
- [ ] Set up Google Ads API for automated reporting
- [ ] Build Looker Studio dashboard
- [ ] Begin A/B testing ad copy systematically
- [ ] Budget: $10,000-15,000/month

### Phase 4: Maturity (Months 4+)
- [ ] Launch F Street investor acquisition campaigns
- [ ] Implement automated offline conversion pipeline (API-based)
- [ ] Fine-tune Target CPA/ROAS bidding
- [ ] Explore Demand Gen campaigns for investor acquisition
- [ ] Test video campaigns for brand building
- [ ] Implement Google Ads scripts for monitoring
- [ ] Monthly optimization cadence fully established
- [ ] Budget: $15,000-25,000+/month

---

*This playbook is a living document. Update it as you learn what works for THMC and F Street specifically. The benchmarks and strategies above are starting points — your actual data will be the ultimate guide.*
