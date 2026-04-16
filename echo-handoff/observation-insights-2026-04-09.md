# Observation Week Insights — Thursday, April 9, 2026
## Focus: HubSpot Conversion Funnel — Lead Quality by Source, Pipeline Velocity, Revenue Attribution

---

## Executive Summary

Analyzed 10,000+ THMC Hard Money Loans pipeline deals from the last 12 months. The data reveals **critical inefficiencies in the conversion funnel** and a stark contrast between lead sources by quality vs. quantity.

### 🔑 The Big Findings

1. **Overall win rate is only 4.6%** (163 won out of 3,576 resolved deals) — massive lead volume but very low conversion
2. **57.6% of all deals are stuck in "Short App" stage** — the single biggest bottleneck in the pipeline
3. **OFFLINE leads convert at 13.0%** (3x the overall rate) and close fastest (avg 27 days) — these are the gold standard
4. **Paid Social (Facebook) generates 64% of volume but only 1.5% win rate** with just 11 wins out of 6,387 deals
5. **Paid Search converts at 4.1%** — nearly 3x better than Paid Social despite 8x fewer leads
6. **Pipeline velocity is healthy at 33 days average** (24 median) when deals actually progress

---

## 1. Conversion Funnel Analysis

### Current Pipeline Snapshot (Last 12 Months)
```
Top of Funnel (Pre-Approval):     6,225 deals (62.3%)  ← MASSIVE accumulation
Application Stage:                   140 deals (1.4%)   ← Severe drop-off
Underwriting:                         40 deals (0.4%)
Approval:                              2 deals (0.0%)
Processing → Close:                   17 deals (0.2%)
Closed Won:                          163 deals (1.6%)
Closed Lost/Denied/Terminated:     3,413 deals (34.1%)
```

### ⚠️ Critical Bottleneck: Short App Stage
- **5,763 deals (57.6%)** sitting in "Short App" — this is the graveyard
- These are likely Facebook lead form submissions that never progressed to a full application
- Only 140 deals have made it to actual application submission
- **The funnel isn't a funnel — it's a cliff after Short App**

### Stage-Level Detail
| Stage | Count | % of Total |
|---|---|---|
| Short App | 5,763 | 57.6% |
| Loan Denied | 1,921 | 19.2% |
| Loan Terminated | 1,343 | 13.4% |
| Pre-Approval Requested | 276 | 2.8% |
| Pre-Approval Letter Approved | 185 | 1.8% |
| Closed Won | 146 | 1.5% |
| Pre-Approval Denied | 144 | 1.4% |
| App Review - Nurture | 68 | 0.7% |
| Application Follow Up | 38 | 0.4% |
| App Review - Priority | 34 | 0.3% |

---

## 2. Lead Source Performance — Quality vs. Quantity

### Source Comparison Table
| Source | Deals | Won | Lost | Win Rate | Won Revenue | Avg Deal $ | Revenue/Deal |
|---|---|---|---|---|---|---|---|
| **OFFLINE** | 682 | 70 | 468 | **13.0%** | **$34.9M** | $692K | $498K/won |
| **PAID_SEARCH** | 757 | 26 | 601 | **4.1%** | $4.5M | $506K | $172K/won |
| **DIRECT_TRAFFIC** | 1,053 | 33 | 829 | **3.8%** | $12.7M | $647K | $384K/won |
| **ORGANIC_SEARCH** | 815 | 21 | 565 | **3.6%** | $3.6M | $503K | $170K/won |
| **AI_REFERRALS** | 69 | 1 | 52 | 1.9% | $195K | $175K | — |
| **OTHER_CAMPAIGNS** | 79 | 1 | 65 | 1.5% | $255K | $480K | — |
| **PAID_SOCIAL** | 6,387 | 11 | 707 | **1.5%** | $12.1M | $208K | $1.1M/won |
| **SOCIAL_MEDIA** | 109 | 0 | 84 | 0.0% | $0 | $289K | — |
| **REFERRALS** | 34 | 0 | 29 | 0.0% | $0 | $580K | — |

### Key Insights by Source:

**🏆 OFFLINE (The Revenue King)**
- 13% win rate — nearly 3x the overall average
- $34.9M in won revenue — **51% of all closed revenue** from just 6.8% of deals
- These are likely referrals, repeat borrowers, and direct relationships
- **Fastest to close:** avg 27 days (median 19)

**💰 DIRECT_TRAFFIC (High-Value Leads)**
- 3.8% win rate with highest average deal size ($647K)
- $12.7M revenue from people who came directly to the site
- Top landing pages: /application (577 deals, 10 won), homepage (206, 11 won), /referral-program (23, 4 won)
- **The referral program page has a 17.4% win rate** — highest of any direct traffic page

**🔍 PAID_SEARCH (Efficient Performer)**
- 4.1% win rate — best of all digital acquisition channels
- Named campaigns performing well: `gs_nb_milwaukee_mixed_pdm` (22 deals, 3 won = 13.6%)
- Campaign 22630491512 (35 deals, 3 won = 8.6%)
- "Auto-tagged PPC" (366 deals, 6 won = 1.6%) — suggests generic/broad campaigns underperform specific ones

**📱 PAID_SOCIAL (Volume Machine, Conversion Problem)**
- 6,387 deals but only 11 wins (1.5% win rate)
- $12.1M in won revenue, but cost efficiency is questionable
- 99.8% from Facebook, <0.2% from Instagram
- These are mostly Short App leads that never progress
- **Revenue per deal created:** $1,891 — compare to OFFLINE at $51,141/deal

**🤖 AI_REFERRALS (Emerging Channel)**
- 69 deals from ChatGPT, Perplexity, Copilot
- Only 1 won so far, but this is a growing channel worth monitoring
- Also showing up in OTHER_CAMPAIGNS (chatgpt.com: 4 deals, perplexity: 1, copilot: 1)

---

## 3. Pipeline Velocity Analysis

### Overall Velocity (Won Deals)
- **163 won deals** analyzed
- **Average: 33 days** to close
- **Median: 24 days** (half close within 3.5 weeks)
- **25th percentile: 14 days** (fast closers)
- **75th percentile: 41 days**
- **Range: 1–201 days**

### Velocity by Source
| Source | Avg Days | Median Days | Won Deals |
|---|---|---|---|
| OFFLINE | **27** | **19** | 70 |
| PAID_SEARCH | 36 | 26 | 26 |
| ORGANIC_SEARCH | 37 | 28 | 21 |
| DIRECT_TRAFFIC | 39 | 23 | 33 |
| PAID_SOCIAL | **40** | **37** | 11 |

**Insight:** OFFLINE leads not only convert best, they close fastest. Paid Social leads that do convert take the longest — 40 days average vs. 27 for OFFLINE.

### Velocity by Deal Size
| Size | Avg Days | Deals |
|---|---|---|
| <$200K | 32 | 103 |
| $200K–$500K | 35 | 37 |
| $500K+ | 32 | 23 |

**Insight:** Deal size doesn't meaningfully affect velocity — surprising. Large deals close just as fast as small ones. This suggests the bottleneck is lead qualification, not deal complexity.

---

## 4. Monthly Trends & Revenue

### Monthly Performance
| Month | Created | Won | Lost | Won Revenue | Conv Rate |
|---|---|---|---|---|---|
| Apr 2026 (partial) | 369 | 0 | 75 | $0 | 0.0% |
| Mar 2026 | 1,214 | 11 | 414 | $8.1M | 0.9% |
| Feb 2026 | 1,952 | 19 | 396 | $5.8M | 1.0% |
| Jan 2026 | 1,659 | 19 | 418 | $4.9M | 1.1% |
| Dec 2025 | 1,320 | 35 | 453 | **$23.1M** | **2.7%** |
| Nov 2025 | 630 | 19 | 379 | $4.1M | 3.0% |
| Oct 2025 | 1,317 | 28 | 492 | $6.8M | 2.1% |
| Sep 2025 | 807 | 18 | 411 | $9.7M | 2.2% |
| Aug 2025 | 732 | 14 | 375 | $5.6M | 1.9% |

### Trend Analysis:
- **December 2025 was exceptional:** $23.1M won revenue, 35 wins — likely year-end rush + seasonal patterns
- **Lead volume surged in Feb 2026** (1,952 deals) — likely coincides with increased Meta ad spend
- **Conversion rates have been declining** as volume increased: Nov 3.0% → Dec 2.7% → Jan 1.1% → Feb 1.0% → Mar 0.9%
- **The inverse relationship between volume and quality is clear** — more Paid Social leads = lower overall conversion

### 2026 YTD
- **5,194 deals created**
- **49 won** ($18.8M revenue)
- **1,303 lost**
- **3,842 still active** (mostly sitting in Short App)
- **72.4% of YTD leads from Paid Social** — dominance is growing

---

## 5. Revenue Attribution

### Revenue by Source (Last 12 Months)
```
OFFLINE:          $34,878,175  (51.2%)  ← Half of all revenue
DIRECT_TRAFFIC:   $12,655,850  (18.6%)
PAID_SOCIAL:      $12,070,950  (17.7%)
PAID_SEARCH:       $4,464,420   (6.6%)
ORGANIC_SEARCH:    $3,569,000   (5.2%)
OTHER_CAMPAIGNS:     $254,600   (0.4%)
AI_REFERRALS:        $195,100   (0.3%)
```

**Total Won Revenue (12mo): ~$68.1M**

### Cost-Efficiency Analysis (Estimated)
Assuming ~$150K/mo total ad spend ($1.8M/year):
- **ROAS on all digital channels:** ~$32.8M won / $1.8M spend = **18.2x ROAS** (but this includes OFFLINE which isn't ad-driven)
- **Digital-only won revenue:** ~$33.2M
- **Pure digital ROAS:** ~18.4x — still strong, but heavily skewed by high-value Direct Traffic deals
- **Paid Social efficiency:** $12.1M won / estimated $90K+/mo = decent ROAS, but 6,387 leads processed for 11 wins means massive operational overhead

---

## 6. Source Detail Deep Dive

### Paid Search Sub-Categories
| Campaign/Term | Deals | Won | Win Rate |
|---|---|---|---|
| Auto-tagged PPC (broad) | 366 | 6 | 1.6% |
| gs_nb_milwaukee_mixed_pdm | 22 | 3 | **13.6%** |
| Campaign 22630491512 | 35 | 3 | 8.6% |
| Campaign {campaign} (template) | 64 | 2 | 3.1% |
| "hard money" keyword | 16 | 1 | 6.3% |
| Campaign 22554457824 | 39 | 1 | 2.6% |
| Campaign 17001017457 | 11 | 2 | **18.2%** |

**Insight:** Named/targeted campaigns dramatically outperform broad PPC. Milwaukee-specific campaigns have the highest win rate.

### Direct Traffic Landing Pages
| Page | Deals | Won | Win Rate |
|---|---|---|---|
| /application | 577 | 10 | 1.7% |
| Homepage / | 206 | 11 | **5.3%** |
| /pre-approval-request | 82 | 0 | 0.0% |
| /referral-program | 23 | 4 | **17.4%** |
| /contact | 25 | 1 | 4.0% |
| /brokers | 13 | 1 | 7.7% |
| milwaukeehardmoney.com | 9 | 1 | 11.1% |

**Insight:** The referral program page converts at **17.4%** — this is the best-performing entry point. Homepage visitors convert 3x better than /application visitors — suggests people who explore the site first are more qualified.

### Paid Social Breakdown
- **Facebook:** 6,361 deals, 11 won (0.17% win rate)
- **Instagram:** 9 deals, 0 won
- **Unknown:** 17 deals, 0 won

---

## 7. Data Quality Issues Identified

1. **State field is empty for ALL deals** — "Unknown" across the board. Geographic analysis impossible without this data.
2. **Loan type field is empty for ALL deals** — can't segment by product.
3. **Source data often shows campaign IDs** (18254749630) instead of human-readable names — makes Google Ads attribution harder.
4. **Pre-approval request page shows 0 wins** (82 deals) — either the leads never convert, or they get re-attributed to another source when they submit the full application.
5. **5,763 deals in Short App with no progression** — are these being worked? Contacted? Or just sitting there?

---

## 8. Strategic Recommendations for Action Week (April 14)

### 🔴 Critical Priority
1. **Audit the Short App → Application conversion process.** 5,763 leads sitting in this stage is either a massive opportunity or a massive waste. What's the follow-up cadence? Is there an automated sequence? Are these leads being called?

2. **Fix the state/loan_type data fields.** Without geographic data, we can't optimize Google Ads geographic targeting. Without loan type, we can't analyze product-level profitability.

### 🟡 High Priority
3. **Double down on OFFLINE lead generation.** 13% win rate, fastest velocity, 51% of revenue. Whatever creates these leads (referrals, events, partnerships, repeat borrowers) — do more of it.

4. **Invest in the referral program.** The /referral-program page converts at 17.4%. Promote this page in Google Ads, post-close emails, and broker communications.

5. **Re-evaluate Paid Social spend efficiency.** 6,387 leads at 1.5% win rate means 6,291 wasted leads. Even if Meta CPL is low, the operational cost of processing these leads through CRM + sales team is significant. Consider:
   - Tighter qualification questions on lead forms
   - Higher-quality audience targeting
   - Reducing volume and increasing lead quality filters

6. **Optimize Paid Search campaigns.** Milwaukee-specific and targeted campaigns outperform by 5-10x. Scale `gs_nb_milwaukee_mixed_pdm` (13.6% win rate) and campaign 17001017457 (18.2% win rate). Reduce spend on broad "auto-tagged PPC" campaigns.

### 🟢 Opportunity
7. **Monitor AI referral channel.** ChatGPT/Perplexity/Copilot sending leads is a new phenomenon. Optimize GEO (Generative Engine Optimization) — ensure THMC appears in AI-generated answers about hard money lending.

8. **Create separate pipeline/nurture for Paid Social leads.** The current single pipeline doesn't account for the massive quality difference between sources. Facebook leads need a different qualification process than direct/organic leads.

9. **Homepage converts 3x better than /application.** Consider redirecting some ad traffic to homepage or creating dedicated landing pages that educate before the application (matching the homepage browsing behavior that correlates with higher conversion).

---

## 9. Key Metrics Dashboard (Proposed)

| Metric | Current Value | Target (Action Week) |
|---|---|---|
| Overall Win Rate | 4.6% | Track weekly |
| Paid Social Win Rate | 1.5% | 2.5% (after qualification changes) |
| Short App → Application Rate | ~2.4% | 5% |
| Average Days to Close | 33 | Maintain <35 |
| Monthly Won Revenue | $6.3M avg | $8M+ |
| OFFLINE as % of Revenue | 51% | Maintain + grow |
| Referral Program Conversion | 17.4% | Scale volume |

---

*Analysis compiled April 9, 2026 by Echo. Data: 10,000 THMC pipeline deals from HubSpot API (April 2025–April 2026). Note: Analysis capped at 10,000 deals; actual total in period is ~13,246.*
