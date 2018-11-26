import { OrderedMap } from 'immutable'
import { REMOVE_CONTEST, SET_CONTEST } from '../types'

export default (state = {models: new OrderedMap()}, action) => {

  switch (action.type) {

    case SET_CONTEST:

      return {
        ...state,
        models: state.models.set(action.payload.id, action.payload)
      }

    case REMOVE_CONTEST:

      return {
        ...state,
        models: state.models.remove(action.payload)
      }

    default:

      return state
  }
}