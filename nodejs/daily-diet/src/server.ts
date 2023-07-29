import Fastify from 'fastify'
import { env } from './env'
import { authRoutes } from './routes/authRoutes'
import jwt from '@fastify/jwt'
import { mealRoutes } from './routes/mealRoutes'
import auth from '@fastify/auth'
import { authorize } from './middlewares/authorize'

const app = Fastify({
  logger: true,
})

app.decorate('authorize', authorize)

app.register(jwt, { secret: env.JWT_SECRET })
app.register(auth)
app.register(authRoutes)
app.register(mealRoutes, { prefix: '/meals' })

const startServer = async () => {
  try {
    await app.listen({ port: env.PORT })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

startServer()
