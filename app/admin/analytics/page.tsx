import type { Metadata } from "next";
import Link from "next/link";
import { getAnalyticsSummary } from "@/app/lib/db";

export const metadata: Metadata = {
  title: "Analytics — Site Local",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const EVENT_LABELS: Record<string, string> = {
  PageView: "Page Views",
  Contact: "Contact (WhatsApp)",
  ViewContent: "ViewContent",
  Lead: "Lead-uri",
};

function StatTile({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="bg-surface border border-white/10 rounded-xl p-5">
      <div className="text-muted text-[12.5px] mb-1.5">{label}</div>
      <div className="font-display font-bold text-[26px]">{value}</div>
    </div>
  );
}

export default async function AnalyticsPage() {
  let summary: Awaited<ReturnType<typeof getAnalyticsSummary>> = {
    totals: [],
    bySource: [],
    dailyPageViews: [],
  };
  let dbError = false;

  try {
    summary = await getAnalyticsSummary();
  } catch (err) {
    console.error("Eroare citire analytics:", err);
    dbError = true;
  }

  const totalsByEvent: Record<string, number> = {};
  for (const t of summary.totals) totalsByEvent[t.event_name] = t.count;

  const pageViews = totalsByEvent["PageView"] || 0;
  const contacts = totalsByEvent["Contact"] || 0;
  const viewContent = totalsByEvent["ViewContent"] || 0;
  const leads = totalsByEvent["Lead"] || 0;
  const conversionRate = pageViews > 0 ? ((leads / pageViews) * 100).toFixed(1) : "0.0";

  // Pivotăm listă plată {source, event_name, count} într-un tabel pe surse
  const sources = new Map<string, Record<string, number>>();
  for (const row of summary.bySource) {
    if (!sources.has(row.source)) sources.set(row.source, {});
    sources.get(row.source)![row.event_name] = row.count;
  }
  const eventColumns = ["PageView", "Contact", "ViewContent", "Lead"];

  const maxDaily = Math.max(1, ...summary.dailyPageViews.map((d) => d.count));

  return (
    <div className="min-h-screen bg-bg text-text px-6 py-10 md:py-14">
      <div className="max-w-[1000px] mx-auto">
        <div className="flex items-center justify-between mb-1">
          <h1 className="font-display font-bold text-[24px] tracking-tight">Analytics</h1>
          <Link
            href="/admin"
            className="text-trust hover:text-trust/80 transition-colors text-[13.5px]"
          >
            ← Lead-uri
          </Link>
        </div>
        <p className="text-muted text-[13.5px] mb-8">
          De unde vine traficul și cât din el se transformă în lead-uri.
        </p>

        {dbError ? (
          <div className="bg-surface border border-white/10 rounded-xl p-6 text-[14px] text-muted">
            Nu am putut citi baza de date. Verifică dacă <code>POSTGRES_URL</code>{" "}
            (sau <code>DATABASE_URL</code>) e conectat corect în Vercel — vezi README.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
              <StatTile label="Page Views" value={pageViews} />
              <StatTile label="Contact (WhatsApp)" value={contacts} />
              <StatTile label="ViewContent" value={viewContent} />
              <StatTile label="Lead-uri" value={leads} />
              <StatTile label="Rată conversie" value={`${conversionRate}%`} />
            </div>

            <h2 className="font-display font-semibold text-[16px] mb-3">
              Trafic pe zi — ultimele 30 de zile
            </h2>
            {summary.dailyPageViews.length === 0 ? (
              <div className="bg-surface border border-white/10 rounded-xl p-6 text-[14px] text-muted mb-10">
                Încă nu există date de trafic.
              </div>
            ) : (
              <div className="bg-surface border border-white/10 rounded-xl p-5 mb-10">
                <div className="flex items-end gap-1 h-[100px]">
                  {summary.dailyPageViews.map((d) => (
                    <div
                      key={d.day}
                      title={`${d.day}: ${d.count} page views`}
                      className="flex-1 bg-trust/60 hover:bg-trust rounded-sm transition-colors min-w-[3px]"
                      style={{ height: `${Math.max(4, (d.count / maxDaily) * 100)}%` }}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-muted text-[11px] mt-2">
                  <span>{summary.dailyPageViews[0]?.day}</span>
                  <span>{summary.dailyPageViews[summary.dailyPageViews.length - 1]?.day}</span>
                </div>
              </div>
            )}

            <h2 className="font-display font-semibold text-[16px] mb-3">Pe surse de trafic</h2>
            {sources.size === 0 ? (
              <div className="bg-surface border border-white/10 rounded-xl p-6 text-[14px] text-muted">
                Încă nu există date.
              </div>
            ) : (
              <div className="overflow-x-auto border border-white/10 rounded-xl">
                <table className="w-full text-[13.5px] border-collapse">
                  <thead>
                    <tr className="text-left text-muted border-b border-white/10 bg-surface">
                      <th className="p-3 font-semibold">Sursă</th>
                      {eventColumns.map((c) => (
                        <th key={c} className="p-3 font-semibold whitespace-nowrap">
                          {EVENT_LABELS[c]}
                        </th>
                      ))}
                      <th className="p-3 font-semibold whitespace-nowrap">Rată conversie</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...sources.entries()]
                      .sort((a, b) => (b[1]["PageView"] || 0) - (a[1]["PageView"] || 0))
                      .map(([source, counts]) => {
                        const pv = counts["PageView"] || 0;
                        const ld = counts["Lead"] || 0;
                        const rate = pv > 0 ? ((ld / pv) * 100).toFixed(1) : "0.0";
                        return (
                          <tr key={source} className="border-b border-white/6 last:border-0">
                            <td className="p-3 font-medium">{source}</td>
                            {eventColumns.map((c) => (
                              <td key={c} className="p-3 text-muted">
                                {counts[c] || 0}
                              </td>
                            ))}
                            <td className="p-3 text-emerald font-medium">{rate}%</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
