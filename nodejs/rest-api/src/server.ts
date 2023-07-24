import Fastify from 'fastify'
import { env } from './env/index.js'
import transactionsRoutes from './routes/transactions.js'
import cookie from '@fastify/cookie'
import type { FastifyCookieOptions } from '@fastify/cookie'
import { sessionValidator } from './middlewares/session-validator.js'

const app = Fastify({ logger: true })

app.register(cookie, {
  parseOptions: {
    path: '/',
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    secure: 'auto',
  },
} as FastifyCookieOptions)

app.addHook('preHandler', sessionValidator)

app.register(transactionsRoutes, {
  prefix: '/transactions',
})

try {
  await app.listen({ port: env.PORT })
} catch (err) {
  app.log.error(err)
  process.exit(1)
}
