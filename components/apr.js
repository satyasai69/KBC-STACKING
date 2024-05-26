/* import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useAccount } from "wagmi"; // Assuming useAccount is imported correctly

// Define the Stackedbal component
export function Apr(stack, reward) {
  const [TokenAbal, setTokenAbal] = useState();
  const [TokenBbal, setTokenBbal] = useState();
  const [APR, setAPR] = useState("");
  // Get user account address
  const { address } = useAccount();

  // Wei value
  const weiValue = ethers.BigNumber.from("1000000000000000000"); // Example Wei value (1 Ether in Wei)

  // Function to fetch data from the contract
  async function TokenA() {
    try {
      // Connect to the blockchain provider
      const provider = new ethers.providers.JsonRpcProvider(
        "https://testnet-rpc.kbcfoundation.com/"
      );
      // Define contract address and ABI
      const contractAddressA = stack.stack; // "0x7718f81c0E52E4d46619D2b7Ee11D11260D3898C"; // stack token

      const erc20ABI = [
        "function balanceOf(address account) external view returns (uint256)",
      ];
      // Instantiate the contract
      const contractA = new ethers.Contract(
        contractAddressA,
        erc20ABI,
        provider
      );

      // Call the contract function to fetch data
      const dataA = await contractA.balanceOf(address);

      // Convert Wei to Ether
      const etherValueA = ethers.utils.formatEther(dataA.toString());

      // Limit Ether value to three decimal places
      const formattedEtherValueA = etherValueA; // parseFloat(etherValueA).toFixed(3);

      setTokenAbal(etherValueA);
    } catch (error) {
      console.error("Error fetching contract data:", error);
    }
  }

  // Function to fetch data from the contract
  async function TokenB() {
    try {
      // Connect to the blockchain provider
      const provider = new ethers.providers.JsonRpcProvider(
        "https://testnet-rpc.kbcfoundation.com/"
      );
      // Define contract address and ABI

      const contractAddressB = stack.reward; // "0xc35908aBaBc634F4eB104dd9Ee01fA35Be6D0030"; // Reward token

      const erc20ABI = [
        "function balanceOf(address account) external view returns (uint256)",
      ];
      const contractB = new ethers.Contract(
        contractAddressB,
        erc20ABI,
        provider
      );
      // Call the contract function to fetch data

      const dataB = await contractB.balanceOf(address);
      // Convert Wei to Ether
      const etherValueB = ethers.utils.formatEther(dataB.toString());

      // Limit Ether value to three decimal places
      const formattedEtherValueB = etherValueB; // parseFloat(etherValueB).toFixed(3);

      setTokenBbal(etherValueB);
      getAPR();

      // console.log(APR.toString(), "s");
    } catch (error) {
      console.error("Error fetching contract data:", error);
    }
  }

  function getAPR() {
    const totalBlocksPerYear = 3153600;
    // Calculate APR
    const APRs = ((TokenBbal / TokenAbal) * totalBlocksPerYear).toFixed(2);
    console.log(TokenAbal, stack.stack);
    console.log(TokenBbal, stack.reward);
    console.log(APRs);
    setAPR(APRs);
  }

  // Call fetchDataWithParams function when component mounts or when address changes
  useEffect(() => {
    /* TokenA();
    TokenB();
    getAPR(); 

    // Call fetchDataWithParams function every 1 minute
    const intervalIdA = setInterval(TokenA, 30000); // 1 minute = 60000 milliseconds
    const intervalIdB = setInterval(TokenB, 30000); // 1 minute = 60000 milliseconds
    const APR = setInterval(getAPR, 30000); // 1 minute = 60000 milliseconds

    // Clean up function to clear the interval when component unmounts or when address changes
    return () => clearInterval(intervalIdA, intervalIdB);*/ /*

    async function fetchData() {
      await TokenA();
      await TokenB();
      getAPR();
    }

    fetchData();

    // Call fetchDataWithParams function every 30 seconds
    const intervalId = setInterval(fetchData, 30000); // 30 seconds = 30000 milliseconds

    // Clean up function to clear the interval when component unmounts or when address changes
    return () => clearInterval(intervalId);
  }, [address]);

  // Render the component
  return <>{parseFloat(APR) > 0 && <h1>{APR}%</h1>}</>;
} */

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useAccount } from "wagmi"; // Assuming useAccount is imported correctly

const Apr = ({ stack }) => {
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [balance, setBalance] = useState("");
  const [Rbalance, setRBalance] = useState("");
  const [APR, setAPR] = useState("");

  useEffect(() => {
    const fetchTokenInfo = async () => {
      try {
        // Connect to Ethereum provider
        const provider = new ethers.providers.JsonRpcProvider(
          `https://testnet-rpc.kbcfoundation.com/`
        );

        // Instantiate the token contract
        const tokenContract = new ethers.Contract(
          stack.stack,
          ["function balanceOf(address) view returns (uint256)"],
          provider
        );

        // Instantiate the token contract
        const RtokenContract = new ethers.Contract(
          stack.reward,
          ["function balanceOf(address) view returns (uint256)"],
          provider
        );

        // Fetch token symbol
        // const symbol = await tokenContract.symbol();
        // setTokenSymbol(symbol);

        // Fetch user balance
        const userBalance = await tokenContract.balanceOf(stack.pool);
        const RuserBalance = await RtokenContract.balanceOf(stack.pool);

        setBalance(ethers.utils.formatEther(userBalance)); // Assuming the token uses Ether-like decimals
        setRBalance(ethers.utils.formatEther(RuserBalance));
      } catch (error) {
        console.error("Error fetching token information:", error);
      }
    };

    fetchTokenInfo();
  }, [stack.stack, stack.reward, stack.pool]);
  console.log(stack.stack, stack.reward, stack.pool, stack);
  const totalBlocksPerYear = 3153600;
  const APRs = ((balance / Rbalance) * totalBlocksPerYear).toFixed(2);
  const APRToShow = isFinite(APRs) ? `${APRs}%` : "3%";
  const cappedAPR = Math.min(APRToShow, 5000); // Cap the APR at 5000
  const APRToShow1 = isFinite(cappedAPR) ? `${cappedAPR}%` : "300%"; // Show "3000%" for non-finite values

  return (
    <div>
      <p>{APRToShow1}</p>
    </div>
  );
};

export default Apr;
