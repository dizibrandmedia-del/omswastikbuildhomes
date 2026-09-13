import { PrismaClient } from '@prisma/client';
import path from 'path';
import fs from 'fs';

// Helper to determine accurate and writable SQLite database path
function getDatabaseUrl(): string {
  if (process.env.DATABASE_URL && !process.env.DATABASE_URL.startsWith('file:')) {
    return process.env.DATABASE_URL;
  }

  // On Vercel serverless runtime, /var/task is read-only.
  // We copy dev.db to /tmp/dev.db where SQLite can open, lock and write.
  if (process.env.VERCEL) {
    const tmpDbPath = path.join('/tmp', 'dev.db');
    if (!fs.existsSync(tmpDbPath)) {
      const candidates = [
        path.join(process.cwd(), 'prisma', 'dev.db'),
        path.join(process.cwd(), 'dev.db'),
      ];
      for (const src of candidates) {
        if (fs.existsSync(src)) {
          try {
            fs.copyFileSync(src, tmpDbPath);
            break;
          } catch (e) {
            console.error('Error copying db to /tmp on Vercel:', e);
          }
        }
      }
    }
    if (fs.existsSync(tmpDbPath)) {
      return 'file:' + tmpDbPath;
    }
  }

  // If running locally or on regular server
  const candidates = [
    path.join(process.cwd(), 'prisma', 'dev.db'),
    path.join(process.cwd(), 'dev.db'),
  ];
  for (const src of candidates) {
    if (fs.existsSync(src)) {
      return 'file:' + src.replace(/\\/g, '/');
    }
  }

  return process.env.DATABASE_URL || 'file:./prisma/dev.db';
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
