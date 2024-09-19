import React from "react";
import { useState } from "react";
import { fetchGitHubRepos } from "../utils/api";

interface SavedProfileProps {
  name: string;
  bio: string;
  skills: string[];
  gitHubProfile: string;
  imageUrl: string; // New prop for the user's image
}

const SavedProfile: React.FC<SavedProfileProps> = ({
  name,
  bio,
  skills,
  gitHubProfile,
  imageUrl,
}) => {
  console.log("Inside savedProfile", name, bio);
  const [repos, setRepos] = useState<
    Array<{ id: number; name: string; html_url: string }>
  >([]);
  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto">
      {/* Profile Image */}
      <div className="flex justify-center mb-6">
        <img
          src={imageUrl}
          alt={name}
          className="w-24 h-24 rounded-full object-cover"
        />
      </div>

      {/* Profile Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold mb-2">{name}</h2>
        <p className="text-gray-600">{bio}</p>
      </div>

      {/* Skills Section */}
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Skills</h3>
        <ul className="list-disc list-inside">
          {skills.map((skill, index) => (
            <li key={index} className="text-gray-700">
              {skill}
            </li>
          ))}
        </ul>
      </div>

      {/* GitHub Profile */}
      <div className="mt-4">
        <h3 className="text-lg font-medium mb-2">GitHub Profile</h3>
        <a
          href={gitHubProfile}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          {gitHubProfile}
        </a>
        <button
          type="button"
          onClick={async () => {
            const data = await fetchGitHubRepos(gitHubProfile);
            setRepos(data);
          }}
          className="mt-2 px-6 py-2 bg-blue-500 text-white rounded"
        >
          Fetch Projects
        </button>
        {repos.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Projects</h2>
            <ul>
              {repos.map((repo) => (
                <li key={repo.id}>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600"
                  >
                    {repo.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedProfile;
