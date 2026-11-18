# SF Cello Choir

Static site for the SF Cello Choir: one page, no build step.

- `index.html` is the whole site. Edit it directly.
- `assets/css/style.css` holds the styles; `assets/js/main.js` turns the YouTube thumbnails into players on click.
- `.nojekyll` tells GitHub Pages to serve the files as they are.

## Publishing at sfcellochoir.org

The domain is registered at GoDaddy. The repo is `alex2awesome/sf-cello-choir`, published from `main` with GitHub Pages at https://alex2awesome.github.io/sf-cello-choir/ until the domain is attached.

1. Done: repo created and Pages enabled (source "Deploy from a branch", branch `main`, folder `/ (root)`).
2. After the DNS records below resolve, set the custom domain: repo Settings, Pages, Custom domain `sfcellochoir.org` (GitHub commits a `CNAME` file). Tick "Enforce HTTPS" once the certificate has been issued, a few minutes to an hour later. Setting the domain earlier would make the github.io address redirect to a domain that does not resolve yet.
3. In GoDaddy (Domain Portfolio, the domain, DNS, DNS Records), replace the parked `@` A record with these four A records, and point `www` at the Pages host:

   | Type  | Name | Value                      |
   |-------|------|----------------------------|
   | A     | @    | 185.199.108.153            |
   | A     | @    | 185.199.109.153            |
   | A     | @    | 185.199.110.153            |
   | A     | @    | 185.199.111.153            |
   | CNAME | www  | alex2awesome.github.io     |

   Leave the `_domainconnect` record alone, and turn off any GoDaddy "forwarding" on the domain. Optional AAAA records for `@`: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`.
4. Optional but recommended: in the GitHub account settings, Pages, "Add a domain", verify `sfcellochoir.org` with the TXT record GitHub shows. This stops anyone else from pointing a Pages site at the domain.
5. Check with `dig +short sfcellochoir.org` (should list the four addresses) and open https://sfcellochoir.org.

If the site should live under a different GitHub account, swap the account name in the `www` record.
