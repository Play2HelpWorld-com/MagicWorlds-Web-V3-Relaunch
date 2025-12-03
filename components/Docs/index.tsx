"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { docsData } from "./docsData";
import {
  Gamepad2,
  ShieldAlert,
  Sparkles,
  BookOpenCheck,
  Wand2,
  Sword,
  Scroll,
  Users,
  Code,
  ChevronRight,
  ChevronLeft,
  Zap,
  Trophy,
} from "lucide-react";

// Main content component with animations
const ContentSection = ({ section }) => {
  if (!section) return null;

  return (
    <div className="prose prose-invert max-w-none">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 bg-clip-text font-orbitron text-2xl font-black uppercase tracking-tight text-transparent sm:text-3xl lg:text-4xl"
      >
        {section.title}
      </motion.h1>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="space-y-4 font-rajdhani text-base leading-relaxed text-gray-300"
      >
        {section.content}
      </motion.div>
    </div>
  );
};

// Custom Sidebar Link with animations
const SidebarLink = ({ activeSection, setActiveSection }) => {
  const sections = Object.keys(docsData);

  const icons = {
    introduction: <Sparkles className="h-5 w-5" />,
    gettingStarted: <BookOpenCheck className="h-5 w-5" />,
    features: <Wand2 className="h-5 w-5" />,
    gameplay: <Sword className="h-5 w-5" />,
    worldBuilding: <Scroll className="h-5 w-5" />,
    community: <Users className="h-5 w-5" />,
    developers: <Code className="h-5 w-5" />,
    troubleshooting: <ShieldAlert className="h-5 w-5" />,
  };

  const colors = {
    introduction: "from-purple-500 to-fuchsia-500",
    gettingStarted: "from-cyan-500 to-blue-500",
    features: "from-yellow-500 to-orange-500",
    gameplay: "from-red-500 to-pink-500",
    worldBuilding: "from-green-500 to-emerald-500",
    community: "from-indigo-500 to-purple-500",
    developers: "from-blue-500 to-cyan-500",
    troubleshooting: "from-orange-500 to-red-500",
  };

  return (
    <>
      {sections.map((section, index) => (
        <motion.li
          key={section}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ scale: 1.02, x: 5 }}
          whileTap={{ scale: 0.98 }}
        >
          <button
            onClick={() => setActiveSection(section)}
            className={`group relative w-full overflow-hidden rounded-xl border px-4 py-3.5 text-left transition-all ${
              activeSection === section
                ? `border-purple-500/50 bg-gradient-to-r ${colors[section]} shadow-lg shadow-purple-500/30`
                : "border-white/10 bg-white/5 hover:border-purple-500/30 hover:bg-white/10"
            }`}
          >
            <div className="relative z-10 flex items-center">
              <motion.div
                className={`mr-3 ${
                  activeSection === section
                    ? "text-white"
                    : "text-gray-400 group-hover:text-white"
                }`}
                animate={{
                  rotate: activeSection === section ? [0, 10, -10, 0] : 0,
                  scale: activeSection === section ? [1, 1.1, 1] : 1,
                }}
                transition={{ duration: 0.5 }}
              >
                {icons[section] || <Gamepad2 className="h-5 w-5" />}
              </motion.div>
              <span
                className={`font-rajdhani text-sm font-bold uppercase tracking-wide ${
                  activeSection === section
                    ? "text-white"
                    : "text-gray-300 group-hover:text-white"
                }`}
              >
                {docsData[section]?.title}
              </span>

              {activeSection === section && (
                <motion.div
                  className="ml-auto flex items-center gap-1"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="h-2 w-2 animate-pulse rounded-full bg-white" />
                  <ChevronRight className="h-4 w-4 text-white" />
                </motion.div>
              )}
            </div>

            {/* Animated background for active state */}
            {activeSection === section && (
              <motion.div
                className="absolute inset-0 opacity-20 blur-xl"
                style={{
                  background: `linear-gradient(90deg, var(--tw-gradient-stops))`,
                }}
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}
          </button>
        </motion.li>
      ))}
    </>
  );
};

export default function Docs() {
  const [activeSection, setActiveSection] = useState("introduction");
  const sections = Object.keys(docsData);
  const currentIndex = sections.indexOf(activeSection);

  const handleNext = () => {
    if (currentIndex < sections.length - 1) {
      setActiveSection(sections[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setActiveSection(sections[currentIndex - 1]);
    }
  };

  return (
    <section className="relative overflow-hidden bg-transparent py-20 lg:py-25 xl:py-30">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 z-0">
        {/* <div
          className="h-full w-full opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        /> */}
      </div>

      {/* Gradient Orbs */}
      {/* <div className="absolute left-0 top-0 -z-10 h-[500px] w-[500px] rounded-full bg-purple-500 opacity-20 blur-[120px]" />
      <div className="absolute right-0 top-1/4 -z-10 h-[600px] w-[600px] rounded-full bg-fuchsia-500 opacity-20 blur-[120px]" />
      <div className="absolute bottom-0 left-1/3 -z-10 h-[500px] w-[500px] rounded-full bg-cyan-500 opacity-20 blur-[120px]" /> */}

      {/* Header */}
      <div className="relative z-10 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:text-left"
        >
          <h2 className=" bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 bg-clip-text font-orbitron text-2xl font-black uppercase text-transparent sm:text-3xl lg:text-5xl">
            Documentation
          </h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="font-rajdhani text-xl text-gray-300"
        >
          Your ultimate guide to mastering the Magic Worlds 🎮
        </motion.p>
      </div>

      <div className="container relative z-10 mx-auto w-full">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/4"
          >
            <div className="sticky top-[74px] rounded-2xl border border-purple-500/30 bg-black/40 p-6 backdrop-blur-lg">
              <div className="mb-6 flex items-center gap-3">
                <Gamepad2 className="h-6 w-6 text-purple-400" />
                <h3 className="font-orbitron text-lg font-bold uppercase tracking-wider text-white">
                  Navigation
                </h3>
              </div>
              <ul className="space-y-2">
                <SidebarLink
                  activeSection={activeSection}
                  setActiveSection={setActiveSection}
                />
              </ul>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-3/4"
          >
            <div className="relative overflow-hidden rounded-2xl border border-purple-500/30 bg-black/40 p-8 backdrop-blur-lg lg:p-12">
              {/* Content Glow Effect */}
              <div className="absolute -inset-0.5 -z-10 rounded-2xl bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-500 opacity-20 blur-xl" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ContentSection section={docsData[activeSection]} />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-12 flex items-center justify-between border-t border-white/10 pt-8"
              >
                <button
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  className="group flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-rajdhani font-bold uppercase tracking-wide text-white transition-all hover:border-purple-500/50 hover:bg-purple-500/20 hover:shadow-lg hover:shadow-purple-500/30 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-white/10 disabled:hover:bg-white/5 disabled:hover:shadow-none"
                >
                  <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                  <span>Previous</span>
                </button>

                <div className="flex items-center gap-2 text-gray-400">
                  <Zap className="h-5 w-5 text-yellow-400" />
                  <span className="font-rajdhani text-sm">
                    {currentIndex + 1} / {sections.length}
                  </span>
                </div>

                <button
                  onClick={handleNext}
                  disabled={currentIndex === sections.length - 1}
                  className="group flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-rajdhani font-bold uppercase tracking-wide text-white transition-all hover:border-cyan-500/50 hover:bg-cyan-500/20 hover:shadow-lg hover:shadow-cyan-500/30 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-white/10 disabled:hover:bg-white/5 disabled:hover:shadow-none"
                >
                  <span>Next</span>
                  <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
