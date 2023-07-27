import Fastify from 'fastify'
import { knex } from './database'
import { env } from './env'

const app = Fastify({
  logger: true,
})

app.get('/', async (request, reply) => {
  await knex
    .insert({
      name: 'John Doe',
      username: 'john_doe',
      password: 'john123',
    })
    .into('users')
  const users = await knex.select('*').from('users')
  return reply.status(200).send({ message: `Hello, ${request.ip}`, users })
})

const startServer = async () => {
  try {
    await app.listen({ port: env.PORT })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

startServer()
