import React, { FC, useContext } from "react";
import AppContext from "../components/AppContext";

const Dashboard: FC = () => {
  const { role, setAppRole } = useContext(AppContext);
  const handleFreelancer = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setAppRole("Freelancer");
  };

  const handleEmployer = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setAppRole("Employer");
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-3xl font-bold mb-6">Job Portal Login</h1>
        <div className="flex gap-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleEmployer}
          >
            Freelancer
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={handleFreelancer}
          >
            Employer
          </button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
