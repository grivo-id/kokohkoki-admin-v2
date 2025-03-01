export const idrFormatter = (price) => {
  const formattedPrice = Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
  return formattedPrice;
};

export const usdFormatter = (price) => {
  const formattedPrice = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
  return formattedPrice;
};

export const dateFormatter = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const formatPrice = (value) => {
  if (!value) return "";

  const numericValue = value?.replace(/\D/g, "");

  return new Intl.NumberFormat("de-DE").format(numericValue);
};

export const parsePrice = (value) => {
  return parseFloat(value.replace(/\./g, "").replace(",", ".")) || 0;
};
