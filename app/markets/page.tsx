"use client";

import { useMemo, useState } from "react";
import { LendActionDialog, useLendDialog } from "@/components/lend-action";
import { HighestApy, MarketOverview } from "@/components/market-overview";
import { formatUsd } from "@/lib/format";
import type { MarketKind } from "@/lib/types";
import { useLend } from "@/lib/use-lend";

export default function MarketsPage() {
  const { markets, totals } = useLend();
  const dialog = useLendDialog();
  const [tab, setTab] = useState<MarketKind | "all">("all");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return markets;
    return markets.filter(
      (m) =>
        m.symbol.toLowerCase().includes(query) ||
        m.name.toLowerCase().includes(query) ||
        m.address.toLowerCase().includes(query)
    );
  }, [markets, q]);

  return (
    <div className="lend-page">
      <div className="page-lead">
        <h1>Markets</h1>
        <p>
          Every book is on Robinhood Chain. pons pairs sit next to ETH, stables, and stock tokens.
          TVL {formatUsd(totals.tvl, 0)} · borrowed {formatUsd(totals.borrowed, 0)}.
        </p>
      </div>
      <HighestApy markets={filtered} onAct={dialog.open} />
      <div className="lend-markets-head">
        <input
          className="mkt-filter"
          placeholder="Search ETH, PONS, USDG, LP…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Filter markets"
        />
        <div className="seg" role="tablist">
          {(["all", "asset", "lp"] as const).map((k) => (
            <button
              key={k}
              type="button"
              role="tab"
              aria-selected={tab === k}
              className={tab === k ? "on" : ""}
              onClick={() => setTab(k)}
            >
              {k === "all" ? "All" : k === "lp" ? "pons LP" : "Assets"}
            </button>
          ))}
        </div>
      </div>
      <MarketOverview kind={tab} onAct={dialog.open} markets={filtered} />
      <LendActionDialog
        market={dialog.market}
        action={dialog.action}
        open={dialog.visible}
        onOpenChange={dialog.onOpenChange}
      />
    </div>
  );
}
