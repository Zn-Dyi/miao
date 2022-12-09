

import { createStore, combineReducers } from 'redux'
import {Reset} from './reducer/Reset'




const reducer = combineReducers({
  Reset: Reset,
})
const store = createStore(reducer)

export default store


