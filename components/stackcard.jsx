import React, { useState, useEffect } from "react";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useWaitForTransactionReceipt,
  useWriteContract,
  useSendTransaction,
  useReadContract,
  useNetwork,
} from "wagmi";
import { useConnect, useAccount } from "wagmi";
import { ApproveToken } from "@/components/Approve";
import { RewardapproveToken } from "./rewardApprove";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
// const ABI = require("../ABI/stack.json");
import { Stackedbal } from "./stakedbalance";
import { Apr } from "./apr";

export function Stackcard() {
  const {
    data: hash,
    writeContract,
    isPending,
    isSuccess,
  } = useWriteContract();
  const { address } = useAccount();

  const [stackamount, setstackamount] = useState();
  const [unstackamount, setunstackamount] = useState();
  const [claimamounts, setClaimAmounts] = useState("0");
  const [stackedbalances, setstackedbalances] = useState("0");

  /* const userStackedbakance = useReadContract({
    abi,
    address: "0x862DFC7aC6152281f33e0CE252F3AB6996336690", // token address
    functionName: "userstacked",
    args: [address],
  });

  userStackedbakance.data;

  console.log(stackedbalances);

  const unclaimamount = useReadContract({
    abi,
    address: "0x862DFC7aC6152281f33e0CE252F3AB6996336690", // token address
    functionName: "pendingReward",
    args: [address],
  });
  unclaimamount.data;

  const fetchClaimAmount = async () => {
    try {
      unclaimamount();

      setClaimAmounts(unclaimamount.data); // Update state here

      userStackedbakance();
      setstackedbalances(BigInt(userStackedbakance.data.toString()));
    } catch (error) {
      console.error("Error fetching claim amount:", error);
    }
  };

  useEffect(() => {
    fetchClaimAmount();
  }, []); */

  const stakecall = async () => {
    try {
      const decimals = 18;

      const multiplier = 10 ** 18;

      const stakeweiAmount = BigInt(stackamount) * BigInt(multiplier);

      await writeContract({
        abi,
        address: "0x862DFC7aC6152281f33e0CE252F3AB6996336690",
        functionName: "deposit",
        args: [BigInt(stakeweiAmount)],
        value: 0,
      });

      console.log(BigInt(value * 10 ** decimals));
      console.log(" successful!");
    } catch (error) {
      console.error("Error during staking:", error);
    }
  };

  const unstakecall = async () => {
    try {
      const decimals = 18;

      const multiplier = 10 ** 18;

      const unstakeweiAmount = BigInt(unstackamount) * BigInt(multiplier);

      await writeContract({
        abi,
        address: "0x862DFC7aC6152281f33e0CE252F3AB6996336690",
        functionName: "withdraw",
        args: [BigInt(unstakeweiAmount)],
        value: 0,
      });

      console.log(BigInt(value * 10 ** decimals));
      console.log(" successful!");
    } catch (error) {
      console.error("Error during staking:", error);
    }
  };

  const claim = async () => {
    try {
      await writeContract({
        abi,
        address: "0x862DFC7aC6152281f33e0CE252F3AB6996336690",
        functionName: "claim",
        args: [],
        value: 0,
      });

      console.log(BigInt(value * 10 ** decimals));
      console.log(" successful!");
    } catch (error) {
      console.error("Error during staking:", error);
    }
  };

  return (
    <Card className="w-full max-w-md ">
      <CardHeader>
        <CardTitle> stake </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Current APR
            </p>
            <p className="text-2xl font-medium">
              <Apr />
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Stacked Balance
            </p>
            <p className="text-2xl font-medium">
              <Stackedbal />
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Drawer>
            <DrawerTrigger>
              <Button variant="outline">
                <PlusIcon className="mr-2 h-4 w-4" />
                stake
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Enter amount to stake </DrawerTitle>
                <DrawerDescription>
                  To enjoy the staking rewards.
                </DrawerDescription>
              </DrawerHeader>

              <div className="grid grid-cols-3 items-center gap-4 ">
                <Label htmlFor="name" className="text-right"></Label>
                <Input
                  type="number"
                  placeholder="amount"
                  onChange={(e) => setstackamount(e.target.value)}
                />
              </div>

              <DrawerFooter>
                <ApproveToken weiAmount={stackamount} />
                <RewardapproveToken weiAmount={stackamount} />
                <DrawerClose>
                  <Button className="m-3" onClick={stakecall}>
                    Submit
                  </Button>
                  <Button className="m-3" variant="outline">
                    Cancel
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          <Drawer>
            <DrawerTrigger>
              <Button variant="outline">
                <MinusIcon className="mr-2 h-4 w-4" />
                unstake
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Enter amount to unstake </DrawerTitle>
                <DrawerDescription>no more staking rewards.</DrawerDescription>
              </DrawerHeader>

              <div className="grid grid-cols-3 items-center gap-4 ">
                <Label htmlFor="name" className="text-right"></Label>
                <Input
                  type="number"
                  placeholder="amount"
                  onChange={(e) => setunstackamount(e.target.value)}
                />
              </div>

              <DrawerFooter>
                <DrawerClose>
                  <Button className="m-3" onClick={unstakecall}>
                    Submit
                  </Button>
                  <Button className="m-3" variant="outline">
                    Cancel
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          <Button onClick={claim}>
            <DollarSignIcon className="mr-2 h-4 w-4" />
            Claim
          </Button>
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400"></div>
        </div>
      </CardContent>
    </Card>
  );
}

function DollarSignIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function MinusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
    </svg>
  );
}

function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

/**  <Button variant="outline">
            <PlusIcon className="mr-2 h-4 w-4" />
            stake
          </Button> */

const abi = [
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
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
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
      { indexed: true, internalType: "address", name: "user", type: "address" },
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
      { indexed: true, internalType: "address", name: "user", type: "address" },
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
    inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
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
    inputs: [{ internalType: "address", name: "_token", type: "address" }],
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
      { internalType: "contract IERC20Metadata", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "stakedToken",
    outputs: [
      { internalType: "contract IERC20Metadata", name: "", type: "address" },
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
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_rewardPerBlock", type: "uint256" },
    ],
    name: "updateRewardPerBlock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_startBlock", type: "uint256" },
      { internalType: "uint256", name: "_bonusEndBlock", type: "uint256" },
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
    inputs: [{ internalType: "address", name: "_address", type: "address" }],
    name: "userstacked",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
