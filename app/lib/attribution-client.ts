"use client";

const COOKIE_NAME = "sl_source";
const COOKIE_DAYS = 30;

export interface Attribution {
  source: string;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  referrer: string | null;
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function deriveSource(params: URLSearchParams, referrer: string): string {
  const utmSource = params.get("utm_source");
  if (utmSource) return utmSource;
  if (params.get("fbclid")) return "Facebook/Instagram Ads";
  if (params.get("gclid")) return "Google Ads";
  if (!referrer) return "Direct";
  try {
    const host = new URL(referrer).hostname.replace(/^www\./, "");
    if (host.includes("facebook.") || host.includes("instagram."))
      return "Facebook/Instagram (organic)";
    if (host.includes("google.")) return "Google (organic)";
    if (host.includes("whatsapp.")) return "WhatsApp";
    return host;
  } catch {
    return "Direct";
  }
}

// Prima sursă de trafic dintr-o sesiune (first-touch), salvată într-un cookie
// și refolosită la toate evenimentele ulterioare (Contact, Lead), ca să știm
// de unde a venit clientul chiar dacă a navigat mai multe pagini înainte să convertească.
export function captureAttribution(): Attribution {
  const existing = getCookie(COOKIE_NAME);
  if (existing) {
    try {
      return JSON.parse(existing) as Attribution;
    } catch {
      // cookie corupt — recapturăm mai jos
    }
  }

  const params = new URLSearchParams(window.location.search);
  const referrer = document.referrer || null;
  const attribution: Attribution = {
    source: deriveSource(params, referrer || ""),
    utmSource: params.get("utm_source"),
    utmMedium: params.get("utm_medium"),
    utmCampaign: params.get("utm_campaign"),
    referrer,
  };

  setCookie(COOKIE_NAME, JSON.stringify(attribution), COOKIE_DAYS);
  return attribution;
}
