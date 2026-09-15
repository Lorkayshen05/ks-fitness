import { createClient } from "@libsql/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { PrismaClient } from "@prisma/client";

/**
 * One Prisma client, over whichever SQLite the environment provides.
 *
 * Local and any host with a persistent disk use `DATABASE_URL` and Prisma's
 * own SQLite engine. Serverless hosts (Vercel among them) have no writable
 * disk, so setting `TURSO_DATABASE_URL` switches the same client onto the
 * libSQL driver against a hosted Turso database — same schema, same
 * migrations, same queries. Nothing else in the app knows the difference.
 */
export function createPrismaClient() {
  const log: ("error" | "warn")[] =
    process.env.NODE_ENV === "production" ? ["error"] : ["error", "warn"];

  const url = process.env.TURSO_DATABASE_URL;
  if (!url) return new PrismaClient({ log });

  const libsql = createClient({ url, authToken: process.env.TURSO_AUTH_TOKEN });
  return new PrismaClient({ adapter: new PrismaLibSQL(libsql), log });
}

/**
 * Next.js hot-reloads module scope in development, so the instance is parked on
 * `globalThis` to avoid exhausting connections.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
