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
const getPrismaClient = () => {
  if (isDev || isBuildPhase) {
    return new PrismaClient({
      log: isDev ? ["query", "error", "warn"] : ["error"],
    });
  } else {
    // Production runtime on Vercel
    // Force HTTP (Fetch) mode for maximum stability on serverless
    (neonConfig as any).useFetchBatch = true;
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaNeon(pool);
    return new PrismaClient({ adapter, log: ["error"] });
  }
};

export const prisma = globalForPrisma.prisma ?? getPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

