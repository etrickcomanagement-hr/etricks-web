# eTricks website

Marketing website for **eTricks**, an eCommerce agency based in Multan, Pakistan. Built with React, Vite, Framer Motion, Lenis (smooth scroll) and three.js.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```

## Pages

| Route | Page |
|---|---|
| `/` | Home |
| `/services` | Services |
| `/management` | E-commerce management |
| `/about` | About, founder, markets |
| `/team` | Team, with a profile for each person |
| `/talk` | Book a free call |
| `/contact` | Contact form |

## Where to change things

Almost all text and details live in **`src/data.js`**:

- `CONTACT`: email, WhatsApp number, social links
- `FOUNDER`, `TEAM`: names, roles, bios, photos (`facts` is optional and shows extra details in a profile)
- `SERVICES`, `PLATFORM_DETAIL`, `MANAGE_PLATFORMS`, `FAQS`: services and platform copy
- `BOOKING`: days and time slots for the call booking dialog
- `OFFICE`: office photo

Images are in `public/`. Replace a file with the same name to swap a photo. The office and "Our Markets" photos (`office.webp`, `about-a.webp`, `about-b.webp`) are free stock photos from Pexels and should be replaced with real eTricks photos.

## Deploy

It is a static site (no server needed). On any host:

- **Build command:** `npm run build`
- **Output folder:** `dist`
- **Node:** 20 or newer

Routes like `/about` are handled by the browser app, so the host must send every path to `index.html`. This is already set up:

- **Vercel:** `vercel.json`
- **Netlify and Cloudflare Pages:** `public/_redirects`

To use the domain etricks.co, add it in the host's domain settings and point the DNS records to the host.

## Notes

- **Forms:** the contact form and call booking send enquiries to `hello@etricks.co` through [FormSubmit](https://formsubmit.co). The first submission triggers an activation email to that address, which must be confirmed once.
- **Fonts:** DM Sans and DM Mono from Google Fonts.
- **Platform logos** (Amazon, eBay, TikTok Shop, Etsy, Walmart, Shopify, Temu) are simple wordmarks drawn in code, not the official logo files.
- three.js and the world-map data load on demand, so the first page load stays light.

## Structure

```
src/
  App.jsx            routes, menu, footer, page transitions
  pages.jsx          Home, About, Services, Team, Contact
  management.jsx     Management page
  talk.jsx           Book a call page and booking dialog
  teamprofile.jsx    Team cards and profile dialog
  globalreach.jsx    Global Reach section (uses Globe.jsx)
  showcase.jsx       About page "Our Markets" section
  data.js            content
  *.css              styles (sans-headings.css is loaded last)
```
