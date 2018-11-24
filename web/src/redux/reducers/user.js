import { OrderedMap } from 'immutable/dist/immutable'
import { REMOVE_USER, SET_USER } from '../types'

const initState = {
  models: new OrderedMap(),
}

export default (state = initState, action) => {

  switch (action.type) {

    case SET_USER:

      return {
        ...state,
        models: state.models.set(action.payload.id, action.payload)
      }

    case REMOVE_USER:
      return {
        ...state,
        models: state.models.delete(action.payload)
      }
    default:
      return state
  }
}