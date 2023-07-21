import Fastify from 'fastify'
import { knex } from './database.js'
import { env } from './env/index.js'
import { randomUUID } from 'crypto'

const app = Fastify({ logger: true })

app.get('/', async (request) => {
  const tables = await knex.select('*').from('transactions')

  return { message: `Hello, ${request.hostname} at IP ${request.ip}`, tables }
})

try {
  await app.listen({ port: env.PORT })
} catch (err) {
  app.log.error(err)
  process.exit(1)
}
