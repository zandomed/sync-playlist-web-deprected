'use client';

import { SiGoogle } from '@icons-pack/react-simple-icons';

import { authClient } from '@/lib/auth-client';

import { Button } from '../ui/button';

export default function GoogleSignInButton() {
  const handleLoginWithGoogle = async () => {
    const data = await authClient.signIn.social({
      provider: 'google',
    });

    console.log(data);
  };

  return (
    <Button
      variant="outline"
      size="lg"
      className="flex items-center justify-center"
      onClick={handleLoginWithGoogle}
    >
      <SiGoogle />
    </Button>
  );
}
