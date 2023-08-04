import { InvalidCredentialsError } from '@/usecases/errors/invalid-credentials'
import { makeSignIn } from '@/usecases/factories/make-sign-in'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const signInBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export async function signInController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const signInUseCase = makeSignIn()

  const { email, password } = signInBodySchema.parse(request.body)

  try {
    await signInUseCase.execute({ email, password })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(err.code).send({ message: err.message })
    }

    throw err
  }

  return reply.status(200).send({ message: `You are now signed in.` })
}
