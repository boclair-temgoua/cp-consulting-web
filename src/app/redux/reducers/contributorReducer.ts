import produce from 'immer'

const initialState: any = {
  contributors: [],
}

export default produce((draft, action = {}) => {
  switch (action.type) {
    case 'GET_CONTRIBUTORS_PROJECT':
      draft.contributors = action.payload
      return
    case 'GET_CONTRIBUTORS_ORGANIZATION':
      draft.contributors = action.payload
      return
    default:
  }
}, initialState)
