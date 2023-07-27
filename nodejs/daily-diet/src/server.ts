import Fastify from 'fastify'
import { env } from './env'
import { authRoutes } from './routes/authRoutes'
import jwt from '@fastify/jwt'

const app = Fastify({
  logger: true,
})

app.register(jwt, { secret: env.JWT_SECRET })
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
