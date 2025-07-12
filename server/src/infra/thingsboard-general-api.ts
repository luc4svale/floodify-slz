import axios, { type InternalAxiosRequestConfig } from 'axios'
import { env } from '../env/index.ts'
import { getTinghsBoardAccessToken } from '../util/get-thingsboard-access-token.ts'

export const thingsBoardGeneralAPI = axios.create({
  baseURL: `${env.THINGSBOARD_API_BASE_URL}`,
  timeout: 5000,
  headers: { Accept: 'application/json' },
})

thingsBoardGeneralAPI.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const { token } = await getTinghsBoardAccessToken()

    if (config.headers && token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  }
)
