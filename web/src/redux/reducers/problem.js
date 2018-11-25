import { OrderedMap } from 'immutable'
import { SET_PROBLEM } from '../types'

const initState = {
  models: new OrderedMap()
}
export default (state = initState, action) => {

  switch (action.type) {

    case SET_PROBLEM:

      return {
        ...state,
        models: state.models.set(action.payload.id, action.payload)
      }

    default:
      return state
  }

}