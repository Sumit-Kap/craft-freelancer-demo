import { FC } from "react";

interface JobCardProps {
  job: {
    id: number;
    title: string;
    description: string;
    salary: number;
    skills: string[];
  };
}

const JobCard: FC<JobCardProps> = ({ job }) => {
  console.log("ooo", job);
  return (
    <div className="p-4 border rounded shadow-md">
      <h2 className="text-xl font-semibold">{job?.title}</h2>
      <p className="text-gray-700">{job?.description}</p>
      <p className="font-bold">Salary: ${job?.salary}/hr</p>
      <p className="font-bold">Skills: {job?.skills?.join(",")}</p>
      <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
        Quick Apply
      </button>
    </div>
  );
};

export default JobCard;
