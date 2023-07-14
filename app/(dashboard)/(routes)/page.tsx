import SignIn from '@/components/auth/SignIn';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]/route';
import { db } from '@/lib/db';
import { users, store as storeDbModel } from '@/db/schema';
import { eq } from 'drizzle-orm';
import SubscriptionModal from '@/components/subscription/SubscriptionModal';
import StoreCreationModal from '@/components/stores/StoreCreationModal';

const HomePage = async () => {
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
      {!session?.user && <SignIn />}
      {session?.user && !user?.subscriptionBought && <SubscriptionModal />}
      {session?.user && user?.subscriptionBought && !store?.id && (
        <StoreCreationModal session={session} />
      )}
      {session?.user && user?.subscriptionBought && store?.id && <div>Hi</div>}{' '}
    </>
  );
};

export default HomePage;
