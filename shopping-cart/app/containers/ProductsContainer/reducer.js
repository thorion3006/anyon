/*
 *
 * ProductsContainer reducer
 *
 */

import { fromJS } from "immutable";
import {
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILED,
  ADD_TO_CART_FAILED
} from "./constants";

const initialState = fromJS({ products: [], error: null });

function productsContainerReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS:
      return state.set("products", action.products);
    case ADD_TO_CART_FAILED:
    case FETCH_PRODUCTS_FAILED:
      return state.set("error", action.error);
    default:
      return state;
  }
}

export default productsContainerReducer;
