import Fastify from 'fastify'
import { env } from './env/index.js'
import transactionsRoutes from './routes/transactions.js'

const app = Fastify({ logger: true })

app.register(transactionsRoutes, {
  prefix: '/transactions',
})

try {
  await app.listen({ port: env.PORT })
} catch (err) {
  app.log.error(err)
  process.exit(1)
}
