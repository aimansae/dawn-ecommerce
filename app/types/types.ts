export type Color = {
  color: string;
  imageUrl: string;
  imageSides?: string[];
};
export type ProductType = {
  id: string;
  name: string;
  image: string;
  prices: {
    regular: number;
    sale?: number;
  };
  availableColors: Color[];
  category: string;
  description?: string;
};
export type SingleProductType = {
  product: ProductType;
};
