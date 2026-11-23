"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trackEvent } from "../lib/pixel-client";
import { PHONE_DISPLAY } from "../lib/contact";
import WaLink from "./WaLink";

const SCREENS = [
  { src: "/portfolio/auto.jpg", label: "Service auto" },
  { src: "/portfolio/dentist.jpg", label: "Clinică dentară" },
  { src: "/portfolio/restaurant.jpg", label: "Restaurant" },
  { src: "/portfolio/gym.jpg", label: "Sală de fitness" },
  { src: "/portfolio/salon.jpg", label: "Salon" },
];

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3zm0 23.6a10.6 10.6 0 0 1-5.4-1.5l-.4-.2-3.9 1 1-3.8-.3-.4A10.6 10.6 0 1 1 16 26.6zm5.8-7.9c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a8.7 8.7 0 0 1-4.3-3.8c-.3-.6.3-.5.9-1.7.1-.2 0-.4 0-.5l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.9.4 3.6 3.6 0 0 0-1.1 2.7 6.3 6.3 0 0 0 1.3 3.3 14.4 14.4 0 0 0 5.5 4.9c2 .9 2.8.9 3.8.8a3.3 3.3 0 0 0 2.2-1.5 2.7 2.7 0 0 0 .2-1.5c-.1-.2-.3-.3-.5-.4z" />
    </svg>
  );
}

function PhoneCarousel() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % SCREENS.length), 2600);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="relative mx-auto w-[260px] md:w-[300px]">
      <div className="absolute -inset-10 rounded-full bg-trust/20 blur-3xl" aria-hidden="true" />
      <div className="relative rounded-[44px] border-[10px] border-[#1c1c21] bg-black shadow-2xl shadow-black/60 overflow-hidden aspect-[390/780]">
        <div className="absolute left-1/2 top-2.5 -translate-x-1/2 w-[86px] h-[24px] rounded-full bg-black z-20" />
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.img
            key={SCREENS[i].src}
            src={SCREENS[i].src}
            alt={`Exemplu de site pentru ${SCREENS[i].label.toLowerCase()}`}
            initial={{ opacity: 0, scale: 1.04, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
        </AnimatePresence>
      </div>
      <div className="mt-5 flex justify-center gap-1.5" aria-hidden="true">
        {SCREENS.map((s, k) => (
          <span
            key={s.src}
            className={`h-1.5 rounded-full transition-all duration-500 ${k === i ? "w-6 bg-white" : "w-1.5 bg-white/25"}`}
          />
        ))}
      </div>
      <div className="mt-3 text-center text-[12.5px] text-muted">
        Exemplu: <span className="text-text">{SCREENS[i].label}</span>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="max-w-[1120px] mx-auto px-6 grid md:grid-cols-[1.15fr_1fr] gap-12 md:gap-10 items-center pt-12 md:pt-20 pb-16">
      <div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass inline-flex items-center gap-2 text-[12.5px] font-medium text-muted px-3.5 py-1.5 rounded-full mb-7"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald" />
          Site-uri pentru afaceri locale din toată România
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08 }}
          className="font-display font-bold text-[38px] md:text-[54px] leading-[1.05] mb-6 tracking-tight"
        >
          Vezi site-ul afacerii tale{" "}
          <span className="grad-text">înainte să plătești.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.16 }}
          className="text-[16.5px] md:text-[17.5px] text-muted max-w-[46ch] mb-8 leading-relaxed"
        >
          Îți construiesc gratuit un demo cu numele, serviciile și prețurile
          firmei tale, în 24 de ore. Îți place? Plătești 700 lei și site-ul e
          gata în 48 de ore. Nu-ți place? Nu plătești nimic.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.24 }}
          className="flex flex-col sm:flex-row gap-3 mb-7"
        >
          <WaLink
            source="hero"
            className="btn-shine inline-flex items-center justify-center gap-2.5 bg-emerald hover:bg-emerald/90 text-white font-semibold text-[16px] px-7 py-4 rounded-full shadow-lg shadow-emerald/25"
          >
            <WhatsAppIcon />
            Cere demo-ul pe WhatsApp
          </WaLink>
          <a
            href="#demo"
            className="inline-flex items-center justify-center gap-2 glass hover:bg-white/[0.06] text-text font-medium text-[15px] px-6 py-4 rounded-full transition-colors"
          >
            Prefer formularul
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.65, delay: 0.28 }}
          className="text-muted text-[14px] -mt-3 mb-6"
        >
          Sau scrie-mi direct pe WhatsApp:{" "}
          <WaLink source="hero_numar" className="text-emerald font-semibold whitespace-nowrap hover:underline">
            {PHONE_DISPLAY}
          </WaLink>
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.65, delay: 0.32 }}
          className="flex gap-x-5 gap-y-2 text-[13px] text-muted flex-wrap"
        >
          {["Demo gratuit în 24h", "Site gata în 48h", "700 lei, preț fix"].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-trust" />
              {t}
            </span>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <PhoneCarousel />
      </motion.div>
    </section>
  );
}
