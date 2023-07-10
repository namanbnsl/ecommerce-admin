import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { ReactNode } from "react";
import Navbar from "@/components/navbar/Navbar";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession(authOptions);

  return (
    <>
      {session?.user && <Navbar />}
      {children}
    </>
  );
};

export default DashboardLayout;
