import { FC, useState, useEffect } from "react";
import JobList from "../../components/JobList";
import "../../app/globals.css";
import Loader from "../../components/Loader";
import { useSession } from "next-auth/react";

const ActiveJobs: FC = () => {
  const { data } = useSession();
  const [jobs, setJobs] = useState<
    Array<{
      id: number;
      title: string;
      description: string;
      salary: number;
      skills: string[];
    }>
  >([]);

  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const getJobs = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/fetchJobs/${data?.user?.email}`
      );
      const responseJson = await response.json();
      console.log("pp", responseJson);
      setJobs(responseJson?.data);
      setLoader(false);
    };
    getJobs();
  }, [data]);
  console.log("printing loader", loader);
  if (loader) {
    return <Loader />;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Job Listings</h1>
      {jobs.length > 0 && <JobList jobs={jobs} />}
    </div>
  );
};

export default ActiveJobs;
