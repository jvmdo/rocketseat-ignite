import { FastifyInstance } from 'fastify'
import { signUpController } from '../controllers/auth/sign-up'
import { signInController } from '../controllers/auth/sign-in'

export async function authRoutes(app: FastifyInstance) {
  app.post('/sign-up', signUpController)
  app.post('/sign-in', signInController)
}
