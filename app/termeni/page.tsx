import type { Metadata } from "next";
import LegalPage from "../components/LegalPage";
import CompanyBlock from "../components/CompanyBlock";
import { COMPANY } from "../lib/company";

export const metadata: Metadata = { title: "Termeni și condiții — Site Local" };

export default function Page() {
  return (
    <LegalPage title="Termeni și condiții">
      <p>Ultima actualizare: {COMPANY.updated}</p>
      <h2>1. Cine suntem</h2>
      <CompanyBlock />
      <h2>2. Serviciul</h2>
      <p>
        {COMPANY.brand} realizează site-uri de prezentare pentru afaceri. Clientul primește gratuit
        un demo funcțional, de regulă în 24 de ore de la primirea informațiilor necesare. Dacă
        demo-ul îi place, site-ul final este livrat, de regulă, în 48 de ore.
      </p>
      <h2>3. Preț și plată</h2>
      <ul>
        <li>Prețul de pornire este de 700 lei pentru un site de prezentare. Prețul final se confirmă în scris înainte de începerea lucrului.</li>
        <li>Demo-ul este gratuit și nu obligă clientul la nimic. Plata se face doar dacă clientul acceptă site-ul.</li>
        <li>Prețul include doar realizarea site-ului. Domeniul și găzduirea nu sunt incluse, dacă nu se convine altfel în scris.</li>
        <li>Pentru fiecare plată se emite factură.</li>
      </ul>
      <h2>4. Garanții</h2>
      <ul>
        <li>Site-ul și domeniul rămân pe numele clientului.</li>
        <li>În primele 30 de zile după predare, modificările de conținut (texte, poze, date de contact) sunt gratuite.</li>
      </ul>
      <h2>5. Obligațiile clientului</h2>
      <p>
        Clientul furnizează informații corecte despre afacere și garantează că deține drepturile
        asupra textelor, logo-urilor și fotografiilor trimise pentru site.
      </p>
      <h2>6. Răspundere</h2>
      <p>
        Nu răspundem pentru întreruperi cauzate de furnizorii de domeniu sau găzduire aleși de
        client, nici pentru conținutul furnizat de client.
      </p>
      <h2>7. Reclamații și litigii</h2>
      <p>
        Reclamațiile se trimit la datele de contact de mai sus și primesc răspuns în cel mult 15 zile.
        Consumatorii se pot adresa și Autorității Naționale pentru Protecția Consumatorilor
        (<a href="https://anpc.ro" target="_blank" rel="noopener noreferrer">anpc.ro</a>) sau pot folosi
        procedura de soluționare alternativă a litigiilor
        (<a href="https://anpc.ro/ce-este-sal/" target="_blank" rel="noopener noreferrer">SAL</a>).
        Litigiile nesoluționate pe cale amiabilă se judecă de instanțele competente din România.
      </p>
    </LegalPage>
  );
}
