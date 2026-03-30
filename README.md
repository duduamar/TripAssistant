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

## Use On iPhone

### Add to Home Screen

1. On your iPhone, open Safari and go to [https://duduamar.github.io/TripAssistant/](https://duduamar.github.io/TripAssistant/).
2. Tap the Share button (square with upward arrow).
3. Tap **Add to Home Screen**.
4. Keep the default name (`Trip Guide`) or rename it.
5. Tap **Add**.
6. Launch it from your Home Screen like a normal app.

### Prep for Offline Use (Before Drive Days)

1. Open the app once while on Wi-Fi.
2. Tap through each day (Day 1 to Day 8) so pages/assets are cached.
3. Keep it open for a few seconds after browsing to allow background caching.
4. Optional check: turn on Airplane Mode and reopen the app to confirm itinerary text loads.

## Content contract

Required in markdown:

- A top-level `#` trip title
- Day sections using headings like `## Day 1 (...) - ...`

Optional frontmatter fields:

- `trip_dates`
- `start_location`
- `end_location`
