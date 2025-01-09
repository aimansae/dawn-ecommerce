export default async function fetchExchangeRate<Promise>(
  baseCurrency = "USD",
  targetCurrency = "EUR"
) {
  try {
    const res = await fetch(
      `https://v6.exchangerate-api.com/v6/bdec6d7f3c03f3c9ca6e6613/latest/${baseCurrency}`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch exchange rates");
    }
    const data = await res.json();
    console.log(
      "Base Currency is:",
      baseCurrency,
      data.conversion_rates[targetCurrency]
    );
    console.log("Target Currency is:", targetCurrency);
    console.log(
      `[Conversion Rate for ${targetCurrency} Target:]`,
      data.conversion_rates[targetCurrency]
    );
    return data.conversion_rates[targetCurrency];
  } catch (err) {
    console.error("Error fetching exchange rates", err);
    return null;
  }
}
