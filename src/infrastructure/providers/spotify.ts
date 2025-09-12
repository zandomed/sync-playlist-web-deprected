import { headers } from 'next/headers';

import { auth } from '@infra/auth/server';
import { Spotify } from '@infra/lib/spotify';

export const spotify = new Spotify({
  getToken: async () => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) return '';

    const token = await auth.api.getAccessToken({
      headers: await headers(),
      body: {
        providerId: 'spotify',
      },
    });

    return token?.accessToken || '';
  },
  getUserId: async () => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) return '';

    const accounts = await auth.api.listUserAccounts({
      headers: await headers(),
    });

    // console.log("accounts", accounts);

    const accountId =
      accounts.find((account) => account.provider === 'spotify')?.accountId ||
      '';

    // const account = await auth.api.accountInfo({
    //     headers: await headers(),
    //     body: {

    //         accountId
    //     }
    // })

    // console.log(account)

    return accountId || '';
  },
});
