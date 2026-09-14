import { PrismaClient } from '@prisma/client';

const DEFAULT_DATABASE_URL =
  'mysql://u468161300_omswastik:OmSwastik%232026%21ProdDb@srv2204.hstgr.io:3306/u468161300_omswastik';

function getDatabaseUrl(): string {
  if (process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith('mysql://')) {
    return process.env.DATABASE_URL;
  }
  return DEFAULT_DATABASE_URL;
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: getDatabaseUrl(),
      },
    },
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
