"use client";

import { MarketBand } from "@/components/market-band";
import { SparkDefs } from "@/components/sparkline";
import { listTokens, TokenTable } from "@/components/token-table";
import { useAppState } from "@/lib/app-state";
import { useCatalog } from "@/lib/catalog";
import { quoteFilters } from "@/lib/tokens";

export default function PoolsPage() {
  const { chain } = useAppState();
  const { tokensFor, featuredToken, mostTraded, highestVolume } = useCatalog();
  const tokens = tokensFor(chain);
  const featured = featuredToken(chain);
  const traded = mostTraded(chain);
  const volume = highestVolume(chain);
  const quotes = quoteFilters(chain);

  return (
    <div className="explore-page">
      <SparkDefs />
      <MarketBand featured={featured} traded={traded} volume={volume} />
      <div className="explore-grid">
        <TokenTable title="Trending" tokens={listTokens(tokens, "trending")} quotes={quotes} />
        <TokenTable title="Established" tokens={listTokens(tokens, "established")} quotes={quotes} />
      </div>
    </div>
  );
}
