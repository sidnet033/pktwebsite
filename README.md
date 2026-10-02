# Pai Kane Transformers website

Next.js site. Run `npm install` then `npm run dev`.

Quote form email settings (set in Vercel, see `.env.example`): `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `QUOTE_TO`. Enquiries are emailed only; nothing is stored.

## Photos
Drop product photos into `public/products/` named `transformers.jpg`, `compact-substations.jpg`, `lv-switchboards.jpg`, `avrs.jpg`. They appear automatically in the home carousel and on each product page. Until then, dark placeholder panels show.

## Product page photos
Each product page has a photo carousel (slides every 5 seconds). Drop images into the matching folder and they appear automatically, in filename order (1.jpg, 2.jpg, ...):
`public/products/transformers/`, `public/products/compact-substations/`, `public/products/lv-switchboards/`, `public/products/avrs/`. Until then a "Photos coming soon" box shows.
