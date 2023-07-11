import { env } from '@/env';
import Stripe from 'stripe';

export const stripe = new Stripe(env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2022-11-15',
  appInfo: {
    name: 'ecommerce-admin',
    version: '0.1.0'
  }
});
