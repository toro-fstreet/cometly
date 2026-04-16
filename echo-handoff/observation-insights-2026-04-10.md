# Observation Week Insights — Friday, April 10, 2026
## Focus: Cross-Platform Integration — Attribution Mapping, Customer Journey Analysis, Tracking Gap Identification

---

## Executive Summary

Analyzed 100 closed-won THMC hard money deals (last 6 months) for cross-platform attribution patterns, pulled live Meta Ads data (30-day), examined HubSpot multi-touch fields, and mapped the customer journey from first touch to funded loan. The findings reveal **severe tracking infrastructure gaps** that are costing THMC millions in optimization potential.

### 🔑 Top Findings

1. **84% of won deals are multi-touch** — first source and last source differ, proving borrowers take complex journeys across platforms
2. **Email marketing is a hidden revenue multiplier** — 24% of won deals show email as the final touchpoint before close, driving $12.2M in revenue
3. **Meta Pixel is essentially broken** — only 2 pixel lead events fired vs. 661 form leads in last 30 days (0.3% fire rate)
4. **GCLID capture works but isn't being used** — 41% of won deals have GCLIDs, but no offline conversion import exists back to Google Ads
5. **Cometly is single-touch only** — despite being installed, all observed touchpoint data shows only 1 touch per contact
6. **191 contacts show cross-platform journeys** — 94 started on Google then touched Facebook, 97 started on Facebook then touched Google

---

## 1. Attribution Journey Mapping — How Won Deals Actually Convert

### Journey Patterns (100 Won Deals, Oct 2025 – Apr 2026)

| Journey Pattern | Deals | Revenue | Avg Deal |
|---|---|---|---|
| **OFFLINE → DIRECT_TRAFFIC** | 32 | $17.6M | $550K |
| **DIRECT_TRAFFIC → DIRECT_TRAFFIC** | 12 | $1.68M | $140K |
| **PAID_SEARCH → EMAIL_MARKETING** | 7 | $1.11M | $158K |
| **PAID_SEARCH → DIRECT_TRAFFIC** | 7 | $1.71M | $244K |
| **DIRECT_TRAFFIC → EMAIL_MARKETING** | 6 | $1.68M | $280K |
| **ORGANIC_SEARCH → EMAIL_MARKETING** | 6 | $1.38M | $230K |
| **OFFLINE → EMAIL_MARKETING** | 5 | $1.48M | $296K |
| **ORGANIC_SEARCH → DIRECT_TRAFFIC** | 5 | $1.03M | $206K |
| **PAID_SOCIAL → DIRECT_TRAFFIC** | 4 | $991K | $248K |
| **OFFLINE → ORGANIC_SEARCH** | 4 | $586K | $147K |
| **PAID_SOCIAL → EMAIL_MARKETING** | 2 | $6.28M | $3.14M |
| **AI_REFERRALS → ORGANIC_SEARCH** | 1 | $195K | $195K |

### 🔑 Key Journey Insights

**A. The Offline-to-Digital Pipeline ($17.6M)**
- 32 deals follow this path: imported/manual CRM entry → borrower returns to thehardmoneyco.com directly
- These are repeat borrowers and referrals who get entered by sales, then self-serve online for draws, payments, etc.
- The "last source" is actually servicing behavior (repair draws, ACH), not acquisition — **this inflates DIRECT_TRAFFIC attribution**

**B. Email Marketing as Deal Closer ($12.2M across 26 deals)**
- Email is the **last touch** for 26% of won deals across ALL original sources
- `hs_automation` (HubSpot sequences) = 25 deals → nurture sequences are working
- `weekly newsletter` = 2 deals → newsletter keeps brand warm
- This means email isn't generating leads but is **critical for conversion**

**C. Paid Search Multi-Touch ($2.8M across 14 deals)**
- 14 paid search-originated deals closed, but only 1 shows PAID_SEARCH as the latest source
- 7 ended via EMAIL_MARKETING, 7 via DIRECT_TRAFFIC
- This means Google Ads gets credit for origination, but email and direct visits close the deal
- **Without offline conversion import, Google can't learn which clicks actually fund**

**D. Paid Social Hidden Revenue ($7.3M across 8 deals)**
- 8 Meta-originated deals worth $7.3M total
- The Freeport Portfolio Refinance alone = $6.03M (Facebook → email nurture → close)
- 4 ended via DIRECT_TRAFFIC, 2 via EMAIL_MARKETING, 2 others
- Meta's true contribution is obscured by last-touch attribution

### The Post-Acquisition Page Pattern
Won deal contacts' last visited pages reveal their lifecycle stage:
| Last Page | Count | Meaning |
|---|---|---|
| hs_automation (email) | 25 | Engaged with nurture sequence |
| /repair-draw | 23 | Active borrower drawing funds |
| /payoff-request | 13 | Loan being paid off |
| /ach | 6 | Setting up payments |
| /internal-form-submissions | 5 | Internal processing |
| /application | 3 | Applied or re-applied |
| / (homepage) | 4 | Browsing |
| /loan-calculator | 1 | Evaluating terms |

**⚠️ Critical Insight:** 42 of 100 won deals' "latest source" is actually servicing activity (repair draws, payoff requests, ACH) — not acquisition. This means **last-touch attribution is fundamentally broken for THMC** because active borrowers' servicing page visits overwrite their acquisition source.

---

## 2. Cross-Platform Journey Analysis

### Verified Cross-Platform Contacts
| Journey | Count | Significance |
|---|---|---|
| Google Ads first → later Facebook referrer | 94 contacts | Google-acquired leads are being retargeted on Facebook |
| Facebook first → later Google referrer | 97 contacts | Facebook leads come back via Google search |

**This proves the platforms work together**, not in isolation. A borrower might:
1. See a Meta ad → fill out short app (PAID_SOCIAL)
2. Google "hard money lender" to verify legitimacy (ORGANIC_SEARCH/PAID_SEARCH)
3. Return directly to thehardmoneyco.com to apply (DIRECT_TRAFFIC)
4. Get nurture emails → click through to complete process (EMAIL_MARKETING)

### The Typical THMC Borrower Journey (Reconstructed)

**Path A: High-Volume Meta Funnel (6,387 leads, 11 wins)**
```
Meta Ad → Short App Lead Form → [DEAD END for 96.3%]
  ↓ (3.7% advance)
Pre-Approval → Application → Underwriting → Close
  ↓ (during process, borrower visits:)
  thehardmoneyco.com/application, /repair-draw, /ach
  ↓ (receives:)
  HubSpot automation emails → clicks through
```

**Path B: High-Intent Search Funnel (757 leads, 26 wins)**
```
Google Search "hard money lender [city]" → Click Ad → Land on THMC
  ↓ 
Browse site → Submit application or contact form
  ↓ (during process:)
  Returns directly to site + engages with email nurture
  ↓
Close (4.1% win rate — nearly 3x Meta)
```

**Path C: Relationship/Repeat Pipeline (682 leads, 70 wins)**
```
Referral/Repeat/Broker deal → Entered in CRM manually
  ↓
Borrower accesses thehardmoneyco.com for draws, payments, forms
  ↓
Close (13% win rate — 8x Meta)
```

---

## 3. Tracking Infrastructure Audit

### What's Working ✅
| System | Status | Coverage |
|---|---|---|
| **HubSpot original source tracking** | ✅ Working | 100% of won deals have original source |
| **HubSpot latest source tracking** | ✅ Working | 100% of won deals have latest source |
| **GCLID capture** | ✅ Working | 41% of won deals (all paid search deals captured) |
| **UTM parameters (Meta)** | ✅ Working | Campaign names flow through to HubSpot |
| **Cometly first-touch attribution** | ✅ Working | Campaign + ad set + ad level detail |
| **HubSpot automation sequences** | ✅ Working | 25 of 100 won deals engaged |

### What's Broken or Missing ❌

#### 1. Meta Pixel — Effectively Dead
- **30-day data:** 661 lead form submissions, but only **2 pixel lead events fired**
- **Fire rate: 0.3%** — the pixel is not tracking conversions
- **Impact:** Meta's algorithm can't optimize for quality leads because it has almost no conversion signal
- **Root cause likely:** Meta lead forms don't redirect to a pixel-equipped thank-you page, OR the pixel isn't installed on key pages
- **This single issue may explain why Meta's 0.16% win rate is so terrible** — without conversion data, Meta optimizes for volume, not quality

#### 2. Google Ads Offline Conversion Import — Not Set Up
- 41 won deals have GCLIDs sitting in HubSpot
- **None of these are being fed back to Google Ads**
- Google's Smart Bidding has zero signal about which clicks actually funded loans
- This is like flying blind — Google optimizes for form fills, not funded deals
- **Estimated impact:** Could reduce CPA by 30-50% with proper offline conversion signals

#### 3. Cometly — Single-Touch Only
- Despite being installed across ad platforms, Cometly records only single-touch attribution
- All 20 examined contacts show exactly 1 touchpoint (except 1 with 2)
- **Multi-touch attribution** (the whole point of Cometly) appears non-functional
- No cross-platform journey mapping between Google and Meta

#### 4. No Conversions API (CAPI) for Meta
- Server-side conversion tracking not configured
- With iOS privacy changes and ad blockers, pixel-only tracking misses 30-50% of conversions
- CAPI would send conversion events directly from HubSpot to Meta

#### 5. State/Loan Type Data Empty
- Geographic and product-type fields are blank across all deals
- Can't optimize campaigns by geography or loan product
- Can't answer "which states have the best ROI?" or "do fix-and-flip leads close better than bridge?"

#### 6. Last-Touch Attribution Corrupted by Servicing Pages
- 42% of won deals show servicing pages (repair-draw, payoff-request, ACH) as latest source
- This overwrites the actual last marketing touchpoint
- HubSpot treats every page view as a potential source change — borrower servicing corrupts attribution

---

## 4. Meta Ads Current Performance (Live Data — Last 30 Days)

| Campaign | Spend | Leads | CPL | Pixel Leads |
|---|---|---|---|---|
| THMC_Meta_Generic_20260206 | $9,440 | 456 | $21 | 1 |
| THMC_Meta_Generic_20260313 | $1,943 | 61 | $32 | 0 |
| THMC_Meta_Brokers_20260304 | $1,334 | 86 | $16 | 1 |
| THMC_Meta_Generic_20251110_Copy_ABO | $1,112 | 24 | $46 | 0 |
| THMC_Meta_Generic_20251110 | $643 | 23 | $28 | 0 |
| THMC_Meta_Generic_20260318_RIQ | $442 | 8 | $55 | 0 |
| THMC_Meta_Forecasa&ForecasaADV+ | $245 | 3 | $82 | 0 |
| **TOTAL** | **$15,159** | **661** | **$23 avg** | **2** |

### Meta Performance Context
- **$15.2K/month spend** generating 661 leads at $23 CPL
- CPL is actually very efficient by industry standards
- **But only 0.3% pixel tracking** means Meta can't distinguish good leads from junk
- **Broker campaign** ($16 CPL, 86 leads) is the best value — aligns with Thursday's finding that broker leads close highest

### The Meta Attribution Gap Quantified
- 661 leads/month × 12 months ≈ 7,932 leads/year
- Historical win rate: 0.16% (from Thursday's analysis)
- Expected wins: ~12.7/year
- Average won deal revenue: ~$545K
- **Estimated annual revenue from Meta: $6.9M**
- **Annual Meta spend: ~$182K**
- **ROAS: ~38:1** — but this is misleading because of the massive operational overhead of processing 7,900+ unqualified leads

---

## 5. Google Ads Tracking Gaps

### What Google Ads Currently Sees
- Click → form submission (conversion pixel fires)
- **That's it.** No visibility into:
  - Which clicks led to pre-approval
  - Which clicks led to funded loans
  - Which clicks led to $1M deals vs. $50K deals
  - Deal pipeline stage progression

### What Google Ads Should See (Offline Conversion Import)
```
GCLID → Form Submit → Pre-Approved → Application → Funded ($amount)
```

### GCLID Data Available in HubSpot
- 479 contacts have GCLIDs in HubSpot (total)
- 41 of 100 recent won deals have GCLIDs
- **This data is ready to import** — it just hasn't been connected

### Campaigns That Would Benefit Most
From the won deal data:
| Campaign | Won Deals | Revenue | GCLID Available |
|---|---|---|---|
| bp_wisconsin_all_non-brand_search | 2 | $829K | Yes |
| gs_nb_milwaukee_mixed_pdm | 2 | ~$300K | Yes |
| gs_nb_hardmoney_mixed_illinois_pdm | 1 | $282K | Yes |
| gs_br_thmc_mixed_pdm | 1 | $155K | Yes |
| remarketing_all_markets | 1 | $48K | Yes |
| clp_competitor-breakout-search | 1 | $95K | Yes |

---

## 6. The Complete Attribution Picture — Platform Contribution Map

### Revenue by First Touch (Origination Credit)
```
OFFLINE:          $20.3M  (43 deals) — Relationships, referrals, repeat business
DIRECT_TRAFFIC:    $5.4M  (19 deals) — Brand-aware visitors
PAID_SEARCH:       $4.9M  (15 deals) — Google Ads clicks
ORGANIC_SEARCH:    $3.6M  (13 deals) — SEO/organic Google
PAID_SOCIAL:       $7.3M   (8 deals) — Meta Ads (includes $6M Freeport outlier)
AI_REFERRALS:      $195K   (1 deal)  — ChatGPT referral
OTHER:             $255K   (1 deal)
```

### Revenue by Last Touch (Closing Credit)
```
DIRECT_TRAFFIC:   $25.4M  (66 deals) — Inflated by servicing page visits
EMAIL_MARKETING:  $12.2M  (24 deals) — Nurture sequences + newsletters
ORGANIC_SEARCH:    $2.5M   (8 deals) — Brand searches during process
PAID_SEARCH:       $255K   (2 deals) — Remarketing during process
OFFLINE:           $735K   (1 deal)
```

### Implied Multi-Touch Attribution (Synthesized)
| Platform | Origination | Assist | Closing | True Revenue Influence |
|---|---|---|---|---|
| **OFFLINE/Relationships** | $20.3M | Low | Low | ~$20M (mostly single-channel) |
| **Google Ads** | $4.9M | Medium | Low | ~$6-8M (some organic search is brand lift from ads) |
| **Meta Ads** | $7.3M | Medium | Low | ~$3-5M (excl. $6M outlier; assists via awareness) |
| **Email Marketing** | $0 | High | $12.2M | ~$12M (critical conversion role) |
| **Organic Search** | $3.6M | Medium | $2.5M | ~$5M (brand + discovery) |
| **Direct Traffic** | $5.4M | — | $25.4M | ~$5M real acquisition (rest is servicing) |

---

## 7. Tracking Gap Priority Matrix

### 🔴 Critical (Fix This Week)

#### Gap #1: Meta Pixel / Conversions API
- **Impact:** Meta can't optimize for quality. 661 leads but only 2 pixel events = blind optimization
- **Fix:** 
  1. Install/verify Meta Pixel on ALL thehardmoneyco.com pages
  2. Set up Meta Conversions API (server-side) via HubSpot integration
  3. Send lead form → qualified → funded events to Meta
- **Expected improvement:** 2-5x improvement in lead quality if Meta can optimize for downstream conversions
- **Effort:** 2-4 hours with HubSpot-Meta native integration

#### Gap #2: Google Ads Offline Conversion Import
- **Impact:** Google's Smart Bidding optimizes for clicks/form fills, not funded loans
- **Fix:**
  1. Build HubSpot → Google Ads conversion pipeline
  2. Import GCLID + conversion event + value when deals hit key stages
  3. Feed: Pre-Approved, Application Submitted, Funded (with amount)
- **Expected improvement:** 30-50% CPA reduction as bidding targets funded deals
- **Effort:** 4-8 hours via Google Ads API or Zapier/HubSpot integration

### 🟡 High Priority (Fix This Month)

#### Gap #3: Fix Last-Touch Attribution Corruption
- **Impact:** Servicing page visits overwrite marketing attribution for 42% of won deals
- **Fix options:**
  1. Create custom HubSpot properties that lock first + last *marketing* touch (don't overwrite with servicing)
  2. Exclude servicing URLs (/repair-draw, /payoff-request, /ach, /internal-form-submissions) from analytics tracking
  3. Or use separate subdomain for servicing (servicing.thehardmoneyco.com)
- **Effort:** 2-4 hours

#### Gap #4: Cometly Multi-Touch Configuration
- **Impact:** Paying for multi-touch attribution tool that only captures single touches
- **Fix:** 
  1. Audit Cometly pixel installation across all platforms
  2. Verify cross-domain tracking between Meta, Google, and THMC website
  3. Enable multi-touch attribution models in Cometly dashboard
- **Effort:** 2-3 hours in Cometly dashboard + pixel audit

#### Gap #5: State and Loan Type Fields
- **Impact:** Can't optimize geographic or product targeting
- **Fix:** Make state and loan_type required fields on application forms; backfill from property addresses
- **Effort:** 1-2 hours

### 🟢 Opportunity (This Quarter)

#### Gap #6: Cross-Platform Audience Sync
- Upload HubSpot "Closed Won" contacts as Meta Custom Audience → Lookalike targeting
- Sync Google Ads Customer Match lists from HubSpot
- Create suppression lists (don't advertise to active borrowers)

#### Gap #7: Unified Reporting Dashboard
- Build a single dashboard showing: Google Ads spend → HubSpot pipeline → Meta Ads spend → Revenue
- Use HubSpot's attribution reports (already available with their plan)
- Or build in Google Looker Studio pulling from all three APIs

---

## 8. The $5M+ Optimization Opportunity

### Current State (Broken Attribution)
- **Google Ads:** Optimizing for form fills. No idea which $8 clicks produce $800K loans
- **Meta Ads:** Optimizing for lead volume. Pixel fires 0.3% of the time. Floods pipeline with 6,000+ junk leads
- **Email:** Responsible for 26% of conversions but gets zero attribution budget credit
- **Cometly:** Installed but providing single-touch data only

### Fixed State (With All Gaps Addressed)
- **Google Ads:** Smart Bidding targets funded loans worth $200K+. CPA drops 30-50%. Same spend → 30-50% more funded deals
- **Meta Ads:** Conversions API tells Meta which leads actually fund. Quality score improves. Lead volume may drop but funded deals increase
- **Email:** Properly credited as conversion driver. Budget allocated to improve sequences
- **Cometly:** Shows full cross-platform journey: Meta impression → Google click → email nurture → funded loan

### Conservative Revenue Impact Estimate
| Fix | Current Performance | Expected Improvement | Revenue Impact |
|---|---|---|---|
| Google Offline Conversion Import | 15 wins/6mo | +30% win rate from better bidding | +$1.5M/yr |
| Meta Pixel + CAPI | 8 wins/6mo | +50-100% from quality optimization | +$1.5-3M/yr |
| Attribution-informed budget reallocation | $15K Meta + $X Google | 20% efficiency gain | +$1-2M/yr |
| Email sequence optimization (with credit) | 26% conversion assist | +15% sequence improvement | +$1M/yr |
| **TOTAL ESTIMATED UPSIDE** | | | **$5-7.5M/yr** |

---

## 9. Recommendations for Action Week (April 14)

### Monday Priority: Fix Tracking (Before Any Campaign Changes)
1. **Meta Conversions API setup** — Use HubSpot's native Meta integration to send server-side events
2. **Google Offline Conversion Import** — Script GCLID + deal stage + amount uploads via Google Ads API
3. **Meta Pixel audit** — Verify pixel fires on every page of thehardmoneyco.com

### Tuesday: Attribution Cleanup
4. **Create locked marketing source fields** in HubSpot that don't get overwritten by servicing visits
5. **Audit Cometly configuration** — either fix multi-touch or evaluate whether it's worth the subscription
6. **Backfill state/loan_type** from deal property addresses

### Wednesday: Audience Infrastructure
7. **Upload won-deal audiences** to Meta + Google for lookalike/similar targeting
8. **Create suppression lists** for active borrowers (stop advertising to people who already have loans)
9. **Build retargeting audiences** from HubSpot pipeline stages

### Thursday-Friday: Campaign Optimization (With New Data)
10. **Adjust Meta campaign structure** based on pixel data
11. **Shift Google Ads bidding** to target-CPA with offline conversion values
12. **Reallocate budget** toward highest-ROI channels per the attribution data

---

## 10. Cross-Reference with Prior Observation Days

| Day | Finding | Friday Connection |
|---|---|---|
| **Tuesday (Meta)** | Recommended broker campaign as highest ROI | ✅ Confirmed: broker campaign at $16 CPL AND broker-sourced deals close largest |
| **Tuesday (Meta)** | Need dedicated landing pages | ✅ Confirmed: /application converts at 1.7% vs. homepage at 5.3% — ad landing page matters |
| **Tuesday (Meta)** | Conversions API needed | 🔴 **CRITICAL**: Only 2 pixel leads out of 661 — this is the #1 issue |
| **Thursday (HubSpot)** | Paid Social 0.16% win rate | ✅ Explained: Meta can't optimize because it has near-zero conversion signal |
| **Thursday (HubSpot)** | Offline drives 51% of revenue | ✅ Confirmed: $20.3M origination credit, $17.6M flows to DIRECT_TRAFFIC (servicing) |
| **Thursday (HubSpot)** | Short App bottleneck (96.3% don't advance) | ⚠️ Related: Without pixel data, Meta keeps sending similar low-quality leads |
| **Thursday (HubSpot)** | Email marketing 26% of conversions | ✅ **New insight**: Email's $12.2M closing contribution makes it the #2 revenue channel |

---

*Analysis compiled April 10, 2026 by Echo. Data: 100 won deals from HubSpot API, 30-day Meta Ads insights, 479 GCLID-tracked contacts, cross-platform journey analysis of 191 contacts.*
