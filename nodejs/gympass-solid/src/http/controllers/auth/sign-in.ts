import { UsersRepository } from '@/repository/prisma/users'
import { SignInUseCase } from '@/usecases/auth/sign-in'
import { InvalidCredentialsError } from '@/usecases/errors/invalid-credentials'
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
  const usersRepository = new UsersRepository()
  const signInUseCase = new SignInUseCase(usersRepository)

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
