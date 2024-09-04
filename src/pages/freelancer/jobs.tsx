import { FC, useState, useEffect } from "react";
import JobList from "../../components/JobList";
import { fetchJobs } from "../../utils/api";
import "../../app/globals.css";

const Jobs: FC = () => {
  const [jobs, setJobs] = useState<
    Array<{
      id: number;
      title: string;
      description: string;
      salaryPerHour: number;
    }>
  >([]);

  useEffect(() => {
    const getJobs = async () => {
      const data = await fetchJobs();
      setJobs(data);
    };
    getJobs();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Job Listings</h1>
      <JobList jobs={jobs} />
    </div>
  );
};

export default Jobs;
