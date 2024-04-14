import {
  useWaitForTransactionReceipt,
  useWriteContract,
  useSendTransaction,
  useReadContract,
  useNetwork,
} from "wagmi";
import { useConnect, useAccount } from "wagmi";
import { abi } from "../approveABI/abi.json";
import { useState, useEffect } from "react";
import { Bridgebutton } from "@/components/bridgebutton";

export function ApproveToken(weiAmount) {
  const { connect, connectors } = useConnect();
  const { address } = useAccount();
  const [connectedNetwork, setConnectedNetwork] = useState(null);
  const [approvalStatus, setApprovalStatus] = useState(false);
  const [Tokenaddress, setTokenaddress] = useState("");
  const [Bridgecontract, setBridgecontract] = useState("");
  const [resultshow, setresultoshow] = useState("");

  const result2 = useReadContract({
    //kcp
    abi,
    address: "0xd8Be685E1868B4BAC6FE9D4dB8b6fDaA66CDc7f9", // token address
    functionName: "allowance",
    args: [
      address, // "0x2373a942FEbC0ee428b266bDD58275794E7f1553", // user address
      "0x8D7BC9cE6249C32c67fb9b81A83840FF72919084", // "0x9A9bc340103C462365Db54E423f95784C664d3Df", // KCP bridge contract address 0x9A9bc340103C462365Db54E423f95784C664d3Df
    ],
  });
  result2.data;

  console.log(result2.data, "kcp");

  const result = useReadContract({
    // bsc
    abi,
    address: "0x55d398326f99059fF775485246999027B3197955", // token address
    functionName: "allowance",
    args: [
      address, // "0x2373a942FEbC0ee428b266bDD58275794E7f1553", // user address
      "0xb1e4E35D059fB6c5A34493981E24EDf3d5044647", // "0xC5052054DBDC35f84D279CB321bE98480d807f6F", //BSC  bridge contract address
    ],
  });
  result.data;
  console.log(result.data, "bsc");

  // console.log(address);
  // console.log(result.data, "data");
  useEffect(() => {
    // Check approval status here and update approvalStatus state accordingly
    // You can use Web3.js or ethers.js to check the approval status
    // For demonstration purposes, let's assume approvalStatus is a boolean value
    if (resultshow > weiAmount.weiAmount) {
      setApprovalStatus(false);
    } else {
      setApprovalStatus(true);
    }

    //  const isApproved = true; // Example approval status
    // setApprovalStatus(isApproved);
  }, [resultshow, weiAmount.weiAmount]);
  //const [networkName, setNetworkName] = useState("");
  //const [tokenaddress, settokenaddress] = useState();
  const {
    data: hash,
    writeContract,
    isPending,
    isSuccess,
  } = useWriteContract();

  const approveAmount12 = weiAmount.weiAmount;

  const handleApprove = async () => {
    try {
      const approveAmount = weiAmount; //76544569876543467899876546789098765467890987651654567654565676776768;
      await writeContract({
        abi,
        address: "0xd8Be685E1868B4BAC6FE9D4dB8b6fDaA66CDc7f9", // "0x563574f776D4537767Caf3E93494028F1CfF3368", //"0x563574f776D4537767Caf3E93494028F1CfF3368", // "0xF6E83df1a9659E9923E43A85aE6d8F07a2C95b61", // `0x${tokenaddress}`, //tokenAddress,//"0x9b2cbE8Ad90fAB7362C6eC5A4896C7629CAe3D16", //token address
        functionName: "approve",
        args: [
          "0x8D7BC9cE6249C32c67fb9b81A83840FF72919084", // contract address kcb

          approveAmount12,
        ],
        value: 0, //BigInt(valueInWei), // Set the value property to send ETH
      });

      // Handle success if needed
      console.log("Approval successful! ETH");
    } catch (error) {
      // Handle error if needed
      console.error("Error during approval:", error, weiAmount);
    }
  };
  console.log(weiAmount);

  const handleApprove2 = async () => {
    try {
      const approveAmount = weiAmount; //76544569876543467899876546789098765467890987651654567654565676776768;
      await writeContract({
        abi,
        address: "0x55d398326f99059fF775485246999027B3197955", //"0x563574f776D4537767Caf3E93494028F1CfF3368", // "0xF6E83df1a9659E9923E43A85aE6d8F07a2C95b61", // `0x${tokenaddress}`, //tokenAddress,//"0x9b2cbE8Ad90fAB7362C6eC5A4896C7629CAe3D16", //token address
        functionName: "approve",
        args: [
          "0xb1e4E35D059fB6c5A34493981E24EDf3d5044647", // BSC contract address

          approveAmount12,
        ],
        value: 0, //BigInt(valueInWei), // Set the value property to send ETH
      });

      // Handle success if needed
      console.log("Approval successful! BSC");
    } catch (error) {
      // Handle error if needed
      console.error("Error during approval:", error, weiAmount);
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

  console.log(connectedNetwork, "chainID");

  useEffect(() => {
    // Check the value of connectedNetwork and set networkName accordingly
    switch (connectedNetwork) {
      case "0x2af8": //kcb
        setTokenaddress(0xd8be685e1868b4bac6fe9d4db8b6fdaa66cdc7f9);
        setBridgecontract(0x9a9bc340103c462365db54e423f95784c664d3df);
        setresultoshow(result2.data);

        break;
      case "0x38": //bsc
        setTokenaddress(0x55d398326f99059ff775485246999027b3197955);
        setBridgecontract(0xc5052054dbdc35f84d279cb321be98480d807f6f);
        setresultoshow(result.data);
        break;

      // Add cases for other chains
      // ...
      default:
        // Handle other cases if needed
        setTokenaddress("");
        setBridgecontract("");
    }
  }, [connectedNetwork, result, result2]); // Run this effect whenever connectedNetwork changes

  // Calculate the multiplier based on the number of decimals

  return (
    <div>
      {approvalStatus ? (
        <button
          className="w-full bg-[#3ab0ff] text-[#efefef] font-medium text-center p-[10px] rounded-xl mt-7"
          onClick={
            connectedNetwork === "0x2af8" ? handleApprove : handleApprove2
          }
        >
          Approval
        </button>
      ) : (
        <div></div>
      )}
    </div>
  );
}

//weiAmount={weiAmount}

/** <button
        className="w-full bg-[#3ab0ff] text-[#efefef] font-medium text-center p-[10px] rounded-xl mt-7"
        onClick={connectedNetwork === "0x2af8" ? handleApprove : handleApprove2}
      >
        Approval
      </button>
      {isSuccess && <div>{hash}</div>} */
