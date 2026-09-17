"use client";

import { sparkline } from "@/lib/format";

export function Sparkline({
  seed,
  up,
  wide = false,
  className = "",
}: {
  seed: string;
  up: boolean;
  wide?: boolean;
  className?: string;
}) {
  const w = wide ? 100 : 92;
  const h = 30;
  const pts = sparkline(seed, wide ? 26 : 24);
  const min = Math.min(...pts);
  const max = Math.max(...pts);
  const span = Math.max(1, max - min);
  const coords = pts.map((p, i) => {
    const x = (i / (pts.length - 1)) * w;
    const y = 2 + ((max - p) / span) * (h - 4);
    return [x, y] as const;
  });
  const line = coords.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(" ");
  const fill = `0,${h} ${line} ${w},${h}`;
  const last = coords[coords.length - 1];
  return (
    <svg
      className={`spark ${up ? "up" : "down"} ${wide ? "spark-wide" : ""} ${className}`}
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      width={wide ? undefined : w}
      height={wide ? undefined : h}
    >
      <polygon className="spark-fill" points={fill} />
      <polyline
        points={line}
        pathLength="1"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <circle className="spark-dot" cx={last[0]} cy={last[1]} r="2" />
    </svg>
  );
}

export function SparkDefs() {
  return (
    <svg className="spark-defs" aria-hidden>
      <defs>
        <linearGradient id="sparkgrad-up" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="var(--pos)" stopOpacity="0.2" />
          <stop offset="0.55" stopColor="var(--pos)" stopOpacity="0.7" />
          <stop offset="1" stopColor="var(--pos)" stopOpacity="1" />
        </linearGradient>
        <linearGradient id="sparkgrad-down" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="var(--neg)" stopOpacity="0.2" />
          <stop offset="0.55" stopColor="var(--neg)" stopOpacity="0.7" />
          <stop offset="1" stopColor="var(--neg)" stopOpacity="1" />
        </linearGradient>
      </defs>
    </svg>
  );
}
