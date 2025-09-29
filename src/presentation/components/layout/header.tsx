import { Music } from 'lucide-react';

import { UserAvatarSession } from '@presentation/components/auth';
import { Badge } from '@presentation/components/ui/badge';

export default async function Header() {
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
          <UserAvatarSession user={null} />
        </div>
      </div>
    </header>
  );
}
