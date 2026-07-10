"use client";

import { ShieldCheck, MapPin, Banknote, MessageCircle } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "./Reveal";
import TiltCard from "./TiltCard";

const REASONS = [
  {
    icon: ShieldCheck,
    title: "Zero risc financiar",
    text: "Vezi demo-ul live înainte să plătești un leu. Decizi tu dacă merge mai departe.",
  },
  {
    icon: MapPin,
    title: "Expert local, nu agenție la distanță",
    text: "Cunosc piața din Baia Mare și Maramureș, nu un brief trimis printr-un formular generic.",
  },
  {
    icon: Banknote,
    title: "Preț corect, fără taxe ascunse",
    text: "Discutăm clar costul după ce vezi demo-ul — nicio surpriză la final.",
  },
  {
    icon: MessageCircle,
    title: "Suport direct, pe WhatsApp",
    text: "Îmi scrii direct mie, nu unui ticket de suport care așteaptă zile la rând.",
  },
];

export default function TrustSection() {
  return (
    <section className="max-w-[1120px] mx-auto px-6 py-16 md:py-20">
      <StaggerGroup className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        {REASONS.map((r) => (
          <StaggerItem key={r.title}>
            <TiltCard className="glass rounded-2xl p-6 h-full">
              <r.icon size={20} className="text-trust mb-4" />
              <h3 className="font-semibold text-[15px] mb-1.5 leading-snug">
                {r.title}
              </h3>
              <p className="text-[13px] text-muted leading-relaxed">{r.text}</p>
            </TiltCard>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
