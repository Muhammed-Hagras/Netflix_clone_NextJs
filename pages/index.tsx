import { getSession, signOut } from "next-auth/react";
import { NextPageContext } from "next";
import useCurrUser from "@/hooks/useCurrUser";
import Navbar from "@/components/Navbar";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Home() {
  const { data: user } = useCurrUser();
  console.log(user);
  return (
    <>
      <Navbar />
    </>
  );
}
