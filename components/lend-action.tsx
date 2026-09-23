"use client";

import { useMemo, useState } from "react";
import { WalletButton } from "@/components/wallet-button";
import { TokenIcon } from "@/components/token-icon";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatAmt, formatApy, formatUsd } from "@/lib/format";
import { applyAction, bookFor, formatHealth, maxAmount, snapshot } from "@/lib/lend";
import { GAS_ETH } from "@/lib/markets";
import type { LendAction, Market } from "@/lib/types";
import { useLend } from "@/lib/use-lend";

const PCTS = [25, 50, 75, 100];

const TITLES: Record<LendAction, string> = {
  supply: "Supply",
  withdraw: "Withdraw",
  borrow: "Borrow",
  repay: "Repay",
};

export function LendActionDialog({
  market,
  action,
  open,
  onOpenChange,
}: {
  market: Market | null;
  action: LendAction;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { wallet, markets, snap, runLend } = useLend();
  const [raw, setRaw] = useState("");

  const book = market ? bookFor(snap.books, market.id) : null;
  const max = market && book ? maxAmount(action, market, book, snap.bag, snap) : 0;
  const amount = Number(raw);
  const validAmt = Number.isFinite(amount) && amount > 0;

  const preview = useMemo(() => {
    if (!market || !validAmt) return null;
    return applyAction(markets, snap.books, snap.bag, action, market.id, amount);
  }, [market, validAmt, markets, snap.books, snap.bag, action, amount]);

  const nextHealth =
    preview && preview.ok ? snapshot(markets, preview.books, preview.bag).health : snap.health;

  const close = (v: boolean) => {
    if (!v) setRaw("");
    onOpenChange(v);
  };

  const submit = () => {
    if (!market || !validAmt) return;
    const ok = runLend(action, market.id, amount);
    if (ok) close(false);
  };

  if (!market || !book) return null;

  const walletAmt = snap.bag[market.id] ?? 0;
  const fee = action === "borrow" && validAmt ? amount * market.originationFee : 0;

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="lend-modal">
        <DialogHeader>
          <DialogTitle>
            {TITLES[action]} {market.symbol}
          </DialogTitle>
          <DialogDescription>
            Robinhood Chain · gas ≈ {GAS_ETH} ETH. This book stays in your browser until a
            mainnet market is wired.
          </DialogDescription>
        </DialogHeader>

        <div className="lend-asset-chip">
          <TokenIcon symbol={market.symbol} size={28} />
          <div>
            <b>{market.symbol}</b>
            <span>{market.name}</span>
          </div>
          <em>{formatUsd(market.priceUsd)}</em>
        </div>

        <label className="lend-field">
          <span>Amount</span>
          <input
            inputMode="decimal"
            placeholder="0.00"
            value={raw}
            onChange={(e) => setRaw(e.target.value.replace(/[^0-9.]/g, ""))}
          />
          <i>
            {validAmt ? formatUsd(amount * market.priceUsd) : formatUsd(0)}
          </i>
        </label>

        <div className="pct-row" role="group" aria-label="Percent of max">
          {PCTS.map((p) => (
            <button
              key={p}
              type="button"
              className="pct-btn"
              onClick={() => setRaw(p === 100 ? String(max) : String(+(max * (p / 100)).toPrecision(8)))}
            >
              {p}%
            </button>
          ))}
        </div>

        <dl className="lend-meta">
          <div>
            <dt>Wallet</dt>
            <dd>
              {formatAmt(walletAmt)} {market.symbol}
            </dd>
          </div>
          <div>
            <dt>{action === "borrow" || action === "repay" ? "Borrowed" : "Supplied"}</dt>
            <dd>
              {formatAmt(action === "borrow" || action === "repay" ? book.borrowed : book.supplied)}{" "}
              {market.symbol}
            </dd>
          </div>
          <div>
            <dt>APY</dt>
            <dd>{formatApy(action === "borrow" || action === "repay" ? market.borrowApy : market.supplyApy)}</dd>
          </div>
          <div>
            <dt>Health</dt>
            <dd>
              {formatHealth(snap.health)} → {formatHealth(nextHealth)}
            </dd>
          </div>
          {action === "borrow" ? (
            <div>
              <dt>Origination</dt>
              <dd>0.30%{validAmt ? ` · ${formatAmt(fee)} ${market.symbol}` : ""}</dd>
            </div>
          ) : null}
          <div>
            <dt>Gas</dt>
            <dd>≈ {GAS_ETH} ETH</dd>
          </div>
        </dl>

        {preview && !preview.ok ? <p className="lend-err">{preview.error}</p> : null}

        {wallet ? (
          <button
            type="button"
            className={`btn ${action === "borrow" ? "btn-borrow" : "btn-ping"} lend-go`}
            disabled={!validAmt || Boolean(preview && !preview.ok)}
            onClick={submit}
          >
            {TITLES[action]} {market.symbol}
          </button>
        ) : (
          <WalletButton />
        )}
      </DialogContent>
    </Dialog>
  );
}

export function useLendDialog() {
  const [state, setState] = useState<{ market: Market | null; action: LendAction }>({
    market: null,
    action: "supply",
  });
  const open = (market: Market, action: LendAction) => setState({ market, action });
  const onOpenChange = (v: boolean) => {
    if (!v) setState((s) => ({ ...s, market: null }));
  };
  return {
    ...state,
    open,
    onOpenChange,
    visible: Boolean(state.market),
  };
}
