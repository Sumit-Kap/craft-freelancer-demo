import { FC, useState, FormEvent } from "react";

const JobForm: FC = () => {
  const [description, setDescription] = useState<string>("");
  const [requirements, setRequirements] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [contactInfo, setContactInfo] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission
    // call API
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-2">Job Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border rounded p-2 w-full text-black"
          maxLength={16384} // 16KB limit
          rows={4}
        />
      </div>
      <div>
        <label className="block mb-2">Job Requirements:</label>
        <textarea
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          className="border rounded p-2 w-full text-black"
          rows={4}
        />
      </div>
      <div>
        <label className="block mb-2">Tags:</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="border text-black rounded p-2 w-full"
        />
      </div>
      <div>
        <label className="block mb-2">Company Name:</label>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="border text-black rounded p-2 w-full text-black"
        />
      </div>
      <div>
        <label className="block mb-2">Contact Info:</label>
        <input
          type="text"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
          className="border text-black rounded p-2 w-full text-black"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        Post Job
      </button>
    </form>
  );
};

export default JobForm;
