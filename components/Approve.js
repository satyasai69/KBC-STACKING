import {
  useWaitForTransactionReceipt,
  useWriteContract,
  useSendTransaction,
} from "wagmi";
import { abi } from "../approveABI/abi.json";

export function ApproveToken(weiAmount) {
  const {
    data: hash,
    writeContract,
    isPending,
    isSuccess,
  } = useWriteContract();

  const handleApprove = async () => {
    try {
      const approveAmount = 76544569876543467899876546789098765467890987651654567654565676776768;
      await writeContract({
        abi,
        address: "0xF6E83df1a9659E9923E43A85aE6d8F07a2C95b61", // `0x${tokenaddress}`, //tokenAddress,//"0x9b2cbE8Ad90fAB7362C6eC5A4896C7629CAe3D16", //token address
        functionName: "approve",
        args: [
          "0x617c5814f9c52e3768FD233088A01cc6dE25c58A", // contract address

          approveAmount, //BigInt(weiAmount),
        ],
        value: 0, //BigInt(valueInWei), // Set the value property to send ETH
      });

      // Handle success if needed
      console.log("Approval successful!");
    } catch (error) {
      // Handle error if needed
      console.error("Error during approval:", error, weiAmount);
    }
  };

  return (
    <button
      className="w-full bg-[#3ab0ff] text-[#efefef] font-medium text-center p-[10px] rounded-xl mt-7"
      onClick={handleApprove}
    >
      Approval
    </button>
  );
}
