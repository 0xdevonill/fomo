# Helix Liquidity

English-language liquidity app for **HELIX** — concentrated pools and fee-sharing stakes on **Robinhood Chain** and **Solana**.

Helix is not an official Robinhood product.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev -- --port 4317 --hostname 127.0.0.1
```

Open [http://127.0.0.1:4317](http://127.0.0.1:4317).

## Vercel environment variables

Add these in Vercel → Project → Settings → Environment Variables, then **Redeploy**. The live site reads them at build time.

| Variable | What it does |
| --- | --- |
| `NEXT_PUBLIC_TOKEN_SYMBOL` | Ticker shown in the hero and tables (default `HELIX`) |
| `NEXT_PUBLIC_TOKEN_NAME` | Display name |
| `NEXT_PUBLIC_TOKEN_CONTRACT` | Robinhood Chain contract address |
| `NEXT_PUBLIC_TOKEN_CONTRACT_SOL` | Solana mint address |
| `NEXT_PUBLIC_TOKEN_LOGO` | HTTPS URL of your token logo. Empty uses the built-in mark |
| `NEXT_PUBLIC_X_URL` | X / Twitter profile |
| `NEXT_PUBLIC_DISCORD_URL` | Discord invite |
| `NEXT_PUBLIC_PONS_URL` | Pons (or other launchpad) listing |
| `NEXT_PUBLIC_PONS_ID` | Optional Pons id shown next to the link |
| `NEXT_PUBLIC_TOKEN_INFO` | One-line description on the token page |

Copy `.env.example` as a starting point.

## What you can do

- Switch **Robinhood / SOL** from the top bar
- Search tokens, sort trending and established books, change 1h / 24h / 7d
- Open a pool, pick a shape, mint a position (demo wallet — stored in this browser)
- Deposit into a stake or attach a new one
- Toggle dark / light
- Read Docs and Academy in full English

Wallet connect is a local demo. No seed phrase is ever requested. No mainnet transaction is sent.

## Stack

Next.js, TypeScript, Tailwind CSS, shadcn/ui.
