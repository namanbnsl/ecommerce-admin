import { users } from '@/db/schema';
import { stripe } from '@/lib/stripe';
import { eq } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  const { priceId } = await request.json();

  try {
    const user_session = await getServerSession(authOptions);

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, user_session?.user?.email as string));

    let customerId: string;

    if (user.customerId) {
      customerId = user.customerId;
    } else {
      const customer_data: {
        metadata: { email: string };
        email: string;
        name: string;
      } = {
        metadata: {
          email: user_session?.user?.email as string
        },
        name: user_session?.user?.name as string,
        email: user_session?.user?.email as string
      };

      const customer = await stripe.customers.create(customer_data);

      await db
        .update(users)
        .set({ customerId: customer.id })
        .where(eq(users.email, user_session?.user?.email as string));

      customerId = customer.id;
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      mode: 'subscription',
      customer: customerId,
      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ],
      allow_promotion_codes: true,
      success_url: `http://localhost:3000/`,
      cancel_url: `http://localhost:3000/`
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    if (err instanceof Error) err = err;
    console.log(err);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
