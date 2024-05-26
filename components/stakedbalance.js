import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useAccount } from "wagmi"; // Assuming useAccount is imported correctly

const Stackedbal = ({ pool }) => {
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [RtokenSymbol, setRtokenSymbol] = useState("");
  const [balance, setBalance] = useState("");
  const { address } = useAccount();

  useEffect(() => {
    const fetchTokenInfo = async () => {
      try {
        // Connect to Ethereum provider
        const provider = new ethers.providers.JsonRpcProvider(
          `https://testnet-rpc.kbcfoundation.com/`
        );

        // Instantiate the token contract
        const tokenContract = new ethers.Contract(
          pool.pool,
          [
            " function userstackedbal(address _user) external view returns (uint256)",
          ],
          provider
        );

        const userBalance = await tokenContract.userstackedbal(address);
        setBalance(ethers.utils.formatEther(userBalance));
        // Fetch token symbol
        // const symbol = await tokenContract.symbol();
        // setTokenSymbol(symbol);
      } catch (error) {
        console.error("Error fetching token information:", error);
      }
    };

    fetchTokenInfo();
  }, [pool.pool, address]);

  return <div>{balance}</div>;
};

export default Stackedbal;
