import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, store as storeDbModel } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: Request) {
  const { email, name } = await req.json();

  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const [user] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email));

  const stores = await db
    .select({ id: storeDbModel.id })
    .from(storeDbModel)
    .where(eq(storeDbModel.userId, user.id));

  if (stores.length > 0) {
    return new NextResponse('Store already exists', { status: 500 });
  }

  const store = await db.insert(storeDbModel).values({
    id: (Date.now() * Math.random()).toString(),
    name: name,
    userId: user.id
  });

  return NextResponse.json({ store });
}
