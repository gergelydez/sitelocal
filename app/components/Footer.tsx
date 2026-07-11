const LINKS = [
  { href: "#cum-functioneaza", label: "Cum funcționează" },
  { href: "#nise", label: "Nișe" },
  { href: "#proiecte", label: "Portofoliu" },
  { href: "#preturi", label: "Prețuri" },
  { href: "#recenzii", label: "Recenzii" },
  { href: "#faq", label: "Întrebări frecvente" },
  { href: "#demo", label: "Demo gratuit" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/8">
      <div className="max-w-[1120px] mx-auto px-6 py-14 grid sm:grid-cols-[1.2fr_1fr] gap-10">
        <div>
          <div className="font-display font-bold text-[15px] mb-3">
            site<span className="text-trust">local</span>.ro
          </div>
          <p className="text-muted text-[13.5px] leading-relaxed max-w-[38ch]">
            Site-uri construite pentru afaceri din Baia Mare și Maramureș.
            Vezi demo-ul gratuit înainte să plătești orice.
          </p>
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
      <div className="text-center py-6 px-6 text-muted text-[13px] border-t border-white/8">
        © site local · Baia Mare
      </div>
    </footer>
  );
}
