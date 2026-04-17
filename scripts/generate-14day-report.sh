#!/bin/bash

# 📊 Cometly 14-Day Report Generator
# Automated script for generating comprehensive performance reports

set -e

# Configuration
# Set ACCESS_TOKEN environment variable or edit this line
ACCESS_TOKEN="${COMETLY_ACCESS_TOKEN:-YOUR_META_ACCESS_TOKEN_HERE}"
API_VERSION="v25.0"
# Set GITHUB_TOKEN environment variable or edit this line
GITHUB_TOKEN="${GITHUB_TOKEN:-YOUR_GITHUB_TOKEN_HERE}"
REPO_URL="https://toro-fstreet:${GITHUB_TOKEN}@github.com/toro-fstreet/cometly.git"

# Date calculations
END_DATE=$(date +%Y-%m-%d)
START_DATE=$(date -d "14 days ago" +%Y-%m-%d)
REPORT_DIR="$(date +%Y-%m-%d)-14d"
TIMESTAMP=$(date "+%Y-%m-%d %H:%M:%S %Z")

echo "📊 Generating Cometly 14-Day Report ($START_DATE to $END_DATE)"
echo "Report directory: $REPORT_DIR"
echo "Timestamp: $TIMESTAMP"

# Business ad account IDs (excluding blocked personal account)
declare -A AD_ACCOUNTS=(
    ["F Street"]="act_317120362102215"
    ["Dubbel Dutch"]="act_442084154783746"
    ["The Hard Money Co."]="act_2932711756987955"
    ["THMC"]="act_850448857515247"
    ["Draftline"]="act_954974165119196"
    ["Private Debt Fund"]="act_758925220499005"
    ["Cashoutloans.com"]="act_267456668718544"
)

# Setup workspace
WORK_DIR="/tmp/cometly-$(date +%s)"
mkdir -p "$WORK_DIR"
cd "$WORK_DIR"

# Clone repository
echo "🔄 Cloning repository..."
git clone "$REPO_URL" repo
cd repo
git config user.email "toro6ot@gmail.com"
git config user.name "toro-fstreet"

# Create report directory
mkdir -p "reports/$REPORT_DIR"

echo "📡 Fetching data from Meta Ads API..."

# Initialize totals
TOTAL_SPEND=0
TOTAL_IMPRESSIONS=0
TOTAL_CLICKS=0
TOTAL_CONVERSIONS=0

# Start building JSON data file
cat > "reports/$REPORT_DIR/data.json" << EOF
{
  "period": {
    "start": "$START_DATE",
    "end": "$END_DATE",
    "days": 14
  },
  "summary": {},
  "accounts": [
EOF

FIRST_ACCOUNT=true

for account_name in "${!AD_ACCOUNTS[@]}"; do
    account_id="${AD_ACCOUNTS[$account_name]}"
    echo "  📊 Processing $account_name ($account_id)..."
    
    # Fetch insights from Meta API
    response=$(curl -s "https://graph.facebook.com/$API_VERSION/$account_id/insights?access_token=$ACCESS_TOKEN&time_range=%7B%22since%22%3A%22$START_DATE%22%2C%22until%22%3A%22$END_DATE%22%7D&fields=spend,impressions,clicks,actions,cpm,cpc,ctr,account_name&level=account")
    
    if echo "$response" | grep -q '"data":\[{'; then
        # Extract metrics
        spend=$(echo "$response" | jq -r '.data[0].spend // "0"' | sed 's/null/0/')
        impressions=$(echo "$response" | jq -r '.data[0].impressions // "0"' | sed 's/null/0/')
        clicks=$(echo "$response" | jq -r '.data[0].clicks // "0"' | sed 's/null/0/')
        cpm=$(echo "$response" | jq -r '.data[0].cpm // "0"' | sed 's/null/0/')
        cpc=$(echo "$response" | jq -r '.data[0].cpc // "0"' | sed 's/null/0/')
        ctr=$(echo "$response" | jq -r '.data[0].ctr // "0"' | sed 's/null/0/')
        
        # Extract leads
        leads=$(echo "$response" | jq -r '[.data[0].actions[]? | select(.action_type == "lead") | .value | tonumber] | add // 0')
        
        status="active"
        cost_per_lead="null"
        if [ "$leads" -gt 0 ]; then
            cost_per_lead=$(echo "scale=2; $spend / $leads" | bc -l)
        fi
    else
        spend=0
        impressions=0
        clicks=0
        cpm=0
        cpc=0
        ctr=0
        leads=0
        status="inactive"
        cost_per_lead="null"
    fi
    
    # Add comma separator for JSON
    if [ "$FIRST_ACCOUNT" = false ]; then
        echo "," >> "reports/$REPORT_DIR/data.json"
    fi
    FIRST_ACCOUNT=false
    
    # Add account data to JSON
    cat >> "reports/$REPORT_DIR/data.json" << EOF
    {
      "name": "$account_name",
      "account_id": "$account_id",
      "spend": $spend,
      "impressions": $impressions,
      "clicks": $clicks,
      "leads": $leads,
      "ctr": $ctr,
      "cpm": $cpm,
      "cpc": $cpc,
      "cost_per_lead": $cost_per_lead,
      "status": "$status"
    }EOF
    
    # Update totals
    TOTAL_SPEND=$(echo "$TOTAL_SPEND + $spend" | bc -l)
    TOTAL_IMPRESSIONS=$((TOTAL_IMPRESSIONS + impressions))
    TOTAL_CLICKS=$((TOTAL_CLICKS + clicks))
    TOTAL_CONVERSIONS=$((TOTAL_CONVERSIONS + leads))
done

# Calculate overall metrics
OVERALL_CTR=0
OVERALL_CPM=0
OVERALL_CPC=0
COST_PER_LEAD=0

if [ "$TOTAL_IMPRESSIONS" -gt 0 ]; then
    OVERALL_CTR=$(echo "scale=2; $TOTAL_CLICKS * 100 / $TOTAL_IMPRESSIONS" | bc -l)
    OVERALL_CPM=$(echo "scale=2; $TOTAL_SPEND * 1000 / $TOTAL_IMPRESSIONS" | bc -l)
fi

if [ "$TOTAL_CLICKS" -gt 0 ]; then
    OVERALL_CPC=$(echo "scale=2; $TOTAL_SPEND / $TOTAL_CLICKS" | bc -l)
fi

if [ "$TOTAL_CONVERSIONS" -gt 0 ]; then
    COST_PER_LEAD=$(echo "scale=2; $TOTAL_SPEND / $TOTAL_CONVERSIONS" | bc -l)
fi

# Finish JSON file
cat >> "reports/$REPORT_DIR/data.json" << EOF

  ],
  "summary": {
    "total_spend": $TOTAL_SPEND,
    "total_impressions": $TOTAL_IMPRESSIONS,
    "total_clicks": $TOTAL_CLICKS,
    "total_leads": $TOTAL_CONVERSIONS,
    "overall_ctr": $OVERALL_CTR,
    "overall_cpm": $OVERALL_CPM,
    "overall_cpc": $OVERALL_CPC,
    "cost_per_lead": $COST_PER_LEAD
  },
  "generated_at": "$(date -Iseconds)",
  "generated_by": "Automated Cometly Report Generator"
}
EOF

echo "📊 Summary:"
echo "  Total Spend: \$$TOTAL_SPEND"
echo "  Total Impressions: $TOTAL_IMPRESSIONS"
echo "  Total Clicks: $TOTAL_CLICKS"
echo "  Total Leads: $TOTAL_CONVERSIONS"
echo "  Cost Per Lead: \$$COST_PER_LEAD"

# Create simple HTML report
cat > "reports/$REPORT_DIR/index.html" << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>Cometly 14-Day Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .summary { background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .metric { display: inline-block; margin: 10px 20px; text-align: center; }
        .metric-value { font-size: 2em; font-weight: bold; color: #2563eb; }
        .metric-label { color: #666; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background: #f8f9fa; }
        .top-performer { background: #d1fae5; }
        .needs-attention { background: #fee2e2; }
    </style>
</head>
<body>
    <h1>📊 Cometly 14-Day Performance Report</h1>
    <p><strong>Period:</strong> <span id="period"></span></p>
    
    <div class="summary">
        <div class="metric">
            <div class="metric-value" id="total-spend">-</div>
            <div class="metric-label">Total Spend</div>
        </div>
        <div class="metric">
            <div class="metric-value" id="total-leads">-</div>
            <div class="metric-label">Total Leads</div>
        </div>
        <div class="metric">
            <div class="metric-value" id="cost-per-lead">-</div>
            <div class="metric-label">Cost Per Lead</div>
        </div>
        <div class="metric">
            <div class="metric-value" id="overall-ctr">-</div>
            <div class="metric-label">Overall CTR</div>
        </div>
    </div>
    
    <h2>Account Performance</h2>
    <table id="accounts-table">
        <thead>
            <tr>
                <th>Account</th>
                <th>Spend</th>
                <th>Impressions</th>
                <th>Clicks</th>
                <th>Leads</th>
                <th>CTR</th>
                <th>Cost/Lead</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody id="accounts-body"></tbody>
    </table>
    
    <script>
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                // Update summary
                document.getElementById('period').textContent = `${data.period.start} to ${data.period.end}`;
                document.getElementById('total-spend').textContent = `$${data.summary.total_spend?.toLocaleString() || '0'}`;
                document.getElementById('total-leads').textContent = data.summary.total_leads || '0';
                document.getElementById('cost-per-lead').textContent = `$${data.summary.cost_per_lead?.toFixed(2) || '0'}`;
                document.getElementById('overall-ctr').textContent = `${data.summary.overall_ctr?.toFixed(2) || '0'}%`;
                
                // Build accounts table
                const tbody = document.getElementById('accounts-body');
                data.accounts.forEach(account => {
                    const row = tbody.insertRow();
                    const costPerLead = account.cost_per_lead ? `$${account.cost_per_lead.toFixed(2)}` : '-';
                    const rowClass = account.leads > 100 ? 'top-performer' : (account.cost_per_lead > 200 ? 'needs-attention' : '');
                    if (rowClass) row.className = rowClass;
                    
                    row.innerHTML = `
                        <td>${account.name}</td>
                        <td>$${account.spend.toLocaleString()}</td>
                        <td>${account.impressions.toLocaleString()}</td>
                        <td>${account.clicks.toLocaleString()}</td>
                        <td>${account.leads}</td>
                        <td>${account.ctr.toFixed(2)}%</td>
                        <td>${costPerLead}</td>
                        <td>${account.status}</td>
                    `;
                });
            })
            .catch(error => console.error('Error loading data:', error));
    </script>
</body>
</html>
EOF

# Commit and push to GitHub
echo "🚀 Deploying to GitHub Pages..."
git add .
git commit -m "📊 Automated Cometly 14-Day Report $(date +%Y-%m-%d)

Generated: $TIMESTAMP
Total spend: \$$TOTAL_SPEND  
Total leads: $TOTAL_CONVERSIONS
Cost per lead: \$$COST_PER_LEAD

Dashboard: https://toro-fstreet.github.io/cometly/reports/$REPORT_DIR/"

git push origin main

# Generate dashboard URL
DASHBOARD_URL="https://toro-fstreet.github.io/cometly/reports/$REPORT_DIR/"

echo ""
echo "✅ Report generation complete!"
echo "📊 Dashboard URL: $DASHBOARD_URL"
echo "📁 Report data saved to: reports/$REPORT_DIR/"
echo ""

# Cleanup
cd /
rm -rf "$WORK_DIR"

echo "🔗 Dashboard Links:"
echo "  Main: https://toro-fstreet.github.io/cometly/"
echo "  Latest: $DASHBOARD_URL"