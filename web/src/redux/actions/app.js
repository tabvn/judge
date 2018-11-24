import { LOGOUT, SET_APP_DATA, SET_ERROR, SET_TOKEN } from '../types'

export const setError = (err) => {
  return (dispatch) => {
    dispatch({
      type: SET_ERROR,
      payload: err
    })
  }
}

export const login = (data) => {
  return (dispatch, getState, {service}) => {

    return new Promise((resolve, reject) => {

      return service.post('api/login', data).then((response) => {
        service.setToken(response)

        dispatch({
          type: SET_TOKEN,
          payload: response
        })

        localStorage.setItem('loginToken', JSON.stringify(response))

        dispatch(loadAppData())

        return resolve(response)
      }).catch((err) => {
        setError(err)
        return reject(err)
      })
    })
  }
}

export const register = (data) => {
  return (dispatch, getState, {service}) => {

    return new Promise((resolve, reject) => {
      service.post('api/register', data).then((response) => {
        console.log('user', response)
        return resolve(response)
      }).catch((err) => {
        setError(err)
        return reject(err)
      })
    })
  }
}

export const loadAppData = () => {
  return (dispatch, getState, {service}) => {
    service.get('api').then((data) => {
      dispatch({
        type: SET_APP_DATA,
        payload: data
      })
    })
  }
}

export const signOut = () => {
  return (dispatch, getState, {service}) => {

    const _token = service.getToken()
    dispatch({
      type: LOGOUT,
    })

    localStorage.removeItem('loginToken')

    service.post('api/logout', {token: _token})

  }
}