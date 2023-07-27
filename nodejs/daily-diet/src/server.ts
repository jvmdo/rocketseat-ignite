import Fastify from 'fastify'
import { knex } from './database'

const app = Fastify({
  logger: true,
})

app.get('/', async (request, reply) => {
  const tables = await knex.select('*').from('sqlite_schema')
  return reply.status(200).send({ message: `Hello, ${request.ip}`, tables })
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
