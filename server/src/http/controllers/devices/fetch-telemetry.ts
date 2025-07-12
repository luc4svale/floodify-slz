import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { thingsBoardGeneralAPI } from '../../../infra/thingsboard-general-api.ts'

type FetchThingsBoardDeviceTelemetryResponseBody = {
  water_level: [
    {
      ts: number
      value: number
    },
  ]
}[]

export async function fetchTelemetry(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const fetchDeviceTelemetryParamsSchema = z.object({
    id: z.uuid(),
  })

  const fetchDeviceTelemetryQuerySchema = z.object({
    startTs: z.coerce
      .date()
      .default(new Date('2025-01-01T00:00:00Z'))
      .transform((date) => date.getTime()),
    endTs: z.coerce
      .date()
      .default(new Date())
      .transform((date) => date.getTime()),
    limit: z.coerce.number().default(0),
  })

  const { id } = fetchDeviceTelemetryParamsSchema.parse(request.params)
  const { startTs, endTs, limit } = fetchDeviceTelemetryQuerySchema.parse(
    request.query
  )

  const params = {
    keys: 'water_level',
    startTs,
    endTs,
    limit: limit ? limit : undefined,
    useStrictDataTypes: true,
  }

  const fetchThingsBoardDeviceTelemetryResponse =
    await thingsBoardGeneralAPI.get<FetchThingsBoardDeviceTelemetryResponseBody>(
      `/plugins/telemetry/DEVICE/${id}/values/timeseries`,
      {
        params,
      }
    )

  return reply
    .status(200)
    .send({ telemetry: fetchThingsBoardDeviceTelemetryResponse.data })
}
