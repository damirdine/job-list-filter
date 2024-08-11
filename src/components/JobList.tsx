import { useJobContext } from "../hooks/context/JobContext";
import { JobCard } from "./JobCard";


export function JobList() {
  const { jobs } = useJobContext();
  return (
    <main className="flex flex-col mx-7 my-12 md:mx-14 gap-2">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </main>
  );
}
