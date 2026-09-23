# Fomo Ping — Robinhood lending (pons-aligned)

EVAA-style supply / borrow app for **Robinhood Chain** (4663). TON is not used. Trading and launches stay on [pons](https://www.ponsfamily.com/launchpad). English UI, Bangla summary on [Docs](/docs).

Not an official Robinhood or pons product. ETH pays gas. The wallet connection can be live; the lending book in this UI is stored in the browser.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev -- --port 4317 --hostname 127.0.0.1
```

Open [http://127.0.0.1:4317](http://127.0.0.1:4317).

## What you can do

- Walk the welcome slides, then **Skip to the App**
- Supply ETH, USDG, PONS, stock tokens, or pons LP
- Borrow against collateral and watch the health factor
- Buy ${PING} / trade on pons from the header
- Still mint a pool shape or deposit a stake

## Environment

See `.env.example`. `NEXT_PUBLIC_PONS_URL` defaults to the pons launchpad. `NEXT_PUBLIC_TOKEN_CONTRACT` still drives the featured PING book from DexScreener.

## Stack

Next.js, TypeScript, Tailwind CSS, shadcn/ui, wagmi / viem on Robinhood Chain.
