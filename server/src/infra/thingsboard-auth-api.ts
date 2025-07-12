import axios from 'axios'
import { env } from '../env/index.ts'

export const thingsBoardAuthAPI = axios.create({
  baseURL: `${env.THINGSBOARD_API_BASE_URL}/auth`,
  timeout: 5000,
  headers: { Accept: 'application/json' },
})
