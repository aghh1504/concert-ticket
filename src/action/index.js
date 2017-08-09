import axios from 'axios'
export const FETCH_LIST_OF_EVENT_SUCCESS = ' FETCH_LIST_OF_EVENT_SUCCESS'
export const FETCH_LIST_OF_EVENT_REQUEST = ' FETCH_LIST_OF_EVENT_REQUEST'
export const FETCH_LIST_OF_EVENT_ERROR = 'FETCH_LIST_OF_EVENT_ERROR'
export const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST'
export const ADD_TO_WISHLIST_REQUEST = 'ADD_TO_WISHLIST_REQUEST'
export const ADD_TO_WISHLIST_SUCCESS = 'ADD_TO_WISHLIST_SUCCESS'
export const ADD_TO_WISHLIST_ERROR = 'ADD_TO_WISHLIST_ERROR'
export const REMOVE_FROM_WISHLIST = 'REMOVE_FROM_WISHLIST'
export const WISHLIST_CLEAR_MSG = 'WISHLIST_CLEAR_MSG'

const API_KEY = 'QzNiBruRTBQHPjpYxR6o5AtcE2z9uHGE'
const ROOT_URL = `https://app.ticketmaster.com/discovery/v2/`

export function fetchListOfEvent(country) {
  return dispatch => {
    dispatch({type: FETCH_LIST_OF_EVENT_REQUEST});

    axios.get(`${ROOT_URL}events.json?countryCode=${country}&apikey=${API_KEY}`)
      .then(res => {
        console.log('fetchListOfEvent result: ', res.data)
        dispatch({type: FETCH_LIST_OF_EVENT_SUCCESS, payload: res.data._embedded.events})
      })
      .catch((err) => dispatch({type: FETCH_LIST_OF_EVENT_ERROR, payload: err}))
  }
}

let timeoutId;

export function addToWishlist(item) {
  return dispatch => {
    dispatch({type: ADD_TO_WISHLIST, payload: item});

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => dispatch({type: 'WISHLIST_CLEAR_MSG'}), 3000);
  }
}

export const removeFromWishlist = function (id) {
  return dispatch => {
    dispatch({type: REMOVE_FROM_WISHLIST, payload: id});

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => dispatch({type: 'WISHLIST_CLEAR_MSG'}), 3000);
  }
};

export default {
  fetchListOfEvent,
  addToWishlist,
  removeFromWishlist
};