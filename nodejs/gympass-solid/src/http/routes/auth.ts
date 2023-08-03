import { FastifyInstance } from 'fastify'
import { signUpController } from '../controllers/auth/sign-up'

export async function authRoutes(app: FastifyInstance) {
  app.post('/sign-up', signUpController)
}
