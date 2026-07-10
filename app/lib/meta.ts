import crypto from "crypto";

// Pixel-ul e public (merge și în HTML-ul din browser), de-asta e ok ca fallback aici.
// Token-ul CAPI rămâne exclusiv în variabilele de mediu — niciodată în cod.
export const META_PIXEL_ID = process.env.META_PIXEL_ID || "1983304235646415";
const CAPI_TOKEN = process.env.META_CAPI_ACCESS_TOKEN;

export function sha256(value: string) {
  return crypto
    .createHash("sha256")
    .update(value.trim().toLowerCase())
    .digest("hex");
}

export function extractClientMeta(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null;
  const userAgent = req.headers.get("user-agent");
  const cookieHeader = req.headers.get("cookie") || "";
  const fbp = cookieHeader.match(/_fbp=([^;]+)/)?.[1] || null;
  const fbc = cookieHeader.match(/_fbc=([^;]+)/)?.[1] || null;
  return { ip, userAgent, fbp, fbc };
}

export async function sendCapiEvent({
  eventName,
  eventId,
  ip,
  userAgent,
  fbp,
  fbc,
  phone,
  customData,
}: {
  eventName: string;
  eventId: string;
  ip?: string | null;
  userAgent?: string | null;
  fbp?: string | null;
  fbc?: string | null;
  phone?: string;
  customData?: Record<string, unknown>;
}) {
  if (!CAPI_TOKEN) {
    console.warn(
      `Conversions API sărit pentru "${eventName}" — lipsește META_CAPI_ACCESS_TOKEN din .env`
    );
    return;
  }

  const userData: Record<string, unknown> = {};
  if (ip) userData.client_ip_address = ip;
  if (userAgent) userData.client_user_agent = userAgent;
  if (fbp) userData.fbp = fbp;
  if (fbc) userData.fbc = fbc;
  if (phone) userData.ph = [sha256(phone)];

  const payload = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId, // trebuie identic cu eventID trimis din Pixel-ul client, ca Meta să dedupleze
        action_source: "website",
        user_data: userData,
        ...(customData ? { custom_data: customData } : {}),
      },
    ],
  };

  const res = await fetch(
    `https://graph.facebook.com/v19.0/${META_PIXEL_ID}/events?access_token=${CAPI_TOKEN}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) {
    console.error(`Meta CAPI error (${eventName}):`, await res.text());
  }
}
