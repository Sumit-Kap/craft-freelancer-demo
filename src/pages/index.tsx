import Link from "next/link";
import { FC, useContext, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "../../node_modules/next/router";
import AppContext from "../components/AppContext";
import Head from "next/head";

const Dashboard: FC = () => {
  const { data, status } = useSession();
  const router = useRouter();
  console.log("Test", data, status);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  });
  return (
    <>
      <Head>
        <title>Elance | Hire Freelancers & Find Freelance Jobs Online</title>
        <link
          rel="icon"
          href="https://cdn.worldvectorlogo.com/logos/freelancer-1.svg"
        />
      </Head>
      <div className="flex bg-slate-300 flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-3xl font-bold mb-6">Job Portal Login</h1>
        <div className="flex gap-4">
          <button
            className="px-4 py-4 bg-blue-500 text-white rounded"
            onClick={async (e) => {
              e.preventDefault();
              signIn();
            }}
          >
            Sign in using your google account
          </button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
