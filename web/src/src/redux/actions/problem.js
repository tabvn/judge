import { SET_PROBLEM } from '../types'
import { setError } from '.'

/**
 * Set problem to store
 * @param data
 * @returns {Function}
 */
export const setProblem = (data) => {
  return (dispatch) => {

    dispatch({
      type: SET_PROBLEM,
      payload: data
    })
  }
}

/**
 * Submit create new problem to service
 * @param data
 * @returns {function(*=, *, {service: *}): Promise<any>}
 */
export const addProblem = (data) => {

  return (dispatch, getState, {service}) => {

    return new Promise((resolve, reject) => {

      service.post('api/problems', data).then((res) => {
        dispatch(setProblem(res))
        return resolve(res)
      }).catch((e) => {
        dispatch(setError(e))
        return reject(e)
      })
    })
  }
}