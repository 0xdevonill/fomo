import { BRAND_LOGO, isSiteToken, site } from "@/lib/site";

const RH_LOGOS: Record<string, string> = {
  SPCX: "https://coin-images.coingecko.com/coins/images/102174129/large/0x4a0e65a3eccec6dbe60ae065f2e7bb85fae35eea.png",
  PONS: "https://coin-images.coingecko.com/coins/images/102174571/large/jhitvkisdq8fhxvimdkpcw7y3dx5.",
  NVDA: "https://coin-images.coingecko.com/coins/images/102174110/large/0xd0601ce157db5bdc3162bbac2a2c8af5320d9eec.png",
  META: "https://coin-images.coingecko.com/coins/images/102174122/large/0xc0d6457c16cc70d6790dd43521c899c87ce02f35.png",
  GOOGL: "https://cdn.dexscreener.com/cms/images/bmzPJxZYlJ_mWal4?width=800&height=800&quality=95&format=auto",
  CASHCAT: "https://coin-images.coingecko.com/coins/images/102174280/large/cashcat-logo.jpg",
  AAPL: "https://coin-images.coingecko.com/coins/images/102174123/large/0xaf3d76f1834a1d425780943c99ea8a608f8a93f9.png",
  musebook: "https://cdn.dexscreener.com/cms/images/4JmHe95QqJAttQKR?width=800&height=800&quality=95&format=auto",
  AI: "https://assets.geckoterminal.com/byuw84qv9ez2sp99h8q3vzcws5iq",
  INU: "https://cdn.dexscreener.com/cms/images/WOIykcPzopr1IFFl?width=800&height=800&quality=95&format=auto",
  SPY: "https://coin-images.coingecko.com/coins/images/102174115/large/0x117cc2133c37b721f49de2a7a74833232b3b4c0c.png",
  PIPEDOG: "https://coin-images.coingecko.com/coins/images/102174876/large/pipedog.png",
  Index: "https://coin-images.coingecko.com/coins/images/102174740/large/qffiSdBd_400x400_(1).jpg",
  HOOKR: "https://ipfs.io/ipfs/bafkreibx3xcxuhm2a34mkzyohks2wvnutwry5jqfl75todpybbslatddt4",
  QQQ: "https://coin-images.coingecko.com/coins/images/102174119/large/0xd5f3879160bc7c32ebb4dc785f8a4f505888de68.png",
  PROLOGUE: "https://ipfs.io/ipfs/bafkreibxargr7pdwdydhztyg2dbbkm4oueutbsfjcwcp24zrhlyem55iru",
  MOO: "https://cdn.dexscreener.com/cms/images/DXvCPLxceXnY_5XS?width=800&height=800&quality=95&format=auto",
  TSLA: "https://coin-images.coingecko.com/coins/images/102174112/large/0x322f0929c4625ed5bad873c95208d54e1c003b2d.png",
  NET: "https://coin-images.coingecko.com/coins/images/102174712/large/netnet_400x400.jpg",
  MEME: "https://cdn.dexscreener.com/cms/images/pPWqEwHoGm1tbUMt?width=800&height=800&quality=95&format=auto",
  Zerocoin: "https://dd.dexscreener.com/ds-data/tokens/robinhood/0xaaf794a0c221153d71804372f446b79bd02f5eb5.png?size=lg",
  ZZZ: "https://ipfs.io/ipfs/bafybeibu52cvzvhxiujhhmxspeizjmkbae2v4ovfncft66oizaqfuacbwm",
  TRENCHIES: "https://dd.dexscreener.com/ds-data/tokens/robinhood/0xd0985fbc4fda092591f8c71dbb754ffb5f447249.png?size=lg",
  HMM: "https://coin-images.coingecko.com/coins/images/102174672/large/fmu02lq7zai1iyp4qqwfnmu5wr1v.",
  HOOD: "https://assets.geckoterminal.com/id090r6t0xldcpk1q84at2zht235",
  CHUMP: "https://cdn.dexscreener.com/cms/images/k2hHNq14CswzA5sw?width=800&height=800&quality=95&format=auto",
  GME: "https://coin-images.coingecko.com/coins/images/102174150/large/0x1b0e319c6a659f002271b69db8a7df2f911c153e.png",
  CRCL: "https://cdn.dexscreener.com/cms/images/mYhsdKy5hf-DJ2oN?width=800&height=800&quality=95&format=auto",
  HIMS: "https://coin-images.coingecko.com/coins/images/102175360/large/HIMS.png",
  AMC: "https://coin-images.coingecko.com/coins/images/102175476/large/AMC.png",
  DOGO: "https://coin-images.coingecko.com/coins/images/102175491/large/fy8vywsdpyv6zb2j7qtyt6u0dw24.",
  syrupUSDG: "https://dd.dexscreener.com/ds-data/tokens/robinhood/0x40858070814a57fdf33a613ae84fe0a8b4a874f7.png?size=lg",
  WALLET: "https://assets.geckoterminal.com/6w0vht52reou68bxt14xgivba6c2",
  UP: "https://coin-images.coingecko.com/coins/images/102174542/large/tgeb6e7cyzun3qkeab3th5cj23qv.",
  MU: "https://coin-images.coingecko.com/coins/images/102174111/large/0xff080c8ce2e5feadaca0da81314ae59d232d4afd.png",
  IF: "https://coin-images.coingecko.com/coins/images/102174859/large/CoinGecko_Logo_200x200.png",
  USDe: "https://dd.dexscreener.com/ds-data/tokens/robinhood/0x5d3a1ff2b6bab83b63cd9ad0787074081a52ef34.png?size=lg",
};

const SOL_LOGOS: Record<string, string> = {
  BONK: "https://coin-images.coingecko.com/coins/images/28600/large/bonk.jpg",
  WIF: "https://coin-images.coingecko.com/coins/images/33566/large/dogwifhat.jpg",
  JUP: "https://coin-images.coingecko.com/coins/images/34188/large/jup.png",
  RAY: "https://coin-images.coingecko.com/coins/images/13928/large/PSigc4ie_400x400.jpg",
  PYTH: "https://coin-images.coingecko.com/coins/images/31924/large/pyth.png",
  JTO: "https://coin-images.coingecko.com/coins/images/33228/large/jito.png",
  ORCA: "https://coin-images.coingecko.com/coins/images/17547/large/Orca_Logo.png",
  RENDER: "https://coin-images.coingecko.com/coins/images/11636/large/rndr.png",
  W: "https://coin-images.coingecko.com/coins/images/35087/large/womrhole_logo.jpeg",
  POPCAT: "https://coin-images.coingecko.com/coins/images/33760/large/image.jpg",
  MEW: "https://coin-images.coingecko.com/coins/images/36445/large/MEW.png",
  PNUT: "https://coin-images.coingecko.com/coins/images/40685/large/pnut.png",
  FARTCOIN: "https://coin-images.coingecko.com/coins/images/50891/large/fart.jpg",
  TRUMP: "https://coin-images.coingecko.com/coins/images/53746/large/trump.png",
  MELANIA: "https://coin-images.coingecko.com/coins/images/53775/large/melania.png",
  MOODENG: "https://coin-images.coingecko.com/coins/images/40001/large/moodeng.jpg",
  GIGA: "https://coin-images.coingecko.com/coins/images/38847/large/gigachad.png",
  RETARDIO: "https://dd.dexscreener.com/ds-data/tokens/solana/6ogzHhzdrQr9Pgv6hZ2MNze7EsPkvTpaA2m5WqKqpump.png?size=lg",
  BOME: "https://coin-images.coingecko.com/coins/images/36071/large/bome.png",
  TNSR: "https://coin-images.coingecko.com/coins/images/35997/large/tensor.png",
  DRIFT: "https://coin-images.coingecko.com/coins/images/37509/large/drift.png",
  IO: "https://coin-images.coingecko.com/coins/images/37404/large/io.png",
  KMNO: "https://coin-images.coingecko.com/coins/images/35889/large/kamino.png",
  PENGU: "https://coin-images.coingecko.com/coins/images/52622/large/PUDGY_PENGUINS_PENGU_PFP.png",
  GOAT: "https://coin-images.coingecko.com/coins/images/50724/large/goat.png",
  ACT: "https://coin-images.coingecko.com/coins/images/51146/large/act.png",
  ZEREBRO: "https://coin-images.coingecko.com/coins/images/51289/large/zerebro.jpg",
  ai16z: "https://coin-images.coingecko.com/coins/images/51090/large/AI16Z.jpg",
};

export function proxiedLogo(url: string): string {
  if (!url) return "";
  if (url.startsWith("/") || url.startsWith("data:")) return url;
  return `/api/img?u=${encodeURIComponent(url)}`;
}

export function rawLogoFor(symbol: string): string {
  if (isSiteToken(symbol)) return site.tokenLogo || BRAND_LOGO;
  return RH_LOGOS[symbol] || SOL_LOGOS[symbol] || "";
}

export function logoSrcFor(symbol: string): string {
  const raw = rawLogoFor(symbol);
  if (!raw) return "";
  return proxiedLogo(raw);
}
