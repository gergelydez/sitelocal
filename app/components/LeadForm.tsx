"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

const DOMENII = [
  "Restaurant / Cafenea",
  "Salon / Beauty",
  "Service auto",
  "Cabinet medical / Avocatură",
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
      domeniu: (form.elements.namedItem("domeniu") as HTMLSelectElement).value,
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");

      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "Lead", { content_name: data.domeniu });
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
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-4"
        >
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet to-cyan flex items-center justify-center">
              <CheckCircle2 size={28} className="text-bg" />
            </div>
          </div>
          <h2 className="font-display font-bold text-[24px] mb-2">
            Perfect, ai intrat!
          </h2>
          <p className="text-muted text-sm mb-5">
            În următoarele 24 de ore primești gratuit prima versiune a
            site-ului tău.
          </p>
          <a
            href="https://wa.me/40700000000"
            className="inline-block font-bold text-[14px] grad-text"
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

          <div className="mb-4">
            <label htmlFor="domeniu" className="block text-xs font-semibold mb-1.5 text-muted">
              Domeniu de activitate
            </label>
            <select
              id="domeniu"
              name="domeniu"
              required
              className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/12 text-[14.5px] focus:border-cyan outline-none"
            >
              <option value="" className="bg-[#0E131D]">Alege...</option>
              {DOMENII.map((d) => (
                <option key={d} className="bg-[#0E131D]">{d}</option>
              ))}
            </select>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={status === "loading"}
            className="btn-shine w-full text-white font-bold py-4 rounded-2xl transition-opacity disabled:opacity-60 cursor-pointer shadow-[0_0_30px_rgba(138,15,26,0.3)]"
            style={{
              backgroundImage: "linear-gradient(100deg,#3730A3,#2563EB,#0D9488)",
            }}
          >
            {status === "loading" ? "Se trimite..." : "Vreau demo-ul gratuit →"}
          </motion.button>

          {status === "error" && (
            <p className="text-cyan text-xs text-center mt-2">
              Ceva n-a mers. Încearcă din nou sau scrie-mi direct pe WhatsApp.
            </p>
          )}

          <p className="text-center text-xs text-muted mt-4">
            Fără obligații. Nu-ți place? Nu plătești nimic.
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
        className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/12 text-[14.5px] placeholder:text-white/25 focus:border-cyan outline-none"
      />
    </div>
  );
}
