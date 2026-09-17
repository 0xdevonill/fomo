function env(name: string, fallback = ""): string {
  const v = (process.env[name] ?? "").trim();
  return v || fallback;
}

export const DEMO_TOKEN_CONTRACT =
  "0x1Ad69dDD9D98dD71b6211339A1801fD128A3925D";

export const BRAND_LOGO = "/logo.jpg";

export const site = {
  tokenSymbol: env("NEXT_PUBLIC_TOKEN_SYMBOL"),
  tokenName: env("NEXT_PUBLIC_TOKEN_NAME"),
  tokenContract: env("NEXT_PUBLIC_TOKEN_CONTRACT", DEMO_TOKEN_CONTRACT),
  tokenContractSol: env("NEXT_PUBLIC_TOKEN_CONTRACT_SOL"),
  tokenLogo: env("NEXT_PUBLIC_TOKEN_LOGO"),
  tokenInfo: env("NEXT_PUBLIC_TOKEN_INFO"),
  xUrl: env("NEXT_PUBLIC_X_URL", "https://x.com/helixliquidity"),
  discordUrl: env("NEXT_PUBLIC_DISCORD_URL", "https://discord.gg/helixliquidity"),
  ponsUrl: env("NEXT_PUBLIC_PONS_URL"),
  ponsId: env("NEXT_PUBLIC_PONS_ID"),
};

export function isDemoContract(address: string): boolean {
  return address.trim().toLowerCase() === DEMO_TOKEN_CONTRACT.toLowerCase();
}

export function isSiteToken(symbol: string): boolean {
  const s = symbol.toUpperCase();
  if (s === "HELIX") return true;
  if (site.tokenSymbol && s === site.tokenSymbol.toUpperCase()) return true;
  return false;
}

export function contractFor(chain: "robinhood" | "sol"): string {
  return chain === "sol" ? site.tokenContractSol : site.tokenContract;
}
