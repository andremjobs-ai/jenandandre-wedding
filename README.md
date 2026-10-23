# Jennifer & Andre — wedding site

Static site (plain HTML, CSS and JavaScript, no build step). Monday 27 September 2027, Quinta Lago dos Cisnes, Portugal. English and Spanish.

## Structure

- `index.html`, `story.html`, `schedule.html`, `venue.html`, `stay.html`, `rsvp.html`, `faq.html`, `registry.html`
- `assets/css/styles.css` — design (tile-blue palette from the approved Option C)
- `assets/js/i18n.js` — **all copy, English and Spanish.** Edit text here. Anything in `[brackets]` is still a placeholder.
- `assets/js/site.js` — header, footer, language toggle, email welcome screen, RSVP form
- `assets/js/config.js` — form endpoints (see below)

## Run locally

Open `index.html` in a browser, or run `python3 -m http.server` in this folder and visit http://localhost:8000.

## Before launch

1. **Email capture and RSVPs are not saved yet.** Set `emailEndpoint` and `rsvpEndpoint` in `assets/js/config.js` to a form service or small function that writes to a sheet or mailing list (for example Formspree, Google Apps Script, or a Cloudflare Worker). Until then the welcome screen still lets guests in but stores nothing, and the RSVP form says RSVPs are not open yet.
2. Fill in every `[bracketed]` placeholder in `assets/js/i18n.js` and have family review the Spanish.
3. Add real photos (replace the `photo-frame` placeholders).
4. `robots.txt` and a `noindex` tag keep search engines away. Remove both if you ever want the site public in search.

## Notes

- The welcome screen is a soft gate. It collects emails but does not protect the pages from someone who skips it. For real privacy, add a shared passcode or host-level password.
- Hosting: Cloudflare Pages, Netlify or Vercel. Connect this repo, no build command, publish directory is the repo root. Then point the domain (jenandandre2027.com) at the host.
