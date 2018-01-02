import request from "./fetchDefaults";

//Change the base_url when in production to point to the backend api.
const base_url = `http://localhost:3000`;

export function fetchProductsFromServer() {
  return request(`${base_url}/api/products`);
}

export function fetchCartFromServer() {
  return request(`${base_url}/api/cart`);
}

export function postProductToCart(product) {
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ product })
  };
  return request(`${base_url}/api/cart`, options);
}

export function updateProductInCart(cartProduct) {
  const options = {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ product: cartProduct })
  };
  return request(`${base_url}/api/cart/${cartProduct.id}`, options);
}

export function deleteProductFromCart(productCartId) {
  const options = {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  };
  return request(`${base_url}/api/cart/${productCartId}`, options);
}

export function clearCartInServer() {
  const options = {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  };
  return request(`${base_url}/api/cart`, options);
}
