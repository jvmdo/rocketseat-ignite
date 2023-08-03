import fastify from 'fastify'
import { env } from '@/env'
import { authRoutes } from './http/routes/auth'
import { ZodError } from 'zod'

export const app = fastify({
  logger: env.NODE_ENV === 'dev',
})

app.register(authRoutes)
app.setErrorHandler((error, _, reply) => {
  app.log.error(error)

  if (error instanceof ZodError) {
    return reply.status(400).send({ message: error.format() })
  }

  return reply.send(error)
})
