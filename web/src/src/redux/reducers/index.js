import { combineReducers } from 'redux'
import user from './user'
import app from './app'
import problem from './problem'

export default combineReducers({
  user,
  app,
  problem
})
