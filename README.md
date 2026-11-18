# SF Cello Choir

Static site for the SF Cello Choir: one page, no build step.

- `index.html` is the whole site. Edit it directly.
- `assets/css/style.css` holds the styles; `assets/js/main.js` turns the YouTube thumbnails into players on click.
- `.nojekyll` tells GitHub Pages to serve the files as they are.

To publish on GitHub Pages: push to a repo, enable Pages on the `main` branch, then add a `CNAME` file containing the domain and point the domain's DNS at GitHub (an `A`/`AAAA` record set for the apex, or a `CNAME` for `www`).
