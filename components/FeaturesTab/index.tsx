"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FeaturesTab = () => {
  const [currentTab, setCurrentTab] = useState("tabOne");
  const [isHovering, setIsHovering] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Play sound effect on tab change
  useEffect(() => {
    if (typeof window !== "undefined") {
      const playSound = () => {
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current
            .play()
            .catch((e) => console.log("Audio play prevented"));
        }
      };
      playSound();
    }
  }, [currentTab]);

  // Gaming-themed feature data with more dynamic content
  const gamingFeaturesData = [
    {
      id: "tabOne",
      buttonText: "Join",
      title: "Sign Up & Join",
      description:
        "Create your free account in seconds and become part of the Magic Worlds community. Quick registration gets you instant access to our gaming platform and charitable impact system.",
      benefits: [
        "Fast and secure account creation",
        "No credit card required to start",
        "Personalized gaming profile and dashboard",
        "Connect with friends and join communities",
      ],
      image: "/images/features/signup.gif",
      altText: "Sign Up Illustration",
    },
    {
      id: "tabTwo",
      buttonText: "Play",
      title: "Start Playing",
      description:
        "Jump into a world of excitement with our curated collection of games. From action-packed adventures to mind-bending puzzles, discover new experiences and challenge your skills.",
      benefits: [
        "Access to magic worlds games across all genres",
        "Real-time multiplayer with friends and global leaderboards",
        "Cross-platform synchronization for seamless gaming",
        "New games added regularly to keep things fresh",
      ],
      image: "/images/features/gameplay.gif",
      altText: "Gaming Experience Illustration",
    },
    {
      id: "tabThree",
      buttonText: "Earn",
      title: "Earn Rewards",
      description:
        "Every minute of gameplay earns you valuable points. Complete challenges, unlock achievements, and watch your score multiply with consecutive daily play streaks.",
      benefits: [
        "Daily challenges with escalating point rewards",
        "Achievement system with rare collectible badges",
        "Weekly tournaments with premium prize pools",
        "Convert points to charity donations or exclusive rewards",
      ],
      image: "/images/features/rewards.gif",
      altText: "Rewards System Illustration",
    },
  ];

  // Tab variants for animations
  const tabVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
  };

  // Glowing effect for active tab
  const glowVariants = {
    idle: {
      boxShadow: "0 0 0px rgba(124, 58, 237, 0)",
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse" as const,
      },
    },
    active: {
      boxShadow: "0 0 20px rgba(124, 58, 237, 0.8)",
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse" as const,
      },
    },
  };

  // Feature content animation variants
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.1 + 0.2, duration: 0.4 },
    }),
  };

  return (
    <section className="relative overflow-hidden bg-transparent py-24">
      {/* Background game-themed elements */}
      <div className="absolute left-0 top-0 h-full w-full overflow-hidden">
        <div className="absolute left-10 top-10 h-20 w-20 animate-pulse rounded-full bg-purple-600 opacity-20 blur-3xl"></div>
        <div
          className="absolute bottom-20 right-20 h-32 w-32 animate-pulse rounded-full bg-blue-500 opacity-20 blur-3xl"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute left-1/4 top-1/2 h-40 w-40 animate-pulse rounded-full bg-red-500 opacity-10 blur-3xl"
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Particle grid effect */}
        <div className="absolute inset-0 z-0">
          <div className="grid h-full w-full grid-cols-12 grid-rows-12">
            {Array(144)
              .fill(null)
              .map((_, i) => (
                <div key={i} className="relative">
                  <div
                    className="absolute left-1/2 top-1/2 h-1 w-1 rounded-full bg-purple-500 opacity-20"
                    style={{
                      transform: "translate(-50%, -50%)",
                      animation: `pulse ${2 + Math.random() * 4}s infinite ${Math.random() * 5}s`,
                    }}
                  ></div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading with gaming flair */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-gradient-to-r from-purple-500/10 via-fuchsia-500/10 to-purple-500/10 px-4 py-2 backdrop-blur-sm"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-2 w-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]"
            />
            <span className="font-rajdhani text-sm font-bold uppercase tracking-widest text-purple-400">
              Game Features
            </span>
          </motion.div>

          <h2 className="mb-4 font-orbitron text-4xl font-black uppercase tracking-tight text-white md:text-5xl lg:text-6xl">
            <span className="inline-block bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(168,85,247,0.3)]">
              Choose Your Adventure
            </span>
          </h2>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto mb-6 h-1 w-24 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
          />

          <p className="mx-auto max-w-2xl font-rajdhani text-base font-medium text-gray-300 md:text-lg">
            Enter a new dimension of gaming with our revolutionary features
            designed to enhance your experience, reward your dedication, and
            make a positive impact.
          </p>
        </motion.div>

        {/* Audio element for sound effects */}
        <audio ref={audioRef} className="hidden">
          <source src="/sounds/click-sound.mp3" type="audio/mpeg" />
        </audio>

        {/* Gaming-themed tab navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16 flex flex-col justify-center gap-4 md:flex-row"
        >
          {gamingFeaturesData.map((feature, index) => (
            <motion.button
              key={feature.id}
              onClick={() => setCurrentTab(feature.id)}
              onHoverStart={() => setIsHovering(feature.id)}
              onHoverEnd={() => setIsHovering(null)}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`group relative overflow-hidden rounded-xl border-2 px-6 py-4 backdrop-blur-sm transition-all duration-500
          ${
            currentTab === feature.id
              ? "border-purple-500 bg-gradient-to-br from-purple-600/40 via-purple-500/30 to-fuchsia-600/40 shadow-[0_0_40px_rgba(168,85,247,0.6)]"
              : "border-purple-500/20 bg-gradient-to-br from-gray-800/60 to-gray-900/60 hover:border-purple-500/60 hover:shadow-[0_0_25px_rgba(168,85,247,0.3)]"
          }`}
            >
              {/* Animated background particles */}
              <div className="pointer-events-none absolute inset-0">
                <div
                  className={`absolute right-0 top-0 h-20 w-20 rounded-full blur-2xl transition-opacity duration-500 ${
                    currentTab === feature.id || isHovering === feature.id
                      ? "opacity-50"
                      : "opacity-0"
                  } ${
                    index === 0
                      ? "bg-blue-500"
                      : index === 1
                        ? "bg-amber-500"
                        : "bg-emerald-500"
                  }`}
                />
              </div>

              {/* Icon container */}
              <div className="relative flex flex-row items-center gap-3">
                <motion.div
                  animate={
                    currentTab === feature.id
                      ? {
                          rotate: [0, 360],
                          scale: [1, 1.1, 1],
                        }
                      : {}
                  }
                  transition={{
                    duration: 3,
                    repeat: currentTab === feature.id ? Infinity : 0,
                    ease: "linear",
                  }}
                  className={`relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border-2 ${
                    currentTab === feature.id
                      ? `${
                          index === 0
                            ? "border-blue-400 bg-blue-500/20"
                            : index === 1
                              ? "border-amber-400 bg-amber-500/20"
                              : "border-emerald-400 bg-emerald-500/20"
                        } shadow-lg`
                      : "border-gray-600/50 bg-gray-700/30"
                  }`}
                >
                  {/* Glowing core */}
                  <motion.div
                    animate={
                      currentTab === feature.id
                        ? {
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 1, 0.5],
                          }
                        : {}
                    }
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className={`h-4 w-4 rounded-full ${
                      index === 0
                        ? "bg-blue-400"
                        : index === 1
                          ? "bg-amber-400"
                          : "bg-emerald-400"
                    } ${currentTab === feature.id ? "opacity-100" : "opacity-40"}`}
                  />
                </motion.div>

                <span
                  className={`block font-orbitron text-base font-black uppercase tracking-wider transition-colors duration-300 ${
                    currentTab === feature.id
                      ? "bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent"
                      : "text-gray-300 group-hover:text-white"
                  }`}
                >
                  {feature.buttonText}
                </span>
              </div>

              {/* Corner accents */}
              {currentTab === feature.id && (
                <>
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute left-2 top-2 h-3 w-3 border-l-2 border-t-2 border-purple-400"
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute bottom-2 right-2 h-3 w-3 border-b-2 border-r-2 border-purple-400"
                  />
                </>
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Tab content with advanced animations */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {gamingFeaturesData.map(
              (feature) =>
                feature.id === currentTab && (
                  <motion.div
                    key={feature.id}
                    variants={tabVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center gap-8 lg:flex-row lg:gap-16"
                  >
                    {/* Feature imagery with parallax effect */}
                    <motion.div
                      className="w-full lg:w-1/2"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <div className="relative h-64 w-full overflow-hidden rounded-2xl border-2 border-purple-800/50 shadow-lg shadow-purple-900/20 sm:h-80 md:h-96">
                        {/* GIF Background with fallback gradient */}
                        <div className="absolute inset-0">
                          <Image
                            src={
                              feature.id === "tabOne"
                                ? "/3d/signup.gif"
                                : feature.id === "tabTwo"
                                  ? "/3d/gameplay.gif"
                                  : "/3d/rewards.gif"
                            }
                            alt={feature.altText}
                            fill
                            className="object-cover"
                            unoptimized // Important for GIFs to maintain animation
                            priority
                          />

                          {/* Gradient overlay for better text readability if needed */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        </div>

                        {/* Optional: Game-themed frame decoration */}
                        <div className="absolute inset-0 rounded-2xl border-2 border-purple-500/20" />
                      </div>
                    </motion.div>

                    {/* Feature content with staggered animations */}
                    <div className="w-full lg:w-1/2">
                      <motion.h3
                        custom={1}
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        className="mb-4 font-orbitron text-3xl font-black uppercase tracking-tight text-white md:text-4xl"
                      >
                        <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                          {feature.title}
                        </span>
                      </motion.h3>

                      <motion.p
                        custom={2}
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        className="mb-6 font-rajdhani text-base font-medium leading-relaxed text-gray-300 md:text-lg"
                      >
                        {feature.description}
                      </motion.p>

                      <motion.div
                        custom={3}
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        className="mb-6 grid gap-3 sm:grid-cols-2"
                      >
                        {feature.benefits.map((benefit, i) => (
                          <motion.div
                            key={i}
                            custom={i + 4}
                            variants={contentVariants}
                            initial="hidden"
                            animate="visible"
                            className="group relative overflow-hidden rounded-xl border border-purple-500/20 bg-gradient-to-br from-purple-900/20 to-transparent p-4 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/40 hover:from-purple-900/30"
                          >
                            {/* Glow effect on hover */}
                            <div className="absolute -right-10 -top-10 h-20 w-20 rounded-full bg-purple-500/20 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

                            <div className="relative flex items-start gap-3">
                              {/* Animated glow dot */}
                              <motion.div
                                animate={{
                                  scale: [1, 1.2, 1],
                                  opacity: [0.6, 1, 0.6],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                  delay: i * 0.2,
                                }}
                                className="relative mt-2 flex-shrink-0"
                              >
                                <div
                                  className={`h-2 w-2 rounded-full ${
                                    feature.id === "tabOne"
                                      ? "bg-blue-400"
                                      : feature.id === "tabTwo"
                                        ? "bg-amber-400"
                                        : "bg-emerald-400"
                                  }`}
                                />
                                {/* Outer glow ring */}
                                <div
                                  className={`absolute inset-0 -m-1 rounded-full opacity-50 blur-sm ${
                                    feature.id === "tabOne"
                                      ? "bg-blue-400"
                                      : feature.id === "tabTwo"
                                        ? "bg-amber-400"
                                        : "bg-emerald-400"
                                  }`}
                                />
                              </motion.div>

                              <span className="font-rajdhani text-[15px] font-medium leading-relaxed text-gray-200 md:text-base">
                                {benefit}
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>

                      {/* CTA button with hover effects */}
                      <motion.div
                        custom={8}
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        className="mt-8"
                      >
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`group relative overflow-hidden rounded-xl border-2 px-10 py-4 font-orbitron text-base font-black uppercase tracking-widest text-white shadow-2xl transition-all duration-300 md:text-lg
                          ${
                            feature.id === "tabOne"
                              ? "border-blue-400 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-600 shadow-blue-500/50 hover:shadow-blue-400/80"
                              : feature.id === "tabTwo"
                                ? "border-amber-400 bg-gradient-to-r from-amber-600 via-yellow-500 to-orange-600 shadow-amber-500/50 hover:shadow-amber-400/80"
                                : "border-emerald-400 bg-gradient-to-r from-emerald-600 via-green-500 to-teal-600 shadow-emerald-500/50 hover:shadow-emerald-400/80"
                          }`}
                        >
                          {/* Animated gradient overlay */}
                          <motion.div
                            animate={{
                              x: ["-100%", "100%"],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          />

                          {/* Corner accents */}
                          <div className="absolute left-1 top-1 h-2 w-2 border-l-2 border-t-2 border-white/80" />
                          <div className="absolute bottom-1 right-1 h-2 w-2 border-b-2 border-r-2 border-white/80" />

                          {/* Particle effects on hover */}
                          <span className="pointer-events-none absolute -left-10 -top-10 h-24 w-24 rounded-full bg-white/40 opacity-0 blur-xl duration-700 group-hover:scale-[5] group-hover:opacity-30"></span>
                          <span className="pointer-events-none absolute -bottom-10 -right-10 h-24 w-24 rounded-full bg-white/30 opacity-0 blur-xl delay-75 duration-700 group-hover:scale-[5] group-hover:opacity-30"></span>

                          {/* Glow effect */}
                          <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />

                          {/* Button text */}
                          <span className="relative z-10">
                            {feature.id === "tabOne"
                              ? "Sign Up Now"
                              : feature.id === "tabTwo"
                                ? "Start Playing"
                                : "View Rewards"}
                          </span>

                          {/* Pixel-style border animation */}
                          <motion.div
                            animate={{
                              opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                            className="absolute inset-0 rounded-xl border-2 border-white/30"
                          />
                        </motion.button>
                      </motion.div>
                    </div>
                  </motion.div>
                ),
            )}
          </AnimatePresence>
        </div>

        {/* Progress dots */}
        <div className="mt-12 flex justify-center gap-2">
          {gamingFeaturesData.map((feature) => (
            <button
              key={feature.id}
              onClick={() => setCurrentTab(feature.id)}
              className="focus:outline-none"
            >
              <motion.div
                animate={{
                  scale: currentTab === feature.id ? [1, 1.2, 1] : 1,
                  opacity: currentTab === feature.id ? 1 : 0.5,
                }}
                transition={{
                  duration: 0.5,
                  repeat: currentTab === feature.id ? Infinity : 0,
                  repeatType: "reverse",
                }}
                className={`h-3 w-3 rounded-full
                  ${
                    currentTab === feature.id
                      ? "bg-gradient-to-r from-purple-500 to-pink-500"
                      : "bg-gray-600"
                  }`}
              />
            </button>
          ))}
        </div>

        {/* Floating game elements */}
        <div className="absolute right-10 top-10 z-[1] h-20 w-20 opacity-20">
          <svg
            viewBox="0 0 24 24"
            className="animate-spin-slow h-full w-full text-purple-500"
          >
            <path
              fill="currentColor"
              d="M12,1A11,11 0 0,1 23,12A11,11 0 0,1 12,23A11,11 0 0,1 1,12A11,11 0 0,1 12,1M8.88,5.24L6,8.12L7.41,9.5L10.29,6.62L8.88,5.24M15.12,5.24L13.71,6.62L16.59,9.5L18,8.12L15.12,5.24M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M7.41,14.5L6,15.88L8.88,18.76L10.29,17.38L7.41,14.5M13.71,17.38L16.59,14.5L18,15.88L15.12,18.76L13.71,17.38Z"
            />
          </svg>
        </div>
        <div className="absolute bottom-20 left-10 z-[1] h-16 w-16 opacity-20">
          <svg
            viewBox="0 0 24 24"
            className="animate-float h-full w-full text-blue-500"
          >
            <path
              fill="currentColor"
              d="M7,6H17A6,6 0 0,1 23,12A6,6 0 0,1 17,18C15.22,18 13.63,17.23 12.53,16H11.47C10.37,17.23 8.78,18 7,18A6,6 0 0,1 1,12A6,6 0 0,1 7,6M6,9V11H4V13H6V15H8V13H10V11H8V9H6M15.5,12A1.5,1.5 0 0,0 14,13.5A1.5,1.5 0 0,0 15.5,15A1.5,1.5 0 0,0 17,13.5A1.5,1.5 0 0,0 15.5,12M18.5,9A1.5,1.5 0 0,0 17,10.5A1.5,1.5 0 0,0 18.5,12A1.5,1.5 0 0,0 20,10.5A1.5,1.5 0 0,0 18.5,9Z"
            />
          </svg>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(5deg);
          }
          100% {
            transform: translateY(0px) rotate(0deg);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.2;
          }
          50% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin 12s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
};

export default FeaturesTab;
