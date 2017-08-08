import axios from 'axios'
export const FETCH_LIST_OF_EVENT_SUCCESS = ' FETCH_LIST_OF_EVENT_SUCCESS'
export const FETCH_LIST_OF_EVENT_REQUEST = ' FETCH_LIST_OF_EVENT_REQUEST'
export const FETCH_LIST_OF_EVENT_ERROR = 'FETCH_LIST_OF_EVENT_ERROR'
export const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST'

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
      .catch((err) =>  dispatch({type: FETCH_LIST_OF_EVENT_ERROR, payload: err}))
  }
}

export function addToWishlist(item) {
  return {
    type: ADD_TO_WISHLIST,
    payload: item
  }
}
