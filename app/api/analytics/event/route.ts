import { NextRequest, NextResponse } from "next/server";
import { saveEvent } from "@/app/lib/db";

// Doar pentru PageView, doar în baza noastră de date (nu Meta CAPI) — Pixel-ul
// din browser trimite deja PageView direct către Meta din layout.tsx, deci nu
// mai trimitem încă o dată acelaşi eveniment către Meta (ar dubla numărătoarea).
export async function POST(req: NextRequest) {
  try {
    const { path, attribution } = await req.json();

    await saveEvent({
      eventName: "PageView",
      path,
      referrer: attribution?.referrer,
      utmSource: attribution?.utmSource,
      utmMedium: attribution?.utmMedium,
      utmCampaign: attribution?.utmCampaign,
      source: attribution?.source,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Eroare server" }, { status: 500 });
  }
}
