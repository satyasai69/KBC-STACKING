import {
  useWaitForTransactionReceipt,
  useWriteContract,
  useSendTransaction,
} from "wagmi";
//import { abi } from "../ABI/abi.json";
import { useState, useEffect } from "react";

const abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "TokensLocked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "TokensUnlocked",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_tokenupdate",
        type: "address",
      },
    ],
    name: "Tokenupdate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "lockTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "token",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_resiver",
        type: "address",
      },
    ],
    name: "unlockTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

export function Bridgebutton(value) {
  const [connectedNetwork, setConnectedNetwork] = useState(null);
  //const [networkName, setNetworkName] = useState("");
  //const [tokenaddress, settokenaddress] = useState();
  const {
    data: hash,
    writeContract,
    isPending,
    isSuccess,
  } = useWriteContract();

  // Multiply the token amount by the multiplier to get the amount in Wei
  //const weiAmount = BigInt(value) * BigInt(multiplier);

  const obj = {
    toString: function () {
      return value; // Example numerical value as string
    },
  };

  const number = parseFloat(obj.toString());

  // Calculate the multiplier based on the number of decimals
  const multiplier = 10 ** 18;

  // Multiply the token amount by the multiplier to get the amount in Wei
  //const weiAmount = BigInt(number) * BigInt(multiplier);
  //onsole.log(weiAmount, "s");

  // Multiply the token amount by the multiplier to get the amount in Wei
  //const weiAmount = BigInt(value) * BigInt(multiplier);
  // Multiply the token amount by the multiplier to get the amount in Wei

  const handleClick = async () => {
    /*const recipientsArray = recipientsText
      .split("\n")
      .map((address) => address.trim())
      .filter((address) => address !== ""); */

    //console.log(recipientsArray)
    //console.log("Number of addresses:", recipients.length);

    try {
      const decimals = 18;
      //const valueInWei = Math.round(ethValue * 1e18); // Convert amount to Wei

      await writeContract({
        abi,
        address: "0x9A9bc340103C462365Db54E423f95784C664d3Df", // "0xBD933Db03dA178059079590B50b8e2bbE09313b0",
        functionName: "lockTokens",
        args: [BigInt(value.weiAmount)], //[ BigInt(value * 18)],
        value: 0, //BigInt(valueInWei), // Set the value property to send ETH
      });
      //console.log("Number of addresses:", recipients.length);
      //const totalamount =  amount * recipients.length;
      //console.log(BigInt(value * 10 ** decimals));

      //console.log(isPending ? "Confirming..." : "Mint");
      console.log(" successful!");
      //await transferform();
    } catch (error) {
      console.error("Error during bridge:", error);
      console.log(value);
    }
  };

  const handleClick2 = async () => {
    /*const recipientsArray = recipientsText
      .split("\n")
      .map((address) => address.trim())
      .filter((address) => address !== ""); */

    //console.log(recipientsArray)
    //console.log("Number of addresses:", recipients.length);

    try {
      const decimals = 18;
      //const valueInWei = Math.round(ethValue * 1e18); // Convert amount to Wei

      await writeContract({
        abi,
        address: "0xC5052054DBDC35f84D279CB321bE98480d807f6F", // "0x617c5814f9c52e3768FD233088A01cc6dE25c58A",
        functionName: "lockTokens",
        args: [BigInt(weiAmount)], //[ BigInt(value * 18)],
        value: 0, //BigInt(valueInWei), // Set the value property to send ETH
      });
      //console.log("Number of addresses:", recipients.length);
      //const totalamount =  amount * recipients.length;
      console.log(BigInt(value * 10 ** decimals));

      //console.log(isPending ? "Confirming..." : "Mint");
      console.log(" successful!");
      //await transferform();
    } catch (error) {
      console.error("Error during approval:", error);
    }
  };

  const handleClickfack = async () => {
    /*const recipientsArray = recipientsText
      .split("\n")
      .map((address) => address.trim())
      .filter((address) => address !== ""); */

    //console.log(recipientsArray)
    //console.log("Number of addresses:", recipients.length);

    try {
      const decimals = 18;
      //const valueInWei = Math.round(ethValue * 1e18); // Convert amount to Wei

      await writeContract({
        abi,
        address: "0xC5052054DBDC35f84D279CB321bE98480d807f6F", // "0x617c5814f9c52e3768FD233088A01cc6dE25c58A",
        functionName: "lockTokens",
        args: [BigInt(weiAmount)], //[ BigInt(value * 18)],
        value: 0, //BigInt(valueInWei), // Set the value property to send ETH
      });
      //console.log("Number of addresses:", recipients.length);
      //const totalamount =  amount * recipients.length;
      console.log(BigInt(value * 10 ** decimals));

      //console.log(isPending ? "Confirming..." : "Mint");
      console.log(" successful!");
      //await transferform();
    } catch (error) {
      console.error("Error during approval:", error);
    }
  };

  useEffect(() => {
    const checkNetwork = async () => {
      try {
        if (window.ethereum) {
          // Wait for the Ethereum provider to be connected
          await window.ethereum.enable();

          // Access the chainId property for the chain ID
          const chainId = window.ethereum.chainId;
          setConnectedNetwork(chainId);
        }
      } catch (error) {
        console.error("Error checking network:", error);
      }
    };

    // Initial check on component mount
    checkNetwork();

    // Set up interval to refresh every 1 second
    const intervalId = setInterval(checkNetwork, 1000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means it only runs on mount and unmount

  console.log(connectedNetwork);

  /*useEffect(() => {
      // Check the value of connectedNetwork and set networkName accordingly
      switch (connectedNetwork) {
        case "0x11155111":
          settokenaddress(0x617c5814f9c52e3768fd233088a01cc6de25c58a);
          break;
        case "0x97":
          settokenaddress(0xf6e83df1a9659e9923e43a85ae6d8f07a2c95b61);
          break;
  
        // Add cases for other chains
        // ...
        default:
          // Handle other cases if needed
          setNetworkName(""); // Default value if connectedNetwork is not matched
      }
    }, [connectedNetwork]); // Run this effect whenever connectedNetwork changes  */

  return (
    <button
      className="w-full bg-[#3ab0ff] text-[#efefef] font-medium text-center p-[10px] rounded-xl mt-7"
      onClick={connectedNetwork === "0x2af8" ? handleClick : handleClick2}
    >
      Bridge
    </button>
  );
}

// onClick={connectedNetwork === "0x2af8" ? handleClick : handleClick2}
