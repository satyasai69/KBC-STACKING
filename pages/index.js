import Image from "next/image";
import { Inter } from "next/font/google";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { BiSolidDownArrow } from "react-icons/bi";
import Logo from "../public/Logo.svg";
import { Stackcard } from "@/components/stackcard";
import { ethers } from "ethers";
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

const factoryABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "smartChef",
        type: "address",
      },
    ],
    name: "NewSmartChefContract",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20Metadata",
        name: "_stakedToken",
        type: "address",
      },
      {
        internalType: "contract IERC20Metadata",
        name: "_rewardToken",
        type: "address",
      },
      { internalType: "uint256", name: "_rewardPerBlock", type: "uint256" },
      { internalType: "uint256", name: "_startBlock", type: "uint256" },
      { internalType: "uint256", name: "_bonusEndBlock", type: "uint256" },
    ],
    name: "deployPool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "deployedPools",
    outputs: [
      { internalType: "address", name: "smartChefAddress", type: "address" },
      { internalType: "address", name: "stakedToken", type: "address" },
      { internalType: "address", name: "rewardToken", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getDeployedPools",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "smartChefAddress",
            type: "address",
          },
          { internalType: "address", name: "stakedToken", type: "address" },
          { internalType: "address", name: "rewardToken", type: "address" },
        ],
        internalType: "struct SmartChefFactory.PoolInfo[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export default function Home({ sendDataToParent }) {
  const { connect, connectors } = useConnect();
  const { address, isConnected } = useAccount();

  const {
    data: hash,
    writeContract,
    isPending,
    isSuccess,
  } = useWriteContract();

  const result = useReadContract({
    factoryABI,
    address: "0x164801E21f133572FA174c6A96D234ba00573A4d",
    functionName: "getDeployedPools",
  });

  useEffect(() => {
    console.log(result, "address");
  }, [result]);

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
