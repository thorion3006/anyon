import { takeLatest, call, put, select } from "redux-saga/effects";
import { push } from "react-router-redux";

import { FETCH_PRODUCTS, ADD_TO_CART, GO_TO_CART } from "./constants";
import { fetchProductsFromServer, postProductToCart } from "utils/serverCalls";
import {
  fetchProductsSuccess,
  fetchProductsFailed,
  addToCartFailed
} from "./actions";
import { startLoading, stopLoading } from "../App/actions";
import { makeSelectCart } from "../CartContainer/selectors";
import { fetchCartSuccess } from "../CartContainer/actions";
import { updateCartProduct } from "../CartContainer/sagas";

// Individual exports for testing
export function* fetchProducts() {
  try {
    yield put(startLoading());
    const products = yield call(fetchProductsFromServer);
    yield put(fetchProductsSuccess(products));
    yield put(stopLoading());
  } catch (e) {
    yield put(fetchProductsFailed(e.message));
    yield put(stopLoading());
  }
}

export function* addToCartServer(action) {
  try {
    yield put(startLoading());
    const { products, total } = yield call(postProductToCart, action.product);
    yield put(fetchCartSuccess(products, total));
    yield put(stopLoading());
  } catch (e) {
    yield put(addToCartFailed(e.message));
    yield put(stopLoading());
  }
}

export function* addToCart(action) {
  const cartProducts = yield select(makeSelectCart());
  const updatedProduct = cartProducts.find(
    product => product.productId === action.product.productId
  );
  if (updatedProduct) {
    action.product.id = updatedProduct.id;
    action.cartProduct = action.product;
    yield call(updateCartProduct, action);
  } else {
    yield call(addToCartServer, action);
  }
}

export function* goToCart() {
  yield put(push("/"));
}

export function* fetchProductsSaga() {
  yield takeLatest(FETCH_PRODUCTS, fetchProducts);
}

export function* addToCartSaga() {
  yield takeLatest(ADD_TO_CART, addToCart);
}

export function* goToCartSaga() {
  yield takeLatest(GO_TO_CART, goToCart);
}

// All sagas to be loaded
export default [fetchProductsSaga, addToCartSaga, goToCartSaga];
