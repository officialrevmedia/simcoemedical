# Simcoe Medical Clinic

Static website for Simcoe Medical Clinic in central Oshawa. Plain HTML, CSS, and
vanilla JavaScript, ready for GitHub Pages. No build step and no dependencies.

## Files
- index.html      Main page
- styles.css      Styles
- script.js       Interactions (menu, scroll reveals, FAQ, scroll progress, back to top)
- logo.png        Clinic logo and favicon
- images/         Photos used on the page
- new-patient-registration.pdf   Fillable registration form, linked from the Download button
- sitemap.xml     Sitemap for search engines
- robots.txt      Crawler rules
- CNAME           Custom domain for GitHub Pages (www.simcoemedical.ca)
- .nojekyll       Tells GitHub Pages to serve the files as is

## Deploy with GitHub Pages
1. Create a repository and upload everything in this folder to the repository root.
2. Open Settings, then Pages.
3. Under Build and deployment, set Source to Deploy from a branch, branch main, folder /(root).
4. Save. The site publishes in a minute or two.

## Custom domain
The CNAME file points the site at www.simcoemedical.ca. If you want to test on the
github.io address first, delete the CNAME file, then set the domain later under
Settings, Pages, Custom domain. Point the domain DNS at GitHub Pages before going live.

## Booking
The booking buttons open the clinic booking system at
https://app.avaros.ca/av/weblink/simcoe in a new tab.

## Still to add before launch
- Add a 1200 by 630 share image at /og-image.jpg (referenced for social link previews).
- Three real Google reviews are in place. Optionally connect a live feed later so new reviews appear automatically.
- Set the Privacy Policy and Accessibility links in the footer.

## Notes
The embedded Google Map and Google Fonts load over the internet, so they appear only
when the page is served from a real domain or local server, not when opening the file
directly from disk.

---

## Changelog - 26 July 2026

**Dual booking buttons.** Every booking call to action is now a pair. Male doctor bookings go to
`https://app.avaros.ca/av/weblink/simcoe` and female doctor bookings to
`https://app.avaros.ca/av/weblink/simcoemc`. Both links appear 23 times across the site and are always
paired. Locations: header (segmented `.book-pair`), mobile menu, hero, services CTA, forms band,
booking options grid, visit card, final CTA, mobile sticky bar, article sidebars, and blog index.

Note: the female URL was supplied as `.../simcoemc|` with a trailing pipe character. That was treated
as a typo and the pipe was dropped. Confirm the link works before going live.

**Clinic fax removed.** `(905) 215-2145` is gone from the visit card, the footer, and the
`faxNumber` field in the MedicalClinic schema. The two physician fax numbers and the pharmacy fax
(905) 579-0845 were left in place, since only the clinic fax was flagged for removal.

**Oshawa Advance Imaging.** Linked from the on-site Ultrasound card, the footer Explore column,
the blog index, and inside both articles. Also declared in the homepage schema via `isRelatedTo`.

**Patient guides (blog) added.** Three new pages:

| File | Purpose |
| --- | --- |
| `blog.html` | Guide index |
| `find-a-family-doctor-oshawa-durham-region.html` | Published 13 Jul 2026 |
| `walk-in-clinic-pharmacist-or-emergency-room-oshawa.html` | Published 21 Jul 2026 |

A Guides link was added to the desktop nav, mobile menu, and footer, and a two-card guides section
was added to the homepage above the final CTA. Sub-page nav anchors are rewritten to `index.html#...`
so they return to the homepage correctly.

**Article components** (see the BLOG section at the end of `styles.css`): `.keypoints` TL;DR box,
`.tbl-wrap` responsive tables with a mobile scroll hint, `.art-steps` numbered timeline,
`.levels` four-level care ladder, `.chips` condition tags, `.alert` and `.note` callouts,
`.side-card` sticky contents, `.post-card` index cards.

**Dead code removed.** `script.js` contained a `[data-booking]` click handler that fired a
placeholder `alert()` reading "connect your booking system link here." No element used the attribute,
but it was a live landmine. Replaced with the article table-of-contents behaviour.

**SEO.** Titles trimmed to 46-59 characters and descriptions to 151-168 so neither truncates.
Sitemap rebuilt with all four URLs. Each article carries BlogPosting, BreadcrumbList and FAQPage
JSON-LD with the clinic as MedicalClinic publisher.
