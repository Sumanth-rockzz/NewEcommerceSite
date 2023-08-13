export const getCart = () => {
  return fetch("https://dummyjson.com/carts/1").then((res) => res.json());
};

export const getProductsByCategory = (category, limit, pageNumber) => {
  const skip = limit * pageNumber - limit;
  return fetch(
    `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`
  ).then((res) => res.json());
};

export const getAllProducts = (limit, pageNumber) => {
  const skip = limit * pageNumber - limit;
  return fetch(
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
  ).then((res) => res.json());
};

export const addToCart = (id) => {
  return fetch("https://dummyjson.com/carts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: 1,
      products: [
        {
          id: id,
          quantity: 1,
        },
      ],
    }),
  }).then((res) => res.json());
};

export const getCustomers = () => {
  return fetch("https://dummyjson.com/users").then((res) => res.json());
};

export const getComments = () => {
  return fetch("https://dummyjson.com/comments").then((res) => res.json());
};
