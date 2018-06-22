// TODO this implementation does no token refresh

import axios from 'axios'

const getCookie = (name) => {
  const decodedCookie = decodeURIComponent(document.cookie)
  const cookies = decodedCookie.split(';')
  const regex = new RegExp(`${name}=(.*)`)
  const matches = cookies.filter(cookie => regex.test(cookie))

  if (matches.length === 1) {
    return matches[0].match(regex)[1]
  } else {
    return ''
  }
}

const baseUrl = '/api'

export default {
  get: function (path, params) {
    const token = getCookie('token')
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params
    }
    const projectKey = getCookie('projectKey')
    const url = `${baseUrl}/${projectKey}${path}`
    return axios.get(url, config)
  },
  post: function (path, body) {
    const token = getCookie('token')
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
    const projectKey = getCookie('projectKey')
    const url = `${baseUrl}/${projectKey}${path}`
    return axios.post(url, body, config)
  },
  delete: function (path) {
    const token = getCookie('token')
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
    const projectKey = getCookie('projectKey')
    const url = `${baseUrl}/${projectKey}${path}`
    return axios.delete(url, config)
  }
}
