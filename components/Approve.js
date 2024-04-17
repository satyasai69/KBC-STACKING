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

  /**
   * <button
          className="w-full bg-[#3ab0ff] text-[#efefef] font-medium text-center p-[10px] rounded-xl mt-7"
          onClick={
            connectedNetwork === "0x2af8" ? handleApprove : handleApprove2
          }
        >
          Approval
        </button>
   */
  // py-2.5 px-5 me-2 text-sm font-medium  text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center
  return (
    <div>
      {isPending ? (
        <div className="w-full bg-[#3ab0ff] text-[#efefef] font-medium text-center p-[10px] rounded-xl mt-7">
          <button disabled type="button" class="">
            <svg
              aria-hidden="true"
              role="status"
              class="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="#1C64F2"
              />
            </svg>
            Loading...
          </button>
        </div>
      ) : (
        <button
          className="w-full bg-[#3ab0ff] text-[#efefef] font-medium text-center p-[10px] rounded-xl mt-7"
          onClick={
            connectedNetwork === "0x2af8" ? handleApprove : handleApprove2
          }
        >
          Approval
        </button>
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
