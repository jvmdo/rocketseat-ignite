import Fastify from 'fastify'
import { env } from './env'
import { authRoutes } from './routes/authRoutes'
import jwt from '@fastify/jwt'
import { mealRoutes } from './routes/mealRoutes'
import auth from '@fastify/auth'
import { authorize } from './middlewares/authorize'

export const app = Fastify({
  logger: true,
})

app.decorate('authorize', authorize)

app.register(jwt, { secret: env.JWT_SECRET })
app.register(auth)
app.register(authRoutes)
app.register(mealRoutes, { prefix: '/meals' })
