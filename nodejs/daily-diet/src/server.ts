import Fastify from 'fastify'
import { env } from './env'
import { authRoutes } from './routes/authRoutes'

const app = Fastify({
  logger: true,
})

app.register(authRoutes)

const startServer = async () => {
  try {
    await app.listen({ port: env.PORT })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

startServer()
