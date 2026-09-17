"use client";

import { sparkline } from "@/lib/format";

export function PriceChart({ seed, up }: { seed: string; up: boolean }) {
  const w = 720;
  const h = 240;
  const pts = sparkline(`${seed}-chart`, 64);
  const min = Math.min(...pts);
  const max = Math.max(...pts);
  const span = Math.max(1, max - min);
  const coords = pts.map((p, i) => {
    const x = (i / (pts.length - 1)) * w;
    const y = 16 + ((max - p) / span) * (h - 36);
    return [x, y] as const;
  });
  const line = coords.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const fill = `0,${h} ${line} ${w},${h}`;
  const last = coords[coords.length - 1];
  const color = up ? "var(--pos)" : "var(--neg)";
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      {Array.from({ length: 5 }).map((_, i) => (
        <line
          key={i}
          x1="0"
          x2={w}
          y1={24 + i * 44}
          y2={24 + i * 44}
          stroke="var(--line)"
          strokeWidth="1"
        />
      ))}
      <polygon points={fill} fill={color} opacity="0.12" />
      <polyline
        points={line}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx={last[0]} cy={last[1]} r="3.5" fill={color} />
    </svg>
  );
}
