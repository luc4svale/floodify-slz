import { thingsBoardAuthAPI } from '../infra/thingsboard-auth-api.ts'
import { prisma } from '../libs/prisma.ts'
import { getCurrentRefreshToken } from './get-current-refresh-token.ts'
import { makeThingsBoardLogin } from './make-thingsboard-login.ts'

interface ThingsBoardAuthResponse {
  token: string
  refreshToken: string
}

export async function makeThingsBoardRefreshLogin(): Promise<ThingsBoardAuthResponse> {
  let token = ''
  let refreshToken = ''

  try {
    const currentRefreshToken = await getCurrentRefreshToken()

    const refreshLoginResponse =
      await thingsBoardAuthAPI.post<ThingsBoardAuthResponse>('/token', {
        refreshToken: currentRefreshToken,
      })

    token = refreshLoginResponse.data.token
    refreshToken = refreshLoginResponse.data.refreshToken
  } catch (_err) {
    const loginResponse = await makeThingsBoardLogin()
    token = loginResponse.token
    refreshToken = loginResponse.refreshToken
  }

  await prisma.thingsBoardAuth.create({
    data: {
      token,
      refreshToken,
    },
  })

  return { token, refreshToken }
}
