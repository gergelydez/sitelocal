import type { Metadata } from "next";
import LegalPage from "../components/LegalPage";
import { CookieSettingsLink } from "../components/CookieBanner";
import { COMPANY } from "../lib/company";

export const metadata: Metadata = { title: "Politica de cookie-uri — Site Local" };

export default function Page() {
  return (
    <LegalPage title="Politica de cookie-uri">
      <p>Ultima actualizare: {COMPANY.updated}</p>
      <h2>Ce sunt cookie-urile</h2>
      <p>
        Cookie-urile și tehnologiile similare (de exemplu stocarea locală din browser) sunt fișiere
        mici salvate pe dispozitivul tău când vizitezi un site.
      </p>
      <h2>Ce folosim</h2>
      <ul>
        <li><strong>Necesare</strong> (mereu active): memorează alegerea ta despre cookie-uri și sursa vizitei, ca site-ul să funcționeze corect.</li>
        <li><strong>Marketing</strong> (doar cu acordul tău): Meta Pixel, de la Meta Platforms Ireland Ltd. Ne arată dacă reclamele noastre aduc vizite și mesaje. Se activează numai după ce apeși „Accept toate”.</li>
      </ul>
      <h2>Cum îți schimbi alegerea</h2>
      <p>
        Oricând, din <CookieSettingsLink className="text-trust underline cursor-pointer" />, sau
        ștergând cookie-urile din setările browserului.
      </p>
    </LegalPage>
  );
}
