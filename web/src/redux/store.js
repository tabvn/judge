import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'
import Service from '../service'
import { RELOAD } from './types'
import { loadAppData } from './actions'

const service = new Service()
export const store = createStore(
  reducers,
  applyMiddleware(thunk.withExtraArgument({service}))
)

const token = localStorage.getItem('loginToken')
if (token) {
  try {
    const tokenJson = JSON.parse(token)
    service.setToken(tokenJson)
    store.dispatch({
      type: RELOAD,
      payload: {
        user: {
          id: tokenJson.user_id,
        },
        role: tokenJson.role,
        token: tokenJson
      }
    })

    store.dispatch(loadAppData())

  } catch (e) {

  }
}