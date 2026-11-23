"use client";

import { useEffect, useState } from "react";
import { getConsent, setConsent } from "../lib/consent";

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(getConsent() === null);
    const open = () => setShow(true);
    window.addEventListener("sl-open-cookies", open);
    return () => window.removeEventListener("sl-open-cookies", open);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-5">
      <div className="max-w-[880px] mx-auto bg-surface border border-white/12 rounded-2xl p-5 shadow-2xl shadow-black/50 sm:flex sm:items-center sm:gap-6">
        <p className="text-[13.5px] text-muted leading-relaxed mb-4 sm:mb-0">
          Folosim cookie-uri necesare pentru funcționarea site-ului și, doar cu acordul tău,
          cookie-uri de marketing (Meta Pixel) ca să măsurăm reclamele.{" "}
          <a href="/cookies" className="text-text underline">Detalii</a>
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => { setConsent("necessary"); setShow(false); }}
            className="px-4 py-2.5 rounded-lg text-[13.5px] font-semibold border border-white/15 hover:bg-white/5 cursor-pointer"
          >
            Doar necesare
          </button>
          <button
            onClick={() => { setConsent("all"); setShow(false); }}
            className="px-4 py-2.5 rounded-lg text-[13.5px] font-semibold bg-trust text-white hover:bg-trust/90 cursor-pointer"
          >
            Accept toate
          </button>
        </div>
      </div>
    </div>
  );
}

export function CookieSettingsLink({ className }: { className?: string }) {
  return (
    <button
      onClick={() => window.dispatchEvent(new Event("sl-open-cookies"))}
      className={className ?? "text-muted hover:text-text transition-colors cursor-pointer"}
    >
      Setări cookie-uri
    </button>
  );
}
