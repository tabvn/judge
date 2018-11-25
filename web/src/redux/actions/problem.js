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

/**
 * Get problem by ID
 * @param id
 * @returns {function(*=, *, {service: *}): Promise<any>}
 */
export const getProblem = (id) => {

  return (dispatch, getState, {service}) => {
    return new Promise((resolve, reject) => {

      service.get(`api/problems/${id}`).then((res) => {

        dispatch(setProblem(res))

        return resolve(res)
      }).catch(e => {
        dispatch(setError(e))
        return reject(e)
      })
    })
  }
}

/**
 * Request delete file to service
 * @param file
 * @returns {Function}
 */

export const deleteProblemFile = (file) => {
  return (dispatch, getState, {service}) => {
    return service.delete(`api/files/${file.id}`)
  }
}

export const updateProblem = (problem) => {

  return (dispatch, getState, {service}) => {

    return new Promise((resolve, reject) => {

      return service.put(`api/problems/${problem.id}`, problem).then((data) => {
        dispatch(setProblem(data))
        return resolve(data)
      }).catch((e) => {
        setError(e)
        return reject(e)
      })
    })
  }
}