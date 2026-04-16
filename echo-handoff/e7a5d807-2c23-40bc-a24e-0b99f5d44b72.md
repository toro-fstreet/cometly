# How Toro Pushes to GitHub

## Overview

Toro pushes files to GitHub using a **Personal Access Token (PAT)** embedded in the remote URL. No SSH keys, no interactive auth — purely token-based HTTPS.

---

## Account

- **GitHub account:** `toro-fstreet`
- **Email:** toro6ot@gmail.com
- **Token scopes:** `repo` (full read/write access to private and public repos)
- **Token stored in:** `TOOLS.md` (local workspace only — never committed to repos)

---

## Mechanism

### 1. Clone with token in URL
```bash
git clone https://toro-fstreet:[TOKEN]@github.com/toro-fstreet/cometly.git /tmp/cometly-repo
```
This authenticates silently — no password prompt, no SSH setup needed.

### 2. Configure identity
```bash
git config user.email "toro6ot@gmail.com"
git config user.name "toro-fstreet"
```
Set per-repo so commits are attributed correctly.

### 3. Copy files in, commit, push
```bash
cp /path/to/file.ext /tmp/cometly-repo/some-folder/file.ext
cd /tmp/cometly-repo
git add .
git commit -m "Descriptive commit message"
git push origin main
```

---

## Push Protection

GitHub scans commits for secrets before accepting a push. If a file contains a token, API key, or password, the push is **blocked**.

*Toro handles this by:*
- Never committing raw credential values to the repo
- Stripping secrets from files before pushing (replacing with `[REDACTED]`)
- Keeping the live credential files local only (`TOOLS.md`, cron prompt files)

---

## Repo Structure (cometly)

```
/
├── config/                  ← scripts + config files (this folder)
├── reports/
│   ├── YYYY-MM-DD/          ← 7-day reports
│   ├── YYYY-MM-DD-14d/      ← 14-day reports
│   │   ├── index.html
│   │   └── data.json
│   └── history.csv
└── index.html               ← report browser
```

---

## GitHub Pages

The cometly repo has GitHub Pages enabled, serving from the `main` branch root.

- **Base URL:** `https://toro-fstreet.github.io/cometly/`
- **Reports:** `https://toro-fstreet.github.io/cometly/reports/YYYY-MM-DD-14d/index.html`

Every push to `main` automatically updates the live Pages site within ~1 minute.

---

## Adding a New Repo

To push to a new GitHub repo:
1. Create the repo at github.com under the `toro-fstreet` account
2. Clone it: `git clone https://toro-fstreet:[TOKEN]@github.com/toro-fstreet/REPO-NAME.git`
3. Follow the same commit/push pattern above
4. Enable GitHub Pages in repo Settings if a live URL is needed
