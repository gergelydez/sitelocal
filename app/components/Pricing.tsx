"use client";

import { Check } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "./Reveal";

const TIERS = [
  {
    name: "Startup",
    price: "699 lei",
    highlight: false,
    delivery: "Livrare în 3 zile (Demo în 24h)",
    features: [
      "Design modern, 100% optimizat mobil",
      "Structură eficientă One-Page (Landing Page)",
      "Formular de contact direct + buton rapid WhatsApp",
      "Integrare locație Google Maps & Social Media",
      "Conectare domeniu web & email profesional",
    ],
  },
  {
    name: "Professional",
    price: "1.199 lei",
    highlight: true,
    badge: "Cel mai popular",
    delivery: "Livrare în 5-7 zile (Demo în 24h)",
    features: [
      "Tot din pachetul Startup",
      "Până la 5 pagini separate (Acasă, Despre Noi, Servicii, Portofoliu, Contact)",
      "Optimizare SEO locală de bază pentru Baia Mare / Maramureș",
      "Sistem de programări online sau meniu digital interactiv",
      "Instalare și configurare Meta Pixel + Conversions API (gata de reclame)",
    ],
  },
  {
    name: "E-commerce / Premium",
    price: "2.199 lei",
    highlight: false,
    delivery: "Livrare în 7-14 zile (Demo în 24h)",
    features: [
      "Tot din pachetul Professional",
      "Magazin online complet și rapid (platformă ultra-stabilă)",
      "Configurare catalog produse, categorii și coș de cumpărături",
      "Integrare plăți cu cardul (Netopia/Stripe) & AWB automat curier (Fan/DPD)",
    ],
    footnote:
      "Prețul nu include abonamentul lunar al platformei de e-commerce (ex: taxa Shopify), necesar pentru funcționarea magazinului.",
  },
];

export default function Pricing() {
  return (
    <section id="preturi" className="max-w-[1120px] mx-auto px-6 py-20 md:py-24">
      <Reveal className="mb-10">
        <div className="text-trust text-[12.5px] font-semibold uppercase tracking-wider mb-3">
          Pachete & prețuri
        </div>
        <h2 className="font-display font-bold text-[28px] md:text-[32px] tracking-tight mb-2">
          Trei pachete, fără cifre ascunse
        </h2>
        <p className="text-muted text-[15px] max-w-[54ch]">
          Alegi pachetul potrivit afacerii tale — demo-ul gratuit în 24h e
          identic, indiferent de pachet.
        </p>
      </Reveal>

      <StaggerGroup className="grid md:grid-cols-3 gap-5 mb-8">
        {TIERS.map((t) => (
          <StaggerItem key={t.name}>
            <div
              className={`relative rounded-2xl p-7 h-full flex flex-col ${
                t.highlight
                  ? "bg-surface border-2 border-trust"
                  : "bg-surface border border-white/8"
              }`}
            >
              {t.badge && (
                <div className="absolute -top-3 left-7 bg-trust text-white text-[11px] font-semibold px-3 py-1 rounded-full">
                  {t.badge}
                </div>
              )}
              <h3 className="font-display font-semibold text-[17px] mb-1">{t.name}</h3>
              <div className="text-trust font-bold text-[24px] mb-1">{t.price}</div>
              <div className="text-muted text-[12px] mb-5">{t.delivery}</div>
              <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[13.5px] text-muted">
                    <Check size={15} className="text-emerald shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              {t.footnote && (
                <p className="text-[11.5px] text-muted/80 leading-relaxed mb-5 border-t border-white/8 pt-4">
                  {t.footnote}
                </p>
              )}
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

      <Reveal>
        <div className="glass rounded-xl px-6 py-5 flex items-center justify-center gap-3 max-w-[640px] mx-auto text-center">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald shrink-0" />
          <p className="text-[13.5px] text-muted">
            <span className="text-text font-semibold">Zero risc:</span>{" "}
            plătești doar dacă îți place schița primită în 24 de ore. Fără
            obligații.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
