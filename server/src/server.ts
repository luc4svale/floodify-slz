import { app } from './app.ts'
import { env } from './env/index.ts'

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    // biome-ignore lint: only in development
    console.log('🚀 Http server running')
  })
