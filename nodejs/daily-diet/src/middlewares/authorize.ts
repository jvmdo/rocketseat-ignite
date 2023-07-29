import { FastifyReply, FastifyRequest } from 'fastify'

export async function authorize(request: FastifyRequest, reply: FastifyReply) {
  try {
    return await request.jwtVerify()
  } catch (err) {
    return reply.status(401).send(err)
  }
}
