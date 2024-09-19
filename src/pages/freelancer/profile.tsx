import { FC, useEffect, useState } from "react";
import ProfileForm from "../../components/ProfileForm";
import { fetchGitHubRepos } from "../../utils/api";
import { useSession } from "next-auth/react";
import { string } from "../../../node_modules/yup/index";
import SavedProfile from "../../components/SavedProfile";

const Profile: FC = () => {
  const [repos, setRepos] = useState<
    Array<{ id: number; name: string; html_url: string }>
  >([]);
  const [userData, setUserData] = useState<{
    bio: string;
    name: string;
    skills: string[];
    githubProfile: string;
    imageUrl: string;
  }>();
  const { data } = useSession();

  const handleGitHubProfileChange = async (username: string) => {
    const data = await fetchGitHubRepos(username);
    setRepos(data);
  };
  console.log(data);
  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/fetchUser/${data?.user?.email}`
      );
      const jsonResponse = await response.json();
      console.log("output", jsonResponse);
      setUserData(jsonResponse?.data[0]);
    };

    getData();
  }, []);
  console.log(userData);
  if (userData) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">Freelancer Profile</h1>
        <SavedProfile
          bio={userData?.bio}
          imageUrl={data?.user?.image}
          name={data?.user?.name}
          gitHubProfile={userData?.githubProfile}
          skills={userData?.skills}
        />
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Freelancer Profile</h1>

      <ProfileForm onGitHubProfileChange={handleGitHubProfileChange} />
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
  );
};

export default Profile;
