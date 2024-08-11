// jobReducer.ts
import { useReducer } from "react";
import data from "../../../data.json";
import { JobState } from "../../types";

type Action =
  | { type: "ADD_FILTER"; payload: string }
  | { type: "REMOVE_FILTER"; payload: string }
  | { type: "CLEAR_FILTER" };

// Action creators
export const addFilter = (tag: string): Action => ({
  type: "ADD_FILTER",
  payload: tag,
});

export const removeFilter = (tag: string): Action => ({
  type: "REMOVE_FILTER",
  payload: tag,
});

export const clearFilter = (): Action => ({
  type: "CLEAR_FILTER",
});

const jobReducer = (state: JobState, action: Action): JobState => {
  switch (action.type) {
    case "ADD_FILTER": {
      const newFilters = [...state.filters, action.payload];
      return {
        ...state,
        filters: newFilters,
        jobs: data.filter((job) => {
          const tags = [job.role, job.level, ...job.languages, ...job.tools];
          return tags.some((v) => newFilters.includes(v));
        }),
      };
    }

    case "REMOVE_FILTER": {
      const newFilters = state.filters.filter((el) => el !== action.payload);
      return {
        ...state,
        filters: newFilters,
        jobs:
          newFilters.length > 0
            ? data.filter((job) => {
                const tags = [
                  job.role,
                  job.level,
                  ...job.languages,
                  ...job.tools,
                ];
                return tags.some((v) => newFilters.includes(v));
              })
            : data,
      };
    }

    case "CLEAR_FILTER":
      return {
        ...state,
        filters: [],
        jobs: data,
      };

    default:
      return state;
  }
};

export default jobReducer;

export const useJobReducer = (state: JobState) => useReducer(jobReducer, state);
