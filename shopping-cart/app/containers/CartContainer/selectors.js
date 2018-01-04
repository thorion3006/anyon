import { createSelector } from "reselect";

/**
 * Direct selector to the cartContainer state domain
 */
const selectCartContainerDomain = state => state.get("CartContainer");

/**
 * Other specific selectors
 */
const makeSelectCart = () =>
  createSelector(
    selectCartContainerDomain,
    substate => substate.toJS().cart || []
  );

const makeSelectTotal = () =>
  createSelector(selectCartContainerDomain, substate => substate.toJS().total);

const makeSelectIsEmpty = () =>
  createSelector(
    makeSelectCart(),
    products => (products.length > 0 ? false : true)
  );

const makeSelectNetTotal = () =>
  createSelector(
    makeSelectTotal(),
    total => (total.netTotal ? total.netTotal : "0")
  );

const makeSelectTax = () =>
  createSelector(makeSelectTotal(), total => (total.tax ? total.tax : {}));

const makeSelectGrandTotal = () =>
  createSelector(
    makeSelectTotal(),
    total => (total.grandTotal ? total.grandTotal : "0")
  );

export {
  selectCartContainerDomain,
  makeSelectCart,
  makeSelectTotal,
  makeSelectIsEmpty,
  makeSelectNetTotal,
  makeSelectTax,
  makeSelectGrandTotal
};
