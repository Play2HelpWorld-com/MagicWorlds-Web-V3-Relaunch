"use client";
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

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
    <motion.section
      id="contact"
      className="relative min-h-screen w-full overflow-hidden bg-gray-900 px-4 pb-4 pt-28 md:px-8 md:pb-12 md:pt-28"
      variants={gradientVariants}
      animate="animate"
    >
      {/* Pixel grid background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="h-full w-full bg-[linear-gradient(rgba(132,90,223,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(132,90,223,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      </div>

      {/* Floating hexagons */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-purple-600 opacity-10"
            style={{
              clipPath:
                "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              width: Math.random() * 80 + 40 + "px",
              height: Math.random() * 80 + 40 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              rotate: [0, Math.random() * 360],
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Main header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="font-gaming mb-2 text-5xl font-extrabold tracking-tight text-white md:text-6xl">
            <span className="inline-block bg-gradient-to-r from-purple-400 via-violet-500 to-indigo-400 bg-clip-text text-transparent">
              JOIN
            </span>{" "}
            OUR
            <span className="inline-block bg-gradient-to-r from-indigo-400 via-violet-500 to-purple-400 bg-clip-text text-transparent">
              {" "}
              GUILD
            </span>
          </h1>
          <div className="mx-auto my-4 h-1 w-32 rounded-full bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500"></div>
          <p className="mx-auto max-w-xl text-lg text-purple-200">
            Level up your gaming experience by joining our community. Send us a
            message to unlock exclusive access to events, tournaments, and
            rewards.
          </p>
        </motion.div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Form section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-3/5"
          >
            <div className="relative overflow-hidden rounded-2xl border border-purple-500/30 bg-gray-900/80 p-6 backdrop-blur-md md:p-8">
              {/* Glow effects */}
              <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-indigo-600/20 blur-3xl"></div>
              <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-purple-600/20 blur-3xl"></div>

              <h2 className="mb-6 flex items-center text-2xl font-bold text-white">
                <motion.span
                  animate={{ rotate: [0, -10, 0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="mr-3 text-3xl"
                >
                  🎮
                </motion.span>
                Send Message
              </h2>

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
                    className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"
                  >
                    <svg
                      className="h-10 w-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </motion.div>
                  <h3 className="mb-2 text-2xl font-bold text-white">
                    Quest Accepted!
                  </h3>
                  <p className="text-lg text-purple-200">
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
                    className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-pink-500"
                  >
                    <svg
                      className="h-10 w-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </motion.div>
                  <h3 className="mb-2 text-2xl font-bold text-white">
                    Connection Failed
                  </h3>
                  <p className="text-lg text-purple-200">
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
                      whileTap={{ scale: 0.98 }}
                      style={shimmerEffect("name")}
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
                        className="w-full rounded-lg border border-purple-500/30 bg-gray-800/70 px-4 py-3 text-white transition-all placeholder:text-gray-400 focus:border-purple-400 focus:outline-none"
                        required
                      />
                    </motion.div>

                    {/* Email Field */}
                    <motion.div
                      whileTap={{ scale: 0.98 }}
                      style={shimmerEffect("email")}
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
                        className="w-full rounded-lg border border-purple-500/30 bg-gray-800/70 px-4 py-3 text-white transition-all placeholder:text-gray-400 focus:border-purple-400 focus:outline-none"
                        required
                      />
                    </motion.div>

                    {/* Subject Field */}
                    <motion.div
                      whileTap={{ scale: 0.98 }}
                      style={shimmerEffect("subject")}
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
                        className="w-full rounded-lg border border-purple-500/30 bg-gray-800/70 px-4 py-3 text-white transition-all placeholder:text-gray-400 focus:border-purple-400 focus:outline-none"
                        required
                      />
                    </motion.div>

                    {/* Phone Field */}
                    <motion.div
                      whileTap={{ scale: 0.98 }}
                      style={shimmerEffect("phone")}
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
                        className="w-full rounded-lg border border-purple-500/30 bg-gray-800/70 px-4 py-3 text-white transition-all placeholder:text-gray-400 focus:border-purple-400 focus:outline-none"
                      />
                    </motion.div>
                  </div>

                  {/* Message Field */}
                  <motion.div
                    whileTap={{ scale: 0.99 }}
                    style={shimmerEffect("message")}
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
                      className="w-full rounded-lg border border-purple-500/30 bg-gray-800/70 px-4 py-3 text-white transition-all placeholder:text-gray-400 focus:border-purple-400 focus:outline-none"
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
                          className="mr-3 flex h-6 w-6 items-center justify-center rounded border-2 border-purple-500/50 bg-gray-800"
                        >
                          {formData.terms && (
                            <motion.svg
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="h-4 w-4 text-purple-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </motion.svg>
                          )}
                        </motion.div>
                        <span className="text-sm text-gray-300 transition-colors group-hover:text-purple-300">
                          I agree to join the guild and receive communications
                        </span>
                      </div>
                    </label>

                    {/* Submit Button */}
                    <motion.button
                      whileHover={{
                        scale: 1.03,
                        boxShadow: "0 0 20px rgba(139, 92, 246, 0.5)",
                      }}
                      whileTap={{ scale: 0.97 }}
                      disabled={formState === "loading"}
                      type="submit"
                      className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 font-bold text-white shadow-lg transition-all hover:from-purple-700 hover:to-indigo-700 disabled:opacity-70"
                    >
                      <div className="relative z-10 flex items-center justify-center gap-2">
                        {formState === "loading" ? (
                          <>
                            <svg
                              className="h-5 w-5 animate-spin text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            <span>SENDING...</span>
                          </>
                        ) : (
                          <>
                            <span>SEND MESSAGE</span>
                            <motion.svg
                              animate={{ x: [0, 4, 0] }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                repeatType: "loop",
                              }}
                              className="h-5 w-5 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                              />
                            </motion.svg>
                          </>
                        )}
                      </div>

                      {/* Button particle effects */}
                      <div className="absolute inset-0 z-0">
                        {[...Array(5)].map((_, i) => (
                          <motion.span
                            key={i}
                            className="absolute h-1 w-1 rounded-full bg-white"
                            style={{
                              top: Math.random() * 100 + "%",
                              left: Math.random() * 100 + "%",
                            }}
                            animate={{
                              scale: [0, 1, 0],
                              opacity: [0, 0.5, 0],
                            }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              delay: i * 0.2,
                            }}
                          />
                        ))}
                      </div>
                    </motion.button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>

          {/* Connection Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full lg:w-2/5"
          >
            <div className="flex h-full flex-col justify-between rounded-2xl border border-indigo-500/30 bg-gray-900/80 p-6 backdrop-blur-md md:p-8">
              {/* Glow effect */}
              <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-purple-600/20 blur-3xl"></div>

              <div>
                <h2 className="mb-6 flex items-center text-2xl font-bold text-white">
                  <motion.span
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mr-3 text-3xl"
                  >
                    🌐
                  </motion.span>
                  Connect With Us
                </h2>

                {/* Contact Cards */}
                <div className="space-y-5">
                  <motion.div
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="rounded-lg border border-indigo-500/20 bg-gray-800/50 p-4"
                  >
                    <h3 className="mb-2 text-lg font-semibold text-indigo-400">
                      Guild Headquarters
                    </h3>
                    <div className="space-y-1 text-gray-300">
                      <p>3 Wetherell Road</p>
                      <p>Hackney, London</p>
                      <p>E9 7DB</p>
                      <p>United Kingdom</p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="rounded-lg border border-purple-500/20 bg-gray-800/50 p-4"
                  >
                    <h3 className="mb-2 text-lg font-semibold text-purple-400">
                      Digital Contact
                    </h3>
                    <p className="mb-1 flex items-center text-gray-300">
                      <svg
                        className="mr-2 h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      magicworldsonline2025@gmail.com
                    </p>
                    <p className="flex items-center text-gray-300">
                      <svg
                        className="mr-2 h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      +44 7762 293742
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="rounded-lg border border-violet-500/20 bg-gray-800/50 p-4"
                  >
                    <h3 className="mb-2 text-lg font-semibold text-violet-400">
                      Server Times
                    </h3>
                    <div className="grid grid-cols-2 gap-2 text-gray-300">
                      <p>Monday - Friday:</p>
                      <p>24/7 Support</p>
                      <p>Weekends:</p>
                      <p>24/7 Support</p>
                      <p>Tournament Days:</p>
                      <p>Special Hours</p>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Social Media & Map */}
              <div className="mt-6">
                <div className="mb-4 rounded-lg bg-gray-800/70 p-4">
                  <h3 className="mb-2 text-lg font-semibold text-white">
                    Guild Location
                  </h3>
                  <div className="relative h-32 overflow-hidden rounded-lg bg-indigo-900/30">
                    {/* Stylized map with gaming theme */}
                    <div className="absolute inset-0">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.3),transparent_70%)]"></div>
                      <div className="grid h-full w-full grid-cols-12 grid-rows-6 gap-px opacity-30">
                        {[...Array(72)].map((_, i) => (
                          <div
                            key={i}
                            className="bg-purple-500/20 transition-colors hover:bg-purple-500/40"
                          ></div>
                        ))}
                      </div>
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                        className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500 shadow-[0_0_15px_5px_rgba(139,92,246,0.5)]"
                      />
                    </div>
                    <div className="absolute bottom-1 right-1 text-xs font-semibold text-purple-300">
                      UNITED KINGDOM
                    </div>
                  </div>
                </div>

                <h3 className="mb-2 text-center text-sm font-semibold uppercase tracking-wider text-gray-400">
                  Join Our Networks
                </h3>
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
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-colors hover:bg-indigo-600 hover:text-white"
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
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute z-0 h-2 w-2 rounded-full bg-purple-500 opacity-20"
          style={{
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
          }}
          animate={{
            y: [0, -Math.random() * 100 - 50],
            opacity: [0.2, 0.5, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 10,
            repeat: Infinity,
            repeatType: "loop",
          }}
        />
      ))}
    </motion.section>
  );
};

export default Contact;
