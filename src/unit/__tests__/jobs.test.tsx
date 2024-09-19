import { render, screen, waitFor } from "@testing-library/react";
import Jobs from "../jobs";
import { fetchJobs } from "../../../utils/api";

// Mock the fetchJobs function
jest.mock("../../../utils/api", () => ({
  fetchJobs: jest.fn(),
}));

// Mock data for the jobs
const mockJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    description: "A React job",
    salary: 50000,
    skills: ["React", "JavaScript"],
  },
  {
    id: 2,
    title: "Backend Developer",
    description: "A Node.js job",
    salary: 60000,
    skills: ["Node.js", "Express"],
  },
];

describe("Jobs component", () => {
  it("displays the loader while fetching jobs", async () => {
    // Mock fetchJobs to return a promise that resolves after some time
    (fetchJobs as jest.Mock).mockResolvedValueOnce(mockJobs);

    // Render the component
    render(<Jobs />);

    // Expect loader to be displayed
    expect(screen.getByTestId("loader")).toBeDefined();

    // Wait for the jobs to be fetched and ensure the loader disappears
    await waitFor(
      () => expect(screen.getByTestId("loader")).not.toBeInTheDocument
    );
  });

  it("displays the job list after fetching jobs", async () => {
    // Mock fetchJobs to return mock jobs
    (fetchJobs as jest.Mock).mockResolvedValueOnce(mockJobs);

    // Render the component
    render(<Jobs />);

    // Wait for the jobs to load
    await waitFor(() => expect(screen.getByText("Job Listings")).toBeDefined());

    // Check if the correct number of jobs is displayed
    expect(screen.getByText("Frontend Developer")).toBeDefined();
    expect(screen.getByText("Backend Developer")).toBeDefined();
  });

  it("fetchJobs is called once", async () => {
    (fetchJobs as jest.Mock).mockResolvedValueOnce(mockJobs);

    // Render the component
    render(<Jobs />);

    // Wait for the fetch to complete
    await waitFor(() => expect(screen.getByText("Job Listings")).toBeDefined());

    // Check if fetchJobs was called once
    expect(fetchJobs).toHaveBeenCalledTimes(1);
  });
});
