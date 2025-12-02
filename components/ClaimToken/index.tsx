"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Wallet2,
  ArrowRight,
  Info,
  RefreshCw,
  CheckCircle2,
  XCircle,
  User,
  RotateCcw,
} from "lucide-react";
import Image from "next/image";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useWriteContract,
  useSimulateContract,
} from "wagmi";
import { metaMask } from "wagmi/connectors";
import { truncateAddress } from "../../utils/lib/truncateAddress";
import { RegenerateMerkleTree } from "@/utils/lib/generateMerkleDataStructure";
import TokenDistributorAbi from "@/abi/TokenDistributor.json";
const contractAddress =
  process.env.NEXT_PUBLIC_TOKEN_DISTRIBUTOR_ADDRESS || "0x";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ethers, keccak256 } from "ethers";
import { getReferralCode } from "@/utils/lib/referralStorage";
import { notifyTapfiliateEvent } from "@/utils/lib/tapfiliateClient";

interface ClaimData {
  walletAddress: string;
  tokenType: string;
  amount: number;
}

type StatusType = "success" | "error" | null;
type ModalStep = "userTag" | "processing" | "claimDetails" | "status";

const ClaimTokenSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [claimData, setClaimData] = useState<ClaimData | null>(null);
  const [status, setStatus] = useState<StatusType>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [userTag, setUserTag] = useState("");
  const [modalStep, setModalStep] = useState<ModalStep>("userTag");
  const [claimArgs, setClaimArgs] = useState<
    readonly [string, bigint, `0x${string}`[]] | undefined
  >(undefined);
  const [claimCalled, setClaimCalled] = useState(false);
  const tapfiliatePceTriggeredRef = useRef(false);

  // Wagmi hooks
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  const fetchClaimData = async (tag: string) => {
    setIsProcessing(true);
    setModalStep("processing");
    try {
      const queryParams = new URLSearchParams({ user_tag: tag }).toString();
      const response = await axios.get(
        `https://tokeniser-ai-latest.onrender.com/api/v1/game-tokens?${queryParams}`,
      );

      if (response.data && Array.isArray(response.data.data)) {
        if (response.data.data.length === 0) {
          setStatus("error");
          setErrorMessage("User tag not found");
          setModalStep("status");
          return;
        }

        // Take the first entry if multiple exist
        const userData = response.data.data[0];
        setClaimData({
          walletAddress: userData.wallet_address,
          tokenType: userData.token_type,
          amount: userData.amount,
        });
        setModalStep("claimDetails");
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching claim data:", error);
      setStatus("error");
      setErrorMessage(
        error.response?.status === 404
          ? "User tag not found"
          : "Failed to fetch claim data",
      );
      setModalStep("status");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRetry = () => {
    setModalStep("userTag");
    setStatus(null);
    setErrorMessage("");
  };

  const {
    data: hash,
    error,
    writeContract,
    isSuccess,
    isPending,
    isError,
  } = useWriteContract();

  //simulate the transaction before sending it to the blockchain
  //this is to check if the transaction would fail
  //if claimArgs is not defined, then don't simulate
  const { data: simulateData, error: simulateError } = useSimulateContract({
    address: contractAddress as `0x${string}`,
    abi: TokenDistributorAbi,
    functionName: "claimTokens",
    args: claimArgs,
  });

  useEffect(() => {
    if (simulateError && claimCalled) {
      console.error("Simulation error:", simulateError);
      toast.error(`Transaction would fail: ${simulateError.message}`);
    }
  }, [simulateError, claimCalled]);

  useEffect(() => {
    const updateClaimedTokens = async () => {
      if (isSuccess) {
        //update the table here after a succesful claim
        //amount_claimed: increment by the number of tokens claimed
        //display claimable tokens =.> amount - token_claimed
        try {
        } catch (error) {
          console.error(
            "Error while updating claimed tokens at score.tsx",
            error,
          );
        }
      }
    };
    updateClaimedTokens();
  }, [hash, isSuccess]);

  useEffect(() => {
    if (isError) {
      console.log("Error from claiming rewards ", error);
      toast.error(`Error claiming rewards`, {
        position: "top-right",
      });
    }
  }, [error, isError]);

  //the user data field should also caontain a modified-date field.
  //I want to compare this value with the date of the merkel tree dodified date

  const handleClaim = async ({
    token_contract_address,
    amount,
    wallet_address,
  }: {
    token_contract_address: string;
    amount: number;
    wallet_address: string;
  }) => {
    setClaimCalled(true);

    const leaf = keccak256(
      ethers.AbiCoder.defaultAbiCoder().encode(
        ["address", "address", "uint256"],
        [
          wallet_address,
          token_contract_address,
          ethers.parseUnits(amount.toString(), 5),
        ],
      ),
    );

    let merkelDataResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/games/getMerkelDataView/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const merkelData = await merkelDataResponse.json();

    if (merkelData.status !== "success") {
      throw new Error("Error fetching merkel data");
    }

    const merkelDataJson = merkelData.data;

    const { merkleTree } = RegenerateMerkleTree(
      merkelDataJson.serialized_leaves,
    );
    const proof = merkleTree.getHexProof(leaf);

    const args = [
      token_contract_address,
      ethers.parseUnits(amount.toString(), 5),
      proof as `0x${string}`[],
    ] as const;

    setClaimCalled(true);
    setClaimArgs(args);

    await new Promise((resolve) => setTimeout(resolve, 0));
    try {
      if (!simulateError) {
        writeContract({
          address: contractAddress as `0x${string}`,
          abi: TokenDistributorAbi,
          functionName: "claimTokens",
          args: args,
        });
      }
    } catch (error) {
      console.error("Error claiming tokens", error);
      toast.error(`Error claiming tokens`, {
        position: "top-right",
      });
    }
  };

  const connectToBlockchain = async (
    wallet_address: string,
    tokenType: string,
  ) => {
    console.log("connecting to blockchain");

    //uncomment and run this command after connecting to blockchain
    // try {
    //   const response = await axios.patch(
    //     "https://tokeniser-ai-latest.onrender.com/api/v1/game-tokens",
    //     { user_tag: userTag, wallet_address, tokenType },
    //   );
    // } catch (error) {
    //   console.error("Error updating blockchain connection:", error);

    //   setStatus("error");
    //   setErrorMessage("Failed to update blockchain connection");
    //   setModalStep("status");
    // }
  };

  const handleClaimClick = () => {
    setIsModalOpen(true);
    setModalStep("userTag");
  };

  const handleUserTagSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userTag.trim()) {
      fetchClaimData(userTag);
    }
  };

  const handleConnectWallet = async () => {
    try {
      if (!claimData) {
        throw new Error("Claim data not found");
      }
      connect({ connector: metaMask() });
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to connect wallet",
      );
      setModalStep("status");
    }
  };

  useEffect(() => {
    if (isConnected && address && claimData) {
      if (address.toLowerCase() !== claimData.walletAddress.toLowerCase()) {
        connectToBlockchain(address.toLowerCase(), claimData.tokenType);
        setStatus("success");
        setModalStep("status");
      } else {
        setStatus("error");
        setErrorMessage(
          "Connected wallet address doesn't match your registered address",
        );
        setModalStep("status");
        disconnect();
      }
    }
  }, [isConnected, address, claimData, disconnect]);

  useEffect(() => {
    const maybeNotifyTapfiliate = async () => {
      if (!isConnected || !address) {
        return;
      }
      if (tapfiliatePceTriggeredRef.current) {
        return;
      }
      const referralCode = getReferralCode();
      if (!referralCode) {
        return;
      }

      tapfiliatePceTriggeredRef.current = true;
      try {
        await notifyTapfiliateEvent({
          eventType: "wallet_connect",
          walletAddress: address,
          referralCode,
          metadata: { source: "claim-token-section" },
        });
      } catch (error) {
        tapfiliatePceTriggeredRef.current = false;
        console.error("Failed to notify Tapfiliate of wallet connect", error);
      }
    };

    maybeNotifyTapfiliate();
  }, [isConnected, address]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setStatus(null);
    setErrorMessage("");
    setClaimData(null);
    setUserTag("");
    setModalStep("userTag");
    disconnect();
  };

  const renderModalContent = () => {
    switch (modalStep) {
      case "userTag":
        return (
          <div className="py-8">
            <div className="mb-6 text-center">
              <h3 className="mb-2 text-2xl font-bold text-black dark:text-white">
                Enter Your User Tag
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Please enter your user tag to proceed with the claim
              </p>
            </div>
            <form onSubmit={handleUserTagSubmit}>
              <div className="mb-6">
                <div className="relative">
                  <User className="absolute left-3 top-3 h-6 w-6 text-gray-400" />
                  <input
                    type="text"
                    value={userTag}
                    onChange={(e) => setUserTag(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-12 pr-4 text-black focus:border-meta focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    placeholder="Enter your user tag"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-meta py-4 font-medium text-white transition-all hover:bg-opacity-90"
              >
                Continue
              </button>
            </form>
          </div>
        );

      case "processing":
        return (
          <div className="flex flex-col items-center justify-center py-8">
            <RefreshCw className="h-12 w-12 animate-spin text-meta" />
            <p className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">
              Processing...
            </p>
          </div>
        );

      case "status":
        return (
          <div className="flex flex-col items-center justify-center py-8">
            {status === "success" ? (
              <>
                <CheckCircle2 className="h-16 w-16 text-green-500" />
                <h3 className="mt-4 text-2xl font-bold text-green-500">
                  Success!
                </h3>
                <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
                  Your tokens have been successfully claimed.
                </p>
                <button
                  onClick={handleCloseModal}
                  className="mt-6 rounded-lg bg-meta px-6 py-2 text-white hover:bg-opacity-90"
                >
                  Close
                </button>
              </>
            ) : (
              <>
                <XCircle className="h-16 w-16 text-red-500" />
                <h3 className="mt-4 text-2xl font-bold text-red-500">Error</h3>
                <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
                  {errorMessage}
                </p>
                <div className="mt-6 flex gap-4">
                  <button
                    onClick={handleRetry}
                    className="flex items-center gap-2 rounded-lg bg-meta px-6 py-2 text-white hover:bg-opacity-90"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Try Again
                  </button>
                  <button
                    onClick={handleCloseModal}
                    className="rounded-lg border border-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        );

      case "claimDetails":
        return claimData ? (
          <>
            <div className="mb-6 text-center">
              <h3 className="mb-2 text-2xl font-bold text-black dark:text-white">
                Claim Your Tokens
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Verify your wallet to claim your tokens
              </p>
            </div>

            <div className="mb-6 space-y-4">
              <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Token Type
                  </span>
                  <span className="font-bold text-black dark:text-white">
                    {claimData.tokenType}
                  </span>
                </div>
              </div>

              <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Amount
                  </span>
                  <span className="font-bold text-black dark:text-white">
                    {claimData.amount} Tokens
                  </span>
                </div>
              </div>

              <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Your Address
                  </span>
                  <span className="font-mono font-bold text-black dark:text-white">
                    {truncateAddress(claimData.walletAddress, 5, 8)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900 dark:bg-yellow-900/20">
              <div className="flex items-center gap-3">
                <Info className="h-5 w-5 text-yellow-700 dark:text-yellow-500" />
                <p className="text-sm text-yellow-700 dark:text-yellow-500">
                  Please ensure your connected wallet address matches your
                  registered address
                </p>
              </div>
            </div>

            <button
              onClick={handleConnectWallet}
              disabled={isProcessing}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-meta py-4 font-medium text-white transition-all hover:bg-opacity-90 disabled:opacity-50"
            >
              <Wallet2 className="h-5 w-5" />
              <span>{isConnected ? "Verify Wallet" : "Proceed"}</span>
            </button>

            <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
              By claiming tokens, you agree to our terms and conditions
            </p>
          </>
        ) : null;
    }
  };

  return (
    <>
      <section className="overflow-hidden pb-20 lg:pb-25 xl:pb-30">
        <div className="mx-auto max-w-c-1235 px-4 md:px-8 xl:px-0">
          <div className="flex items-center gap-8 lg:gap-32.5">
            <motion.div
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: { opacity: 1, x: 0 },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_right md:w-1/2"
            >
              <button
                onClick={handleClaimClick}
                className="mt-10 inline-flex items-center gap-2.5 rounded-full bg-black px-6 py-3 font-medium text-white hover:opacity-90 dark:bg-white dark:text-black"
              >
                Claim Tokens
                <ArrowRight className="h-5 w-5" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900"
          >
            <button
              onClick={handleCloseModal}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {renderModalContent()}
          </motion.div>
        </div>
      )}
    </>
  );
};

export default ClaimTokenSection;
