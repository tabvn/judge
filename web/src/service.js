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

}