/*
 *
 * App reducer
 *
 */

import { fromJS } from "immutable";
import { START_LOADING, STOP_LOADING } from "./constants";

const initialState = fromJS({ loading: 0 });

function appReducer(state = initialState, action) {
  switch (action.type) {
    case START_LOADING:
    case STOP_LOADING:
      return state.set("loading", state.get("loading") + action.loading);
    default:
      return state;
  }
}

export default appReducer;
