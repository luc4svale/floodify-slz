import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.url().startsWith('postgresql://'),
  THINGSBOARD_API_BASE_URL: z.url(),
  THINGSBOARD_AUTH_USERNAME: z.email(),
  THINGSBOARD_AUTH_PASSWORD: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  // biome-ignore lint: only in development
  console.error('⚠️ Invalid Environment Variables', _env.error.format)
  throw new Error('⚠️ Invalid Environment Variables')
}

export const env = _env.data
