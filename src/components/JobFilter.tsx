// src/components/JobFilter.tsx
import React, { useState } from "react";

const skillsList = [
  "JavaScript",
  "React",
  "Node.js",
  "Python",
  "Java",
  "CSS",
  "HTML",
];

type JobFilterProps = {
  onFilterChange: (filters: { skills: string[]; minSalary: number }) => void;
};

const JobFilter: React.FC<JobFilterProps> = ({ onFilterChange }) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [minSalary, setMinSalary] = useState<number>(0);

  const handleSkillChange = (skill: string) => {
    setSelectedSkills(
      (prevSkills) =>
        prevSkills.includes(skill)
          ? prevSkills.filter((s) => s !== skill) // Remove skill if already selected
          : [...prevSkills, skill] // Add skill if not selected
    );
  };

  const handleMinSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setMinSalary(value);
  };

  const handleApplyFilters = () => {
    onFilterChange({ skills: selectedSkills, minSalary });
  };

  return (
    <div className="p-4 bg-white shadow rounded-md w-full">
      <h2 className="text-lg font-bold mb-4">Filter Jobs</h2>

      <div className="mb-6">
        <h3 className="font-medium mb-2">Filter by Skill Set</h3>
        <div className="flex flex-wrap gap-2">
          {skillsList.map((skill) => (
            <label key={skill} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={skill}
                checked={selectedSkills.includes(skill)}
                onChange={() => handleSkillChange(skill)}
                className="form-checkbox h-4 w-4 text-blue-500"
              />
              <span>{skill}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-2">Minimum Salary (per hour)</h3>
        <input
          type="range"
          min="0"
          max="100"
          value={minSalary}
          onChange={handleMinSalaryChange}
          className="w-full"
        />
        <div className="text-sm text-gray-600 mt-2">
          Minimum Salary: ${minSalary}/hr
        </div>
      </div>

      {/* Apply Filters Button */}
      <button
        onClick={handleApplyFilters}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default JobFilter;
