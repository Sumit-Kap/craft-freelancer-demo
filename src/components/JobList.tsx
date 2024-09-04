import { FC } from "react";
import JobCard from "./JobCard";

interface JobListProps {
  jobs: Array<{
    id: number;
    title: string;
    description: string;
    salaryPerHour: number;
  }>;
}

const JobList: FC<JobListProps> = ({ jobs }) => {
  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobList;
