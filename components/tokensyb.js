import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useAccount } from "wagmi"; // Assuming useAccount is imported correctly

const TokenInfo = ({ contractAddress, RcontractAddress }) => {
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
          contractAddress,
          [
            "function symbol() view returns (string)",
            "function balanceOf(address) view returns (uint256)",
          ],
          provider
        );

        // Instantiate the token contract
        const RtokenContract = new ethers.Contract(
          RcontractAddress,
          [
            "function symbol() view returns (string)",
            "function balanceOf(address) view returns (uint256)",
          ],
          provider
        );

        // Fetch token symbol
        const symbol = await tokenContract.symbol();
        setTokenSymbol(symbol);

        const Rsymbol = await RtokenContract.symbol();
        setRtokenSymbol(Rsymbol);

        // Fetch user balance
        const userBalance = await tokenContract.balanceOf(address);
        setBalance(ethers.utils.formatEther(userBalance)); // Assuming the token uses Ether-like decimals
      } catch (error) {
        console.error("Error fetching token information:", error);
      }
    };

    fetchTokenInfo();
  }, [contractAddress, RcontractAddress]);

  return (
    <div>
      <h2> </h2>
      <div> Stake : {tokenSymbol}</div>
      Earn Reward in : {RtokenSymbol}
    </div>
  );
};

export default TokenInfo;
