import _ from 'lodash'
import { SET_CONTEST } from '../types'
import { setError } from './app'

/**
 * Get contest
 * @param id
 * @returns {function(*=, *, {service: *}): Promise<any>}
 */
export const getContest = (id) => {

  return (dispatch, getState, {service}) => {
    return new Promise((resolve, reject) => {

      service.get(`api/contests/${id}`).then((data) => {

        dispatch({
          type: SET_CONTEST,
          payload: data
        })
        return resolve(data)

      }).catch(e => {
        setError(e)
        return reject(e)
      })
    })
  }
}

/**
 *
 * @param data
 * @returns {function(*=, *, {service: *}): Promise<any>}
 */
export const createContest = (data) => {

  return (dispatch, getState, {service}) => {
    return new Promise((resolve, reject) => {

      service.post(`api/contests`, data).then((data) => {

        dispatch({
          type: SET_CONTEST,
          payload: data
        })
        return resolve(data)

      }).catch(e => {
        setError(e)
        return reject(e)
      })
    })
  }
}

/**
 * Update contest
 * @param data
 * @returns {function(*=, *, {service: *}): Promise<any>}
 */
export const updateContest = (data) => {

  return (dispatch, getState, {service}) => {
    return new Promise((resolve, reject) => {

      service.put(`api/contests/${data.id}`, data).then((data) => {

        dispatch({
          type: SET_CONTEST,
          payload: data
        })

        return resolve(data)

      }).catch(e => {
        setError(e)
        return reject(e)
      })
    })
  }
}

/**
 * Find contests
 * @param filter
 * @returns {function(*=, *, {service: *}): Promise<any>}
 */
export const findContests = (filter) => {

  return (dispatch, getState, {service}) => {
    return new Promise((resolve, reject) => {

      service.get(`api/contests?filter=${JSON.stringify(filter)}`).then((data) => {

        _.each(data, (c) => {

          dispatch({
            type: SET_CONTEST,
            payload: c
          })

        })

        return resolve(data)

      }).catch(e => {
        setError(e)
        return reject(e)
      })
    })
  }
}






