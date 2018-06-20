// TODO this implementation does no token refresh

import axios from 'axios'

const apiConfig = {
  projectKey: process.env.CTP_PROJECT_KEY,
  clientId: process.env.CTP_CLIENT_ID,
  clientSecret: process.env.CTP_CLIENT_SECRET
}

const baseUrl = '/api/' + apiConfig.projectKey

const authConfig = {
  auth: {
    username: apiConfig.clientId,
    password: apiConfig.clientSecret
  }
}

const authParams = new URLSearchParams()
authParams.append('grant_type', 'client_credentials')
authParams.append('scope', `manage_project:${apiConfig.projectKey}`)

const tokenPromise = axios.post('/auth/oauth/token', authParams, authConfig)

export default {
  get: function (path, config = {}) {
    if (config instanceof URLSearchParams) {
      config = {
        params: config
      }
    }
    return tokenPromise.then(tokens => {
      config.headers = {
        'Authorization': 'Bearer ' + tokens.data.access_token
      }
      return axios.get(baseUrl + path, config)
    })
  },
  post: function (path, body, config) {
    return tokenPromise.then(tokens => {
      config.headers = {
        'Authorization': 'Bearer ' + tokens.data.access_token
      }
      return axios.post(baseUrl + path, body, config)
    })
  }
}
