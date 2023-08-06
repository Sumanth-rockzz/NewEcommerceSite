export const getAllOrders = () => {
  return fetch("https://dummyjson.com/carts/1").then((res) => res.json());
};

export const getRevenue = () => {
  return fetch("https://dummyjson.com/carts").then((res) => res.json());
};

export const getAllProducts = async () => {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();
  return data;
};

export const getCustomers = () => {
  return fetch("https://dummyjson.com/users").then((res) => res.json());
};

export const getComments = () => {
  return fetch("https://dummyjson.com/comments").then((res) => res.json());
};
