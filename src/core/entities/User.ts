import { auth } from '@infra/auth/client';

export type User = typeof auth.$Infer.Session.user;
