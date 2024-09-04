import { FC } from "react";
import JobForm from "../../components/JobForm";

const PostJob: FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Post a New Job</h1>
      <JobForm />
    </div>
  );
};

export default PostJob;
