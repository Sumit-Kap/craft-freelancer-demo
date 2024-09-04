import React, { FC, useContext, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "../../node_modules/next/router";
import AppContext from "../components/AppContext";
import Header from "../components/Header";

const Dashboard: FC = () => {
  const { data, status } = useSession();
  const { role, setAppRole } = useContext(AppContext);
  console.log("role", role, setAppRole);
  const router = useRouter();
  console.log("Test", data, status);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-3xl font-bold mb-6">Job Portal Login</h1>
        <div className="flex gap-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={async (e) => {
              e.preventDefault();
              setAppRole("Freelancer");
              // router.push("/freelancer/jobs");
            }}
          >
            Freelancer
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={async (e) => {
              e.preventDefault();
              setAppRole("Employer");
            }}
          >
            Employer
          </button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
