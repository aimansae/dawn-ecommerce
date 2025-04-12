export default async function fetchExchangeRate(targetCurrency: string) {
  try {
    const res = await fetch(
      `https://api.exchangerate.host/latest?base=USD&symbols=${targetCurrency}`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch exchange rates");
    }
    const data = await res.json();

    return data.conversion_rates[targetCurrency];
  } catch (err) {
    console.error("Error fetching exchange rates", err);
    return null;
  }
}
