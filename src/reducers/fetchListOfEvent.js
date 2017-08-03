import { FETCH_LIST_OF_EVENT } from'../action'

const defaultState = {
  items: []
}

export default function(state = defaultState, action){
  switch (action.type) {
    case FETCH_LIST_OF_EVENT:
      return {
        ...state,
        items: action.payload
      }
  }
  return state
}
