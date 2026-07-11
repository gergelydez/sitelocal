"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "#cum-functioneaza", label: "Cum funcționează" },
  { href: "#nise", label: "Nișe" },
  { href: "#proiecte", label: "Portofoliu" },
  { href: "#preturi", label: "Prețuri" },
  { href: "#recenzii", label: "Recenzii" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 backdrop-blur-md bg-bg/70 border-b border-white/8"
    >
      <div className="max-w-[1120px] mx-auto px-6 flex items-center justify-between py-4">
        <div className="font-display font-bold text-[15px] tracking-tight">
          site<span className="text-trust">local</span>.ro
        </div>

        <div className="hidden md:flex items-center gap-6 text-[13.5px] text-muted">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-text transition-colors">
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#demo"
            className="hidden sm:inline-flex bg-trust hover:bg-trust/90 text-white px-4 py-2.5 rounded-lg text-[13.5px] font-semibold cursor-pointer transition-colors"
          >
            Demo gratuit
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Închide meniul" : "Deschide meniul"}
            aria-expanded={open}
            className="md:hidden p-2 -mr-2 cursor-pointer"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t border-white/8"
          >
            <div className="flex flex-col px-6 py-4 gap-4 text-[14.5px]">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-muted hover:text-text transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#demo"
                onClick={() => setOpen(false)}
                className="bg-trust text-white text-center px-4 py-3 rounded-lg font-semibold"
              >
                Demo gratuit
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
