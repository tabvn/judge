import _ from 'lodash'
import { LOGOUT, RELOAD, SET_APP_DATA, SET_CURRENT_USER, SET_TOKEN } from '../types'

const initState = {
  currentUser: null,
  token: null,
  role: ''
}

export default (state = initState, action) => {
  switch (action.type) {

    case SET_CURRENT_USER:

      return {
        ...state,
        currentUser: action.payload
      }

    case SET_APP_DATA:
      return {
        ...state,
        currentUser: _.get(action.payload, 'me'),
        role: _.get(action.payload, 'role')
      }

    case RELOAD:

      return {
        ...state,
        currentUser: action.payload.user,
        role: action.payload.role,
        token: action.payload.token,
      }
    case LOGOUT:

      return {
        ...state,
        currentUser: null,
        token: null,
        role: null
      }

    case SET_TOKEN:

      return {
        ...state,
        token: action.payload,
      }

    default:
      return state
  }
}