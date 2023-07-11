import SignIn from '@/components/auth/SignIn';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]/route';
import { db } from '@/lib/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import SubscriptionModal from '@/components/subscription/SubscriptionModal';

const HomePage = async () => {
  const session = await getServerSession(authOptions);
  let user;

  if (session?.user) {
    const userArray = await db
      .select({
        subscriptionBought: users.subscriptionBought
      })
      .from(users)
      .where(eq(users.email, session?.user?.email as string));
    user = userArray[0];
  }

  return (
    <>
      {!session?.user && <SignIn />}
      {session?.user && !user?.subscriptionBought && <SubscriptionModal />}
      {session?.user && user?.subscriptionBought && <div>Hi</div>}
    </>
  );
};

export default HomePage;
