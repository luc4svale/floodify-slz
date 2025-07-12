import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { thingsBoardGeneralAPI } from '../../../infra/thingsboard-general-api.ts'

interface GetLatestThingsBoardDeviceTelemetryResponseBody {
  water_level: [
    {
      ts: number
      value: number
    },
  ]
}

export async function getLatestTelemetry(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getLatestDeviceTelemetryParamsSchema = z.object({
    id: z.uuid(),
  })

  const { id } = getLatestDeviceTelemetryParamsSchema.parse(request.params)

  const getLatestThingsBoardDeviceTelemetryResponse =
    await thingsBoardGeneralAPI.get<GetLatestThingsBoardDeviceTelemetryResponseBody>(
      `/plugins/telemetry/DEVICE/${id}/values/timeseries`,
      {
        params: {
          keys: 'water_level',
          useStrictDataTypes: true,
        },
      }
    )

  const waterLevel =
    getLatestThingsBoardDeviceTelemetryResponse.data.water_level[0].value

  const date = new Date(
    getLatestThingsBoardDeviceTelemetryResponse.data.water_level[0].ts
  ).toISOString()

  return reply.status(200).send({ latestTelemetry: { waterLevel, date } })
}
