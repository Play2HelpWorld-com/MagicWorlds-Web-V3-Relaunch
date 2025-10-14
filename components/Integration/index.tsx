"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import {
  Monitor,
  Smartphone,
  Gamepad2,
  Headset,
  Cloud,
  Globe,
  Zap,
  Users,
  Shield,
  Wifi,
} from "lucide-react";

const Integration = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.8, 1, 1, 0.8],
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const platforms = [
    {
      icon: Monitor,
      name: "WINDOWS",
      color: "#00D9FF",
      gradient: "from-cyan-500 to-blue-500",
      description: "Maximum performance. Ultra graphics. Competitive edge.",
      specs: ["4K Ready", "Ray Tracing", "144+ FPS"],
      status: "Released",
    },
    {
      icon: Monitor,
      name: "MACOS",
      color: "#A3A3A3",
      gradient: "from-gray-400 to-gray-600",
      description: "Optimized for Apple Silicon. Seamless performance.",
      specs: ["M-Series", "Retina Display", "Metal API"],
      status: "Released",
    },
    {
      icon: Smartphone,
      name: "ANDROID",
      color: "#3DDC84",
      gradient: "from-green-500 to-emerald-500",
      description: "Play anywhere. Quick sessions. Always connected.",
      specs: ["Touch Optimized", "5G Ready", "Low Latency"],
      status: "Released",
    },
    {
      icon: Cloud,
      name: "CLOUD STREAM",
      color: "#00E5A0",
      gradient: "from-emerald-500 to-teal-500",
      description: "Zero downloads. Instant play. Game anywhere, anytime.",
      specs: ["No Install", "Any Device", "1080p Stream"],
      status: "Released",
    },
    {
      icon: Headset,
      name: "VR WORLDS",
      color: "#B14AED",
      gradient: "from-purple-500 to-violet-500",
      description:
        "Total immersion. 360° experience. Virtual reality redefined.",
      specs: ["Full VR", "Hand Tracking", "Haptic Feedback"],
      status: "Upcoming",
    },
    {
      icon: Smartphone,
      name: "IOS",
      color: "#007AFF",
      gradient: "from-blue-500 to-indigo-500",
      description: "Coming to iPhone & iPad. Premium mobile experience.",
      specs: ["App Store", "Game Center", "iCloud Sync"],
      status: "Upcoming",
    },
  ];

  const features = [
    {
      icon: Zap,
      label: "Real-Time Sync",
      description: "Instant progress across devices",
    },
    {
      icon: Users,
      label: "Cross-Play",
      description: "Play with anyone, anywhere",
    },
    {
      icon: Shield,
      label: "Secure Cloud",
      description: "Your data, protected",
    },
    {
      icon: Wifi,
      label: "Low Latency",
      description: "Lightning-fast response",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-black py-20 lg:py-32"
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Mouse Follower Glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-30"
        animate={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 217, 255, 0.15), transparent 40%)`,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />

      <motion.div
        className="relative z-10 mx-auto max-w-7xl px-4 md:px-8 2xl:px-0"
        style={{ opacity, scale }}
      >
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          {/* Glitch effect badge */}
          <motion.div
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Zap className="h-4 w-4 text-cyan-400" />
            <span className="font-orbitron text-xs font-bold uppercase tracking-wider text-cyan-400">
              Universal Gaming Platform
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h2
            className="mb-6 font-orbitron text-4xl font-black uppercase leading-tight text-white md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              ONE WORLD
            </span>
            <br />
            <span className="text-white">INFINITE DEVICES</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="mx-auto max-w-3xl font-rajdhani text-lg font-medium leading-relaxed text-gray-400 md:text-xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Break free from platform limitations. Your adventure synchronizes
            seamlessly across desktop, mobile, console, VR, and cloud. One
            account. One profile. Unlimited possibilities.
          </motion.p>

          {/* Animated divider */}
          <motion.div
            className="mx-auto mt-8 h-1 w-32 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 128, opacity: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
            viewport={{ once: true }}
          />
        </motion.div>

        {/* Platform Cards Grid */}
        <div className="mb-20 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {platforms.map((platform, index) => {
            const Icon = platform.icon;
            const isActive = activeIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                onHoverStart={() => setActiveIndex(index)}
                onHoverEnd={() => setActiveIndex(null)}
                className="group relative"
              >
                {/* Glow effect */}
                <motion.div
                  className={`absolute -inset-0.5 rounded-2xl bg-gradient-to-r ${platform.gradient} opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-70`}
                />

                {/* Card */}
                <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-gray-900/90 to-black/90 p-6 backdrop-blur-sm transition-all duration-500 group-hover:border-white/30">
                  {/* Status Badge */}
                  {/* <div className="absolute right-4 top-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
                        platform.status === "Released"
                          ? "bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/40"
                          : "bg-amber-500/20 text-amber-400 ring-1 ring-amber-500/40"
                      }`}
                    >
                      <div
                        className={`h-1.5 w-1.5 rounded-full ${
                          platform.status === "Released"
                            ? "animate-pulse bg-emerald-400"
                            : "bg-amber-400"
                        }`}
                      />
                      {platform.status}
                    </span>
                  </div> */}

                  {/* Icon and Title Row */}
                  <div className="mb-4 flex items-center gap-4">
                    {/* Icon container */}
                    <motion.div
                      className={`inline-flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${platform.gradient} p-0.5`}
                      animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="flex h-full w-full items-center justify-center rounded-xl bg-black">
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                    </motion.div>

                    {/* Platform name */}
                    <h3 className="font-orbitron text-xl font-bold uppercase tracking-wide text-white">
                      {platform.name}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="mb-4 font-rajdhani text-sm font-medium leading-relaxed text-gray-400">
                    {platform.description}
                  </p>

                  {/* Specs list */}
                  <div className="space-y-2">
                    {platform.specs.map((spec, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + i * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div
                          className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${platform.gradient}`}
                        />
                        <span className="font-rajdhani text-xs font-medium uppercase tracking-wide text-gray-500 transition-colors duration-300 group-hover:text-gray-300">
                          {spec}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Hover shine effect */}
                  <motion.div
                    className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: `linear-gradient(135deg, transparent 0%, ${platform.color}15 50%, transparent 100%)`,
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Features Bar */}

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-gray-900/90 to-black/90 p-8 text-center backdrop-blur-sm md:p-12"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:2rem_2rem]" />
          </div>

          <div className="relative z-10">
            {/* Badge */}
            <motion.div
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5"
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(0, 217, 255, 0)",
                  "0 0 0 10px rgba(0, 217, 255, 0)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
              <span className="font-orbitron text-xs font-bold uppercase tracking-wider text-cyan-400">
                Ready to Play
              </span>
            </motion.div>

            {/* Heading */}
            <h3 className="mb-4 font-orbitron text-2xl font-black uppercase text-white md:text-3xl">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                YOUR JOURNEY
              </span>{" "}
              <span className="text-white">STARTS NOW</span>
            </h3>

            {/* Description */}
            <p className="mx-auto mb-8 max-w-2xl font-rajdhani text-base font-medium text-gray-400 md:text-lg">
              Join millions of players in the ultimate cross-platform gaming
              experience. One account. Unlimited adventure. Zero boundaries.
            </p>

            {/* Stats */}
            <div className="mb-8 flex flex-wrap items-center justify-center gap-8">
              <div className="text-center">
                <div className="mb-1 font-orbitron text-3xl font-black text-cyan-400">
                  6+
                </div>
                <div className="font-rajdhani text-sm uppercase tracking-wide text-gray-500">
                  Platforms
                </div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="text-center">
                <div className="mb-1 font-orbitron text-3xl font-black text-purple-400">
                  100%
                </div>
                <div className="font-rajdhani text-sm uppercase tracking-wide text-gray-500">
                  Synced
                </div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="text-center">
                <div className="mb-1 font-orbitron text-3xl font-black text-pink-400">
                  24/7
                </div>
                <div className="font-rajdhani text-sm uppercase tracking-wide text-gray-500">
                  Available
                </div>
              </div>
            </div>

            {/* Pulse decoration */}
            <motion.div
              className="absolute left-1/2 top-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/20 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Integration;
