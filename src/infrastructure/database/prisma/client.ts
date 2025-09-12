import { PrismaClient } from '@gen/prisma';
import { env } from '@shared/config/env';

const prisma = new PrismaClient({
  log: env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

export default prisma;
