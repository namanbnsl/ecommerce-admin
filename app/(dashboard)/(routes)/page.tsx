import SignIn from "@/components/auth/SignIn";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";

const HomePage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <>
      {!session?.user && <SignIn />}
      {session?.user && <div>Hi</div>}
    </>
  );
};

export default HomePage;
