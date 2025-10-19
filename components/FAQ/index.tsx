"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Plus,
  Minus,
  Zap,
  Shield,
  Trophy,
  Users,
  Gamepad2,
  Sparkles,
} from "lucide-react";

// FAQ data
const faqData = [
  {
    id: 1,
    icon: Gamepad2,
    category: "Getting Started",
    question: "What is Magic Worlds and how do I start playing?",
    answer:
      "Magic Worlds is a revolutionary cross-platform gaming universe where you can explore diverse realms, complete quests, and earn real rewards. To start: 1) Create your free account, 2) Choose your starting realm, 3) Customize your character, 4) Begin your adventure! Download available for Windows, macOS, Android, and Cloud streaming.",
  },
  {
    id: 2,
    icon: Trophy,
    category: "Rewards & Tokens",
    question: "How do I earn tokens and what can I do with them?",
    answer:
      "Earn $MAGIC tokens by completing quests, winning battles, discovering secrets, and participating in events. Use tokens to: unlock exclusive content, purchase premium items, trade on exchanges, stake for rewards, or convert to real-world value. The more you play, the more you earn!",
  },
  {
    id: 3,
    icon: Shield,
    category: "Account & Security",
    question: "Is my account and data secure?",
    answer:
      "Absolutely! We use military-grade encryption, secure cloud storage, and regular security audits. Your progress syncs across all devices with end-to-end encryption. We never sell your data, and you have full control over your privacy settings. Two-factor authentication (2FA) is available for extra protection.",
  },
  {
    id: 4,
    icon: Users,
    category: "Multiplayer & Social",
    question: "Can I play with friends on different devices?",
    answer:
      "Yes! Magic Worlds features full cross-platform play. Whether you're on PC, Mac, Android, iOS, VR, or Cloud, you can team up with friends anywhere. Create guilds, join raids, compete in tournaments, and communicate via voice or text chat. Your social features sync seamlessly across all platforms.",
  },
  {
    id: 5,
    icon: Sparkles,
    category: "Premium Features",
    question: "What's included in the Premium membership?",
    answer:
      "Premium unlocks: 2x token earning rate, exclusive realms and quests, premium cosmetics and skins, priority matchmaking, ad-free experience, early access to new content, monthly bonus tokens, and special events. Available at $9.99/month or save 20% with annual subscription.",
  },
  {
    id: 6,
    icon: Zap,
    category: "Technical Support",
    question: "What are the system requirements?",
    answer:
      "Windows/Mac: 8GB RAM, DirectX 11/Metal compatible GPU, 20GB storage. Android: Version 8.0+, 4GB RAM. iOS: iPhone 8 or newer, iPad 5th gen+. Cloud: Any device with stable internet (10Mbps+). VR: Compatible with Quest 2/3, PSVR2, and PC VR headsets. Minimum 60 FPS gameplay on all supported platforms.",
  },
];

// FAQ Item Component
const FAQItem = ({ faq, isActive, toggleFaq }) => {
  const { id, icon: Icon, category, question, answer } = faq;

  return (
    <motion.div
      className="group relative mb-4 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Glow effect on hover */}
      <motion.div
        className={`absolute -inset-0.5 -z-10 rounded-xl bg-gradient-to-r from-cyan-500/50 via-purple-500/50 to-pink-500/50 opacity-0 blur transition-opacity duration-500 ${
          isActive ? "opacity-100" : "group-hover:opacity-70"
        }`}
      />

      {/* Question Button */}
      <button
        onClick={() => toggleFaq(id)}
        className="w-full px-6 py-5 text-left transition-all duration-300"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-1 items-start gap-4">
            {/* Icon */}
            <motion.div
              className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${
                isActive
                  ? "from-cyan-500 to-blue-500"
                  : "from-gray-700 to-gray-800"
              } transition-all duration-300`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className="h-5 w-5 text-white" />
            </motion.div>

            {/* Question Content */}
            <div className="flex-1">
              {/* Category Badge */}
              <motion.span
                className={`mb-2 inline-block rounded-full px-3 py-1 font-orbitron text-xs font-bold uppercase tracking-wider ${
                  isActive
                    ? "bg-cyan-500/20 text-cyan-400"
                    : "bg-gray-700/50 text-gray-400"
                } transition-all duration-300`}
              >
                {category}
              </motion.span>

              {/* Question */}
              <h3
                className={`font-rajdhani text-lg font-bold transition-colors duration-300 ${
                  isActive ? "text-white" : "text-gray-300"
                }`}
              >
                {question}
              </h3>
            </div>
          </div>

          {/* Toggle Icon */}
          <motion.div
            className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg transition-colors duration-300 ${
              isActive ? "bg-cyan-500 text-white" : "bg-gray-800 text-gray-400"
            }`}
            animate={{ rotate: isActive ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isActive ? (
              <Minus className="h-5 w-5" />
            ) : (
              <Plus className="h-5 w-5" />
            )}
          </motion.div>
        </div>
      </button>

      {/* Answer Content */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/10 px-6 pb-6 pt-4">
              <div className="ml-14">
                <p className="font-rajdhani text-base leading-relaxed text-gray-400">
                  {answer}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"
        initial={{ width: 0 }}
        animate={{ width: isActive ? "100%" : "0%" }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
};

// Main FAQ Component
const FAQ = () => {
  const [activeId, setActiveId] = useState<number | null>(1);

  const toggleFaq = (id: number) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section className="relative overflow-hidden bg-transparent py-20 lg:py-32">
      {/* Animated Grid Background */}
      {/* <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div> */}

      {/* Gradient Overlay */}
      {/* <motion.div
        className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5"
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      /> */}

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8 2xl:px-0">
        {/* Header Section */}
        <div className="mb-16 text-center">
          {/* Badge */}
          <motion.div
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Sparkles className="h-4 w-4 text-cyan-400" />
            <span className="font-orbitron text-xs font-bold uppercase tracking-wider text-cyan-400">
              Player Support Hub
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            className="mb-6 font-orbitron text-4xl font-black uppercase leading-tight text-white md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              FREQUENTLY ASKED
            </span>
            <br />
            <span className="text-white">QUESTIONS</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="mx-auto max-w-3xl font-rajdhani text-lg font-medium leading-relaxed text-gray-400 md:text-xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Get instant answers to your questions about gameplay, rewards,
            technical requirements, and more. Can&apos;t find what you need? Our
            support team is always ready to help.
          </motion.p>

          {/* Divider */}
          <motion.div
            className="mx-auto mt-8 h-1 w-32 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 128, opacity: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
            viewport={{ once: true }}
          />
        </div>

        {/* FAQ Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-4">
            {faqData.slice(0, 3).map((faq) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                isActive={activeId === faq.id}
                toggleFaq={toggleFaq}
              />
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {faqData.slice(3, 6).map((faq) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                isActive={activeId === faq.id}
                toggleFaq={toggleFaq}
              />
            ))}
          </div>
        </div>

        {/* Support CTA Section */}
        <motion.div
          className="mt-16 rounded-2xl border border-white/10 bg-gradient-to-br from-gray-900/90 to-black/90 p-8 text-center backdrop-blur-sm md:p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Glow Effect */}
          <motion.div
            className="absolute -inset-0.5 -z-10 rounded-2xl bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-pink-500/30 opacity-0 blur transition-opacity duration-500 group-hover:opacity-100"
            animate={{
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-purple-500"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <Users className="h-8 w-8 text-white" />
          </motion.div>

          <h3 className="mb-4 font-orbitron text-2xl font-black uppercase text-white md:text-3xl">
            Still Have Questions?
          </h3>

          <p className="mx-auto mb-8 max-w-2xl font-rajdhani text-lg text-gray-400">
            Join our thriving community of over 50,000 players on Discord. Get
            instant help, share strategies, and connect with fellow gamers 24/7.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <motion.a
              href="https://discord.gg/wCwqrTdHnp"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 font-orbitron text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/50"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Users className="h-5 w-5" />
              <span>Join Discord</span>
              <motion.div
                className="absolute right-0 top-0 h-full w-full bg-white/20"
                initial={{ x: "100%" }}
                whileHover={{ x: "-100%" }}
                transition={{ duration: 0.5 }}
              />
            </motion.a>

            <motion.a
              href="mailto:magicworldsonline2025@gmail.com"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-xl border-2 border-white/20 bg-white/5 px-8 py-4 font-orbitron text-sm font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/10"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Shield className="h-5 w-5" />
              <span>Email Support</span>
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute h-1 w-1 rounded-full bg-cyan-500"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}
    </section>
  );
};

export default FAQ;
