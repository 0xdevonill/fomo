"use client";

import { formatHealth, healthTone } from "@/lib/lend";

export function HealthRing({
  health,
  size = 92,
}: {
  health: number;
  size?: number;
}) {
  const tone = healthTone(health);
  const pct = !Number.isFinite(health) ? 1 : Math.max(0, Math.min(1, (health - 0.8) / 2.4));
  const r = 34;
  const c = 2 * Math.PI * r;
  const dash = c * pct;

  return (
    <div className={`health-ring tone-${tone}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 80 80" width={size} height={size} aria-hidden>
        <circle className="hr-track" cx="40" cy="40" r={r} />
        <circle
          className="hr-fill"
          cx="40"
          cy="40"
          r={r}
          strokeDasharray={`${dash} ${c}`}
          strokeDashoffset={c * 0.25}
        />
      </svg>
      <div className="hr-label">
        <b>{formatHealth(health)}</b>
        <span>Health</span>
      </div>
    </div>
  );
}
