import { Button } from '@/presentation/components/ui/button';

export default function DashboardPage() {
  return (
    <div className="flex h-full items-center justify-center gap-2">
      <Button>Connect with Spotify</Button>
      <Button>Connect with Apple Music</Button>
    </div>
  );
}
