// import React, { useState } from "react";
// import filterContent from "../app/data/collectionFilter.json";
// import { TfiClose } from "react-icons/tfi";
// import data from "../app/data/productList.json";
// import { IoIosArrowRoundForward } from "react-icons/io";
// import { IoIosArrowRoundBack } from "react-icons/io";
// import { useCollectionFilters } from "@/app/hooks/useCollectionFilters";

// type Props = {
//   toggleFilters: () => void;
// };

// type AvailabilityKeys = "inStock" | "outOfStock"; // Define exact keys

// const CollectionFilters = ({ toggleFilters }: Props) => {
//   const {
//     filters,
//     handleAvailabilityFilterChange,
//     handleColorSelection,
//     handleClearFilters,
//   } = useCollectionFilters();

//   // total of all products
//   const totalProductCount = data.products.length;
//   // total of inStock products
//   const inStockCount = data.products.filter(
//     product => product.status === "inStock"
//   ).length;
//   // total of inStock products
//   const outOfStockCount = data.products.filter(
//     product => product.status === "outOfStock"
//   ).length;

//   const colorCategoryCounts = data.products.reduce(
//     (acc, product) => {
//       product.availableColors.forEach(color => {
//         const colorCategory = color.colorCategory;
//         acc[colorCategory] = (acc[colorCategory] || 0) + 1;
//       });
//       return acc;
//     },
//     {} as Record<string, number>
//   );

//   // display product count

//   const filteredProducts = data.products.filter(product => {
//     // Check if availability filter is applied
//     const availabilityMatch =
//       (filters.availability.inStock && product.status === "inStock") ||
//       (filters.availability.outOfStock && product.status === "outOfStock") ||
//       (!filters.availability.inStock && !filters.availability.outOfStock); // If no availability filter, include all

//     // Check if color filter is applied
//     const colorMatch =
//       filters.colors.length === 0 || // If no colors are selected, include all
//       product.availableColors.some(color =>
//         filters.colors.includes(color.colorCategory)
//       );

//     return availabilityMatch && colorMatch;
//   });
//   const [activeFilters, setActiveFilters] = useState({
//     availability: false,
//     colors: false,
//   });

//   const availabilityFilter = filterContent.filterBy.find(
//     filter => filter.name === "availability"
//   );
//   const showFilterOptions = (filterType: string) => {
//     setActiveFilters(prev => ({
//       ...prev,
//       [filterType]: true,
//     }));
//     console.log("user clicked on", filterType);
//   };
//   const handleGoBack = () => {
//     setActiveFilters({ availability: false, colors: false });
//   };
//   // get all available colors
//   const allColors = data.products.flatMap(product =>
//     product.availableColors.map(c => c.colorCategory)
//   );
//   console.log("COLOR fount", allColors);

//   const uniqueColorCategory = [...new Set(allColors)];
//   console.log("uniqueColorCategory", uniqueColorCategory);

//   // get color categoty count

//   console.log("Return total", colorCategoryCounts);
//   return (
//     <section className="absolute right-0 top-0 z-50 flex h-screen w-2/3 flex-col bg-white text-customBlack md:hidden">
//       <div className="flex items-center justify-between px-[25px] py-[10px] text-sm">
//         <div className="flex-grow text-center">
//           <h2 className="text-[15px]">{filterContent.titleSmallDevices}</h2>
//           <p className="text-darkGray">
//             {} {filterContent.products}
//           </p>
//         </div>
//         <button>
//           <TfiClose
//             className="text-darkGray"
//             onClick={toggleFilters}
//             size={22}
//           />
//         </button>
//       </div>
//       {!activeFilters.availability && !activeFilters.colors && (
//         <ul className="flex flex-grow flex-col gap-2 border-y border-gray-300 px-[25px] py-3 text-[15px] text-darkGray">
//           {filterContent.filterBy.map(filter => (
//             <li
//               key={filter.name}
//               className="flex items-center justify-between gap-4 py-3"
//             >
//               <button
//                 onClick={() => showFilterOptions(filter.name)}
//                 className="flex w-full items-center justify-between"
//               >
//                 <span className="capitalize">{filter.name} </span>
//                 <IoIosArrowRoundForward size={25} />
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}

//       {activeFilters.availability && (
//         <div className="flex-grow border-y border-gray-300 px-[25px] py-3 text-[15px] text-darkGray">
//           <button
//             className="flex w-full items-center justify-start py-3"
//             onClick={handleGoBack}
//           >
//             <span>
//               <IoIosArrowRoundBack size={25} />
//             </span>
//             <span className="capitalize">
//               {
//                 filterContent.filterBy.find(
//                   filter => filter.name === "availability"
//                 )?.name
//               }
//             </span>
//           </button>
//           <div className="flex-col items-start gap-2">
//             {availabilityFilter?.options &&
//               Object.entries(availabilityFilter.options).map(([key, name]) => (
//                 <div
//                   key={key}
//                   className="flex items-center gap-2 py-3 text-darkGray"
//                 >
//                   <input
//                     className="h-4 w-4 appearance-none border border-gray-400 checked:before:block checked:before:text-center checked:before:leading-4 checked:before:text-black checked:before:content-['✔']"
//                     type="checkbox"
//                     name={key}
//                     id={name}
//                     onChange={handleAvailabilityFilterChange}
//                     checked={
//                       filters.availability[key as AvailabilityKeys] || false
//                     }
//                   />
//                   <label className="hover:underline" htmlFor={key}>
//                     {name} (
//                     {name === "In Stock" ? inStockCount : outOfStockCount})
//                   </label>
//                 </div>
//               ))}
//           </div>
//         </div>
//       )}

//       {activeFilters.colors && (
//         <div className="flex-grow overflow-y-auto border-y border-gray-300 px-[25px] py-3 text-[15px] text-darkGray">
//           <button
//             className="flex w-full items-center justify-start py-3"
//             onClick={handleGoBack}
//           >
//             <span>
//               <IoIosArrowRoundBack size={25} />
//             </span>
//             <span className="capitalize">
//               {
//                 filterContent.filterBy.find(filter => filter.name === "colors")
//                   ?.name
//               }
//             </span>
//           </button>
//           <div className="flex-col items-start gap-2">
//             {uniqueColorCategory.map(color => (
//               <div
//                 className="flex items-center gap-2 py-3 text-[14px] text-darkGray"
//                 key={color}
//               >
//                 <input
//                   type="checkbox"
//                   name={color}
//                   id={color}
//                   onChange={() => handleColorSelection(color)}
//                   checked={filters.colors.includes(color)}
//                   className={`h-6 w-6 appearance-none rounded-full checked:border checked:border-black ${
//                     data.colorClasses[
//                       color as keyof typeof data.colorClasses
//                     ] || "bg-gray-200"
//                   }`}
//                 />
//                 <label className="capitalize hover:underline" htmlFor={color}>
//                   {color} ({colorCategoryCounts[color]})
//                 </label>
//               </div>
//             ))}
//           </div>{" "}
//         </div>
//       )}
//       {/*clear and apply  buttons*/}
//       <div className="sticky flex items-center justify-between gap-2 bg-white px-[15px] py-2 text-sm">
//         <button
//           className="flex px-4 hover:underline hover:decoration-black"
//           onClick={handleClearFilters}
//         >
//           {activeFilters ? filterContent.clear : filterContent.remove}
//         </button>
//         <button
//           className="bg-black p-2 px-6 text-white"
//           onClick={toggleFilters}
//         >
//           {filterContent.apply}
//         </button>
//       </div>
//     </section>
//   );
// };

// export default CollectionFilters;
 