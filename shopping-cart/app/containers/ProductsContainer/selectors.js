import { createSelector } from "reselect";

/**
 * Direct selector to the productsContainer state domain
 */
const selectProductsContainerDomain = state => state.get("ProductsContainer");

/**
 * Other specific selectors
 */
const makeSelectProducts = () =>
  createSelector(
    selectProductsContainerDomain,
    substate => substate.toJS().products
  );
const selectCartContainerDomain = state => state.get("CartContainer");
const makeSelectQty = () =>
  createSelector(selectCartContainerDomain, cartState => {
    let cart = cartState.toJS().cart || [];
    let qty = {};
    cart.map(cartProduct => (qty[cartProduct.productId] = cartProduct.qty));
    return qty;
  });

export {
  selectProductsContainerDomain,
  makeSelectProducts,
  selectCartContainerDomain,
  makeSelectQty
};
