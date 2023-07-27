import Fastify from 'fastify'
import { knex } from './database'

const app = Fastify({
  logger: true,
})

app.get('/', async (request, reply) => {
  const users = await knex.select('*').from('users')
  return reply.status(200).send({ message: `Hello, ${request.ip}`, users })
})

const startServer = async () => {
  try {
    await app.listen({ port: 3000 })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

startServer()
