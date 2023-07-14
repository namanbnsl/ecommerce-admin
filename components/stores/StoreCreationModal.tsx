'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form';
import { Input } from '../ui/input';
import { Session } from 'next-auth';
import axios from 'axios';
import { toast } from '../ui/use-toast';
import { useState } from 'react';
import { Icons } from '../ui/icons';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Name should at least be 2 characters'
    })
    .max(60, {
      message: "Name can't exceed 60 characters"
    })
});

const StoreCreationModal = ({ session }: { session: Session }) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ''
    }
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);

      const body = z.object({
        name: z.string(),
        email: z.string()
      });

      const payload: z.infer<typeof body> = {
        email: session.user?.email!,
        name: values.name
      };

      await axios.post('/api/stores', payload);

      router.refresh();

      return toast({
        title: `${values.name} Store created.`,
        description: 'New store created.'
      });
    } catch (err) {
      return toast({
        title: 'Something went wrong.',
        variant: 'destructive',
        description: 'Please try again.'
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <Card className="w-[550px]">
        <CardHeader>
          <CardTitle>Create store</CardTitle>
          <CardDescription>Create your new store in one-click.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Store Name</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        placeholder="Shoe Store"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is your store's name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button disabled={loading} type="submit">
                  {loading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Create
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default StoreCreationModal;
