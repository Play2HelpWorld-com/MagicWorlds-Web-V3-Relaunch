"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ClaimButton from "../ClaimToken/claim-button";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoverGlow, setHoverGlow] = useState(false);
  const particlesRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setIsLoaded(true);

    // Particle animation setup
    const canvas = particlesRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const particleCount = 100;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor() {
        if (!canvas) {
          this.x = 0;
          this.y = 0;
        } else {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
        }
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = `rgba(${Math.random() * 80 + 100}, ${Math.random() * 50 + 50}, ${Math.random() * 80 + 175}, ${Math.random() * 0.4 + 0.3})`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.size > 0.2) this.size -= 0.01;

        if (canvas) {
          if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
          if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;
        }
      }

      draw() {
        if (ctx) {
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    const initParticles = () => {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animateParticles = () => {
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Connect particles with lines if they're close enough
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            if (ctx) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(139, 92, 246, ${0.5 - distance / 100})`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }

        // Replace particles when they get too small
        if (particles[i].size <= 0.2) {
          particles.splice(i, 1);
          particles.push(new Particle());
        }
      }

      requestAnimationFrame(animateParticles);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    initParticles();
    animateParticles();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Crypto tokens data for the showcase - PLAY, EARN, DONATE
  const cryptoTokens = [
    {
      id: 1,
      motto: "PLAY",
      name: "PLAY TO WIN",
      symbol: "PLAY",
      value: "1,234.56",
      change: "+12.5%",
      image: "/images/hero/character1.png",
      color: "from-purple-600 to-fuchsia-600",
      glowColor: "rgba(66,165,255,0.6)",
    },
    {
      id: 2,
      motto: "EARN",
      name: "EARN REWARDS",
      symbol: "EARN",
      value: "789.12",
      change: "+8.3%",
      image: "/images/hero/character2.png",
      color: "from-fuchsia-600 to-purple-700",
      glowColor: "rgba(52,211,153,0.6)",
    },
    {
      id: 3,
      motto: "DONATE",
      name: "DONATE TO CHARITY",
      symbol: "DONATE",
      value: "456.78",
      change: "+15.7%",
      image: "/images/hero/character3.png",
      color: "from-purple-700 to-fuchsia-700",
      glowColor: "rgba(239,68,68,0.6)",
    },
  ];

  const [activeToken, setActiveToken] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveToken((prev) => (prev + 1) % cryptoTokens.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [cryptoTokens.length]);

  return (
    <section className="relative h-full w-full overflow-hidden bg-transparent pb-12 pt-16 sm:pt-20 md:pt-24 lg:min-h-[800px] lg:pt-32">
      {/* Animated background particles */}
      <canvas ref={particlesRef} className="absolute inset-0 z-0 opacity-40" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 md:py-16 lg:px-8 lg:py-20">
        <div className="grid items-center gap-8 md:gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left column: Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="items-center text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-gradient-to-r from-purple-500/10 via-fuchsia-500/10 to-purple-500/10 px-6 py-2.5 backdrop-blur-sm"
            >
              <div className="h-2 w-2 animate-pulse rounded-full bg-purple-500"></div>
              <span className="font-rajdhani text-sm font-bold uppercase tracking-widest text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)] sm:text-base lg:text-base">
                A NEW JOURNEY
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="font-orbitron mt-4 whitespace-nowrap text-3xl font-black uppercase leading-[1.1] tracking-tighter sm:mt-5 sm:text-4xl md:text-5xl lg:text-6xl"
            >
              <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(168,85,247,0.9)]">
                MAGIC
              </span>
              &nbsp;
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(59,130,246,0.9)]">
                WORLDS
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="font-rajdhani mx-auto mt-5 max-w-xl text-base font-medium leading-relaxed text-gray-400 sm:mt-6 sm:text-lg md:text-xl lg:text-lg"
            >
              <span className="text-gray-300">Magic Worlds</span> – Love, Laugh,
              Learn, Lucrative.
              <span className="mt-1 block">
                Welcome to a <span className="text-purple-400">free</span>,{" "}
                <span className="text-fuchsia-400">family-friendly</span>, and{" "}
                <span className="text-blue-400">open-source</span> universe
                where you shape your adventures.
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="mt-8 flex flex-col flex-wrap items-center justify-center gap-4 sm:mt-10 sm:flex-row sm:gap-5 md:mt-12 lg:justify-start"
            >
              <ClaimButton />

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="font-rajdhani rounded-2xl border-2 border-purple-600/50 bg-gradient-to-r from-purple-900/40 to-fuchsia-900/30 px-8 py-4 text-base font-bold uppercase tracking-wider text-purple-200 backdrop-blur-md transition-all duration-300 hover:border-fuchsia-500 hover:from-purple-800/50 hover:to-fuchsia-800/40 hover:text-white hover:shadow-[0_0_40px_rgba(168,85,247,0.7)] sm:px-10 sm:text-lg"
              >
                EXPLORE WORLDS
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="font-rajdhani mt-8 hidden items-center justify-center space-x-3 text-sm font-medium text-gray-500 sm:mt-10 sm:flex md:text-base lg:justify-start"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-8 overflow-hidden rounded-full border-2 border-purple-800/90 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                  >
                    <Image
                      src={`/images/user/user-0${i}.png`}
                      alt={`User ${i}`}
                      width={32}
                      height={32}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <span>100+ users have engaged today</span>
            </motion.div>
          </motion.div>

          {/* Right column: Game visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative mt-8 sm:mt-10 lg:mt-0"
          >
            {/* Hexagon frame */}
            <div className="animate-slow-spin absolute inset-0 z-0">
              <svg viewBox="0 0 400 400" className="h-full w-full">
                <polygon
                  points="200,10 380,120 380,280 200,390 20,280 20,120"
                  fill="none"
                  stroke="url(#hexGradient)"
                  strokeWidth="2"
                  className="animate-pulse-opacity"
                />
                <defs>
                  <linearGradient
                    id="hexGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#7C3AED" />
                    <stop offset="50%" stopColor="#D946EF" />
                    <stop offset="100%" stopColor="#A855F7" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Energy lines */}
            <div className="absolute inset-0 z-0">
              <svg viewBox="0 0 400 400" className="h-full w-full">
                <circle
                  cx="200"
                  cy="200"
                  r="150"
                  fill="none"
                  stroke="rgba(168, 85, 247, 0.3)"
                  strokeWidth="1"
                  className="animate-pulse-slow"
                />
                <circle
                  cx="200"
                  cy="200"
                  r="120"
                  fill="none"
                  stroke="rgba(217, 70, 239, 0.3)"
                  strokeWidth="1"
                  className="animate-pulse-slow animation-delay-500"
                />
                <circle
                  cx="200"
                  cy="200"
                  r="90"
                  fill="none"
                  stroke="rgba(168, 85, 247, 0.3)"
                  strokeWidth="1"
                  className="animate-pulse-slow animation-delay-1000"
                />
              </svg>
            </div>

            {/* 3D Rotating Crypto Token Display */}
            <div className="relative flex h-80 w-full items-center justify-center sm:h-96 md:h-[450px] lg:h-96">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeToken}
                  initial={{ opacity: 0, rotateY: -180, scale: 0.5 }}
                  animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                  exit={{ opacity: 0, rotateY: 180, scale: 0.5 }}
                  transition={{ duration: 1, ease: [0.86, 0, 0.07, 1] }}
                  className="relative h-full w-full"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative h-[300px] w-[300px] sm:h-[340px] sm:w-[340px] md:h-[400px] md:w-[400px] lg:h-[360px] lg:w-[360px]">
                      {/* Outer holographic ring */}
                      {/* <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute inset-0 rounded-full border-2 border-dashed border-purple-700/40"
                        style={{
                          boxShadow: `0 0 40px ${cryptoTokens[activeToken].glowColor}`,
                        }}
                      /> */}

                      {/* Middle holographic ring */}
                      {/* <motion.div
                        animate={{ rotate: -360 }}
                        transition={{
                          duration: 15,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute inset-4 rounded-full border border-dashed border-fuchsia-600/30"
                        style={{
                          boxShadow: `0 0 30px ${cryptoTokens[activeToken].glowColor}`,
                        }}
                      /> */}

                      {/* Main token container */}
                      <motion.div
                        animate={{
                          rotateY: [0, 15, -15, 0],
                          rotateX: [0, -10, 10, 0],
                        }}
                        transition={{
                          duration: 6,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute inset-8 flex items-center justify-center"
                      >
                        <div
                          className={`border-1 relative h-full w-full rounded-3xl border-purple-800/60 bg-gradient-to-br ${cryptoTokens[activeToken].color} p-1 shadow-2xl`}
                          style={{
                            boxShadow: `0 0 60px ${cryptoTokens[activeToken].glowColor}, inset 0 0 40px rgba(0,0,0,0.5)`,
                          }}
                        >
                          {/* Inner card with glassmorphism */}
                          <div className="flex h-full w-full flex-col justify-between rounded-2xl border border-purple-700/40 bg-[#0a0015]/90 p-5 backdrop-blur-2xl sm:p-6 md:p-7 lg:p-6">
                            {/* Character Image */}
                            <div className="flex justify-center">
                              <motion.div
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                }}
                                className="relative h-32 w-32 overflow-hidden rounded-2xl border-2 border-purple-600/50 bg-gradient-to-br from-purple-900/80 to-fuchsia-900/80 shadow-[0_0_30px_rgba(168,85,247,0.6)] sm:h-36 sm:w-36 md:h-40 md:w-40 lg:h-36 lg:w-36"
                              >
                                <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0a0015]/80 via-transparent to-transparent" />
                                <Image
                                  src={cryptoTokens[activeToken].image}
                                  alt={cryptoTokens[activeToken].motto}
                                  fill
                                  className="object-cover"
                                  priority
                                />
                              </motion.div>
                            </div>

                            {/* Token motto - PLAY/EARN/DONATE */}
                            <div className="text-center">
                              <motion.div
                                className="font-orbitron mb-1.5 bg-gradient-to-r from-purple-300 via-fuchsia-300 to-purple-300 bg-clip-text text-3xl font-black uppercase tracking-tight text-transparent drop-shadow-[0_0_20px_rgba(168,85,247,0.9)] sm:text-4xl md:text-5xl lg:text-4xl"
                                animate={{ scale: [1, 1.02, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              >
                                {cryptoTokens[activeToken].motto}
                              </motion.div>
                              <div className="font-rajdhani text-xs font-semibold uppercase tracking-wider text-purple-400/70 sm:text-sm">
                                {cryptoTokens[activeToken].name}
                              </div>
                            </div>

                            {/* Blockchain-style connection lines */}
                            <div className="flex items-center justify-between px-1">
                              <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-600 to-transparent shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                              <motion.div
                                animate={{ scale: [1, 1.3, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="mx-2 h-2 w-2 rounded-full bg-fuchsia-500 shadow-[0_0_15px_rgba(217,70,239,0.9)]"
                              />
                              <div className="h-px w-full bg-gradient-to-r from-transparent via-fuchsia-600 to-transparent shadow-[0_0_8px_rgba(217,70,239,0.6)]" />
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      {/* Token action button - Outside card */}
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="font-rajdhani absolute -bottom-6 left-1/2 w-[180px] -translate-x-1/2 rounded-xl border border-purple-700/50 bg-gradient-to-r from-purple-800 via-fuchsia-800 to-purple-900 py-3 text-sm font-bold uppercase tracking-wider text-purple-100 shadow-lg shadow-purple-950/70 transition-all duration-300 hover:from-purple-700 hover:via-fuchsia-700 hover:to-purple-800 hover:shadow-purple-900/90 sm:-bottom-8 sm:w-[180px] sm:py-3.5 sm:text-base md:-bottom-10 md:w-[180px] md:py-4 md:text-base lg:-bottom-8 lg:w-[180px] lg:py-3 lg:text-sm"
                        style={{
                          boxShadow: `0 0 20px ${cryptoTokens[activeToken].glowColor}`,
                        }}
                      >
                        {cryptoTokens[activeToken].motto} NOW
                      </motion.button>

                      {/* Floating particles around token */}
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{
                            y: [0, -20, 0],
                            x: [0, Math.sin((i * 45 * Math.PI) / 180) * 10, 0],
                            opacity: [0.3, 0.8, 0.3],
                          }}
                          transition={{
                            duration: 3 + i * 0.2,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                          className="absolute h-2 w-2 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]"
                          style={{
                            top: `${50 + 40 * Math.sin((i * 45 * Math.PI) / 180)}%`,
                            left: `${50 + 40 * Math.cos((i * 45 * Math.PI) / 180)}%`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Token selection dots */}
              {/* <div className="absolute -bottom-2 left-1/2 flex -translate-x-1/2 space-x-3 sm:bottom-0">
                {cryptoTokens.map((token, index) => (
                  <button
                    key={token.id}
                    onClick={() => setActiveToken(index)}
                    className={`h-3 w-3 rounded-full transition-all duration-300 ${activeToken === index ? "scale-125 bg-gradient-to-r from-purple-500 to-fuchsia-500 shadow-[0_0_12px_rgba(168,85,247,0.9)]" : "bg-purple-900/70 shadow-[0_0_5px_rgba(168,85,247,0.4)] hover:bg-purple-700/80"}`}
                  />
                ))}
              </div> */}
            </div>

            {/* Floating game elements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="absolute -bottom-6 -right-6 hidden h-12 w-12 sm:-right-10 sm:block sm:h-16 sm:w-16"
            >
              <Image
                src="/images/items/coin.png"
                alt="Game coin"
                width={64}
                height={64}
                className="animate-slow-spin"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 0.3,
              }}
              className="absolute -left-4 top-10 hidden h-10 w-10 sm:-left-8 sm:block sm:h-12 sm:w-12"
            >
              <Image
                src="/images/items/gem.png"
                alt="Game gem"
                width={48}
                height={48}
                className="animate-pulse-slow"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 0.7,
              }}
              className="absolute -top-4 right-12 hidden h-12 w-12 sm:right-20 sm:block sm:h-14 sm:w-14"
            >
              <Image
                src="/images/items/potion.png"
                alt="Game potion"
                width={56}
                height={56}
                className="animate-float"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Floating achievements */}
        {/* <motion.div
          initial={{ opacity: 0, x: 100, y: 50 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute bottom-10 right-10 z-20 hidden lg:block"
        >
          <div className="rounded-lg bg-black/40 px-4 py-2 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <div className="rounded-full bg-green-500 p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-300">Achievement Unlocked</p>
                <p className="text-white">First Victory</p>
              </div>
            </div>
          </div>
        </motion.div> */}

        {/* Stats floating card */}
        {/* <motion.div
          initial={{ opacity: 0, x: -100, y: 50 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="absolute bottom-4 left-10 z-20 hidden lg:block"
        >
          <div className="rounded-lg bg-black/40 px-4 py-2 backdrop-blur-sm">
            <p className="text-sm text-gray-300">Global Players</p>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-white">1.2M+</span>
              <span className="rounded-full bg-green-500 px-2 py-1 text-xs text-white">
                +24%
              </span>
            </div>
          </div>
        </motion.div> */}
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes slow-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.6;
          }
          50% {
            opacity: 0.3;
          }
        }

        @keyframes pulse-opacity {
          0%,
          100% {
            opacity: 0.8;
          }
          50% {
            opacity: 0.3;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animation-delay-500 {
          animation-delay: 0.5s;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .animate-slow-spin {
          animation: slow-spin 20s linear infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .animate-pulse-opacity {
          animation: pulse-opacity 3s ease-in-out infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .text-neon-blue {
          color: #a855f7;
          text-shadow:
            0 0 15px rgba(168, 85, 247, 1),
            0 0 30px rgba(168, 85, 247, 0.8),
            0 0 45px rgba(168, 85, 247, 0.6);
        }

        .drop-shadow-glow {
          filter: drop-shadow(0 0 20px rgba(168, 85, 247, 0.9));
        }
      `}</style>
    </section>
  );
};

export default Hero;
