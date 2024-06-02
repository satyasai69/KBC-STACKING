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

// import result from "./result.json";

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

  const [result, setResult] = useState([]);

  const abi = [
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

  // Function to fetch data from the smart contract
  const fetchData = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        "https://mainnet-rpc.kbcfoundation.com"
      ); // Initialize provider
      const contractAddress = "0xB147E95b6146b29Fe2CD4c406A0aeC6d1722F0CF"; // "0x2c881D617d537f80751b3a38F899c8c8E721403F"; // "0xdadbF69a5FDd345dCc833072Cf4f6bc8FC799543"; // "0x164801E21f133572FA174c6A96D234ba00573A4d"; // Address of your smart chef contract
      const contract = new ethers.Contract(contractAddress, abi, provider); // Initialize contract instance
      const data = await contract.getDeployedPools(); // Call the read function from your smart contract
      setResult(data); // Update the state with the result
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  console.log(result, "result");
  // Fetch data when component mounts
  useEffect(() => {
    fetchData();
    console.log(result);

    // Fetch data every 30 seconds
    const intervalId = setInterval(() => {
      fetchData();
    }, 30000);
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  /* const result = useReadContract({
    abi,
    address: "0x164801E21f133572FA174c6A96D234ba00573A4d",
    functionName: "getDeployedPools",
  });
   */

  /* useEffect(() => {
    console.log(result, "address");
  }, [result]); */

  return (
    <main className="relative">
      <div className="absolute top-0 right-0 mt-4 mr-4 m-4">
        <ConnectButton />
      </div>
      <div className="flex flex-wrap justify-center items-start h-screen m-9 gap-6">
        {" "}
        {result.map((result, index) => (
          <li key={index}>
            <Stackcard
              stack={result.stakedToken}
              pool={result.smartChefAddress}
              reward={result.rewardToken}
            />
          </li>
        ))}
      </div>
    </main>
  );
}

// flex flex-col items-center justify-center h-screen m-6

/**     {result.map((result, index) => (
      <li key={index}> <Stackcard stack= {result.stakedToken} pool= {result.smartChefAddress}/></li>
    ))} */

/**     <div>
          <ul>
            {result.map((result, index) => (
              <li key={index}>{result.stakedToken}</li>
            ))}
          </ul>
        </div> */
