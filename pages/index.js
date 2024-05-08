import Image from "next/image";
import { Inter } from "next/font/google";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { BiSolidDownArrow } from "react-icons/bi";
import Logo from "../public/Logo.svg";

import React, { useState, useEffect } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
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
    <>
      <ConnectButton />
    </>
  );
}
