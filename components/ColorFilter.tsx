import { FiltersType } from "@/app/hooks/useCollectionFilters";
import data from "../app/data/productList.json";

export const ColorFilter = ({
  uniqueColorCategory,
  handleColorSelection,
  filters,
  colorCategoryCounts,
  className,
}: {
  uniqueColorCategory: string[];
  handleColorSelection: (color: string) => void;
  filters: FiltersType;
  colorCategoryCounts: Record<string, number>;
  className?: string;
}) => {
  return (
    <div className={`${className} flex-col items-start gap-2`}>
      {uniqueColorCategory.map(color => (
        <div
          className="flex items-center gap-2 py-3 text-[14px] text-darkGray"
          key={color}
        >
          <input
            type="checkbox"
            name={color}
            id={color}
            onChange={() => handleColorSelection(color)}
            checked={filters.colors.includes(color)}
            disabled={colorCategoryCounts[color] === 0}
            className={`h-6 w-6 appearance-none rounded-full checked:border checked:border-black ${
              data.colorClasses[color as keyof typeof data.colorClasses] ||
              "bg-gray-200"
            }`}
          />
          <label
            className={`capitalize ${filters.colors.includes(color) ? "font-bold" : ""} ${colorCategoryCounts[color] === 0 ? "pointer-events-none cursor-not-allowed text-gray-300" : "cursor-pointer hover:underline"} `}
            htmlFor={color}
          >
            {color} ({colorCategoryCounts[color]})
          </label>
        </div>
      ))}
    </div>
  );
};
