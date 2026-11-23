"use client";

export type Consent = "all" | "necessary" | null;
const KEY = "sl_consent";

export function getConsent(): Consent {
  try {
    const v = localStorage.getItem(KEY);
    return v === "all" || v === "necessary" ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(v: "all" | "necessary") {
  try {
    localStorage.setItem(KEY, v);
  } catch {}
  if (v === "all") {
    (window as unknown as { slLoadPixel?: () => void }).slLoadPixel?.();
  }
  window.dispatchEvent(new Event("sl-consent"));
}
