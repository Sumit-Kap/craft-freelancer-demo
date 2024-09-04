import { FC, ChangeEvent, useState } from "react";

interface ProfileFormProps {
  onGitHubProfileChange: (username: string) => void;
}

const ProfileForm: FC<ProfileFormProps> = ({ onGitHubProfileChange }) => {
  const [skills, setSkills] = useState<string[]>([]);
  const [gitHubProfile, setGitHubProfile] = useState<string>("");

  const handleSkillChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSkills(value.split(","));
  };

  const handleGitHubProfileSubmit = () => {
    onGitHubProfileChange(gitHubProfile);
  };

  return (
    <div className="mb-6">
      <div className="mb-4">
        <label className="block mb-2">Skills:</label>
        <input
          type="text"
          placeholder="e.g., JavaScript, React"
          onChange={handleSkillChange}
          className="border rounded p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">GitHub Profile:</label>
        <input
          type="text"
          value={gitHubProfile}
          onChange={(e) => setGitHubProfile(e.target.value)}
          className="border rounded p-2 w-full"
        />
        <button
          onClick={handleGitHubProfileSubmit}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Fetch Projects
        </button>
      </div>
    </div>
  );
};

export default ProfileForm;
