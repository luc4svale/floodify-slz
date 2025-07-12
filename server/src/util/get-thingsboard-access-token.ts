import { prisma } from '../libs/prisma.ts'
import { makeThingsBoardLogin } from './make-thingsboard-login.ts'
import { makeThingsBoardRefreshLogin } from './make-thingsboard-refresh-login.ts'

interface getThingsBoardAccessTokenOutput {
  token: string
}

export async function getTinghsBoardAccessToken(): Promise<getThingsBoardAccessTokenOutput> {
  let token = ''
  let refreshToken = ''

  const thingsBoardAuth = await prisma.thingsBoardAuth.findFirst()

  if (thingsBoardAuth) {
    try {
      const refreshLoginResponse = await makeThingsBoardRefreshLogin(
        thingsBoardAuth.refreshToken
      )

      token = refreshLoginResponse.token
      refreshToken = refreshLoginResponse.refreshToken
    } catch (_err) {
      const loginResponse = await makeThingsBoardLogin()

      token = loginResponse.token
      refreshToken = loginResponse.refreshToken
    }

    await prisma.thingsBoardAuth.update({
      where: {
        id: thingsBoardAuth.id,
      },
      data: {
        token,
        refreshToken,
      },
    })
  } else {
    const loginResponse = await makeThingsBoardLogin()
    token = loginResponse.token
    refreshToken = loginResponse.refreshToken

    await prisma.thingsBoardAuth.create({
      data: {
        token,
        refreshToken,
      },
    })
  }

  return { token }
}
