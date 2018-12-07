import { combineReducers } from 'redux'
import user from './user'
import app from './app'
import problem from './problem'
import testcase from './testcase'
import contest from './contest'
import contestProblem from './contest-problem'

export default combineReducers({
  app,
  problem,
  user,
  testcase,
  contest,
  contestProblem

})
