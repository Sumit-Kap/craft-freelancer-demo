import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/router";
import Dashboard from "../dashboard";

// Mock the Next.js router
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Dashboard", () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
  });

  it("should render the component succesfully", () => {
    render(<Dashboard />);
    expect(screen.getByText("Job Portal Login")).toBeDefined();
  });

  it("should have Employer CTA on the page", () => {
    render(<Dashboard />);
    fireEvent.click(screen.getByText("Employer"));
    expect(screen.getByText("Employer")).toBeDefined();
  });

  it("should have Freelancer CTA on the page", () => {
    render(<Dashboard />);
    fireEvent.click(screen.getByText("Freelancer"));
    expect(screen.getByText("Freelancer")).toBeDefined();
  });
});
