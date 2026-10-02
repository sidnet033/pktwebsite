// Promo box: a pop-up on the home page for exhibitions, awards and other news.
//
// To turn it off, set `enabled: false`.
// To change the pictures, put images in public/promo/ and edit `slides` (3:2 landscape works best).
// One slide shows a single picture; two or more become a carousel.
export const PROMO = {
  enabled: true,
  intervalMs: 5000,
  slides: [
    { src: "/promo/1.jpg", alt: "Meet Pai Kane Transformers at the India Pavilion, MSV Brno 2026, 6 to 9 October, Hall V Booth 126" },
  ],
};
