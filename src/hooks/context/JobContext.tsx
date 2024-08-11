import { createContext, useContext, useState } from "react";
import { JobData } from "../../types";
import data from "../../../data.json";

type State = {
  jobs: JobData[];
  setJobs: React.Dispatch<React.SetStateAction<JobData[]>>;
  filters: string[];
  setFilters: React.Dispatch<React.SetStateAction<string[]>>;
  addFilter: (tag: string) => void;
  removeFilter: (tag: string) => void;
  clearFilter: () => void;
};

const initialState = {
  jobs: [],
  filters: [],
} as Omit<
  State,
  "setJobs" | "setFilters" | "addFilter" | "removeFilter" | "clearFilter"
>;

export const JobContext = createContext<State>({
  ...initialState,
  setJobs: () => {},
  setFilters: () => {},
  addFilter: () => {},
  removeFilter: () => {},
  clearFilter: () => {},
});

export function JobContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
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

  const JobContextValue = {
    jobs,
    setJobs,
    filters,
    setFilters,
    addFilter,
    removeFilter,
    clearFilter,
  };

  return (
    <JobContext.Provider value={JobContextValue}>
      {children}
    </JobContext.Provider>
  );
}

export function useJobContext() {
  return useContext(JobContext);
}
