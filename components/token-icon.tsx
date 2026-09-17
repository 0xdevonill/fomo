import { tokenHue } from "@/lib/format";

export function TokenIcon({
  symbol,
  size = 28,
}: {
  symbol: string;
  size?: number;
}) {
  const hue = tokenHue(symbol);
  const letter = symbol.slice(0, 1).toUpperCase();
  const bg =
    symbol === "HELIX"
      ? "linear-gradient(135deg, #3f9e74 0%, #173f2e 100%)"
      : `linear-gradient(135deg, hsl(${hue} 42% 38%) 0%, hsl(${(hue + 28) % 360} 36% 22%) 100%)`;
  return (
    <span
      className="tok-ico"
      style={{
        width: size,
        height: size,
        background: bg,
        fontSize: size * 0.38,
      }}
      aria-hidden
    >
      {letter}
    </span>
  );
}
