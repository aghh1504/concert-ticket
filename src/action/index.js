import axios from 'axios'
export const FETCH_LIST_OF_EVENT = ' FETCH_LIST_OF_EVENT'
export const FIND_CITY = 'FIND_CITY'

const API_KEY = 'QzNiBruRTBQHPjpYxR6o5AtcE2z9uHGE'
const ROOT_URL = `https://app.ticketmaster.com/discovery/v2/`

export function fetchListOfEvent(city) {
  return dispatch => {
    axios.get(`${ROOT_URL}events.json?countryCode=${city}&apikey=${API_KEY}`)
      .then(res => {
        console.log('fetchListOfEvent result: ', res.data)
        dispatch({type: FETCH_LIST_OF_EVENT, payload: res.data._embedded.events})
      })
      .catch((err) => console.log(err))
  }
}
