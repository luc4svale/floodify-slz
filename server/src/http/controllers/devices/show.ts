import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { prisma } from '../../../libs/prisma.ts'

export async function show(request: FastifyRequest, reply: FastifyReply) {
  const showDeviceParamsSchema = z.object({
    id: z.uuid(),
  })

  const { id } = showDeviceParamsSchema.parse(request.params)

  const device = await prisma.device.findUnique({
    where: { id },
  })

  return reply.status(200).send({ device })
}
