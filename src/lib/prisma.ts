import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

// Initialize Prisma client and reuse global in development
const client =
  global.prisma ??
  new PrismaClient({
    log: ["query"],
  });

// Optional proxy handler (keeps your existing safety behavior)
const proxyHandler = {
  get: (target: any, prop: string | symbol) => {
    if (typeof prop === "string") {
      const lowerProp = prop.toLowerCase();

      if (!(prop in target)) {
        const foundKey = Object.keys(target).find(
          (k) => k.toLowerCase() === lowerProp
        );
        if (foundKey) return target[foundKey];

        const knownModels = [
          "user",
          "note",
          "blog",
          "course",
          "enrollment",
          "newsletter",
        ];

        if (knownModels.includes(lowerProp)) {
          if (!target[prop] && !target[lowerProp]) {
            console.warn(
              `Prisma model "${prop}" not found on the current client instance. This might be due to an outdated generated client or file locks during generation.`
            );
          }
        }
      }
    }

    return target[prop];
  },
};

export const prisma = new Proxy(client, proxyHandler) as PrismaClient;

// Only attach to global in development to prevent multiple instances
if (process.env.NODE_ENV !== "production") global.prisma = client;

/**
 * Summary of this module's responsibilities:
 *
 * 1. Ensures a single Prisma instance in development (prevents "too many clients" errors).
 * 2. Exports the 'prisma' object for use across all server-side API routes and server components.
 * 3. Logs all SQL queries to the console for easier development and troubleshooting.
 * 4. Connects to PostgreSQL using the DATABASE_URL environment variable.
 * 5. Acts as the primary database connection manager for Auth, API routes, and Dashboards.
 */
