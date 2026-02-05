// Import the PrismaClient from the locally generated directory to ensure type safety and up-to-date schema
import { PrismaClient } from "../generated/client_v2";

declare global {
  var prisma: PrismaClient | undefined;
}

// Set this to true if you've recently updated your schema and the changes aren't reflecting
const shouldRefresh = true;

// Initialize the Prisma client, reusing the global instance if it exists to avoid multiple connections in development
const client =
  (global.prisma && !shouldRefresh)
    ? global.prisma // Use existing global instance
    : new PrismaClient({ // Or create a new instance with query logging
        log: ["query"],
      });

// Add explicit model property mappings to handle capitalization differences if any
const proxyHandler = {
  get: (target: any, prop: string | symbol) => {
    if (typeof prop === 'string') {
      const lowerProp = prop.toLowerCase();
      // Try to find the property case-insensitively if direct access fails
      if (!(prop in target)) {
        // Models are often getters on the prototype, so they might not be in Object.keys
        // but they should be in 'in target'
        const foundKey = Object.keys(target).find(k => k.toLowerCase() === lowerProp);
        if (foundKey) return target[foundKey];
        
        // If it's still not found and looks like a model access (lowercase first letter)
        // or matches one of our known models
        const knownModels = ['user', 'note', 'blog', 'course', 'enrollment', 'newsletter'];
        if (knownModels.includes(lowerProp)) {
          if (!target[prop] && !target[lowerProp]) {
            console.warn(`Prisma model "${prop}" not found on the current client instance. This might be due to an outdated generated client or file locks during generation.`);
          }
        }
      }
    }
    return target[prop];
  }
};

export const prisma = new Proxy(client, proxyHandler) as PrismaClient;

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
