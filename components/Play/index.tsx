"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getReferralCode, saveReferralCode } from "@/utils/lib/referralStorage";
import { FaWindows, FaApple, FaAndroid } from "react-icons/fa";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { notifyTapfiliateEvent } from "@/utils/lib/tapfiliateClient";
import { queueInstantBonus } from "@/utils/lib/partnerBonusClient";
import { truncateAddress } from "@/utils/lib/truncateAddress";
import {
  Download,
  Zap,
  Shield,
  Users,
  Trophy,
  Gamepad2,
  Star,
  CheckCircle2,
  Play,
  Globe,
  Cpu,
  HardDrive,
  ArrowRight,
  Wallet,
} from "lucide-react";

// Game data
const GAMES = [
  {
    id: 1,
    title: "Magic Worlds",
    tagline: "Enter the Realm of Infinite Possibilities",
    description:
      "An immersive fantasy adventure with stunning visuals and engaging storyline. Battle legendary creatures, forge powerful alliances, and become the hero of your own epic saga.",
    platforms: ["windows", "macos", "android"],
    genre: ["RPG", "Adventure", "Multiplayer"],
    size: {
      windows: "1.2 GB",
      macos: "1.3 GB",
      android: "950 MB",
    },
    rating: 4.9,
    downloads: 5247823,
    activeUsers: 2500000,
    spotlight: true,
    windowsDownload: "https://magicworlds.itch.io/magic-world",
    macosDownload: "https://magicworlds.itch.io/magic-world",
    androidDownload: "https://magicworlds.itch.io/magic-world",
    features: [
      "Cross-platform gameplay",
      "Real-time multiplayer battles",
      "Regular content updates",
      "Cloud save support",
      "4K graphics ready",
      "Full controller support",
    ],
    requirements: {
      windows: {
        os: "Windows 10/11 64-bit",
        processor: "Intel Core i5-6600K or equivalent",
        memory: "8 GB RAM",
        graphics: "NVIDIA GTX 1060 / AMD Radeon RX 580",
        storage: "1.2 GB available space",
        directX: "Version 12",
        network: "Broadband Internet connection",
      },
      macos: {
        os: "macOS 11 (Big Sur) or later",
        processor: "Apple M1 or Intel Core i5",
        memory: "8 GB RAM",
        graphics: "Metal-compatible GPU with 2GB VRAM",
        storage: "1.3 GB available space",
        additional: "Rosetta 2 required for Intel Macs",
        network: "Broadband Internet connection",
      },
      android: {
        os: "Android 8.0 (Oreo) or higher",
        processor: "Snapdragon 660 or equivalent",
        memory: "4 GB RAM",
        graphics: "Adreno 512 or Mali-G71",
        storage: "950 MB available space",
        additional: "OpenGL ES 3.1 or higher",
        network: "WiFi or 4G/5G connection",
      },
    },
  },
];

interface GameDownloadsProps {
  initialReferralCode?: string | null;
}

// Floating particles component
const FloatingParticles = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-2 w-2 rounded-full"
          style={{
            background: `radial-gradient(circle, ${
              ["#06b6d4", "#a855f7", "#ec4899"][i % 3]
            }, transparent)`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

// Main component
const GameDownloads = ({ initialReferralCode }: GameDownloadsProps) => {
  const [selectedGame, setSelectedGame] = useState<null | (typeof GAMES)[0]>(
    null,
  );
  const [selectedPlatform, setSelectedPlatform] = useState<
    "windows" | "macos" | "android"
  >("windows");
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [walletFeedback, setWalletFeedback] = useState<string | null>(null);
  const [isSyncingReferral, setIsSyncingReferral] = useState(false);
  const game = GAMES[0]; // Primary game
  const tapfiliateSyncRef = useRef(false);

  const { address, isConnected } = useAccount();
  const {
    connectAsync,
    connectors,
    isPending: isWalletConnecting,
    error: connectError,
  } = useConnect();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    if (initialReferralCode) {
      saveReferralCode(initialReferralCode);
      setReferralCode(initialReferralCode);
      return;
    }

    const storedCode = getReferralCode();
    if (storedCode) {
      setReferralCode(storedCode);
    }
  }, [initialReferralCode]);

  useEffect(() => {
    if (connectError) {
      setWalletFeedback(
        connectError instanceof Error
          ? connectError.message
          : "Unable to connect wallet. Please try again.",
      );
    }
  }, [connectError]);

  useEffect(() => {
    if (!isConnected || !address) {
      setIsSyncingReferral(false);
      tapfiliateSyncRef.current = false;
      return;
    }

    const effectiveReferralCode = referralCode ?? getReferralCode();
    if (!effectiveReferralCode) {
      setWalletFeedback(
        "Wallet linked, but no referral code is stored yet. Share your ?ref link first.",
      );
      return;
    }

    if (tapfiliateSyncRef.current) {
      return;
    }

    tapfiliateSyncRef.current = true;
    setIsSyncingReferral(true);
    setWalletFeedback("Syncing wallet with Tapfiliate and queuing bonus...");

    const syncReferral = async () => {
      try {
        await notifyTapfiliateEvent({
          eventType: "wallet_connect",
          walletAddress: address,
          referralCode: effectiveReferralCode,
          metadata: { source: "play-page" },
        });

        await queueInstantBonus({
          walletAddress: address,
          referralCode: effectiveReferralCode,
          source: "play-page",
        });

        setWalletFeedback(
          "Wallet linked. Tapfiliate updated and instant bonus queued.",
        );
      } catch (error) {
        console.error("Failed to sync wallet referral", error);
        tapfiliateSyncRef.current = false;
        setWalletFeedback(
          "Connected but failed to sync referral. Please try again.",
        );
      } finally {
        setIsSyncingReferral(false);
      }
    };

    void syncReferral();
  }, [isConnected, address, referralCode]);

  const handleConnectWallet = async () => {
    try {
      setWalletFeedback(null);
      const connector = connectors?.[0];
      if (!connector) {
        throw new Error("No wallet connector is available in this build.");
      }
      await connectAsync({ connector });
    } catch (error) {
      console.error("Wallet connect failed", error);
      setWalletFeedback(
        error instanceof Error
          ? error.message
          : "Unable to connect wallet. Please try again.",
      );
    }
  };

  const handleDisconnectWallet = () => {
    disconnect();
    tapfiliateSyncRef.current = false;
    setIsSyncingReferral(false);
    setWalletFeedback("Wallet disconnected.");
  };

  const truncatedAddress = address ? truncateAddress(address) : "";
  const walletButtonDisabled = isWalletConnecting || isSyncingReferral;

  return (
    <>
      <div className="relative min-h-screen overflow-hidden bg-transparent font-rajdhani text-white">
        {/* Animated Grid Background */}
        {/* <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div> */}

        {/* Gradient Overlays */}
        {/* <motion.div
        className="fixed inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          easeIn: "easeInOut",
        }}
      /> */}

        <FloatingParticles />

        {/* Hero Section */}
        <section className="relative flex min-h-screen items-center justify-center px-4 pb-20 pt-32">
          {/* Background GIF */}
          <div className="absolute inset-0 -z-10">
            <Image
              src="/3d/signup2-unscreen.gif"
              alt="Magic Worlds gameplay"
              fill
              priority
              unoptimized
              sizes="100vw"
              className="object-fit cover object-center opacity-30"
            />
            {/* <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" /> */}
          </div>
          <div className="relative z-10 mx-auto max-w-7xl text-center">
            {/* Badge */}
            {/* <motion.div
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-6 py-3 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Gamepad2 className="h-5 w-5 text-cyan-400" />
            <span className="font-orbitron text-sm font-bold uppercase tracking-wider text-cyan-400">
              Featured Game
            </span>
          </motion.div> */}

            {/* Title */}
            <motion.h1
              className="mb-6 font-orbitron text-6xl font-black uppercase leading-none md:text-8xl lg:text-9xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-2xl">
                {game.title}
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              className="mb-6 text-2xl font-medium text-gray-300 md:text-3xl lg:text-4xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {game.tagline}
            </motion.p>

            {/* Description */}
            <motion.p
              className="mx-auto mb-12 max-w-3xl text-lg leading-relaxed text-gray-400 md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {game.description}
            </motion.p>

            {/* Trailer */}
            <motion.div
              className="mb-12 flex flex-wrap items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.button
                className="group relative overflow-hidden rounded-xl border-2 border-pink-500/50 bg-gradient-to-r from-pink-500/10 to-rose-500/10 px-8 py-4 font-bold text-white shadow-2xl shadow-pink-500/30 backdrop-blur-sm"
                whileHover={{
                  scale: 1.05,
                  borderColor: "rgba(236, 72, 153, 0.8)",
                  boxShadow: "0 0 40px rgba(236, 72, 153, 0.6)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedGame(game)}
              >
                <span className="relative z-10 flex items-center gap-3">
                  <Play className="h-6 w-6 text-pink-400" />
                  <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-lg text-transparent">
                    Watch Trailer
                  </span>
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-rose-500/20"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
              <a
                href="/partners"
                className="group relative overflow-hidden rounded-xl border-2 border-white/30 px-8 py-4 font-bold text-white backdrop-blur-sm transition hover:border-white/60"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <ArrowRight className="h-5 w-5 text-cyan-300" />
                  <span className="text-lg">Partner Program</span>
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </a>
              <motion.button
                className="group relative overflow-hidden rounded-xl border-2 border-cyan-500/40 px-8 py-4 font-bold text-white backdrop-blur-sm transition disabled:cursor-not-allowed disabled:opacity-50"
                whileHover={{
                  scale: walletButtonDisabled ? 1 : 1.04,
                  borderColor: walletButtonDisabled
                    ? "rgba(6,182,212,0.4)"
                    : "rgba(6,182,212,0.8)",
                }}
                whileTap={{ scale: walletButtonDisabled ? 1 : 0.96 }}
                onClick={
                  isConnected ? handleDisconnectWallet : handleConnectWallet
                }
                disabled={walletButtonDisabled}
              >
                <span className="relative z-10 flex items-center gap-3">
                  <Wallet className="h-5 w-5 text-cyan-300" />
                  <span className="flex flex-col items-start text-left">
                    <span className="text-lg">
                      {isConnected ? "Wallet Linked" : "Connect Wallet"}
                    </span>
                    <span className="text-xs uppercase tracking-wider text-gray-300">
                      {isConnected ? truncatedAddress : "Claim instant $TOKEN"}
                    </span>
                  </span>
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/10"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: walletButtonDisabled ? 0 : 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
              {isConnected && !walletButtonDisabled && (
                <motion.button
                  className="rounded-full border border-white/40 px-4 py-2 text-sm font-semibold text-white transition hover:border-white"
                  whileTap={{ scale: 0.96 }}
                  onClick={handleDisconnectWallet}
                >
                  Disconnect wallet
                </motion.button>
              )}
            </motion.div>

            {walletFeedback && (
              <motion.p
                className="mt-3 text-base text-cyan-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {isSyncingReferral ? "⏳ " : ""}
                {walletFeedback}
              </motion.p>
            )}

            {/* Download Buttons */}
            <motion.div
              className="flex flex-wrap items-center justify-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <a
                href={game.windowsDownload}
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  className="group relative overflow-hidden rounded-2xl border-2 border-cyan-400/50 bg-gradient-to-br from-cyan-500 via-blue-500 to-cyan-600 px-12 py-6 font-bold text-white shadow-2xl shadow-cyan-500/60"
                  whileHover={{
                    scale: 1.08,
                    boxShadow:
                      "0 0 50px rgba(6, 182, 212, 0.8), 0 0 80px rgba(6, 182, 212, 0.4)",
                    borderColor: "rgba(6, 182, 212, 1)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <FaWindows className="h-7 w-7 animate-pulse" />
                    <div className="flex flex-col items-start">
                      <span className="text-xs uppercase tracking-wider opacity-90">
                        Download for
                      </span>
                      <span className="text-2xl font-black">Windows</span>
                    </div>
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-300"
                    initial={{ x: "-100%", opacity: 0 }}
                    whileHover={{ x: "100%", opacity: 0.3 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(6,182,212,0.3),transparent)]" />
                </motion.button>
              </a>

              <a
                href={game.macosDownload}
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  className="group relative overflow-hidden rounded-2xl border-2 border-gray-400/50 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 px-12 py-6 font-bold text-white shadow-2xl shadow-gray-500/60"
                  whileHover={{
                    scale: 1.08,
                    boxShadow:
                      "0 0 50px rgba(156, 163, 175, 0.8), 0 0 80px rgba(156, 163, 175, 0.4)",
                    borderColor: "rgba(156, 163, 175, 1)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <FaApple className="h-7 w-7 animate-pulse" />
                    <div className="flex flex-col items-start">
                      <span className="text-xs uppercase tracking-wider opacity-90">
                        Download for
                      </span>
                      <span className="text-2xl font-black">macOS</span>
                    </div>
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-400"
                    initial={{ x: "-100%", opacity: 0 }}
                    whileHover={{ x: "100%", opacity: 0.3 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(156,163,175,0.3),transparent)]" />
                </motion.button>
              </a>

              <a
                href={game.androidDownload}
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  className="group relative overflow-hidden rounded-2xl border-2 border-purple-400/50 bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 px-12 py-6 font-bold text-white shadow-2xl shadow-purple-500/60"
                  whileHover={{
                    scale: 1.08,
                    boxShadow:
                      "0 0 50px rgba(168, 85, 247, 0.8), 0 0 80px rgba(168, 85, 247, 0.4)",
                    borderColor: "rgba(168, 85, 247, 1)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <FaAndroid className="h-7 w-7 animate-pulse" />
                    <div className="flex flex-col items-start">
                      <span className="text-xs uppercase tracking-wider opacity-90">
                        Download for
                      </span>
                      <span className="text-2xl font-black">Android</span>
                    </div>
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400"
                    initial={{ x: "-100%", opacity: 0 }}
                    whileHover={{ x: "100%", opacity: 0.3 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(168,85,247,0.3),transparent)]" />
                </motion.button>
              </a>
            </motion.div>

            {/* Genre Tags */}
            <motion.div
              className="mt-12 flex flex-wrap items-center justify-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {game.genre.map((tag, index) => (
                <span
                  key={index}
                  className="rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 font-orbitron text-sm font-bold text-purple-400 backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Decorative Elements - Enhanced */}
          {/* <motion.div
          className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-cyan-500/30 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-0 h-96 w-96 rounded-full bg-purple-500/30 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.5,
          }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/20 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        /> */}

          {/* Video Popup Modal */}
          <AnimatePresence>
            {selectedGame && (
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedGame(null)}
              >
                <motion.div
                  className="relative w-full max-w-5xl"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="absolute -right-4 -top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                    onClick={() => setSelectedGame(null)}
                  >
                    ✕
                  </button>
                  <div className="aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/uYgyLtKgOVM?autoplay=1"
                      title="Game Trailer"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="h-full w-full"
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Features Section */}
        <section className="relative py-20 lg:py-32">
          <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
            {/* Section Header */}
            <div className="mb-16 text-center">
              <motion.div
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Trophy className="h-4 w-4 text-purple-400" />
                <span className="font-orbitron text-xs font-bold uppercase tracking-wider text-purple-400">
                  Game Features
                </span>
              </motion.div>

              <motion.h2
                className="mb-6 font-orbitron text-4xl font-black uppercase text-white md:text-5xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Unleash Your Power
                </span>
              </motion.h2>

              <motion.p
                className="mx-auto max-w-2xl text-lg text-gray-400"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                Experience gaming like never before with cutting-edge features
                designed for the ultimate adventure.
              </motion.p>
            </div>

            {/* Features Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {game.features.map((feature, index) => {
                const icons = [Zap, Shield, Users, Trophy, Gamepad2, Play];
                const colors = [
                  "cyan",
                  "purple",
                  "pink",
                  "emerald",
                  "blue",
                  "amber",
                ];
                const Icon = icons[index % icons.length];
                const color = colors[index % colors.length];

                return (
                  <motion.div
                    key={index}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <div
                      className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-${color}-500/20 to-${color}-500/5 shadow-lg`}
                    >
                      <Icon className={`h-6 w-6 text-${color}-400`} />
                    </div>
                    <h3 className="mb-2 font-orbitron text-lg font-bold text-white">
                      {feature}
                    </h3>
                    <div className="h-1 w-12 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400" />

                    {/* Hover Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* System Requirements Section */}
        <section className="relative py-20 lg:py-32">
          <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
            {/* Section Header */}
            <div className="mb-16 text-center">
              <motion.div
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-6 py-3 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Cpu className="h-5 w-5 text-cyan-400" />
                <span className="font-orbitron text-sm font-bold uppercase tracking-wider text-cyan-400">
                  System Requirements
                </span>
              </motion.div>

              <motion.h2
                className="mb-6 font-orbitron text-4xl font-black uppercase text-white md:text-5xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Ready to Play?
                </span>
              </motion.h2>

              <motion.p
                className="mx-auto max-w-2xl text-lg text-gray-400"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                Check if your system meets the requirements for an optimal
                gaming experience
              </motion.p>
            </div>

            <div className="grid gap-12 lg:grid-cols-2">
              {/* Left Column - Requirements */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                {/* Platform Tabs */}
                <div className="mb-8 flex flex-wrap gap-4">
                  {(["windows", "macos", "android"] as const).map(
                    (platform) => {
                      const platformColors = {
                        windows: "from-cyan-500 to-blue-500 shadow-cyan-500/50",
                        macos: "from-gray-500 to-slate-600 shadow-gray-500/50",
                        android:
                          "from-purple-500 to-pink-500 shadow-purple-500/50",
                      };

                      return (
                        <motion.button
                          key={platform}
                          className={`relative overflow-hidden rounded-xl px-8 py-4 font-bold capitalize transition-all ${
                            selectedPlatform === platform
                              ? `bg-gradient-to-r ${platformColors[platform]} text-white shadow-lg`
                              : "border-2 border-white/10 bg-white/5 text-gray-400 hover:border-white/30 hover:text-white"
                          }`}
                          onClick={() => setSelectedPlatform(platform)}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span className="relative z-10">
                            {platform === "macos" ? "macOS" : platform}
                          </span>
                          {selectedPlatform === platform && (
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                              initial={{ x: "-100%" }}
                              animate={{ x: "100%" }}
                              transition={{ duration: 1, repeat: Infinity }}
                            />
                          )}
                        </motion.button>
                      );
                    },
                  )}
                </div>

                {/* Requirements List */}
                <div className="space-y-3">
                  <AnimatePresence mode="wait">
                    {Object.entries(game.requirements[selectedPlatform]).map(
                      ([key, value], index) => (
                        <motion.div
                          key={`${selectedPlatform}-${key}`}
                          className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-5 backdrop-blur-sm transition-all hover:border-cyan-500/30 hover:bg-white/10"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ x: 5 }}
                        >
                          <div className="flex items-start gap-4">
                            <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-cyan-500/5">
                              <CheckCircle2 className="h-5 w-5 text-cyan-400" />
                            </div>
                            <div className="flex-1">
                              <p className="mb-1 font-orbitron text-sm font-bold uppercase tracking-wide text-white">
                                {key.replace(/([A-Z])/g, " $1")}
                              </p>
                              <p className="text-gray-400">{value}</p>
                            </div>
                          </div>
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent"
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                          />
                        </motion.div>
                      ),
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Right Column - Info Cards */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-cyan-500/5 p-8 backdrop-blur-sm"
                    key={selectedPlatform}
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -20 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ y: -5 }}
                  >
                    <motion.div
                      className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/30 to-cyan-500/10 shadow-lg shadow-cyan-500/20"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <HardDrive className="h-8 w-8 text-cyan-400" />
                    </motion.div>
                    <h3 className="mb-2 font-orbitron text-3xl font-black text-white">
                      {game.size[selectedPlatform]}
                    </h3>
                    <p className="text-lg text-gray-400">
                      {selectedPlatform === "macos"
                        ? "macOS"
                        : selectedPlatform.charAt(0).toUpperCase() +
                          selectedPlatform.slice(1)}{" "}
                      Download Size
                    </p>
                    <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        className="h-full bg-gradient-to-r from-cyan-400 to-blue-400"
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>

                <motion.div
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-purple-500/5 p-8 backdrop-blur-sm"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/30 to-purple-500/10 shadow-lg shadow-purple-500/20"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Users className="h-8 w-8 text-purple-400" />
                  </motion.div>
                  <h3 className="mb-2 font-orbitron text-3xl font-black text-white">
                    {(game.activeUsers / 1000000).toFixed(1)}M+
                  </h3>
                  <p className="text-lg text-gray-400">
                    Active Players Worldwide
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <Globe className="h-5 w-5 text-purple-400" />
                    <span className="text-sm text-purple-400">
                      Growing Daily
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-pink-500/10 via-amber-500/10 to-pink-500/5 p-8 backdrop-blur-sm"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-500/30 to-yellow-500/10 shadow-lg shadow-yellow-500/20"
                    whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Star className="h-8 w-8 text-yellow-400" />
                  </motion.div>
                  <h3 className="mb-2 font-orbitron text-3xl font-black text-white">
                    {game.rating}/5.0
                  </h3>
                  <p className="text-lg text-gray-400">Community Rating</p>
                  <div className="mt-4 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + i * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Decorative Gradient Orbs */}
          <motion.div
            className="absolute left-0 top-1/4 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-0 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3,
            }}
          />
        </section>

        {/* CTA Section */}
        <section className="relative py-20 lg:py-32">
          <div className="relative z-10 mx-auto max-w-5xl px-4 text-center md:px-8">
            <motion.div
              className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 p-12 backdrop-blur-sm md:p-16"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Gamepad2 className="mx-auto mb-6 h-16 w-16 text-cyan-400" />

              <h2 className="mb-4 font-orbitron text-4xl font-black uppercase text-white md:text-5xl">
                Start Your Adventure
              </h2>

              <p className="mb-8 text-xl text-gray-300">
                Join millions of players in the ultimate gaming experience.
                Download now and claim your destiny!
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href={game.windowsDownload}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.button
                    className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 font-bold text-white shadow-lg shadow-cyan-500/50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="flex items-center gap-2">
                      <Download className="h-5 w-5" />
                      Download Now
                    </span>
                  </motion.button>
                </a>

                <motion.button
                  className="rounded-xl border-2 border-white/20 bg-white/5 px-8 py-4 font-bold text-white backdrop-blur-sm"
                  whileHover={{
                    scale: 1.05,
                    borderColor: "rgba(255,255,255,0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    document
                      .querySelector("section")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Decorative Gradient Orbs */}
          {/* <div className="absolute left-1/4 top-0 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl" /> */}
        </section>
      </div>
    </>
  );
};

export default GameDownloads;
