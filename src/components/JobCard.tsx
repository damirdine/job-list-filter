import { JobData, getImgUrl } from "../App";
import { Badge } from "./ui/Badge";

type JobCardProps = {
  job: JobData;
  handleClick: (tag: string) => void;
};
export function JobCard({ job, handleClick }: JobCardProps) {
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
              <Badge isNew={job.new} featured={job.featured} />
            </p>
            <p className="font-bold text-lg hover:text-primary active:text-primary">
              {job.position}
            </p>
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
        <Tags tags={tags} handleClick={handleClick} />
      </div>
    </>
  );
}

function Tags({
  tags,
  handleClick,
}: {
  tags: string[];
  handleClick: (tag: string) => void;
}) {
  return (
    <div className="flex flex-wrap md:justify-end gap-3">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => handleClick(tag)}
          className="bg-neutral-light-filter text-primary p-2 font-bold rounded hover:text-white hover:bg-primary active:text-white active:bg-primary"
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
