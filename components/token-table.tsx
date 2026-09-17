"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkline } from "@/components/sparkline";
import { TokenIcon } from "@/components/token-icon";
import { formatAge, formatInt, formatPct, formatUsd } from "@/lib/format";
import type { ListKind, Timeframe, Token } from "@/lib/types";

type Col = "mc" | "change24h" | "fees24h" | "trades24h" | "vol24h" | "ageHours";

export function TokenTable({
  title,
  tokens,
  quotes,
}: {
  title: string;
  tokens: Token[];
  quotes: string[];
}) {
  const [quote, setQuote] = useState("All");
  const [tf, setTf] = useState<Timeframe>("24h");
  const [sort, setSort] = useState<{ col: Col; dir: "asc" | "desc" }>({
    col: "vol24h",
    dir: "desc",
  });
  const router = useRouter();

  const rows = useMemo(() => {
    const scale =
      tf === "1h" ? 0.12 : tf === "7d" ? 4.2 : 1;
    const feeScale = tf === "1h" ? 0.08 : tf === "7d" ? 5.6 : 1;
    const filtered =
      quote === "All" ? tokens : tokens.filter((t) => t.quote === quote);
    const mapped = filtered.map((t) => ({
      ...t,
      change24h: t.change24h * (tf === "1h" ? 0.18 : tf === "7d" ? 1.65 : 1),
      vol24h: t.vol24h * scale,
      fees24h: t.fees24h === null ? null : t.fees24h * feeScale,
      trades24h: Math.max(1, Math.round(t.trades24h * scale)),
    }));
    mapped.sort((a, b) => {
      const av = a[sort.col] ?? -1;
      const bv = b[sort.col] ?? -1;
      return sort.dir === "asc" ? Number(av) - Number(bv) : Number(bv) - Number(av);
    });
    return mapped;
  }, [tokens, quote, tf, sort]);

  const toggle = (col: Col) => {
    setSort((s) =>
      s.col === col ? { col, dir: s.dir === "desc" ? "asc" : "desc" } : { col, dir: "desc" }
    );
  };

  const cycleTf = () => {
    setTf((t) => (t === "24h" ? "7d" : t === "7d" ? "1h" : "24h"));
  };

  return (
    <div className="action-panel xpanel xpanel--pine">
      <div className="ap-head">
        <div className="ap-title">
          <h3>{title}</h3>
        </div>
        <div className="quote-switch" role="group" aria-label="Quote asset">
          {quotes.map((q) => (
            <button
              key={q}
              type="button"
              className={`qs-btn ${quote === q ? "on" : ""}`}
              aria-pressed={quote === q}
              onClick={() => setQuote(q)}
            >
              {q}
            </button>
          ))}
        </div>
        <div className="win-filter">
          <button type="button" className="win-btn" aria-label="Change timeframe" onClick={cycleTf}>
            <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden>
              <path
                d="M1.5 2.5h13l-5 6v4l-3 1.5v-5.5l-5-6z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
            </svg>
            {tf}
          </button>
        </div>
      </div>
      {rows.length === 0 ? (
        <div className="empty">
          <h3>No pools</h3>
          <p>Nothing matches this quote filter on the selected chain.</p>
        </div>
      ) : (
        <div className="table-wrap">
          <table className="ftable">
            <thead>
              <tr>
                <th>Token</th>
                <Th label="MC" col="mc" sort={sort} onSort={toggle} />
                <Th label={tf} col="change24h" sort={sort} onSort={toggle} />
                <Th label={`Fees ${tf}`} col="fees24h" sort={sort} onSort={toggle} />
                <Th label="Trades" col="trades24h" sort={sort} onSort={toggle} />
                <Th label={`Vol ${tf}`} col="vol24h" sort={sort} onSort={toggle} />
                <Th label="Age" col="ageHours" sort={sort} onSort={toggle} />
                <th>Last {tf}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((t) => {
                const up = t.change24h >= 0;
                const fresh = t.ageHours < 24;
                return (
                  <tr
                    key={t.id}
                    data-quote={t.quote}
                    onClick={() => router.push(`/pools/${t.id}`)}
                  >
                    <td>
                      <span className="tok-link">
                        <TokenIcon symbol={t.symbol} size={28} />
                        <span className="tok-text">
                          <span className="tok-sym">{t.symbol}</span>
                          <span className="tok-name">{t.name}</span>
                        </span>
                      </span>
                    </td>
                    <td>{formatUsd(t.mc)}</td>
                    <td>
                      <span className={`chg ${up ? "up" : "down"}`}>{formatPct(t.change24h)}</span>
                    </td>
                    <td>{formatUsd(t.fees24h)}</td>
                    <td>{formatInt(t.trades24h)}</td>
                    <td className="cell-vol">{formatUsd(t.vol24h)}</td>
                    <td className={`cell-age ${fresh ? "fresh" : ""}`}>{formatAge(t.ageHours)}</td>
                    <td>
                      <Sparkline seed={`${t.id}-${tf}`} up={up} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function Th({
  label,
  col,
  sort,
  onSort,
}: {
  label: string;
  col: Col;
  sort: { col: Col; dir: "asc" | "desc" };
  onSort: (c: Col) => void;
}) {
  return (
    <th className="sortable" onClick={() => onSort(col)}>
      {label}
      {sort.col === col ? <span className="glyph">{sort.dir === "desc" ? "▼" : "▲"}</span> : null}
    </th>
  );
}

export function listTokens(all: Token[], kind: ListKind): Token[] {
  return all.filter((t) => t.lists.includes(kind));
}
