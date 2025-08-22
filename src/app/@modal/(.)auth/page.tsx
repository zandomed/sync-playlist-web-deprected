'use client';
import { ComponentRef, useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/navigation';

import { createPortal } from 'react-dom';

import AuthCard, {
  AuthFormTabOption,
} from '@/presentation/components/auth/auth-form';

export default function AuthModal() {
  const router = useRouter();
  const dialogRef = useRef<ComponentRef<'dialog'>>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      // toast({
      //   title: 'Invalid email',
      //   description: 'Please enter a valid email address.',
      //   variant: 'destructive',
      // });
      return;
    }

    setIsLoading(true);

    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      // toast({
      //   title: 'Signed in successfully!',
      //   description: 'Welcome back to your account.',
      // });
    }, 1500);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      // toast({
      //   title: 'Password too short',
      //   description: 'Password must be at least 6 characters long.',
      //   variant: 'destructive',
      // });
      return;
    }

    setIsLoading(true);

    // Simulate registration
    setTimeout(() => {
      setIsLoading(false);
      // toast({
      //   title: 'Account created!',
      //   description: 'Your account has been created successfully.',
      // });
    }, 1500);
  };

  const handleSocialLogin = (provider: string) => {
    // toast({
    //   title: `${provider} login`,
    //   description: `Redirecting to ${provider}...`,
    // });
  };

  const handleForgotPassword = () => {
    // toast({
    //   title: 'Reset link sent',
    //   description: 'Check your email for password reset instructions.',
    // });
  };

  return createPortal(
    <dialog
      ref={dialogRef}
      className="fixed inset-0 flex size-auto max-h-none max-w-none items-center justify-center bg-transparent backdrop:backdrop-blur-2xl"
      onClose={onDismiss}
      closedby="any"
    >
      <AuthCard
        type={AuthFormTabOption.SIGN_IN}
        isLoading={isLoading}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        rememberMe={rememberMe}
        setRememberMe={setRememberMe}
        onSignIn={handleSignIn}
        onSignUp={handleSignUp}
        onSocialLogin={handleSocialLogin}
        onForgotPassword={handleForgotPassword}
      />
    </dialog>,
    document.getElementById('modal-root')!,
  );
}
