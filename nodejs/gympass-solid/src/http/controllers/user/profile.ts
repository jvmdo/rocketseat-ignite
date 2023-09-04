import { makeGetUserProfileUseCase } from '@/usecases/factories/make-get-user-profile'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profileController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUserProfile = makeGetUserProfileUseCase()
  const user = await getUserProfile.execute({ userId: request.user.sub })

  Reflect.deleteProperty(user, 'passwordHash')

  return reply.status(200).send({ user })
}
