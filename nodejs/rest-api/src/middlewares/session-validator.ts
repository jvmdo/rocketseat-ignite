import { FastifyReply, FastifyRequest } from 'fastify'

export async function sessionValidator(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { method } = request

  if (method === 'GET') {
    const sessionId = request.cookies.sessionId

    if (!sessionId) {
      return reply
        .status(401)
        .send('No active session. Create a transaction then try again')
    }
  }
}
