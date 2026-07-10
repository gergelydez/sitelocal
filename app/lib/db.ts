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
