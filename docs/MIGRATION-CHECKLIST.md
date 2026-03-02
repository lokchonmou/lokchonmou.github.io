# VitePress Migration Checklist (Zero-Downtime)

## 1) Install and run locally

```bash
npm install
npm run dev
```

## 2) Preserve legacy URLs

All files under `docs/public` are copied to the site root during build.

Example mapping:

- `docs/public/index.html` -> `/index.html`
- `docs/public/topBar.html` -> `/topBar.html`
- `docs/public/assets/site.css` -> `/assets/site.css`

Use path-preserving copy (recommended):

```bash
rsync -av --delete \
  --exclude='.git' \
  --exclude='docs' \
  --exclude='node_modules' \
  --exclude='package-lock.json' \
  --exclude='package.json' \
  ./ ./docs/public/
```

## 3) Failure mode checks before merge to main

- Legacy entry remains available: `/index.html`
- Legacy deep links still work (sample old paths)
- Legacy asset URLs resolve (`/assets/...`, `/libraries/...`)
- No accidental base prefix breakage in built files
- New VitePress routes work: `/zh/`, `/en/`
- Math rendering works in both locales
- Code blocks show line numbers and line highlights
- 404 behavior is expected for unknown paths
- Browser hard refresh (`Cmd+Shift+R`) shows no stale route issue

## 4) Local build verification (no merge required)

```bash
npm run build
npm run preview
```

Then check:

- `http://localhost:4173/index.html` (legacy)
- `http://localhost:4173/zh/` (new zh)
- `http://localhost:4173/en/` (new en)

## 5) Cutover strategy

Keep root `index.html` as legacy entry until final switch.

When you are ready to switch:

1. Point `/index.html` to new VitePress entry (or make `/` serve VitePress homepage)
2. Keep legacy entry at a stable URL such as `/legacy/index.html`
3. Keep a visible "Back to Legacy" link in VitePress nav
