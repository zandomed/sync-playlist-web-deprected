'use client';

import type React from 'react';
import { useCallback, useMemo, useState } from 'react';

import { useRouter } from 'next/navigation';

import { X, Eye, EyeOff } from 'lucide-react';

import { Button } from '@/presentation/components/ui/button';
import { Input } from '@/presentation/components/ui/input';

export enum AuthFormTabOption {
  SIGN_IN = 'signIn',
  SIGN_UP = 'signUp',
}

// type AuthTabOption = 'signIn' | 'signUp';

interface AuthFormProps {
  type: AuthFormTabOption;
  isLoading: boolean;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  rememberMe: boolean;
  setRememberMe: (remember: boolean) => void;
  onSignIn: (e: React.FormEvent) => void;
  onSignUp: (e: React.FormEvent) => void;
  onSocialLogin: (provider: string) => void;
  onForgotPassword: () => void;
}

export default function AuthForm({
  type: initialTab,
  isLoading,
  email,
  setEmail,
  password,
  setPassword,
  rememberMe,
  setRememberMe,
  onSignIn,
  onSignUp,
  onSocialLogin,
  onForgotPassword,
}: AuthFormProps) {
  const [activeTab, setActiveTab] = useState<AuthFormTabOption>(initialTab);
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const isSelectedTab = useCallback(
    (option: AuthFormTabOption) => {
      return activeTab === option;
    },
    [activeTab],
  );

  const isSignUp = useMemo<boolean>(
    () => isSelectedTab(AuthFormTabOption.SIGN_UP),
    [isSelectedTab],
  );

  const handleRedirect = () => {
    // router.replace('/dashboard');
    router.replace('/dashboard');
    // window.history.replaceState(null, '', '/dashboard');
    // window.location.href = '/dashboard';
    // window.open('https://www.youtube.com/@diecastbydollarall', '_blank');
  };

  const handleChangeTab = useCallback(
    (option: AuthFormTabOption) => {
      if (isSelectedTab(option)) return;
      setActiveTab(option);
    },
    [isSelectedTab],
  );

  const handleOnClose = () => {
    console.log(window.history.state.idx);
    if (window.history.state && window.history.state.idx > 0) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <div className="mx-auto w-md">
      <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
        {/* Header with tabs and close button */}
        <div className="mb-8 flex items-center justify-between">
          <div className="relative flex rounded-lg border border-gray-200 p-1">
            <div
              className={`bg-primary absolute top-1 bottom-1 rounded-md transition-all duration-300 ease-in-out ${
                isSignUp ? 'right-1/2 left-1' : 'right-1 left-1/2'
              }`}
            />
            <button
              onClick={() => handleChangeTab(AuthFormTabOption.SIGN_UP)}
              data-selected={isSelectedTab(AuthFormTabOption.SIGN_UP)}
              className="relative z-10 rounded-md px-6 py-2 text-sm font-medium text-gray-600 transition-all duration-200 not-data-selected:cursor-pointer not-data-selected:hover:text-black data-selected:text-white"
            >
              Sign up
            </button>
            <button
              onClick={() => handleChangeTab(AuthFormTabOption.SIGN_IN)}
              data-selected={isSelectedTab(AuthFormTabOption.SIGN_IN)}
              className="relative z-10 rounded-md px-6 py-2 text-sm font-medium text-gray-600 transition-all duration-200 not-data-selected:cursor-pointer not-data-selected:hover:text-black data-selected:text-white"
            >
              Sign in
            </button>
          </div>
          <button
            onClick={handleOnClose}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 transition-colors duration-200 hover:bg-gray-50"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        <h1 className="mb-8 text-3xl font-normal text-black">
          {isSignUp ? 'Create an account' : 'Welcome back'}
        </h1>

        <div className="relative overflow-hidden">
          <div
            className={`transform transition-all duration-500 ease-in-out ${
              isSignUp
                ? 'translate-x-0 opacity-100'
                : 'absolute inset-0 -translate-x-full opacity-0'
            }`}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleRedirect();
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <Input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="h-12 rounded-lg border border-gray-200 text-base text-black transition-colors duration-200 placeholder:text-gray-400 focus:border-black focus:ring-0"
                    placeholder="First name"
                  />
                </div>
                <div className="relative">
                  <Input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="h-12 rounded-lg border border-gray-200 text-base text-black transition-colors duration-200 placeholder:text-gray-400 focus:border-black focus:ring-0"
                    placeholder="Last name"
                  />
                </div>
              </div>

              <div className="relative">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-lg border border-gray-200 text-base text-black transition-colors duration-200 placeholder:text-gray-400 focus:border-black focus:ring-0"
                  placeholder="Enter your email"
                />
              </div>

              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 rounded-lg border border-gray-200 pr-12 text-base text-black transition-colors duration-200 placeholder:text-gray-400 focus:border-black focus:ring-0"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-4 -translate-y-1/2 transform text-gray-400 transition-colors duration-200 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Creating account...' : 'Create an account'}
              </Button>
            </form>
          </div>

          <div
            className={`transform transition-all duration-500 ease-in-out ${
              isSignUp
                ? 'absolute inset-0 translate-x-full opacity-0'
                : 'translate-x-0 opacity-100'
            }`}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleRedirect();
              }}
              className="space-y-4"
            >
              {/* Email field */}
              <div className="relative">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-lg border border-gray-200 text-base text-black transition-colors duration-200 placeholder:text-gray-400 focus:border-black focus:ring-0"
                  placeholder="Enter your email"
                />
              </div>

              {/* Password field */}
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 rounded-lg border border-gray-200 pr-12 text-base text-black transition-colors duration-200 placeholder:text-gray-400 focus:border-black focus:ring-0"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-4 -translate-y-1/2 transform text-gray-400 transition-colors duration-200 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>

              {/* Remember me and forgot password */}
              <div className="flex items-center justify-between">
                <label className="flex cursor-pointer items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="accent-primary h-4 w-4 rounded border border-gray-300 text-black focus:ring-2 focus:ring-black"
                  />
                  <span className="text-sm text-gray-600 select-none">
                    Remember me
                  </span>
                </label>
                <button
                  type="button"
                  onClick={onForgotPassword}
                  className="text-sm text-gray-600 transition-colors duration-200 hover:text-black"
                >
                  Forgot password?
                </button>
              </div>
              {/* Sign in button */}
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 flex items-center">
          <div className="h-px flex-1 bg-gray-200"></div>
          <span className="px-4 text-sm font-medium text-gray-400">
            {isSignUp ? 'OR SIGN IN WITH' : 'OR CONTINUE WITH'}
          </span>
          <div className="h-px flex-1 bg-gray-200"></div>
        </div>

        {/* Social buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={handleRedirect}
            className="flex h-12 items-center justify-center rounded-lg border border-gray-200 transition-colors duration-200 hover:bg-gray-50"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-white">
              <div className="h-4 w-4 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500"></div>
            </div>
          </button>
          <button
            onClick={handleRedirect}
            className="flex h-12 items-center justify-center rounded-lg border border-gray-200 transition-colors duration-200 hover:bg-gray-50"
          >
            <div className="h-6 w-6 text-black">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
            </div>
          </button>
        </div>

        <p className="mt-8 text-center text-sm text-gray-400">
          {isSignUp
            ? 'By creating an account, you agree to our Terms & Service'
            : 'By signing in, you agree to our Terms & Service'}
        </p>
      </div>
    </div>
  );
}
