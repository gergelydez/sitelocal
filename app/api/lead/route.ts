import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";

// Necesare din Meta Events Manager > Setări > Conversions API
const PIXEL_ID = process.env.META_PIXEL_ID;
const CAPI_TOKEN = process.env.META_CAPI_ACCESS_TOKEN;

// Necesare pentru notificarea prin email (vezi README)
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL; // unde vrei să primești lead-urile

function sha256(value: string) {
  return crypto
    .createHash("sha256")
    .update(value.trim().toLowerCase())
    .digest("hex");
}

async function sendLeadEmail(data: {
  nume: string;
  firma: string;
  telefon: string;
  domeniu: string;
}) {
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD || !NOTIFY_EMAIL) {
    console.warn(
      "Email notification skipped — lipsesc GMAIL_USER, GMAIL_APP_PASSWORD sau NOTIFY_EMAIL din .env"
    );
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `"Site Local — Lead nou" <${GMAIL_USER}>`,
    to: NOTIFY_EMAIL,
    subject: `Lead nou: ${data.firma} (${data.domeniu})`,
    text: `Nume: ${data.nume}\nFirmă: ${data.firma}\nTelefon: ${data.telefon}\nDomeniu: ${data.domeniu}`,
    html: `
      <h2>Lead nou de pe site</h2>
      <p><b>Nume:</b> ${data.nume}</p>
      <p><b>Firmă:</b> ${data.firma}</p>
      <p><b>Telefon:</b> <a href="https://wa.me/40${data.telefon.replace(/\D/g, "")}">${data.telefon}</a> (link direct spre WhatsApp)</p>
      <p><b>Domeniu:</b> ${data.domeniu}</p>
    `,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nume, firma, telefon, domeniu } = body;

    if (!nume || !firma || !telefon || !domeniu) {
      return NextResponse.json(
        { error: "Câmpuri lipsă" },
        { status: 400 }
      );
    }

    console.log("Lead nou:", { nume, firma, telefon, domeniu });

    // 1. Trimite email de notificare — aici primești lead-ul, practic
    try {
      await sendLeadEmail({ nume, firma, telefon, domeniu });
    } catch (emailErr) {
      console.error("Eroare trimitere email:", emailErr);
      // nu oprim tot request-ul dacă emailul eșuează — lead-ul tot se salvează/loghează
    }

    // 2. Trimite evenimentul Lead către Meta Conversions API (server-side)
    //    Acesta e cel mai fiabil semnal pentru optimizarea reclamelor —
    //    nu depinde de ad-blockers sau Safari ITP, spre deosebire de Pixel-ul din browser.
    if (PIXEL_ID && CAPI_TOKEN) {
      const eventId = crypto.randomUUID();

      const payload = {
        data: [
          {
            event_name: "Lead",
            event_time: Math.floor(Date.now() / 1000),
            event_id: eventId, // trebuie să coincidă cu event_id-ul trimis din Pixel (client), ca Meta să dedupleze
            action_source: "website",
            user_data: {
              ph: [sha256(telefon)], // telefonul trebuie hash-uit SHA256 înainte de trimitere
            },
            custom_data: {
              content_name: domeniu,
              company_name: firma,
            },
          },
        ],
      };

      const capiRes = await fetch(
        `https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${CAPI_TOKEN}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!capiRes.ok) {
        console.error("Meta CAPI error:", await capiRes.text());
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Eroare server" },
      { status: 500 }
    );
  }
}
