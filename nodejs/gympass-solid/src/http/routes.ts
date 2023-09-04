import { FastifyInstance } from 'fastify'
import { signInController } from './controllers/auth/sign-in'
import { signUpController } from './controllers/auth/sign-up'
import { profileController } from './controllers/user/profile'
import { verifyJwt } from './middlewares/verify-jwt'

export async function appRoutes(app: FastifyInstance) {
  app.post('/sign-in', signInController)
  app.post('/sign-up', signUpController)

  app.get('/me', { onRequest: verifyJwt }, profileController)
}
