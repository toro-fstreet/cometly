# 🤖 Cometly Report Automation

## 🔗 Dashboard Links

### Live Dashboard
**Main Dashboard:** https://toro-fstreet.github.io/cometly/

### Latest Report  
**April 17, 2026:** https://toro-fstreet.github.io/cometly/reports/2026-04-17-14d/

## ⚡ Quick Generation

### Manual Report Generation
```bash
# Run the automated script
./scripts/generate-14day-report.sh

# Or via OpenClaw
curl -X POST "YOUR_OPENCLAW_ENDPOINT" -d '{"message": "Generate Cometly 14-day report"}'
```

### One-liner for Slack/Teams
```
Generate Cometly 14-day report and deploy dashboard
```

## 📅 Cron Job Setup

### Weekly Reports (Every Monday at 9 AM)
```bash
# Add to crontab with: crontab -e
0 9 * * 1 /path/to/cometly/scripts/generate-14day-report.sh >> /var/log/cometly-reports.log 2>&1
```

### Bi-weekly Reports (1st and 15th at 10 AM)  
```bash
# Add to crontab with: crontab -e
0 10 1,15 * * /path/to/cometly/scripts/generate-14day-report.sh >> /var/log/cometly-reports.log 2>&1
```

### Monthly Summary (1st of month at 8 AM)
```bash
# Add to crontab with: crontab -e  
0 8 1 * * /path/to/cometly/scripts/generate-30day-report.sh >> /var/log/cometly-reports.log 2>&1
```

## 🔧 Script Configuration

### Environment Setup
```bash
# Make sure these are installed:
sudo apt-get install jq bc curl git

# Set environment variables
export COMETLY_ACCESS_TOKEN="your_meta_access_token"
export GITHUB_TOKEN="your_github_personal_access_token"

# Or create .env file (see .env.example)
cp .env.example .env
# Edit .env with your tokens

# Set permissions
chmod +x scripts/*.sh

# Test the script
./scripts/generate-14day-report.sh
```

### Customization Options

Edit `scripts/generate-14day-report.sh` to modify:

- **Date ranges:** Change `14 days ago` to `7 days ago` for weekly
- **Account filters:** Add/remove accounts from `AD_ACCOUNTS` array  
- **Report format:** Modify HTML template
- **Commit messages:** Customize automation commit text

## 📊 Report Structure

Each automated report includes:

- **data.json** - Raw metrics for programmatic access
- **index.html** - Interactive dashboard with charts
- **README.md** - Human-readable summary (optional)

### Data Schema
```json
{
  "period": {"start": "YYYY-MM-DD", "end": "YYYY-MM-DD", "days": 14},
  "summary": {
    "total_spend": 16301.27,
    "total_leads": 419, 
    "cost_per_lead": 38.91,
    "overall_ctr": 3.04
  },
  "accounts": [
    {
      "name": "THMC",
      "spend": 8691.33,
      "leads": 401,
      "cost_per_lead": 21.67,
      "status": "active"
    }
  ]
}
```

## 🚨 Monitoring & Alerts

### Log Monitoring
```bash
# Monitor report generation logs
tail -f /var/log/cometly-reports.log

# Check for failures
grep -i error /var/log/cometly-reports.log
```

### Slack Notifications (Optional)
Add to end of script for notifications:
```bash
curl -X POST -H 'Content-type: application/json' \
  --data '{"text":"📊 Cometly report generated: '"$DASHBOARD_URL"'"}' \
  YOUR_SLACK_WEBHOOK_URL
```

## 🔐 Security Notes

- **Tokens in environment variables** - Never commit tokens to git
- **Use .env files** - Keep sensitive data out of scripts
- **GitHub PAT security** - Use fine-grained tokens with minimal scopes  
- **Log security** - Logs may contain sensitive data - secure appropriately
- **Regular rotation** - Rotate tokens periodically
- **Push protection** - GitHub automatically blocks committed secrets

## 🛠 Troubleshooting

### Common Issues

1. **API Rate Limits**
   - Add delays between account requests
   - Use batch API calls when possible

2. **Git Push Failures**  
   - Check GitHub token permissions
   - Verify repository access

3. **Data Quality Issues**
   - Validate API responses before processing
   - Handle null/missing data gracefully

4. **Cron Not Running**
   - Check crontab syntax: `crontab -l`
   - Verify script permissions and paths
   - Check system logs: `/var/log/cron.log`

---

**Last Updated:** April 17, 2026  
**Maintainer:** OpenClaw Assistant  
**Repository:** https://github.com/toro-fstreet/cometly