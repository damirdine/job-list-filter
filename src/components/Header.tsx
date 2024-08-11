import { getImgUrl } from "../App";

type HeaderdProps = {
  filters: string[];
  removeFilter: (filter: string) => void;
  clearFilter: () => void;
  heroMobileImg: string;
  heroImg: string;
};

export function Header({
  filters,
  removeFilter,
  clearFilter,
  heroMobileImg,
  heroImg,
}: HeaderdProps) {
  return (
    <header className={`relative ${filters.length > 0 && "mb-24"}`}>
      <img src={heroMobileImg} alt="" className="bg-primary w-full md:hidden" />
      <img src={heroImg} alt="" className="bg-primary w-full hidden md:block" />
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
              className="bg-primary px-3 w-full rounded-r hover:bg-neutral-very-dark active:bg-neutral-very-dark"
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
          className="text-neutral-dark font-bold hover:underline hover:text-primary active:underline active:text-primary"
        >
          Clear
        </button>
      </div>
    </header>
  );
}
