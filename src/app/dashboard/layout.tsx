import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Sync your playlist across platforms',
};

type DashboardLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="grid h-dvh max-h-dvh w-full grid-cols-6">
      <aside className="col-span-1 border-r border-black/20">hola</aside>
      <main className="col-span-5">{children}</main>
    </div>
  );
}
