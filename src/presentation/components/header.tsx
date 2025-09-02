import { headers } from 'next/headers';

import { User } from 'better-auth';
import { Music } from 'lucide-react';

import { auth } from '@/lib/auth';

import UserAvatarSession from './auth/user-avatar-session';
import { Badge } from './ui/badge';

export default async function Header() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <header className="fixed top-0 z-50 w-full border-b-2 border-b-black/10 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-brand flex h-8 w-8 items-center justify-center rounded-lg">
            <Music className="text-gradient-brand h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold">SyncPlaylist</span>
        </div>
        <div className="hidden items-center space-x-4 md:flex">
          <Badge>Beta</Badge>
          {session && <UserAvatarSession user={session.user as User} />}
        </div>
      </div>
    </header>
  );
}
