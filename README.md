# Oppression — site source

## Run locally (needs Node.js 18+)
```
npm install
npm run dev
```
Then open the local address shown in the terminal.

## How content works
Every piece of content (shows, reviews, discography, merch, members, gallery, site settings) lives as a
file under `src/content/`. The pages in `src/pages/` read that content automatically — nothing to touch
there when you add or edit a show, a review, etc.

## Admin (Decap CMS)
`public/admin/` holds the no-code admin. It needs a GitHub repository (to store the site) and Git Gateway
via Netlify Identity (or a GitHub OAuth app) to authenticate — set this up once, at deployment time.

## Deploying
Push this project to a GitHub repository, then connect it to Cloudflare Pages (build command: `npm run
build`, output directory: `dist`). Every edit made through `/admin` will trigger a new automatic deploy.

## Images
Placeholder blocks are used everywhere for now. Once real photos/covers/posters are ready, they can be
uploaded directly through the admin — no code changes needed.
