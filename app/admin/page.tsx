import type { Metadata } from "next";
import { listLeads } from "@/app/lib/db";

export const metadata: Metadata = {
  title: "Dashboard lead-uri — Site Local",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  let leads: Awaited<ReturnType<typeof listLeads>> = [];
  let dbError = false;

  try {
    leads = await listLeads();
  } catch (err) {
    console.error("Eroare citire lead-uri:", err);
    dbError = true;
  }

  return (
    <div className="min-h-screen bg-bg text-text px-6 py-10 md:py-14">
      <div className="max-w-[1000px] mx-auto">
        <h1 className="font-display font-bold text-[24px] mb-1 tracking-tight">
          Lead-uri primite
        </h1>
        <p className="text-muted text-[13.5px] mb-8">
          Ultimele {leads.length} din formularul de demo, cele mai noi primele.
        </p>

        {dbError ? (
          <div className="bg-surface border border-white/10 rounded-xl p-6 text-[14px] text-muted">
            Nu am putut citi baza de date. Verifică dacă <code>POSTGRES_URL</code>{" "}
            (sau <code>DATABASE_URL</code>) e conectat corect în Vercel — vezi README.
          </div>
        ) : leads.length === 0 ? (
          <div className="bg-surface border border-white/10 rounded-xl p-6 text-[14px] text-muted">
            Niciun lead încă. Odată ce cineva completează formularul, apare aici.
          </div>
        ) : (
          <div className="overflow-x-auto border border-white/10 rounded-xl">
            <table className="w-full text-[13.5px] border-collapse">
              <thead>
                <tr className="text-left text-muted border-b border-white/10 bg-surface">
                  <th className="p-3 font-semibold whitespace-nowrap">Data</th>
                  <th className="p-3 font-semibold">Nume</th>
                  <th className="p-3 font-semibold">Firmă</th>
                  <th className="p-3 font-semibold">Telefon</th>
                  <th className="p-3 font-semibold">Email</th>
                  <th className="p-3 font-semibold">Domeniu</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((l) => (
                  <tr key={l.id} className="border-b border-white/6 last:border-0">
                    <td className="p-3 text-muted whitespace-nowrap">
                      {new Date(l.created_at).toLocaleString("ro-RO", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </td>
                    <td className="p-3">{l.nume}</td>
                    <td className="p-3">{l.firma}</td>
                    <td className="p-3 whitespace-nowrap">
                      <a
                        href={`https://wa.me/40${l.telefon.replace(/\D/g, "")}`}
                        className="text-trust hover:text-trust/80 transition-colors"
                      >
                        {l.telefon}
                      </a>
                    </td>
                    <td className="p-3">
                      <a
                        href={`mailto:${l.email}`}
                        className="text-trust hover:text-trust/80 transition-colors"
                      >
                        {l.email}
                      </a>
                    </td>
                    <td className="p-3">{l.domeniu}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
