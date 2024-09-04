import { FC, useState } from "react";
import ProfileForm from "../../components/ProfileForm";
import { fetchGitHubRepos } from "../../utils/api";

const Profile: FC = () => {
  const [repos, setRepos] = useState<
    Array<{ id: number; name: string; html_url: string }>
  >([]);

  const handleGitHubProfileChange = async (username: string) => {
    const data = await fetchGitHubRepos(username);
    setRepos(data);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Freelancer Profile</h1>
      <ProfileForm onGitHubProfileChange={handleGitHubProfileChange} />
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
    </div>
  );
};

export default Profile;
