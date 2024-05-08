import { useState } from "react";
import data from "./../data.json";

import heroImg from "./assets/images/bg-header-desktop.svg";

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
const jobs: JobData[] = data;

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <img src={heroImg} alt="" className="bg-green-700" />
      <main>
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
        <div className="card">
          <button
            onClick={() => setCount((count) => count + 1)}
            className="p-3 border rounded border-slate-700 bg-slate-200"
          >
            count is {count}
          </button>
        </div>
      </main>
    </>
  );
}

type JobCardProps = {
  job: JobData;
};

function JobCard({ job }: JobCardProps) {
  // const [logo, setLogo] = useState<string | null>(null);

  return (
    <>
      <img src={job.logo} alt={job.company} />
      {job.position}, {job.logo}
      <br />
    </>
  );
}

export default App;
