import axios, { AxiosInstance, AxiosResponse } from 'axios';

import { env } from '@shared/config/env';

export class AxiosHttpClient {
  private instance: AxiosInstance;
  constructor(baseURL?: string) {
    this.instance = axios.create({
      baseURL: baseURL || env.NEXT_PUBLIC_API_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // this.instance.interceptors.request.use(
    //     (config: AxiosRequestConfig) => {
    //         return config;
    //     },
    //     (error) => Promise.reject(error)
    // );
    // this.instance.interceptors.response.use(
    //     (response: AxiosResponse) => response,
    //     (error) => {
    //         if (error.response?.status === 401) {
    //             window.location.href = '/login';
    //         }
    //         return Promise.reject(error);
    //     }
    // );
  }

  async get<T = unknown>(
    url: string,
    config?: Record<string, unknown>,
  ): Promise<AxiosResponse<T>> {
    return this.instance.get<T>(url, config);
  }

  async post<T = unknown>(
    url: string,
    data?: unknown,
    config?: Record<string, unknown>,
  ): Promise<AxiosResponse<T>> {
    return this.instance.post<T>(url, data, config);
  }

  async put<T = unknown>(
    url: string,
    data?: unknown,
    config?: Record<string, unknown>,
  ): Promise<AxiosResponse<T>> {
    return this.instance.put<T>(url, data, config);
  }
  async patch<T = unknown>(
    url: string,
    data?: unknown,
    config?: Record<string, unknown>,
  ): Promise<AxiosResponse<T>> {
    return this.instance.patch<T>(url, data, config);
  }
  async delete<T = unknown>(
    url: string,
    config?: Record<string, unknown>,
  ): Promise<AxiosResponse<T>> {
    return this.instance.delete<T>(url, config);
  }
}
