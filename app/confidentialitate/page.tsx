import type { Metadata } from "next";
import LegalPage from "../components/LegalPage";
import CompanyBlock from "../components/CompanyBlock";
import { COMPANY } from "../lib/company";

export const metadata: Metadata = { title: "Politica de confidențialitate — Site Local" };

export default function Page() {
  return (
    <LegalPage title="Politica de confidențialitate">
      <p>Ultima actualizare: {COMPANY.updated}</p>
      <h2>1. Operatorul datelor</h2>
      <CompanyBlock />
      <h2>2. Ce date colectăm</h2>
      <ul>
        <li><strong>Date trimise de tine:</strong> nume, telefon, email, numele și domeniul afacerii, mesajul, prin formular sau WhatsApp.</li>
        <li><strong>Date tehnice:</strong> paginile vizitate, sursa vizitei (de exemplu o reclamă), tipul dispozitivului.</li>
        <li><strong>Date de marketing:</strong> doar dacă accepți cookie-urile de marketing, Meta Pixel înregistrează vizita și apăsarea butoanelor de contact.</li>
      </ul>
      <h2>3. De ce le folosim (temeiul legal)</h2>
      <ul>
        <li>Ca să îți răspundem și să îți facem demo-ul cerut (pași înainte de încheierea unui contract, art. 6(1)(b) GDPR).</li>
        <li>Ca să emitem facturi și să respectăm obligațiile legale (art. 6(1)(c) GDPR).</li>
        <li>Ca să măsurăm reclamele, doar cu acordul tău (art. 6(1)(a) GDPR). Îți poți retrage acordul oricând din „Setări cookie-uri”.</li>
      </ul>
      <h2>4. Cui le transmitem</h2>
      <p>
        Furnizorilor care ne ajută să funcționăm: găzduirea site-ului (Vercel), WhatsApp și Meta
        Platforms (pentru mesaje și, cu acordul tău, pentru măsurarea reclamelor). Unii dintre ei pot
        prelucra date în afara Spațiului Economic European, cu garanțiile prevăzute de GDPR. Nu vindem
        datele tale.
      </p>
      <h2>5. Cât timp le păstrăm</h2>
      <p>
        Datele de contact le păstrăm cât durează discuția sau colaborarea și cel mult 2 ani după
        ultima interacțiune. Documentele contabile le păstrăm cât cere legea.
      </p>
      <h2>6. Drepturile tale</h2>
      <p>
        Ai dreptul de acces, rectificare, ștergere, restricționare, portabilitate, opoziție și dreptul
        de a-ți retrage consimțământul. Ne poți scrie la datele de contact de mai sus. Ai și dreptul să
        depui plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter
        Personal (<a href="https://www.dataprotection.ro" target="_blank" rel="noopener noreferrer">dataprotection.ro</a>).
      </p>
    </LegalPage>
  );
}
