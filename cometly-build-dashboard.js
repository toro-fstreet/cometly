/**
 * Build THMC Ad Performance Dashboard from Cometly scraped data
 * Input: /tmp/cometly-raw.json
 * Output: /tmp/thmc-deploy/index.html
 */

const fs = require('fs');
const path = require('path');

const raw = JSON.parse(fs.readFileSync('/tmp/cometly-raw.json', 'utf8'));
const DATE_RANGE = raw.dateRange || 'Last 14 Days';
const SCRAPE_TIME = new Date(raw.scrapeTime || Date.now());

// Calculate date range label
const today = new Date();
const daysMap = { 'Last 7 Days': 7, 'Last 14 Days': 14, 'Last 30 Days': 30 };
const days = daysMap[DATE_RANGE] || 14;
const start = new Date(today); start.setDate(today.getDate() - days);
const dateLabel = `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${today.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, ${today.getFullYear()}`;

function parseNum(str) {
 if (!str || str === '-' || str === '' || str === '$0.00' || str === '0') return 0;
 return parseFloat(String(str).replace(/[$,]/g, '')) || 0;
}

function fmtDollar(n) {
 if (!n || n === 0) return '$0';
 if (n >= 1000000) return `$${(n/1000000).toFixed(1)}M`;
 if (n >= 1000) return `$${(n/1000).toFixed(1)}K`;
 return `$${n.toFixed(1)}`;
}

function fmtScore(n) {
 if (!n || n === 0) return '—';
 return parseFloat(n).toFixed(1);
}

function fmtROAS(spent, ev) {
 if (!spent || spent === 0) return '—';
 const r = ev / spent;
 return r > 0 ? `${r.toFixed(1)}x` : '—';
}

function roasClass(spent, ev) {
 if (!spent || spent === 0) return 'dash';
 const r = ev / spent;
 if (r >= 20) return 'roas-high';
 if (r >= 5) return 'roas-mid';
 return 'roas-low';
}

function scoreClass(n) {
 if (!n || n === 0) return 'dash';
 if (n >= 70) return 'score-high';
 if (n >= 50) return 'score-mid';
 return 'score-low';
}

function deliveryBadge(d) {
 if (!d) return '<span class="badge-paused">Paused</span>';
 if (d.toLowerCase().includes('active')) return '<span class="badge-active">Active</span>';
 return `<span class="badge-paused">${d}</span>`;
}

function parseBudget(str) {
 if (!str || str === '-' || str === '' || str.toLowerCase().includes('adset') || str.toLowerCase().includes('using')) return null;
 const n = parseFloat(String(str).replace(/[$,]/g, ''));
 return isNaN(n) ? null : n;
}

function hasData(cells) {
 // A row has data if it has any spend, apps, EV, score, or closed won
 const spent = parseNum(cells.amount_spent);
 const apps = parseNum(cells.custom_event_1);
 const ev = parseNum(cells.custom_event_21_amount);
 const score = parseNum(cells.m_avg_application_score);
 const closed = parseNum(cells.custom_event_3);
 return spent > 0 || apps > 0 || ev > 0 || score > 0 || closed > 0;
}

function processRows(rows) {
 return rows
 .filter(r => r.cells.name && r.cells.name !== 'Totals' && hasData(r.cells))
 .map(r => {
 const c = r.cells;
 const spent = parseNum(c.amount_spent);
 const ev = parseNum(c.custom_event_21_amount);
 const apps = parseNum(c.custom_event_1);
 const score = parseNum(c.m_avg_application_score);
 const closedWon = parseNum(c.custom_event_3);
 const closedWonVal = parseNum(c.custom_event_3_amount);
 const pbLoan = parseNum(c.custom_event_22);
 const avgEv = parseNum(c.m_avg_expected_value);
 const impressions = parseNum(c.impressions);
 const cpm = parseNum(c.cpm);
 const clicks = parseNum(c.clicks);
 const ctr = c.ctr ? parseFloat(c.ctr) : 0;
 const roas = spent > 0 ? ev / spent : 0;
 const cpa = apps > 0 && spent > 0 ? spent / apps : null;
 const platformUrl = c._platform_url || null;
 const budget = parseBudget(c.budget);
 return { name: c.name, delivery: c.delivery || '', spent, ev, apps, score, closedWon, closedWonVal, pbLoan, avgEv, impressions, cpm, clicks, ctr, roas, cpa, platformUrl, budget };
 });
}

function totalsRow(rows) {
 const totalSpent = rows.reduce((s, r) => s + r.spent, 0);
 const totalEv = rows.reduce((s, r) => s + r.ev, 0);
 const totalApps = rows.reduce((s, r) => s + r.apps, 0);
 const totalClosed = rows.reduce((s, r) => s + r.closedWon, 0);
 const totalClosedVal = rows.reduce((s, r) => s + r.closedWonVal, 0);
 const totalBudget = rows.reduce((s, r) => s + (r.budget || 0), 0);
 const hasBudget = rows.some(r => r.budget !== null);
 const avgScore = rows.filter(r => r.apps > 0).length > 0
 ? rows.reduce((s, r) => s + (r.score * r.apps), 0) / rows.reduce((s, r) => s + r.apps, 0)
 : 0;
 const blendedROAS = totalSpent > 0 ? totalEv / totalSpent : 0;
 return { totalSpent, totalEv, totalApps, totalClosed, totalClosedVal, totalBudget, hasBudget, avgScore, blendedROAS };
}

// Campaigns with known data anomalies — flagged manually
const DATA_FLAGS = {};

function campaignTableRows(rows, showBudget) {
 // Sort by loan apps descending
 rows = [...rows].sort((a, b) => b.apps - a.apps);
 return rows.map(r => {
 const activeRows = r.delivery && r.delivery.toLowerCase().includes('active');
 const rowClass = activeRows ? '' : 'row-paused';
 const flag = DATA_FLAGS[r.name];
 const evStr = r.ev > 0
 ? `${fmtDollar(r.ev)}${flag ? ' <span class="data-flag" title="' + flag + '">⚠️</span>' : ''}`
 : '—';
 const spentStr = r.spent > 0 ? `$${r.spent.toLocaleString('en-US', {minimumFractionDigits: 1, maximumFractionDigits: 1})}` : '—';
 const budgetStr = r.budget !== null ? `$${r.budget.toLocaleString('en-US', {minimumFractionDigits: 1, maximumFractionDigits: 1})}/day` : '—';
 const nameCell = r.platformUrl
 ? `<a href="${r.platformUrl}" target="_blank" rel="noopener" title="Open in ${r.platformUrl.includes('facebook') ? 'Meta Ads Manager' : 'Google Ads'}">${r.name} ↗</a>`
 : r.name;
 const flagNote = flag ? `<div class="flag-note">${flag}</div>` : '';
 const budgetCell = showBudget ? `<td class="num">${budgetStr}</td>` : '';
 const cpaStr = r.cpa !== null ? `$${r.cpa.toLocaleString('en-US', {minimumFractionDigits: 1, maximumFractionDigits: 1})}` : '—';
 return `<tr class="${rowClass}${flag ? ' row-flagged' : ''}">
 <td>${nameCell}${flagNote}</td>
 <td>${deliveryBadge(r.delivery)}</td>
 ${budgetCell}
 <td class="num">${spentStr}</td>
 <td class="num">${r.apps > 0 ? r.apps : '—'}</td>
 <td class="num">${cpaStr}</td>
 <td class="num"><span class="${scoreClass(r.score)}">${fmtScore(r.score)}</span></td>
 <td class="num">${r.avgEv > 0 ? fmtDollar(r.avgEv) : '—'}</td>
 <td class="num">${evStr}</td>
 <td class="num"><span class="${roasClass(r.spent, r.ev)}">${fmtROAS(r.spent, r.ev)}</span></td>
 </tr>`;
 }).join('\n');
}

// Use adsets if available (1 ad per adset = same granularity, correct level)
// Fall back to ads if adsets missing (older scraped files)
const metaRows = processRows((raw.meta.adsets && raw.meta.adsets.rows.length > 1 ? raw.meta.adsets : raw.meta.ads).rows);
const googleRows = processRows((raw.google.adsets && raw.google.adsets.rows.length > 1 ? raw.google.adsets : raw.google.ads).rows);

const metaActiveRows = metaRows.filter(r => r.spent > 0 || r.apps > 0);
const googleActiveRows = googleRows.filter(r => r.spent > 0 || r.apps > 0);
const metaTotals = totalsRow(metaActiveRows);
const googleTotals = totalsRow(googleActiveRows);
const metaShowBudget = metaRows.some(r => r.budget !== null);
const googleShowBudget = googleRows.some(r => r.budget !== null);
const grandTotals = {
 totalSpent: metaTotals.totalSpent + googleTotals.totalSpent,
 totalEv: metaTotals.totalEv + googleTotals.totalEv,
 totalApps: metaTotals.totalApps + googleTotals.totalApps,
 totalClosed: metaTotals.totalClosed + googleTotals.totalClosed,
 blendedROAS: (metaTotals.totalSpent + googleTotals.totalSpent) > 0
 ? (metaTotals.totalEv + googleTotals.totalEv) / (metaTotals.totalSpent + googleTotals.totalSpent) : 0,
};

// Find top performers
const allActive = [...metaRows.filter(r => r.delivery && r.delivery.toLowerCase().includes('active') && r.spent > 0),
 ...googleRows.filter(r => r.delivery && r.delivery.toLowerCase().includes('active') && r.spent > 0)];
allActive.sort((a, b) => b.roas - a.roas);
const topPerformer = allActive[0];
const worstPerformer = [...allActive].sort((a, b) => a.roas - b.roas)[0];

// ── ASSESSMENT ENGINE ──────────────────────────────────────────────────────────

function shortName(name) {
 // Strip date suffix and THMC_ prefix for readability
 return name.replace(/^THMC_(Meta|Google)_/i, '').replace(/_\d{8}.*/, '').replace(/_/g, ' ').trim();
}

function generateInsights(metaRows, googleRows, metaTotals, googleTotals, grandTotals) {
 const insights = [];
 const allWithApps = [...metaRows, ...googleRows].filter(r => r.apps > 0);
 const allActiveSpend = allActive;

 // 1. EV concentration
 const topEvRow = [...metaRows, ...googleRows].filter(r => r.ev > 0).sort((a,b) => b.ev - a.ev)[0];
 if (topEvRow) {
 const pct = ((topEvRow.ev / grandTotals.totalEv) * 100).toFixed(1);
 const hasFlag = DATA_FLAGS && DATA_FLAGS[topEvRow.name];
 const flagNote = hasFlag ? ' Note: this campaign contains a known data anomaly — EV is flagged as approximately $700K overstated.' : '';
 insights.push(`${pct}% of total expected value is concentrated in one ad — ${topEvRow.name} at $${topEvRow.ev.toLocaleString('en-US',{minimumFractionDigits:1,maximumFractionDigits:1})}.${flagNote}`);
 }

 // 2. Google vs Meta spend/return split
 const googleSpendPct = ((googleTotals.totalSpent / grandTotals.totalSpent) * 100).toFixed(1);
 const googleEvPct = ((googleTotals.totalEv / grandTotals.totalEv) * 100).toFixed(1);
 const metaEvPct = ((metaTotals.totalEv / grandTotals.totalEv) * 100).toFixed(1);
 insights.push(`Google accounts for ${googleSpendPct}% of spend but only ${googleEvPct}% of expected value. Meta is generating ${metaEvPct}% of EV on ${(100 - parseFloat(googleSpendPct)).toFixed(1)}% of budget — a meaningful efficiency gap between channels.`);

 // 3. App quality — score spread
 const highScoreRows = allWithApps.filter(r => r.score >= 70);
 const lowScoreRows = allWithApps.filter(r => r.score > 0 && r.score < 50);
 if (highScoreRows.length > 0 && lowScoreRows.length > 0) {
 insights.push(`Application quality is split. ${highScoreRows.length} ${highScoreRows.length === 1 ? "ad" : "ads"} averaging scores above 70 — ${highScoreRows.map(r => r.name).join(', ')} — while ${lowScoreRows.length} active ${lowScoreRows.length === 1 ? "ad is" : "ads are"} pulling the average down below 50.`);
 } else if (highScoreRows.length > 0) {
 insights.push(`Application quality is solid. ${highScoreRows.length} ${highScoreRows.length === 1 ? "ad" : "ads"} averaging score 70 or above: ${highScoreRows.map(r => r.name).join(', ')}.`);
 }

 // 4. Zero-pipeline active spend
 const zeroPipelineActive = allActiveSpend.filter(r => r.apps === 0);
 if (zeroPipelineActive.length > 0) {
 const wastedSpend = zeroPipelineActive.reduce((s,r) => s+r.spent, 0);
 const plural = zeroPipelineActive.length === 1;
 insights.push(`${zeroPipelineActive.length} active ${plural ? "ad" : "ads"} produced zero loan applications while spending $${wastedSpend.toLocaleString('en-US',{minimumFractionDigits:1,maximumFractionDigits:1})} over this period: ${zeroPipelineActive.map(r=>r.name).join(', ')}.`);
 }

 // 5. Cost per app comparison
 const metaCPA = metaTotals.totalApps > 0 ? metaTotals.totalSpent / metaTotals.totalApps : 0;
 const googleCPA = googleTotals.totalApps > 0 ? googleTotals.totalSpent / googleTotals.totalApps : 0;
 if (metaCPA > 0 && googleCPA > 0) {
 const cheaper = metaCPA < googleCPA ? 'Meta' : 'Google';
 const ratio = (Math.max(metaCPA, googleCPA) / Math.min(metaCPA, googleCPA)).toFixed(1);
 insights.push(`Cost per application is $${metaCPA.toFixed(1)} on Meta versus $${googleCPA.toFixed(1)} on Google. ${cheaper} is acquiring applications at ${ratio}x lower cost.`);
 }

 return insights.slice(0, 5);
}

function generateRecommendations(metaRows, googleRows, grandTotals, metaTotals, googleTotals) {
 const recs = [];

 const allRows = [
 ...metaRows.map(r => ({...r, channel:'Meta'})),
 ...googleRows.map(r => ({...r, channel:'Google'}))
 ];
 const active = allRows.filter(r => r.delivery && r.delivery.toLowerCase().includes('active') && r.spent > 0);
 const byRoas = [...active].sort((a,b) => b.roas - a.roas);

 // ── KILL: Active, spending, zero apps ─────────────────────────────────────
 // These are the clearest waste — spending budget, generating nothing
 const zeroAppActive = active.filter(r => r.apps === 0);
 zeroAppActive.sort((a,b) => b.spent - a.spent); // worst offenders first
 zeroAppActive.forEach(r => {
 if (recs.length >= 8) return;
 recs.push({
 tag: 'KILL', tagClass: 'rec-kill',
 title: `Kill ${r.name} (${r.channel})`,
 body: `<strong>$${r.spent.toLocaleString('en-US',{minimumFractionDigits:1,maximumFractionDigits:1})} spent — 0 loan apps, 0 EV.</strong> This ad is burning budget with no pipeline signal. Pause immediately and reallocate.`
 });
 });

 // ── UNDERPERFORM: Active, has apps but terrible ROAS and low score ─────────
 const underperformers = active.filter(r => r.apps > 0 && r.roas > 0 && r.roas < 3 && r.score < 55 && r.spent > 300);
 underperformers.sort((a,b) => a.roas - b.roas);
 underperformers.forEach(r => {
 if (recs.length >= 8) return;
 const cpa = r.spent > 0 && r.apps > 0 ? (r.spent / r.apps).toFixed(1) : '—';
 recs.push({
 tag: 'PAUSE', tagClass: 'rec-down',
 title: `Pause ${r.name} (${r.channel})`,
 body: `<strong>${r.roas.toFixed(1)}x ROAS, score ${r.score > 0 ? r.score.toFixed(1) : '—'}, ${r.apps} app(s) at $${cpa}/app.</strong> Low quality leads and poor return. Pause and monitor — if no improvement in 7 days, kill.`
 });
 });

 // ── SCALE: Top ROAS performers ─────────────────────────────────────────────
 const topPerformers = byRoas.filter(r => r.roas >= 10 && r.apps >= 2);
 topPerformers.forEach(r => {
 if (recs.length >= 8) return;
 recs.push({
 tag: 'SCALE', tagClass: 'rec-up',
 title: `Scale ${r.name} (${r.channel})`,
 body: `<strong>${r.roas.toFixed(1)}x ROAS — ${r.apps} apps, score ${r.score > 0 ? r.score.toFixed(1) : '—'}, $${r.ev.toLocaleString('en-US',{minimumFractionDigits:1,maximumFractionDigits:1})} EV on $${r.spent.toLocaleString('en-US',{minimumFractionDigits:1,maximumFractionDigits:1})} spend.</strong> Increase daily budget by up to 20%. This is the best-performing ad this period.`
 });
 });

 // ── WATCH: Active, some apps but mediocre score — monitor not kill yet ─────
 const watchList = active.filter(r => r.apps > 0 && r.score >= 45 && r.score < 60 && r.roas > 0 && r.roas < 5 && r.spent > 200);
 watchList.sort((a,b) => b.spent - a.spent);
 watchList.forEach(r => {
 if (recs.length >= 8) return;
 const cpa = r.spent > 0 && r.apps > 0 ? (r.spent / r.apps).toFixed(1) : '—';
 recs.push({
 tag: 'WATCH', tagClass: 'rec-watch',
 title: `Watch ${r.name} (${r.channel})`,
 body: `<strong>${r.apps} apps at score ${r.score.toFixed(1)}, $${cpa}/app, ${r.roas.toFixed(1)}x ROAS.</strong> Application volume is present but quality and return are borderline. Hold budget steady — if score drops below 45 or apps stall, pause.`
 });
 });

 // ── REBALANCE: Google heavy, Meta outperforming ────────────────────────────
 if (recs.length < 8) {
 const googleSpend = googleRows.reduce((s,r)=>s+r.spent,0);
 const googleSpendPct = grandTotals.totalSpent > 0 ? (googleSpend / grandTotals.totalSpent * 100) : 0;
 const googleRoas = googleTotals ? googleTotals.blendedROAS : 0;
 const metaRoas = metaTotals ? metaTotals.blendedROAS : 0;
 if (googleSpendPct > 55 && metaRoas > googleRoas * 1.5) {
 recs.push({
 tag: 'REBALANCE', tagClass: 'rec-creative',
 title: `Shift budget from Google → Meta`,
 body: `<strong>Google is ${googleSpendPct.toFixed(1)}% of spend at ${googleRoas.toFixed(1)}x ROAS. Meta is returning ${metaRoas.toFixed(1)}x ROAS.</strong> Shift 10–15% of Google budget to top Meta ads.`
 });
 }
 }

 return recs.slice(0, 8);
}

const insights = generateInsights(metaRows, googleRows, metaTotals, googleTotals, grandTotals);
const recommendations = generateRecommendations(metaRows, googleRows, grandTotals, metaTotals, googleTotals);

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>THMC Ad Performance — ${DATE_RANGE}</title>
<style>
 * { box-sizing: border-box; margin: 0; padding: 0; }
 body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f4f5f7; color: #1a1a2e; }

 header { background: #1a1a2e; color: white; padding: 20px 32px; display: flex; justify-content: space-between; align-items: center; }
 header h1 { font-size: 20px; font-weight: 700; }
 header .meta { font-size: 12px; color: #8892a4; margin-top: 3px; }
 .badge { color: white; font-size: 10px; font-weight: 700; padding: 3px 8px; border-radius: 20px; }
 .badge-meta { background: #1877f2; }
 .badge-google { background: #ea4335; }

 .container { max-width: 1500px; margin: 0 auto; padding: 24px 32px; }

 /* KPI row */
 .kpi-row { display: grid; grid-template-columns: repeat(5, 1fr); gap: 14px; margin-bottom: 24px; }
 .kpi { background: white; border-radius: 10px; padding: 14px 16px; border-left: 4px solid #1a1a2e; box-shadow: 0 1px 4px rgba(0,0,0,0.06); }
 .kpi.green { border-left-color: #2dc653; }
 .kpi.blue { border-left-color: #457b9d; }
 .kpi.yellow { border-left-color: #f4a261; }
 .kpi.red { border-left-color: #e63946; }
 .kpi label { font-size: 10px; font-weight: 700; color: #8892a4; text-transform: uppercase; letter-spacing: 0.6px; display: block; margin-bottom: 5px; }
 .kpi .value { font-size: 22px; font-weight: 700; }
 .kpi .sub { font-size: 10px; color: #8892a4; margin-top: 2px; }

 .section-header { display: flex; align-items: center; gap: 12px; margin: 28px 0 14px; }
 .section-header h2 { font-size: 16px; font-weight: 700; }
 .ch-badge { padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; }
 .ch-meta { background: #e8f0fe; color: #1877f2; }
 .ch-google { background: #fce8e6; color: #ea4335; }

 .table-wrap { background: white; border-radius: 10px; box-shadow: 0 1px 4px rgba(0,0,0,0.06); overflow: auto; margin-bottom: 20px; }
 table { width: 100%; border-collapse: collapse; font-size: 12px; min-width: 900px; }
 thead th { background: #f8f9fb; padding: 10px 12px; font-size: 10px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; white-space: nowrap; border-bottom: 2px solid #eaedf0; text-align: right; }
 thead th:first-child, thead th:nth-child(2) { text-align: left; }
 tbody tr { border-bottom: 1px solid #f0f2f5; }
 tbody tr:last-child { border-bottom: none; }
 tbody tr:hover { background: #fafbfc; }
 tbody td { padding: 9px 12px; vertical-align: middle; }
 tbody td.num { text-align: right; }
 tbody td:first-child { font-weight: 600; color: #1a1a2e; max-width: 280px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
 tbody td:first-child a { color: #1a1a2e; text-decoration: none; font-weight: 600; }
 tbody td:first-child a:hover { color: #457b9d; text-decoration: underline; }
 tbody tr.row-paused td { color: #9ca3af; }
 tbody tr.row-paused td:first-child { color: #9ca3af; }
 tbody tr.row-flagged { background: #fffbeb; }
 .flag-note { font-size: 10px; color: #92400e; font-weight: 500; margin-top: 3px; }
 .data-flag { cursor: help; }
 tfoot tr { border-top: 2px solid #eaedf0; background: #f8f9fb; }
 tfoot td { padding: 9px 12px; font-weight: 700; font-size: 11px; text-align: right; }
 tfoot td:first-child, tfoot td:nth-child(2) { text-align: left; }

 .score-high { color: #2dc653; font-weight: 700; }
 .score-mid { color: #f4a261; font-weight: 700; }
 .score-low { color: #e63946; font-weight: 700; }
 .roas-high { color: #2dc653; font-weight: 700; }
 .roas-mid { color: #f4a261; font-weight: 700; }
 .roas-low { color: #e63946; font-weight: 700; }
 .dash { color: #d1d5db; }

 .badge-active { background: #d4edda; color: #155724; font-size: 10px; padding: 2px 7px; border-radius: 10px; font-weight: 600; }
 .badge-paused { background: #f0f2f5; color: #9ca3af; font-size: 10px; padding: 2px 7px; border-radius: 10px; font-weight: 600; }

 /* Summary cards */
 .summary-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }
 .summary-card { background: white; border-radius: 10px; padding: 18px 20px; box-shadow: 0 1px 4px rgba(0,0,0,0.06); }
 .summary-card h3 { font-size: 12px; font-weight: 700; color: #8892a4; text-transform: uppercase; letter-spacing: 0.6px; margin-bottom: 12px; }
 .summary-item { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #f0f2f5; font-size: 12px; }
 .summary-item:last-child { border-bottom: none; }
 .summary-item .label { color: #4b5563; }
 .summary-item .val { font-weight: 600; }

 /* Assessment section */
 .assessment-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 32px; align-items: start; }
 .assessment-card { background: white; border-radius: 10px; box-shadow: 0 1px 4px rgba(0,0,0,0.06); overflow: hidden; }
 .assessment-header { display: flex; align-items: center; gap: 10px; padding: 14px 20px; border-bottom: 1px solid #eaedf0; }
 .insights-header { background: #f0fdf4; }
 .recs-header { background: #fef9f0; }
 .assessment-icon { font-size: 18px; }
 .assessment-title { font-size: 13px; font-weight: 700; color: #1a1a2e; }
 .assessment-list { list-style: none; padding: 0; counter-reset: insight-counter; }
 .assessment-list li { counter-increment: insight-counter; display: flex; gap: 12px; padding: 13px 20px; border-bottom: 1px solid #f0f2f5; font-size: 12px; line-height: 1.6; color: #374151; }
 .assessment-list li:last-child { border-bottom: none; }
 .assessment-list li::before { content: counter(insight-counter); background: #e8f5e9; color: #2dc653; font-weight: 700; font-size: 10px; min-width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px; }
 .rec-list { padding: 0; }
 .rec-item { display: flex; gap: 12px; padding: 13px 20px; border-bottom: 1px solid #f0f2f5; align-items: flex-start; }
 .rec-item:last-child { border-bottom: none; }
 .rec-tag { font-size: 9px; font-weight: 700; padding: 3px 7px; border-radius: 4px; white-space: nowrap; flex-shrink: 0; margin-top: 2px; text-transform: uppercase; letter-spacing: 0.5px; }
 .rec-up { background: #d4edda; color: #155724; }
 .rec-down { background: #fff3cd; color: #856404; }
 .rec-kill { background: #f8d7da; color: #721c24; }
 .rec-creative { background: #d0e8f5; color: #0c5a8a; }
 .rec-watch { background: #ede9fe; color: #5b21b6; }
 .rec-body { font-size: 12px; line-height: 1.6; color: #374151; }
 .rec-body strong { display: block; font-weight: 700; color: #1a1a2e; margin-bottom: 2px; }

 footer { text-align: center; padding: 20px; font-size: 10px; color: #bdc3c7; }
</style>
</head>
<body>

<header>
 <div>
 <h1>The Hard Money Co. — Ad Performance Dashboard</h1>
 <div class="meta">${DATE_RANGE} &nbsp;·&nbsp; ${dateLabel} &nbsp;·&nbsp; Attribution: Last Touch LTV &nbsp;·&nbsp; Source: Cometly &nbsp;·&nbsp; Generated ${SCRAPE_TIME.toLocaleString('en-US', { timeZone: 'America/Chicago', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short' })}</div>
 </div>
 <div style="display:flex;gap:10px;align-items:center">
 <a href="https://app.cometly.com/ad_accounts/fb_3377699796000006" target="_blank" rel="noopener" style="background:#1877f2;color:white;font-size:11px;font-weight:700;padding:6px 14px;border-radius:6px;text-decoration:none;">📘 Cometly Meta</a>
 <a href="https://app.cometly.com/ad_accounts/gg_3377699775000010" target="_blank" rel="noopener" style="background:#ea4335;color:white;font-size:11px;font-weight:700;padding:6px 14px;border-radius:6px;text-decoration:none;">🔴 Cometly Google</a>
 </div>
</header>

<div class="container">

 <!-- ===== COMBINED KPIs ===== -->
 <div class="kpi-row" style="margin-top:24px">
 <div class="kpi blue"><label>Total Spend</label><div class="value">${fmtDollar(grandTotals.totalSpent)}</div><div class="sub">Meta + Google</div></div>
 <div class="kpi green"><label>Loan Apps</label><div class="value">${grandTotals.totalApps}</div><div class="sub">Submitted</div></div>
 <div class="kpi green"><label>Total Expected Value</label><div class="value">${fmtDollar(grandTotals.totalEv)}</div><div class="sub">custom_event_21</div></div>
 <div class="kpi yellow"><label>Blended ROAS</label><div class="value">${grandTotals.blendedROAS > 0 ? grandTotals.blendedROAS.toFixed(1) + 'x' : '—'}</div><div class="sub">EV ÷ Spend</div></div>
 <div class="kpi"><label>Closed Won</label><div class="value">${grandTotals.totalClosed || '—'}</div><div class="sub">All channels</div></div>
 </div>

 <!-- ===== META ===== -->
 <div class="section-header">
 <h2>Meta (Facebook/Instagram)</h2>
 <span class="ch-badge ch-meta">📘 META ADS</span>
 </div>

 <div class="kpi-row">
 <div class="kpi blue"><label>Meta Spend</label><div class="value">${fmtDollar(metaTotals.totalSpent)}</div></div>
 <div class="kpi green"><label>Loan Apps</label><div class="value">${metaTotals.totalApps}</div></div>
 <div class="kpi green"><label>Total EV</label><div class="value">${fmtDollar(metaTotals.totalEv)}</div></div>
 <div class="kpi yellow"><label>Blended ROAS</label><div class="value">${metaTotals.blendedROAS > 0 ? metaTotals.blendedROAS.toFixed(1) + 'x' : '—'}</div></div>
 ${metaShowBudget ? `<div class="kpi"><label>Daily Budget</label><div class="value">${fmtDollar(metaTotals.totalBudget)}</div><div class="sub">/day total</div></div>` : ''}
 </div>

 <div class="table-wrap">
 <table>
 <thead>
 <tr>
 <th>Ad</th>
 <th>Status</th>
 ${metaShowBudget ? '<th>Daily Budget</th>' : ''}
 <th>Spent</th>
 <th>Apps</th>
 <th>Cost/App</th>
 <th>Avg Score</th>
 <th>Avg EV</th>
 <th>Total EV</th>
 <th>ROAS</th>
 </tr>
 </thead>
 <tbody>
 ${campaignTableRows(metaRows, metaShowBudget)}
 </tbody>
 <tfoot>
 <tr>
 <td colspan="2">Totals</td>
 ${metaShowBudget ? `<td class="num">$${metaTotals.totalBudget.toLocaleString('en-US', {minimumFractionDigits: 1, maximumFractionDigits: 1})}/day</td>` : ''}
 <td class="num">$${metaTotals.totalSpent.toLocaleString('en-US', {minimumFractionDigits: 1, maximumFractionDigits: 1})}</td>
 <td class="num">${metaTotals.totalApps || '—'}</td>
 <td class="num">${metaTotals.totalApps > 0 ? '$' + (metaTotals.totalSpent / metaTotals.totalApps).toLocaleString('en-US', {minimumFractionDigits: 1, maximumFractionDigits: 1}) : '—'}</td>
 <td class="num"><span class="${scoreClass(metaTotals.avgScore)}">${fmtScore(metaTotals.avgScore)}</span></td>
 <td class="num">—</td>
 <td class="num">${fmtDollar(metaTotals.totalEv)}</td>
 <td class="num"><span class="${roasClass(metaTotals.totalSpent, metaTotals.totalEv)}">${fmtROAS(metaTotals.totalSpent, metaTotals.totalEv)}</span></td>
 </tr>
 </tfoot>
 </table>
 </div>

 <!-- ===== GOOGLE ===== -->
 <div class="section-header">
 <h2>Google</h2>
 <span class="ch-badge ch-google">🔴 GOOGLE ADS</span>
 </div>

 <div class="kpi-row">
 <div class="kpi blue"><label>Google Spend</label><div class="value">${fmtDollar(googleTotals.totalSpent)}</div></div>
 <div class="kpi green"><label>Loan Apps</label><div class="value">${googleTotals.totalApps}</div></div>
 <div class="kpi green"><label>Total EV</label><div class="value">${fmtDollar(googleTotals.totalEv)}</div></div>
 <div class="kpi yellow"><label>Blended ROAS</label><div class="value">${googleTotals.blendedROAS > 0 ? googleTotals.blendedROAS.toFixed(1) + 'x' : '—'}</div></div>
 ${googleShowBudget ? `<div class="kpi"><label>Daily Budget</label><div class="value">${fmtDollar(googleTotals.totalBudget)}</div><div class="sub">/day total</div></div>` : ''}
 </div>

 <div class="table-wrap">
 <table>
 <thead>
 <tr>
 <th>Ad</th>
 <th>Status</th>
 ${googleShowBudget ? '<th>Daily Budget</th>' : ''}
 <th>Spent</th>
 <th>Apps</th>
 <th>Cost/App</th>
 <th>Avg Score</th>
 <th>Avg EV</th>
 <th>Total EV</th>
 <th>ROAS</th>
 </tr>
 </thead>
 <tbody>
 ${campaignTableRows(googleRows, googleShowBudget)}
 </tbody>
 <tfoot>
 <tr>
 <td colspan="2">Totals</td>
 ${googleShowBudget ? `<td class="num">$${googleTotals.totalBudget.toLocaleString('en-US', {minimumFractionDigits: 1, maximumFractionDigits: 1})}/day</td>` : ''}
 <td class="num">$${googleTotals.totalSpent.toLocaleString('en-US', {minimumFractionDigits: 1, maximumFractionDigits: 1})}</td>
 <td class="num">${googleTotals.totalApps || '—'}</td>
 <td class="num">${googleTotals.totalApps > 0 ? '$' + (googleTotals.totalSpent / googleTotals.totalApps).toLocaleString('en-US', {minimumFractionDigits: 1, maximumFractionDigits: 1}) : '—'}</td>
 <td class="num"><span class="${scoreClass(googleTotals.avgScore)}">${fmtScore(googleTotals.avgScore)}</span></td>
 <td class="num">—</td>
 <td class="num">${fmtDollar(googleTotals.totalEv)}</td>
 <td class="num"><span class="${roasClass(googleTotals.totalSpent, googleTotals.totalEv)}">${fmtROAS(googleTotals.totalSpent, googleTotals.totalEv)}</span></td>
 </tr>
 </tfoot>
 </table>
 </div>

 <!-- ===== ASSESSMENTS ===== -->
 <div class="section-header" style="margin-top:32px">
 <h2>Assessment</h2>
 </div>

 <div class="assessment-grid">

 <!-- Insights -->
 <div class="assessment-card">
 <div class="assessment-header insights-header">
 <span class="assessment-icon">💡</span>
 <div class="assessment-title">Insights</div>
 </div>
 <ol class="assessment-list">
 ${insights.map(i => `<li>${i}</li>`).join('\n ')}
 </ol>
 </div>

 <!-- Recommendations -->
 <div class="assessment-card">
 <div class="assessment-header recs-header">
 <span class="assessment-icon">🎯</span>
 <div class="assessment-title">Recommendations</div>
 </div>
 <div class="rec-list">
 ${recommendations.map(r => `
 <div class="rec-item">
 <span class="rec-tag ${r.tagClass}">${r.tag}</span>
 <div class="rec-body">
 <strong>${r.title}</strong>
 <span>${r.body}</span>
 </div>
 </div>`).join('')}
 </div>
 </div>

 </div>

</div>

<footer>
 The Hard Money Co. · ${DATE_RANGE} · ${dateLabel} · Powered by Toro-Bot &amp; Cometly · Generated ${SCRAPE_TIME.toLocaleString('en-US', { timeZone: 'America/Chicago' })}
</footer>
</body>
</html>`;

// Write output
const outDir = '/tmp/thmc-deploy';
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'index.html'), html);
console.log(`✓ Dashboard written to ${outDir}/index.html`);
console.log(`\nSummary:`);
console.log(` Total Spend: ${fmtDollar(grandTotals.totalSpent)}`);
console.log(` Total Apps: ${grandTotals.totalApps}`);
console.log(` Total EV: ${fmtDollar(grandTotals.totalEv)}`);
console.log(` Blended ROAS: ${grandTotals.blendedROAS.toFixed(1)}x`);
console.log(` Meta: ${metaTotals.totalApps} apps, ${fmtDollar(metaTotals.totalEv)} EV, ${metaTotals.blendedROAS.toFixed(1)}x ROAS`);
console.log(` Google: ${googleTotals.totalApps} apps, ${fmtDollar(googleTotals.totalEv)} EV, ${googleTotals.blendedROAS.toFixed(1)}x ROAS`);