'use client';

import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import { SiApple, SiGoogle, SiSpotify } from '@icons-pack/react-simple-icons';
import { ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { authClient } from '@/lib/auth-client';
import { Button } from '@/presentation/components/ui/button';
import { Checkbox } from '@/presentation/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/presentation/components/ui/form';
import { Input } from '@/presentation/components/ui/input';
import { useAppleDevice } from '@/presentation/hooks/useAppleDevice';

const signInFormSchema = z.object({
  email: z.email().min(2).max(250),
  password: z.string().min(8).max(30),
  rememberMe: z.boolean(),
});

export default function SignInPage() {
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const { isAppleDevice } = useAppleDevice();

  const handleSubmit = async (data: z.infer<typeof signInFormSchema>) => {
    console.log(data);
  };

  const handleLoginWithGoogle = async () => {
    const data = await authClient.signIn.social({
      provider: 'google',
    });

    console.log(data);
  };

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

            <div className="relative overflow-hidden">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="space-y-4 p-1"
                >
                  {/* Email field */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter your email"
                            {...field}
                          />
                        </FormControl>
                        {/* <FormDescription>This is your public display name.</FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Password field */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter your password"
                            className="pr-12"
                            {...field}
                          />
                        </FormControl>
                        {/* <FormDescription>This is your public display name.</FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Remember me and forgot password */}
                  <div className="flex items-center justify-between">
                    <FormField
                      control={form.control}
                      name="rememberMe"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center gap-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel>Remember me</FormLabel>
                          {/* <FormDescription>This is your public display name.</FormDescription> */}
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Link
                      type="button"
                      href="/"
                      onClick={() => {}}
                      className="text-sm text-gray-600"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  {/* Sign in button */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={form.formState.isLoading}
                  >
                    {form.formState.isLoading ? 'Signing in...' : 'Sign in'}
                  </Button>
                </form>
              </Form>
            </div>

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
              <Button
                variant="outline"
                size="lg"
                className="flex items-center justify-center"
                onClick={handleLoginWithGoogle}
              >
                <SiGoogle />
              </Button>
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
