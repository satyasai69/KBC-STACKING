import { useState, useEffect } from "react";
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
import {
  useWaitForTransactionReceipt,
  useWriteContract,
  useSendTransaction,
  useReadContract,
  useNetwork,
} from "wagmi";

export default function FeeButton() {
  const {
    data: hash,
    writeContract,
    isPending,
    isSuccess,
  } = useWriteContract();
  const [tax, settax] = useState();
  const [taxpair, settaxpair] = useState();
  const [taxpairaddress, settaxpairaddress] = useState();

  const abi = [
    {
      inputs: [
        {
          internalType: "address",
          name: "_feeToSetter",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_taxfee",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "token0",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "token1",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "pair",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "PairCreated",
      type: "event",
    },
    {
      constant: true,
      inputs: [],
      name: "INIT_CODE_PAIR_HASH",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "allPairs",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "allPairsLength",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "address",
          name: "tokenA",
          type: "address",
        },
        {
          internalType: "address",
          name: "tokenB",
          type: "address",
        },
      ],
      name: "createPair",
      outputs: [
        {
          internalType: "address",
          name: "pair",
          type: "address",
        },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "feeTo",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "feeToSetter",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "getPair",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "address",
          name: "_feeTo",
          type: "address",
        },
      ],
      name: "setFeeTo",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "address",
          name: "_feeToSetter",
          type: "address",
        },
      ],
      name: "setFeeToSetter",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "taxfee",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "uint256",
          name: "_newtax",
          type: "uint256",
        },
      ],
      name: "taxfeeupdate",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "address",
          name: "pairAddress",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "newTaxFee",
          type: "uint256",
        },
      ],
      name: "updatePairTaxFee",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  const taxfeeupdate = async () => {
    try {
      await writeContract({
        abi,
        address: "0x1f0F8504365e2F39D97e8B9Dd5399Bf04300A82d", //factory address
        functionName: "taxfeeupdate",
        args: [tax],
        value: 0,
      });
      console.log("tax updating to: ", tax);
      //   console.log(BigInt(value * 10 ** decimals));
      console.log(" successful!");
    } catch (error) {
      console.error("Error during staking:", error);
    }
  };

  const taxfeeupdatepair = async () => {
    try {
      await writeContract({
        abi,
        address: "0x1f0F8504365e2F39D97e8B9Dd5399Bf04300A82d", //factory address
        functionName: "updatePairTaxFee",
        args: [taxpairaddress, taxpair],
        value: 0,
      });
      console.log("tax updating to: ", taxpairaddress, taxpair);
      //   console.log(BigInt(value * 10 ** decimals));
      console.log(" successful!");
    } catch (error) {
      console.error("Error during staking:", error);
    }
  };

  const handleTaxChange = (event) => {
    settax(event.target.value);
  };

  const handleTaxonPairChange = (event) => {
    settaxpair(event.target.value);
  };
  const handleTaxChangepair = (event) => {
    settaxpairaddress(event.target.value);
  };
  return (
    <>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>TAXUPDATE</CardTitle>
            <CardDescription>Update tax fee on swaps</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Update tax </Label>
              <Input id="current" type="numbers" onChange={handleTaxChange} />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={taxfeeupdate}>Update tax</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>TAXUPDATE ON PAIRS</CardTitle>
            <CardDescription>
              Update tax fee on swaps depolyedn pairs
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Update tax on pair </Label>
              <Input
                id="current"
                type="numbers"
                onChange={handleTaxChangepair}
              />
            </div>
          </CardContent>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Update tax on pair </Label>
              <Input
                id="current"
                type="numbers"
                onChange={handleTaxonPairChange}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={taxfeeupdatepair}>Update tax</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </>
  );
}
