import { useState, useEffect } from "react";
import {
  useWaitForTransactionReceipt,
  useWriteContract,
  useSendTransaction,
  useReadContract,
  useNetwork,
} from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useConnect, useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Admin() {
  const [stakaddress, usestakaddress] = useState();
  const [rewardaddress, setrewardaddress] = useState();
  const [rewardpreblock, setrewardpreblock] = useState();
  const [startBlock, setstartBlock] = useState();
  const [endBlock, setendBlock] = useState();
  const {
    data: hash,
    writeContract,
    isPending,
    isSuccess,
  } = useWriteContract();
  const { address } = useAccount();

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

  const createpool = async () => {
    try {
      const decimals = 18;

      const multiplier = 10 ** 18;

      //      const stakeweiAmount = BigInt(stackamount) * BigInt(multiplier);

      await writeContract({
        abi,
        address: "0x164801E21f133572FA174c6A96D234ba00573A4d",
        functionName: "deployPool",
        args: [
          stakaddress,
          rewardaddress,
          rewardpreblock,
          startBlock,
          endBlock,
        ],
        value: 0,
      });

      //   console.log(BigInt(value * 10 ** decimals));
      console.log(" successful!");
    } catch (error) {
      console.error("Error during staking:", error);
    }
  };

  // Handler function to update stakaddress state
  const handlestackingAddressChange = (event) => {
    usestakaddress(event.target.value);
  };

  const handlerewardAddressChange = (event) => {
    setrewardaddress(event.target.value);
  };

  const handleRewardpreblockChange = (event) => {
    setrewardpreblock(event.target.value);
  };

  const handleStartBlockChange = (event) => {
    setstartBlock(event.target.value);
  };

  const handleEndblockChange = (event) => {
    setendBlock(event.target.value);
  };

  return (
    <>
      <div className="absolute top-0 right-0 mt-4 mr-4">
        <ConnectButton />
      </div>
      <div className="flex flex-col items-center justify-center h-screen m-6">
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">create new pool</TabsTrigger>
            <TabsTrigger value="password">update tax fee on swaps</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>create new pools </CardTitle>
                <CardDescription>
                  create a new single stack and reward pools
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">stack address</Label>
                  <Input id="name" onChange={handlestackingAddressChange} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="username">reward address </Label>
                  <Input id="username" onChange={handlerewardAddressChange} />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="username">rewardPerBlock</Label>
                  <Input id="username" onChange={handleRewardpreblockChange} />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="username">startBlock</Label>
                  <Input id="username" onChange={handleStartBlockChange} />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="username">EndBlock</Label>
                  <Input id="username" onChange={handleEndblockChange} />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={createpool}>create</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password here. After saving, youll be logged out.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="current">Current password</Label>
                  <Input id="current" type="password" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">New password</Label>
                  <Input id="new" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save password</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
