"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  Monitor,
  Smartphone,
  Zap,
  Shield,
  Users,
  Trophy,
  Gamepad2,
  Star,
  CheckCircle2,
  ChevronDown,
  Play,
  Globe,
  Cpu,
  HardDrive,
} from "lucide-react";

// Game data
const GAMES = [
  {
    id: 1,
    title: "Magic Worlds",
    tagline: "Enter the Realm of Infinite Possibilities",
    description:
      "An immersive fantasy adventure with stunning visuals and engaging storyline. Battle legendary creatures, forge powerful alliances, and become the hero of your own epic saga.",
    platforms: ["windows", "android"],
    genre: ["RPG", "Adventure", "Multiplayer"],
    size: "1.2 GB",
    rating: 4.9,
    downloads: 5247823,
    activeUsers: 2500000,
    spotlight: true,
    windowsDownload: "https://magicworlds.itch.io/magic-world",
    androidDownload:
      "https://drive.google.com/file/d/141f8EDsJhFywxbtJ0KfJUH8HRarf3P4j/view?usp=drive_link",
    features: [
      "Cross-platform gameplay",
      "Real-time multiplayer battles",
      "Regular content updates",
      "Cloud save support",
      "4K graphics ready",
      "Full controller support",
    ],
    requirements: {
      os: "Windows 10/11 64-bit",
      processor: "Intel Core i5-6600K / AMD Ryzen 5 1600",
      memory: "8 GB RAM",
      graphics: "NVIDIA GTX 1060 / AMD Radeon RX 580",
      storage: "1.2 GB available space",
      directX: "Version 12",
    },
  },
];

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
const GameDownloads = () => {
  const [selectedGame, setSelectedGame] = useState<null | (typeof GAMES)[0]>(
    null,
  );
  const game = GAMES[0]; // Primary game

  return (
    <div className="relative min-h-screen overflow-hidden bg-black font-rajdhani text-white">
      {/* Animated Grid Background */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Gradient Overlays */}
      <motion.div
        className="fixed inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          easeIn: "easeInOut",
        }}
      />

      <FloatingParticles />

      {/* Hero Section */}
      <section className="relative min-h-screen px-4 pb-20 pt-32">
        <div className="relative z-10 mx-auto max-w-7xl">
          {/* Badge */}
          <motion.div
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Zap className="h-4 w-4 text-cyan-400" />
            <span className="font-orbitron text-xs font-bold uppercase tracking-wider text-cyan-400">
              Now Available
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="mb-6 font-orbitron text-6xl font-black uppercase leading-none md:text-8xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {game.title}
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="mb-8 text-2xl text-gray-300 md:text-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {game.tagline}
          </motion.p>

          {/* Description */}
          <motion.p
            className="mb-12 max-w-3xl text-lg leading-relaxed text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {game.description}
          </motion.p>

          {/* Stats Grid */}
          <motion.div
            className="mb-12 grid grid-cols-3 gap-4 md:gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="mb-2 flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-400" />
                <span className="text-3xl font-bold text-white">
                  {game.rating}
                </span>
              </div>
              <p className="text-sm text-gray-400">User Rating</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="mb-2 flex items-center gap-2">
                <Download className="h-5 w-5 text-cyan-400" />
                <span className="text-3xl font-bold text-white">
                  {(game.downloads / 1000000).toFixed(1)}M
                </span>
              </div>
              <p className="text-sm text-gray-400">Downloads</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="mb-2 flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-400" />
                <span className="text-3xl font-bold text-white">
                  {(game.activeUsers / 1000000).toFixed(1)}M
                </span>
              </div>
              <p className="text-sm text-gray-400">Active Players</p>
            </div>
          </motion.div>

          {/* Download Buttons */}
          <motion.div
            className="mb-12 flex flex-wrap gap-4"
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
                className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 font-bold text-white shadow-lg shadow-cyan-500/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  <Monitor className="h-6 w-6" />
                  <span className="text-lg">Download for Windows</span>
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </a>

            <a
              href={game.androidDownload}
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.button
                className="group relative overflow-hidden rounded-xl border-2 border-white/20 bg-white/5 px-8 py-4 font-bold text-white backdrop-blur-sm"
                whileHover={{
                  scale: 1.05,
                  borderColor: "rgba(255,255,255,0.4)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  <Smartphone className="h-6 w-6" />
                  <span className="text-lg">Download for Android</span>
                </span>
              </motion.button>
            </a>
          </motion.div>

          {/* Platform Badges */}
          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 backdrop-blur-sm">
              <Monitor className="h-4 w-4 text-cyan-400" />
              <span className="text-sm font-medium">Windows</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 backdrop-blur-sm">
              <Smartphone className="h-4 w-4 text-green-400" />
              <span className="text-sm font-medium">Android</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 backdrop-blur-sm">
              <Globe className="h-4 w-4 text-purple-400" />
              <span className="text-sm font-medium">Cross-Platform</span>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="h-8 w-8 text-gray-400" />
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute bottom-1/4 left-0 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />
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
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Left Column - Requirements */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 backdrop-blur-sm">
                <Cpu className="h-4 w-4 text-cyan-400" />
                <span className="font-orbitron text-xs font-bold uppercase tracking-wider text-cyan-400">
                  System Requirements
                </span>
              </div>

              <h2 className="mb-8 font-orbitron text-3xl font-black uppercase text-white md:text-4xl">
                Ready to Play?
              </h2>

              <div className="space-y-4">
                {Object.entries(game.requirements).map(
                  ([key, value], index) => (
                    <motion.div
                      key={key}
                      className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-cyan-400" />
                      <div>
                        <p className="font-bold capitalize text-white">
                          {key.replace(/([A-Z])/g, " $1")}
                        </p>
                        <p className="text-sm text-gray-400">{value}</p>
                      </div>
                    </motion.div>
                  ),
                )}
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
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-8 backdrop-blur-sm">
                <HardDrive className="mb-4 h-12 w-12 text-cyan-400" />
                <h3 className="mb-2 font-orbitron text-2xl font-bold text-white">
                  {game.size}
                </h3>
                <p className="text-gray-400">Total Download Size</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-8 backdrop-blur-sm">
                <Users className="mb-4 h-12 w-12 text-purple-400" />
                <h3 className="mb-2 font-orbitron text-2xl font-bold text-white">
                  {(game.activeUsers / 1000000).toFixed(1)}M+
                </h3>
                <p className="text-gray-400">Active Players Worldwide</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-pink-500/10 to-amber-500/10 p-8 backdrop-blur-sm">
                <Star className="mb-4 h-12 w-12 text-yellow-400" />
                <h3 className="mb-2 font-orbitron text-2xl font-bold text-white">
                  {game.rating}/5.0
                </h3>
                <p className="text-gray-400">Community Rating</p>
              </div>
            </motion.div>
          </div>
        </div>
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
        <div className="absolute left-1/4 top-0 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl" />
      </section>
    </div>
  );
};

export default GameDownloads;
