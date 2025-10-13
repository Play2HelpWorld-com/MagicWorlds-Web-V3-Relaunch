"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

// Define the FAQ item type
interface FAQItemProps {
  id: number;
  question: string;
  answer: string;
  icon: string;
  activeFaq: number;
  handleFaqToggle: (id: number) => void;
}

// Gaming-themed FAQ data with icons
const gamingFaqData = [
  {
    id: 1,
    question: "How do I level up my character?",
    answer:
      "To level up your character, complete main quests and side missions to earn XP. Each level unlocks new abilities and increases your stats. Remember to allocate skill points after each level up for maximum efficiency.",
    icon: "/images/icons/level-up.svg",
  },
  {
    id: 2,
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, PayPal, Apple Pay, Google Pay, and various cryptocurrency options including Bitcoin and Ethereum. All transactions are secured with industry-standard encryption.",
    icon: "/images/icons/treasure.svg",
  },
  {
    id: 3,
    question: "How do I join multiplayer matches?",
    answer:
      "Access the multiplayer hub from the main menu, then select 'Find Match' or 'Join Friends'. You can also create private lobbies by selecting 'Create Room' and sharing the generated code with friends.",
    icon: "/images/icons/multiplayer.svg",
  },
  {
    id: 4,
    question: "What are the system requirements?",
    answer:
      "Minimum: Windows 10, Intel Core i5-7500 / AMD Ryzen 3 1300X, 8GB RAM, NVIDIA GTX 1050Ti / AMD RX 560. Recommended: Windows 10/11, Intel Core i7-10700K / AMD Ryzen 7 3700X, 16GB RAM, NVIDIA RTX 3060 / AMD RX 6600 XT.",
    icon: "/images/icons/computer.svg",
  },
  {
    id: 5,
    question: "How do I report bugs or technical issues?",
    answer:
      "Use our in-game reporting tool (press ESC > Help > Report Bug) or visit our support portal at support.example.com. Please include detailed steps to reproduce the issue and any error messages you received.",
    icon: "/images/icons/bug.svg",
  },
];

// Enhanced FAQItem with gaming aesthetics and animations
const GamingFAQItem = ({
  id,
  question,
  answer,
  icon,
  activeFaq,
  handleFaqToggle,
}: FAQItemProps) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  // Variants for item container
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: id * 0.1,
      },
    },
  };

  // Variants for question
  const questionVariants = {
    closed: { color: "#ffffff" },
    open: { color: "#00ff99" },
  };

  // Variants for answer
  const answerVariants = {
    closed: { height: 0, opacity: 0 },
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        height: {
          duration: 0.4,
        },
        opacity: {
          duration: 0.25,
          delay: 0.15,
        },
      },
    },
  };

  // Icon animations
  const iconVariants = {
    closed: { rotate: 0 },
    open: { rotate: 180, color: "#00ff99" },
  };

  const isActive = activeFaq === id;

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="faq-item border-b border-stroke last:border-0 dark:border-strokedark"
    >
      <motion.button
        onClick={() => handleFaqToggle(id)}
        className="faq-button hover:bg-gamingHover flex w-full items-center justify-between px-6 py-5 text-left text-base font-medium text-white transition-all duration-200 hover:bg-opacity-20"
        whileHover={{ scale: 1.01, backgroundColor: "rgba(0,255,153,0.05)" }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex items-center gap-3">
          <motion.div
            className="icon-wrapper bg-gaming flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full"
            initial={{ backgroundColor: "#333344" }}
            animate={{
              backgroundColor: isActive ? "#00ff99" : "#333344",
              boxShadow: isActive ? "0 0 12px rgba(0,255,153,0.7)" : "none",
            }}
          >
            <Image
              src={icon}
              width={20}
              height={20}
              alt="FAQ Icon"
              className="text-white"
            />
          </motion.div>
          <motion.span
            variants={questionVariants}
            initial="closed"
            animate={isActive ? "open" : "closed"}
            className="text-lg md:text-xl"
          >
            {question}
          </motion.span>
        </div>
        <motion.div
          variants={iconVariants}
          initial="closed"
          animate={isActive ? "open" : "closed"}
          transition={{ duration: 0.3 }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            className="fill-current"
          >
            <path d="M10 13.333L5 8.33301H15L10 13.333Z" />
          </svg>
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isActive && (
          <motion.div
            variants={answerVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="answer-container overflow-hidden"
          >
            <div className="px-6 pb-5 pl-[4.4rem]">
              <motion.p
                className="text-body-color dark:text-body-color-dark text-base leading-relaxed"
                initial={{ y: 10 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.25, delay: 0.1 }}
              >
                {answer}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  const [activeFaq, setActiveFaq] = useState(0);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const handleFaqToggle = (id: number) => {
    activeFaq === id ? setActiveFaq(0) : setActiveFaq(id);
  };

  // Add a particle effect
  useEffect(() => {
    // This would be where you'd initialize a particle effect library
    // For example, using particles.js or a custom solution
    console.log("Initialize particle effects");

    return () => {
      // Cleanup function
      console.log("Cleanup particle effects");
    };
  }, []);

  return (
    <section className="gaming-faq relative overflow-hidden py-20 lg:py-25 xl:py-30">
      {/* Background Effects */}
      <div className="absolute left-0 top-0 -z-10 h-full w-full overflow-hidden">
        <div className="from-gamingDark to-gamingDarker absolute left-0 top-0 h-full w-full bg-gradient-to-br"></div>
        <div
          className="absolute left-0 top-0 h-full w-full opacity-10"
          id="particles-container"
        ></div>
        <div className="bg-gaming absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-5 blur-3xl"></div>
      </div>

      {/* Decorative Gaming Elements */}
      <div className="absolute right-10 top-10 animate-pulse opacity-20">
        <Image
          src="/images/gaming/controller.svg"
          width={80}
          height={80}
          alt="Controller"
        />
      </div>
      <div
        className="absolute bottom-10 left-10 animate-pulse opacity-20"
        style={{ animationDelay: "1s" }}
      >
        <Image
          src="/images/gaming/keyboard.svg"
          width={80}
          height={80}
          alt="Keyboard"
        />
      </div>

      <div className="relative mx-auto max-w-c-1235 px-4 md:px-8 xl:px-0">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 xl:gap-20">
          {/* Left Column - Title Section */}
          <motion.div
            ref={ref}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <div className="relative mb-6 inline-block">
              <motion.span
                className="pixel-font text-gaming bg-gamingAccent border-gaming rounded-md border bg-opacity-10 px-4 py-2 text-sm font-bold uppercase tracking-wide md:text-base"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                PLAYER SUPPORT
              </motion.span>
              <motion.div
                className="border-gaming absolute -bottom-1 -right-1 h-full w-full rounded-md border opacity-75"
                animate={{
                  x: [0, 5, 0],
                  y: [0, 5, 0],
                  opacity: [0.75, 0.5, 0.75],
                }}
                transition={{
                  duration: 4,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              ></motion.div>
            </div>

            <motion.h2
              className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <span className="block">Frequently</span>
              <span className="relative">
                Asked
                <motion.span
                  className="bg-gaming absolute -bottom-2 left-0 h-1"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1, duration: 0.8 }}
                ></motion.span>
              </span>
              <span className="text-gaming relative inline-block">
                Questions
                <motion.div
                  className="bg-gaming absolute -inset-1 rounded-full opacity-20 blur-lg"
                  animate={{
                    opacity: [0.2, 0.4, 0.2],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                ></motion.div>
              </span>
            </motion.h2>

            <motion.p
              className="mx-auto mb-8 max-w-lg text-lg text-gray-300 lg:mx-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Level up your knowledge with our comprehensive FAQs. Can&apos;t
              find what you&apos;re looking for? Our support team is ready to
              assist.
            </motion.p>

            <motion.a
              href="#contact"
              className="bg-gaming hover:bg-gamingHover group relative inline-flex items-center gap-2.5 overflow-hidden rounded-md px-6 py-3 text-white transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">CONTACT SUPPORT</span>
              <motion.div
                className="from-gaming to-gamingHover absolute inset-0 -z-1 bg-gradient-to-r"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              ></motion.div>
              <motion.svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                className="fill-white"
                animate={{ x: [0, 5, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <path d="M14.9668 8.8143L8.58119 2.42871L10.1644 0.845459L19.3191 10.0002L10.1644 19.1549L8.58119 17.5716L14.9668 11.1861H0.619141V8.8143H14.9668Z" />
              </motion.svg>
            </motion.a>
          </motion.div>

          {/* Right Column - FAQ Items */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            {/* Glowing border effect */}
            <motion.div
              className="from-gaming/50 to-gamingAccent/50 absolute -inset-1 rounded-2xl bg-gradient-to-r opacity-30 blur-lg"
              animate={{
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            ></motion.div>

            <div className="bg-gamingCard relative overflow-hidden rounded-xl border border-gray-700 shadow-2xl backdrop-blur-sm">
              {/* Header decoration */}
              <div className="from-gamingDark to-gaming/20 flex items-center justify-between border-b border-gray-700 bg-gradient-to-r px-5 py-3">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-xs uppercase tracking-wider text-gray-400">
                  Player Knowledge Base v3.4.2
                </div>
              </div>

              {/* FAQ Items */}
              <div className="divide-y divide-gray-700">
                {gamingFaqData.map((faq, key) => (
                  <GamingFAQItem
                    key={key}
                    id={faq.id}
                    question={faq.question}
                    answer={faq.answer}
                    icon={faq.icon}
                    activeFaq={activeFaq}
                    handleFaqToggle={handleFaqToggle}
                  />
                ))}
              </div>

              {/* Footer decoration */}
              <motion.div
                className="from-gamingDark to-gaming/20 flex items-center justify-center border-t border-gray-700 bg-gradient-to-r px-5 py-2"
                animate={{
                  background: [
                    "linear-gradient(to right, #111122, rgba(0,255,153,0.1))",
                    "linear-gradient(to right, #111122, rgba(0,255,153,0.2))",
                    "linear-gradient(to right, #111122, rgba(0,255,153,0.1))",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <div className="text-xs text-gray-400">
                  Press [E] to expand all questions
                </div>
              </motion.div>
            </div>

            {/* Decorative elements */}
            <motion.div
              className="bg-gaming absolute -right-5 -top-5 h-20 w-20 rounded-full opacity-10 blur-xl"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            ></motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
