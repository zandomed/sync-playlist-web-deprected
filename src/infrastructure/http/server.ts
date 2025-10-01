import { AxiosHttpClient } from '@infra/lib/axios';

export const httpClient = new AxiosHttpClient(
  process.env.BACKEND_URL || 'http://127.0.0.1:8080',
);
