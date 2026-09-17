import Link from "next/link";

export const metadata = {
  title: "Helix Docs",
  description:
    "Provide liquidity, earn real fees, and grow the markets you already trade — on Robinhood Chain and Solana.",
};

export default function DocsPage() {
  return (
    <article className="docs-page">
      <p className="tok-name" style={{ letterSpacing: "0.16em", textTransform: "uppercase" }}>
        Helix Docs
      </p>
      <h1>Put your money to work: provide liquidity, earn real fees, and grow the ecosystem you are already using.</h1>
      <p>
        Helix makes providing liquidity easy. Full customization, detailed tracking, and every
        fee traced back to what you put in. No wallet access, no lockups, nothing to trust but
        the contract.
      </p>

      <h3>What is LPing?</h3>
      <p>
        LPing, short for liquidity providing, means depositing tokens into a pool so other
        people have something to trade against. Every swap through that pool pays a fee, and
        liquidity providers split it, sized to what they put in.
      </p>
      <p>That is the core mechanism. Everything else on this page is detail on top of it.</p>

      <h3>Why liquidity matters</h3>
      <p>
        Every new token needs a market before it needs anything else. More tokens launch every
        day, across more chains, and each one needs people willing to sit on both sides of a
        trade so buyers and sellers can actually meet.
      </p>
      <p>
        That is what LPs do. Not a side character in DeFi — the infrastructure everything else
        sits on top of. A token with no liquidity is a token nobody can actually trade, no
        matter how good the launch behind it.
      </p>
      <p>Helix exists for the people doing that work. On Robinhood Chain, and on Solana.</p>

      <div className="docs-grid">
        <div className="doc-card">
          <h4>Price stability</h4>
          <p>More liquidity means less price impact per trade.</p>
        </div>
        <div className="doc-card">
          <h4>Execution</h4>
          <p>Bigger orders fill without getting wrecked by slippage.</p>
        </div>
        <div className="doc-card">
          <h4>Market health</h4>
          <p>Liquid markets recover faster from shocks.</p>
        </div>
        <div className="doc-card">
          <h4>Trading strategy</h4>
          <p>Knowing where liquidity sits helps you time entries and exits.</p>
        </div>
      </div>

      <h3>Why Helix</h3>
      <p>
        Helix exists because managing LP positions on most platforms is tedious and not user
        friendly. Everything here is built to remove that friction, by liquidity providers who
        have felt it firsthand.
      </p>
      <div className="docs-grid">
        <div className="doc-card">
          <h4>Built for LPs, by LPs</h4>
          <p>
            The team uses Helix daily to manage its own positions. Every feature exists because
            we needed it ourselves, not because it looked good in a deck.
          </p>
        </div>
        <div className="doc-card">
          <h4>Earn money by providing liquidity</h4>
          <p>
            Deposit into a pool, traders pay to swap against it, and your share streams to you
            automatically. That is the entire earn loop.
          </p>
        </div>
      </div>

      <h3>Two core mechanics</h3>
      <p>Helix has two halves that feed each other. Neither depends on the other to work.</p>
      <div className="docs-grid">
        <div className="doc-card">
          <h4>Stakes</h4>
          <p>Put liquidity into a token pool and collect a share of the fees traders pay on it.</p>
        </div>
        <div className="doc-card">
          <h4>Pools</h4>
          <p>Build a shaped position from a single coin and manage it from one page.</p>
        </div>
      </div>
      <p>Based on Robinhood Chain and Solana fees from real trading.</p>

      <h2>Getting Started</h2>
      <p>
        Everything you need before your first deposit: a wallet, a little gas, and five minutes.
      </p>
      <h3>Connecting your wallet</h3>
      <p>
        On Robinhood Chain, Helix connects through any standard EVM wallet. MetaMask and Rabby
        cover most people; anything that supports WalletConnect works too. On Solana, use
        Phantom or Solflare. Click <b>Connect Wallet</b> top right, approve the connection in
        your wallet, you are in.
      </p>
      <p>
        Helix never asks for a seed phrase or private key, in the app or anywhere else. If
        something asks, it is not Helix.
      </p>
      <h3>Gas: what you need before you start</h3>
      <p>
        Every action on Helix — depositing, claiming, withdrawing — is a transaction, and every
        transaction costs a small amount of gas. On Robinhood Chain that is paid in ETH. On
        Solana it is paid in SOL. Keep a bit sitting in your wallet before you do anything else,
        on top of whatever you are depositing.
      </p>
      <p>
        Fees run well below Ethereum mainnet, but they are not zero. If a transaction fails or
        will not confirm, check your gas token first — it is the most common cause.
      </p>
      <p>
        From here: <Link href="/pools">Pools</Link> if you want to pick your own token and
        range, or <Link href="/stakes">Stakes</Link> if you would rather deposit into an
        existing one and let it run.
      </p>

      <h2>Stakes</h2>
      <p>
        A stake is attached to one token pool. Everyone who deposits owns a proportional slice,
        and rewards are split by that slice for as long as you stay in.
      </p>
      <div className="steps">
        <div className="step">
          <div className="step-n">1</div>
          <div>
            <b>Pick a stake</b>
            <p>Choose one coin or the quote asset & token at the current pool ratio.</p>
          </div>
        </div>
        <div className="step">
          <div className="step-n">2</div>
          <div>
            <b>Helix builds it</b>
            <p>You never handle LP tokens. Wallet asks once per step. Leftover is refunded.</p>
          </div>
        </div>
        <div className="step">
          <div className="step-n">3</div>
          <div>
            <b>Staked automatically</b>
            <p>Minted and staked for you in the same flow.</p>
          </div>
        </div>
      </div>
      <h3>Rewards</h3>
      <p>
        Rewards accrue continuously and are paid in the quote asset — WETH on Robinhood Chain,
        SOL on Solana — streamed out over a 7 day period rather than paid instantly, so a
        single large fee event does not all land on whoever happens to be staked that minute.
      </p>
      <h3>Getting out</h3>
      <p>
        Withdraw unstakes your position and turns it back into coins, in proportion to what the
        position holds. Nothing is sold on your behalf. Time lock none. Exit penalty none.
      </p>
      <h3>Creating a stake</h3>
      <p>
        Anyone can create a stake for a token that already has a quote-asset pool. Helix finds
        the pool automatically. One stake per pool through the interface, so stakers are not
        split across duplicates.
      </p>

      <h2>Pools</h2>
      <p>
        Find the token, read its chart, choose a shape, and mint. Every position is minted into
        a Helix contract that holds the position NFT. Only you have access to it. The Helix
        team cannot see or touch what you do with it.
      </p>
      <p>
        <b>Trending</b> ranks tokens whose volume is surging right now, hottest at the top.{" "}
        <b>Established</b> ranks the biggest caps that still trade.
      </p>
      <h3>Shapes</h3>
      <p>
        A position is a price range split into bins. The shape decides how your deposit spreads
        across them. Drag the min and max in your head, then commit: a narrow range concentrates
        capital and earns more per dollar while price stays inside it; a wide range earns less
        per dollar but needs less attention.
      </p>

      <h2>Fees</h2>
      <p>Helix takes 7.5% of the fees you claim.</p>
      <div className="steps">
        <div className="step">
          <div className="step-n">1</div>
          <div>
            <b>Trade happens</b>
            <p>Someone swaps through the pool.</p>
          </div>
        </div>
        <div className="step">
          <div className="step-n">2</div>
          <div>
            <b>Fee collected</b>
            <p>The pool&apos;s own swap fee.</p>
          </div>
        </div>
        <div className="step">
          <div className="step-n">3</div>
          <div>
            <b>Split</b>
            <p>92.5% to stakers / LPs. 7.5% to Helix.</p>
          </div>
        </div>
        <div className="step">
          <div className="step-n">4</div>
          <div>
            <b>Streamed to you</b>
            <p>Over 7 days, so no one fee event lands on one staker.</p>
          </div>
        </div>
        <div className="step">
          <div className="step-n">5</div>
          <div>
            <b>Claim</b>
            <p>No further cut. Compounding is not live yet — claim and redeposit.</p>
          </div>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Action</th>
            <th>Fee</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Claim fees collected</td>
            <td>7.5%</td>
            <td>Taken once, never from your deposit.</td>
          </tr>
          <tr>
            <td>Claim</td>
            <td>0</td>
            <td>Nothing further, the cut above is already applied.</td>
          </tr>
          <tr>
            <td>Deposit</td>
            <td>0</td>
            <td>Pool&apos;s own swap fee still applies if one side is swapped.</td>
          </tr>
          <tr>
            <td>Withdraw</td>
            <td>0</td>
            <td>No exit fee, no lockup.</td>
          </tr>
          <tr>
            <td>Creating a stake</td>
            <td>0</td>
            <td>Zero on this deployment. Gas only.</td>
          </tr>
        </tbody>
      </table>

      <h2>Chains</h2>
      <p>
        Helix runs on <b>Robinhood Chain</b> (chain id <code>4663</code>) and <b>Solana</b>.
        Switch chains from the top bar. Robinhood Chain is EVM; Solana is not. HELIX is the
        protocol token on both. This is not an official Robinhood product.
      </p>
      <table>
        <thead>
          <tr>
            <th>Network</th>
            <th>Gas</th>
            <th>Quote</th>
            <th>Rewards</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Robinhood Chain</td>
            <td>ETH</td>
            <td>ETH / USDG</td>
            <td>WETH</td>
          </tr>
          <tr>
            <td>Solana</td>
            <td>SOL</td>
            <td>SOL / USDC</td>
            <td>SOL</td>
          </tr>
        </tbody>
      </table>

      <h2>Contracts</h2>
      <p>
        Live on Robinhood Chain, chain id <code>4663</code>, and on Solana. Individual stakes
        are created by users, so their addresses are not fixed.
      </p>
      <table>
        <thead>
          <tr>
            <th>Contract</th>
            <th>What it does</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>VaultFactory</td>
            <td>Creates stakes. One per pool.</td>
          </tr>
          <tr>
            <td>VaultFarmFactory</td>
            <td>Attaches the reward stream to a stake.</td>
          </tr>
          <tr>
            <td>HelixZap</td>
            <td>Turns a single coin into a balanced stake deposit.</td>
          </tr>
          <tr>
            <td>HelixLadderManager</td>
            <td>Holds the ladders you open and takes the 7.5% claim fee on fees collected.</td>
          </tr>
          <tr>
            <td>HelixPositionBuilder</td>
            <td>Mints the concentrated liquidity positions for ladders.</td>
          </tr>
        </tbody>
      </table>

      <h2>Glossary</h2>
      <table>
        <thead>
          <tr>
            <th>Term</th>
            <th>Definition</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>LP / LPing</td>
            <td>Depositing tokens into a pool so other people have something to trade against.</td>
          </tr>
          <tr>
            <td>Pool</td>
            <td>A market where a token trades against another asset.</td>
          </tr>
          <tr>
            <td>Position</td>
            <td>What lands after you deposit into a pool. Only you control it.</td>
          </tr>
          <tr>
            <td>Stake</td>
            <td>A deposit attached to one token pool. Rewards split by share.</td>
          </tr>
          <tr>
            <td>Shape</td>
            <td>How your Pools deposit spreads across the bins in your chosen range.</td>
          </tr>
          <tr>
            <td>Robinhood Chain</td>
            <td>EVM chain Helix runs on, chain id 4663.</td>
          </tr>
          <tr>
            <td>Solana</td>
            <td>The second Helix deployment. Switch it from the top bar next to Robinhood.</td>
          </tr>
        </tbody>
      </table>

      <h2>Frequently asked</h2>
      <h3>Where do rewards actually come from?</h3>
      <p>
        Every trade that goes through the pool pays a fee — the swap fee traders already pay.
        Helix does not mint anything to fund your reward. It streams a share of that existing
        fee to you.
      </p>
      <h3>Do I need to claim to keep earning?</h3>
      <p>No. Rewards accrue whether or not you claim. Claiming just moves them to your wallet.</p>
      <h3>Can the team take my deposit?</h3>
      <p>
        No. Deposits sit in the stake or ladder contract and only your own wallet can withdraw
        them. The owner key can lower the fee and pause new deposits, but cannot raise the fee
        or move a staked position.
      </p>
    </article>
  );
}
