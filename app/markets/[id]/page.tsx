"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { HealthRing } from "@/components/health-ring";
import { LendActionDialog, useLendDialog } from "@/components/lend-action";
import { TokenIcon } from "@/components/token-icon";
import { formatAmt, formatApy, formatUsd, shortAddr } from "@/lib/format";
import { utilization } from "@/lib/lend";
import { PONS_APP } from "@/lib/markets";
import { PROTOCOL } from "@/lib/tokens";
import { useLend } from "@/lib/use-lend";

export default function MarketDetailPage() {
  const params = useParams<{ id: string }>();
  const { marketById, view, snap } = useLend();
  const dialog = useLendDialog();
  const market = marketById(params.id);

  if (!market) {
    return (
      <div className="app-page">
        <div className="page-lead">
          <h1>Market not found</h1>
          <p>That book is not on Robinhood Chain in this protocol.</p>
          <Link className="btn btn-ghost" href="/markets">
            Back to markets
          </Link>
        </div>
      </div>
    );
  }

  const v = view(market);
  const util = utilization(market);
  const ponsHref = PROTOCOL.ponsUrl || PONS_APP;

  return (
    <div className="lend-page">
      <div className="mkt-detail-head">
        <TokenIcon symbol={market.symbol} size={48} />
        <div>
          <p className="lend-kicker">
            {market.ponsPair ? "pons pair" : market.kind === "lp" ? "LP market" : "Asset market"} ·
            Robinhood 4663
          </p>
          <h1>{market.symbol}</h1>
          <p>{market.name}</p>
        </div>
        <div className="mkt-detail-acts">
          <button type="button" className="btn btn-ping" onClick={() => dialog.open(market, "supply")}>
            Supply
          </button>
          <button type="button" className="btn btn-borrow" onClick={() => dialog.open(market, "borrow")}>
            Borrow
          </button>
          {market.ponsPair ? (
            <a className="btn btn-ghost" href={ponsHref} target="_blank" rel="noopener noreferrer">
              Trade on pons
            </a>
          ) : null}
        </div>
      </div>

      <div className="lend-cols">
        <section className="lend-card">
          <header>
            <h2>Market stats</h2>
          </header>
          <dl className="stat-grid">
            <div>
              <dt>Price</dt>
              <dd>{formatUsd(market.priceUsd)}</dd>
            </div>
            <div>
              <dt>Supply APY</dt>
              <dd className="pos">{formatApy(market.supplyApy)}</dd>
            </div>
            <div>
              <dt>Borrow APY</dt>
              <dd>{formatApy(market.borrowApy)}</dd>
            </div>
            <div>
              <dt>Total supplied</dt>
              <dd>{formatUsd(market.totalSupplyUsd, 0)}</dd>
            </div>
            <div>
              <dt>Total borrowed</dt>
              <dd>{formatUsd(market.totalBorrowUsd, 0)}</dd>
            </div>
            <div>
              <dt>Utilization</dt>
              <dd>{Math.round(util * 100)}%</dd>
            </div>
            <div>
              <dt>LTV</dt>
              <dd>{Math.round(market.ltv * 100)}%</dd>
            </div>
            <div>
              <dt>Liquidation</dt>
              <dd>{Math.round(market.liqThreshold * 100)}% · bonus {Math.round(market.liqBonus * 100)}%</dd>
            </div>
            <div>
              <dt>Contract</dt>
              <dd>{shortAddr(market.address)}</dd>
            </div>
          </dl>
        </section>
        <section className="lend-card">
          <header>
            <h2>Your position</h2>
            <HealthRing health={snap.health} size={80} />
          </header>
          <dl className="stat-grid">
            <div>
              <dt>Wallet</dt>
              <dd>
                {formatAmt(v.walletAmt)} {market.symbol}
              </dd>
            </div>
            <div>
              <dt>Supplied</dt>
              <dd>
                {formatAmt(v.book.supplied)} · {formatUsd(v.suppliedUsd)}
              </dd>
            </div>
            <div>
              <dt>Borrowed</dt>
              <dd>
                {formatAmt(v.book.borrowed)} · {formatUsd(v.borrowedUsd)}
              </dd>
            </div>
            <div>
              <dt>Collateral</dt>
              <dd>{v.book.collateral ? "On" : "Off"}</dd>
            </div>
          </dl>
          <div className="mkt-acts" style={{ marginTop: 12 }}>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => dialog.open(market, "withdraw")}>
              Withdraw
            </button>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => dialog.open(market, "repay")}>
              Repay
            </button>
          </div>
        </section>
      </div>

      <LendActionDialog
        market={dialog.market}
        action={dialog.action}
        open={dialog.visible}
        onOpenChange={dialog.onOpenChange}
      />
    </div>
  );
}
