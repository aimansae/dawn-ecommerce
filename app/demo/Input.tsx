"use client";

import { useFilter } from "./useFilter";

const Input = () => {
  const {
    selectedSizes,
    selectedColors,
    handleSizeSelection,
    handleColorSelection,
  } = useFilter();
  const sizes = ["xs", "s", "m"];

  // get colors from products
  const products = [
    {
      id: 1,
      name: "Cropped T-shirt",
      size: ["xs", "m"],
      colors: ["white", "black", "red"],
    },
    {
      id: 2,
      name: "Normal T-shirt",
      size: ["m"],
      colors: ["black", "red"],
    },
    {
      id: 3,
      name: "Just T-shirt",
      size: ["s", "xl"],
      colors: ["red"],
    },
  ];

  const colors = products
    .map(product => product.colors)

    .flat();
  const colorsInLowerCase = colors.map(color => color.toLowerCase());

  const uniqueColorsInLowerCase = [...new Set(colorsInLowerCase)];
  return (
    <div>
      {sizes.map(size => (
        <div className="my-2">
          <input
            className="mx-2"
            type="checkbox"
            id={size}
            name={size}
            onChange={() => handleSizeSelection(size)}
            checked={selectedSizes.includes(size)}
          />
          <label className="uppercase" htmlFor={size}>
            {size}
          </label>
        </div>
      ))}

      <div>
        {uniqueColorsInLowerCase.map(color => (
          <div className="m-2">
            <input
              onChange={() => handleColorSelection(color)}
              checked={selectedColors.includes(color)}
              className="mx-2"
              type="checkbox"
              name={color}
              id={color}
            />
            <label>{color}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Input;
