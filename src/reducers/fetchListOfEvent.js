import { FETCH_LIST_OF_EVENT_REQUEST, FETCH_LIST_OF_EVENT_SUCCESS, FETCH_LIST_OF_EVENT_ERROR } from'../action'

const defaultState = {
  items: [],
  inProgress: false,
  error: ''
}

export default function(state = defaultState, action){
  switch (action.type) {
    case FETCH_LIST_OF_EVENT_REQUEST:
      return {
        ...state,
        items: [],
        inProgress: true,
        error: ''
      }
    case FETCH_LIST_OF_EVENT_SUCCESS:
      return {
        ...state,
        items: action.payload,
        inProgress: false
      }
      case FETCH_LIST_OF_EVENT_ERROR:
        return {
          ...state,
          error: action.payload,
          inProgress: false
        }
  }
  return state
}
