# Trip Assistant PWA

A mobile-first, offline-ready iPhone trip guide powered by Astro + PWA.

## What this does

- Renders the canonical markdown file at `src/content/trips/wa-mt-id-roadtrip.md`
- Auto-builds a day-by-day jump menu from `## Day N (...)` headings
- Adds one-tap `Open in Google Maps` actions for stop links
- Works offline after first load (text + app shell + cached assets)
- Deploys automatically to GitHub Pages on pushes to `main`

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Test

```bash
npm test
```

## iPhone install

1. Open your published GitHub Pages URL in Safari.
2. Tap Share.
3. Tap **Add to Home Screen**.
4. Launch from the icon like a normal app.

## Content contract

Required in markdown:

- A top-level `#` trip title
- Day sections using headings like `## Day 1 (...) - ...`

Optional frontmatter fields:

- `trip_dates`
- `start_location`
- `end_location`
