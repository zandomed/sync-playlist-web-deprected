'use client';
import { SiGoogle } from '@icons-pack/react-simple-icons';

import { auth } from '@infra/auth/client';
import { Button } from '@presentation/components/ui/button';

export default function GoogleSignInButton() {
  const handleLoginWithGoogle = async () => {
    const data = await auth.signIn.social({
      provider: 'google',
    });

    console.log(data);
  };

  return (
    <Button
      variant="outline"
      size="lg"
      className="flex w-full items-center justify-center"
      onClick={handleLoginWithGoogle}
    >
      <SiGoogle />
    </Button>
  );
}
