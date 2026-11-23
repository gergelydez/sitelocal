import WaLink, { WaIcon } from "./WaLink";
import { PHONE_DISPLAY } from "../lib/contact";
import { COMPANY } from "../lib/company";
import { CookieSettingsLink } from "./CookieBanner";
const LINKS = [
  { href: "#cum-functioneaza", label: "Cum funcționează" },
  { href: "#nise", label: "Nișe" },
  { href: "#proiecte", label: "Portofoliu" },
  { href: "#preturi", label: "Prețuri" },
  { href: "#faq", label: "Întrebări frecvente" },
  { href: "#demo", label: "Demo gratuit" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/8">
      <div className="max-w-[1120px] mx-auto px-6 py-14 grid sm:grid-cols-[1.2fr_1fr] gap-10">
        <div>
          <div className="font-display font-bold text-[15px] mb-3">
            Site <span className="text-trust">Local</span>
          </div>
          <p className="text-muted text-[13.5px] leading-relaxed max-w-[38ch]">
            Site-uri pentru afaceri locale din toată România.
            Vezi demo-ul gratuit înainte să plătești orice.
          </p>
          <WaLink
            source="footer"
            className="mt-5 inline-flex items-center gap-2 bg-emerald hover:bg-emerald/90 text-white px-5 py-3 rounded-full text-[14px] font-semibold"
          >
            <WaIcon size={18} />
            WhatsApp {PHONE_DISPLAY}
          </WaLink>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-3 sm:justify-end content-start text-[13.5px]">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-muted hover:text-text transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="border-t border-white/8">
        <div className="max-w-[1120px] mx-auto px-6 py-8 grid md:grid-cols-[1.4fr_1fr] gap-6 text-[12.5px] text-muted">
          <div className="leading-relaxed">
            <div className="text-text font-semibold mb-1">{COMPANY.name}</div>
            CUI {COMPANY.cui} · Reg. Com. {COMPANY.regCom}<br />
            {COMPANY.address}<br />
            Telefon / WhatsApp: {COMPANY.phone}
          </div>
          <div className="flex flex-col gap-2 md:items-end">
            <div className="flex flex-wrap gap-x-4 gap-y-2 md:justify-end">
              <a href="/termeni" className="hover:text-text">Termeni și condiții</a>
              <a href="/confidentialitate" className="hover:text-text">Confidențialitate</a>
              <a href="/cookies" className="hover:text-text">Cookie-uri</a>
              <CookieSettingsLink />
            </div>
            <div className="flex flex-wrap gap-2 md:justify-end mt-1">
              <a href="https://anpc.ro" target="_blank" rel="noopener noreferrer" className="border border-white/15 rounded-md px-3 py-1.5 hover:text-text">ANPC</a>
              <a href="https://anpc.ro/ce-este-sal/" target="_blank" rel="noopener noreferrer" className="border border-white/15 rounded-md px-3 py-1.5 hover:text-text">ANPC – SAL (soluționarea alternativă a litigiilor)</a>
            </div>
          </div>
        </div>
        <div className="text-center pb-6 px-6 text-muted text-[12.5px]">
          © 2026 {COMPANY.brand} · {COMPANY.name}
        </div>
      </div>
    </footer>
  );
}
