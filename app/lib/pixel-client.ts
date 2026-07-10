"use client";

import { captureAttribution } from "./attribution-client";

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

/**
 * Trimite un eveniment atât prin Pixel-ul din browser cât și prin Conversions API
 * (server, via /api/track), cu același event_id — ca Meta să dedupleze corect.
 * Include și sursa de trafic (attribution), salvată local pentru dashboard-ul din /admin.
 */
export function trackEvent(
  eventName: "Contact" | "ViewContent",
  customData?: Record<string, unknown>
) {
  const eventId = crypto.randomUUID();
  const attribution = captureAttribution();

  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", eventName, customData, { eventID: eventId });
  }

  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event: eventName,
      eventId,
      customData,
      path: window.location.pathname,
      attribution,
    }),
    keepalive: true,
  }).catch(() => {});

  return eventId;
}
