"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { captureAttribution } from "../lib/attribution-client";

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

const DOMENII = [
  "Auto (service / detailing)",
  "Horeca (pensiune / restaurant)",
  "Salon / Clinică",
  "Meseriași / Construcții",
  "Altceva",
];

export default function LeadForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data = {
      nume: (form.elements.namedItem("nume") as HTMLInputElement).value,
      firma: (form.elements.namedItem("firma") as HTMLInputElement).value,
      telefon: (form.elements.namedItem("telefon") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      domeniu: (form.elements.namedItem("domeniu") as HTMLSelectElement).value,
    };

    // Un singur event_id, împărțit între Pixel-ul din browser și Conversions API
    // (server) — altfel Meta numără lead-ul de două ori.
    const eventId = crypto.randomUUID();
    const attribution = captureAttribution();

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, eventId, attribution }),
      });
      if (!res.ok) throw new Error("Request failed");

      if (typeof window !== "undefined" && window.fbq) {
        // Nu trimitem email-ul aici ca parametru custom — Meta îl preia automat
        // din câmpul <input type="email"> prin Automatic Advanced Matching
        // (același mecanism care deja potrivea telefonul, fără cod suplimentar).
        window.fbq(
          "track",
          "Lead",
          { content_name: data.domeniu, company_name: data.firma },
          { eventID: eventId }
        );
      }
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <AnimatePresence mode="wait">
      {status === "done" ? (
        <motion.div
          key="done"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-4"
        >
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-emerald/15 border border-emerald/30 flex items-center justify-center">
              <CheckCircle2 size={22} className="text-emerald" />
            </div>
          </div>
          <h3 className="font-display font-bold text-[20px] mb-2">
            Perfect, ai intrat!
          </h3>
          <p className="text-muted text-sm mb-5">
            În maximum 24 de ore primești gratuit demo-ul live al site-ului
            tău. Îți place? Site-ul complet e gata în doar 3 zile.
          </p>
          <a
            href="https://wa.me/40758656192"
            className="inline-block font-semibold text-[14px] text-trust hover:text-trust/80 transition-colors"
          >
            Sau scrie-mi acum direct pe WhatsApp →
          </a>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onSubmit={handleSubmit}
        >
          <Field id="nume" label="Nume" placeholder="Ion Popescu" />
          <Field id="firma" label="Firmă" placeholder="Salon Ana Beauty" />
          <Field
            id="telefon"
            label="Telefon (WhatsApp)"
            placeholder="07xx xxx xxx"
            type="tel"
          />
          <Field id="email" label="Email" placeholder="ion@firma.ro" type="email" />

          <div className="mb-4">
            <label htmlFor="domeniu" className="block text-xs font-semibold mb-1.5 text-muted">
              Domeniu de activitate
            </label>
            <select
              id="domeniu"
              name="domeniu"
              required
              className="w-full px-4 py-3.5 rounded-lg bg-white/[0.03] border border-white/12 text-[14.5px] focus:border-trust outline-none appearance-none"
            >
              <option value="" className="bg-[#131316]">Alege...</option>
              {DOMENII.map((d) => (
                <option key={d} className="bg-[#131316]">{d}</option>
              ))}
            </select>
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={status === "loading"}
            className="btn-shine w-full text-white font-semibold text-[15px] py-4 rounded-lg bg-trust hover:bg-trust/90 transition-opacity disabled:opacity-60 cursor-pointer"
          >
            {status === "loading" ? "Se trimite..." : "Solicită Demo Gratuit Live"}
          </motion.button>

          {status === "error" && (
            <p className="text-red-400 text-xs text-center mt-2">
              Ceva n-a mers. Încearcă din nou sau scrie-mi direct pe WhatsApp.
            </p>
          )}

          <p className="text-center text-xs text-muted mt-4">
            Fără obligații. Nu-ți place demo-ul? Nu plătești nimic.
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

function Field({
  id,
  label,
  placeholder,
  type = "text",
}: {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-xs font-semibold mb-1.5 text-muted">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required
        placeholder={placeholder}
        className="w-full px-4 py-3.5 rounded-lg bg-white/[0.03] border border-white/12 text-[14.5px] placeholder:text-white/25 focus:border-trust outline-none"
      />
    </div>
  );
}
