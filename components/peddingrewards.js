import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useAccount } from "wagmi"; // Assuming useAccount is imported correctly

const PendingReward = ({ contractAddress }) => {
  const [Reward, setReward] = useState();
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
            /*  "function symbol() view returns (string)",
            "function balanceOf(address) view returns (uint256)", */
            "function pendingReward(address) external view returns (uint256)",
          ],
          provider
        );

        /* // Fetch token symbol
        const symbol = await tokenContract.symbol();
        setTokenSymbol(symbol);
 */
        // Fetch user balance
        const userRewards = await tokenContract.pendingReward(address);
        setReward(ethers.utils.formatEther(userRewards)); // Assuming the token uses Ether-like decimals
      } catch (error) {
        console.error("Error fetching token information:", error);
      }
    };

    fetchTokenInfo();
  }, [contractAddress, address]);

  return (
    <div>
      <h2> </h2>
      withdrawable rewards :<h2>{Reward}</h2>
    </div>
  );
};

export default PendingReward;
