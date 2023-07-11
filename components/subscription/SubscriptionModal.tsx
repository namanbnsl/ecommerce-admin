import { env } from '@/env';
import Plan from './Plan';

const SubscriptionModal = () => {
  return (
    <div className="mx-auto flex flex-col w-full h-screen items-center justify-center space-y-4">
      <div className="text-center">
        <h1 className="text-2xl font-semibold tracking-tight mb-2">
          Welcome back
        </h1>
        <p className="text-sm text-muted-foreground">
          Please buy a subcription to continue.
        </p>
      </div>

      <div className="flex gap-x-2">
        <Plan name="Basic" price={99} priceId={env.BASIC_PLAN_PRICE_ID} />
        <Plan name="Pro" price={1199} priceId={env.PRO_PLAN_PRICE_ID} />
      </div>
    </div>
  );
};

export default SubscriptionModal;
