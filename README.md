# josephadams.dev

Personal site for Joseph Adams — software engineering and consulting, focused on
systems and API integration.

Plain static HTML, CSS, and a little vanilla JavaScript. No build step, no framework,
no dependencies to install.

## Structure

```
index.html            the whole site (single page)
assets/css/style.css  design system + all styling
assets/js/main.js     footer year, live GitHub star counts
assets/img/           headshot, project logos, favicon
robots.txt
sitemap.xml
```

## Local preview

Any static server works:

```
python3 -m http.server 8000
```

Then open http://localhost:8000

## Notes

- **Live stats.** `main.js` pulls repo counts and star totals from the *public* GitHub API
  on page load (private repos are never returned). The numbers hard-coded in `index.html`
  are the fallback if the API is rate-limited or unreachable, so keep them roughly current.
- **Project logos** live in `assets/img/`. Monochrome ones (ScriptLauncher, MIDI Bridge)
  carry the `logo-mono` class so they invert in dark mode; full-colour logos must not.
- **Star badges** are optional per card. Add `<span class="stars" data-repo="repo-name">★ N</span>`
  and the JS keeps it current, hiding it automatically at zero stars.
- **Dark mode** follows the visitor's system setting via `prefers-color-scheme`.
- **Fonts** are Fraunces, Inter, and JetBrains Mono from Google Fonts. To drop the
  external request, self-host them in `assets/fonts/` and swap the `<link>` for
  `@font-face` rules.
- **No trackers or cookies.**

## Deploying

Anything that serves static files will do — GitHub Pages, Netlify, Cloudflare Pages, or
an S3 bucket. For GitHub Pages with the custom domain, add a `CNAME` file containing
`josephadams.dev` and point the domain's DNS at GitHub.
