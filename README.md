# Taloki

Rip packs. Chase legends. A play-money trading card pack opener for the **Astral Beasts** set. No real money is involved anywhere.

## Deploying (GitHub + Netlify)

This is a plain static site: no build step, no dependencies.

**First time**
1. Create a new GitHub repo (for example `taloki`).
2. Upload everything in this folder to the repo root, so `index.html` sits at the top level.
3. In Netlify: **Add new site → Import an existing project → GitHub**, pick the repo.
4. Leave **Build command** empty and set **Publish directory** to `.` (the `netlify.toml` already says this).
5. Deploy. Every push to the repo redeploys automatically.

**Updating**
Replace everything in the repo with the contents of the newest zip, then commit. Don't merge files by hand.

## Project layout

```
index.html              page shell
manifest.webmanifest    lets phones "Add to Home Screen" as an app
netlify.toml            Netlify settings and caching
css/styles.css          all styling
js/data.js              the set: cards, values, tiers, packs, odds
js/app.js               wallet, collection, pack-opening flow
images/brand/           card backs, logo, app icons
images/cards/           card art, named <number>-<name>.webp
```

## How packs work

Five packs, one card each. Every card has one fixed value; the pack decides which card you get.

| Pack | Price | Ascended or better (Normal) |
|---|---|---|
| Starter | $1 | 1 in 48,780 |
| Base | $2 | 1 in 24,390 |
| Pro | $5 | 1 in 9,756 |
| Ultra | $10 | 1 in 2,449 |
| Legendary | $25 | 1 in 816 |
| Mythic | $100 | 1 in 37 |
| Sovereign | $500 | about 1 in 2 |

For the $1–$25 packs, the jackpot is a chance at an Ascended, Apex or Mythic Legend card and lives inside the Gold tier. The $100 and $500 packs cost enough that those cards sit in their regular tiers, so those two packs use their own dollar ranges (see `js/data.js`).

**Pack style (volatility)** is picked on the Packs or Odds tab and applies to every pack:

| Tier | Normal: value (× price) | Normal: chance | High: value (× price) | High: chance |
|---|---|---|---|---|
| Gray | 0.10–0.35× | 25–40% | 0.32–0.40× | 45.9% |
| Green | 0.35–0.95× | 30–45% | 0.40–1.00× | 34.1% |
| Blue | 1.12–1.35× | 14% | 1.04–1.20× | 1.4% |
| Purple | 1.35–1.80× | 8% | 1.20–1.40× | 1.7% |
| Red | 1.80–2.60× | 5% | 1.40–1.80× | 4.4% |
| Gold | 2.60×+ | 3% | 1.80×+ | 12.5% |

Blue is always a small profit. Every pack averages 92% of its price in both styles; High just swings wider. Selling a card back pays 90% of its value. All odds are in `js/data.js`.

**Opening flow:** pick one of six looping packs → swipe across the top to cut it open → a mystery card spins and changes color up to your tier (tap to speed up) → peel the cover off by dragging, or tap to open → result screen with a 3D card you can tilt and flip, then Sell or Keep.

## Evolution lines

Collection → Evolutions shows every creature line (Stage 1 → 2 → 3 → 4) and which stages you own. A line turns gold when you own all four.

## Profile tab

Shows balance, money added, spent on packs, earned from selling, collection value, packs opened, best pull, and a history of your last 100 pulls. Settings there can reset everything. The **+** button adds any amount of play money (up to $100,000 at a time).

## The set: 136 cards

| # | Tier | Status |
|---|---|---|
| 001–010 | Mythic Legend ($10k–$49k, graded) | done |
| 011–021 | Apex Rare, Stage 4 ($3.4k–$9.3k by grade) | done |
| 022–041 | Ascended Rare, Stage 3 ($466–$2,958 by grade) | done |
| 042–046 | Ascended Rare, Basic ($988–$1,468) | done |
| 047–056 | Epic, Stage 2 ($36.71–$199.67) | done |
| 057–071 | Rare (Stage 2 and Basic, $11.75–$32.40) | done |
| 072–081 | Uncommon, Stage 1 ($2.51–$7.73) | done |
| 082–096 | Uncommon ($2.46–$11.49) | 15 still needed |
| 097–136 | Common ($0.11–$2.42) | 40 still needed |

Cards without art yet show as placeholders in packs and as face-down card backs in the collection.

## Full screen on phones

- **iPhone:** open the site in Safari, tap Share, then Add to Home Screen. It then opens full screen like an app. The site shows a reminder banner until you do this or dismiss it.
- **Android:** Chrome offers an Install button in the banner; installed, it runs full screen.
- The home-screen icon is the Taloki eye (`images/brand/app-icon-*.png`). Phones cache icons, so if Taloki was added before this icon existed, delete it from the home screen and add it again.

## Notes

- Balance and collection are saved in the browser on each device (localStorage). Clearing site data resets them.
- Graded cards reveal from the cased card back; ungraded cards reveal from the plain back.
