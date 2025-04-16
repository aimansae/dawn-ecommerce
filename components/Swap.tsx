"use client";
import React, { useState } from "react";
import Image from "next/image";
const Swap = () => {
  const images = [
    "https://images.pexels.com/photos/175695/pexels-photo-175695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/9227762/pexels-photo-9227762.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/5060939/pexels-photo-5060939.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  ];
  const [swapImage, setSwapImage] = useState(images);
  const handleClick = (index: number) => {
    const newImages = [...swapImage];
    [newImages[0], newImages[index]] = [newImages[index], newImages[0]];
    setSwapImage(newImages);
  };
  return (
    <div>
      <h1>Default </h1>
      <Image src={swapImage[0]} height={200} width={200} alt="" />
      <h2>Thumbnail</h2>
      {swapImage.slice(1).map((image, index) => (
        <div key={index + 1} onClick={() => handleClick(index + 1)}>
          <Image src={image} alt={""} height={200} width={200} />
        </div>
      ))}
    </div>
  );
};

export default Swap;
