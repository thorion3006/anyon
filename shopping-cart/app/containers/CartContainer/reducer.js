/*
 *
 * CartContainer reducer
 *
 */

import { fromJS } from "immutable";
import {
  FETCH_CART_SUCCESS,
  FETCH_CART_FAILED,
  UPDATE_CART_PRODUCT_SUCCESS,
  UPDATE_CART_PRODUCT_FAILED,
  DELETE_CART_PRODUCT_SUCCESS,
  DELETE_CART_PRODUCT_FAILED,
  CLEAR_CART_SUCCESS,
  CLEAR_CART_FAILED
} from "./constants";

const initialState = fromJS({
  cart: [],
  total: {},
  error: null
});

function updateCart(state, action) {
  const cart = state.get("cart");
  let newCart = [];
  if (action.type === UPDATE_CART_PRODUCT_SUCCESS) {
    newCart = cart.map(product => {
      if (product.productId === action.product.productId) {
        product = action.product;
      }
      return product;
    });
  } else {
    newCart = cart.filter(product => product.id !== action.product.id);
  }
  return state.set("cart", newCart).set("total", action.total);
}

function cartContainerReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CART_SUCCESS:
    case CLEAR_CART_SUCCESS:
      return state.set("cart", action.cart).set("total", action.total);
    case UPDATE_CART_PRODUCT_SUCCESS:
    case DELETE_CART_PRODUCT_SUCCESS:
      return updateCart(state, action);
    case FETCH_CART_FAILED:
    case CLEAR_CART_FAILED:
    case UPDATE_CART_PRODUCT_FAILED:
    case DELETE_CART_PRODUCT_FAILED:
      return state.set("error", action.error);
    default:
      return state;
  }
}

export default cartContainerReducer;
