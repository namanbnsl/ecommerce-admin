import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { ReactNode } from 'react';
import Navbar from '@/components/navbar/Navbar';
import { db } from '@/lib/db';
import { users, store as storeDbModel } from '@/db/schema';
import { eq } from 'drizzle-orm';

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession(authOptions);

  let user;
  let store;

  if (session?.user) {
    const userArray = await db
      .select({
        subscriptionBought: users.subscriptionBought,
        id: users.id
      })
      .from(users)
      .where(eq(users.email, session?.user?.email as string));
    user = userArray[0];

    const [storeSearch] = await db
      .select({ id: storeDbModel.id })
      .from(storeDbModel)
      .where(eq(storeDbModel.userId, user.id));
    store = storeSearch;
  }

  return (
    <>
      {session?.user && user?.subscriptionBought && store?.id && <Navbar />}
      {children}
    </>
  );
};

export default DashboardLayout;
