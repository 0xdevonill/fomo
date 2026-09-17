"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  CircleDollarSign,
  Coins,
  Droplet,
  Layers,
  Moon,
  Search,
  Sun,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { TokenIcon } from "@/components/token-icon";
import { WalletButton } from "@/components/wallet-button";
import { useAppState } from "@/lib/app-state";
import { formatUsd, shortAddr } from "@/lib/format";
import { PROTOCOL } from "@/lib/tokens";
import { useCatalog } from "@/lib/catalog";

export function Topbar() {
  const { theme, setTheme, chain, setChain } = useAppState();
  const { tokensFor } = useCatalog();
  const totals = PROTOCOL.totals[chain];
  const [q, setQ] = useState("");
  const router = useRouter();
  const path = usePathname();
  const landing = path === "/";
  const buyHref = PROTOCOL.ponsUrl || "/pools";
  const buyExternal = Boolean(PROTOCOL.ponsUrl);
  const hits = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return [];
    return tokensFor(chain)
      .filter(
        (t) =>
          t.symbol.toLowerCase().includes(query) ||
          t.name.toLowerCase().includes(query) ||
          t.address.toLowerCase().includes(query)
      )
      .slice(0, 8);
  }, [q, chain, tokensFor]);

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Link className="brand" href="/" aria-label={`${PROTOCOL.name} home`}>
          <Logo />
        </Link>
        {landing ? null : (
          <div className="g-search">
            <Search size={14} />
            <input
              placeholder="SEARCH TOKENS & STAKES"
              aria-label="Search tokens and stakes"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && hits[0]) {
                  router.push(`/pools/${hits[0].id}`);
                  setQ("");
                }
                if (e.key === "Escape") setQ("");
              }}
            />
            {q.trim() ? (
              <div className="tok-search-drop">
                {hits.length === 0 ? (
                  <div className="tok-search-note">No tokens match “{q.trim()}”.</div>
                ) : (
                  hits.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      className="tok-search-hit"
                      onClick={() => {
                        router.push(`/pools/${t.id}`);
                        setQ("");
                      }}
                    >
                      <TokenIcon symbol={t.symbol} logo={t.logo} size={18} />
                      <span className="tok-sym">{t.symbol}</span>
                      <span className="tok-name">{t.name}</span>
                      <span className="tok-addr">{shortAddr(t.address)}</span>
                    </button>
                  ))
                )}
              </div>
            ) : null}
          </div>
        )}
        <div className="topbar-actions">
          {landing ? null : (
            <>
              <nav className="chain-switch" aria-label="Chain">
                <button
                  type="button"
                  className={`chain-switch-btn ${chain === "robinhood" ? "on" : ""}`}
                  title="Robinhood Chain"
                  aria-label="Show Robinhood Chain pools"
                  aria-pressed={chain === "robinhood"}
                  onClick={() => setChain("robinhood")}
                >
                  <RhMark />
                </button>
                <button
                  type="button"
                  className={`chain-switch-btn ${chain === "sol" ? "on" : ""}`}
                  title="Solana"
                  aria-label="Show Solana pools"
                  aria-pressed={chain === "sol"}
                  onClick={() => setChain("sol")}
                >
                  <SolMark />
                </button>
              </nav>
              <div className="header-stats" aria-label={`${PROTOCOL.name} pool totals`}>
                <span className="hstat">
                  <Layers className="hstat-ico" size={13} strokeWidth={2.1} />
                  <span className="hstat-body">
                    <span className="hstat-label">Total Positions</span>
                    <span className="hstat-value">{totals.positions.toLocaleString("en-US")}</span>
                  </span>
                </span>
                <span className="hstat">
                  <Coins className="hstat-ico" size={13} strokeWidth={2.1} />
                  <span className="hstat-body">
                    <span className="hstat-label">Total Fees</span>
                    <span className="hstat-value">{formatUsd(totals.fees, 0)}</span>
                  </span>
                </span>
                <span className="hstat hstat-wide">
                  <Droplet className="hstat-ico" size={13} strokeWidth={2.1} />
                  <span className="hstat-body">
                    <span className="hstat-label">TVL</span>
                    <span className="hstat-value">{formatUsd(totals.tvl, 0)}</span>
                  </span>
                </span>
                <span className="hstat hstat-wide">
                  <CircleDollarSign className="hstat-ico" size={13} strokeWidth={2.1} />
                  <span className="hstat-body">
                    <span className="hstat-label">{totals.nativeLabel}</span>
                    <span className="hstat-value">
                      ${totals.nativePrice.toLocaleString("en-US", { maximumFractionDigits: 2 })}
                    </span>
                  </span>
                </span>
              </div>
            </>
          )}
          <button
            type="button"
            className="theme-toggle"
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          {buyExternal ? (
            <a className="btn btn-ping btn-sm" href={buyHref} target="_blank" rel="noopener noreferrer">
              <span className="btn-full">Buy ${PROTOCOL.token}</span>
              <span className="btn-short">Buy</span>
            </a>
          ) : (
            <Link className="btn btn-ping btn-sm" href={landing ? "/pools" : "/"}>
              <span className="btn-full">{landing ? "Enter app" : `$${PROTOCOL.token}`}</span>
              <span className="btn-short">{landing ? "App" : `$${PROTOCOL.token}`}</span>
            </Link>
          )}
          <WalletButton />
        </div>
      </div>
    </header>
  );
}

function RhMark() {
  return (
    <svg className="chain-mark rh-mark" width="17" height="17" viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="11" fill="currentColor" opacity="0.15" />
      <path
        d="M7 15c2.4-4.2 4.2-7.6 5-10 1.2 2.8 2.6 5.6 5 10-1.8-1.1-3.4-1.6-5-1.6S8.8 13.9 7 15Z"
        fill="currentColor"
      />
    </svg>
  );
}

function SolMark() {
  return (
    <svg className="chain-mark sol-mark" width="16" height="16" viewBox="0 0 24 24" aria-hidden>
      <path d="M5.4 16.4h11.4l-2.2 2.4H3.2z" fill="currentColor" />
      <path d="M5.4 11.1h11.4l-2.2 2.4H3.2z" fill="currentColor" opacity="0.75" />
      <path d="M16.8 5.8H5.4L7.6 3.4h13.4z" fill="currentColor" opacity="0.55" />
    </svg>
  );
}
