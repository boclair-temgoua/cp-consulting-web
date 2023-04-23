import {produce} from 'immer'

const initialState = {
  categories: [],
}

export default produce((draft, action = {}) => {
  switch (action.type) {
    case 'GET_CATEGORIES':
      draft.categories = action.payload
      return
    default:
  }
}, initialState)
