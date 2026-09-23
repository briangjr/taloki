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

Three packs, one card each: **Starter $1, Base $2, Pro $5**.

Every card has one fixed value. A pack rolls a payout tier, then picks a card whose value sits in that tier for that pack's price:

| Tier | Value (× pack price) | Chance |
|---|---|---|
| Gray | 0.10–0.35× | 43% (36% Pro) |
| Green | 0.35–0.95× | 27% (34% Pro) |
| Blue | 1.12–1.35× (always a small profit) | 14% |
| Purple | 1.35–1.80× | 8% |
| Red | 1.80–2.60× | 5% |
| Gold | 2.60×+ (pricier cards rarer) | 3% |

Gold also holds the jackpot: a small chance at an Ascended, Apex or Mythic Legend. Each pack averages 92% of its price, and selling a card back pays 90% of its value.

Opening flow: pick one of six looping packs → rip it → the tier reel spins and lands → flip the card → keep, sell, or rip again.

## The set: 136 cards

| # | Tier | Status |
|---|---|---|
| 001–010 | Mythic Legend ($10k–$49k, graded) | done |
| 011–021 | Apex Rare, Stage 4 ($3.4k–$9.3k by grade) | done |
| 022–041 | Ascended Rare, Stage 3 ($450–$3k by grade) | done |
| 042–046 | Ascended Rare | 5 still needed (Emberjaw fits here) |
| 047–056 | Epic, Stage 2 ($36–$200) | done |
| 057–061 | Rare, Stage 2 ($12–$32) | done |
| 062–068 | Rare, Basic ($11.75–$19.26) | done except #064 |
| 064, 069–071 | Rare ($25.09–$32.22) | 4 still needed |
| 072–096 | Uncommon ($2.58–$9.47) | 25 still needed |
| 097–136 | Common ($0.13–$2.45) | 40 still needed |

Cards without art yet show as placeholders in packs and as face-down card backs in the collection.

## Notes

- Balance and collection are saved in the browser on each device (localStorage). Clearing site data resets them.
- Graded cards reveal from the cased card back; ungraded cards reveal from the plain back.
