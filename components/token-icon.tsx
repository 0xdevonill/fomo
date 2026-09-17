"use client";

import { useState } from "react";
import { tokenHue } from "@/lib/format";
import { logoSrcFor, proxiedLogo } from "@/lib/logos";
import { isSiteToken } from "@/lib/site";

export function TokenIcon({
  symbol,
  logo,
  size = 28,
}: {
  symbol: string;
  logo?: string;
  size?: number;
}) {
  const src = logo
    ? logo.startsWith("/") || logo.startsWith("data:")
      ? logo
      : proxiedLogo(logo)
    : logoSrcFor(symbol);
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const failed = Boolean(src) && failedSrc === src;
  const hue = tokenHue(symbol);
  const letter = symbol.slice(0, 1).toUpperCase();
  const branded = isSiteToken(symbol);
  const bg = branded
    ? "linear-gradient(135deg, #3f9e74 0%, #173f2e 100%)"
    : `linear-gradient(135deg, hsl(${hue} 42% 38%) 0%, hsl(${(hue + 28) % 360} 36% 22%) 100%)`;

  return (
    <span
      className="tok-ico"
      style={{
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
        background: failed || !src ? bg : "#141817",
        fontSize: size * 0.38,
      }}
      aria-hidden
    >
      {src && !failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" onError={() => setFailedSrc(src)} />
      ) : (
        letter
      )}
    </span>
  );
}
