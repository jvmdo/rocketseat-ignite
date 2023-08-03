import { UsersRepository } from '@/repository/prisma/users'
import { SignUpUseCase } from '@/usecases/auth/sign-up'
import { UserAlreadyExistsError } from '@/usecases/errors/user-already-exists'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const signUpBodySchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
})

export async function signUpController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const usersRepository = new UsersRepository()
  const signUpUseCase = new SignUpUseCase(usersRepository)

  const { name, email, password } = signUpBodySchema.parse(request.body)

  try {
    await signUpUseCase.execute({ name, email, password })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(err.code).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send({ message: `You can now sign in, ${name}` })
}
