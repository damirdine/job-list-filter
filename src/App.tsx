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
      <main className="flex flex-col m-14 gap-2">
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
  const logo = getImgUrl(job.logo);
  const tags = [job.role, job.level, ...job.languages, ...job.tools];
  const details = [job.postedAt, job.contract, job.location];
  return (
    <>
      <div
        className={`bg-white p-7 mb-3 rounded flex justify-between items-center shadow-lg ${
          job.featured && "border-l-4 border-l-primary"
        }`}
      >
        <div className="flex items-center">
          <img
            src={logo}
            alt={job.company}
            className="w-full size-fit max-w-20 mr-5"
          />
          <div className="flex flex-col gap-1">
            <p className="font-bold text-primary text-base flex gap-3">
              {job.company}
              {job.new && <Badge isNew={job.new} />}
              {job.featured && <Badge featured={job.featured} />}
            </p>
            <p className="font-bold text-lg">{job.position}</p>
            <div>
              {details.map((detail) => (
                <span className="text-neutral-dark font-medium mr-3">
                  {detail}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div>
          {tags.map((tag) => (
            <span className="bg-neutral-light-bg text-primary p-2 font-bold ml-2 rounded">
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
function Badge({ isNew, featured }: BadgeProps) {
  if (isNew) {
    return (
      <p className="bg-primary text-white rounded-full text-sm me-2 px-1.5 py-1 pb-0 ">
        NEW!
      </p>
    );
  }
  if (featured) {
    return (
      <span className="bg-neutral-very-dark text-white rounded-full text-sm me-2 px-1.5 py-1 pb-0">
        FEATURED
      </span>
    );
  }
}
export default App;
