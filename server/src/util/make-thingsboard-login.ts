import { env } from '../env/index.ts'
import { thingsBoardAuthAPI } from '../infra/thingsboard-auth-api.ts'

interface ThingsBoardAuthResponse {
  token: string
  refreshToken: string
}

export async function makeThingsBoardLogin(): Promise<ThingsBoardAuthResponse> {
  const loginResponse = await thingsBoardAuthAPI.post<ThingsBoardAuthResponse>(
    '/login',
    {
      username: env.THINGSBOARD_AUTH_USERNAME,
      password: env.THINGSBOARD_AUTH_PASSWORD,
    }
  )

  return loginResponse.data
}
