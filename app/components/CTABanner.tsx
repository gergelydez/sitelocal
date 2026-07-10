"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

export default function CTABanner() {
  return (
    <section className="max-w-[1120px] mx-auto px-6 py-8">
      <Reveal>
        <div className="rounded-2xl p-10 md:p-14 text-center bg-surface border border-white/10">
          <h2 className="font-display font-bold text-[26px] md:text-[32px] mb-4 max-w-[26ch] mx-auto tracking-tight">
            Concurența ta are deja un site. Tu unde ești?
          </h2>
          <p className="text-muted text-[15.5px] mb-8 max-w-[46ch] mx-auto">
            Nu costă nimic să vezi cum ar arăta al tău. Durează 60 de secunde
            să completezi formularul.
          </p>
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="#demo"
            className="btn-shine inline-flex items-center gap-2.5 px-7 py-4 rounded-lg font-semibold text-[15px] text-white bg-trust hover:bg-trust/90 cursor-pointer"
          >
            Solicită Demo Gratuit Live
            <ArrowRight size={16} />
          </motion.a>
        </div>
      </Reveal>
    </section>
  );
}
