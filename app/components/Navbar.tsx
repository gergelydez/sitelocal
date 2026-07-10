"use client";

import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass sticky top-4 z-50 max-w-[900px] mx-4 md:mx-auto flex items-center justify-between px-5 py-3 rounded-full"
    >
      <div className="font-display font-bold text-[15px]">
        site<span className="grad-text">local</span>.ro
      </div>
      <a
        href="#demo"
        className="bg-gradient-to-r from-violet to-cyan text-bg px-4 py-2 rounded-full text-[13.5px] font-bold cursor-pointer"
      >
        Demo gratuit
      </a>
    </motion.nav>
  );
}
