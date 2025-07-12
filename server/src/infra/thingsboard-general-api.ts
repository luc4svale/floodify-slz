import axios, { type InternalAxiosRequestConfig } from 'axios'
import { env } from '../env/index.ts'
import { getCurrentToken } from '../util/get-current-token.ts'
import { makeThingsBoardRefreshLogin } from '../util/make-thingsboard-refresh-login.ts'

export const thingsBoardGeneralAPI = axios.create({
  baseURL: `${env.THINGSBOARD_API_BASE_URL}`,
  timeout: 5000,
  headers: { Accept: 'application/json' },
})

thingsBoardGeneralAPI.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await getCurrentToken()

    if (config.headers && token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  }
)

thingsBoardGeneralAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      const { token } = await makeThingsBoardRefreshLogin()

      originalRequest.headers.Authorization = `Bearer ${token}`
      return thingsBoardGeneralAPI(originalRequest)
    }

    return Promise.reject(error)
  }
)
