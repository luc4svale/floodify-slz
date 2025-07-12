import { thingsBoardAuthAPI } from '../infra/thingsboard-auth-api.ts'

interface ThingsBoardAuthResponse {
  token: string
  refreshToken: string
}

export async function makeThingsBoardRefreshLogin(
  refreshToken: string
): Promise<ThingsBoardAuthResponse> {
  const refreshLoginResponse =
    await thingsBoardAuthAPI.post<ThingsBoardAuthResponse>('/token', {
      refreshToken,
    })

  return refreshLoginResponse.data
}
