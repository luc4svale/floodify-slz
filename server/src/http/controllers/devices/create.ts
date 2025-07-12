import type { FastifyReply, FastifyRequest } from 'fastify'
import { customAlphabet, nanoid } from 'nanoid'
import z from 'zod'
import { thingsBoardGeneralAPI } from '../../../infra/thingsboard-general-api.ts'
import { prisma } from '../../../libs/prisma.ts'

interface createThingsBoardDeviceResponseBody {
  id: {
    entityType: string
    id: string
  }
}

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createDeviceBodySchema = z.object({
    label: z.string().min(3).max(50),
    latitude: z.coerce.number().min(-90).max(90),
    longitude: z.coerce.number().min(-180).max(180),
  })

  const { label, latitude, longitude } = createDeviceBodySchema.parse(
    request.body
  )

  const name = customAlphabet('0123456789ABCDEF', 12)()
  const thingsBoardAccessToken = nanoid(20)

  const createThingsBoardDeviceResponse =
    await thingsBoardGeneralAPI.post<createThingsBoardDeviceResponseBody>(
      `/device?accessToken=${thingsBoardAccessToken}`,
      {
        name,
        label,
        type: 'Water sensor',
      }
    )

  const thingsBoardId = createThingsBoardDeviceResponse.data.id.id

  await prisma.device.create({
    data: {
      name,
      label,
      thingsBoardId,
      thingsBoardAccessToken,
      latitude,
      longitude,
    },
  })

  return reply.status(201).send()
}
