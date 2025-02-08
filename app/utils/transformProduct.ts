import { ProductType } from "../types/types";

export const transformProduct = (product: any): ProductType => {
  return {
    ...product,
    id: product.id.toString(), // Convert id to string
    prices: {
      ...product.prices,
      regular: Number(product.prices.regular), // Convert regular price to number
      sale: product.prices.sale ? Number(product.prices.sale) : undefined, // Convert sale price to number if it exists
    },
    status: product.status,
    availability: product.availability,
    availableColors: product.availableColors?.map((color: any) => ({
      color: color.color,
      colorCategory: color.colorCategory,
      imageUrl: color.imageUrl,
      imageSides: color.imageSides || [], // Use an empty array if no sides are provided
    })),
  };
};
