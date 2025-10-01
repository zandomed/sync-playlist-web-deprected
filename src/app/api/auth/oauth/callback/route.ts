import { NextResponse } from 'next/server';

import { httpClient } from '@infra/http/server';

function getTokenMaxAge(token: string): number {
  try {
    const payload = JSON.parse(
      Buffer.from(token.split('.')[1], 'base64').toString(),
    );

    if (payload.exp) {
      const expiresIn = payload.exp - Math.floor(Date.now() / 1000);
      return expiresIn > 0 ? expiresIn : 60 * 60; // Default to 1 hour if expired
    }
  } catch (error) {
    console.error('Error parsing token:', error);
  }

  return 60 * 60; // Default to 1 hour
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const accessToken = searchParams.get('access_token');
  const refreshToken = searchParams.get('refresh_token');
  const token = searchParams.get('state');

  if (!accessToken || !token || !refreshToken) {
    return new Response('Missing access_token, state or refresh_token', {
      status: 400,
    });
  }
  // Validate state here if you have stored it in a cookie or session

  try {
    const resp = await httpClient.post(
      '/v1/oauth/verify',
      { token },
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
    if (resp.status !== 200) {
      return new Response('Invalid state', { status: 400 });
    }
  } catch (error) {
    console.error('Error validating state with backend:', error);
    return new Response('Error validating state with backend', { status: 500 });
  }

  // Get maxAge from tokens
  const accessTokenMaxAge = getTokenMaxAge(accessToken);
  const refreshTokenMaxAge = getTokenMaxAge(refreshToken);
  const redirectUrl = new URL('/dashboard', new URL(request.url).origin);
  const response = NextResponse.redirect(redirectUrl, { status: 302 });

  // Save accessToken in cookie
  response.cookies.set('access_token', accessToken, {
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: accessTokenMaxAge,
  });

  // Save refreshToken in cookie
  response.cookies.set('refresh_token', refreshToken, {
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: refreshTokenMaxAge,
  });

  return response;
}
