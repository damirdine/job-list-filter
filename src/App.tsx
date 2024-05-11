import { useState } from "react";
import data from "./../data.json";

import heroImg from "./assets/images/bg-header-desktop.svg";
import heroMobileImg from "./assets/images/bg-header-mobile.svg";

type JobData = {
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
      <header className={`relative ${filters.length > 0 && "mb-24"}`}>
        <img
          src={heroMobileImg}
          alt=""
          className="bg-primary w-full md:hidden"
        />
        <img
          src={heroImg}
          alt=""
          className="bg-primary w-full hidden md:block"
        />
        <div
          className={`bg-white p-5 rounded flex mx-7 md:mx-14 flex-wrap mb-10 gap-4 shadow-lg absolute -bottom-[80px] ${
            filters.length == 0 && "hidden"
          }`}
        >
          {filters.map((filter) => (
            <div className="flex">
              <span
                key={filter}
                className="bg-neutral-light-filter text-primary font-bold p-2 rounded-l"
              >
                {filter}
              </span>
              <button
                onClick={() => removeFilter(filter)}
                className="bg-primary px-3 w-full rounded-r"
              >
                <img
                  src={getImgUrl("./assets/images/icon-remove.svg")}
                  alt="remove icon"
                />
              </button>
            </div>
          ))}
          <button
            onClick={() => clearFilter()}
            className="text-primary font-bold hover:underline active:text-neutral-very-dark"
          >
            Clear
          </button>
        </div>
      </header>
      <main className="flex flex-col mx-7 my-12 md:mx-14 gap-2">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} handleClick={addFilter} />
        ))}
      </main>
    </>
  );
}

type JobCardProps = {
  job: JobData;
  handleClick: (tag: string) => void;
};

function JobCard({ job, handleClick }: JobCardProps) {
  const logo = getImgUrl(job.logo);
  const tags = [job.role, job.level, ...job.languages, ...job.tools];
  const details = [job.postedAt, job.contract, job.location];

  return (
    <>
      <div
        className={`bg-white p-5 rounded flex flex-col justify-between md:justify-between md:items-center md:flex-row mb-10 gap-4 shadow-lg ${
          job.featured && "border-l-4 border-l-primary"
        } relative`}
      >
        <div className="md:flex">
          <img
            src={logo}
            alt={job.company}
            className="w-full size-fit max-w-12 md:max-w-20 absolute md:static -top-10 md:top-0 md:mr-5"
          />
          <div className="flex flex-col gap-1 mt-4 md:mt-0">
            <p className="font-bold text-primary text-base flex gap-3">
              {job.company}
              <Badges isNew={job.new} featured={job.featured} />
            </p>
            <p className="font-bold text-lg">{job.position}</p>
            <div>
              {details.map((detail) => (
                <span
                  key={detail}
                  className="text-neutral-dark font-medium mr-3"
                >
                  {detail}
                </span>
              ))}
            </div>
          </div>
        </div>
        <hr className="md:hidden" />
        <div className="flex flex-wrap md:justify-end gap-3">
          {tags.map((tag) => (
            <span
              key={tag}
              onClick={() => handleClick(tag)}
              className="bg-neutral-light-filter text-primary p-2 font-bold  rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

function getImgUrl(name: string) {
  return new URL(
    name,
    "https://raw.githubusercontent.com/damirdine/job-list-filter/main/src/"
  ).href;
}
type BadgeProps = {
  isNew?: boolean;
  featured?: boolean;
};
function Badges({ isNew, featured }: BadgeProps) {
  return (
    <div className="flex justify-between">
      {isNew && (
        <span className="bg-primary text-white rounded-full text-sm px-2 py-1 pb-0 mx-2 ">
          NEW!
        </span>
      )}
      {featured && (
        <span className="bg-neutral-very-dark text-white rounded-full text-sm px-1.5 py-1 pb-0">
          FEATURED
        </span>
      )}
    </div>
  );
}

export default App;
