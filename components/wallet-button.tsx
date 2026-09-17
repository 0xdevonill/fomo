"use client";

import { useState } from "react";
import { Wallet } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppState } from "@/lib/app-state";
import { shortAddr } from "@/lib/format";

export function WalletButton() {
  const { wallet, connect, disconnect, chain, pushToast } = useAppState();
  const [open, setOpen] = useState(false);
  const wallets =
    chain === "sol"
      ? ["Phantom", "Solflare", "WalletConnect"]
      : ["MetaMask", "Rabby", "WalletConnect"];

  if (wallet) {
    return (
      <button
        type="button"
        className="btn btn-ghost btn-sm wallet-chip"
        onClick={() => {
          disconnect();
          pushToast("Wallet disconnected");
        }}
        title="Disconnect"
      >
        <Wallet size={12} />
        {shortAddr(wallet)}
      </button>
    );
  }

  return (
    <>
      <button type="button" className="btn" onClick={() => setOpen(true)}>
        Connect Wallet
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="wallet-modal">
          <DialogHeader>
            <DialogTitle>Connect a wallet</DialogTitle>
            <DialogDescription>
              Helix never asks for a seed phrase or private key. Approve the
              connection in your wallet, then you are in.
            </DialogDescription>
          </DialogHeader>
          <div className="wallet-list">
            {wallets.map((w) => (
              <button
                key={w}
                type="button"
                className="wallet-opt"
                onClick={() => {
                  connect(w);
                  setOpen(false);
                  pushToast("Wallet connected", `${w} on ${chain === "sol" ? "Solana" : "Robinhood Chain"}`);
                }}
              >
                <span className="wallet-opt-mark">{w.slice(0, 1)}</span>
                {w}
              </button>
            ))}
          </div>
          <p className="wallet-note">
            Demo mode: no on-chain transaction is sent. Positions and stakes are
            stored in this browser so you can walk the full LP flow.
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
}
