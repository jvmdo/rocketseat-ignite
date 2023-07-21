import Fastify from 'fastify'
import { knex } from './database.js'

const app = Fastify({ logger: true })

app.get('/', async (request, reply) => {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 300 + 200))

  const tables = await knex.select('*').from('sqlite_master')

  // reply.send({ message: `Hello, ${request.hostname} at IP ${request.ip}` })
  return { message: `Hello, ${request.hostname} at IP ${request.ip}`, tables }
})

try {
  await app.listen({ port: 3333 })
} catch (err) {
  app.log.error(err)
  process.exit(1)
}
