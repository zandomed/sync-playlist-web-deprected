import { env } from './env';

export const databaseConfig = {
  url: env.DATABASE_URL,
  connectionTimeout: 10000,
  maxConnections: 10,
};
