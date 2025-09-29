import { z } from 'zod';

import { Log } from '@shared/utils/logger';

const envSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.url().default('http://localhost:3000'),
  NEXT_PUBLIC_API_URL: z.url().default('http://localhost:3000/api'),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),

  LOG_LEVEL: z
    .enum(Log)
    .default(Log.DEBUG)
    .transform((val) => parseInt(val.toString(), 10)),
});

export const env = envSchema.parse(process.env);
