"use client";

import { useMemo } from "react";
import { useAppState } from "@/lib/app-state";
import { bookFor, snapshot } from "@/lib/lend";
import { marketById, overlayMarkets, protocolTotals } from "@/lib/markets";
import type { Market } from "@/lib/types";

export function useLend() {
  const {
    live,
    wallet,
    lendBooks,
    lendBag,
    runLend,
    setCollateral,
    ready,
  } = useAppState();

  const markets = useMemo(() => overlayMarkets(live), [live]);
  const snap = useMemo(
    () => snapshot(markets, lendBooks, lendBag),
    [markets, lendBooks, lendBag]
  );
  const totals = useMemo(() => protocolTotals(markets), [markets]);

  const view = (market: Market) => {
    const book = bookFor(lendBooks, market.id);
    const walletAmt = lendBag[market.id] ?? 0;
    return {
      market,
      book,
      walletAmt,
      suppliedUsd: book.supplied * market.priceUsd,
      borrowedUsd: book.borrowed * market.priceUsd,
      walletUsd: walletAmt * market.priceUsd,
    };
  };

  return {
    ready,
    wallet,
    markets,
    snap,
    totals,
    view,
    marketById: (id: string) => {
      const found = marketById(id);
      if (!found) return undefined;
      return markets.find((m) => m.id === found.id) ?? found;
    },
    runLend,
    setCollateral,
  };
}
