"use client";

import { createConfig, http, injected } from "wagmi";
import { walletConnect } from "wagmi/connectors";
import { robinhoodChain } from "@/lib/robinhood-chain";
import { wallet } from "@/lib/site";

const connectors = [
  injected({ shimDisconnect: true }),
  ...(wallet.projectId
    ? [
        walletConnect({
          projectId: wallet.projectId,
          showQrModal: true,
          metadata: {
            name: "Fomo Ping",
            description:
              "Lending protocol on Robinhood Chain, aligned with pons.",
            url: "https://newdexx.vercel.app",
            icons: ["https://newdexx.vercel.app/logo.png"],
          },
        }),
      ]
    : []),
];

export const wagmiConfig = createConfig({
  chains: [robinhoodChain],
  connectors,
  transports: {
    [robinhoodChain.id]: http(wallet.rpc),
  },
  ssr: true,
});
