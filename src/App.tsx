import { useState } from "react";
import data from "./../data.json";

import heroImg from "./assets/images/bg-header-desktop.svg";
import heroMobileImg from "./assets/images/bg-header-mobile.svg";
import { JobCard } from "./components/JobCard";
import { Header } from "./components/Header";

export type JobData = {
  id: number;
  company: string;
  logo: string;
  new: boolean;
  featured: boolean;
  position: string;
  role: string;
  level: string;
  postedAt: string;
  contract: string;
  location: string;
  languages: string[];
  tools: string[];
};

function App() {
  const [jobs, setJobs] = useState<JobData[]>(data);
  const [filters, setFilters] = useState<string[]>([]);

  const addFilter = (tag: string) => {
    if (!filters.includes(tag)) {
      const newFilters = [...filters, tag];
      setFilters(newFilters);
      setJobs(
        data.filter((job) => {
          const tags = [job.role, job.level, ...job.languages, ...job.tools];
          return tags.some((v) => newFilters.includes(v));
        })
      );
    }
  };
  const removeFilter = (tag: string) => {
    const newFilters = filters.filter((el) => el !== tag);
    setFilters(newFilters);
    setJobs(
      newFilters.length > 0
        ? data.filter((job) => {
            const tags = [job.role, job.level, ...job.languages, ...job.tools];
            return tags.some((v) => newFilters.includes(v));
          })
        : data
    );
  };
  const clearFilter = () => {
    setFilters([]);
    setJobs(data);
  };
  return (
    <>
      <Header
        filters={filters}
        clearFilter={clearFilter}
        removeFilter={removeFilter}
        heroImg={heroImg}
        heroMobileImg={heroMobileImg}
      />
      <main className="flex flex-col mx-7 my-12 md:mx-14 gap-2">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} handleClick={addFilter} />
        ))}
      </main>
    </>
  );
}

export function getImgUrl(name: string) {
  return new URL(
    name,
    "https://raw.githubusercontent.com/damirdine/job-list-filter/main/src/"
  ).href;
}

export default App;
