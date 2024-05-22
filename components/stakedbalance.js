import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useAccount } from "wagmi"; // Assuming useAccount is imported correctly

// Define the Stackedbal component
export function Stackedbal() {
  // Define contract data state variable and setter
  const [contractData, setContractData] = useState("");
  // Get user account address
  const { address } = useAccount();

  // Wei value
  const weiValue = ethers.BigNumber.from("1000000000000000000"); // Example Wei value (1 Ether in Wei)

  // Function to fetch data from the contract
  async function fetchDataWithParams() {
    try {
      // Connect to the blockchain provider
      const provider = new ethers.providers.JsonRpcProvider(
        "https://testnet-rpc.kbcfoundation.com/"
      );
      // Define contract address and ABI
      const contractAddress = "0x862DFC7aC6152281f33e0CE252F3AB6996336690"; // Replace with your contract address
      const contractAbi = [
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
            {
              internalType: "uint256",
              name: "_rewardPerBlock",
              type: "uint256",
            },
            { internalType: "uint256", name: "_startBlock", type: "uint256" },
            {
              internalType: "uint256",
              name: "_bonusEndBlock",
              type: "uint256",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "user",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "Deposit",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "user",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "EmergencyWithdraw",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "poolLimitPerUser",
              type: "uint256",
            },
          ],
          name: "NewPoolLimit",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "rewardPerBlock",
              type: "uint256",
            },
          ],
          name: "NewRewardPerBlock",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "startBlock",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "endBlock",
              type: "uint256",
            },
          ],
          name: "NewStartAndEndBlocks",
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
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "blockNumber",
              type: "uint256",
            },
          ],
          name: "RewardsStop",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "token",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "TokenRecovery",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "bool",
              name: "isProfileRequested",
              type: "bool",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "thresholdPoints",
              type: "uint256",
            },
          ],
          name: "UpdateProfileAndThresholdPointsRequirement",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "user",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "Withdraw",
          type: "event",
        },
        {
          inputs: [],
          name: "PRECISION_FACTOR",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "accTokenPerShare",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "bonusEndBlock",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "claim",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "uint256", name: "_amount", type: "uint256" },
          ],
          name: "deposit",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "uint256", name: "_amount", type: "uint256" },
          ],
          name: "emergencyRewardWithdraw",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "emergencyWithdraw",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "lastRewardBlock",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
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
          inputs: [{ internalType: "address", name: "_user", type: "address" }],
          name: "pendingReward",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "_token", type: "address" },
          ],
          name: "recoverToken",
          outputs: [],
          stateMutability: "nonpayable",
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
          inputs: [],
          name: "rewardPerBlock",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "rewardToken",
          outputs: [
            {
              internalType: "contract IERC20Metadata",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "stakedToken",
          outputs: [
            {
              internalType: "contract IERC20Metadata",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "startBlock",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "stopReward",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "newOwner", type: "address" },
          ],
          name: "transferOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_rewardPerBlock",
              type: "uint256",
            },
          ],
          name: "updateRewardPerBlock",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "uint256", name: "_startBlock", type: "uint256" },
            {
              internalType: "uint256",
              name: "_bonusEndBlock",
              type: "uint256",
            },
          ],
          name: "updateStartAndEndBlocks",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [{ internalType: "address", name: "", type: "address" }],
          name: "userInfo",
          outputs: [
            { internalType: "uint256", name: "amount", type: "uint256" },
            { internalType: "uint256", name: "rewardDebt", type: "uint256" },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "_address", type: "address" },
          ],
          name: "userstacked",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "uint256", name: "_amount", type: "uint256" },
          ],
          name: "withdraw",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ];
      // Instantiate the contract
      const contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        provider
      );
      // Call the contract function to fetch data
      const data = await contract.userstacked(address);
      // Convert Wei to Ether
      const etherValue = ethers.utils.formatEther(data.toString());

      // Limit Ether value to three decimal places
      const formattedEtherValue = parseFloat(etherValue).toFixed(3);

      // Update contract data state variable with fetched data
      setContractData(formattedEtherValue.toString()); // Assuming data is a BigNumber
    } catch (error) {
      console.error("Error fetching contract data:", error);
    }
  }

  // Call fetchDataWithParams function when component mounts or when address changes
  useEffect(() => {
    fetchDataWithParams();
    // Call fetchDataWithParams function every 1 minute
    const intervalId = setInterval(fetchDataWithParams, 30000); // 1 minute = 60000 milliseconds

    // Clean up function to clear the interval when component unmounts or when address changes
    return () => clearInterval(intervalId);
  }, [address]);

  // Render the component
  return (
    <>
      <h1>USDT {contractData}</h1>
    </>
  );
}
