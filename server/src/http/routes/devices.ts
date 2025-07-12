import type { FastifyInstance } from 'fastify'
import { create } from '../controllers/devices/create.ts'
import { fetchTelemetry } from '../controllers/devices/fetch-telemetry.ts'
import { getLatestTelemetry } from '../controllers/devices/get-latest-telemetry.ts'
import { list } from '../controllers/devices/list.ts'
import { show } from '../controllers/devices/show.ts'

export function devicesRoutes(app: FastifyInstance) {
  app.post('/devices', create)
  app.get('/devices', list)
  app.get('/devices/:id/telemetry/latest', getLatestTelemetry)
  app.get('/devices/:id/telemetry', fetchTelemetry)
  app.get('/devices/:id', show)
}
