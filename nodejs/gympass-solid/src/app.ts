import fastify from 'fastify'
import { env } from '@/env'
import { ZodError } from 'zod'
import jwt from '@fastify/jwt'
import { appRoutes } from './http/routes'

export const app = fastify({
  logger: env.NODE_ENV === 'dev',
})

app.register(jwt, { secret: env.JWT_SECRET })
app.register(appRoutes)
app.setErrorHandler((error, _, reply) => {
  app.log.error(error)

  if (error instanceof ZodError) {
    return reply.status(400).send({ message: error.format() })
  }

  return reply.send(error)
})
