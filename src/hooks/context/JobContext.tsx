import { createContext, useContext } from "react";
import { JobData } from "../../types";
import data from "../../../data.json";
import { useJobReducer } from "../reducer/JobReducer";

type State = {
  jobs: JobData[];
  filters: string[];
  addFilter: (tag: string) => void;
  removeFilter: (tag: string) => void;
  clearFilter: () => void;
};

const initialState = {
  jobs: data,
  filters: [],
} as Omit<State, "addFilter" | "removeFilter" | "clearFilter">;

export const JobContext = createContext<State>({
  ...initialState,
  addFilter: () => {},
  removeFilter: () => {},
  clearFilter: () => {},
});

export function JobContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useJobReducer(initialState);
  const { jobs, filters } = state;
  const addFilter = (tag: string) =>
    dispatch({ payload: tag, type: "ADD_FILTER" });

  const removeFilter = (tag: string) =>
    dispatch({ payload: tag, type: "REMOVE_FILTER" });

  const clearFilter = () => dispatch({ type: "CLEAR_FILTER" });

  const JobContextValue = {
    jobs,
    filters,
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
