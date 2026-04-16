#!/usr/bin/env python3
"""Google Ads Full Account Audit — Echo overnight job"""

import warnings
warnings.filterwarnings("ignore")

from google.ads.googleads.client import GoogleAdsClient
from datetime import datetime, timedelta
import json, os

CONFIG_PATH = "/Users/mike/.openclaw/workspace/google-ads-config/google-ads.yaml"
OUTPUT_DIR = "/Users/mike/.openclaw/workspace/google-ads-audit"
os.makedirs(OUTPUT_DIR, exist_ok=True)

client = GoogleAdsClient.load_from_storage(CONFIG_PATH)

ACCOUNTS = {
    "5920534019": "F Street",
    "1026183844": "THMC",
}

# Use MCC login customer ID (first accessible that's a manager)
# Try without login_customer_id first, fall back if needed

def run_query(customer_id, query, login_customer_id=None):
    service = client.get_service("GoogleAdsService")
    kwargs = {"customer_id": customer_id, "query": query}
    if login_customer_id:
        # We need to set this on the client level
        pass
    results = []
    try:
        response = service.search_stream(**kwargs)
        for batch in response:
            for row in batch.results:
                results.append(row)
    except Exception as e:
        results = {"error": str(e)}
    return results

def audit_account(customer_id, name):
    print(f"\n{'='*60}")
    print(f"AUDITING: {name} ({customer_id})")
    print(f"{'='*60}")
    
    report = {"account": name, "customer_id": customer_id, "audit_date": datetime.now().isoformat()}
    
    # 1. Account-level settings
    print("\n1. Account Settings...")
    try:
        query = f"""
            SELECT customer.descriptive_name, customer.currency_code, 
                   customer.time_zone, customer.auto_tagging_enabled,
                   customer.tracking_url_template
            FROM customer
            LIMIT 1
        """
        rows = run_query(customer_id, query)
        if isinstance(rows, dict) and "error" in rows:
            report["account_settings"] = rows
            print(f"   Error: {rows['error']}")
        elif rows:
            r = rows[0]
            settings = {
                "name": r.customer.descriptive_name,
                "currency": r.customer.currency_code,
                "timezone": r.customer.time_zone,
                "auto_tagging": r.customer.auto_tagging_enabled,
                "tracking_template": r.customer.tracking_url_template or "None",
            }
            report["account_settings"] = settings
            print(f"   Name: {settings['name']}, Currency: {settings['currency']}, TZ: {settings['timezone']}")
            print(f"   Auto-tagging: {settings['auto_tagging']}, Tracking: {settings['tracking_template']}")
    except Exception as e:
        report["account_settings"] = {"error": str(e)}
        print(f"   Error: {e}")

    # 2. Campaign overview
    print("\n2. Campaigns...")
    try:
        query = """
            SELECT campaign.id, campaign.name, campaign.status,
                   campaign.advertising_channel_type, campaign.bidding_strategy_type,
                   campaign_budget.amount_micros, campaign_budget.delivery_method,
                   campaign_budget.has_recommended_budget,
                   metrics.impressions, metrics.clicks, metrics.cost_micros,
                   metrics.conversions, metrics.conversions_value,
                   metrics.average_cpc, metrics.ctr,
                   metrics.cost_per_conversion
            FROM campaign
            WHERE segments.date BETWEEN '2026-01-01' AND '2026-04-01'
            ORDER BY metrics.cost_micros DESC
        """
        rows = run_query(customer_id, query)
        if isinstance(rows, dict) and "error" in rows:
            report["campaigns"] = rows
            print(f"   Error: {rows['error']}")
        else:
            campaigns = []
            for r in rows:
                c = {
                    "id": r.campaign.id,
                    "name": r.campaign.name,
                    "status": r.campaign.status.name,
                    "channel_type": r.campaign.advertising_channel_type.name,
                    "bidding_strategy": r.campaign.bidding_strategy_type.name,
                    "daily_budget": r.campaign_budget.amount_micros / 1_000_000 if r.campaign_budget.amount_micros else 0,
                    "budget_delivery": r.campaign_budget.delivery_method.name if r.campaign_budget.delivery_method else "N/A",
                    "impressions_90d": r.metrics.impressions,
                    "clicks_90d": r.metrics.clicks,
                    "cost_90d": round(r.metrics.cost_micros / 1_000_000, 2),
                    "conversions_90d": round(r.metrics.conversions, 2),
                    "conversion_value_90d": round(r.metrics.conversions_value, 2),
                    "avg_cpc": round(r.metrics.average_cpc / 1_000_000, 2) if r.metrics.average_cpc else 0,
                    "ctr": round(r.metrics.ctr * 100, 2) if r.metrics.ctr else 0,
                    "cost_per_conversion": round(r.metrics.cost_per_conversion / 1_000_000, 2) if r.metrics.cost_per_conversion else 0,
                }
                campaigns.append(c)
                print(f"   [{c['status']}] {c['name']} — ${c['cost_90d']} spend, {c['clicks_90d']} clicks, {c['conversions_90d']} conv, ${c['cost_per_conversion']} CPA")
            report["campaigns"] = campaigns
            print(f"   Total campaigns: {len(campaigns)}")
    except Exception as e:
        report["campaigns"] = {"error": str(e)}
        print(f"   Error: {e}")

    # 3. Ad Groups
    print("\n3. Ad Groups...")
    try:
        query = """
            SELECT ad_group.id, ad_group.name, ad_group.status,
                   ad_group.type, campaign.name,
                   metrics.impressions, metrics.clicks, metrics.cost_micros,
                   metrics.conversions, metrics.average_cpc, metrics.ctr
            FROM ad_group
            WHERE segments.date BETWEEN '2026-01-01' AND '2026-04-01'
                AND ad_group.status != 'REMOVED'
            ORDER BY metrics.cost_micros DESC
        """
        rows = run_query(customer_id, query)
        if isinstance(rows, dict) and "error" in rows:
            report["ad_groups"] = rows
            print(f"   Error: {rows['error']}")
        else:
            ad_groups = []
            for r in rows:
                ag = {
                    "id": r.ad_group.id,
                    "name": r.ad_group.name,
                    "status": r.ad_group.status.name,
                    "type": r.ad_group.type_.name,
                    "campaign": r.campaign.name,
                    "impressions_90d": r.metrics.impressions,
                    "clicks_90d": r.metrics.clicks,
                    "cost_90d": round(r.metrics.cost_micros / 1_000_000, 2),
                    "conversions_90d": round(r.metrics.conversions, 2),
                    "avg_cpc": round(r.metrics.average_cpc / 1_000_000, 2) if r.metrics.average_cpc else 0,
                    "ctr": round(r.metrics.ctr * 100, 2) if r.metrics.ctr else 0,
                }
                ad_groups.append(ag)
            report["ad_groups"] = ad_groups
            print(f"   Total ad groups: {len(ad_groups)}")
            for ag in ad_groups[:10]:
                print(f"   [{ag['status']}] {ag['campaign']} > {ag['name']} — ${ag['cost_90d']}, {ag['clicks_90d']} clicks, {ag['ctr']}% CTR")
    except Exception as e:
        report["ad_groups"] = {"error": str(e)}
        print(f"   Error: {e}")

    # 4. Keywords with Quality Scores
    print("\n4. Keywords & Quality Scores...")
    try:
        query = """
            SELECT ad_group_criterion.keyword.text,
                   ad_group_criterion.keyword.match_type,
                   ad_group_criterion.status,
                   ad_group_criterion.quality_info.quality_score,
                   ad_group_criterion.quality_info.creative_quality_score,
                   ad_group_criterion.quality_info.search_predicted_ctr,
                   ad_group_criterion.quality_info.post_click_quality_score,
                   ad_group.name, campaign.name,
                   metrics.impressions, metrics.clicks, metrics.cost_micros,
                   metrics.conversions, metrics.average_cpc, metrics.ctr
            FROM keyword_view
            WHERE segments.date BETWEEN '2026-01-01' AND '2026-04-01'
                AND ad_group_criterion.status != 'REMOVED'
            ORDER BY metrics.cost_micros DESC
        """
        rows = run_query(customer_id, query)
        if isinstance(rows, dict) and "error" in rows:
            report["keywords"] = rows
            print(f"   Error: {rows['error']}")
        else:
            keywords = []
            for r in rows:
                kw = {
                    "keyword": r.ad_group_criterion.keyword.text,
                    "match_type": r.ad_group_criterion.keyword.match_type.name,
                    "status": r.ad_group_criterion.status.name,
                    "quality_score": r.ad_group_criterion.quality_info.quality_score or "N/A",
                    "creative_quality": r.ad_group_criterion.quality_info.creative_quality_score.name if r.ad_group_criterion.quality_info.creative_quality_score else "N/A",
                    "predicted_ctr": r.ad_group_criterion.quality_info.search_predicted_ctr.name if r.ad_group_criterion.quality_info.search_predicted_ctr else "N/A",
                    "landing_page_exp": r.ad_group_criterion.quality_info.post_click_quality_score.name if r.ad_group_criterion.quality_info.post_click_quality_score else "N/A",
                    "ad_group": r.ad_group.name,
                    "campaign": r.campaign.name,
                    "impressions_90d": r.metrics.impressions,
                    "clicks_90d": r.metrics.clicks,
                    "cost_90d": round(r.metrics.cost_micros / 1_000_000, 2),
                    "conversions_90d": round(r.metrics.conversions, 2),
                    "avg_cpc": round(r.metrics.average_cpc / 1_000_000, 2) if r.metrics.average_cpc else 0,
                    "ctr": round(r.metrics.ctr * 100, 2) if r.metrics.ctr else 0,
                }
                keywords.append(kw)
            report["keywords"] = keywords
            print(f"   Total keywords: {len(keywords)}")
            for kw in keywords[:15]:
                print(f"   [{kw['match_type']}] \"{kw['keyword']}\" — QS:{kw['quality_score']}, ${kw['cost_90d']}, {kw['clicks_90d']} clicks, {kw['conversions_90d']} conv")
    except Exception as e:
        report["keywords"] = {"error": str(e)}
        print(f"   Error: {e}")

    # 5. Ads performance
    print("\n5. Ad Copy Performance...")
    try:
        query = """
            SELECT ad_group_ad.ad.id, ad_group_ad.ad.type,
                   ad_group_ad.ad.responsive_search_ad.headlines,
                   ad_group_ad.ad.responsive_search_ad.descriptions,
                   ad_group_ad.ad.final_urls,
                   ad_group_ad.status, ad_group.name, campaign.name,
                   metrics.impressions, metrics.clicks, metrics.cost_micros,
                   metrics.conversions, metrics.ctr, metrics.average_cpc
            FROM ad_group_ad
            WHERE segments.date BETWEEN '2026-01-01' AND '2026-04-01'
                AND ad_group_ad.status != 'REMOVED'
            ORDER BY metrics.cost_micros DESC
        """
        rows = run_query(customer_id, query)
        if isinstance(rows, dict) and "error" in rows:
            report["ads"] = rows
            print(f"   Error: {rows['error']}")
        else:
            ads = []
            for r in rows:
                headlines = []
                descriptions = []
                if r.ad_group_ad.ad.responsive_search_ad.headlines:
                    headlines = [h.text for h in r.ad_group_ad.ad.responsive_search_ad.headlines]
                if r.ad_group_ad.ad.responsive_search_ad.descriptions:
                    descriptions = [d.text for d in r.ad_group_ad.ad.responsive_search_ad.descriptions]
                ad = {
                    "id": r.ad_group_ad.ad.id,
                    "type": r.ad_group_ad.ad.type_.name,
                    "status": r.ad_group_ad.status.name,
                    "headlines": headlines,
                    "descriptions": descriptions,
                    "final_urls": list(r.ad_group_ad.ad.final_urls),
                    "ad_group": r.ad_group.name,
                    "campaign": r.campaign.name,
                    "impressions_90d": r.metrics.impressions,
                    "clicks_90d": r.metrics.clicks,
                    "cost_90d": round(r.metrics.cost_micros / 1_000_000, 2),
                    "conversions_90d": round(r.metrics.conversions, 2),
                    "ctr": round(r.metrics.ctr * 100, 2) if r.metrics.ctr else 0,
                    "avg_cpc": round(r.metrics.average_cpc / 1_000_000, 2) if r.metrics.average_cpc else 0,
                }
                ads.append(ad)
            report["ads"] = ads
            print(f"   Total ads: {len(ads)}")
            for ad in ads[:10]:
                h = ad['headlines'][0] if ad['headlines'] else "N/A"
                print(f"   [{ad['status']}] {ad['campaign']} > {h} — ${ad['cost_90d']}, {ad['clicks_90d']} clicks, {ad['ctr']}% CTR")
    except Exception as e:
        report["ads"] = {"error": str(e)}
        print(f"   Error: {e}")

    # 6. Search Terms (top 50 by spend)
    print("\n6. Search Terms Report (top 50 by spend)...")
    try:
        query = """
            SELECT search_term_view.search_term, search_term_view.status,
                   campaign.name, ad_group.name,
                   metrics.impressions, metrics.clicks, metrics.cost_micros,
                   metrics.conversions, metrics.ctr
            FROM search_term_view
            WHERE segments.date BETWEEN '2026-01-01' AND '2026-04-01'
            ORDER BY metrics.cost_micros DESC
            LIMIT 50
        """
        rows = run_query(customer_id, query)
        if isinstance(rows, dict) and "error" in rows:
            report["search_terms"] = rows
            print(f"   Error: {rows['error']}")
        else:
            terms = []
            for r in rows:
                t = {
                    "term": r.search_term_view.search_term,
                    "status": r.search_term_view.status.name,
                    "campaign": r.campaign.name,
                    "ad_group": r.ad_group.name,
                    "impressions": r.metrics.impressions,
                    "clicks": r.metrics.clicks,
                    "cost": round(r.metrics.cost_micros / 1_000_000, 2),
                    "conversions": round(r.metrics.conversions, 2),
                    "ctr": round(r.metrics.ctr * 100, 2) if r.metrics.ctr else 0,
                }
                terms.append(t)
            report["search_terms_top50"] = terms
            print(f"   Total search terms retrieved: {len(terms)}")
            for t in terms[:20]:
                print(f"   \"{t['term']}\" — ${t['cost']}, {t['clicks']} clicks, {t['conversions']} conv")
    except Exception as e:
        report["search_terms_top50"] = {"error": str(e)}
        print(f"   Error: {e}")

    # 7. Conversion actions
    print("\n7. Conversion Tracking Setup...")
    try:
        query = """
            SELECT conversion_action.id, conversion_action.name,
                   conversion_action.type, conversion_action.status,
                   conversion_action.category,
                   conversion_action.counting_type,
                   conversion_action.include_in_conversions_metric
                   
            FROM conversion_action
            
        """
        rows = run_query(customer_id, query)
        if isinstance(rows, dict) and "error" in rows:
            report["conversion_actions"] = rows
            print(f"   Error: {rows['error']}")
        else:
            conv_actions = []
            for r in rows:
                ca = {
                    "id": r.conversion_action.id,
                    "name": r.conversion_action.name,
                    "type": r.conversion_action.type_.name,
                    "status": r.conversion_action.status.name,
                    "category": r.conversion_action.category.name,
                    "counting": r.conversion_action.counting_type.name,
                    "in_conversions": r.conversion_action.include_in_conversions_metric,
                }
                conv_actions.append(ca)
                print(f"   [{ca['status']}] {ca['name']} ({ca['type']}) — in_metric={ca['in_conversions']}")
            report["conversion_actions"] = conv_actions
    except Exception as e:
        report["conversion_actions"] = {"error": str(e)}
        print(f"   Error: {e}")

    # 8. Monthly spend trend (last 6 months)
    print("\n8. Monthly Spend Trend...")
    try:
        query = """
            SELECT segments.month,
                   metrics.impressions, metrics.clicks, metrics.cost_micros,
                   
            FROM customer
            WHERE segments.date BETWEEN '2025-10-03' AND '2026-04-01'
            ORDER BY segments.month ASC
        """
        rows = run_query(customer_id, query)
        if isinstance(rows, dict) and "error" in rows:
            report["monthly_trend"] = rows
            print(f"   Error: {rows['error']}")
        else:
            months = []
            for r in rows:
                m = {
                    "month": r.segments.month,
                    "impressions": r.metrics.impressions,
                    "clicks": r.metrics.clicks,
                    "cost": round(r.metrics.cost_micros / 1_000_000, 2),
                    "conversions": round(r.metrics.conversions, 2),
                    "value": round(r.metrics.conversions_value, 2),
                }
                months.append(m)
                print(f"   {m['month']}: ${m['cost']} spend, {m['clicks']} clicks, {m['conversions']} conv")
            report["monthly_trend"] = months
    except Exception as e:
        report["monthly_trend"] = {"error": str(e)}
        print(f"   Error: {e}")

    # 9. Geographic performance (top 20)
    print("\n9. Geographic Performance (top 20 by spend)...")
    try:
        query = """
            SELECT geographic_view.country_criterion_id,
                   geographic_view.location_type,
                   campaign.name,
                   metrics.impressions, metrics.clicks, metrics.cost_micros,
                   metrics.conversions
            FROM geographic_view
            WHERE segments.date BETWEEN '2026-01-01' AND '2026-04-01'
            ORDER BY metrics.cost_micros DESC
            LIMIT 20
        """
        rows = run_query(customer_id, query)
        if isinstance(rows, dict) and "error" in rows:
            report["geo_performance"] = rows
        else:
            geo = []
            for r in rows:
                g = {
                    "country_id": r.geographic_view.country_criterion_id,
                    "location_type": r.geographic_view.location_type.name,
                    "campaign": r.campaign.name,
                    "impressions": r.metrics.impressions,
                    "clicks": r.metrics.clicks,
                    "cost": round(r.metrics.cost_micros / 1_000_000, 2),
                    "conversions": round(r.metrics.conversions, 2),
                }
                geo.append(g)
            report["geo_performance"] = geo
            print(f"   {len(geo)} geo entries retrieved")
    except Exception as e:
        report["geo_performance"] = {"error": str(e)}
        print(f"   Error: {e}")

    # 10. Device performance
    print("\n10. Device Performance...")
    try:
        query = """
            SELECT segments.device,
                   metrics.impressions, metrics.clicks, metrics.cost_micros,
                   metrics.conversions, metrics.ctr, metrics.average_cpc
            FROM campaign
            WHERE segments.date BETWEEN '2026-01-01' AND '2026-04-01'
        """
        rows = run_query(customer_id, query)
        if isinstance(rows, dict) and "error" in rows:
            report["device_performance"] = rows
        else:
            devices = {}
            for r in rows:
                dev = r.segments.device.name
                if dev not in devices:
                    devices[dev] = {"impressions": 0, "clicks": 0, "cost": 0, "conversions": 0}
                devices[dev]["impressions"] += r.metrics.impressions
                devices[dev]["clicks"] += r.metrics.clicks
                devices[dev]["cost"] += r.metrics.cost_micros / 1_000_000
                devices[dev]["conversions"] += r.metrics.conversions
            for dev, data in devices.items():
                data["cost"] = round(data["cost"], 2)
                data["conversions"] = round(data["conversions"], 2)
                print(f"   {dev}: ${data['cost']} spend, {data['clicks']} clicks, {data['conversions']} conv")
            report["device_performance"] = devices
    except Exception as e:
        report["device_performance"] = {"error": str(e)}
        print(f"   Error: {e}")

    # Save raw data
    output_file = os.path.join(OUTPUT_DIR, f"{name.lower().replace(' ', '-')}-audit.json")
    with open(output_file, "w") as f:
        json.dump(report, f, indent=2, default=str)
    print(f"\n   Raw data saved: {output_file}")
    
    return report

# Run audits
all_reports = {}
for cid, name in ACCOUNTS.items():
    try:
        all_reports[name] = audit_account(cid, name)
    except Exception as e:
        print(f"\nFATAL ERROR auditing {name}: {e}")
        all_reports[name] = {"error": str(e)}

# Save combined
with open(os.path.join(OUTPUT_DIR, "full-audit.json"), "w") as f:
    json.dump(all_reports, f, indent=2, default=str)

print(f"\n{'='*60}")
print("AUDIT COMPLETE — all data saved to {OUTPUT_DIR}")
print(f"{'='*60}")
