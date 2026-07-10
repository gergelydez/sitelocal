"use client";

import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 backdrop-blur-md bg-bg/70 border-b border-white/8"
    >
      <div className="max-w-[1120px] mx-auto px-6 flex items-center justify-between py-4">
        <div className="font-display font-bold text-[15px] tracking-tight">
          site<span className="text-trust">local</span>.ro
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[12.5px] text-muted">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald" />
          Baia Mare &amp; Maramureș
        </div>
        <a
          href="#demo"
          className="bg-trust hover:bg-trust/90 text-white px-4 py-2.5 rounded-lg text-[13.5px] font-semibold cursor-pointer transition-colors"
        >
          Demo gratuit
        </a>
      </div>
    </motion.nav>
  );
}
