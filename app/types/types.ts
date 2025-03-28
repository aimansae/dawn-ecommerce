export type Color = {
  color: string;
  colorCategory: string;
  tag: string;
  imageUrl: string[];
};
export type Size = string;

export type ProductType = {
  id: string;
  name: string;
  prices: {
    currency: string;
    regular: string;
    sale?: string;
  };
  status?: string;
  availability: string;
  createdAt: string;
  availableColors: Color[];
  availableSizes?: Size[];
  category: string[];
  description?: string;
};
export type SingleProductType = {
  product: ProductType;
};
