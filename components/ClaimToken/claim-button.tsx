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
import { bsc } from "viem/chains";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useWriteContract,
  useSimulateContract,
  useWaitForTransactionReceipt,
  useChainId,
  useSwitchChain,
} from "wagmi";
import { metaMask } from "wagmi/connectors";
import { truncateAddress } from "../../utils/lib/truncateAddress";
import { RegenerateMerkleTree } from "@/utils/lib/generateMerkleDataStructure";
import TokenDistributorAbi from "@/abi/TokenDistributor.json";
import { ethers, keccak256 } from "ethers";
import axios from "axios";
import { toast } from "sonner";
import { getReferralCode } from "@/utils/lib/referralStorage";
import { notifyTapfiliateEvent } from "@/utils/lib/tapfiliateClient";

const contractAddress =
  process.env.NEXT_PUBLIC_TOKEN_DISTRIBUTOR_ADDRESS || "0x";

interface ClaimData {
  walletAddress: string;
  tokenType: string;
  amount: number;
  tokenAddress: string;
}

type ModalStep = "input" | "summary" | "claiming" | "status";
type StatusType = "success" | "error" | "pending" | null;

const ClaimButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userTag, setUserTag] = useState("");
  const [claimData, setClaimData] = useState<ClaimData | null>(null);
  const [modalStep, setModalStep] = useState<ModalStep>("input");
  const [claimArgs, setClaimArgs] = useState<
    readonly [string, bigint, `0x${string}`[]] | undefined
  >(undefined);
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<StatusType>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [transactionHash, setTransactionHash] = useState<any>(null);
  const tapfiliatePceTriggeredRef = useRef(false);

  // Wagmi hooks
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  const [isSwitchingNetwork, setIsSwitchingNetwork] = useState(false);

  const {
    writeContract,
    isPending,
    isError,
    isSuccess,
    data: hash,
  } = useWriteContract();

  // Monitor transaction status
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: hash as `0x${string}`,
      // enabled: !!hash,
    });

  // Contract simulation
  const { error: simulateError } = useSimulateContract(
    claimArgs
      ? {
          address: contractAddress as `0x${string}`,
          abi: TokenDistributorAbi,
          functionName: "claimTokens",
          args: claimArgs,
        }
      : undefined,
  );

  // Watch transaction status
  useEffect(() => {
    if (isPending || isConfirming) {
      setStatus("pending");
      setModalStep("status");
    } else if (isConfirmed) {
      const updateTokenStatus = async () => {
        try {
          await axios.patch(
            `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/v1/game-tokens`,
            {
              user_tag: userTag,
              wallet_address: address,
              token_type: claimData?.tokenType,
              token_address: claimData?.tokenAddress,
            },
          );
        } catch (error) {
          console.error("Failed to update token status:", error);
        }
      };
      updateTokenStatus();
      setStatus("success");
      setModalStep("status");
    } else if (isError) {
      setStatus("error");
      setErrorMessage("Transaction failed. Please try again.");
      setModalStep("status");
    }
  }, [
    isPending,
    isConfirming,
    isConfirmed,
    isError,
    claimData,
    userTag,
    address,
  ]);

  useEffect(() => {
    if (isConnected && address && claimData) {
      // Check if connected wallet matches registered address
      if (address.toLowerCase() !== claimData.walletAddress.toLowerCase()) {
        setStatus("error");
        setErrorMessage(
          "Connected wallet address doesn't match your registered address",
        );
        setModalStep("status");
        disconnect();
        return;
      }
      // If addresses match, stay on summary step
      setModalStep("summary");
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
          metadata: { source: "claim-button" },
        });
      } catch (error) {
        tapfiliatePceTriggeredRef.current = false;
        console.error("Failed to notify Tapfiliate of wallet connect", error);
      }
    };

    maybeNotifyTapfiliate();
  }, [isConnected, address]);

  useEffect(() => {
    if (isConnected && chainId !== bsc.id) {
      setStatus("error");
      setErrorMessage("Please switch to BSC network to continue");
      setModalStep("status");
      disconnect();
    }
  }, [chainId, isConnected, disconnect]);

  useEffect(() => {
    if (simulateError) {
      setStatus("error");
      setErrorMessage(`Transaction would fail: ${simulateError.message}`);
      setModalStep("status");
    }
  }, [simulateError]);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalStep("input");
    setClaimData(null);
    setUserTag("");
    setClaimArgs(undefined);
    setIsProcessing(false);
    setStatus(null);
    setErrorMessage("");
    setTransactionHash(null);
    disconnect();
  };

  const handleRetry = () => {
    setModalStep("input");
    setStatus(null);
    setErrorMessage("");
    setClaimArgs(undefined);
    setTransactionHash(null);
  };

  const fetchClaimData = async (tag: string) => {
    setIsProcessing(true);
    try {
      const queryParams = new URLSearchParams({ user_tag: tag }).toString();
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/v1/game-tokens?${queryParams}`,
      );

      if (!response.data?.data?.length) {
        throw new Error("User tag not found");
      }

      const userData = response.data.data[0];
      setClaimData({
        walletAddress: userData.wallet_address,
        tokenType: userData.token_type,
        amount: userData.amount,
        tokenAddress: userData.token_address,
      });
      setModalStep("summary");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error.message || "Failed to fetch claim data");
      setModalStep("status");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConnectWallet = async () => {
    if (!window.ethereum) {
      setStatus("error");
      setErrorMessage("Please install MetaMask to continue");
      setModalStep("status");
      return;
    }

    try {
      setIsSwitchingNetwork(true);
      // First connect the wallet
      await connect({ connector: metaMask() });

      // Add a small delay to ensure chainId is updated
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Check if we're on BSC
      if (chainId !== bsc.id) {
        try {
          // First try to switch to BSC
          await switchChain({ chainId: bsc.id });

          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Verify the switch was successful
          const newChainId = await window.ethereum.request({
            method: "eth_chainId",
          });
          const currentChainId = parseInt(newChainId, 16);

          if (currentChainId !== bsc.id) {
            throw new Error("Failed to switch to BSC");
          }
        } catch (switchError: any) {
          console.error("Switch error:", switchError);

          if (switchError.message.includes("rejected")) {
            setStatus("error");
            setErrorMessage("Please switch to BSC network to continue");
            setModalStep("status");
            disconnect();
            return;
          }

          // If switch failed, try to add the network

          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: `0x${bsc.id.toString(16)}`,
                  chainName: "BNB Smart Chain",
                  nativeCurrency: {
                    name: "BNB",
                    symbol: "BNB",
                    decimals: 18,
                  },
                  rpcUrls: ["https://bsc-dataseed.binance.org/"],
                  blockExplorerUrls: ["https://bscscan.com"],
                },
              ],
            });

            await new Promise((resolve) => setTimeout(resolve, 1000));
            // Check if we're now on BSC
            const finalChainId = await window.ethereum.request({
              method: "eth_chainId",
            });
            if (parseInt(finalChainId, 16) !== bsc.id) {
              throw new Error("Network switch failed after adding BSC");
            }
          } catch (addError: any) {
            console.error("Add network error:", addError);
            setStatus("error");
            setErrorMessage(
              addError.message ||
                "Failed to add BSC network. Please add it manually to your wallet",
            );
            setModalStep("status");
            disconnect();
            return;
          }
        }
      }

      // If we made it here, we're connected to BSC

      setIsSwitchingNetwork(false);
    } catch (error: any) {
      console.error("Connection error:", error);
      setIsSwitchingNetwork(false);
      if (error.message.includes("rejected")) {
        setStatus("error");
        setErrorMessage("Wallet connection rejected");
        setModalStep("status");
      } else {
        setStatus("error");
        setErrorMessage(error.message || "Failed to connect wallet");
        setModalStep("status");
      }
    }
  };

  // Add an effect to monitor chain changes
  useEffect(() => {
    if (isConnected && !isSwitchingNetwork && chainId !== bsc.id) {
      setStatus("error");
      setErrorMessage("Please switch to BSC network to continue");
      setModalStep("status");
      disconnect();
    }
  }, [chainId, isConnected, isSwitchingNetwork, disconnect]);
  const prepareClaim = async () => {
    if (!claimData || !address) return;
    setIsProcessing(true);

    try {
      const leaf = keccak256(
        ethers.AbiCoder.defaultAbiCoder().encode(
          ["address", "address", "uint256"],
          [
            address.toLowerCase(),
            claimData.tokenAddress,
            ethers.parseUnits(claimData.amount.toString(), 5),
          ],
        ),
      );

      const merkelDataResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/v1/game-tokens/merkle-leaves`,
      );
      const merkelData = await merkelDataResponse.json();

      if (!merkelData.data) {
        throw new Error("Failed to fetch merkle data");
      }

      const { merkleTree } = RegenerateMerkleTree(
        merkelData.data.serialized_leaves,
      );
      const proof = merkleTree.getHexProof(leaf);

      const args = [
        claimData.tokenAddress,
        ethers.parseUnits(claimData.amount.toString(), 5),
        proof as `0x${string}`[],
      ] as const;

      setClaimArgs(args);
      setModalStep("claiming");
    } catch (error) {
      setStatus("error");
      setErrorMessage("Failed to prepare claim");
      setModalStep("status");
    } finally {
      setIsProcessing(false);
    }
  };

  const executeClaim = async () => {
    if (!claimArgs) return;
    setIsProcessing(true);

    try {
      const result = await writeContract({
        address: contractAddress as `0x${string}`,
        abi: TokenDistributorAbi,
        functionName: "claimTokens",
        args: claimArgs,
      });

      setTransactionHash(result);
      setModalStep("status");
      setStatus("pending");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error.message.includes("rejected")
          ? "Transaction rejected by user"
          : "Failed to execute claim transaction",
      );
      setModalStep("status");
    } finally {
      setIsProcessing(false);
    }
  };

  // const simulateSuccessfulClaim = async () => {
  //   try {
  //     setIsProcessing(true);
  //     setStatus("pending");
  //     setModalStep("status");

  //     // Simulate processing time
  //     await new Promise((resolve) => setTimeout(resolve, 2000));

  //     // Mock transaction hash
  //     const mockTxHash =
  //       "0x" +
  //       Array(64)
  //         .fill("0123456789ABCDEF"[Math.floor(Math.random() * 16)])
  //         .join("");
  //     setTransactionHash(mockTxHash);

  //     // Simulate transaction confirmation
  //     await new Promise((resolve) => setTimeout(resolve, 2000));

  //     // Call the update API
  //     if (claimData && address) {
  //       try {
  //         const response = await axios.patch(
  //           `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/v1/game-tokens`,
  //           {
  //             user_tag: userTag,
  //             wallet_address: address,
  //             token_type: claimData.tokenType,
  //             token_address: claimData.tokenAddress,
  //           },
  //         );
  //         console.log("API update response:", response.data);
  //       } catch (error) {
  //         console.error("Failed to update token status:", error);
  //       }
  //     }

  //     // Set success state
  //     setStatus("success");
  //   } catch (error) {
  //     console.error("Simulation error:", error);
  //     setStatus("error");
  //     setErrorMessage("Simulation failed");
  //   } finally {
  //     setIsProcessing(false);
  //   }
  // };

  const renderStatusStep = () => {
    switch (status) {
      case "pending":
        return (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="relative">
              <RefreshCw className="h-20 w-20 animate-spin text-purple-400" />
              <div className="absolute inset-0 h-20 w-20 animate-pulse rounded-full bg-purple-600/30 blur-xl"></div>
            </div>
            <h3
              className="mt-6 bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-3xl font-black uppercase tracking-wider text-transparent"
              style={{
                fontFamily: "'Orbitron', 'Rajdhani', 'Exo 2', sans-serif",
              }}
            >
              Processing Transaction
            </h3>
            <p
              className="mt-3 text-center text-gray-400"
              style={{
                fontFamily: "'Rajdhani', 'Exo 2', sans-serif",
              }}
            >
              Please wait while your transaction is being processed...
            </p>
            {transactionHash && (
              <div className="mt-6 rounded-xl border border-purple-500/30 bg-black/40 px-4 py-3 backdrop-blur-sm">
                <p
                  className="font-mono text-sm text-cyan-400"
                  style={{
                    fontFamily: "'Rajdhani', monospace",
                  }}
                >
                  TX: {truncateAddress(transactionHash, 8, 8)}
                </p>
              </div>
            )}
          </div>
        );

      case "success":
        return (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="relative">
              <CheckCircle2 className="h-20 w-20 text-green-400" />
              <div className="absolute inset-0 h-20 w-20 animate-pulse rounded-full bg-green-600/30 blur-xl"></div>
            </div>
            <h3
              className="mt-6 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-3xl font-black uppercase tracking-wider text-transparent"
              style={{
                fontFamily: "'Orbitron', 'Rajdhani', 'Exo 2', sans-serif",
              }}
            >
              Success!
            </h3>
            <p
              className="mt-3 text-center text-gray-400"
              style={{
                fontFamily: "'Rajdhani', 'Exo 2', sans-serif",
              }}
            >
              Your tokens have been successfully claimed.
            </p>
            {transactionHash && (
              <div className="mt-6 rounded-xl border border-green-500/30 bg-black/40 px-4 py-3 backdrop-blur-sm">
                <p
                  className="font-mono text-sm text-green-400"
                  style={{
                    fontFamily: "'Rajdhani', monospace",
                  }}
                >
                  TX: {truncateAddress(transactionHash, 8, 8)}
                </p>
              </div>
            )}
            <button
              onClick={handleCloseModal}
              className="group mt-8 overflow-hidden rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-3 font-bold uppercase tracking-wider text-white shadow-lg shadow-green-500/50 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]"
              style={{
                fontFamily: "'Orbitron', 'Rajdhani', 'Exo 2', sans-serif",
              }}
            >
              Close
            </button>
          </div>
        );

      case "error":
        return (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="relative">
              <XCircle className="h-20 w-20 text-red-400" />
              <div className="absolute inset-0 h-20 w-20 animate-pulse rounded-full bg-red-600/30 blur-xl"></div>
            </div>
            <h3
              className="mt-6 bg-gradient-to-r from-red-400 to-rose-400 bg-clip-text text-3xl font-black uppercase tracking-wider text-transparent"
              style={{
                fontFamily: "'Orbitron', 'Rajdhani', 'Exo 2', sans-serif",
              }}
            >
              Error
            </h3>
            <p
              className="mt-3 max-w-md text-center text-gray-400"
              style={{
                fontFamily: "'Rajdhani', 'Exo 2', sans-serif",
              }}
            >
              {errorMessage}
            </p>
            <div className="mt-8 flex gap-4">
              <button
                onClick={handleRetry}
                className="group flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-cyan-600 px-6 py-3 font-bold uppercase tracking-wider text-white shadow-lg shadow-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]"
                style={{
                  fontFamily: "'Orbitron', 'Rajdhani', 'Exo 2', sans-serif",
                }}
              >
                <RotateCcw className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                Try Again
              </button>
              <button
                onClick={handleCloseModal}
                className="rounded-xl border border-gray-600 bg-black/40 px-6 py-3 font-bold uppercase tracking-wider text-gray-300 backdrop-blur-sm transition-all duration-300 hover:border-gray-500 hover:bg-black/60"
                style={{
                  fontFamily: "'Orbitron', 'Rajdhani', 'Exo 2', sans-serif",
                }}
              >
                Close
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderModalContent = () => {
    switch (modalStep) {
      case "input":
        return (
          <div className="py-6">
            <div className="mb-8 text-center">
              <h3
                className="mb-3 bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-3xl font-black uppercase tracking-wider text-transparent"
                style={{
                  fontFamily: "'Orbitron', 'Rajdhani', 'Exo 2', sans-serif",
                }}
              >
                Claim Your Tokens
              </h3>
              <p
                className="text-gray-400"
                style={{
                  fontFamily: "'Rajdhani', 'Exo 2', sans-serif",
                }}
              >
                Enter your user tag to start the claim process
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (userTag.trim()) fetchClaimData(userTag);
              }}
            >
              <div className="mb-6">
                <div className="group relative">
                  <User className="absolute left-4 top-4 h-6 w-6 text-purple-400 transition-all duration-300 group-focus-within:text-cyan-400" />
                  <input
                    type="text"
                    value={userTag}
                    onChange={(e) => setUserTag(e.target.value)}
                    className="w-full rounded-xl border border-purple-500/30 bg-black/40 py-4 pl-14 pr-4 text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-300 focus:border-cyan-400 focus:bg-black/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
                    placeholder="Enter your user tag"
                    style={{
                      fontFamily: "'Rajdhani', 'Exo 2', sans-serif",
                    }}
                    required
                  />
                  <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-purple-600/20 to-cyan-600/20 opacity-0 blur-xl transition-opacity duration-300 group-focus-within:opacity-100"></div>
                </div>
              </div>
              <button
                type="submit"
                disabled={isProcessing}
                className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-cyan-600 py-4 font-bold uppercase tracking-wider text-white shadow-lg shadow-purple-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] disabled:opacity-50 disabled:hover:scale-100"
                style={{
                  fontFamily: "'Orbitron', 'Rajdhani', 'Exo 2', sans-serif",
                }}
              >
                <span className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-600 via-fuchsia-600 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                {isProcessing ? (
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    Processing...
                  </span>
                ) : (
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Continue
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                )}
              </button>
            </form>
          </div>
        );

      case "summary":
        return claimData ? (
          <div className="py-6">
            <div className="mb-8 text-center">
              <h3
                className="mb-3 bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-3xl font-black uppercase tracking-wider text-transparent"
                style={{
                  fontFamily: "'Orbitron', 'Rajdhani', 'Exo 2', sans-serif",
                }}
              >
                Claim Summary
              </h3>
              <p
                className="text-gray-400"
                style={{
                  fontFamily: "'Rajdhani', 'Exo 2', sans-serif",
                }}
              >
                Review your claim details and connect your wallet
              </p>
            </div>

            <div className="mb-6 space-y-3">
              <div className="group relative overflow-hidden rounded-xl border border-purple-500/30 bg-gradient-to-r from-black/60 to-purple-950/40 p-4 backdrop-blur-sm transition-all duration-300 hover:border-purple-400/50">
                <div className="flex items-center justify-between">
                  <span
                    className="font-semibold uppercase tracking-wide text-gray-400"
                    style={{
                      fontFamily: "'Rajdhani', 'Exo 2', sans-serif",
                    }}
                  >
                    Token Type
                  </span>
                  <span
                    className="font-black uppercase text-white"
                    style={{
                      fontFamily: "'Orbitron', sans-serif",
                    }}
                  >
                    {claimData.tokenType}
                  </span>
                </div>
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600/10 to-cyan-600/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </div>

              <div className="group relative overflow-hidden rounded-xl border border-purple-500/30 bg-gradient-to-r from-black/60 to-purple-950/40 p-4 backdrop-blur-sm transition-all duration-300 hover:border-purple-400/50">
                <div className="flex items-center justify-between">
                  <span
                    className="font-semibold uppercase tracking-wide text-gray-400"
                    style={{
                      fontFamily: "'Rajdhani', 'Exo 2', sans-serif",
                    }}
                  >
                    Token Address
                  </span>
                  <span
                    className="font-mono font-bold text-cyan-400"
                    style={{
                      fontFamily: "'Rajdhani', monospace",
                    }}
                  >
                    {truncateAddress(claimData.tokenAddress, 5, 8)}
                  </span>
                </div>
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600/10 to-cyan-600/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </div>

              <div className="group relative overflow-hidden rounded-xl border border-purple-500/30 bg-gradient-to-r from-black/60 to-purple-950/40 p-4 backdrop-blur-sm transition-all duration-300 hover:border-purple-400/50">
                <div className="flex items-center justify-between">
                  <span
                    className="font-semibold uppercase tracking-wide text-gray-400"
                    style={{
                      fontFamily: "'Rajdhani', 'Exo 2', sans-serif",
                    }}
                  >
                    Amount
                  </span>
                  <span
                    className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-xl font-black text-transparent"
                    style={{
                      fontFamily: "'Orbitron', sans-serif",
                    }}
                  >
                    {claimData.amount} Tokens
                  </span>
                </div>
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600/10 to-cyan-600/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </div>

              <div className="group relative overflow-hidden rounded-xl border border-purple-500/30 bg-gradient-to-r from-black/60 to-purple-950/40 p-4 backdrop-blur-sm transition-all duration-300 hover:border-purple-400/50">
                <div className="flex items-center justify-between">
                  <span
                    className="font-semibold uppercase tracking-wide text-gray-400"
                    style={{
                      fontFamily: "'Rajdhani', 'Exo 2', sans-serif",
                    }}
                  >
                    Registered Address
                  </span>
                  <span
                    className="font-mono font-bold text-cyan-400"
                    style={{
                      fontFamily: "'Rajdhani', monospace",
                    }}
                  >
                    {truncateAddress(claimData.walletAddress, 5, 8)}
                  </span>
                </div>
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600/10 to-cyan-600/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </div>
            </div>

            <div className="mb-6 rounded-xl border border-yellow-500/40 bg-gradient-to-r from-yellow-950/40 to-orange-950/40 p-4 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <Info className="h-5 w-5 text-yellow-400" />
                <p
                  className="text-sm font-medium text-yellow-300"
                  style={{
                    fontFamily: "'Rajdhani', 'Exo 2', sans-serif",
                  }}
                >
                  Please ensure you connect with your registered wallet address
                </p>
              </div>
            </div>

            {isConnected ? (
              <button
                onClick={prepareClaim}
                disabled={isProcessing}
                className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-cyan-600 py-4 font-bold uppercase tracking-wider text-white shadow-lg shadow-purple-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] disabled:opacity-50 disabled:hover:scale-100"
                style={{
                  fontFamily: "'Orbitron', 'Rajdhani', 'Exo 2', sans-serif",
                }}
              >
                <span className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-600 via-fuchsia-600 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                {isProcessing ? (
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    Preparing Claim...
                  </span>
                ) : (
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Proceed with Claim
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                )}
              </button>
            ) : (
              <button
                onClick={handleConnectWallet}
                disabled={isProcessing}
                className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-cyan-600 py-4 font-bold uppercase tracking-wider text-white shadow-lg shadow-purple-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] disabled:opacity-50 disabled:hover:scale-100"
                style={{
                  fontFamily: "'Orbitron', 'Rajdhani', 'Exo 2', sans-serif",
                }}
              >
                <span className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-600 via-fuchsia-600 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                <span className="relative z-10 flex items-center gap-3">
                  <Wallet2 className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                  Connect Wallet
                </span>
              </button>
            )}
          </div>
        ) : null;

      case "claiming":
        return claimData ? (
          <div className="py-6">
            <div className="mb-8 text-center">
              <h3
                className="mb-3 bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-3xl font-black uppercase tracking-wider text-transparent"
                style={{
                  fontFamily: "'Orbitron', 'Rajdhani', 'Exo 2', sans-serif",
                }}
              >
                Confirm Claim
              </h3>
              <p
                className="text-gray-400"
                style={{
                  fontFamily: "'Rajdhani', 'Exo 2', sans-serif",
                }}
              >
                Review and confirm your claim transaction
              </p>
            </div>

            <div className="mb-6 space-y-3">
              <div className="group relative overflow-hidden rounded-xl border border-purple-500/30 bg-gradient-to-r from-black/60 to-purple-950/40 p-4 backdrop-blur-sm transition-all duration-300 hover:border-purple-400/50">
                <div className="flex items-center justify-between">
                  <span
                    className="font-semibold uppercase tracking-wide text-gray-400"
                    style={{
                      fontFamily: "'Rajdhani', 'Exo 2', sans-serif",
                    }}
                  >
                    Connected Wallet
                  </span>
                  <span
                    className="font-mono font-bold text-cyan-400"
                    style={{
                      fontFamily: "'Rajdhani', monospace",
                    }}
                  >
                    {truncateAddress(address || "", 5, 8)}
                  </span>
                </div>
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600/10 to-cyan-600/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </div>

              <div className="group relative overflow-hidden rounded-xl border border-purple-500/30 bg-gradient-to-r from-black/60 to-purple-950/40 p-4 backdrop-blur-sm transition-all duration-300 hover:border-purple-400/50">
                <div className="flex items-center justify-between">
                  <span
                    className="font-semibold uppercase tracking-wide text-gray-400"
                    style={{
                      fontFamily: "'Rajdhani', 'Exo 2', sans-serif",
                    }}
                  >
                    Amount to Claim
                  </span>
                  <span
                    className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-xl font-black text-transparent"
                    style={{
                      fontFamily: "'Orbitron', sans-serif",
                    }}
                  >
                    {claimData.amount} Tokens
                  </span>
                </div>
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600/10 to-cyan-600/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={executeClaim}
                disabled={isProcessing || !claimArgs}
                className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-cyan-600 py-4 font-bold uppercase tracking-wider text-white shadow-lg shadow-purple-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] disabled:opacity-50 disabled:hover:scale-100"
                style={{
                  fontFamily: "'Orbitron', 'Rajdhani', 'Exo 2', sans-serif",
                }}
              >
                <span className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-600 via-fuchsia-600 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                {isProcessing ? (
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    Processing Transaction...
                  </span>
                ) : (
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Confirm Transaction
                    <CheckCircle2 className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  </span>
                )}
              </button>
            </div>
          </div>
        ) : null;

      case "status":
        return renderStatusStep();
    }
  };

  //simulate the transaction before sending it to the blockchain
  //this is to check if the transaction would fail
  //if claimArgs is not defined, then don't simulate

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

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-cyan-600 px-8 py-4 font-black uppercase tracking-wider text-white shadow-lg shadow-purple-500/50 transition-all duration-500 ease-out hover:scale-105 hover:shadow-[0_0_40px_rgba(168,85,247,0.6)]"
        style={{
          fontFamily: "'Orbitron', 'Rajdhani', 'Exo 2', sans-serif",
        }}
      >
        <span className="relative z-10 flex items-center gap-3">
          <Wallet2 className="h-5 w-5 transition-transform duration-500 group-hover:rotate-12" />
          Claim Tokens
          <ArrowRight className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-2" />
        </span>
        <span className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-600 via-fuchsia-600 to-purple-600 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"></span>
        <span className="group-hover:animate-shimmer absolute inset-0 bg-gradient-to-r from-purple-600/0 via-white/20 to-purple-600/0 opacity-0 transition-opacity duration-500"></span>
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md">
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-purple-500/30 bg-gradient-to-br from-black via-gray-900 to-purple-950/40 p-8 shadow-[0_0_80px_rgba(168,85,247,0.3)] backdrop-blur-xl"
          >
            {/* Animated background effect */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-purple-600/5 via-transparent to-cyan-600/5"></div>
            <div className="pointer-events-none absolute -left-40 -top-40 h-80 w-80 rounded-full bg-purple-600/20 blur-3xl"></div>
            <div className="pointer-events-none absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-cyan-600/20 blur-3xl"></div>

            <button
              onClick={handleCloseModal}
              className="absolute right-6 top-6 z-50 rounded-full bg-white/10 p-2 text-gray-400 backdrop-blur-sm transition-all duration-300 hover:rotate-90 hover:bg-white/20 hover:text-white"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="relative z-10">{renderModalContent()}</div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default ClaimButton;
