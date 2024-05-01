export const numberToCurrency = (amount, currencyCode) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode || "INR",
  });
  if (!amount) {
    return null;
  }
  return formatter.format(amount).slice(1);
};
