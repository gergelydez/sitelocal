"use client";

import { motion } from "framer-motion";
import WaLink, { WaIcon } from "./WaLink";

export default function WhatsAppButton() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.4 }}
      className="fixed bottom-5 right-5 md:bottom-7 md:right-7 z-50"
    >
      <WaLink
        source="float_button"
        ariaLabel="Scrie-mi pe WhatsApp"
        className="flex items-center gap-2 h-14 pl-4 pr-5 rounded-full bg-emerald text-white font-semibold text-[14.5px] shadow-lg shadow-black/30 hover:scale-105 transition-transform"
      >
        <WaIcon size={24} />
        <span>WhatsApp</span>
      </WaLink>
    </motion.div>
  );
}
