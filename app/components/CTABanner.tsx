"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import WaLink, { WaIcon } from "./WaLink";
import { PHONE_DISPLAY } from "../lib/contact";

export default function CTABanner() {
  return (
    <section className="max-w-[1120px] mx-auto px-6 py-8">
      <Reveal>
        <div className="rounded-2xl p-10 md:p-14 text-center bg-surface border border-white/10">
          <h2 className="font-display font-bold text-[26px] md:text-[32px] mb-4 max-w-[26ch] mx-auto tracking-tight">
            Concurența ta are deja un site. Tu unde ești?
          </h2>
          <p className="text-muted text-[15.5px] mb-8 max-w-[46ch] mx-auto">
            Nu costă nimic să vezi cum ar arăta al tău. Scrie-mi pe WhatsApp
            numele afacerii și primești demo-ul în 24 de ore.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <WaLink
            source="cta_banner"
            className="btn-shine inline-flex items-center gap-2.5 px-7 py-4 rounded-lg font-semibold text-[15px] text-white bg-emerald hover:bg-emerald/90"
          >
            <WaIcon />
            Scrie-mi pe WhatsApp
          </WaLink>
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
          <p className="text-muted text-[14px] mt-5">
            WhatsApp: <WaLink source="cta_banner_numar" className="text-emerald font-semibold hover:underline">{PHONE_DISPLAY}</WaLink>
          </p>
        </div>
      </Reveal>
    </section>
  );
}
