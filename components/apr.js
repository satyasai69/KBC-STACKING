import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useAccount } from "wagmi"; // Assuming useAccount is imported correctly

// Define the Stackedbal component
export function Apr() {
  // Define contract data state variable and setter
  //const [contractDataA, setContractDataA] = useState("");
  //const [contractDataB, setContractDataB] = useState("");
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
      const contractAddressA = "0x7718f81c0E52E4d46619D2b7Ee11D11260D3898C"; // stack token

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

      const contractAddressB = "0xc35908aBaBc634F4eB104dd9Ee01fA35Be6D0030"; // Reward token

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

  /*  const totalBlocksPerYear = 3153600;
  // Calculate APR
  const APRs = ((TokenBbal / TokenAbal) * totalBlocksPerYear).toFixed(2);
  console.log(TokenAbal);
  console.log(TokenBbal);
  console.log(APRs);
  // console.log(APR.toString(), "s"); */

  function getAPR() {
    const totalBlocksPerYear = 3153600;
    // Calculate APR
    const APRs = ((TokenBbal / TokenAbal) * totalBlocksPerYear).toFixed(2);
    console.log(TokenAbal);
    console.log(TokenBbal);
    console.log(APRs);
    setAPR(APRs);
  }

  // Call fetchDataWithParams function when component mounts or when address changes
  useEffect(() => {
    TokenA();
    TokenB();
    getAPR();

    // Call fetchDataWithParams function every 1 minute
    const intervalIdA = setInterval(TokenA, 30000); // 1 minute = 60000 milliseconds
    const intervalIdB = setInterval(TokenB, 30000); // 1 minute = 60000 milliseconds
    const APR = setInterval(getAPR, 30000); // 1 minute = 60000 milliseconds

    // Clean up function to clear the interval when component unmounts or when address changes
    return () => clearInterval(intervalIdA, intervalIdB);
  }, [address]);

  // Render the component
  return <>{parseFloat(APR) > 0 && <h1>{APR}%</h1>}</>;
}
