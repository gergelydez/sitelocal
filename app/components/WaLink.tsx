"use client";

import type { ReactNode } from "react";
import { WHATSAPP_URL, WHATSAPP_APP_URL } from "../lib/contact";
import { trackEvent } from "../lib/pixel-client";

/**
 * Link WhatsApp care pe telefon deschide direct aplicația (whatsapp://),
 * fără pagina intermediară din browser. Dacă aplicația nu se deschide în ~1.5s,
 * cade pe wa.me. Pe desktop deschide wa.me / WhatsApp Web.
 * Trimite evenimentul "Contact" la Meta la fiecare apăsare.
 */
export default function WaLink({
  source,
  className,
  children,
  ariaLabel,
}: {
  source: string;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}) {
  function onClick(e: React.MouseEvent<HTMLAnchorElement>) {
    trackEvent("Contact", { content_name: `whatsapp_${source}` });
    const mobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (!mobile) return; // desktop: lasă link-ul wa.me normal
    e.preventDefault();
    let left = false;
    const onHide = () => {
      if (document.hidden) left = true;
    };
    document.addEventListener("visibilitychange", onHide);
    window.location.href = WHATSAPP_APP_URL;
    setTimeout(() => {
      document.removeEventListener("visibilitychange", onHide);
      if (!left && !document.hidden) window.location.href = WHATSAPP_URL;
    }, 1500);
  }

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      onClick={onClick}
      className={className}
    >
      {children}
    </a>
  );
}

export function WaIcon({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M16.004 3C9.376 3 4 8.373 4 15c0 2.362.687 4.564 1.873 6.417L4 29l7.79-1.836A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm0 21.75a9.7 9.7 0 0 1-4.95-1.354l-.355-.21-4.623 1.09 1.11-4.507-.232-.368A9.7 9.7 0 0 1 5.25 15c0-5.93 4.823-10.75 10.754-10.75S26.758 9.07 26.758 15 21.935 24.75 16.004 24.75Zm5.5-7.9c-.3-.15-1.78-.878-2.056-.978-.276-.1-.477-.15-.678.15-.2.3-.777.978-.953 1.178-.176.2-.352.225-.652.075-.3-.15-1.266-.467-2.412-1.49-.892-.795-1.494-1.777-1.67-2.077-.176-.3-.019-.462.132-.612.135-.134.3-.35.451-.525.15-.176.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.678-1.635-.929-2.24-.244-.588-.492-.508-.678-.518l-.578-.01a1.11 1.11 0 0 0-.804.375c-.276.3-1.054 1.03-1.054 2.513s1.079 2.915 1.229 3.116c.15.2 2.124 3.243 5.148 4.548.719.31 1.28.495 1.717.633.721.23 1.377.198 1.896.12.578-.087 1.78-.727 2.031-1.428.25-.7.25-1.302.176-1.428-.075-.126-.276-.2-.577-.35Z" />
    </svg>
  );
}
