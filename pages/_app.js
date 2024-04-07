import { useState, useEffect } from "react";
import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import {
  mainnet,
  bsc,
  sepolia,
  bscTestnet,
  polygon,
  optimism,
  arbitrum,
  base,
} from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";


const kbcfoundation = {
  id: 11000,
  name: "kbcfoundation",
  iconUrl: "https://kbcfoundation.com/images/logo.png",
  iconBackground: "#fff",
  nativeCurrency: { name: "kbcfoundation", symbol: "KBC", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://mainnet-rpc.kbcfoundation.com"] },
  },
  blockExplorers: {
    default: { name: "kbcfoundation", url: "https://scan.kbcfoundation.com" },
  },
  /* contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 11907934,
    },
  }, */
};

export default function App({ Component, pageProps }) {
  const config = getDefaultConfig({
    appName: "My RainbowKit App",
    projectId: "YOUR_PROJECT_ID",
    chains: [bsc, kbcfoundation],
    ssr: true, // If your dApp uses server side rendering (SSR)
  });
  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Component {...pageProps} />;{/* Your App */}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
