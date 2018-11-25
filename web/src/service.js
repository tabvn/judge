import { api } from './config'
import axios from 'axios'
import _ from 'lodash'

export default class Service {

  constructor () {

    this.token = null
  }

  getToken () {
    return _.get(this.token, 'token', '')
  }

  setToken (token) {
    this.token = token
  }

  /**
   * Get Request
   * @param path
   * @returns {Promise<any>}
   */
  get (path) {

    return new Promise((resolve, reject) => {
      axios({
        url: `${api}/${path}`,
        method: 'get',
        headers: {
          Authorization: this.getToken(),
        },
        withCredentials: true,
        data: null,
      }).then((result) => {
        return resolve(result.data)
      }).catch((e) => {
        return reject(e)
      })
    })
  }

  /**
   * Post Request to service
   * @param path
   * @param data
   * @returns {Promise<any>}
   */
  post (path, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: `${api}/${path}`,
        method: 'post',
        headers: {
          Authorization: this.getToken(),
        },
        withCredentials: true,
        data: data,
      }).then((result) => {
        return resolve(result.data)
      }).catch((e) => {
        return reject(e)
      })
    })

  }

  put (path, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: `${api}/${path}`,
        method: 'put',
        headers: {
          Authorization: this.getToken(),
        },
        withCredentials: true,
        data: data,
      }).then((result) => {
        return resolve(result.data)
      }).catch((e) => {
        return reject(e)
      })
    })

  }

  /**
   * Single file upload
   * @param path
   * @param file
   * @returns {Promise<any>}
   */
  upload (path, file) {

    const config = {
      headers: {
        Authorization: this.getToken(),
      },
      withCredentials: true,
    }
    let data = new FormData()

    data.append('file', file)

    return new Promise((resolve, reject) => {

      axios.post(`${api}/${path}`, data, config).then((res) => {
        return resolve(res.data)

      }).catch((e) => {
        return reject(e)
      })

    })
  }

  /**
   * Delete request
   * @param path
   * @returns {AxiosPromise}
   */
  delete (path) {

    const config = {
      headers: {
        Authorization: this.getToken(),
      },
      withCredentials: true,
    }
    return axios.delete(`${api}/${path}`, config)
  }

}