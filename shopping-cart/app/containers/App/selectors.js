import { createSelector } from "reselect";

/**
 * Direct selector to the app state domain
 */
const selectAppDomain = state => state.get("App");

/**
 * Other specific selectors
 */

// makeSelectLocationState expects a plain JS object for the routing state
const makeSelectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return state => {
    const routingState = state.get("route"); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

const makeSelectLoadingStatus = () =>
  createSelector(selectAppDomain, subState => subState.get("loading"));

export { makeSelectLocationState, makeSelectLoadingStatus };
