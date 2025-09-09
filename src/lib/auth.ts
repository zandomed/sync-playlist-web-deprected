import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { nextCookies } from 'better-auth/next-js';

import prisma from '@/lib/prisma';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  trustedOrigins: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  plugins: [nextCookies()],
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ['google', 'spotify'],
      allowDifferentEmails: true,
      updateUserInfoOnLink: false,
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: false,
  },
  socialProviders: {
    google: {
      prompt: 'select_account consent',
      accessType: 'offline',
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      refreshAccessTokens: true,
    },
    spotify: {
      clientId: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
      scope: [
        'user-read-email',
        'playlist-read-private',
        'playlist-read-collaborative',
        'playlist-modify-public',
        'playlist-modify-private',
        'user-library-read',
        'user-library-modify',
      ],
      refreshAccessTokens: true,
    },
  },
});
