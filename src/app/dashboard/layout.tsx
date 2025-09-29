import type { Metadata } from 'next';

import UserAvatarSession from '@presentation/components/auth/user-avatar-session';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Sync your playlist across platforms',
};

type DashboardLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="grid h-dvh max-h-dvh w-full grid-cols-6">
      <aside className="col-span-1 border-r border-black/20 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Sync Playlist</h1>
          <UserAvatarSession user={null} />
        </div>
      </aside>
      <main className="col-span-5">{children}</main>
    </div>
  );
}
