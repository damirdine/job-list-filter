
type BadgeProps = {
  isNew?: boolean;
  featured?: boolean;
};

export function Badge({ isNew, featured }: BadgeProps) {
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
