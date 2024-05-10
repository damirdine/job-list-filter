import data from "./../data.json";

import heroImg from "./assets/images/bg-header-desktop.svg";
// import heroMobileImg from "./assets/images/bg-header-mobile.svg";

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
      <header
        className={`bg-[url('${getImgUrl(
          "./assets/images/bg-header-desktop.svg"
        )}')]`}
      ></header>
      <img src={heroImg} alt="" className="bg-primary w-full hidden md:block" />
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
        className={`bg-white p-5 rounded flex flex-col justify-between md:items-center mb-10 gap-4 shadow-lg ${
          job.featured && "border-l-4 border-l-primary"
        } md:bg-red-500 relative`}
      >
        <img
          src={logo}
          alt={job.company}
          className="w-full size-fit max-w-12 md:max-w-16 absolute -top-6 "
        />
        <div className="flex flex-col gap-1 mt-4 md:mt-0">
          <p className="font-bold text-primary text-base flex gap-3">
            {job.company}
            <Badges isNew={job.new} featured={job.featured} />
            {/* {job.new || job.featured && } */}
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
        <hr className="md:hidden" />
        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => (
            <span className="bg-neutral-light-bg text-primary p-2 font-bold  rounded">
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
