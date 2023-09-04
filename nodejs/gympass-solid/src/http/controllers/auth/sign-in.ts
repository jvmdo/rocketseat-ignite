import { InvalidCredentialsError } from '@/usecases/errors/invalid-credentials'
import { makeSignInUseCase } from '@/usecases/factories/make-sign-in'
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
  const signInUseCase = makeSignInUseCase()

  const { email, password } = signInBodySchema.parse(request.body)

  let token

  try {
    const { id: userId } = await signInUseCase.execute({ email, password })

    token = await reply.jwtSign({}, { sign: { sub: userId } })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(err.statusCode).send(err)
    }

    throw err
  }

  return reply.status(200).send({ message: `You are now signed in.`, token })
}
