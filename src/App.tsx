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
  return (
    <>
      <img src={heroImg} alt="" className="bg-primary w-full" />
      <main className="flex flex-col m-14">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </main>
    </>
  );
}

type JobCardProps = {
  job: JobData;
};

function JobCard({ job }: JobCardProps) {
  const logo = new URL(job.logo, import.meta.url).href;

  return (
    <>
      <div className="bg-white p-4 mb-3">
        <img src={logo} alt={job.company} />
        {job.position}, {logo}
      </div>
    </>
  );
}

export default App;
