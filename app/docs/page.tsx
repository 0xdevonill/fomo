import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { PONS_APP, PONS_DOCS, PONS_TOKEN } from "@/lib/markets";
import { PROTOCOL } from "@/lib/tokens";

export const metadata = {
  title: `${PROTOCOL.name} docs`,
  description: `Supply, borrow, and pons alignment for ${PROTOCOL.name} on Robinhood Chain.`,
};

export default function DocsPage() {
  const token = PROTOCOL.token;
  const name = PROTOCOL.name;

  return (
    <article className="docs-page">
      <p className="tok-name" style={{ letterSpacing: "0.16em", textTransform: "uppercase" }}>
        {name} · protocol notes
      </p>
      <h1>
        {name} (${token}) — lending on Robinhood Chain, aligned with pons.
      </h1>
      <p>
        This is the EVAA-style book for this chain: supply to earn, collateral to borrow, health
        factor to stay solvent. TON is not here. Gas is ETH on chain id 4663. Trading and launches
        stay on pons.
      </p>

      <div className="bn-summary">
        <h2>বাংলায় সংক্ষেপ</h2>
        <p>
          <b>নাম:</b> {name} &nbsp;|&nbsp; <b>টিকার:</b> ${token} &nbsp;|&nbsp;{" "}
          <b>চেইন:</b> Robinhood Chain (4663) &nbsp;|&nbsp; <b>লঞ্চপ্যাড:</b> pons.
        </p>
        <p>
          <b>কী করে:</b> EVAA যেমন TON-এ সাপ্লাই/বোরো করে, এখানে সেই লুপ Robinhood-এ। ETH, USDG,
          PONS, স্টক টোকেন, মিম, আর pons LP সাপ্লাই করলে APY পাবেন। কল্যাটারাল অন করে বোরো করতে
          পারবেন। হেলথ ফ্যাক্টর ১-এর নিচে গেলে লিকুইডেশন।
        </p>
        <p>
          <b>pons-এর সাথে মিল:</b> PONS ও PONS/WETH LP মার্কেটে আছে। বাই বাটন pons লঞ্চপ্যাডে যায়।
          টোকেন তৈরি, ট্রেড, গ্র্যাজুয়েশন pons-এ। এই অ্যাপ শুধু লেন্ডিং বই দেখায়।
        </p>
        <p>
          <b>যা করব না:</b> অফিসিয়াল Robinhood বা pons বলে চালিয়ে দেওয়া, সিড ফ্রেজ চাওয়া, মেইননেট
          লোন সেটেল করা (এখনো ব্রাউজার বই)। ক্রিপ্টো রিস্কি। এটা অ্যাডভাইস নয়।
        </p>
      </div>

      <h2>1. How it maps to EVAA</h2>
      <table>
        <thead>
          <tr>
            <th>EVAA on TON</th>
            <th>This app on Robinhood</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Welcome slides → skip to app</td>
            <td>Landing at `/` → dashboard at `/app`</td>
          </tr>
          <tr>
            <td>Your supplies / available to borrow</td>
            <td>Same two-column book with health ring</td>
          </tr>
          <tr>
            <td>TON, USDT, jettons, DeDust LP</td>
            <td>ETH, USDG, PONS, stock tokens, pons LP</td>
          </tr>
          <tr>
            <td>0.30% borrow origination</td>
            <td>Same fee, taken from the drawn amount</td>
          </tr>
          <tr>
            <td>Telegram / TON Space</td>
            <td>MetaMask, Rabby, WalletConnect on chain 4663</td>
          </tr>
        </tbody>
      </table>

      <h2>2. Markets and risk</h2>
      <p>
        Each market has a supply APY, borrow APY, LTV, liquidation threshold, and bonus. Rates
        follow utilization. Health factor is collateral × threshold ÷ borrows. Keep it above 1.05
        in this UI; 1.00 is the liquidation line.
      </p>
      <ul>
        <li>Supply subtracts from the demo wallet bag and starts earning the listed APY.</li>
        <li>Collateral is on by default for assets that allow it.</li>
        <li>Borrow is capped by LTV. Origination is 0.30%.</li>
        <li>Withdraw / turn collateral off is blocked if health would break.</li>
      </ul>

      <h2>3. pons alignment</h2>
      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Launchpad</td>
            <td>
              <a href={PONS_APP} target="_blank" rel="noopener noreferrer">
                ponsfamily.com/launchpad
              </a>
            </td>
          </tr>
          <tr>
            <td>pons docs</td>
            <td>
              <a href={PONS_DOCS} target="_blank" rel="noopener noreferrer">
                docs.ponsfamily.com
              </a>
            </td>
          </tr>
          <tr>
            <td>PONS token</td>
            <td>
              <code>{PONS_TOKEN}</code>
            </td>
          </tr>
          <tr>
            <td>WETH (pons quote)</td>
            <td>
              <code>0x0Bd7D308f8E1639FAb988df18A8011f41EAcAD73</code>
            </td>
          </tr>
          <tr>
            <td>How we write it</td>
            <td>pons in lowercase, per their docs. Not an official partner page.</td>
          </tr>
        </tbody>
      </table>
      <p>
        Buy ${token} on pons, then supply it or the ${token}/WETH LP here. PONS itself is a core
        market — the TON analogue on this chain.
      </p>

      <h2>4. What is live vs demo</h2>
      <p>
        Wallet connect is real Robinhood Chain mainnet when a WalletConnect project ID is set.
        The supply / borrow book is local to this browser, same as the older pool mints. No seed
        phrase is ever requested. {BRAND.disclaimer}
      </p>

      <p>
        <Link href="/app">Open the dashboard</Link>
        {" · "}
        <Link href="/markets">Browse markets</Link>
        {" · "}
        <Link href="/academy">Academy</Link>
      </p>
    </article>
  );
}
