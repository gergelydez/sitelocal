"use client";

import { Reveal, StaggerGroup, StaggerItem } from "./Reveal";
import { motion } from "framer-motion";

const STEPS = [
  {
    num: "01",
    title: "Completezi formularul",
    text: "Nume, firmă, telefon și domeniul de activitate. Sub un minut.",
  },
  {
    num: "02",
    title: "Primești demo-ul în 24h",
    text: "Construiesc prima variantă, personalizată pe afacerea ta reală.",
  },
  {
    num: "03",
    title: "Decizi tu",
    text: "Îți place? Mergem mai departe. Nu? Nu plătești nimic.",
  },
];

export default function HowItWorks() {
  return (
    <section className="max-w-[1120px] mx-auto px-6 py-20 md:py-28">
      <Reveal>
        <div className="text-cyan text-[12.5px] font-bold uppercase tracking-wider mb-3">
          Cum funcționează
        </div>
        <h2 className="font-display font-bold text-[30px] md:text-[34px] max-w-[22ch] mb-12">
          Trei pași, fără complicații
        </h2>
      </Reveal>

      <StaggerGroup className="grid md:grid-cols-3 gap-5">
        {STEPS.map((s) => (
          <StaggerItem key={s.num}>
            <motion.div
              whileHover={{ y: -6, borderColor: "rgba(138,15,26,0.4)" }}
              className="glass rounded-[20px] p-7 h-full cursor-default"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet to-cyan flex items-center justify-center font-bold text-[15px] text-bg mb-5">
                {s.num}
              </div>
              <h3 className="text-[18px] font-semibold mb-2">{s.title}</h3>
              <p className="text-[14px] text-muted leading-relaxed">{s.text}</p>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
