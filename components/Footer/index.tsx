"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Gamepad2,
  Mail,
  MapPin,
  ArrowRight,
  Facebook,
  Twitter,
  Github,
  Youtube,
  Twitch,
  Instagram,
  Linkedin,
  MessageCircle,
} from "lucide-react";

const Footer = () => {
  // Footer sections data
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Worlds", href: "/worlds" },
    { name: "Play Now", href: "/play" },
    { name: "Support Center", href: "/support" },
  ];

  const community = [
    {
      name: "Discord Server",
      href: "https://discord.gg/wCwqrTdHnp",
      icon: MessageCircle,
    },
    {
      name: "Twitter (X)",
      href: "https://x.com/magicworlds3",
      icon: Github,
    },
    {
      name: "GitHub",
      href: "https://github.com/orgs/TheMagicWorlds",
      icon: Github,
    },
    {
      name: "Blog",
      href: "https://mauricebigmoflynn.wordpress.com/",
      icon: MessageCircle,
    },
  ];

  const resources = [
    {
      name: "White Paper",
      href: "https://helix-labs-gmbh.notion.site/Magic-Worlds-Layer-2-Whitepaper-1adf1e88252580baa4e9cb08def48ba7?pvs=4",
    },
    { name: "Documentation", href: "/docs" },
    {
      name: "Download Game",
      href: "https://magicworlds.itch.io/magic-world",
    },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://www.facebook.com/MagikWorlds",
      label: "Facebook",
      color: "hover:text-blue-500",
    },
    {
      icon: Twitter,
      href: "https://x.com/magicworlds3",
      label: "Twitter",
      color: "hover:text-sky-400",
    },
    {
      icon: Youtube,
      href: "https://youtube.com/@magicworldstv?si=FHtkbuWJh5aYKmQy",
      label: "YouTube",
      color: "hover:text-red-500",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/magikworlds/",
      label: "Instagram",
      color: "hover:text-pink-500",
    },
    {
      icon: Twitch,
      href: "https://www.twitch.tv/magicworldsonline",
      label: "Twitch",
      color: "hover:text-purple-500",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/company/magic-worlds",
      label: "LinkedIn",
      color: "hover:text-blue-600",
    },
    {
      icon: Github,
      href: "https://github.com/orgs/TheMagicWorlds",
      label: "GitHub",
      color: "hover:text-gray-400",
    },
    {
      icon: MessageCircle,
      href: "https://discord.gg/wCwqrTdHnp",
      label: "Discord",
      color: "hover:text-indigo-400",
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-black">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Gradient Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5"
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Top Border Gradient */}
      {/* <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500" /> */}

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 md:px-8 lg:py-24 2xl:px-0">
        {/* Main Footer Content */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Brand Column */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Logo */}
            <motion.div
              className="mb-6 flex items-center gap-4"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative h-16 w-16">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 blur-xl" />
                <Image
                  src="/images/logo/logo.png"
                  alt="Magic Worlds Logo"
                  width={64}
                  height={64}
                  className="relative z-10"
                />
              </div>
              <div>
                <h3 className="font-orbitron text-2xl font-black uppercase text-white">
                  Magic Worlds
                </h3>
                <p className="font-rajdhani text-sm text-gray-400">
                  Play. Earn. Conquer.
                </p>
              </div>
            </motion.div>

            {/* Description */}
            <p className="mb-6 font-rajdhani text-base leading-relaxed text-gray-400">
              A free, family-friendly, and open-source gaming universe where
              adventure meets opportunity. Love, Laugh, Learn, and earn while
              you play.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <motion.a
                href="mailto:magicworldsonline2025@gmail.com"
                className="group flex items-center gap-3 font-rajdhani text-sm text-gray-400 transition-colors hover:text-cyan-400"
                whileHover={{ x: 5 }}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 group-hover:bg-cyan-500/10">
                  <Mail className="h-4 w-4" />
                </div>
                <span>magicworldsonline2025@gmail.com</span>
              </motion.a>

              <motion.div
                className="flex items-center gap-3 font-rajdhani text-sm text-gray-400"
                whileHover={{ x: 5 }}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5">
                  <MapPin className="h-4 w-4" />
                </div>
                <span>Global Gaming Community</span>
              </motion.div>
            </div>

            {/* Gaming Badge */}
            <motion.div
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2"
              animate={{
                boxShadow: [
                  "0 0 0 rgba(6, 182, 212, 0)",
                  "0 0 20px rgba(6, 182, 212, 0.3)",
                  "0 0 0 rgba(6, 182, 212, 0)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Gamepad2 className="h-4 w-4 text-cyan-400" />
              <span className="font-orbitron text-xs font-bold uppercase tracking-wider text-cyan-400">
                50K+ Active Players
              </span>
            </motion.div>
          </motion.div>

          {/* Links Columns */}
          <div className="grid gap-8 sm:grid-cols-3 lg:col-span-8">
            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="mb-6 font-orbitron text-sm font-bold uppercase tracking-wider text-white">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li key={index} whileHover={{ x: 5 }}>
                    <a
                      href={link.href}
                      className="group flex items-center gap-2 font-rajdhani text-gray-400 transition-colors hover:text-cyan-400"
                    >
                      <ArrowRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                      <span>{link.name}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Community */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="mb-6 font-orbitron text-sm font-bold uppercase tracking-wider text-white">
                Community
              </h4>
              <ul className="space-y-3">
                {community.map((link, index) => (
                  <motion.li key={index} whileHover={{ x: 5 }}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 font-rajdhani text-gray-400 transition-colors hover:text-cyan-400"
                    >
                      <ArrowRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                      <span>{link.name}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Resources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="mb-6 font-orbitron text-sm font-bold uppercase tracking-wider text-white">
                Resources
              </h4>
              <ul className="space-y-3">
                {resources.map((link, index) => (
                  <motion.li key={index} whileHover={{ x: 5 }}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 font-rajdhani text-gray-400 transition-colors hover:text-cyan-400"
                    >
                      <ArrowRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                      <span>{link.name}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          className="mt-16 rounded-2xl border border-white/10 bg-gradient-to-br from-gray-900/50 to-black/50 p-8 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
            <div className="text-center md:text-left">
              <h3 className="mb-2 font-orbitron text-xl font-black uppercase text-white md:text-2xl">
                Stay in the Game
              </h3>
              <p className="font-rajdhani text-gray-400">
                Get the latest updates, events, and exclusive rewards
              </p>
            </div>
            <motion.a
              href="https://discord.gg/wCwqrTdHnp"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-4 font-orbitron text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/50"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Join Discord</span>
              <ArrowRight className="h-4 w-4" />
              <motion.div
                className="absolute right-0 top-0 h-full w-full bg-white/20"
                initial={{ x: "100%" }}
                whileHover={{ x: "-100%" }}
                transition={{ duration: 0.5 }}
              />
            </motion.a>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
            {/* Copyright */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="font-rajdhani text-sm text-gray-400">
                © {new Date().getFullYear()} Magic Worlds. All rights reserved.
              </p>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <a href="#" className="hover:text-cyan-400">
                  Privacy
                </a>
                <span>•</span>
                <a href="#" className="hover:text-cyan-400">
                  Terms
                </a>
                <span>•</span>
                <span className="rounded bg-cyan-500/10 px-2 py-1 font-orbitron font-bold text-cyan-400">
                  v3.0.0
                </span>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-gray-400 transition-all ${social.color} hover:bg-white/10`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute h-1 w-1 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background:
              i % 3 === 0 ? "#06b6d4" : i % 3 === 1 ? "#a855f7" : "#ec4899",
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.8, 0],
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
    </footer>
  );
};

export default Footer;
