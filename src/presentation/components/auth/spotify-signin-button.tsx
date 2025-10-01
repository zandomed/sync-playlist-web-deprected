'use client';
import { SiSpotify } from '@icons-pack/react-simple-icons';

import { Button } from '@presentation/components/ui/button';

export default function SpotifySignInButton() {
  const handleLoginWithSpotify = async () => {
    window.location.href = 'http://127.0.0.1:8080/v1/oauth/spotify';
  };

  return (
    <Button
      variant="outline"
      size="lg"
      className="flex w-full items-center justify-center"
      onClick={handleLoginWithSpotify}
    >
      <SiSpotify />
    </Button>
  );
}
