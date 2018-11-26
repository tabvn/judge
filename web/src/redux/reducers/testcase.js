import { OrderedMap } from 'immutable'
import { REMOVE_TEST_CASE, SET_TEST_CASE } from '../types'

const initState = {
  models: new OrderedMap()
}

export default (state = initState, action) => {
  switch (action.type) {

    case SET_TEST_CASE:

      return {
        ...state,
        models: state.models.set(action.payload.id, action.payload)
      }

    case REMOVE_TEST_CASE:

      return {
        ...state,
        models: state.models.remove(action.payload)
      }
    default:
      return state
  }
}