import { PrismaClient } from "@prisma/client";

// Global variable declare karna zaroori hai Next.js hot-reloading ke liye
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"], // Console mein queries dekhne ke liye (optional)
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;