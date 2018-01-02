
import { fromJS } from 'immutable';
import productsContainerReducer from '../reducer';

describe('productsContainerReducer', () => {
  it('returns the initial state', () => {
    expect(productsContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
