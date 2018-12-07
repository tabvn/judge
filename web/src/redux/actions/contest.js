import _ from 'lodash'
import { REMOVE_CONTEST_PROBLEM, SET_CONTEST, SET_CONTEST_PROBLEM } from '../types'
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
 * Get contest problems
 * @param id
 * @returns {function(*=, *, {service: *}): Promise<any>}
 */
export const getContestProblems = (id) => {

  return (dispatch, getState, {service}) => {
    return new Promise((resolve, reject) => {

      service.get(`api/contests/${id}/problems`).then((data) => {

        _.each(data, (p) => {

          dispatch({
            type: SET_CONTEST_PROBLEM,
            payload: p
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

/**
 * Update contest problem
 * @param data
 * @returns {function(*=, *, {service: *}): Promise<any>}
 */
export const updateContestProblem = (data) => {

  return (dispatch, getState, {service}) => {
    return new Promise((resolve, reject) => {

      data.max_score = parseInt(data.max_score)

      service.put(`api/contest-problems/${data.id}`, data).then((res) => {

        dispatch({
          type: SET_CONTEST_PROBLEM,
          payload: Object.assign(data, res)
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
 * Add problem to contest
 * @param contestId
 * @param data
 * @returns {function(*=, *, {service: *}): Promise<any>}
 */
export const addProblemToContest = (contestId, data) => {

  return (dispatch, getState, {service}) => {
    return new Promise((resolve, reject) => {

      service.post(`api/contests/${contestId}/problems`, data).then((res) => {

        dispatch({
          type: SET_CONTEST_PROBLEM,
          payload: res,
        })

        return resolve(res)

      }).catch(e => {
        setError(e)
        return reject(e)
      })
    })
  }
}

/**
 * Delete contest problem
 * @param id
 * @returns {function(*=, *, {service: *}): Promise<any>}
 */
export const deleteContestProblem = (id) => {

  return (dispatch, getState, {service}) => {
    return new Promise((resolve, reject) => {

      service.delete(`api/contest-problems/${id}`).then((res) => {

        dispatch({
          type: REMOVE_CONTEST_PROBLEM,
          payload: id
        })

        return resolve(res)

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






