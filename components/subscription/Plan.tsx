"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import axios from "axios";
import { getStripe } from "@/lib/stripeClient";
import { useState } from "react";
import { Icons } from "../ui/icons";

interface Props {
  name: string;
  price: number;
  priceId: string;
}

const Plan = ({ name, price, priceId }: Props) => {
  const [loading, setLoading] = useState(false);

  return (
    <Card className="px-10 flex flex-col justify-center items-center">
      <CardHeader>
        <CardTitle>{name} Plan</CardTitle>
        <CardDescription>See features.</CardDescription>
      </CardHeader>
      <CardContent>
        <div>Features ✅</div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          disabled={loading}
          onClick={async () => {
            try {
              setLoading(true);

              const { data }: { data: { sessionId: string } } =
                await axios.post(
                  "/api/stripe",
                  { priceId: priceId },
                  {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );

              const stripe = await getStripe();

              await stripe?.redirectToCheckout({ sessionId: data.sessionId });
            } catch (err) {
              console.log(err);
            } finally {
              setLoading(false);
            }
          }}
        >
          {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Buy for Rs. {price}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Plan;
