import { FastifyInstance } from 'fastify'
import { ZodError, z } from 'zod'
import { knex } from '../database'

const userId = '4e4752b5-4683-455a-99f0-a59f2db37206'

const mealBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  datetime: z.coerce.date(),
  diet: z.boolean(),
})

export async function mealRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    let mealBody

    try {
      mealBody = mealBodySchema.parse(request.body)
    } catch (error) {
      return reply.status(400).send((error as ZodError).message)
    }

    const { name, description, datetime, diet } = mealBody

    try {
      await knex('meals').insert({
        name,
        description,
        diet,
        created_at: datetime.toISOString(),
        user_id: userId,
      })
    } catch (error) {
      return reply.status(500).send(error)
    }

    return reply.status(201).send({ message: 'New meal added.' })
  })

  app.get('/', async (request, reply) => {
    let meals

    try {
      meals = await knex('meals').where({ user_id: userId }).select('*')
    } catch (error) {
      return reply.status(500).send(error)
    }

    return reply.send({ meals })
  })
}
