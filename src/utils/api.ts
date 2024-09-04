export const fetchGitHubRepos = async (
  username: string
): Promise<Array<{ id: number; name: string; html_url: string }>> => {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos`
  );
  return await response.json();
};

export const fetchJobs = async (): Promise<
  Array<{
    id: number;
    title: string;
    description: string;
    salaryPerHour: number;
  }>
> => {
  return new Array(10000).fill(null).map((_, idx) => ({
    id: idx,
    title: `Job Title ${idx}`,
    description: `Job Description ${idx}`,
    salaryPerHour: Math.floor(Math.random() * 100) + 10,
  }));
};
