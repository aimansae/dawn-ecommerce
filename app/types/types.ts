export type Color = {
  color: string;
  tag?: string;
  imageUrl: string[];
};
export type Size = string;

export type ProductType = {
  id: string;
  name: string;
  image: string;
  prices: {
    regular: number;
    sale?: number;
  };
  status?: string;
  availability: string;
  availableColors: Color[];
  availableSizes?: Size[];
  category: string;
  description?: string;
};
export type SingleProductType = {
  product: ProductType;
};
