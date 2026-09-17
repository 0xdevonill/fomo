"use client";

import Link from "next/link";
import { Sparkline } from "@/components/sparkline";
import { TokenIcon } from "@/components/token-icon";
import { formatInt, formatPct, formatUsd } from "@/lib/format";
import type { Token } from "@/lib/types";

export function MarketBand({
  featured,
  traded,
  volume,
}: {
  featured: Token;
  traded: Token;
  volume: Token;
}) {
  const up = featured.change24h >= 0;
  return (
    <div className="mband">
      <Link className="mspot mspot--hero" href={`/pools/${featured.id}`}>
        <span className="mspot-id">
          <TokenIcon symbol={featured.symbol} logo={featured.logo} size={44} />
          <span className="mspot-sym">{featured.symbol}</span>
        </span>
        <span className="mspot-hero-stats">
          <span className="ms">
            <span className="k">Market cap</span>
            <span className="v">{formatUsd(featured.mc)} MC</span>
          </span>
          <span className="ms">
            <span className="k">24h</span>
            <span className={`v ${up ? "up" : "down"}`}>{formatPct(featured.change24h)}</span>
          </span>
          <span className="ms">
            <span className="k">Vol 24h</span>
            <span className="v">{formatUsd(featured.vol24h)}</span>
          </span>
          <span className="ms">
            <span className="k">Fees 24h</span>
            <span className="v">{formatUsd(featured.fees24h)}</span>
          </span>
          <span className="ms">
            <span className="k">Trades 24h</span>
            <span className="v">{formatInt(featured.trades24h)}</span>
          </span>
          <span className="ms">
            <span className="k">Pool age</span>
            <span className="v">{Math.round(featured.ageHours / 24)}d</span>
          </span>
        </span>
        <span className="mspot-art" aria-hidden>
          <Sparkline seed={featured.id} up={up} wide />
        </span>
      </Link>
      <div className="mband-side">
        <Link className="mspot mspot--sm mspot--vol" href={`/pools/${traded.id}`}>
          <span className="mspot-k">Most traded · 24h</span>
          <span className="mspot-id">
            <TokenIcon symbol={traded.symbol} logo={traded.logo} size={26} />
            <span className="mspot-sym">{traded.symbol}</span>
          </span>
          <span className="mspot-foot">
            <span className="mspot-v">{formatInt(traded.trades24h)} trades</span>
            <span className="mspot-mc">{formatUsd(traded.mc)} MC</span>
          </span>
          <span className="mspot-art" aria-hidden>
            <Sparkline seed={traded.id} up={traded.change24h >= 0} wide />
          </span>
        </Link>
        <Link className="mspot mspot--sm mspot--teal" href={`/pools/${volume.id}`}>
          <span className="mspot-k">Highest volume · 24h</span>
          <span className="mspot-id">
            <TokenIcon symbol={volume.symbol} logo={volume.logo} size={26} />
            <span className="mspot-sym">{volume.symbol}</span>
          </span>
          <span className="mspot-foot">
            <span className="mspot-v">{formatUsd(volume.vol24h)}</span>
            <span className="mspot-mc">{formatUsd(volume.mc)} MC</span>
          </span>
          <span className="mspot-art" aria-hidden>
            <Sparkline seed={volume.id} up={volume.change24h >= 0} wide />
          </span>
        </Link>
      </div>
    </div>
  );
}
