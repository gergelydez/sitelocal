"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { Reveal } from "./Reveal";

const FAQS = [
  {
    q: "Chiar e gratis prima variantă?",
    a: "Da. Construiesc prima versiune a site-ului fără nicio plată în avans. O vezi, și abia apoi decizi dacă mergem mai departe.",
  },
  {
    q: "Ce se întâmplă dacă nu-mi place?",
    a: "Absolut nimic. Nu plătești, nu exiști cu vreo obligație. Am construit procesul așa intenționat, ca riscul să fie al meu, nu al tău.",
  },
  {
    q: "Cât durează să am site-ul complet, nu doar demo-ul?",
    a: "De obicei 3-5 zile lucrătoare de la momentul în care confirmi că mergem mai departe, în funcție de câte pagini și cât conținut ai pregătit.",
  },
  {
    q: "Mă ocup și de găzduire și domeniu?",
    a: "Da, te ghidez pas cu pas sau mă ocup direct, în funcție de ce preferi. Explic clar costurile, fără taxe ascunse.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="max-w-[760px] mx-auto px-6 py-20 md:py-24">
      <Reveal className="mb-10">
        <div className="text-cyan text-[12.5px] font-bold uppercase tracking-wider mb-3">
          Întrebări frecvente
        </div>
        <h2 className="font-display font-bold text-[28px] md:text-[32px]">
          Ce te-ar putea reține
        </h2>
      </Reveal>

      <div className="flex flex-col gap-3">
        {FAQS.map((item, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={item.q} delay={i * 0.05}>
              <div className="glass rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-[15px]">{item.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0 text-cyan"
                  >
                    <Plus size={18} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <p className="px-6 pb-5 text-[14px] text-muted leading-relaxed">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
