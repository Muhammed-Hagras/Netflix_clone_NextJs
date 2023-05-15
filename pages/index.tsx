import { getSession, signOut } from "next-auth/react";
import { NextPageContext } from "next";
import useCurrUser from "@/hooks/useCurrUser"


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
  const { data: user } = useCurrUser()
  return (
    <>
      <h2 className="text-4xl text-green-500">Netflix Clone</h2>
      <p className="text-white ">Logged in as : {user?.email}</p>
      <button className="h-10 w-full bg-white" onClick={() => signOut()}>
        LogOut!
      </button>
    </>
  );
}
