"use client";
import React, { useState, useEffect } from "react";
import { useFilters } from "./useFilter";

const Input = () => {
  const sizes = ["xs", "s", "m", "l", "xl", "xxl"];
  const colors = ["blue", "red", "yellow"];
  const [showFilters, setShowFilters] = useState(false);

  const show = () => {
    setShowFilters(prev => !prev);
    console.log("show filter clicked");
  };

  const {
    selectedColor = [],
    selectedSize = [],
    clearFilter,
    handleColorChange,
    handleSizeChange,
  } = useFilters();

  return (
    <>
      <div className="flex">
        <button
          type="button"
          onClick={show}
          className="my-4 flex items-center gap-2 rounded border p-2 hover:border-black"
        >
          <span>Filters</span>
          {showFilters && <button className="">X</button>}
        </button>
      </div>
      {showFilters && (
        <div className="flex-col gap-2">
          <div>
            <h2>Sizes:</h2>
            {sizes.map(size => (
              <div className="flex items-center gap-2" key={size}>
                <input
                  type="checkbox"
                  id={size}
                  name={size}
                  checked={selectedSize.includes(size)}
                  onChange={handleSizeChange}
                />
                <label htmlFor={size}>{size}</label>
              </div>
            ))}
            <button
              className="my-4 border p-2"
              onClick={() => clearFilter("size")}
            >
              {" "}
              Clear all
            </button>
          </div>
          <div>
            <h2>Colors:</h2>
            {colors.map(color => (
              <div className="flex items-center gap-2" key={color}>
                <input
                  type="checkbox"
                  onChange={handleColorChange}
                  name={color}
                  id={color}
                  checked={selectedColor.includes(color)}
                />
                <label htmlFor={color}>{color}</label>
              </div>
            ))}
          </div>
          <button
            className="my-4 border p-2"
            onClick={() => clearFilter("colors")}
          >
            {" "}
            Clear all
          </button>
        </div>
      )}
    </>
  );
};

export default Input;
