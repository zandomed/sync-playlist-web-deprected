import { z } from 'zod';

import { Log } from '@shared/utils/logger';

const envSchema = z.object({
  BETTER_AUTH_SECRET: z.string(),
  BETTER_AUTH_URL: z.url().default('http://localhost:3000'),
  BETTER_AUTH_TELEMETRY_DEBUG: z.stringbool().default(false),

  DATABASE_URL: z.string(),

  NEXT_PUBLIC_APP_URL: z.url().default('http://localhost:3000'),
  NEXT_PUBLIC_API_URL: z.url().default('http://localhost:3000/api'),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),

  LOG_LEVEL: z
    .enum(Log)
    .default(Log.DEBUG)
    .transform((val) => parseInt(val.toString(), 10)),

  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),

  SPOTIFY_CLIENT_ID: z.string(),
  SPOTIFY_CLIENT_SECRET: z.string(),
  SPOTIFY_API_URL: z.url().default('https://api.spotify.com/v1'),

  APPLE_CLIENT_ID: z.string().optional(),
  APPLE_CLIENT_SECRET: z.string().optional(),
});

export const env = envSchema.parse(process.env);
