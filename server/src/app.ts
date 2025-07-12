import { AxiosError } from 'axios'
import fastify from 'fastify'
import { ZodError, z } from 'zod'
import { env } from './env/index.ts'
import { devicesRoutes } from './http/routes/devices.ts'

export const app = fastify()

app.get('/health', () => {
  return 'ok'
})

app.register(devicesRoutes)

app.setErrorHandler((error, _request, reply) => {
    if (env.NODE_ENV !== 'production') {
      // biome-ignore lint: only in development
      console.error(error)
    }
    
    if (error instanceof ZodError) {
      return reply.status(400).send({
        message: 'Validation error.',
        issues: z.treeifyError(error),
      })
    }

    if (error instanceof AxiosError && error.response) {
      return reply.status(error.response.status).send({
        message: error.message,
        ...error.response.data,
      })
    }

    return reply.status(500).send({ message: 'Internal server error.' })
})
