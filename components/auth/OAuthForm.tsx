'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form';
import { Input } from '../ui/input';
import { AiOutlineGoogle } from 'react-icons/ai';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '../ui/use-toast';
import { useState } from 'react';
import { Icons } from '../ui/icons';
import { signIn } from 'next-auth/react';

const OAuthForm = () => {
  const formSchema = z.object({
    email: z.string().min(3, {
      message: 'Invalid Email.'
    })
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ''
    }
  });

  const { toast } = useToast();

  const [emailLoading, setEmailLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setEmailLoading(true);

    const signInResult = await signIn('email', {
      email: values.email.toLowerCase(),
      redirect: false
    });

    setEmailLoading(false);

    if (!signInResult?.ok) {
      return toast({
        title: 'Something went wrong.',
        description: 'Your sign in request failed. Please try again.',
        variant: 'destructive'
      });
    }

    return toast({
      title: 'Email verification link sent.',
      description:
        'We have sent the link to your email. Make sure to check spam too.'
    });
  };

  return (
    <div className="w-[20%] space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        autoCapitalize="none"
                        type="email"
                        autoComplete="email"
                        autoCorrect="off"
                        placeholder="abc@gmail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={emailLoading} className="mt-2" type="submit">
              {emailLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign In with Email
            </Button>
          </div>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="text-center w-full">
        <Button
          type="button"
          className="w-full"
          variant={'outline'}
          disabled={googleLoading}
          onClick={() => {
            setGoogleLoading(true);

            signIn('google');

            setGoogleLoading(false);
          }}
        >
          {googleLoading && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          <AiOutlineGoogle className="mr-2 w-5 h-5" />
          Google
        </Button>
      </div>
    </div>
  );
};

export default OAuthForm;
