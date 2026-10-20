# VacumeSound (demo site)

VacumeSound is a **fictional** interior design studio website, built as a multi-page static app with
Vite, React, JavaScript (JSX), Tailwind CSS, React Router (hash routing), Lucide React and Framer Motion.

All content (projects, people, testimonials, prices, phone, email, address) is **sample data**.
Images are generated illustrations, not photographs. This is not a real business.

## Pages

Home, About, Services (+ 6 service detail pages), Projects (filter/search/sort, + detail pages with gallery
and lightbox), Blog (+ article pages), Contact, Search results, Saved / recently viewed, FAQ, Settings, 404.
Every page ends with a small ad placeholder strip. Video areas are intentionally blank squares.

## Run locally

```bash
npm install
npm run dev        # development server
npm run build      # production build into dist/
npm run preview    # preview the production build
```

## Deploy to GitHub Pages (GitHub Actions only)

1. Create a repository (for example `vacumesound`) under your GitHub account and push this project to `main`:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/Aman22kr/vacumesound.git
   git push -u origin main
   ```
2. In the repository: **Settings -> Pages -> Build and deployment -> Source: GitHub Actions**.
3. The workflow in `.github/workflows/deploy.yml` builds and publishes `dist/` on every push to `main`.
   The site appears at `https://aman22kr.github.io/vacumesound/`.

Routing uses the URL hash (`#/projects`), so refreshes and direct links work on GitHub Pages without
server rewrites. `vite.config.js` uses a relative base (`./`), so it works under any repository name.
To force an absolute base instead, build with `VITE_BASE=/your-repo/ npm run build`.

`package-lock.json` is created by your first `npm install`; commit it afterwards.

## Quick Settings

Edit `src/config/site.js` to change the brand name, tagline, placeholder contact details, storage prefix,
default animation settings and navigation. Content lives in `src/data/`.

## localStorage

Stored under the prefix `vacumesound:v1:`: theme, animation settings, saved items, recently viewed,
search history, contact-form draft and demo enquiries. Invalid or outdated values fall back to defaults.
localStorage is per browser and per device: it does not sync and is not an account. Passwords, payment
details and other sensitive data are never stored.

## Animation

Settings page: speed (off / slow / normal / fast) and intensity (subtle / medium / strong).
Defaults: normal speed, strong intensity. The system "reduce motion" setting is respected.

## Demo limitations

- The contact form saves only in your browser; nothing is sent anywhere.
- No login, cart, payment or backend exists.
- Contact details, testimonials and projects are fictional placeholders.
- The ad strip is a placeholder, not connected to an ad network.

## Testing status

This source was written without the ability to install dependencies or run a build in the authoring
environment (the npm registry was blocked). It has **not** been built, run or browser-tested.
Run `npm install && npm run build && npm run preview` and check each route before publishing.
