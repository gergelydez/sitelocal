"use client";

import { Star, MessageSquarePlus } from "lucide-react";
import { Reveal } from "./Reveal";

// Populează acest array cu recenzii reale de îndată ce le primești —
// secțiunea devine automat un carusel funcțional. Până atunci, afișăm
// stadiul real (încă nicio recenzie) în loc de citate inventate.
const REVIEWS: { name: string; business: string; quote: string; rating: number }[] = [];

export default function Testimonials() {
  return (
    <section id="recenzii" className="max-w-[1120px] mx-auto px-6 py-20 md:py-24">
      <Reveal className="mb-10">
        <div className="text-trust text-[12.5px] font-semibold uppercase tracking-wider mb-3">
          Recenzii clienți
        </div>
        <h2 className="font-display font-bold text-[28px] md:text-[32px] tracking-tight">
          Ce spun afacerile locale
        </h2>
      </Reveal>

      {REVIEWS.length === 0 ? (
        <Reveal>
          <div className="glass rounded-2xl p-9 md:p-11 text-center max-w-[560px] mx-auto">
            <div className="flex justify-center gap-1 mb-4 text-muted">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} />
              ))}
            </div>
            <h3 className="font-display font-semibold text-[18px] mb-2">
              Primele recenzii urmează
            </h3>
            <p className="text-muted text-[14px] leading-relaxed mb-6 max-w-[42ch] mx-auto">
              Sunt la început cu acest format de demo gratuit — prefer să
              arăt recenzii reale decât inventate. Dacă ești printre primii
              clienți, numele afacerii tale poate apărea chiar aici.
            </p>
            <a
              href="#demo"
              className="inline-flex items-center gap-2 text-trust font-semibold text-[14px] hover:text-trust/80 transition-colors"
            >
              <MessageSquarePlus size={16} />
              Fii printre primii
            </a>
          </div>
        </Reveal>
      ) : (
        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6">
          {REVIEWS.map((r) => (
            <div
              key={r.name}
              className="glass rounded-2xl p-7 min-w-[280px] max-w-[320px] snap-start shrink-0"
            >
              <div className="flex gap-1 mb-4 text-trust">
                {[...Array(r.rating)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <p className="text-[14px] text-text leading-relaxed mb-5">
                &ldquo;{r.quote}&rdquo;
              </p>
              <div className="text-[13px] font-semibold">{r.name}</div>
              <div className="text-[12px] text-muted">{r.business}</div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
