"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  ChartCandlestick,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Layers,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { PONS_APP, PONS_DOCS } from "@/lib/markets";
import { PROTOCOL } from "@/lib/tokens";

const items = [
  { href: "/app", label: "Dashboard", icon: LayoutDashboard },
  { href: "/markets", label: "Markets", icon: ChartCandlestick },
  { href: "/pools", label: "Pools", icon: BookOpen },
  { href: "/stakes", label: "Stakes", icon: Layers },
  { href: "/positions", label: "Positions", icon: Wallet },
  { href: "/academy", label: "Academy", icon: GraduationCap },
];

export function Siderail() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const ponsHref = PROTOCOL.ponsUrl || PONS_APP;

  return (
    <nav
      className={`siderail ${open ? "open" : ""}`}
      aria-label="Primary"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="rail-group">
        {items.map((it) => {
          const active = path === it.href || path.startsWith(`${it.href}/`);
          const Icon = it.icon;
          return (
            <Link
              key={it.href}
              href={it.href}
              className={`rail-item ${active ? "active" : ""}`}
              aria-current={active ? "page" : undefined}
            >
              <span className="rail-ico">
                <Icon size={17} strokeWidth={1.9} />
              </span>
              <span className="rail-label">{it.label}</span>
            </Link>
          );
        })}
      </div>
      <div className="rail-group rail-group--end">
        <div className="rail-sep" aria-hidden />
        <a
          className="rail-item rail-social"
          href={ponsHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open pons launchpad"
        >
          <span className="rail-ico">
            <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden>
              <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="12" cy="12" r="3" fill="currentColor" />
            </svg>
          </span>
          <span className="rail-label">pons</span>
        </a>
        <a
          className="rail-item rail-social desktop-only"
          href={PROTOCOL.x}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${PROTOCOL.name} on X`}
        >
          <span className="rail-ico">
            <svg viewBox="0 0 24 24" width="17" height="17">
              <path
                fill="currentColor"
                d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
              />
            </svg>
          </span>
          <span className="rail-label">X</span>
        </a>
        <a
          className="rail-item"
          href={PONS_DOCS}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="rail-ico">
            <FileText size={17} strokeWidth={1.9} />
          </span>
          <span className="rail-label">pons docs</span>
        </a>
        <Link href="/docs" className={`rail-item ${path === "/docs" ? "active" : ""}`}>
          <span className="rail-ico">
            <FileText size={17} strokeWidth={1.9} />
          </span>
          <span className="rail-label">Docs</span>
        </Link>
      </div>
    </nav>
  );
}
