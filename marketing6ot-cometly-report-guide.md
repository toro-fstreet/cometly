# Cometly Report Generator

> ⚠️ **SETUP REQUIRED:** This document contains the placeholder `{OPENCLAW_WORKSPACE}`.
> Replace it with the absolute path to the OpenClaw workspace on the **marketing6ot@gmail.com** installation before running any commands.
> Example: `/Users/[username]/.openclaw/workspace`

## Overview
Automated ad performance reports for The Hard Money Co. (F Street).
Scrapes Meta + Google from Cometly, builds an HTML dashboard, archives to GitHub.

## GitHub
- **Repo:** https://github.com/toro-fstreet/cometly
- **Live archive:** https://toro-fstreet.github.io/cometly/
- **Account:** toro-fstreet (marketing6ot@gmail.com)
- **Token:** stored in TOOLS.md

## Cometly Access
- **Login:** marketing6ot@gmail.com / 1Apple2345!@
- **Login URL:** https://app.cometly.com/
- **No auth flow required** - app does not force login every session
- **Meta URL:** https://app.cometly.com/ad_accounts/fb_3377699796000006
- **Google URL:** https://app.cometly.com/ad_accounts/gg_3377699775000010
- **Column preset:** Mark (persists between sessions — custom columns are off-screen right, NOT reset)
- **Date picker:** `.dp__input_wrap` → click → select preset option
- **Attribution model:** Linear Paid (set before each scrape)
- **Attribution window:** 30 Days (set before each scrape)

> These must be set programmatically on every scrape run — Cometly does not persist them per session for the bot account.

## Column Mappings (Mark preset)
| col-id | Meaning |
|---|---|
| amount_spent | Spend |
| custom_event_1 | Loan Application Submitted |
| m_avg_application_score | Avg Application Score |
| custom_event_21_amount | Total Expected Value ($) |
| custom_event_21 | Application Expected Value (count) |
| m_avg_expected_value | Avg Expected Value |
| custom_event_3 | Closed Won (count) |
| custom_event_3_amount | Closed Won Value ($) |
| custom_event_22 | Personal or Business Loan (disqualifier) |

**ROAS = custom_event_21_amount ÷ amount_spent**
**Cost/App = amount_spent ÷ custom_event_1**

> Note: Prelim (custom_event_2) is excluded from dashboard — not useful at ad set level.

## Scripts
| Script | Purpose |
|---|---|
| `cometly-scrape.js [days]` | Scrape Cometly → `/tmp/cometly-raw.json` |
| `cometly-build-dashboard.js` | Build HTML from raw JSON → `/tmp/thmc-deploy/index.html` |

## Run a Report (step by step)
```bash
cd {OPENCLAW_WORKSPACE}

# 1. Scrape (default 14 days)
node cometly-scrape.js 14

# 2. Build dashboard
node cometly-build-dashboard.js

# 3. Push to GitHub
DATE=$(date +%Y-%m-%d)
cd /tmp/cometly-repo
git pull origin main
mkdir -p reports/$DATE
cp /tmp/thmc-deploy/index.html reports/$DATE/index.html
cp /tmp/cometly-raw.json reports/$DATE/data.json
# append to history.csv manually or via script
git add .
git commit -m "Report $DATE (14 days)"
git push origin main
```

## Trigger Phrase
When Peter says **"Cometly report [X] days"** in #Marketing, run the full pipeline immediately — no clarifying questions:
1. `node cometly-scrape.js [X]`
2. `node cometly-build-dashboard.js`
3. Push to GitHub:
   - For 7-day: `reports/YYYY-MM-DD/`
   - For 14-day: `reports/YYYY-MM-DD-14d/`
   - For other: `reports/YYYY-MM-DD-{N}d/`
4. Reply in #Marketing with the GitHub Pages link only

Default to 14 days if no number specified. Do not summarize data in Slack.

## Dashboard Features (current)
- **View:** Ad set level (Meta) / Ad group level (Google) — NOT campaigns
- **Rows:** Only rows with spend, apps, EV, score, or closed won are shown — zero-data rows hidden
- **Sort:** Descending by loan apps
- **Columns:** Daily Budget (if available), Spent, Apps, Cost/App, Avg Score, Avg EV, Total EV, ROAS
- **Header:** Cometly Meta + Cometly Google quick-access buttons
- **Prelim column:** Removed

## Cron Job
- **ID:** `fa980c11-d6b2-4581-ae28-ed99d1a67d86`
- **Schedule:** Mon–Fri 8am CT
- **Prompt file:** `{OPENCLAW_WORKSPACE}/cron-prompt-cometly.txt`
- **Output:** Posts 14-day report link to #Marketing (C02KS1E7NAJ)

## Output Rules
- All outputs → **#Marketing** (C02KS1E7NAJ) only. Never cross-post anywhere else unless explicitly directed by Peter in that session.
- **In Slack:** Post the GitHub Pages link only. No data, no insights, no summaries in chat.
- **In the HTML dashboard:** Full report — tables, assessments, insights, recommendations.
- **Surge.sh is retired.** Do not deploy to thmc-dashboard-fstreet.surge.sh or any surge domain. GitHub Pages only.
- **Contact ad attribution lookups:** Output to #Marketing only. Never post to any other channel.
- **Slack formatting:** No markdown tables — they do not render. Use linearized inline format: *Date* — Platform / Campaign / Ad Set / Ad → Outcome

## Report Archive Structure
```
reports/
  YYYY-MM-DD/          — 7-day report
  YYYY-MM-DD-14d/      — 14-day report
  YYYY-MM-DD-{N}d/     — other timeframes
    index.html         — full HTML dashboard
    data.json          — raw Cometly data
  history.csv          — one row per run (spend, apps, EV, ROAS)
index.html             — report browser (auto-reads history.csv)
```

## Slack Output (per report run)
Post to #Marketing:
- Link to GitHub Pages dashboard only

**No summary text. No data breakdowns. Link only.**