import _ from 'lodash'
import { SET_CONTEST } from '../types'
import { setError } from './app'

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