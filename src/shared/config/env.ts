import { z } from 'zod';

import { Log } from '@shared/utils/logger';

const envSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.url().default('http://127.0.0.1:3000'),
  NEXT_PUBLIC_API_URL: z.url().default('http://127.0.0.1:3000/api'),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  BACKEND_URL: z.url().default('http://127.0.0.1:8080'),
  LOG_LEVEL: z
    .enum(['0', '1', '2', '3', '4', '5'])
    .transform((val) => parseInt(val.toString(), 10))
    .default(Log.DEBUG),
});

const env = envSchema.parse(process.env);

export { env };
