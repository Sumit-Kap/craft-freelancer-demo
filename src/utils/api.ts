export const fetchGitHubRepos = async (
  username: string
): Promise<Array<{ id: number; name: string; html_url: string }>> => {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos`
  );
  return await response.json();
};
const skillsList = [
  "JavaScript",
  "React",
  "Node.js",
  "Python",
  "Java",
  "CSS",
  "HTML",
];

const getRandomSkills = (skills: string[]) => {
  const shuffledSkills = skills.sort(() => 0.5 - Math.random()); // Shuffle skills
  const selectedSkillsCount =
    Math.floor(Math.random() * (skills.length - 1)) + 1; // Select random number of skills
  return shuffledSkills.slice(0, selectedSkillsCount); // Return a random subset
};

export const fetchJobs = async (): Promise<
  Array<{
    id: number;
    title: string;
    description: string;
    salary: number;
    skills: string[];
  }>
> => {
  return new Array(10000).fill(null).map((_, idx) => ({
    id: idx,
    title: `Job Title ${idx}`,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    salary: Math.floor(Math.random() * 100) + 10,
    skills: getRandomSkills(skillsList),
  }));
};
