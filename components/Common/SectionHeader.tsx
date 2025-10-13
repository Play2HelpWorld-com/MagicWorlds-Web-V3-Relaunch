"use client";
import { motion } from "framer-motion";

type HeaderInfo = {
  title: string;
  subtitle: string;
  description: string;
};

const SectionHeader = ({ headerInfo }: { headerInfo: HeaderInfo }) => {
  const { title, subtitle, description } = headerInfo;

  return (
    <>
      {/* <!-- Section Title Start --> */}
      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            y: -20,
          },

          visible: {
            opacity: 1,
            y: 0,
          },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 1, delay: 0.1 }}
        viewport={{ once: true }}
        className="animate_top mx-auto text-center"
      >
        {/* Badge/Tag with gradient */}
        <motion.div
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-gradient-to-r from-purple-500/10 via-fuchsia-500/10 to-purple-500/10 px-6 py-2.5 backdrop-blur-sm"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <div className="h-2 w-2 animate-pulse rounded-full bg-purple-500"></div>
          <span className="font-rajdhani text-sm font-bold uppercase tracking-wider text-purple-400">
            {title}
          </span>
        </motion.div>

        {/* Main Heading with gradient text */}
        <motion.h2
          className="font-orbitron mx-auto mb-6 text-4xl font-black uppercase leading-tight tracking-tight md:w-4/5 md:text-5xl lg:text-6xl xl:w-3/4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
            {subtitle}
          </span>
        </motion.h2>

        {/* Decorative line */}
        <motion.div
          className="mx-auto mb-8 h-1 w-24 rounded-full bg-gradient-to-r from-transparent via-purple-500 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        />

        {/* Description with better typography */}
        <motion.p
          className="font-rajdhani mx-auto text-base leading-relaxed text-gray-300 md:w-4/5 md:text-lg lg:w-3/5 xl:w-[55%]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {description}
        </motion.p>
      </motion.div>
      {/* <!-- Section Title End --> */}
    </>
  );
};

export default SectionHeader;
