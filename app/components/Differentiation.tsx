"use client";

import { Reveal, StaggerGroup, StaggerItem } from "./Reveal";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const OPTIONS = [
  {
    tag: "Cluj / online",
    who: "Agenție mare",
    offer: "Profesionalism",
    gap: "3-6 săpt., scump",
  },
  {
    tag: "preț mic",
    who: "Freelancer OLX",
    offer: "Cost redus",
    gap: "Template, dispare",
  },
  {
    tag: "singur",
    who: "Wix / DIY",
    offer: "Gratis, control",
    gap: "Zile pierdute",
  },
];

export default function Differentiation() {
  return (
    <section className="max-w-[1120px] mx-auto px-6 py-4">
      <Reveal>
        <div className="text-cyan text-[12.5px] font-bold uppercase tracking-wider mb-3">
          De ce nu la fel ca alții
        </div>
        <h2 className="font-display font-bold text-[28px] md:text-[32px] max-w-[26ch] mb-10">
          Cum te compari cu variantele pe care le iei deja în calcul
        </h2>
      </Reveal>

      <StaggerGroup className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {OPTIONS.map((o) => (
          <StaggerItem key={o.who}>
            <div className="glass rounded-[18px] p-5 h-full">
              <div className="text-[11px] text-muted mb-1.5">{o.tag}</div>
              <div className="font-display font-semibold text-[15px] mb-3.5">
                {o.who}
              </div>
              <Line label="Oferă" value={o.offer} />
              <Line label="Te lasă cu" value={o.gap} />
            </div>
          </StaggerItem>
        ))}
        <StaggerItem>
          <div className="rounded-[18px] p-5 h-full bg-gradient-to-br from-violet/20 to-cyan/10 border border-violet/40 shadow-[0_0_40px_rgba(138,15,26,0.15)]">
            <div className="text-[11px] text-cyan mb-1.5">noi</div>
            <div className="font-display font-semibold text-[15px] mb-3.5 grad-text">
              sitelocal.ro
            </div>
            <Line label="Oferă" value="Vezi înainte să plătești" />
            <Line label="Te lasă cu" value="—" />
          </div>
        </StaggerItem>
      </StaggerGroup>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
        <StatCard value={3} suffix=" zile" label="timp mediu până la demo" />
        <StatCard value={0} suffix=" lei" label="risc la prima variantă" />
        <StatCard value={100} suffix="%" label="local, Baia Mare" />
      </div>
    </section>
  );
}

function Line({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-[12.5px] text-muted py-2 border-t border-white/8">
      <b className="block text-text font-semibold text-[11px] mb-0.5">
        {label}
      </b>
      {value}
    </div>
  );
}

function StatCard({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const duration = 900;
    function step(ts: number) {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setDisplay(Math.floor(progress * value));
      if (progress < 1) requestAnimationFrame(step);
      else setDisplay(value);
    }
    requestAnimationFrame(step);
  }, [inView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass rounded-[20px] p-7 text-center"
    >
      <div className="font-display font-bold text-[32px] grad-text">
        {display}
        {suffix}
      </div>
      <div className="text-[12.5px] text-muted mt-1.5">{label}</div>
    </motion.div>
  );
}
