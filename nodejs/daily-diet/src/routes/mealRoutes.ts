import { FastifyInstance } from 'fastify'
import { ZodError, z } from 'zod'
import { knex } from '../database'
import { longestDietSequence } from '../utils/longest-diet-sequence'
import { MealError } from '../utils/meal-errors'

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
  // @ts-expect-error: Fastify do not provide TypeScript for decorators
  app.addHook('preHandler', app.auth([app.authorize]))

  app.setErrorHandler(async (error, _, reply) => {
    return reply.status(error.statusCode ?? 500).send(error)
  })

  app.post('/', async (request, reply) => {
    const userId = request.user.id
    const { name, description, datetime, diet } = extractBody(request.body)

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
    const userId = request.user.id

    let meals

    try {
      meals = await knex('meals').where({ user_id: userId }).select('*')
    } catch (error) {
      return reply.status(500).send(error)
    }

    return reply.send({ meals })
  })

  app.get('/:mealId', async (request, reply) => {
    const userId = request.user.id
    const { mealId } = extractParams(request.params)

    const meal = await findMealByIdOrThrow(mealId, userId)

    return reply.send({ meal })
  })

  app.get('/total', async (request, reply) => {
    const userId = request.user.id

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

  app.get('/diet', async (request, reply) => {
    const userId = request.user.id

    let totalInDiet

    try {
      totalInDiet = await knex('meals')
        .where({ user_id: userId, diet: true })
        .count('diet as totalInDiet')
        .first()
    } catch (error) {
      return reply.status(500).send(error)
    }

    return reply.send(totalInDiet)
  })

  app.get('/non-diet', async (request, reply) => {
    const userId = request.user.id

    let totalNonDiet

    try {
      totalNonDiet = await knex('meals')
        .where({ user_id: userId, diet: false })
        .count('diet as totalNonDiet')
        .first()
    } catch (error) {
      return reply.status(500).send(error)
    }

    return reply.send(totalNonDiet)
  })

  app.get('/sequence', async (request, reply) => {
    const userId = request.user.id

    let dietArray

    try {
      dietArray = await knex('meals')
        .where({ user_id: userId })
        .select('diet', 'created_at')
    } catch (error) {
      return reply.status(500).send(error)
    }

    const sequence = longestDietSequence(dietArray)

    return reply.send(sequence)
  })

  app.put('/:mealId', async (request, reply) => {
    const userId = request.user.id
    const { mealId } = extractParams(request.params)

    await findMealByIdOrThrow(mealId, userId)

    const { name, description, diet, datetime } = extractBody(request.body)

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
    const userId = request.user.id
    const { mealId } = extractParams(request.params)

    await findMealByIdOrThrow(mealId, userId)

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

async function findMealByIdOrThrow(mealId: string, userId: string) {
  const meal = await knex('meals')
    .select('*')
    .where({
      id: mealId,
      user_id: userId,
    })
    .first()

  if (!meal) {
    throw new MealError('No meal found', 404)
  }

  return meal
}

function extractBody(body: unknown) {
  try {
    return mealBodySchema.parse(body)
  } catch (error) {
    throw new MealError((error as ZodError).message, 400)
  }
}

function extractParams(params: unknown) {
  try {
    return mealParamsSchema.parse(params)
  } catch (error) {
    throw new MealError((error as ZodError).message, 400)
  }
}
