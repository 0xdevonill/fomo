function env(name: string, fallback = ""): string {
  return (process.env[name] ?? fallback).trim();
}

export const site = {
  tokenSymbol: env("NEXT_PUBLIC_TOKEN_SYMBOL", "HELIX"),
  tokenName: env("NEXT_PUBLIC_TOKEN_NAME", "Helix"),
  tokenContract: env("NEXT_PUBLIC_TOKEN_CONTRACT"),
  tokenContractSol: env("NEXT_PUBLIC_TOKEN_CONTRACT_SOL"),
  tokenLogo: env("NEXT_PUBLIC_TOKEN_LOGO"),
  tokenInfo: env("NEXT_PUBLIC_TOKEN_INFO"),
  xUrl: env("NEXT_PUBLIC_X_URL", "https://x.com/helixliquidity"),
  discordUrl: env("NEXT_PUBLIC_DISCORD_URL", "https://discord.gg/helixliquidity"),
  ponsUrl: env("NEXT_PUBLIC_PONS_URL"),
  ponsId: env("NEXT_PUBLIC_PONS_ID"),
};

export function isSiteToken(symbol: string): boolean {
  const s = symbol.toUpperCase();
  return s === "HELIX" || s === site.tokenSymbol.toUpperCase();
}

export function contractFor(chain: "robinhood" | "sol"): string {
  return chain === "sol" ? site.tokenContractSol : site.tokenContract;
}
