/*
 *
 * ProductsContainer actions
 *
 */

import {
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILED,
  ADD_TO_CART,
  ADD_TO_CART_FAILED,
  GO_TO_CART
} from "./constants";

export function fetchProducts() {
  return {
    type: FETCH_PRODUCTS
  };
}

export function fetchProductsSuccess(products) {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    products
  };
}

export function fetchProductsFailed(error) {
  return {
    type: FETCH_PRODUCTS_FAILED,
    error
  };
}

export function addToCart(product) {
  return {
    type: ADD_TO_CART,
    product
  };
}

export function addToCartFailed(error) {
  return {
    type: ADD_TO_CART_FAILED,
    error
  };
}

export function goToCart() {
  return { type: GO_TO_CART };
}
