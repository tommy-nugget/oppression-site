# Oppression — band website

Static site for the black metal band Oppression. Built with Astro + Decap CMS
(git-based, no-code admin). The person running this project is **not a
developer** — explain things plainly, avoid jargon, and default to safe,
reversible changes.

## Stack & principles

- Astro (static site generator), no server/database.
- Content lives in `src/content/` as markdown/JSON files (Astro content
  collections, schema in `src/content/config.ts`).
- `public/admin/` is the Decap CMS no-code admin (not yet connected to
  GitHub — deployment is intentionally deferred until the site looks right).
- No e-commerce: merch and discography always link out to Bandcamp /
  label / distributor pages.
- Keep dependencies minimal. Avoid introducing a backend/database.

## Design language

- Dark theme, black-metal aesthetic but "pro/modern", not raw/grunge.
- Colors (see `src/styles/global.css` `:root`): `--bg:#0b0b0a`,
  `--surface:#131210`, `--ink:#ece7da`, `--muted:#8f8874`,
  `--accent:#7a1f1f`, `--line:#262320`.
- Fonts: 'Oswald' (body/UI), 'UnifrakturMaguntia' (was used for a
  text-based wordmark, now replaced by the real logo image).
- All real photos get a uniform `.photo-treated` CSS filter (reduced
  saturation/contrast) to unify tone — never edit the photo files
  themselves for this, keep it as a CSS filter (reversible, applies to
  future photos automatically).
- The person is sensitive about **pixel-level photo editing** — a
  previous attempt to extract transparency from a JPEG looked noisy and
  was rejected. Prefer CSS techniques (filters, blend modes) over
  re-processing image files. If a file genuinely needs re-processing
  (resize, real transparency from a clean PNG), explain what and why in
  plain terms before doing it.
- Logo: `public/images/brand/logo.png` (transparent PNG, white ink).
  Placed small, in a corner of photos — avoid covering faces. The exact
  safe zone depends on each photo's composition; check before placing.

## Site structure

Pages (`src/pages/`): Home (`index.astro`), Bio, Shows (concerts),
Reviews, Discography, Merch, Gallery, Contact. Shared chrome in
`src/layouts/Layout.astro` (nav + footer, footer social links pulled from
`src/content/site/main.json`).

Content collections (`src/content/config.ts`):
- `concerts` — date, city, country, venue, eventName, poster, ticketLink,
  lineup (free text). Upcoming/past split and sorted automatically by
  date in `shows.astro` — no manual flag for that. Cancelled/postponed
  shows: edit into the event name (e.g. "CANCELLED — ..."), no separate
  status field.
- `reviews` — outlet, language (free text e.g. "FR"/"EN"), excerpt (kept
  in original language, not translated), link, logo.
- `discography` — title, releaseType, releaseDate, cover, label, `links`
  (free list of name+url, for streaming/purchase), `videos` (free list of
  title+url — used for embedding official YouTube videos, e.g. full
  album on a promo channel, singles on the label's channel), `featured`
  boolean (drives the "latest release" home page block).
- `merch` — name, category, photo, description, shopLink (always
  external — no cart/checkout on this site).
- `members` — name, instrument, photo, bio. Real band lineup: G.S.V.
  (vocals), Tom L. (guitar), Predark (guitar), John (drums), Désert
  (bass).
- `gallery` (singleton, `src/content/gallery/main.json`) — one ordered
  list of photos (not grouped by concert): image, category (live /
  backstage / atmosphere / promo / personal), relatedConcert (optional
  reference to `concerts`), caption, credit, featured (renders full-width
  as a "photo journal" break in the masonry). Deliberately a single file
  rather than one-file-per-photo so editors can drag-reorder photos
  natively in the Decap list widget — the display order is curated by
  hand (mixing live/backstage/atmosphere/promo), not sorted by date.
  Rendered as a CSS-columns masonry on `gallery.astro` with a hover
  filter (desaturate/darken at rest, full color on hover — deliberately
  NOT the sitewide `.photo-treated` filter, since the gallery is meant
  to stay visually heterogeneous) and a small vanilla-JS lightbox
  (prev/next/close, no external library).
- `site` (singleton, `src/content/site/main.json`) — bioText, bioPhoto,
  bandEmail, labelEmail, socialLinks (free list of name+url — covers
  social networks AND streaming platforms in one place, no separate
  fields per platform).

## Status / what's done vs pending

Done: full page skeleton, content model, Decap admin config, real logo,
real band photos (home hero + bio), real member photos and roles.

Pending / known placeholders: bio text (still a placeholder sentence),
concert/discography/merch/gallery entries are still example content, not
final. GitHub repo + Cloudflare Pages deployment has not been set up yet
— intentionally deferred until the site content/design is in good shape.
Site language is English throughout (nav renamed "concerts" → "shows").

## Workflow notes

- Site was being developed by having Claude (in claude.ai chat) edit this
  project and hand back a zip after each change, which the person
  downloaded, extracted (overwriting the previous folder), and ran
  locally with `npm install` / `npm run dev`. Moving to Claude Code now
  specifically to remove that zip round-trip — edit files directly in
  this folder instead.
- The person already has Node.js installed and this project's
  `node_modules` set up locally; `npm run dev` should already work.
