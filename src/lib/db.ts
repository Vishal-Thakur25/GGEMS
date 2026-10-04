import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var globalPrisma: PrismaClient | undefined;
}

/**
 * Singleton Prisma Client with connection pooling and dev hot-reloading guard.
 * Database credentials remain strictly on the server.
 */
export const db =
  global.globalPrisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  global.globalPrisma = db;
}

export default db;
