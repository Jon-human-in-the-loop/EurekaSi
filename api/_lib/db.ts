import postgres from 'postgres'

/**
 * Cliente PostgreSQL para entorno serverless.
 *
 * - Reutiliza la conexión entre invocaciones (cached en globalThis) para
 *   reducir cold starts.
 * - `prepare: false` por compatibilidad con poolers (PgBouncer / Supabase
 *   pooler / Neon).
 * - Funciona con cualquier Postgres gestionado mediante DATABASE_URL
 *   (Neon, Supabase, Vercel Postgres, etc.).
 */

type Sql = ReturnType<typeof postgres>

declare global {
  // eslint-disable-next-line no-var
  var __eurekasi_sql: Sql | undefined
  // eslint-disable-next-line no-var
  var __eurekasi_schema_ready: Promise<void> | undefined
}

export function getSql(): Sql {
  const url = process.env.DATABASE_URL
  if (!url) {
    throw new Error('Falta la variable de entorno DATABASE_URL')
  }
  if (!globalThis.__eurekasi_sql) {
    globalThis.__eurekasi_sql = postgres(url, {
      ssl: 'require',
      prepare: false,
      max: 1,
      idle_timeout: 20,
      connect_timeout: 10,
    })
  }
  return globalThis.__eurekasi_sql
}

/** Crea las tablas si no existen (idempotente). Se ejecuta una vez por instancia. */
export function ensureSchema(): Promise<void> {
  if (!globalThis.__eurekasi_schema_ready) {
    const sql = getSql()
    globalThis.__eurekasi_schema_ready = (async () => {
      await sql/* sql */ `
        create table if not exists leads (
          id          uuid primary key default gen_random_uuid(),
          service     text,
          urgency     text,
          detail      text,
          name        text not null,
          phone       text not null,
          postal      text,
          lang        text,
          source      text,
          status      text not null default 'new',
          created_at  timestamptz not null default now()
        )
      `
      await sql/* sql */ `create index if not exists leads_created_at_idx on leads (created_at desc)`
    })().catch((err) => {
      // Permite reintentar el esquema en la siguiente invocación si falla
      globalThis.__eurekasi_schema_ready = undefined
      throw err
    })
  }
  return globalThis.__eurekasi_schema_ready
}
