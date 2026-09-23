import Link from "next/link";
import { PROTOCOL } from "@/lib/tokens";

export const metadata = {
  title: `${PROTOCOL.name} Academy`,
  description: `Learn supply, borrow, health factor, and pons on Robinhood Chain.`,
};

const lessons = [
  {
    n: "01",
    title: "Why this is not TON",
    body: "EVAA lives on TON. This book is Robinhood Chain. ETH pays gas. pons is the launchpad.",
    href: "/docs",
  },
  {
    n: "02",
    title: "Supply to earn",
    body: "Pick ETH, USDG, PONS, or an LP. Deposit. APY is variable with utilization.",
    href: "/app",
  },
  {
    n: "03",
    title: "Collateral and borrow",
    body: "Leave collateral on, then borrow another asset. Origination is 0.30%.",
    href: "/app",
  },
  {
    n: "04",
    title: "Health factor",
    body: "Collateral × liquidation threshold ÷ borrows. Stay above 1.00. This UI blocks under 1.05.",
    href: "/markets",
  },
  {
    n: "05",
    title: "pons loop",
    body: "Buy or launch on pons. Bring PONS or PONS/WETH LP back as collateral.",
    href: "/markets/pons",
  },
  {
    n: "06",
    title: "Your first book",
    body: "Connect, supply a bag you already hold in the demo wallet, then draw USDG.",
    href: "/app",
  },
];

export default function AcademyPage() {
  return (
    <div className="app-page">
      <div className="academy-hero">
        <p className="tok-name" style={{ letterSpacing: "0.16em", textTransform: "uppercase" }}>
          Academy
        </p>
        <h1
          style={{
            fontFamily: "var(--f-display)",
            fontSize: "clamp(28px,4vw,44px)",
            letterSpacing: "-0.03em",
            margin: "8px 0 12px",
          }}
        >
          Supply, borrow, watch health.
        </h1>
        <p style={{ color: "var(--text-2)", maxWidth: "62ch", margin: 0, lineHeight: 1.65, fontSize: 16 }}>
          Short path from the welcome slides to a live book on Robinhood Chain. Full English. Docs
          have the Bangla summary. No seed phrases.
        </p>
      </div>
      <div className="lesson-grid">
        {lessons.map((l) => (
          <Link key={l.n} href={l.href} className="lesson">
            <span className="n">Lesson {l.n}</span>
            <h3>{l.title}</h3>
            <p style={{ margin: 0, color: "var(--text-2)", fontSize: 14, lineHeight: 1.55 }}>
              {l.body}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
