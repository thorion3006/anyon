import { takeLatest, call, put } from "redux-saga/effects";
import { push } from "react-router-redux";

import {
  FETCH_CART,
  UPDATE_CART_PRODUCT,
  DELETE_CART_PRODUCT,
  CLEAR_CART,
  ADD_NEW_PRODUCTS
} from "./constants";
import {
  fetchCartFromServer,
  updateProductInCart,
  deleteProductFromCart,
  clearCartInServer
} from "utils/serverCalls";
import {
  fetchCartSuccess,
  fetchCartFailed,
  updateCartProductSuccess,
  updateCartProductFailed,
  deleteCartProductSuccess,
  deleteCartProductFailed,
  clearCartSuccess,
  clearCartFailed
} from "./actions";
import { startLoading, stopLoading } from "../App/actions";

// Individual exports for testing
export function* fetchCart() {
  try {
    yield put(startLoading());
    const { cart, total } = yield call(fetchCartFromServer);
    yield put(fetchCartSuccess(cart, total));
    yield put(stopLoading());
  } catch (e) {
    yield put(fetchCartFailed(e.message));
    yield put(stopLoading());
  }
}

export function* updateCartProduct(action) {
  try {
    yield put(startLoading());
    const { product, total } = yield call(
      updateProductInCart,
      action.cartProduct
    );
    yield put(updateCartProductSuccess(product, total));
    yield put(stopLoading());
  } catch (e) {
    yield put(updateCartProductFailed(e.message));
    yield put(stopLoading());
  }
}

export function* deleteCartProduct(action) {
  try {
    yield put(startLoading());
    const { product, total } = yield call(
      deleteProductFromCart,
      action.productCartId
    );
    yield put(deleteCartProductSuccess(product, total));
    yield put(stopLoading());
  } catch (e) {
    yield put(deleteCartProductFailed(e.message));
    yield put(stopLoading());
  }
}

export function* clearCart() {
  try {
    yield put(startLoading());
    const { cart, total } = yield call(clearCartInServer);
    yield put(clearCartSuccess(cart, total));
    yield put(stopLoading());
  } catch (e) {
    yield put(clearCartFailed(e.message));
    yield put(stopLoading());
  }
}

export function* addNewProducts() {
  yield put(push("/products"));
}

export function* fetchCartSaga() {
  yield takeLatest(FETCH_CART, fetchCart);
}

export function* updateCartProductSaga() {
  yield takeLatest(UPDATE_CART_PRODUCT, updateCartProduct);
}

export function* deleteCartProductSaga() {
  yield takeLatest(DELETE_CART_PRODUCT, deleteCartProduct);
}

export function* clearCartSaga() {
  yield takeLatest(CLEAR_CART, clearCart);
}

export function* addNewProductsSaga() {
  yield takeLatest(ADD_NEW_PRODUCTS, addNewProducts);
}

// All sagas to be loaded
export default [
  fetchCartSaga,
  updateCartProductSaga,
  deleteCartProductSaga,
  clearCartSaga,
  addNewProductsSaga
];
