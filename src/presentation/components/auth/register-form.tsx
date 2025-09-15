'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { auth } from '@infra/auth/client';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@presentation/components/ui';

const signUpFormSchema = z
  .object({
    name: z.string().min(2).max(100),
    lastName: z.string().min(2).max(100),
    email: z.email().min(2).max(250),
    password: z.string().min(8).max(30),
    confirmPassword: z
      .string()
      .min(8, {
        message: 'Confirm Password must be at least 8 characters long',
      })
      .max(30),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

export default function RegisterForm() {
  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      lastName: '',
      name: '',
    },
  });

  const handleSubmit = async (formData: z.infer<typeof signUpFormSchema>) => {
    console.log(formData);
    const { data, error } = await auth.signUp.email({
      email: formData.email,
      password: formData.password,
      name: `${formData.name.trim()} ${formData.lastName.trim()}`,
    });

    if (error) {
      console.log(error);

      if (error.status === 403) {
        return alert('Please verify your email address');
      }

      if (error.status === 400) {
        return alert('Invalid email or password');
      }

      if (error.status === 500) {
        return alert('Internal server error');
      }

      return alert(error.message);
    }

    if (data) {
      // Handle successful registration
      console.log(data);
      alert('Registration successful!');
      // Optionally, redirect the user or perform other actions
      // For example, you could redirect to a login page:
      window.location.href = '/login';
    }
  };

  return (
    <div className="relative overflow-hidden">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-4 p-1"
        >
          <div className="grid grid-cols-2 items-start gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="items-start">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="items-start">
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your last name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password field */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Repeat your password"
                    className="pr-12"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Sign up button */}
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={form.formState.isSubmitting || !form.formState.isValid}
          >
            {form.formState.isSubmitting
              ? 'Creating account...'
              : 'Create an account'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
