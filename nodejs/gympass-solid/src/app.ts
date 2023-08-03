import fastify from 'fastify'
import { env } from '@/env'

export const app = fastify({
  logger: env.NODE_ENV === 'dev',
})

app.get('/', async (request, reply) => {
  return reply.send({ message: `Hello, ${request.ip}!` })
})
