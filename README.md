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
