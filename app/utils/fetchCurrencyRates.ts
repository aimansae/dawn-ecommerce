export default async function fetchExchangeRate<Promise>(
  targetCurrency: string
) {
  try {
    const res = await fetch(
      `https://v6.exchangerate-api.com/v6/bdec6d7f3c03f3c9ca6e6613/latest/USD`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch exchange rates");
    }
    const data = await res.json();
    console.log("ALL RATES", data.conversion_rates);

    return data.conversion_rates[targetCurrency];
  } catch (err) {
    console.error("Error fetching exchange rates", err);
    return null;
  }
}
