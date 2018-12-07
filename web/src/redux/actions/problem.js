import { REMOVE_PROBLEM, REMOVE_TEST_CASE, SET_PROBLEM, SET_TEST_CASE } from '../types'
import { setError } from '.'
import _ from 'lodash'

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

export const findProblems = (filter) => {

  return (dispatch, getState, {service}) => {
    return new Promise((resolve, reject) => {

      service.get(`api/problems?filter=${JSON.stringify(filter)}`).then((res) => {

        _.each(res, (p) => {
          dispatch(setProblem(p))
        })

        return resolve(res)
      }).catch(e => {
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

export const deleteProblem = (id) => {

  return (dispatch, getState, {service}) => {

    return new Promise((resolve, reject) => {

      return service.delete(`api/problems/${id}`).then((data) => {

        dispatch({
          type: REMOVE_PROBLEM,
          payload: id
        })

        return resolve(data)

      }).catch((e) => {
        setError(e)
        return reject(e)
      })
    })
  }
}

/**
 * Add problem test case
 * @param problemId
 * @param data
 * @returns {function(*=, *, {service: *}): Promise<any>}
 */
export const addTestCase = (problemId, data) => {
  return (dispatch, getState, {service}) => {

    return new Promise((resolve, reject) => {
      service.post(`api/problems/${problemId}/tests`, data).then((data) => {

        dispatch({
          type: SET_TEST_CASE,
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
 * Update test case
 * @param data
 * @returns {function(*=, *, {service: *}): Promise<any>}
 */
export const updateTestCase = (data) => {
  return (dispatch, getState, {service}) => {

    return new Promise((resolve, reject) => {
      service.put(`api/tests/${data.id}`, data).then((data) => {
        dispatch({
          type: SET_TEST_CASE,
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
 * delete problem test case
 * @param id
 * @returns {function(*=, *, {service: *}): Promise<any>}
 */
export const deleteTestCase = (id) => {

  return (dispatch, getState, {service}) => {
    return new Promise((resolve, reject) => {

      service.delete(`api/tests/${id}`).then(() => {

        dispatch({
          type: REMOVE_TEST_CASE,
          payload: parseInt(id)
        })
      }).catch(e => {
        setError(e)
      })
    })
  }
}

export const getTestCase = (id) => {

  return (dispatch, getState, {service}) => {
    return new Promise((resolve, reject) => {

      service.get(`api/tests/${id}`).then((data) => {

        dispatch({
          type: SET_TEST_CASE,
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

export const loadTestCases = (problemId, filter = {}) => {
  return (dispatch, getState, {service}) => {
    return new Promise((resolve, reject) => {

      service.get(`api/problems/${problemId}/tests`).then((data) => {
        _.each(data, (t) => {
          dispatch({
            type: SET_TEST_CASE,
            payload: t
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

