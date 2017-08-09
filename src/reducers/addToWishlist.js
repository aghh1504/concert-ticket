import {ADD_TO_WISHLIST, WISHLIST_CLEAR_MSG, REMOVE_FROM_WISHLIST, REMOVE_FROM_WISHLIST_CLEAR_MSG} from '../action'

const defaultState = {
  items: [],
  successMessage: '',
  errorMessage: ''
}

export default function(state = defaultState, {type, payload: item}) {
  switch (type) {
    case ADD_TO_WISHLIST:
      const items = [...state.items];
      let successMessage = ''
      let errorMessage = ''

      if (!items.find((it) => it.id === item.id)) {
        successMessage = 'Added to Wishlist'
        items.push(item);
      } else {
        errorMessage = 'Item was already added'
      }

      return {
        ...state,
        items,
        successMessage,
        errorMessage
      }
    case WISHLIST_CLEAR_MSG:
      return {
        ...state,
        successMessage: '',
        errorMessage: ''
      };
    case REMOVE_FROM_WISHLIST:
      return {
        ...state,
        items: state.items.filter((it) => it.id !== item),
        successMessage: `Item was removed`
      };
  }

  console.log('state after action in reducer', state);
  return state
}
