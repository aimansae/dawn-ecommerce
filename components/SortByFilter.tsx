import content from "../app/data/collectionFilter.json";

export const SortByFilter = ({
  sortBy,
  handleSortByChange,
}: {
  sortBy?: string;
  handleSortByChange: React.ChangeEventHandler<HTMLSelectElement>;
}) => {
  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <label
          htmlFor="sort"
          className="shrink-0 whitespace-nowrap text-sm md:text-[15px]"
        >
          Sort by:
        </label>
        <select
          id="sort"
          value={sortBy || ""}
          onChange={handleSortByChange}
          className="bg-blue-400w-max mr-1 py-1 text-xs hover:underline md:rounded md:border md:px-3 md:text-base"
        >
          {content.sortBy[0]?.options.map((option, index) => (
            <option key={index} value={option} className="text-xs">
              {option}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};
