import axios from 'axios'
import ROUTES_V2 from '../const/V2/routes'

export const cognitoPoolData = {
  UserPoolId: 'ap-south-1_1M7FLYgyw',
  ClientId: '7k6a8mfavvsj2srjkqm828j5di'
}

export const cognitoPoolData2 = {
  UserPoolId: 'ap-south-1_HEO2LcQOi',
  ClientId: 'lpng0vcp65dbn78bbropo34ss'
}

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASEURL,
  headers: {
    'content-type': 'application/json; charset=utf-8',
    Accept: 'application/json'
  }
})

api.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error: any) => {
    if (
      error?.response?.status === 401 &&
      window.location.pathname !== ROUTES_V2.LOGIN
    ) {
      window.location.reload()
    }
    return Promise.reject(error)
  }
)

const apiV2 = axios.create({
  baseURL: process.env.REACT_APP_API_BASEURL,
  headers: {
    'content-type': 'application/json; charset=utf-8',
    Accept: 'application/json'
  }
})

apiV2.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

apiV2.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error: any) => {
    if (
      error?.response?.status === 401 &&
      window.location.pathname !== ROUTES_V2.LOGIN
    ) {
      window.location.reload()
    }
    return Promise.reject(error)
  }
)
const apiV3 = axios.create({
  baseURL: process.env.REACT_APP_API_BASEURL_V2,
  headers: {
    'content-type': 'application/json; charset=utf-8',
    Accept: 'application/json'
  }
})
apiV3.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

apiV3.interceptors.response.use(
  (response) => {
    return response
  },
  (error: any) => {
    if (
      error?.response?.status === 401 &&
      window.location.pathname !== ROUTES_V2.LOGIN
    ) {
      // window.location.reload()
    }
    return Promise.reject(error)
  }
)

export { apiV2, apiV3 }

export default api
