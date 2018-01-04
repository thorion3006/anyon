/*
 *
 * CartContainer actions
 *
 */

import {
  FETCH_CART,
  FETCH_CART_SUCCESS,
  FETCH_CART_FAILED,
  UPDATE_CART_PRODUCT,
  UPDATE_CART_PRODUCT_SUCCESS,
  UPDATE_CART_PRODUCT_FAILED,
  DELETE_CART_PRODUCT,
  DELETE_CART_PRODUCT_SUCCESS,
  DELETE_CART_PRODUCT_FAILED,
  CLEAR_CART,
  CLEAR_CART_SUCCESS,
  CLEAR_CART_FAILED,
  ADD_NEW_PRODUCTS
} from "./constants";

export function fetchCart() {
  return {
    type: FETCH_CART
  };
}

export function fetchCartSuccess(cart, total) {
  return {
    type: FETCH_CART_SUCCESS,
    cart,
    total
  };
}

export function fetchCartFailed(error) {
  return {
    type: FETCH_CART_FAILED,
    error
  };
}

export function updateCartProduct(cartProduct) {
  return {
    type: UPDATE_CART_PRODUCT,
    cartProduct
  };
}

export function updateCartProductSuccess(product, total) {
  return {
    type: UPDATE_CART_PRODUCT_SUCCESS,
    product,
    total
  };
}

export function updateCartProductFailed(error) {
  return {
    type: UPDATE_CART_PRODUCT_FAILED,
    error
  };
}

export function deleteCartProduct(productCartId) {
  return {
    type: DELETE_CART_PRODUCT,
    productCartId
  };
}

export function deleteCartProductSuccess(product, total) {
  return {
    type: DELETE_CART_PRODUCT_SUCCESS,
    product,
    total
  };
}

export function deleteCartProductFailed(error) {
  return {
    type: DELETE_CART_PRODUCT_FAILED,
    error
  };
}

export function clearCart() {
  return {
    type: CLEAR_CART
  };
}

export function clearCartSuccess(cart, total) {
  return {
    type: CLEAR_CART_SUCCESS,
    cart,
    total
  };
}

export function clearCartFailed(error) {
  return {
    type: CLEAR_CART_FAILED,
    error
  };
}

export function addNewProducts() {
  return {
    type: ADD_NEW_PRODUCTS
  };
}
