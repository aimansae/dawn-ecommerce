export const createSlugFromName = (name: string) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-")
    .trim();
};

export const convertPriceToCurrency = (
  price: number,
  exchangeRate?: number | null
) => {
  if (exchangeRate !== null && exchangeRate !== undefined) {
    return (price * exchangeRate).toFixed(2);
  }
  return price.toFixed(2); // If exchange rate is not available, return the original price
};
