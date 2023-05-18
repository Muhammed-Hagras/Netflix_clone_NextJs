import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";

import prismadb from "@/lib/prismadb";

const serverAuth = async (req: NextApiRequest) => {
  const session = await getSession({ req });

  //if user does not in the session
  if (!session?.user?.email) {
    throw new Error("Not signed in ");
  }

  //Check if user does not exists
  const currUser = await prismadb.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currUser) {
    throw new Error("Not signed in ");
  }

  return { currUser };
};

export default serverAuth;
