
import { fromJS } from 'immutable';
import cartContainerReducer from '../reducer';

describe('cartContainerReducer', () => {
  it('returns the initial state', () => {
    expect(cartContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
