"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import SectionHeader from "../Common/SectionHeader";

const Integration = () => {
  const [isHovering, setIsHovering] = useState<number | null>(null);
  const [animateBackground, setAnimateBackground] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimateBackground((prev) => !prev);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const platformIcons = [
    { src: "/images/brand/pc.png", name: "PC Gaming", color: "#50E3C2" },
    { src: "/images/brand/console.png", name: "Console", color: "#FF5757" },
    { src: "/images/brand/mobile.png", name: "Mobile", color: "#FFD600" },
    { src: "/images/brand/vr.png", name: "VR", color: "#AB6AFF" },
    {
      src: "/images/brand/cloud.png",
      name: "Cloud Gaming",
      color: "#3F95FF",
    },
    { src: "/images/brand/browser.png", name: "Browser", color: "#FF9552" },
  ];

  const floatingElements = [
    { size: "sm", color: "#FF5757", delay: 0 },
    { size: "lg", color: "#FFD600", delay: 1.5 },
    { size: "md", color: "#50E3C2", delay: 0.7 },
    { size: "sm", color: "#AB6AFF", delay: 2.1 },
    { size: "md", color: "#3F95FF", delay: 3.2 },
    { size: "sm", color: "#FF9552", delay: 1.2 },
    { size: "lg", color: "#50E3C2", delay: 2.8 },
    { size: "md", color: "#FF5757", delay: 4.1 },
  ];

  const getSizeClass = (size) => {
    switch (size) {
      case "sm":
        return "h-3 w-3";
      case "md":
        return "h-5 w-5";
      case "lg":
        return "h-8 w-8";
      default:
        return "h-4 w-4";
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
    hover: {
      scale: 1.1,
      y: -10,
      boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
      transition: { type: "spring", stiffness: 300, damping: 10 },
    },
  };

  const particleVariants = {
    initial: (i) => ({
      opacity: 0.7,
      y: 0,
      x: 0,
      scale: 1,
    }),
    animate: (i) => ({
      opacity: [0.7, 0.9, 0.7],
      y: [0, -15, 0],
      x: [0, i % 2 === 0 ? 10 : -10, 0],
      scale: [1, 1.2, 1],
      transition: {
        repeat: Infinity,
        repeatType: "loop" as const,
        duration: 3 + (i.delay || 0),
        ease: "easeInOut",
        delay: i.delay || 0,
      },
    }),
  };

  const backgroundVariants = {
    initial: { backgroundPosition: "0% 0%" },
    animate: {
      backgroundPosition: ["0% 0%", "100% 100%"],
      transition: {
        duration: 20,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop" as const,
      },
    },
  };

  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 z-0 bg-transparent bg-[length:400%_400%]"
        variants={backgroundVariants}
        initial="initial"
        animate="animate"
      >
        {/* Particle Grid Overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-[radial-gradient(rgba(255,255,255,0.3)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
        </div>
      </motion.div>

      {/* Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8 2xl:px-0">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <SectionHeader
            headerInfo={{
              title: `CROSS-PLATFORM GAMING UNIVERSE`,
              subtitle: `Connect & Play Across Every Device`,
              description: `Jump into action seamlessly across all your devices. Whether you're grinding XP on your desktop, quick-matching on mobile, or exploring virtual worlds in VR—your gaming adventure follows you everywhere. Play2Work's cross-platform technology ensures your progress, friends, and achievements stay synchronized in real-time.`,
            }}
          />

          <motion.div
            initial={{ width: "0%" }}
            whileInView={{ width: "80%" }}
            transition={{ delay: 0.5, duration: 1.5 }}
            viewport={{ once: true }}
            className="mx-auto mt-8 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"
          />
        </motion.div>

        {/* Gaming Platforms Section */}
        <motion.div
          className="relative mx-auto max-w-5xl px-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Floating elements */}
          {floatingElements.map((element, idx) => (
            <motion.div
              key={idx}
              className={`absolute rounded-full ${getSizeClass(element.size)}`}
              style={{
                background: element.color,
                boxShadow: `0 0 15px ${element.color}`,
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
              }}
              custom={element}
              variants={particleVariants}
              initial="initial"
              animate="animate"
            />
          ))}

          {/* Platform Icons Grid */}
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:gap-12">
            {platformIcons.map((platform, index) => (
              <motion.div
                key={index}
                variants={iconVariants}
                whileHover={isHovering === index ? "hover" : "visible"}
                onHoverStart={() => setIsHovering(index)}
                onHoverEnd={() => setIsHovering(null)}
                className="flex flex-col items-center justify-center"
              >
                <motion.div className="group relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/20 backdrop-blur-md">
                  {/* Glow effect on hover */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-50"
                    style={{
                      background: `radial-gradient(circle, ${platform.color} 0%, transparent 70%)`,
                    }}
                    animate={
                      isHovering === index ? { opacity: 0.5 } : { opacity: 0 }
                    }
                    transition={{ duration: 0.5 }}
                  />

                  {/* Icon */}
                  <div className="relative z-10 p-5">
                    <Image
                      width={100}
                      height={100}
                      src={platform.src}
                      alt={platform.name}
                      className="h-16 w-16 object-contain"
                    />
                  </div>

                  {/* Animated border on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${platform.color}, transparent)`,
                      backgroundSize: "200% 100%",
                    }}
                    animate={
                      isHovering === index
                        ? {
                            backgroundPosition: ["0% 0%", "200% 0%"],
                          }
                        : {}
                    }
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </motion.div>

                {/* Platform name with animation */}
                <motion.p
                  className="font-gaming mt-4 text-center text-sm font-medium text-white"
                  animate={
                    isHovering === index
                      ? {
                          scale: 1.1,
                          color: platform.color,
                        }
                      : {
                          scale: 1,
                          color: "#ffffff",
                        }
                  }
                  transition={{ duration: 0.3 }}
                >
                  {platform.name}
                </motion.p>
              </motion.div>
            ))}
          </div>

          {/* Central connecting lines */}
          <motion.div
            className="absolute inset-0 z-0 opacity-40"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.4 }}
            transition={{ delay: 1, duration: 1.5 }}
            viewport={{ once: true }}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 800 600"
              className="stroke-blue-500/50"
            >
              <motion.path
                d="M400,100 L200,200 L250,350 L400,450 L550,350 L600,200 L400,100"
                fill="none"
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
              />
              <motion.path
                d="M400,100 L400,450"
                fill="none"
                strokeWidth="2"
                strokeDasharray="5,5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 1 }}
              />
              <motion.path
                d="M200,200 L600,200"
                fill="none"
                strokeWidth="2"
                strokeDasharray="5,5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 1.5 }}
              />
            </svg>
          </motion.div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          viewport={{ once: true }}
        >
          {/* <motion.button
            className="relative overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 font-bold text-white shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">START GAMING NOW</span>
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.4 }}
            />
          </motion.button> */}

          {/* Pulse effect around button */}
          <motion.div
            className="absolute left-1/2 mt-4 -translate-x-1/2 rounded-full bg-blue-500/20"
            style={{ width: 20, height: 20 }}
            animate={{
              scale: [1, 3, 1],
              opacity: [0.7, 0, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Integration;
