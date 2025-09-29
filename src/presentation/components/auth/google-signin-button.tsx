'use client';
import { SiGoogle } from '@icons-pack/react-simple-icons';

import { Button } from '@presentation/components/ui/button';

export default function GoogleSignInButton() {
  const handleLoginWithGoogle = async () => {};

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
