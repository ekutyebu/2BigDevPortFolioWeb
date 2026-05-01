import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Singleton pattern for PrismaClient
export const prisma =
  globalForPrisma.prisma ??
  (process.env.NODE_ENV === "development"
    ? new PrismaClient({
        log: ["query", "error", "warn"],
      })
    : new PrismaClient({
        adapter: new PrismaNeon(new Pool({ connectionString: process.env.DATABASE_URL })),
        log: ["error"],
      }));

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

