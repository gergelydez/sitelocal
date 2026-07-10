"use client";

import { Check } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "./Reveal";

const TIERS = [
  {
    name: "Demo",
    price: "Gratuit",
    highlight: false,
    features: ["Schiță live în 24h", "Adaptat afacerii tale", "Fără nicio obligație"],
  },
  {
    name: "Site prezentare",
    price: "799 lei",
    highlight: true,
    features: [
      "Site complet, gata în 3 zile",
      "Design personalizat, nu template",
      "Optimizat pentru mobil",
    ],
  },
  {
    name: "Site + mentenanță",
    price: "799 lei + 99 lei/lună",
    highlight: false,
    features: ["Tot din pachetul Site prezentare", "Actualizări continue", "Suport direct pe WhatsApp"],
  },
];

export default function Pricing() {
  return (
    <section id="preturi" className="max-w-[1120px] mx-auto px-6 py-20 md:py-24">
      <Reveal className="mb-10">
        <div className="text-trust text-[12.5px] font-semibold uppercase tracking-wider mb-3">
          Prețuri
        </div>
        <h2 className="font-display font-bold text-[28px] md:text-[32px] tracking-tight mb-2">
          Simplu, fără cifre ascunse
        </h2>
        <p className="text-muted text-[15px] max-w-[54ch]">
          Prețul de mai jos e pentru un site standard de prezentare. Dacă
          afacerea ta are nevoie de mai multe pagini sau funcționalități,
          stabilim clar costul suplimentar după ce vezi demo-ul.
        </p>
      </Reveal>

      <StaggerGroup className="grid md:grid-cols-3 gap-5">
        {TIERS.map((t) => (
          <StaggerItem key={t.name}>
            <div
              className={`rounded-2xl p-7 h-full flex flex-col ${
                t.highlight
                  ? "bg-surface border-2 border-trust"
                  : "bg-surface border border-white/8"
              }`}
            >
              <h3 className="font-display font-semibold text-[17px] mb-1">{t.name}</h3>
              <div className="text-trust font-bold text-[20px] mb-5">{t.price}</div>
              <ul className="flex flex-col gap-2.5 mb-7 flex-1">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[13.5px] text-muted">
                    <Check size={15} className="text-emerald shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#demo"
                className={`text-center py-3 rounded-lg font-semibold text-[14px] transition-colors ${
                  t.highlight
                    ? "bg-trust text-white hover:bg-trust/90"
                    : "bg-white/[0.04] border border-white/10 hover:bg-white/[0.07]"
                }`}
              >
                Solicită ofertă
              </a>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
