"use client";

import { motion } from "framer-motion";
import LeadForm from "./LeadForm";

export default function Hero() {
  return (
    <section className="max-w-[1120px] mx-auto px-6 grid md:grid-cols-[1.1fr_1fr] gap-12 md:gap-16 items-start pt-14 md:pt-20 pb-16">
      <div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass inline-flex items-center gap-2 text-[12.5px] font-medium text-muted px-3.5 py-1.5 rounded-full mb-7"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald" />
          Doar în Baia Mare și Maramureș — sprijinim afacerile locale
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08 }}
          className="font-display font-bold text-[36px] md:text-[48px] leading-[1.12] mb-6 tracking-tight"
        >
          Afacerea ta din Maramureș merită un site care vinde.{" "}
          <span className="grad-text">Vezi cum arată al tău GRATUIT, în 3 zile.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.16 }}
          className="text-[16.5px] md:text-[17.5px] text-muted max-w-[48ch] mb-8 leading-relaxed"
        >
          Construiesc gratuit o schiță demo, adaptată 100% afacerii tale.
          O vezi live, decizi dacă merită — și plătești un preț corect doar
          dacă îți place. Zero risc, zero presiune.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.65, delay: 0.26 }}
          className="flex gap-5 text-[13px] text-muted flex-wrap"
        >
          {[
            "Gata în 3 zile",
            "Plătești doar dacă îți place",
            "Construit de un expert local",
          ].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-trust" />
              {t}
            </span>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        id="hero-form"
        className="bg-surface border border-white/10 rounded-2xl p-7 md:p-8"
      >
        <div className="text-[12.5px] font-semibold text-emerald uppercase tracking-wider mb-2">
          Fără obligații
        </div>
        <h2 className="font-display font-bold text-[21px] mb-1.5">
          Solicită demo-ul gratuit
        </h2>
        <p className="text-muted text-[13.5px] mb-6 leading-relaxed">
          Completezi acum, primești schița site-ului tău în 3 zile.
        </p>
        <LeadForm />
      </motion.div>
    </section>
  );
}
