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
  console.log(colorCategoryCounts, "CCCCCCccc");
  return (
    <div className={`${className} flex-col items-start gap-2`}>
      {uniqueColorCategory.map(color => {
        const normalizedId = `color-${color.toLowerCase().replace(/\s+/g, "-")}`;
        const isSelected = filters.colors.includes(color);
        const colorClass =
          data.colorClasses[
            color.toLowerCase() as keyof typeof data.colorClasses
          ] || "bg-gray-200 border";

        return (
          <label
            key={color}
            htmlFor={normalizedId}
            className={`flex items-center gap-2 py-3 text-[14px] capitalize ${
              isSelected ? "font-bold" : ""
            } cursor-pointer text-darkGray`}
          >
            <input
              type="checkbox"
              id={normalizedId}
              name={normalizedId}
              checked={isSelected}
              onChange={() => {
                handleColorSelection(color);
                console.log("Clicked:", color);
              }}
              className={`h-6 w-6 appearance-none rounded-full checked:border-2 checked:border-black ${colorClass}`}
            />
            {color} ({colorCategoryCounts[color] || 0})
          </label>
        );
      })}
    </div>
  );
};
