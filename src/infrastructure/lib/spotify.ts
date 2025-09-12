import { env } from '@shared/config/env';

import { AxiosHttpClient } from './axios';

type SpotifyConfig = {
  getToken: () => Promise<string>;
  getUserId: () => Promise<string>;
};

export class Spotify {
  private API_URL = env.SPOTIFY_API_URL || 'https://api.spotify.com/v1';
  private httpClient = new AxiosHttpClient(this.API_URL);
  private getToken: () => Promise<string>;
  private getUserId: () => Promise<string>;

  constructor(config?: Partial<SpotifyConfig>) {
    this.getToken = config?.getToken || this.defaultGetToken;
    this.getUserId = config?.getUserId || this.defaultGetUserId;
  }

  private defaultGetToken(): Promise<string> {
    // Provide a default implementation if needed
    return Promise.resolve('default_token');
  }

  private defaultGetUserId(): Promise<string> {
    // Provide a default implementation if needed
    return Promise.resolve('default_user_id');
  }

  public async getPlaylists(userId?: string) {
    userId = userId || (await this.getUserId());

    return this.httpClient.get(`/users/${userId}/playlists`, {
      headers: {
        Authorization: `Bearer ${await this.getToken()}`,
      },
    });
  }
  // Implementation for Spotify API interactions will go here
}
