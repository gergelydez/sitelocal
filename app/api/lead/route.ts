import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { sendCapiEvent, extractClientMeta } from "@/app/lib/meta";
import { saveLead, saveEvent } from "@/app/lib/db";

// Necesare pentru notificarea prin email (vezi README)
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL; // unde vrei să primești lead-urile

async function sendLeadEmail(data: {
  nume: string;
  firma: string;
  telefon: string;
  email: string;
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
    replyTo: data.email,
    subject: `Lead nou: ${data.firma} (${data.domeniu})`,
    text: `Nume: ${data.nume}\nFirmă: ${data.firma}\nTelefon: ${data.telefon}\nEmail: ${data.email}\nDomeniu: ${data.domeniu}`,
    html: `
      <h2>Lead nou de pe site</h2>
      <p><b>Nume:</b> ${data.nume}</p>
      <p><b>Firmă:</b> ${data.firma}</p>
      <p><b>Telefon:</b> <a href="https://wa.me/40${data.telefon.replace(/\D/g, "")}">${data.telefon}</a> (link direct spre WhatsApp)</p>
      <p><b>Email:</b> <a href="mailto:${data.email}">${data.email}</a></p>
      <p><b>Domeniu:</b> ${data.domeniu}</p>
    `,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nume, firma, telefon, email, domeniu, eventId, attribution } = body;

    if (!nume || !firma || !telefon || !email || !domeniu) {
      return NextResponse.json(
        { error: "Câmpuri lipsă" },
        { status: 400 }
      );
    }

    console.log("Lead nou:", { nume, firma, telefon, email, domeniu });

    // 1. Salvează lead-ul în baza de date, pentru dashboard-ul din /admin
    try {
      await saveLead({ nume, firma, telefon, email, domeniu });
    } catch (dbErr) {
      console.error("Eroare salvare lead în baza de date:", dbErr);
      // nu oprim request-ul dacă baza de date nu e încă conectată — email + CAPI tot funcționează
    }

    // 1b. Salvează și ca eveniment în tabelul de analytics, cu sursa de trafic
    try {
      await saveEvent({
        eventName: "Lead",
        path: "/",
        referrer: attribution?.referrer,
        utmSource: attribution?.utmSource,
        utmMedium: attribution?.utmMedium,
        utmCampaign: attribution?.utmCampaign,
        source: attribution?.source,
      });
    } catch (dbErr) {
      console.error("Eroare salvare eveniment analytics:", dbErr);
    }

    // 2. Trimite email de notificare — aici primești lead-ul, practic
    try {
      await sendLeadEmail({ nume, firma, telefon, email, domeniu });
    } catch (emailErr) {
      console.error("Eroare trimitere email:", emailErr);
      // nu oprim tot request-ul dacă emailul eșuează — lead-ul tot se salvează/loghează
    }

    // 3. Trimite evenimentul Lead către Meta Conversions API (server-side).
    //    Folosim același event_id ca Pixel-ul din browser, ca Meta să dedupleze
    //    cele două semnale (nu să numere lead-ul de două ori), plus IP/user-agent/fbp/fbc/email
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
      email,
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
