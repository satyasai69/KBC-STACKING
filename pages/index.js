import Image from "next/image";
import { Inter } from "next/font/google";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { BiSolidDownArrow } from "react-icons/bi";
import Logo from "../public/Logo.svg";
import { Stackcard } from "@/components/stackcard";

import React, { useState, useEffect } from "react";

import {
  useWaitForTransactionReceipt,
  useWriteContract,
  useSendTransaction,
  useReadContract,
  useNetwork,
} from "wagmi";
import Web3 from "web3";
import { ApproveToken } from "@/components/Approve";
import { Bridgebutton } from "@/components/bridgebutton";
import usdt from "../public/usdt.png";
import { useConnect, useAccount } from "wagmi";
import Footer from "@/components/Footer";
//import { abi } from "../ABI/abi.json";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ sendDataToParent }) {
  const { connect, connectors } = useConnect();
  const { address, isConnected } = useAccount();

  const {
    data: hash,
    writeContract,
    isPending,
    isSuccess,
  } = useWriteContract();

  return (
    <main className="relative">
      <div className="absolute top-0 right-0 mt-4 mr-4">
        <ConnectButton />
      </div>
      <div className="flex flex-col items-center justify-center h-screen m-6">
        <Stackcard />
      </div>
    </main>
  );
}
