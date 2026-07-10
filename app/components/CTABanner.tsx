"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

export default function CTABanner() {
  return (
    <section className="max-w-[1120px] mx-auto px-6 py-8">
      <Reveal>
        <div className="relative rounded-[28px] overflow-hidden p-10 md:p-14 text-center bg-gradient-to-br from-violet/25 via-cyan/10 to-pink/15 border border-white/10">
          <div className="absolute inset-0 glow-ring opacity-20 blur-3xl" />
          <div className="relative">
            <h2 className="font-display font-bold text-[26px] md:text-[34px] mb-4 max-w-[24ch] mx-auto">
              Concurența ta are deja site. Tu unde ești?
            </h2>
            <p className="text-muted text-[15.5px] mb-8 max-w-[46ch] mx-auto">
              Nu costă nimic să vezi cum ar arăta al tău. Durează un minut să
              completezi formularul.
            </p>
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              href="#demo"
              className="btn-shine inline-flex items-center gap-2.5 px-7 py-4 rounded-full font-bold text-[15.5px] text-white cursor-pointer shadow-[0_0_40px_rgba(138,15,26,0.35)]"
              style={{
                backgroundImage: "linear-gradient(100deg,#3730A3,#2563EB,#0D9488)",
              }}
            >
              Vreau demo-ul gratuit
              <ArrowRight size={16} />
            </motion.a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
