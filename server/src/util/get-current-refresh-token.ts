import { prisma } from '../libs/prisma.ts'

export async function getCurrentRefreshToken(): Promise<string> {
  const thingsBoardAuth = await prisma.thingsBoardAuth.findFirst()

  return thingsBoardAuth ? thingsBoardAuth.refreshToken : ''
}
