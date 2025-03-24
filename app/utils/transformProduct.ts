import { Color, ProductType } from "../types/types";

export const transformProduct = (product: ProductType): ProductType => {
  return {
    ...product,
    id: product.id.toString(),
    prices: {
      currency: product.prices.currency,
      regular: product.prices.regular, // Convert regular price to number
      sale: product.prices.sale, // Convert sale price to number if it exists
    },
    status: product.status,
    availability: product.availability ?? "available",
    availableColors: product.availableColors?.map((color: Color) => ({
      color: color.color,
      tag: color.tag,
      colorCategory: color.colorCategory,
      imageUrl: color.imageUrl,

      // imageSides: color.imageSides || [], // Use an empty array if no sides are provided
    })),
    availableSizes: product.availableSizes,
    category: product.category,
    description: product.description,
  };
};
