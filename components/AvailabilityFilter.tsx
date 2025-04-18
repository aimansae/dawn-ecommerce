import { FiltersType } from "@/app/hooks/useCollectionFilters";
import content from "../app/data/collectionFilter.json";

type AvailabilityKeys = keyof FiltersType["availability"];

type AvailabilityFilterProps = {
  filters: FiltersType;
  handleAvailabilityFilterChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  inStockCount: number;
  outOfStockCount: number;
  className?: string;
};

export const AvailabilityFilter = ({
  filters,
  handleAvailabilityFilterChange,
  inStockCount,
  outOfStockCount,
  className,
}: AvailabilityFilterProps) => {
  const availabilityFilter = content.filterBy.find(
    product => product.name === "availability"
  );
  return (
    <div className={`${className} flex-col items-start gap-2`}>
      {availabilityFilter?.options &&
        Object.entries(availabilityFilter.options).map(([key, name]) => (
          <div key={key} className="flex items-center gap-2 py-3 text-darkGray">
            <input
              className="h-4 w-4 appearance-none border border-gray-400 checked:before:block checked:before:text-center checked:before:leading-4 checked:before:text-black checked:before:content-['✔']"
              type="checkbox"
              name={key}
              id={key}
              onChange={handleAvailabilityFilterChange}
              checked={filters.availability[key as AvailabilityKeys] || false}
            />
            <label className="hover:underline" htmlFor={key}>
              {name} ({name === "In Stock" ? inStockCount : outOfStockCount})
            </label>
          </div>
        ))}
    </div>
  );
};
