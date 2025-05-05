export default async function fetchExchangeRate(targetCurrency: string) {
  if (targetCurrency === "USD") return 1;

  try {
    // const res = await fetch(
    //   `https://api.exchangerate.host/latest?base=USD&symbols=${targetCurrency}`
    // );
    const res = await fetch("/conversionRates.json");
    const rates = await res.json();
    const baseRate = rates["USD"];
    const targetRate = rates[targetCurrency];

    if (!targetRate || !baseRate) {
      console.log("Rate not found for", targetCurrency);
      return null;
    }

    return targetRate / baseRate;
  } catch (err) {
    console.error("Error fetching exchange rates", err);
    return null;
  }
}
