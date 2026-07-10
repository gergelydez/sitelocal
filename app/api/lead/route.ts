import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { sendCapiEvent, extractClientMeta } from "@/app/lib/meta";

// Necesare pentru notificarea prin email (vezi README)
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL; // unde vrei să primești lead-urile

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
    const { nume, firma, telefon, domeniu, eventId } = body;

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

    // 2. Trimite evenimentul Lead către Meta Conversions API (server-side).
    //    Folosim același event_id ca Pixel-ul din browser, ca Meta să dedupleze
    //    cele două semnale (nu să numere lead-ul de două ori), plus IP/user-agent/fbp/fbc
    //    pentru o potrivire (match quality) cât mai clară în Events Manager.
    const { ip, userAgent, fbp, fbc } = extractClientMeta(req);
    await sendCapiEvent({
      eventName: "Lead",
      eventId: eventId || crypto.randomUUID(),
      ip,
      userAgent,
      fbp,
      fbc,
      phone: telefon,
      customData: { content_name: domeniu, company_name: firma },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Eroare server" },
      { status: 500 }
    );
  }
}
