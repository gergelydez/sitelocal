"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { captureAttribution } from "../lib/attribution-client";

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Nu logăm vizitele proprii pe /admin — ar umple analytics-ul cu zgomot.
    if (pathname.startsWith("/admin")) return;

    const attribution = captureAttribution();
    fetch("/api/analytics/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: pathname, attribution }),
      keepalive: true,
    }).catch(() => {});
  }, [pathname]);

  return null;
}
