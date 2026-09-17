# Helix Liquidity

English-language liquidity app for **HELIX** — concentrated pools and fee-sharing stakes on **Robinhood Chain** and **Solana**. Same product shape as a modern LP terminal: trending/established books, shaped positions, 7-day reward streams.

Helix is not an official Robinhood product.

## Run locally

```bash
npm install
npm run dev -- --port 4317 --hostname 127.0.0.1
```

Open [http://127.0.0.1:4317](http://127.0.0.1:4317).

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
