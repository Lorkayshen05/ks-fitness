import { createClient } from "@libsql/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { PrismaClient } from "@prisma/client";

/**
 * One Prisma client, over whichever SQLite the environment provides.
 *
 * Local work and any host with a persistent disk use `DATABASE_URL` and
 * Prisma's own SQLite engine. Serverless hosts (Vercel among them) have no
 * writable disk, so setting `TURSO_DATABASE_URL` switches the same client onto
 * the libSQL driver against a hosted Turso database — same schema, same
 * migrations, same queries. Nothing else in the app knows the difference.
 */
export function createPrismaClient() {
  const log: ("error" | "warn")[] =
    process.env.NODE_ENV === "production" ? ["error"] : ["error", "warn"];

  const url = process.env.TURSO_DATABASE_URL;
  if (!url) return new PrismaClient({ log });

  // Prisma still validates the datasource block even when a driver adapter
  // supplies the real connection, so a placeholder keeps a Turso-only
  // deployment from needing a second, meaningless variable.
  process.env.DATABASE_URL ||= "file:./unused-by-the-libsql-adapter.db";

  const libsql = createClient({ url, authToken: process.env.TURSO_AUTH_TOKEN });
  return new PrismaClient({ adapter: new PrismaLibSQL(libsql), log });
}

/**
 * Constructed on first use, not on import: Prisma throws when its datasource
 * variable is missing, and a build step that only needs the fixed routes (the
 * sitemap) should degrade rather than fail. Next.js hot-reloads module scope in
 * development, so the instance is parked on `globalThis` to avoid exhausting
 * connections.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

let client: PrismaClient | undefined;

export function getPrisma(): PrismaClient {
  if (!client) {
    client = globalForPrisma.prisma ?? createPrismaClient();
    if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = client;
  }
  return client;
}
