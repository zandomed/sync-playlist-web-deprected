'use client';

import Link from 'next/link';

import { SiApple, SiSpotify } from '@icons-pack/react-simple-icons';
import { ArrowLeft } from 'lucide-react';

import GoogleSignInButton from '@/presentation/components/auth/google-signin-button';
import LoginForm from '@/presentation/components/auth/login-form';
import { Button } from '@/presentation/components/ui/button';
import { useAppleDevice } from '@/presentation/hooks/useAppleDevice';

export default function SignInPage() {
  const { isAppleDevice } = useAppleDevice();

  return (
    <div className="flex h-dvh flex-row items-center justify-center md:items-start">
      <div className="flex items-center justify-center bg-white md:h-full">
        <div className="mx-auto w-md">
          <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
            {/* Header with tabs and close button */}
            <div className="mb-8 flex items-center justify-between">
              <Link href="/">
                <Button variant="outline" size="lg">
                  <ArrowLeft />
                </Button>
              </Link>
            </div>

            <h1 className="mb-8 text-3xl font-normal text-black">
              Welcome back
            </h1>

            <LoginForm />

            {/* Divider */}
            <div className="my-8 flex items-center">
              <div className="h-px flex-1 bg-gray-200"></div>
              <span className="px-4 text-sm font-medium text-gray-400">
                OR CONTINUE WITH
              </span>
              <div className="h-px flex-1 bg-gray-200"></div>
            </div>

            {/* Social buttons */}
            <div className="grid grid-cols-2 gap-4">
              <GoogleSignInButton />
              {isAppleDevice && (
                <Button
                  variant="outline"
                  size="lg"
                  className="flex items-center justify-center"
                  onClick={() => {}}
                >
                  <SiApple className="text-red" />
                </Button>
              )}
              <Button
                variant="outline"
                size="lg"
                className="flex items-center justify-center"
                onClick={() => {}}
              >
                <SiSpotify className="text-spotify-primary" />
              </Button>
            </div>

            <p className="mt-8 text-center text-sm text-gray-400">
              By signing in, you agree to our Terms & Service
            </p>
          </div>
        </div>
      </div>
      {/* <div className="bg-primary hidden h-full flex-1 lg:block"></div> */}
    </div>
  );
}
