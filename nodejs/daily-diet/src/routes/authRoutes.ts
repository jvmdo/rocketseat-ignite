import { FastifyInstance } from 'fastify'
import { ZodError, z } from 'zod'
import { knex } from '../database'

const signUpBodySchema = z.object({
  name: z.string(),
  username: z.string(),
  password: z.string(),
})

const signInBodySchema = z.object({
  username: z.string(),
  password: z.string(),
})

export async function authRoutes(app: FastifyInstance) {
  app.post('/sign-up', async (request, reply) => {
    let signUpBody

    try {
      signUpBody = signUpBodySchema.parse(request.body)
    } catch (error) {
      return reply.status(400).send((error as ZodError).message)
    }

    const { name, username, password } = signUpBody

    let user

    try {
      user = await knex('users').where({ username }).first()
    } catch (error) {
      return reply.status(500).send(error)
    }

    if (user) {
      return reply.status(409).send({
        message: 'Username already exists. Please choose a different username.',
      })
    }

    try {
      await knex('users').insert({
        name,
        username,
        password,
      })
    } catch (error) {
      return reply.status(500).send(error)
    }

    return reply.status(201).send({ message: 'New user created successfully.' })
  })

  app.post('/sign-in', async (request, reply) => {
    let signInBody

    try {
      signInBody = signInBodySchema.parse(request.body)
    } catch (error) {
      return reply.status(400).send((error as ZodError).message)
    }

    const { username, password } = signInBody

    let user

    try {
      user = await knex('users').where({ username }).first()
    } catch (error) {
      return reply.status(500).send(error)
    }

    if (!user || user.password !== password) {
      return reply.status(401).send({
        message:
          'Invalid credentials. Please check your username and password.',
      })
    }

    const token = app.jwt.sign({ id: user.id }, { expiresIn: '2h' })

    return reply.send({ message: 'You are signed in.', token })
  })
}
