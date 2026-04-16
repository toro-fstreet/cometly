# TOOLS.md - Local Notes (Sanitized)

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

Add whatever helps you do your job. This is your cheat sheet.

## GitHub Integration

### toro-fstreet Account
- **Account:** toro-fstreet
- **Email:** [REDACTED]
- **Token:** [REDACTED]
- **Scopes:** repo (full read/write access)
- **Repos:** cometly (dashboard deployment)

### Deployment Pattern
```bash
git clone https://toro-fstreet:[TOKEN]@github.com/toro-fstreet/cometly.git /tmp/cometly-repo
cd /tmp/cometly-repo
git config user.email "[EMAIL]"
git config user.name "toro-fstreet"
# ... make changes ...
git add . && git commit -m "Report YYYY-MM-DD" && git push origin main
```

## Meta Ads API - F Street Portfolio

### API Credentials (All Accounts)
- **App ID:** [REDACTED]
- **App Secret:** [REDACTED]
- **Access Token:** [REDACTED]
- **API Version:** v25.0
- **Token Expires:** ~June 14, 2026

### Ad Account IDs (Business Only)
- **F Street:** act_317120362102215
- **Dubbel Dutch:** act_442084154783746
- **The Hard Money Co.:** act_2932711756987955
- **The Hard Money Company (THMC):** act_850448857515247
- **Draftline:** act_954974165119196
- **Private Debt Fund:** act_758925220499005
- **Cashoutloans.com:** act_267456668718544

### BLOCKED - Do Not Access
- **Mike Doney Personal:** act_10101478731327628 (PRIVACY - NEVER ACCESS)

### Test Commands
```bash
# List campaigns
curl -X GET "https://graph.facebook.com/v25.0/act_850448857515247/campaigns?access_token=[TOKEN]"

# Campaign details with fields
curl -X GET "https://graph.facebook.com/v25.0/act_850448857515247/campaigns?fields=name,status,objective,daily_budget,lifetime_budget&access_token=[TOKEN]"
```