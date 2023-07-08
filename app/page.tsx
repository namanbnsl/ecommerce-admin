"use client";

import { Button } from "@/components/ui/button";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();

  return (
    <div className="p-6">
      {session.data?.user && (
        <Button onClick={() => signOut()}>
          Sign Out as {session.data.user.email}
        </Button>
      )}
      <Button
        onClick={() => {
          signIn();
        }}
      >
        Sign In
      </Button>
    </div>
  );
}
