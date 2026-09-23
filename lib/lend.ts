import { MIN_HEALTH } from "@/lib/markets";
import type { LendAction, LendBag, LendBook, Market } from "@/lib/types";

export type LendSnapshot = {
  books: LendBook[];
  bag: LendBag;
  suppliedUsd: number;
  borrowedUsd: number;
  collateralUsd: number;
  borrowPowerUsd: number;
  availableUsd: number;
  health: number;
  netApy: number;
  safe: boolean;
};

export function bookFor(books: LendBook[], marketId: string): LendBook {
  return (
    books.find((b) => b.marketId === marketId) ?? {
      marketId,
      supplied: 0,
      borrowed: 0,
      collateral: true,
    }
  );
}

export function utilization(market: Market): number {
  if (market.totalSupplyUsd <= 0) return 0;
  return Math.min(1, market.totalBorrowUsd / market.totalSupplyUsd);
}

export function healthFactor(markets: Market[], books: LendBook[]): number {
  let col = 0;
  let bor = 0;
  for (const b of books) {
    const m = markets.find((x) => x.id === b.marketId);
    if (!m) continue;
    if (b.collateral) col += b.supplied * m.priceUsd * m.liqThreshold;
    bor += b.borrowed * m.priceUsd;
  }
  if (bor <= 0) return Number.POSITIVE_INFINITY;
  return col / bor;
}

export function snapshot(markets: Market[], books: LendBook[], bag: LendBag): LendSnapshot {
  let suppliedUsd = 0;
  let borrowedUsd = 0;
  let collateralUsd = 0;
  let borrowPowerUsd = 0;
  let supplyYield = 0;
  let borrowCost = 0;

  for (const b of books) {
    const m = markets.find((x) => x.id === b.marketId);
    if (!m) continue;
    const sUsd = b.supplied * m.priceUsd;
    const bUsd = b.borrowed * m.priceUsd;
    suppliedUsd += sUsd;
    borrowedUsd += bUsd;
    supplyYield += sUsd * (m.supplyApy / 100);
    borrowCost += bUsd * (m.borrowApy / 100);
    if (b.collateral) {
      collateralUsd += sUsd;
      borrowPowerUsd += sUsd * m.ltv;
    }
  }

  const health = healthFactor(markets, books);
  const availableUsd = Math.max(0, borrowPowerUsd - borrowedUsd);
  const netApy = suppliedUsd + borrowedUsd > 0 ? ((supplyYield - borrowCost) / Math.max(suppliedUsd, 1)) * 100 : 0;

  return {
    books,
    bag,
    suppliedUsd,
    borrowedUsd,
    collateralUsd,
    borrowPowerUsd,
    availableUsd,
    health,
    netApy,
    safe: !Number.isFinite(health) || health >= MIN_HEALTH,
  };
}

export function upsertBook(books: LendBook[], next: LendBook): LendBook[] {
  const empty = next.supplied <= 0 && next.borrowed <= 0;
  const rest = books.filter((b) => b.marketId !== next.marketId);
  return empty ? rest : [next, ...rest];
}

export function applyAction(
  markets: Market[],
  books: LendBook[],
  bag: LendBag,
  action: LendAction,
  marketId: string,
  amount: number
): { ok: true; books: LendBook[]; bag: LendBag } | { ok: false; error: string } {
  const market = markets.find((m) => m.id === marketId);
  if (!market) return { ok: false, error: "Unknown market." };
  if (!(amount > 0) || !Number.isFinite(amount)) return { ok: false, error: "Enter an amount." };

  const book = { ...bookFor(books, marketId) };
  const nextBag = { ...bag };
  const walletAmt = nextBag[marketId] ?? 0;

  if (action === "supply") {
    if (amount > walletAmt + 1e-12) return { ok: false, error: "Not enough balance in wallet." };
    book.supplied += amount;
    nextBag[marketId] = walletAmt - amount;
    if (market.canCollateral) book.collateral = true;
  } else if (action === "withdraw") {
    if (amount > book.supplied + 1e-12) return { ok: false, error: "Cannot withdraw more than supplied." };
    book.supplied -= amount;
    nextBag[marketId] = walletAmt + amount;
  } else if (action === "borrow") {
    const current = snapshot(markets, books, bag);
    if (amount * market.priceUsd > current.availableUsd + 0.5) {
      return { ok: false, error: "Above the available borrow limit." };
    }
    const fee = amount * market.originationFee;
    const credit = amount - fee;
    book.borrowed += amount;
    nextBag[marketId] = walletAmt + credit;
  } else if (action === "repay") {
    const pay = Math.min(amount, book.borrowed, walletAmt);
    if (pay <= 0) return { ok: false, error: "Nothing to repay, or wallet is empty." };
    book.borrowed -= pay;
    nextBag[marketId] = walletAmt - pay;
  }

  const nextBooks = upsertBook(books, book);
  const health = healthFactor(markets, nextBooks);
  if (Number.isFinite(health) && health < MIN_HEALTH) {
    return {
      ok: false,
      error:
        action === "borrow"
          ? "That borrow would drop health below 1.05."
          : action === "withdraw"
            ? "Withdrawing that much would put the position near liquidation."
            : "This action would make the position unsafe.",
    };
  }

  return { ok: true, books: nextBooks, bag: nextBag };
}

export function toggleCollateral(
  markets: Market[],
  books: LendBook[],
  marketId: string,
  on: boolean
): { ok: true; books: LendBook[] } | { ok: false; error: string } {
  const market = markets.find((m) => m.id === marketId);
  if (!market) return { ok: false, error: "Unknown market." };
  if (on && !market.canCollateral) return { ok: false, error: "This asset cannot be collateral." };
  const book = { ...bookFor(books, marketId), collateral: on };
  if (book.supplied <= 0 && book.borrowed <= 0) {
    return { ok: true, books: books.filter((b) => b.marketId !== marketId) };
  }
  const next = upsertBook(books, book);
  const health = healthFactor(markets, next);
  if (!on && Number.isFinite(health) && health < MIN_HEALTH) {
    return { ok: false, error: "Turning collateral off would liquidate the position." };
  }
  return { ok: true, books: next };
}

export function accrueBooks(markets: Market[], books: LendBook[], from: number, to: number): LendBook[] {
  const years = Math.max(0, (to - from) / (365.25 * 24 * 60 * 60 * 1000));
  if (years <= 0) return books;
  return books.map((b) => {
    const m = markets.find((x) => x.id === b.marketId);
    if (!m) return b;
    return {
      ...b,
      supplied: b.supplied * (1 + (m.supplyApy / 100) * years),
      borrowed: b.borrowed * (1 + (m.borrowApy / 100) * years),
    };
  });
}

export function formatHealth(h: number): string {
  if (!Number.isFinite(h)) return "∞";
  if (h >= 100) return "99+";
  return h.toFixed(2);
}

export function healthTone(h: number): "safe" | "watch" | "danger" {
  if (!Number.isFinite(h) || h >= 2) return "safe";
  if (h >= 1.25) return "watch";
  return "danger";
}

export function maxAmount(
  action: LendAction,
  market: Market,
  book: LendBook,
  bag: LendBag,
  snap: LendSnapshot
): number {
  const walletAmt = bag[market.id] ?? 0;
  if (action === "supply") return Math.max(0, walletAmt);
  if (action === "withdraw") {
    if (snap.borrowedUsd <= 0) return book.supplied;
    const lockedUsd = Math.max(0, snap.borrowedUsd / Math.max(market.liqThreshold, 0.01) - (snap.collateralUsd - (book.collateral ? book.supplied * market.priceUsd : 0)));
    const free = book.supplied - lockedUsd / market.priceUsd;
    return Math.max(0, Math.min(book.supplied, free));
  }
  if (action === "borrow") {
    return Math.max(0, snap.availableUsd / market.priceUsd);
  }
  return Math.max(0, Math.min(book.borrowed, walletAmt));
}
