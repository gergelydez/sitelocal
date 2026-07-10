"use client";

import { Reveal, StaggerGroup, StaggerItem } from "./Reveal";
import { motion } from "framer-motion";

const STEPS = [
  {
    num: "01",
    title: "Completezi formularul",
    text: "Nume, firmă, telefon și domeniul de activitate. Durează 60 de secunde.",
  },
  {
    num: "02",
    title: "Primești demo-ul în 24h",
    text: "O schiță live, personalizată 100% pe afacerea ta reală — gata în maximum 24 de ore.",
  },
  {
    num: "03",
    title: "Decizi tu, fără risc",
    text: "Îți place demo-ul? Site-ul complet e gata în 3 zile. Nu-ți place? Rămâi cu ideile și nu plătești nimic.",
  },
];

export default function HowItWorks() {
  return (
    <section id="cum-functioneaza" className="max-w-[1120px] mx-auto px-6 py-20 md:py-28">
      <Reveal>
        <div className="text-trust text-[12.5px] font-semibold uppercase tracking-wider mb-3">
          Zero risc
        </div>
        <h2 className="font-display font-bold text-[28px] md:text-[34px] max-w-[24ch] mb-12 tracking-tight">
          Demo în 24h, site complet în 3 zile — fără să plătești în avans
        </h2>
      </Reveal>

      <StaggerGroup className="grid md:grid-cols-3 gap-5">
        {STEPS.map((s) => (
          <StaggerItem key={s.num}>
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-surface border border-white/8 rounded-2xl p-7 h-full cursor-default transition-colors hover:border-white/16"
            >
              <div className="text-[13px] font-semibold text-trust mb-5 tabular-nums">
                {s.num}
              </div>
              <h3 className="text-[17px] font-semibold mb-2">{s.title}</h3>
              <p className="text-[14px] text-muted leading-relaxed">{s.text}</p>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
