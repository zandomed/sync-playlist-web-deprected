import { ArrowLeft } from 'lucide-react';

import GoogleSignInButton from '@/presentation/components/auth/google-signin-button';
import RegisterForm from '@/presentation/components/auth/register-form';
import { Button } from '@/presentation/components/ui/button';
import Link from '@/presentation/components/ui/link';

export default function SignUpPage() {
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

              <Link href="/login">Already have an account? Sign in</Link>
            </div>

            <h1 className="mb-8 text-3xl font-normal text-black">
              Create an account
            </h1>

            <RegisterForm />

            {/* Divider */}
            <div className="my-8 flex items-center">
              <div className="h-px flex-1 bg-gray-200"></div>
              <span className="px-4 text-sm font-medium text-gray-400">
                OR SIGN IN WITH
              </span>
              <div className="h-px flex-1 bg-gray-200"></div>
            </div>

            {/* Social buttons */}
            <div className="w-full">
              <GoogleSignInButton />
            </div>

            <p className="mt-8 text-center text-sm text-gray-400">
              By creating an account, you agree to our Terms & Service
            </p>
          </div>
        </div>
      </div>
      {/* <div className="bg-primary hidden h-full flex-1 lg:block"></div> */}
    </div>
  );
}
