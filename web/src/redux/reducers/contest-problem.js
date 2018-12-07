import { OrderedMap } from 'immutable'
import { REMOVE_CONTEST_PROBLEM, SET_CONTEST_PROBLEM } from '../types'

const initState = {
  models: new OrderedMap(),
}
export default (state = initState, action) => {

  switch (action.type) {

    case SET_CONTEST_PROBLEM:

      return {
        ...state,
        models: state.models.set(action.payload.id, action.payload)
      }

    case REMOVE_CONTEST_PROBLEM:

      return {
        ...state,
        models: state.models.remove(action.payload)
      }

    default:

      return state
  }
}