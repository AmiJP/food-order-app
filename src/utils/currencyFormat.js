export const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "CAD",
});
console.log(currencyFormatter);
