import { NextRequest, NextResponse } from "next/server";
import { sendCapiEvent, extractClientMeta } from "@/app/lib/meta";

const ALLOWED_EVENTS = new Set(["Contact", "ViewContent"]);

// Endpoint generic pentru evenimente fără date personale (Contact, ViewContent),
// trimis în paralel cu Pixel-ul din browser ca backup server-side — la fel ca la Lead.
export async function POST(req: NextRequest) {
  try {
    const { event, eventId, customData } = await req.json();

    if (!event || !ALLOWED_EVENTS.has(event) || !eventId) {
      return NextResponse.json({ error: "Date lipsă sau eveniment invalid" }, { status: 400 });
    }

    const { ip, userAgent, fbp, fbc } = extractClientMeta(req);
    await sendCapiEvent({ eventName: event, eventId, ip, userAgent, fbp, fbc, customData });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Eroare server" }, { status: 500 });
  }
}
