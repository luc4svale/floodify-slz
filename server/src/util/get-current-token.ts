import { prisma } from '../libs/prisma.ts'

export async function getCurrentToken(): Promise<string> {
  const thingsBoardAuth = await prisma.thingsBoardAuth.findFirst()

  return thingsBoardAuth ? thingsBoardAuth.token : ''
}
