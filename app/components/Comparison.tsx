"use client";

import { Check, X } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "./Reveal";
import { WHATSAPP_URL } from "../lib/contact";
import { trackEvent } from "../lib/pixel-client";

const ROWS = [
  { label: "Vezi site-ul înainte să plătești", them: "Uneori, după 3–5 zile", us: "Da, demo în 24h" },
  { label: "Preț site de prezentare", them: "2.000 – 3.000+ lei", us: "700 lei, preț fix" },
  { label: "Site gata în", them: "1 – 3 săptămâni", us: "48 de ore" },
  { label: "Avans", them: "30 – 50% la semnare", us: "0 lei, plătești după" },
  { label: "Cu cine vorbești", them: "Formular, apoi un consultant", us: "Direct cu mine, pe WhatsApp" },
];

export default function Comparison() {
  return (
    <section id="comparatie" className="max-w-[880px] mx-auto px-6 py-20 md:py-24">
      <Reveal className="mb-10 text-center">
        <div className="text-trust text-[12.5px] font-semibold uppercase tracking-wider mb-3">
          De ce Site Local
        </div>
        <h2 className="font-display font-bold text-[28px] md:text-[36px] tracking-tight mb-3">
          Același site. <span className="grad-text">Fără riscul tău.</span>
        </h2>
        <p className="text-muted text-[15px] max-w-[52ch] mx-auto">
          Cum arată o comandă de site la o agenție obișnuită, față de cum
          lucrez eu.
        </p>
      </Reveal>

      <div className="rounded-3xl border border-white/10 overflow-hidden bg-surface">
        <div className="grid grid-cols-[1.1fr_1fr_1fr] text-[12px] md:text-[13px] font-semibold uppercase tracking-wider border-b border-white/10">
          <div className="p-4 md:p-5 text-muted"> </div>
          <div className="p-4 md:p-5 text-muted text-center">Agenție obișnuită</div>
          <div className="p-4 md:p-5 text-center text-emerald bg-emerald/[0.07]">Site Local</div>
        </div>
        <StaggerGroup>
          {ROWS.map((r) => (
            <StaggerItem key={r.label}>
              <div className="grid grid-cols-[1.1fr_1fr_1fr] border-b border-white/[0.06] last:border-0 text-[13.5px] md:text-[15px]">
                <div className="p-4 md:p-5 font-medium">{r.label}</div>
                <div className="p-4 md:p-5 text-muted flex items-start gap-2 justify-center text-center">
                  <X size={15} className="mt-0.5 shrink-0 text-red-400/80 hidden md:block" />
                  {r.them}
                </div>
                <div className="p-4 md:p-5 bg-emerald/[0.07] flex items-start gap-2 justify-center text-center font-semibold">
                  <Check size={15} className="mt-0.5 shrink-0 text-emerald hidden md:block" />
                  {r.us}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>

      <Reveal className="mt-8 text-center">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("Contact", { content_name: "whatsapp_comparison" })}
          className="btn-shine inline-flex items-center justify-center gap-2.5 bg-emerald hover:bg-emerald/90 text-white font-semibold text-[15.5px] px-7 py-4 rounded-full shadow-lg shadow-emerald/25"
        >
          Vreau demo-ul gratuit
        </a>
        <p className="text-muted text-[12.5px] mt-3">Fără obligații. Nu-ți place demo-ul? Nu plătești nimic.</p>
      </Reveal>
    </section>
  );
}
