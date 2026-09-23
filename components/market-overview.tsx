"use client";

import Link from "next/link";
import { TokenIcon } from "@/components/token-icon";
import { formatAmt, formatApy, formatUsd } from "@/lib/format";
import { utilization } from "@/lib/lend";
import type { LendAction, Market, MarketKind } from "@/lib/types";
import { useLend } from "@/lib/use-lend";

export function HighestApy({
  markets,
  onAct,
}: {
  markets: Market[];
  onAct: (market: Market, action: LendAction) => void;
}) {
  const top = [...markets].sort((a, b) => b.supplyApy - a.supplyApy).slice(0, 4);
  return (
    <div className="high-apy">
      <div className="high-apy-head">
        <h2>Highest APY assets</h2>
        <p>Supply to earn. Borrow against collateral. pons LP sits at the top of the curve.</p>
      </div>
      <div className="high-apy-row">
        {top.map((m) => (
          <button key={m.id} type="button" className="high-apy-card" onClick={() => onAct(m, "supply")}>
            <TokenIcon symbol={m.symbol} size={34} />
            <div>
              <b>{m.symbol}</b>
              <span>{formatApy(m.supplyApy)} supply</span>
            </div>
            <em>{formatApy(m.borrowApy)} borrow</em>
          </button>
        ))}
      </div>
    </div>
  );
}

export function MarketOverview({
  kind,
  onAct,
  markets: given,
}: {
  kind: MarketKind | "all";
  onAct: (market: Market, action: LendAction) => void;
  markets?: Market[];
}) {
  const lend = useLend();
  const markets = given ?? lend.markets;
  const { view } = lend;
  const rows = markets.filter((m) => (kind === "all" ? true : m.kind === kind));

  return (
    <div className="mkt-wrap">
      <table className="mkt-table">
        <thead>
          <tr>
            <th>Asset</th>
            <th>Total supplied</th>
            <th>Supply APY</th>
            <th>Total borrowed</th>
            <th>Borrow APY</th>
            <th>Util</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {rows.map((m) => {
            const v = view(m);
            const util = utilization(m);
            return (
              <tr key={m.id}>
                <td>
                  <Link href={`/markets/${m.id}`} className="mkt-asset">
                    <TokenIcon symbol={m.symbol} size={28} />
                    <span>
                      <b>{m.symbol}</b>
                      <i>
                        {m.ponsPair ? "pons" : m.kind === "lp" ? "LP" : m.category}
                        {v.book.supplied > 0 || v.book.borrowed > 0 ? " · your book" : ""}
                      </i>
                    </span>
                  </Link>
                </td>
                <td>{formatUsd(m.totalSupplyUsd, 0)}</td>
                <td className="pos">{formatApy(m.supplyApy)}</td>
                <td>{formatUsd(m.totalBorrowUsd, 0)}</td>
                <td>{formatApy(m.borrowApy)}</td>
                <td>
                  <span className="util">
                    <i style={{ width: `${Math.round(util * 100)}%` }} />
                    {Math.round(util * 100)}%
                  </span>
                </td>
                <td className="mkt-acts">
                  <button type="button" className="btn btn-soft btn-sm" onClick={() => onAct(m, "supply")}>
                    Supply
                  </button>
                  <button type="button" className="btn btn-ghost btn-sm" onClick={() => onAct(m, "borrow")}>
                    Borrow
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="mkt-cards">
        {rows.map((m) => {
          const v = view(m);
          return (
            <article key={m.id} className="mkt-card">
              <Link href={`/markets/${m.id}`} className="mkt-asset">
                <TokenIcon symbol={m.symbol} size={28} />
                <span>
                  <b>{m.symbol}</b>
                  <i>{formatUsd(m.priceUsd)}</i>
                </span>
              </Link>
              <dl>
                <div>
                  <dt>Supply APY</dt>
                  <dd className="pos">{formatApy(m.supplyApy)}</dd>
                </div>
                <div>
                  <dt>Borrow APY</dt>
                  <dd>{formatApy(m.borrowApy)}</dd>
                </div>
                <div>
                  <dt>Supplied</dt>
                  <dd>{formatUsd(m.totalSupplyUsd, 0)}</dd>
                </div>
                <div>
                  <dt>Yours</dt>
                  <dd>{formatAmt(v.book.supplied)}</dd>
                </div>
              </dl>
              <div className="mkt-acts">
                <button type="button" className="btn btn-soft btn-sm" onClick={() => onAct(m, "supply")}>
                  Supply
                </button>
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => onAct(m, "borrow")}>
                  Borrow
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
