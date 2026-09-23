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
  priceUsd?: number;
};

export type LiveToken = {
  symbol: string;
  name: string;
  address: string;
  logo: string;
  mc: number;
  change24h: number;
  vol24h: number;
  trades24h: number;
  fees24h: number | null;
  ageHours: number;
  priceUsd: number;
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

export type MarketKind = "asset" | "lp";
export type MarketCategory = "core" | "stable" | "stock" | "meme" | "lp";
export type LendAction = "supply" | "withdraw" | "borrow" | "repay";

export type Market = {
  id: string;
  symbol: string;
  name: string;
  kind: MarketKind;
  category: MarketCategory;
  tokenId?: string;
  address: string;
  priceUsd: number;
  supplyApy: number;
  borrowApy: number;
  totalSupplyUsd: number;
  totalBorrowUsd: number;
  ltv: number;
  liqThreshold: number;
  liqBonus: number;
  originationFee: number;
  canCollateral: boolean;
  featured?: boolean;
  ponsPair?: boolean;
};

export type LendBook = {
  marketId: string;
  supplied: number;
  borrowed: number;
  collateral: boolean;
};

export type LendBag = Record<string, number>;
