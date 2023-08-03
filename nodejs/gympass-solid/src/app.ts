import fastify from 'fastify'
import { env } from '@/env'
import { PrismaClient } from '@prisma/client'

export const app = fastify({
  logger: env.NODE_ENV === 'dev',
})

app.get('/', async (request, reply) => {
  const prisma = new PrismaClient({
    log: env.NODE_ENV === 'dev' ? ['query'] : [],
  })

  const user = await prisma.user.create({
    data: {
      name: 'Jane Doe',
      email: 'jane_dona@example.com',
      passwordHash: 'jane123',
    },
  })

  return reply.send({ message: `Hello, ${user.name}!` })
})
