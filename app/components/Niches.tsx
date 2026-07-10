"use client";

import { Reveal } from "./Reveal";
import { ArrowUpRight } from "lucide-react";

const NICHES = [
  {
    tag: "Auto",
    name: "Service & Detailing",
    benefit:
      "Clienți care programează direct online, nu un telefon ratat în timp ce ești sub mașină.",
  },
  {
    tag: "Horeca",
    name: "Pensiuni & Restaurante",
    benefit:
      "Rezervări directe pe site-ul tău — scapi de comisionul Booking.com la fiecare noapte vândută.",
  },
  {
    tag: "Beauty & Health",
    name: "Saloane & Clinici",
    benefit:
      "Portofoliu vizual și programare online — clienți care te aleg pe tine, nu o platformă terță.",
  },
  {
    tag: "Servicii",
    name: "Meseriași & Construcții",
    benefit:
      "Portofoliu de lucrări reale + formular de ofertă rapidă — clienți serioși, găsiți pe Google.",
  },
];

export default function Niches() {
  return (
    <section className="max-w-[1120px] mx-auto px-6 py-20 md:py-24">
      <Reveal>
        <div className="text-trust text-[12.5px] font-semibold uppercase tracking-wider mb-3">
          Pentru cine construim
        </div>
        <h2 className="font-display font-bold text-[28px] md:text-[34px] max-w-[26ch] mb-2 tracking-tight">
          Validăm afaceri locale, nu template-uri generice
        </h2>
        <p className="text-muted text-[15px] max-w-[54ch] mb-10 leading-relaxed">
          Fiecare domeniu are alt mod de a aduce clienți. Site-ul e construit
          în jurul rezultatului pe care ți-l dorești, nu al unui format fix.
        </p>
      </Reveal>

      <div className="border-t border-white/8">
        {NICHES.map((n, i) => (
          <Reveal key={n.name} delay={i * 0.06}>
            <div className="group grid md:grid-cols-[200px_1fr_auto] gap-2 md:gap-8 items-start md:items-center py-7 border-b border-white/8">
              <div className="text-[12px] font-semibold text-emerald uppercase tracking-wider">
                {n.tag}
              </div>
              <div>
                <h3 className="font-display font-semibold text-[18px] mb-1.5">
                  {n.name}
                </h3>
                <p className="text-[14px] text-muted leading-relaxed max-w-[56ch]">
                  {n.benefit}
                </p>
              </div>
              <ArrowUpRight
                size={18}
                className="hidden md:block text-muted group-hover:text-trust group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
              />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
