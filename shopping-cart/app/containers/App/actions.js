/*
 *
 * App actions
 *
 */

import { START_LOADING, STOP_LOADING } from "./constants";

export function startLoading() {
  return {
    type: START_LOADING,
    loading: +1
  };
}

export function stopLoading() {
  return {
    type: STOP_LOADING,
    loading: -1
  };
}
