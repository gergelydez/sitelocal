"use client";

import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import TiltCard from "./TiltCard";

const PROJECTS = [
  {
    name: "Flo Detailing Auto",
    url: "https://flo-detailing-ecru.vercel.app/",
    tag: "Auto & Detailing",
  },
  {
    name: "Create Beauty Salon",
    url: "https://create-beauty.vercel.app/",
    tag: "Beauty & Saloane",
  },
  {
    name: "Dentist Site",
    url: "https://dentist-site-eight.vercel.app/",
    tag: "Sănătate & Clinici",
  },
  {
    name: "Magic Gym",
    url: "https://magic-gym-mu.vercel.app/",
    tag: "Fitness & Wellness",
  },
  {
    name: "Karma Fitness",
    url: "https://karma-fitness.vercel.app/",
    tag: "Sport & Sănătate",
  },
];

export default function ProjectsShowcase() {
  return (
    <section id="proiecte" className="max-w-[1120px] mx-auto px-6 py-20 md:py-24">
      <Reveal className="mb-10">
        <div className="text-trust text-[12.5px] font-semibold uppercase tracking-wider mb-3">
          Portofoliu
        </div>
        <h2 className="font-display font-bold text-[28px] md:text-[32px] tracking-tight mb-2">
          Proiectele noastre
        </h2>
        <p className="text-muted text-[15px] max-w-[54ch]">
          Schițe reale transformate în afaceri profitabile local. Exact
          genul de demo pe care îl pornești gratuit în 24 de ore.
        </p>
      </Reveal>

      <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.06} className="snap-start shrink-0">
            <TiltCard className="w-[240px] h-full">
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between h-full min-h-[168px] bg-surface border border-white/10 rounded-2xl p-6 hover:border-trust/40 transition-colors"
              >
                <div>
                  <div className="text-[11px] font-semibold text-emerald uppercase tracking-wider mb-3">
                    {p.tag}
                  </div>
                  <h3 className="font-display font-semibold text-[17px] leading-snug">
                    {p.name}
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 text-[13px] font-medium text-muted group-hover:text-trust transition-colors mt-6">
                  Vezi site-ul
                  <ArrowUpRight
                    size={15}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </div>
              </a>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
