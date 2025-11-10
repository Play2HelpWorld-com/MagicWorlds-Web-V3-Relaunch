"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const MarketingBanner = () => {
  const [windowHeight, setWindowHeight] = useState(1000);
  const { scrollY } = useScroll();

  useEffect(() => {
    // Set window height on client side
    setWindowHeight(window.innerHeight);

    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Transform scroll position to banner translation
  // When scrollY is 0, y = 0 (banner visible)
  // When scrollY is window height, y = -100% (banner hidden up)
  const bannerY = useTransform(scrollY, [0, windowHeight], ["0%", "-100%"]);

  const bannerOpacity = useTransform(scrollY, [0, windowHeight * 0.5], [1, 0]);

  return (
    <motion.div
      style={{
        y: bannerY,
        opacity: bannerOpacity,
      }}
      className="fixed inset-0 z-50 h-screen w-full"
    >
      {/* Full-screen Background Image */}
      <div className="absolute inset-0 h-full w-full">
        <Image
          src="/images/hero/banner.jpg"
          alt="Magic Worlds - Marketing Banner"
          fill
          priority
          quality={100}
          className="object-fit cover object-center"
        />
        {/* Subtle overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Logo/Title Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          <h1 className="mb-4 font-orbitron text-5xl font-black uppercase leading-tight tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(168,85,247,1)]">
              MAGIC
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(59,130,246,1)]">
              WORLDS
            </span>
          </h1>
          <p className="mx-auto max-w-2xl font-rajdhani text-xl font-medium text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] sm:text-2xl md:text-3xl">
            Enter the Ultimate Gaming Universe
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:gap-6"
        >
          {/* Download Now Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-600 px-10 py-5 font-orbitron text-lg font-black uppercase tracking-wider text-white shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all duration-300 hover:shadow-[0_0_50px_rgba(168,85,247,0.9)] sm:px-12 sm:py-6 sm:text-xl"
          >
            <span className="relative z-10 flex items-center gap-3">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Download Now
            </span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
          </motion.button>

          {/* Join Discord Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative overflow-hidden rounded-2xl border-2 border-purple-500 bg-black/40 px-10 py-5 font-orbitron text-lg font-black uppercase tracking-wider text-white backdrop-blur-md transition-all duration-300 hover:border-fuchsia-400 hover:bg-purple-900/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] sm:px-12 sm:py-6 sm:text-xl"
          >
            <span className="relative z-10 flex items-center gap-3">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              Join Discord
            </span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
          </motion.button>
        </motion.div>

        {/* Platform Download Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12"
        >
          <p className="mb-6 text-center font-rajdhani text-sm font-semibold uppercase tracking-wider text-gray-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Available On
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {/* macOS */}
            <motion.a
              href="#"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-2 rounded-xl border border-purple-500/30 bg-black/40 px-6 py-3 backdrop-blur-md transition-all duration-300 hover:border-purple-400 hover:bg-purple-900/40 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]"
            >
              <svg
                className="h-6 w-6 text-gray-300 transition-colors group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div className="text-left">
                <div className="text-xs text-gray-400">Get it on</div>
                <div className="font-rajdhani text-sm font-bold text-white">
                  macOS
                </div>
              </div>
            </motion.a>

            {/* Windows */}
            <motion.a
              href="#"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-2 rounded-xl border border-purple-500/30 bg-black/40 px-6 py-3 backdrop-blur-md transition-all duration-300 hover:border-purple-400 hover:bg-purple-900/40 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]"
            >
              <svg
                className="h-6 w-6 text-gray-300 transition-colors group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
              </svg>
              <div className="text-left">
                <div className="text-xs text-gray-400">Get it on</div>
                <div className="font-rajdhani text-sm font-bold text-white">
                  Windows
                </div>
              </div>
            </motion.a>

            {/* Android */}
            <motion.a
              href="#"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-2 rounded-xl border border-purple-500/30 bg-black/40 px-6 py-3 backdrop-blur-md transition-all duration-300 hover:border-purple-400 hover:bg-purple-900/40 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]"
            >
              <svg
                className="h-6 w-6 text-gray-300 transition-colors group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4483-.9993.9993-.9993c.5511 0 .9993.4483.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4483.9993.9993 0 .5511-.4483.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.2439 13.8533 7.8508 12 7.8508s-3.5902.3931-5.1367 1.0989L4.841 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3435-4.1021-2.6892-7.5743-6.1185-9.4396" />
              </svg>
              <div className="text-left">
                <div className="text-xs text-gray-400">Get it on</div>
                <div className="font-rajdhani text-sm font-bold text-white">
                  Android
                </div>
              </div>
            </motion.a>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <p className="font-rajdhani text-sm font-medium text-white/80 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Scroll to explore
            </p>
            <svg
              className="h-6 w-6 text-white/80"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MarketingBanner;
