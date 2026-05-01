import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Detect if we are in the build phase
const isBuildPhase = process.env.NEXT_PHASE === "phase-production-build";
const isDev = process.env.NODE_ENV === "development";

// Use standard driver locally AND during the build phase to avoid WebSocket errors
// Use Neon adapter only at runtime in production
export const prisma =
  globalForPrisma.prisma ??
  (isDev || isBuildPhase
    ? new PrismaClient({
        log: isDev ? ["query", "error", "warn"] : ["error"],
      })
    : new PrismaClient({
        adapter: new PrismaNeon(new Pool({ connectionString: process.env.DATABASE_URL })),
        log: ["error"],
      }));

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

