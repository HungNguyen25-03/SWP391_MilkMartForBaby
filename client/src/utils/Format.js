export const formatVND = (number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(number);
};

export const formattedDate = (date) => {
  return `${date.getMonth() + 1}-${date.getFullYear()}`;
};
