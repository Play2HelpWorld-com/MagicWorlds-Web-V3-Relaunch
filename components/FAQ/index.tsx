"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import gamingFaqData from "./faqData";

// Custom FAQItem component with gaming animations
const FAQItem = ({ faq, isActive, toggleFaq }) => {
  const { id, question, answer } = faq;

  // Animation variants
  const itemVariants = {
    closed: {
      backgroundColor: "rgba(30, 41, 59, 0.6)",
      borderColor: "rgba(71, 85, 105, 0.3)",
    },
    open: {
      backgroundColor: "rgba(30, 41, 59, 0.8)",
      borderColor: "rgba(14, 165, 233, 0.7)",
    },
  };

  const contentVariants = {
    closed: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.3, ease: [0.33, 1, 0.68, 1] },
    },
    open: {
      height: "auto",
      opacity: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const iconVariants = {
    closed: { rotate: 0, scale: 1, color: "rgb(148, 163, 184)" },
    open: { rotate: 45, scale: 1.2, color: "rgb(56, 189, 248)" },
  };

  return (
    <motion.div
      className={`group relative mb-4 overflow-hidden rounded-xl border-2 backdrop-blur-sm ${
        isActive ? "shadow-neon-blue" : "shadow-lg"
      }`}
      variants={itemVariants}
      animate={isActive ? "open" : "closed"}
      initial="closed"
      transition={{ duration: 0.3 }}
    >
      {/* Question Button */}
      <button
        className="flex w-full items-center justify-between px-5 py-4 text-left"
        onClick={() => toggleFaq(id)}
      >
        <div className="flex items-center gap-3">
          <motion.div
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image
              src="/images/icon/play.png"
              width={20}
              height={20}
              alt="Controller Icon"
            />
          </motion.div>
          <h4 className="text-lg font-semibold text-slate-50">{question}</h4>
        </div>

        {/* Plus/Minus Icon */}
        <motion.div
          className="text-2xl"
          variants={iconVariants}
          animate={isActive ? "open" : "closed"}
        >
          +
        </motion.div>
      </button>

      {/* Answer Content with Game-style typing animation */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            variants={contentVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="px-5 pb-5"
          >
            <div className="relative rounded-lg bg-slate-900/60 p-4">
              <TypewriterText text={answer} />

              {/* Decorative elements */}
              <motion.div
                className="absolute -right-2 -top-2 h-12 w-12 opacity-30"
                animate={{
                  rotate: [0, 360],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Image
                  src="/images/icon/watch.png"
                  width={48}
                  height={48}
                  alt="Gear"
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Glowing border effect when active */}
      {isActive && (
        <motion.div
          className="absolute inset-0 -z-10 rounded-xl opacity-40"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.2, 0.4, 0.2],
            boxShadow: [
              "0 0 5px 1px rgba(56, 189, 248, 0.3)",
              "0 0 10px 2px rgba(56, 189, 248, 0.5)",
              "0 0 5px 1px rgba(56, 189, 248, 0.3)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
    </motion.div>
  );
};

// Typewriter effect component
const TypewriterText = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 15); // Speed of typing

      return () => clearTimeout(timer);
    }
  }, [currentIndex, text]);

  useEffect(() => {
    // Reset when text changes
    setDisplayedText("");
    setCurrentIndex(0);
  }, [text]);

  return (
    <div className="text-slate-300">
      {displayedText}
      {currentIndex < text.length && (
        <motion.span
          className="ml-1 inline-block h-4 w-2 bg-sky-400"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      )}
    </div>
  );
};

// Main FAQ Component
const FAQ = () => {
  const [activeFaq, setActiveFaq] = useState(0);
  const { theme } = useTheme();

  const handleFaqToggle = (id) => {
    activeFaq === id ? setActiveFaq(0) : setActiveFaq(id);
  };

  // Background particle effect
  const ParticleBackground = () => {
    return (
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {[...Array(20)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute h-2 w-2 rounded-full bg-sky-500/30"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              opacity: Math.random() * 0.5 + 0.1,
            }}
            animate={{
              y: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
              x: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
              opacity: [
                Math.random() * 0.5 + 0.1,
                Math.random() * 0.3,
                Math.random() * 0.5 + 0.1,
              ],
            }}
            transition={{
              duration: 15 + Math.random() * 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      {/* Animated background */}
      <ParticleBackground />

      {/* Grid pattern overlay */}
      <div className="-z-5 absolute inset-0 opacity-10">
        <div className="bg-grid-pattern h-full w-full bg-repeat" />
      </div>

      <div className="container relative mx-auto px-4 md:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Heading Section with Gaming Theme */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col justify-center"
          >
            <div className="mb-6 flex items-center">
              <motion.div
                className="mr-4 flex h-10 w-10 items-center justify-center rounded bg-gradient-to-br from-indigo-500 to-purple-600"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src="/images/icon/collect.png"
                  width={24}
                  height={24}
                  alt="Gaming Headset"
                />
              </motion.div>
              <h6 className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-base font-bold uppercase tracking-widest text-transparent">
                PLAYER SUPPORT
              </h6>
            </div>

            <h2 className="mb-6 text-4xl font-bold leading-tight text-slate-50 lg:text-5xl">
              Frequently Asked{" "}
              <motion.span
                className="relative inline-flex"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <span className="relative z-10">Questions</span>
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 z-0 h-3 rounded-sm bg-gradient-to-r from-sky-500/70 to-indigo-500/70"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
                />
              </motion.span>
            </h2>

            <p className="mb-8 max-w-md text-lg text-slate-300">
              Level up your knowledge with our most commonly asked questions.
              Can&apos;t find what you&apos;re looking for? Our support team is ready to
              assist.
            </p>

            <motion.a
              href="https://discord.com/invite/NcNSaTVNdn"
              className="group relative inline-flex max-w-fit items-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 font-medium text-white"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="z-10">Join Discord Support</span>
              <motion.span
                className="absolute left-0 top-0 -z-10 h-full w-full opacity-0 backdrop-blur-sm"
                whileHover={{ opacity: 0.15 }}
              />
              <motion.div
                className="-z-5 absolute -right-2 h-16 w-16 translate-x-full transform rounded-full bg-white opacity-30"
                initial={{ x: "100%" }}
                whileHover={{
                  x: "-100%",
                  transition: { duration: 0.6, ease: "easeOut" },
                }}
              />
              <svg
                className="h-5 w-5 transform transition-transform duration-300 ease-out group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </motion.a>

            {/* Decorative game elements */}
            <motion.div
              className="absolute -bottom-8 -left-16 -z-1 h-64 w-64 rounded-full bg-gradient-to-r from-indigo-600/20 to-purple-600/20 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* FAQ Items Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            {/* Terminal-like container */}
            <div className="relative overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/70 backdrop-blur-sm">
              {/* Terminal header */}
              <div className="flex items-center border-b border-slate-700 bg-slate-800/80 px-4 py-3">
                <div className="mr-2 h-3 w-3 rounded-full bg-red-500" />
                <div className="mr-2 h-3 w-3 rounded-full bg-yellow-500" />
                <div className="mr-4 h-3 w-3 rounded-full bg-green-500" />
                <div className="text-sm font-medium text-slate-300">
                  Player Support Console
                </div>
              </div>

              <div className="p-4 md:p-6">
                {/* FAQ Items */}
                <AnimatePresence mode="wait">
                  {gamingFaqData.map((faq) => (
                    <FAQItem
                      key={faq.id}
                      faq={faq}
                      isActive={activeFaq === faq.id}
                      toggleFaq={handleFaqToggle}
                    />
                  ))}
                </AnimatePresence>
              </div>

              {/* Terminal footer with blinking cursor */}
              <div className="border-t border-slate-700 bg-slate-800/80 px-4 py-3">
                <div className="flex items-center text-sm text-slate-400">
                  <span>magicworldsonline2025@gmail.com:~$</span>
                  <motion.span
                    className="ml-1 h-4 w-2 bg-slate-400"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <motion.div
              className="absolute -right-12 -top-12 -z-10 h-40 w-40"
              animate={{
                rotate: 360,
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Image
                src="/images/icon/vr.png"
                width={160}
                height={160}
                alt="Circuit Pattern"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
