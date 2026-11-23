"use client";

import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import TiltCard from "./TiltCard";

const DEMOS = [
  { name: "Service auto", slug: "auto", tag: "Auto" },
  { name: "Clinică dentară", slug: "dentist", tag: "Sănătate" },
  { name: "Restaurant", slug: "restaurant", tag: "Horeca" },
  { name: "Sală de fitness", slug: "gym", tag: "Sport" },
  { name: "Salon de înfrumusețare", slug: "salon", tag: "Beauty" },
  { name: "Instalator", slug: "instalator", tag: "Meseriași" },
];

const PROJECTS = [
  { name: "Flo Detailing Auto", url: "https://flo-detailing-ecru.vercel.app/", tag: "Auto & Detailing" },
  { name: "Create Beauty Salon", url: "https://create-beauty.vercel.app/", tag: "Beauty & Saloane" },
  { name: "Cabinet stomatologic", url: "https://dentist-site-eight.vercel.app/", tag: "Sănătate & Clinici" },
  { name: "Magic Gym", url: "https://magic-gym-mu.vercel.app/", tag: "Fitness & Wellness" },
  { name: "Karma Fitness", url: "https://karma-fitness.vercel.app/", tag: "Sport & Sănătate" },
  { name: "Han tradițional la munte", url: "https://hanulizvorulrece.ro/", tag: "Cazare & Restaurant" },
  { name: "Pensiune la munte", url: "https://outreach-pro-app.vercel.app/p/pensiunea-ideal-0f0918", tag: "Cazare" },
  { name: "Casă de vacanță", url: "https://outreach-pro-app.vercel.app/p/casa-roxana-fa453f", tag: "Cazare" },
  { name: "Casă de oaspeți", url: "https://outreach-pro-app.vercel.app/p/casa-paula-540ba7", tag: "Cazare" },
  { name: "Make-up artist", url: "https://outreach-pro-app.vercel.app/p/iris-sandor-machiaj-profesional-sector-1-e2af19", tag: "Beauty" },
  { name: "Închirieri autocare", url: "https://outreach-pro-app.vercel.app/p/raul-expres-inchirieri-autocare-50b8e0", tag: "Transport & Auto" },
];

export default function ProjectsShowcase() {
  return (
    <section id="proiecte" className="max-w-[1120px] mx-auto px-6 py-20 md:py-24">
      <Reveal className="mb-10">
        <div className="text-trust text-[12.5px] font-semibold uppercase tracking-wider mb-3">
          Portofoliu
        </div>
        <h2 className="font-display font-bold text-[28px] md:text-[32px] tracking-tight mb-2">
          Așa poate arăta site-ul tău
        </h2>
        <p className="text-muted text-[15px] max-w-[54ch]">
          Exemple de design pe domenii. Apasă pe oricare și deschide-l pe
          telefon: exact așa primești și tu demo-ul, gratuit, în 24 de ore.
        </p>
      </Reveal>

      <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-6 -mx-6 px-6">
        {DEMOS.map((d, i) => (
          <Reveal key={d.slug} delay={i * 0.06} className="snap-start shrink-0">
            <TiltCard className="w-[220px] md:w-[240px]">
              <a
                href={`/demo/${d.slug}.html`}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="relative rounded-[30px] border-[7px] border-[#1c1c21] bg-black overflow-hidden aspect-[390/700] shadow-xl shadow-black/40 group-hover:border-trust/50 transition-colors">
                  <img
                    src={`/portfolio/${d.slug}.jpg`}
                    alt={`Exemplu de site: ${d.name}`}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-[1.6s] ease-out group-hover:-translate-y-6"
                  />
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-semibold text-emerald uppercase tracking-wider mb-1">
                      {d.tag}
                    </div>
                    <div className="font-display font-semibold text-[16px]">{d.name}</div>
                  </div>
                  <span className="w-9 h-9 rounded-full glass flex items-center justify-center text-muted group-hover:text-trust transition-colors">
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </a>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10">
        <div className="text-muted text-[13px] font-semibold uppercase tracking-wider mb-4">
          Alte demo-uri live
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {PROJECTS.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-3 bg-surface border border-white/10 rounded-2xl px-5 py-4 hover:border-trust/40 transition-colors"
            >
              <div>
                <div className="text-[10.5px] font-semibold text-emerald uppercase tracking-wider mb-1">
                  {p.tag}
                </div>
                <div className="font-display font-semibold text-[14.5px] leading-snug">{p.name}</div>
              </div>
              <ArrowUpRight size={15} className="text-muted group-hover:text-trust shrink-0" />
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
