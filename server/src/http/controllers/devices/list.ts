import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { prisma } from '../../../libs/prisma.ts'

export async function list(request: FastifyRequest, reply: FastifyReply) {
  const listDevicesQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = listDevicesQuerySchema.parse(request.query)

  const devices = await prisma.device.findMany({
    take: 20,
    skip: (page - 1) * 20,
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
  })

  return reply.status(200).send({ devices })
}
