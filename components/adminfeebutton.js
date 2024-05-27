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
  const [tax, sattax] = useState();

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
  ];
  const taxfeeupdate = async () => {
    try {
      await writeContract({
        abi,
        address: "0xDF77342e4a987CFEcB80011b79C431653c70b106", //factory address
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

  const handleTaxChange = (event) => {
    sattax(event.target.value);
  };

  return (
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
  );
}
