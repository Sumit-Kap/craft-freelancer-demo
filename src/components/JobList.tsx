import { FC, useState } from "react";
import JobCard from "./JobCard";
import JobFilter from "./JobFilter";
interface JobListProps {
  jobs: Array<{
    id: number;
    title: string;
    description: string;
    salary: number;
    skills: string[];
  }>;
}

const JobList: FC<JobListProps> = ({ jobs }) => {
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [visibleJobs, setVisibleJobs] = useState(10);

  const handleFilterChange = (filters: {
    skills: string[];
    minSalary: number;
  }) => {
    const { skills, minSalary } = filters;

    const filtered = jobs.filter(
      (job) =>
        (skills.length === 0 ||
          skills.every((skill) => job.skills.includes(skill))) &&
        job.salary >= minSalary
    );
    console.log(filtered, skills, minSalary);
    setFilteredJobs(filtered);
  };

  console.log("pppo", filteredJobs, jobs);
  const loadMoreJobs = () => {
    setVisibleJobs((prevVisibleJobs) => prevVisibleJobs + 20); // Load 20 more jobs each time
  };
  return (
    <div className="p-6">
      {/* Filter UI */}
      <JobFilter onFilterChange={handleFilterChange} />
      {filteredJobs.length === 0 && (
        <div className="flex justify-center items-center mt-5">
          <h1 className="font-bold text-2xl">No jobs found</h1>
        </div>
      )}
      <div className="mt-6">
        <div className="space-y-4">
          {filteredJobs.slice(0, visibleJobs).map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
      {visibleJobs < filteredJobs.length && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={loadMoreJobs}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default JobList;
