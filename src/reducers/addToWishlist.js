import ADD_TO_WISHLIST from '../action'

const defaultState = {
  items: [],
  amount: 0,
  successMessage: '',
  errorMessage: ''
}

export default function(state = defaultState, action){
  switch (action.type) {
    case ADD_TO_WISHLIST:
      return {
        ...state,
        items: action.payload,
        amount: state.amount + 1,
        successMessage: 'Added to Wishlist',
        errorMessage: 'Something goes wrong'
      }
  }
  return state
}
