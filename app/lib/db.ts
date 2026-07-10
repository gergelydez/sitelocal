import { Pool } from "pg";

// Vercel's Neon/Postgres integration injects one of these automatically
// once you connect a database to the project (see README).
const connectionString =
  process.env.POSTGRES_URL || process.env.DATABASE_URL;

// Un singur pool reutilizat între invocări (cold start), ca la orice
// funcție serverless — evită să deschidem o conexiune nouă la fiecare request.
let pool: Pool | null = null;

function getPool() {
  if (!connectionString) return null;
  if (!pool) {
    // Producție (Neon/Vercel Postgres) cere SSL; localhost, de obicei, nu îl are activat.
    const isLocal = /localhost|127\.0\.0\.1/.test(connectionString);
    pool = new Pool({
      connectionString,
      ssl: isLocal ? false : { rejectUnauthorized: false },
    });
  }
  return pool;
}

export interface Lead {
  id: number;
  nume: string;
  firma: string;
  telefon: string;
  email: string;
  domeniu: string;
  created_at: string;
}

async function ensureTable() {
  const db = getPool();
  if (!db) return null;
  await db.query(`
    CREATE TABLE IF NOT EXISTS leads (
      id SERIAL PRIMARY KEY,
      nume TEXT NOT NULL,
      firma TEXT NOT NULL,
      telefon TEXT NOT NULL,
      email TEXT NOT NULL,
      domeniu TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `);
  return db;
}

export async function saveLead(data: {
  nume: string;
  firma: string;
  telefon: string;
  email: string;
  domeniu: string;
}) {
  const db = await ensureTable();
  if (!db) {
    console.warn(
      "Dashboard skip — lipsește POSTGRES_URL/DATABASE_URL din .env (vezi README pentru cum conectezi baza de date)"
    );
    return;
  }
  await db.query(
    `INSERT INTO leads (nume, firma, telefon, email, domeniu) VALUES ($1, $2, $3, $4, $5)`,
    [data.nume, data.firma, data.telefon, data.email, data.domeniu]
  );
}

export async function listLeads(): Promise<Lead[]> {
  const db = await ensureTable();
  if (!db) return [];
  const result = await db.query<Lead>(
    `SELECT * FROM leads ORDER BY created_at DESC LIMIT 200`
  );
  return result.rows;
}

// --- Analytics (page views, contacte, lead-uri, cu sursa de trafic) ---

async function ensureEventsTable() {
  const db = getPool();
  if (!db) return null;
  await db.query(`
    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      event_name TEXT NOT NULL,
      path TEXT,
      referrer TEXT,
      utm_source TEXT,
      utm_medium TEXT,
      utm_campaign TEXT,
      source TEXT NOT NULL DEFAULT 'Direct',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `);
  return db;
}

export async function saveEvent(data: {
  eventName: string;
  path?: string | null;
  referrer?: string | null;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  source?: string | null;
}) {
  const db = await ensureEventsTable();
  if (!db) return;
  await db.query(
    `INSERT INTO events (event_name, path, referrer, utm_source, utm_medium, utm_campaign, source)
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [
      data.eventName,
      data.path || null,
      data.referrer || null,
      data.utmSource || null,
      data.utmMedium || null,
      data.utmCampaign || null,
      data.source || "Direct",
    ]
  );
}

export interface AnalyticsSummary {
  totals: { event_name: string; count: number }[];
  bySource: { source: string; event_name: string; count: number }[];
  dailyPageViews: { day: string; count: number }[];
}

export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  const db = await ensureEventsTable();
  if (!db) return { totals: [], bySource: [], dailyPageViews: [] };

  const totals = await db.query<{ event_name: string; count: string }>(
    `SELECT event_name, COUNT(*)::text as count FROM events GROUP BY event_name`
  );
  const bySource = await db.query<{
    source: string;
    event_name: string;
    count: string;
  }>(
    `SELECT source, event_name, COUNT(*)::text as count
     FROM events GROUP BY source, event_name ORDER BY source, event_name`
  );
  const dailyPageViews = await db.query<{ day: string; count: string }>(
    `SELECT to_char(created_at, 'YYYY-MM-DD') as day, COUNT(*)::text as count
     FROM events
     WHERE event_name = 'PageView' AND created_at > now() - interval '30 days'
     GROUP BY day ORDER BY day`
  );

  return {
    totals: totals.rows.map((r) => ({
      event_name: r.event_name,
      count: Number(r.count),
    })),
    bySource: bySource.rows.map((r) => ({
      source: r.source,
      event_name: r.event_name,
      count: Number(r.count),
    })),
    dailyPageViews: dailyPageViews.rows.map((r) => ({
      day: r.day,
      count: Number(r.count),
    })),
  };
}
