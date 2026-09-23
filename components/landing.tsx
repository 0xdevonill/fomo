"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { PONS_APP } from "@/lib/markets";
import { PROTOCOL } from "@/lib/tokens";

const SLIDES = [
  {
    kicker: "Robinhood Chain",
    title: (
      <>
        Welcome to <span>PING</span>
      </>
    ),
    body: `${PROTOCOL.name} is the lending protocol on Robinhood Chain. Supply, borrow, and keep a health factor — the same loop as EVAA on TON, built here for ETH gas and pons liquidity.`,
  },
  {
    kicker: "Markets",
    title: (
      <>
        ETH, stables, <span>PONS</span>
      </>
    ),
    body: "Earn supply APY and borrow ETH, USDG, USDe, stock tokens, memecoins, and pons LP. Utilization sets the rate. Collateral is optional until you borrow.",
  },
  {
    kicker: "Capital",
    title: (
      <>
        Increase your <span>capital</span>
      </>
    ),
    body: "Supply once. Borrow against it. Loop pons LP or PING if you want leverage. Origination is 0.30%. Liquidation starts if health falls under 1.00.",
  },
  {
    kicker: "pons",
    title: (
      <>
        Matched with <span>pons</span>
      </>
    ),
    body: "Launch and trade on pons. Bring PONS or a PONS/WETH LP in as collateral. Buy the site token on the launchpad, then supply it here. pons is not Robinhood. Neither are we.",
  },
];

export function Landing() {
  const [i, setI] = useState(0);
  const slide = SLIDES[i];
  const last = i === SLIDES.length - 1;
  const buyHref = PROTOCOL.ponsUrl || PONS_APP;

  return (
    <div className="welcome">
      <div className="welcome-stage">
        <div className="welcome-orb" aria-hidden>
          <span className="ring r1" />
          <span className="ring r2" />
          <span className="ring r3" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="welcome-core" src="/logo.png" alt="" width={140} height={140} />
        </div>
        <p className="welcome-kicker">{slide.kicker}</p>
        <h1 className="welcome-title">{slide.title}</h1>
        <p className="welcome-body">{slide.body}</p>
        <div className="welcome-cta">
          {last ? (
            <Link className="btn btn-ping" href="/app">
              Enter the app <ArrowRight size={14} />
            </Link>
          ) : (
            <button type="button" className="btn btn-ping" onClick={() => setI((n) => n + 1)}>
              Next <ArrowRight size={14} />
            </button>
          )}
          <Link className="btn btn-ghost" href="/app">
            Skip to the App
          </Link>
        </div>
        <div className="welcome-dots" role="tablist" aria-label="Welcome slides">
          {SLIDES.map((_, n) => (
            <button
              key={n}
              type="button"
              role="tab"
              aria-selected={n === i}
              className={n === i ? "on" : ""}
              onClick={() => setI(n)}
            />
          ))}
        </div>
        <div className="welcome-links">
          <a href={buyHref} target="_blank" rel="noopener noreferrer">
            Buy ${PROTOCOL.token} on pons
          </a>
          <Link href="/markets">Markets</Link>
          <Link href="/docs">Docs</Link>
        </div>
        <p className="welcome-note">{BRAND.disclaimer}</p>
      </div>
    </div>
  );
}
