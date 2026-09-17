# Helix Liquidity

English-language liquidity app for concentrated pools and fee-sharing stakes on **Robinhood Chain** and **Solana**.

The featured token is loaded from `NEXT_PUBLIC_TOKEN_CONTRACT`. The demo address is Donut (`0x1Ad69dDD9D98dD71b6211339A1801fD128A3925D`). Swap that one value for your token’s contract, redeploy, and name / ticker / logo / market stats come from DexScreener and GeckoTerminal.

Helix is not an official Robinhood product.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev -- --port 4317 --hostname 127.0.0.1
```

Open [http://127.0.0.1:4317](http://127.0.0.1:4317).

## Vercel environment variables

Add these in Vercel → Project → Settings → Environment Variables, then **Redeploy**. `NEXT_PUBLIC_` values are baked in at build time.

| Variable | What it does |
| --- | --- |
| `NEXT_PUBLIC_TOKEN_CONTRACT` | Robinhood Chain contract. **This is the one to replace.** Name, ticker, logo, and stats load from it. |
| `NEXT_PUBLIC_TOKEN_CONTRACT_SOL` | Optional Solana mint address |
| `NEXT_PUBLIC_TOKEN_SYMBOL` | Optional ticker override. Empty = use the contract’s ticker |
| `NEXT_PUBLIC_TOKEN_NAME` | Optional name override. Empty = use the contract’s name |
| `NEXT_PUBLIC_TOKEN_LOGO` | Optional HTTPS logo URL. Empty = GeckoTerminal / DexScreener image |
| `NEXT_PUBLIC_X_URL` | X / Twitter profile |
| `NEXT_PUBLIC_DISCORD_URL` | Discord invite |
| `NEXT_PUBLIC_PONS_URL` | Pons (or other launchpad) listing |
| `NEXT_PUBLIC_PONS_ID` | Optional Pons id shown next to the link |
| `NEXT_PUBLIC_TOKEN_INFO` | One-line description on the token page |

Copy `.env.example` as a starting point. The demo contract is already filled in.

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
