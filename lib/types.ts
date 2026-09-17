export type ChainId = "robinhood" | "sol";
export type QuoteRh = "ETH" | "USDG";
export type QuoteSol = "SOL" | "USDC";
export type Quote = QuoteRh | QuoteSol;
export type Timeframe = "1h" | "24h" | "7d";
export type ListKind = "trending" | "established";
export type ShapeId = "uniform" | "concentrated" | "wide";

export type Token = {
  id: string;
  chain: ChainId;
  symbol: string;
  name: string;
  quote: Quote;
  mc: number;
  change24h: number;
  fees24h: number | null;
  trades24h: number;
  vol24h: number;
  ageHours: number;
  featured?: boolean;
  lists: ListKind[];
  address: string;
  logo?: string;
};

export type Stake = {
  id: string;
  chain: ChainId;
  tokenId: string;
  tvlQuote: number;
  rate7d: number | null;
  fees24h: number;
};

export type Position = {
  id: string;
  chain: ChainId;
  tokenId: string;
  shape: ShapeId;
  depositedUsd: number;
  valueUsd: number;
  feesUsd: number;
  rangeMin: number;
  rangeMax: number;
  createdAt: number;
};

export type StakeDeposit = {
  id: string;
  chain: ChainId;
  stakeId: string;
  amountQuote: number;
  createdAt: number;
};
