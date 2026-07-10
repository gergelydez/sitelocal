"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkle } from "lucide-react";

export default function Hero() {
  return (
    <section className="max-w-[1120px] mx-auto px-6 grid md:grid-cols-[1.05fr_1fr] gap-12 md:gap-14 items-center pt-16 md:pt-24 pb-20">
      <div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass inline-flex items-center gap-2 text-[12.5px] font-semibold text-cyan px-3.5 py-1.5 rounded-full mb-6"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan" />
          </span>
          Baia Mare · Demo gratuit în 24h
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="font-display font-bold text-[40px] md:text-[52px] leading-[1.05] mb-5"
        >
          Afacerea ta e reală.
          <br />
          <span className="grad-text">Site-ul, încă nu.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2 }}
          className="text-[17px] md:text-[17.5px] text-muted max-w-[46ch] mb-8 leading-relaxed"
        >
          Îți construiesc prima variantă complet gratis. O vezi, decizi dacă
          merită — fără presiune, fără plată în avans.
        </motion.p>

        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.3 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          href="#demo"
          className="btn-shine inline-flex items-center gap-2.5 px-7 py-4 rounded-full font-bold text-[15.5px] text-white cursor-pointer shadow-[0_0_40px_rgba(138,15,26,0.35)]"
          style={{
            backgroundImage:
              "linear-gradient(100deg,#3730A3,#2563EB,#0D9488)",
          }}
        >
          Vreau demo-ul gratuit
          <ArrowRight size={16} />
        </motion.a>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.65, delay: 0.4 }}
          className="flex gap-5 mt-6 text-[13px] text-muted flex-wrap"
        >
          {["Gata în 3 zile", "Plătești doar dacă îți place", "Local, Baia Mare"].map(
            (t) => (
              <span key={t} className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
                {t}
              </span>
            )
          )}
        </motion.div>
      </div>

      {/* Signature element */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.25 }}
        className="relative"
      >
        <div className="absolute -inset-[2px] rounded-[26px] glow-ring blur-[2px]" />
        <div className="relative rounded-[24px] p-4 bg-gradient-to-b from-[#131A26]/90 to-[#0B0F18]/95 border border-white/10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="glass absolute -top-6 right-5 px-3.5 py-2.5 rounded-2xl text-[12.5px] font-semibold flex items-center gap-2 z-10"
          >
            <Sparkle size={13} className="text-cyan" />
            Live în 3 zile
          </motion.div>

          <div className="flex gap-1.5 mb-3 pl-1">
            {[0, 1, 2].map((i) => (
              <span key={i} className="w-2.5 h-2.5 rounded-full bg-white/15" />
            ))}
          </div>

          <div className="rounded-xl aspect-[4/3] relative overflow-hidden bg-surface">
            <BrowserMorph />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="glass absolute -bottom-5 -left-6 px-3.5 py-2.5 rounded-2xl text-[12.5px] font-semibold flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-pink" />
            +40% găsibil pe Google
          </motion.div>
        </div>
        <div className="text-center text-xs text-muted mt-4">
          asta se schimbă în 3 zile
        </div>
      </motion.div>
    </section>
  );
}

function BrowserMorph() {
  return (
    <>
      <motion.div
        animate={{ opacity: [1, 1, 0, 0, 1] }}
        transition={{ duration: 6, repeat: Infinity, times: [0, 0.4, 0.55, 0.9, 1] }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-[#726f8f]"
      >
        <div className="font-display text-[42px] font-bold text-[#4a4768] mb-1">
          404
        </div>
        <div className="text-sm">site-ul tău nu există încă</div>
      </motion.div>
      <motion.div
        animate={{ opacity: [0, 0, 1, 1, 0] }}
        transition={{ duration: 6, repeat: Infinity, times: [0, 0.4, 0.55, 0.9, 1] }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
        style={{
          background:
            "linear-gradient(160deg,rgba(138,15,26,0.18),rgba(215,38,61,0.12))",
        }}
      >
        <div className="flex gap-3.5 text-[10px] opacity-60 mb-4">
          <span>Acasă</span>
          <span>Servicii</span>
          <span>Contact</span>
        </div>
        <div className="font-display text-xl font-semibold mb-2.5 grad-text">
          Afacerea Ta, Online
        </div>
        <div className="bg-gradient-to-r from-violet to-cyan text-bg text-[11px] font-bold px-4 py-2 rounded-full">
          Sună acum
        </div>
      </motion.div>
    </>
  );
}
