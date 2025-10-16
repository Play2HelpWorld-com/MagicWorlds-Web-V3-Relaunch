"use client";
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Trophy,
  Gamepad2,
  Zap,
  Check,
  X,
} from "lucide-react";

const Contact = () => {
  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    phone: "",
    message: "",
    terms: false,
  });
  const [formState, setFormState] = useState("idle"); // idle, loading, success, error
  const [activeField, setActiveField] = useState(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Focus handlers
  const handleFocus = (field) => setActiveField(field);
  const handleBlur = () => setActiveField(null);

  // Form submission handler with EmailJS
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState("loading");

    // Replace with your actual EmailJS service ID, template ID, and public key
    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_TEMPLATE_ID || "",
        formRef.current!,
        process.env.NEXT_PUBLIC_PUBLIC_KEY || "",
      )
      .then(() => {
        setFormState("success");
        // Reset form after 3 seconds
        setTimeout(() => {
          setFormData({
            name: "",
            email: "",
            subject: "",
            phone: "",
            message: "",
            terms: false,
          });
          setFormState("idle");
        }, 3000);
      })
      .catch((error) => {
        console.error("Email sending failed:", error);
        setFormState("error");
        // Reset error state after 3 seconds
        setTimeout(() => {
          setFormState("idle");
        }, 3000);
      });
  };

  // Animated gradient background
  const gradientVariants = {
    animate: {
      background: [
        "linear-gradient(130deg, #1a237e 0%, #4527a0 50%, #311b92 100%)",
        "linear-gradient(130deg, #4527a0 0%, #311b92 50%, #1a237e 100%)",
        "linear-gradient(130deg, #311b92 0%, #1a237e 50%, #4527a0 100%)",
      ],
      transition: {
        duration: 15,
        repeat: Infinity,
        repeatType: "reverse" as const,
      },
    },
  };

  // Field shimmer effect
  const shimmerEffect = (fieldName) => ({
    boxShadow:
      activeField === fieldName
        ? "0 0 0 2px rgba(132, 90, 223, 0.6), 0 0 20px rgba(132, 90, 223, 0.4)"
        : "none",
    transition: "box-shadow 0.3s ease-in-out",
  });

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-transparent py-20 lg:py-25 xl:py-30"
    >
      {/* Animated Grid Background */}
      {/* <div className="absolute inset-0 z-0">
        <div
          className="h-full w-full opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div> */}

      {/* Gradient Orbs */}
      {/* <div className="absolute left-0 top-0 -z-10 h-[500px] w-[500px] rounded-full bg-purple-500 opacity-20 blur-[120px]" />
      <div className="absolute right-0 top-1/4 -z-10 h-[600px] w-[600px] rounded-full bg-fuchsia-500 opacity-20 blur-[120px]" />
      <div className="absolute bottom-0 left-1/3 -z-10 h-[500px] w-[500px] rounded-full bg-cyan-500 opacity-20 blur-[120px]" /> */}

      <div className="container relative z-10 mx-auto w-full">
        {/* Header */}
        <div className="relative z-10 mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 flex items-center justify-center gap-4"
          >
            {/* <Trophy className="h-12 w-12 text-yellow-400 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]" /> */}
            <h2 className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 bg-clip-text font-orbitron text-6xl font-black uppercase text-transparent">
              CONTACT US
            </h2>
            {/* <Trophy className="h-12 w-12 text-yellow-400 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]" /> */}
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-rajdhani text-xl text-gray-300"
          >
            Join our guild and unlock exclusive gaming experiences 🎮
          </motion.p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Form section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-3/5"
          >
            <div className="relative overflow-hidden rounded-2xl border border-purple-500/30 bg-black/40 p-8 backdrop-blur-lg">
              {/* Glow effects */}
              <div className="absolute -inset-0.5 -z-10 rounded-2xl bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-500 opacity-20 blur-xl" />

              <div className="mb-6 flex items-center gap-3">
                <Gamepad2 className="h-8 w-8 text-purple-400" />
                <h3 className="font-orbitron text-2xl font-bold uppercase tracking-wider text-white">
                  Send Message
                </h3>
              </div>

              {formState === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, 0, -5, 0],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 shadow-lg shadow-purple-500/50"
                  >
                    <Check className="h-10 w-10 text-white" strokeWidth={3} />
                  </motion.div>
                  <h3 className="mb-2 font-orbitron text-2xl font-bold uppercase text-white">
                    Quest Accepted!
                  </h3>
                  <p className="font-rajdhani text-lg text-gray-300">
                    Your message has been sent successfully. We&apos;ll respond
                    to your quest soon!
                  </p>
                </motion.div>
              ) : formState === "error" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, 0, -5, 0],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-pink-500 shadow-lg shadow-red-500/50"
                  >
                    <X className="h-10 w-10 text-white" strokeWidth={3} />
                  </motion.div>
                  <h3 className="mb-2 font-orbitron text-2xl font-bold uppercase text-white">
                    Connection Failed
                  </h3>
                  <p className="font-rajdhani text-lg text-gray-300">
                    There was an error sending your message. Please try again
                    later.
                  </p>
                </motion.div>
              ) : (
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {/* Name Field */}
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="rounded-lg"
                    >
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => handleFocus("name")}
                        onBlur={handleBlur}
                        placeholder="Character Name"
                        className="w-full rounded-lg border border-purple-500/30 bg-black/60 px-4 py-3 font-rajdhani text-white transition-all placeholder:text-gray-500 focus:border-purple-400 focus:shadow-lg focus:shadow-purple-500/30 focus:outline-none"
                        required
                      />
                    </motion.div>

                    {/* Email Field */}
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="rounded-lg"
                    >
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => handleFocus("email")}
                        onBlur={handleBlur}
                        placeholder="Email Address"
                        className="w-full rounded-lg border border-purple-500/30 bg-black/60 px-4 py-3 font-rajdhani text-white transition-all placeholder:text-gray-500 focus:border-purple-400 focus:shadow-lg focus:shadow-purple-500/30 focus:outline-none"
                        required
                      />
                    </motion.div>

                    {/* Subject Field */}
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="rounded-lg"
                    >
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        onFocus={() => handleFocus("subject")}
                        onBlur={handleBlur}
                        placeholder="Quest Type"
                        className="w-full rounded-lg border border-purple-500/30 bg-black/60 px-4 py-3 font-rajdhani text-white transition-all placeholder:text-gray-500 focus:border-purple-400 focus:shadow-lg focus:shadow-purple-500/30 focus:outline-none"
                        required
                      />
                    </motion.div>

                    {/* Phone Field */}
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="rounded-lg"
                    >
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onFocus={() => handleFocus("phone")}
                        onBlur={handleBlur}
                        placeholder="Phone (Optional)"
                        className="w-full rounded-lg border border-purple-500/30 bg-black/60 px-4 py-3 font-rajdhani text-white transition-all placeholder:text-gray-500 focus:border-purple-400 focus:shadow-lg focus:shadow-purple-500/30 focus:outline-none"
                      />
                    </motion.div>
                  </div>

                  {/* Message Field */}
                  <motion.div
                    whileHover={{ scale: 1.005 }}
                    whileTap={{ scale: 0.995 }}
                    className="rounded-lg"
                  >
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => handleFocus("message")}
                      onBlur={handleBlur}
                      rows={5}
                      placeholder="Describe your quest or message here..."
                      className="w-full rounded-lg border border-purple-500/30 bg-black/60 px-4 py-3 font-rajdhani text-white transition-all placeholder:text-gray-500 focus:border-purple-400 focus:shadow-lg focus:shadow-purple-500/30 focus:outline-none"
                      required
                    ></textarea>
                  </motion.div>

                  <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
                    {/* Terms Checkbox */}
                    <label className="group flex cursor-pointer items-center">
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          name="terms"
                          checked={formData.terms}
                          onChange={handleChange}
                          className="sr-only"
                          required
                        />
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="mr-3 flex h-6 w-6 items-center justify-center rounded border-2 border-purple-500/50 bg-black/60"
                        >
                          {formData.terms && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="h-4 w-4"
                            >
                              <Check
                                className="h-4 w-4 text-purple-400"
                                strokeWidth={3}
                              />
                            </motion.div>
                          )}
                        </motion.div>
                        <span className="font-rajdhani text-sm text-gray-300 transition-colors group-hover:text-purple-300">
                          I agree to join the guild and receive communications
                        </span>
                      </div>
                    </label>

                    {/* Submit Button */}
                    <motion.button
                      whileHover={{
                        scale: 1.05,
                      }}
                      whileTap={{ scale: 0.95 }}
                      disabled={formState === "loading"}
                      type="submit"
                      className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-r from-purple-600 to-fuchsia-600 px-8 py-3.5 font-rajdhani font-bold uppercase tracking-wide text-white shadow-lg shadow-purple-500/30 transition-all hover:border-purple-400/50 hover:shadow-purple-500/50 disabled:opacity-50"
                    >
                      <div className="relative z-10 flex items-center justify-center gap-2">
                        {formState === "loading" ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                            >
                              <Zap className="h-5 w-5 text-white" />
                            </motion.div>
                            <span>SENDING...</span>
                          </>
                        ) : (
                          <>
                            <span>SEND MESSAGE</span>
                            <Send className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                          </>
                        )}
                      </div>
                    </motion.button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>

          {/* Connection Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-2/5"
          >
            <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-cyan-500/30 bg-black/40 p-8 backdrop-blur-lg">
              {/* Glow effect */}
              <div className="absolute -inset-0.5 -z-10 rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-500 to-fuchsia-500 opacity-20 blur-xl" />

              <div className="mb-6 flex items-center gap-3">
                <MapPin className="h-8 w-8 text-cyan-400" />
                <h3 className="font-orbitron text-2xl font-bold uppercase tracking-wider text-white">
                  Guild HQ
                </h3>
              </div>

              {/* Contact Cards */}
              <div className="space-y-5">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="rounded-xl border border-cyan-500/20 bg-black/50 p-5"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-cyan-400" />
                    <h4 className="font-rajdhani text-lg font-bold uppercase tracking-wide text-cyan-400">
                      Location
                    </h4>
                  </div>
                  <div className="space-y-1 font-rajdhani text-gray-300">
                    <p>3 Wetherell Road</p>
                    <p>Hackney, London</p>
                    <p>E9 7DB</p>
                    <p>United Kingdom</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="rounded-xl border border-purple-500/20 bg-black/50 p-5"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <Mail className="h-5 w-5 text-purple-400" />
                    <h4 className="font-rajdhani text-lg font-bold uppercase tracking-wide text-purple-400">
                      Digital
                    </h4>
                  </div>
                  <div className="space-y-2 font-rajdhani text-gray-300">
                    <p className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-purple-400" />
                      <span className="break-all">
                        magicworldsonline2025@gmail.com
                      </span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-purple-400" />
                      +44 7762 293742
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="rounded-xl border border-fuchsia-500/20 bg-black/50 p-5"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-fuchsia-400" />
                    <h4 className="font-rajdhani text-lg font-bold uppercase tracking-wide text-fuchsia-400">
                      Server Status
                    </h4>
                  </div>
                  <div className="space-y-2 font-rajdhani text-gray-300">
                    <div className="flex justify-between">
                      <span>Weekdays:</span>
                      <span className="text-green-400">24/7 Online</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Weekends:</span>
                      <span className="text-green-400">24/7 Online</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Response:</span>
                      <span className="text-yellow-400">Fast</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Social Media */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mt-8"
              >
                <h4 className="mb-4 text-center font-rajdhani text-sm font-bold uppercase tracking-wider text-gray-400">
                  Join Our Networks
                </h4>
                <div className="flex justify-center gap-3">
                  {[
                    {
                      icon: "M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z",
                    },
                    {
                      icon: "M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z",
                    },
                    {
                      icon: "M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z",
                    },
                    {
                      icon: "M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z",
                    },
                    {
                      icon: "M8 0a8 8 0 0 0-2.915 15.452c-.07-.633-.134-1.606.027-2.297.146-.625.938-3.977.938-3.977s-.239-.479-.239-1.187c0-1.113.645-1.943 1.448-1.943.682 0 1.012.512 1.012 1.127 0 .686-.437 1.712-.663 2.663-.188.796.4 1.446 1.185 1.446 1.422 0 2.515-1.5 2.515-3.664 0-1.915-1.377-3.254-3.342-3.254-2.276 0-3.612 1.707-3.612 3.471 0 .688.265 1.425.595 1.826a.24.24 0 0 1 .056.23c-.061.252-.196.796-.222.907-.035.146-.116.177-.268.107-1-.465-1.624-1.926-1.624-3.1 0-2.523 1.834-4.84 5.286-4.84 2.775 0 4.932 1.977 4.932 4.62 0 2.757-1.739 4.976-4.151 4.976-.811 0-1.573-.421-1.834-.919l-.498 1.902c-.181.695-.669 1.566-.995 2.097A8 8 0 1 0 8 0z",
                    },
                    {
                      icon: "M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z",
                    },
                  ].map((network, index) => (
                    <motion.a
                      key={index}
                      href="#"
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.9 }}
                      className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/60 text-gray-400 transition-colors hover:text-white ${network.color}`}
                    >
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d={network.icon} />
                      </svg>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
