import Fastify from 'fastify'
import jwt from '@fastify/jwt/jwt.js'
import auth from '@fastify/auth'
import { env } from './env/index.js'
import { authRoutes } from './routes/authRoutes.js'
import { mealRoutes } from './routes/mealRoutes.js'
import { authorize } from './middlewares/authorize.js'

export const app = Fastify({
  logger: true,
})

app.decorate('authorize', authorize)

app.register(jwt, { secret: env.JWT_SECRET })
app.register(auth)
app.register(authRoutes)
app.register(mealRoutes, { prefix: '/meals' })
