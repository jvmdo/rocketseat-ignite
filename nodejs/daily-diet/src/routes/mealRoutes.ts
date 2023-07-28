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

const mealParamsSchema = z.object({
  mealId: z.string().uuid(),
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

  app.get('/:mealId', async (request, reply) => {
    let params

    try {
      params = mealParamsSchema.parse(request.params)
    } catch (error) {
      return reply.status(404).send((error as ZodError).message)
    }

    const { mealId } = params

    let meal

    try {
      meal = await knex('meals')
        .where({
          id: mealId,
          user_id: userId,
        })
        .select('*')
        .first()
    } catch (error) {
      return reply.status(500).send(error)
    }

    if (!meal) {
      return reply.status(404).send({ message: 'No meal found' })
    }

    return reply.send({ meal })
  })

  app.get('/total', async (request, reply) => {
    let totalMeals

    try {
      totalMeals = await knex('meals')
        .where({ user_id: userId })
        .count('id as totalMeals')
        .first()
    } catch (error) {
      return reply.status(500).send(error)
    }

    return reply.send(totalMeals)
  })

  app.put('/:mealId', async (request, reply) => {
    let params

    try {
      params = mealParamsSchema.parse(request.params)
    } catch (error) {
      return reply.status(404).send((error as ZodError).message)
    }

    const { mealId } = params

    let mealExists

    try {
      mealExists = await knex('meals')
        .where({
          id: mealId,
          user_id: userId,
        })
        .first()
    } catch (error) {
      return reply.status(500).send(error)
    }

    if (!mealExists) {
      return reply.status(404).send({ message: 'No meal found' })
    }

    let mealBody

    try {
      mealBody = mealBodySchema.parse(request.body)
    } catch (error) {
      return reply.status(400).send((error as ZodError).message)
    }

    const { name, description, diet, datetime } = mealBody

    try {
      await knex('meals')
        .update({
          name,
          description,
          diet,
          created_at: datetime.toISOString(),
        })
        .where({
          id: mealId,
          user_id: userId,
        })
    } catch (error) {
      return reply.status(500).send(error)
    }

    return reply.status(201).send({ message: 'Meal updated successfully.' })
  })

  app.delete('/:mealId', async (request, reply) => {
    let params

    try {
      params = mealParamsSchema.parse(request.params)
    } catch (error) {
      return reply.status(404).send((error as ZodError).message)
    }

    const { mealId } = params

    let mealExists

    try {
      mealExists = await knex('meals')
        .where({
          id: mealId,
          user_id: userId,
        })
        .first()
    } catch (error) {
      return reply.status(500).send(error)
    }

    if (!mealExists) {
      return reply.status(404).send({ message: 'No meal found' })
    }

    try {
      await knex('meals').del().where({
        id: mealId,
        user_id: userId,
      })
    } catch (error) {
      return reply.status(500).send(error)
    }

    return reply.status(204).send()
  })
}
