"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import LeadForm from "../components/LeadForm";
import WhatsAppButton from "../components/WhatsAppButton";
import AmbientBackground from "../components/AmbientBackground";
import { trackEvent } from "../lib/pixel-client";

export default function FormularClient() {
  useEffect(() => {
    trackEvent("ViewContent", { content_name: "pagina_formular" });
  }, []);

  return (
    <>
      <AmbientBackground />
      <div className="relative z-10 min-h-screen flex flex-col">
        <header className="max-w-[1120px] mx-auto w-full px-6 py-6 flex items-center justify-between">
          <div className="font-display font-bold text-[15px] tracking-tight">
            site<span className="text-trust">local</span>.ro
          </div>
          <Link
            href="/"
            className="text-[13.5px] text-muted hover:text-text transition-colors"
          >
            Vezi tot site-ul →
          </Link>
        </header>

        <main className="flex-1 flex items-center justify-center px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-[460px]"
          >
            <div className="text-center mb-7">
              <div className="glass inline-flex items-center gap-2 text-[12.5px] font-medium text-muted px-3.5 py-1.5 rounded-full mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald" />
                Doar în Baia Mare și Maramureș
              </div>
              <h1 className="font-display font-bold text-[28px] md:text-[32px] leading-[1.15] mb-3 tracking-tight">
                Vezi demo-ul GRATUIT al site-ului tău, în 24h
              </h1>
              <p className="text-muted text-[14.5px] leading-relaxed">
                Completezi formularul, primești o schiță live în 24 de ore.
                Îți place? Site-ul complet e gata în 3 zile. Nu-ți place? Nu
                plătești nimic.
              </p>
            </div>

            <div className="bg-surface border border-white/10 rounded-2xl p-7 md:p-8">
              <LeadForm />
            </div>

            <p className="text-center text-muted text-[13px] mt-6">
              Vrei să vezi și restul site-ului mai întâi?{" "}
              <Link href="/" className="text-trust hover:text-trust/80 transition-colors">
                Explorează aici
              </Link>
            </p>
          </motion.div>
        </main>
      </div>
      <WhatsAppButton />
    </>
  );
}
