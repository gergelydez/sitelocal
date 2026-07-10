"use client";

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

/**
 * Trimite un eveniment atât prin Pixel-ul din browser cât și prin Conversions API
 * (server, via /api/track), cu același event_id — ca Meta să dedupleze corect.
 */
export function trackEvent(
  eventName: "Contact" | "ViewContent",
  customData?: Record<string, unknown>
) {
  const eventId = crypto.randomUUID();

  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", eventName, customData, { eventID: eventId });
  }

  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event: eventName, eventId, customData }),
    keepalive: true,
  }).catch(() => {});

  return eventId;
}
