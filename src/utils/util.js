export const calculatePrice = (currency, price) => {
  let valuePesoArgentino = Intl.NumberFormat("es-AR");
  let pesoArgentino = price.toLocaleString("es-ar", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
  });
  let splitValue = valuePesoArgentino.format(price).split(",");
  let splitPrice = pesoArgentino.split(",");
  let value = splitValue.length > 0 ? splitValue[0] : "0";
  let decimals = splitPrice.length > 1 ? splitPrice[1] : "00";

  return { value, decimals };
};
