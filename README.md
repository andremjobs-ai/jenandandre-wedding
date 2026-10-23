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

1. **Email capture (Mailchimp).** In Mailchimp, create an audience, then Audience > Signup forms > Embedded forms, and copy the form `action` URL into `mailchimpAction` in `assets/js/config.js`. The welcome screen then adds each email to that audience.
2. **RSVPs (Google Sheet).** The sheet "Jennifer & Andre Wedding RSVPs" (tab `RSVPs`) has columns Timestamp, Name, Email, Attending, Party size, Dietary requirements, Message, Language. A small Google Apps Script web app attached to the sheet receives the form post and appends a row; paste its URL into `rsvpEndpoint`. Until then the RSVP form says RSVPs are not open yet.
3. Fill in every `[bracketed]` placeholder in `assets/js/i18n.js` and have family review the Spanish.
4. Add real photos (replace the `photo-frame` placeholders).
5. `robots.txt` and a `noindex` tag keep search engines away. Remove both if you ever want the site public in search.

## Notes

- The welcome screen is a soft gate. It collects emails but does not protect the pages from someone who skips it. For real privacy, add a shared passcode or host-level password.
- Hosting: Cloudflare Pages, Netlify or Vercel. Connect this repo, no build command, publish directory is the repo root. Then point the domain (jenandandre2027.wedding) at the host.
