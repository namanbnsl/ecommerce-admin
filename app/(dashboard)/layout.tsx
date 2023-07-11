import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { ReactNode } from "react";
import Navbar from "@/components/navbar/Navbar";
import { db } from "@/lib/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession(authOptions);

  let user;

  if (session?.user) {
    const userArray = await db
      .select({
        subscriptionBought: users.subscriptionBought,
      })
      .from(users)
      .where(eq(users.email, session?.user?.email as string));
    user = userArray[0];
  }

  return (
    <>
      {session?.user && user?.subscriptionBought && <Navbar />}
      {children}
    </>
  );
};

export default DashboardLayout;
