import { combineReducers } from 'redux';
import fetchListOfEvent from './fetchListOfEvent'
import addToWishlist from './addToWishlist'

const rootReducer = combineReducers({
  fetchListOfEvent,
  addToWishlist
});

export default rootReducer;
