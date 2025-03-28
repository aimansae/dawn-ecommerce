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
    createdAt: product.createdAt,
    availability: product.availability ?? "available",
    availableColors: product.availableColors?.map((color: Color) => ({
      color: color.color,
      tag: color.tag,
      colorCategory: color.colorCategory,
      imageUrl: color.imageUrl,
    })),
    availableSizes: product.availableSizes,
    category: product.category,
    description: product.description,
  };
};
