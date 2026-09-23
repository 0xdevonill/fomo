"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { HealthRing } from "@/components/health-ring";
import { LendActionDialog, useLendDialog } from "@/components/lend-action";
import { HighestApy, MarketOverview } from "@/components/market-overview";
import { TokenIcon } from "@/components/token-icon";
import { WalletButton } from "@/components/wallet-button";
import { formatAmt, formatApy, formatUsd } from "@/lib/format";
import { formatHealth, healthTone } from "@/lib/lend";
import type { LendAction, Market, MarketKind } from "@/lib/types";
import { useLend } from "@/lib/use-lend";

export function LendDashboard() {
  const { wallet, markets, snap, view, setCollateral } = useLend();
  const dialog = useLendDialog();
  const [tab, setTab] = useState<MarketKind | "all">("all");

  const supplied = markets
    .map(view)
    .filter((v) => v.book.supplied > 0);
  const borrowed = markets
    .map(view)
    .filter((v) => v.book.borrowed > 0);

  const open = (market: Market, action: LendAction) => dialog.open(market, action);
  const pickSupply = () => {
    const first = markets.find((m) => (snap.bag[m.id] ?? 0) > 0) ?? markets[0];
    if (first) open(first, "supply");
  };
  const pickBorrow = () => {
    const first = markets.find((m) => m.category === "stable") ?? markets[0];
    if (first) open(first, "borrow");
  };

  return (
    <div className="lend-page">
      <div className="lend-hero">
        <div>
          <p className="lend-kicker">Robinhood Chain · pons aligned</p>
          <h1>Dashboard</h1>
          <p>
            Supply assets to earn a variable APY. Use them as collateral and borrow ETH, USDG,
            PONS, or stock tokens. Health factor stays above 1.00 to avoid liquidation.
          </p>
        </div>
        <div className={`lend-health-card tone-${healthTone(snap.health)}`}>
          <HealthRing health={snap.health} />
          <dl>
            <div>
              <dt>Net APY</dt>
              <dd className={snap.netApy >= 0 ? "pos" : "neg"}>{formatApy(snap.netApy)}</dd>
            </div>
            <div>
              <dt>Health factor</dt>
              <dd>{formatHealth(snap.health)}</dd>
            </div>
            <div>
              <dt>Borrow power</dt>
              <dd>{formatUsd(snap.borrowPowerUsd)}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="lend-cols">
        <section className="lend-card">
          <header>
            <div>
              <h2>Your supplies</h2>
              <p>{formatUsd(snap.suppliedUsd)} supplied</p>
            </div>
            <button type="button" className="icon-plus" onClick={pickSupply} aria-label="Supply an asset">
              <Plus size={16} />
            </button>
          </header>
          {!wallet ? (
            <div className="lend-empty">
              <p>Connect a wallet to supply on Robinhood Chain. Never a seed phrase.</p>
              <WalletButton />
            </div>
          ) : supplied.length === 0 ? (
            <div className="lend-empty">
              <p>Nothing supplied yet. Deposit ETH, USDG, PONS, or a pons LP to start earning.</p>
              <button type="button" className="btn btn-ping btn-sm" onClick={pickSupply}>
                Supply
              </button>
            </div>
          ) : (
            <ul className="lend-list">
              {supplied.map((v) => (
                <li key={v.market.id}>
                  <TokenIcon symbol={v.market.symbol} size={30} />
                  <div className="lend-list-meta">
                    <b>{v.market.symbol}</b>
                    <span>
                      {formatAmt(v.book.supplied)} · {formatUsd(v.suppliedUsd)}
                    </span>
                  </div>
                  <em className="pos">{formatApy(v.market.supplyApy)}</em>
                    <label className="col-toggle">
                      <input
                        type="checkbox"
                        checked={v.book.collateral}
                        onChange={(e) => setCollateral(v.market.id, e.target.checked)}
                      />
                      Collateral
                    </label>
                  <div className="mkt-acts">
                    <button type="button" className="btn btn-soft btn-sm" onClick={() => open(v.market, "supply")}>
                      +
                    </button>
                    <button type="button" className="btn btn-ghost btn-sm" onClick={() => open(v.market, "withdraw")}>
                      −
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="lend-card">
          <header>
            <div>
              <h2>Available to borrow</h2>
              <p>{formatUsd(snap.availableUsd)} available</p>
            </div>
            <button type="button" className="btn btn-borrow btn-sm" onClick={pickBorrow}>
              Borrow
            </button>
          </header>
          {!wallet ? (
            <div className="lend-empty">
              <p>Supply collateral first, then borrow. Interest is variable with utilization.</p>
            </div>
          ) : borrowed.length === 0 && snap.availableUsd <= 0 ? (
            <div className="lend-empty">
              <p>Enable collateral on a supply to unlock borrow power.</p>
            </div>
          ) : (
            <ul className="lend-list">
              {borrowed.map((v) => (
                <li key={v.market.id}>
                  <TokenIcon symbol={v.market.symbol} size={30} />
                  <div className="lend-list-meta">
                    <b>{v.market.symbol}</b>
                    <span>
                      {formatAmt(v.book.borrowed)} · {formatUsd(v.borrowedUsd)}
                    </span>
                  </div>
                  <em>{formatApy(v.market.borrowApy)}</em>
                  <div className="mkt-acts">
                    <button type="button" className="btn btn-borrow btn-sm" onClick={() => open(v.market, "borrow")}>
                      Borrow
                    </button>
                    <button type="button" className="btn btn-ghost btn-sm" onClick={() => open(v.market, "repay")}>
                      Repay
                    </button>
                  </div>
                </li>
              ))}
              {borrowed.length === 0 ? (
                <li className="lend-hint">
                  <span>Ready to borrow {formatUsd(snap.availableUsd)}. Pick USDG for a stable draw, or PONS to stay in the pons loop.</span>
                </li>
              ) : null}
            </ul>
          )}
        </section>
      </div>

      <HighestApy markets={markets} onAct={open} />

      <section className="lend-markets">
        <header className="lend-markets-head">
          <h2>Market overview</h2>
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
        </header>
        <MarketOverview kind={tab} onAct={open} />
      </section>

      <LendActionDialog
        market={dialog.market}
        action={dialog.action}
        open={dialog.visible}
        onOpenChange={dialog.onOpenChange}
      />
    </div>
  );
}
