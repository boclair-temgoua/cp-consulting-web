import {combineReducers} from 'redux'
import contributors from './contributorReducer'
// import users from './userReducer';
// import subscribes from './subscribeReducer';
// import currencies from './currencyReducer';

const rootReducer = combineReducers({
  contributors,
  // users,
  // currencies,
  // subscribes,
})

export default rootReducer
