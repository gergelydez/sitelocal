"use client";

import { Reveal } from "./Reveal";
import TiltCard from "./TiltCard";

const CONCEPTS = [
  { tag: "Auto", accent: "#3B82F6" },
  { tag: "Horeca", accent: "#F59E0B" },
  { tag: "Beauty & Health", accent: "#EC4899" },
  { tag: "Construcții", accent: "#10B981" },
];

export default function ProjectsShowcase() {
  return (
    <section className="max-w-[1120px] mx-auto px-6 py-20 md:py-24">
      <Reveal className="mb-10">
        <div className="text-trust text-[12.5px] font-semibold uppercase tracking-wider mb-3">
          Direcție vizuală
        </div>
        <h2 className="font-display font-bold text-[28px] md:text-[32px] tracking-tight mb-2">
          Așa ar putea arăta site-ul tău
        </h2>
        <p className="text-muted text-[15px] max-w-[54ch]">
          Concepte ilustrative, nu capturi de la clienți reali — fiecare
          demo e construit de la zero, pe stilul afacerii tale.
        </p>
      </Reveal>

      <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6">
        {CONCEPTS.map((c, i) => (
          <Reveal key={c.tag} delay={i * 0.06} className="snap-start shrink-0">
            <TiltCard className="w-[260px] bg-surface border border-white/10 rounded-2xl p-3">
              <div className="flex gap-1.5 mb-2.5 pl-1">
                {[0, 1, 2].map((d) => (
                  <span key={d} className="w-2 h-2 rounded-full bg-white/15" />
                ))}
              </div>
              <div className="rounded-xl overflow-hidden aspect-[4/3] bg-bg2 flex flex-col p-3 gap-2">
                <div
                  className="h-2 w-2/5 rounded-full opacity-70"
                  style={{ background: c.accent }}
                />
                <div
                  className="flex-1 rounded-lg opacity-[0.14]"
                  style={{ background: c.accent }}
                />
                <div className="flex gap-1.5">
                  <div className="h-2 flex-1 rounded-full bg-white/10" />
                  <div className="h-2 flex-1 rounded-full bg-white/10" />
                </div>
                <div
                  className="h-6 w-1/2 rounded-lg self-start"
                  style={{ background: c.accent }}
                />
              </div>
              <div className="text-[12.5px] font-semibold text-muted text-center py-3">
                Concept — {c.tag}
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
