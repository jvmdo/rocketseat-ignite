import { execSync } from 'child_process'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { app } from '../app'
import request from 'supertest'
import { faker } from '@faker-js/faker'
import { longestDietSequence } from '../utils/longest-diet-sequence'

describe('Meals CRUD endpoints', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    execSync('npm run knex -- migrate:rollback --all')
    execSync('npm run knex -- migrate:latest')
  })

  describe('POST /meals', () => {
    it('should deny unauthorized requests', async () => {
      const [meal] = newMeal()

      await request(app.server).post('/meals').send(meal).expect(401)
    })

    it('should register a new meal', async () => {
      const token = await authenticate()
      const [meal] = newMeal()

      await request(app.server)
        .post('/meals')
        .auth(token, { type: 'bearer' })
        .send(meal)
        .expect(201)
    })

    it('should reject bad formatted meal', async () => {
      const token = await authenticate()
      const [meal] = newMeal()

      await request(app.server)
        .post('/meals')
        .auth(token, { type: 'bearer' })
        .send({
          ...meal,
          datetime: '30/07/2023 20h47', // incorrect date format
        })
        .expect(400)
    })
  })

  describe('GET /meals', async () => {
    it('should deny unauthorized requests', async () => {
      await request(app.server).get('/meals').expect(401)
    })

    it('should retrieve all meals of an user', async () => {
      const token = await authenticate()
      const mealsQuantity = 5
      const meals = newMeal(mealsQuantity)

      meals.forEach(async (meal) => {
        await request(app.server)
          .post('/meals')
          .auth(token, { type: 'bearer' })
          .send(meal)
      })

      const response = await request(app.server)
        .get('/meals')
        .auth(token, { type: 'bearer' })
        .expect(200)

      expect(response.body.meals.length).toBe(mealsQuantity)
    })
  })

  describe('GET /meals/:mealId', () => {
    it('should retrieve one meal record by its ID', async () => {
      const token = await authenticate()
      const [meal] = newMeal()

      await request(app.server)
        .post('/meals')
        .auth(token, { type: 'bearer' })
        .send(meal)

      const response = await request(app.server)
        .get('/meals')
        .auth(token, { type: 'bearer' })

      const mealId = response.body.meals[0].id

      const record = await request(app.server)
        .get(`/meals/${mealId}`)
        .auth(token, { type: 'bearer' })
        .expect(200)

      expect(record.body.meal).toEqual(
        expect.objectContaining({
          id: mealId,
        }),
      )
    })

    it('should not retrieve records by non-existent ID', async () => {
      const token = await authenticate()
      const [meal] = newMeal()

      await request(app.server)
        .post('/meals')
        .auth(token, { type: 'bearer' })
        .send(meal)

      const mealId = faker.string.uuid() // non-existent ID

      await request(app.server)
        .get(`/meals/${mealId}`)
        .auth(token, { type: 'bearer' })
        .expect(404)
    })

    it('should reject bad formatted UUID', async () => {
      const token = await authenticate()
      const [meal] = newMeal()

      await request(app.server)
        .post('/meals')
        .auth(token, { type: 'bearer' })
        .send(meal)

      const mealId = faker.string.uuid() + 'wrong!'

      await request(app.server)
        .get(`/meals/${mealId}`)
        .auth(token, { type: 'bearer' })
        .expect(400)
    })
  })

  describe('GET /meals/total', () => {
    it('should retrieve the total number of meals of an user', async () => {
      const token = await authenticate()
      const mealsQuantity = 5
      const meals = newMeal(mealsQuantity)

      meals.forEach(async (meal) => {
        await request(app.server)
          .post('/meals')
          .auth(token, { type: 'bearer' })
          .send(meal)
      })

      const response = await request(app.server)
        .get('/meals/total')
        .auth(token, { type: 'bearer' })
        .expect(200)

      expect(response.body.totalMeals).toBe(mealsQuantity)
    })
  })

  describe('GET /meals/diet', () => {
    it('should retrieve the total number of diet meals of an user', async () => {
      const token = await authenticate()
      const mealsQuantity = 10
      const meals = newMeal(mealsQuantity)
      const dietMeals = meals.filter((meal) => meal.diet)

      meals.forEach(async (meal) => {
        await request(app.server)
          .post('/meals')
          .auth(token, { type: 'bearer' })
          .send(meal)
      })

      const response = await request(app.server)
        .get('/meals/diet')
        .auth(token, { type: 'bearer' })
        .expect(200)

      expect(response.body.totalInDiet).toBe(dietMeals.length)
    })
  })

  describe('GET /meals/non-diet', () => {
    it('should retrieve the total number of non-diet meals of an user', async () => {
      const token = await authenticate()
      const mealsQuantity = 10
      const meals = newMeal(mealsQuantity)
      const nonDietMeals = meals.filter((meal) => !meal.diet)

      meals.forEach(async (meal) => {
        await request(app.server)
          .post('/meals')
          .auth(token, { type: 'bearer' })
          .send(meal)
      })

      const response = await request(app.server)
        .get('/meals/non-diet')
        .auth(token, { type: 'bearer' })
        .expect(200)

      expect(response.body.totalNonDiet).toBe(nonDietMeals.length)
    })
  })

  describe('GET /meals/sequence', () => {
    it(
      'should retrieve the longest diet sequence of an user',
      async () => {
        const token = await authenticate()
        const mealsQuantity = 20
        const meals = newMeal(mealsQuantity)
        const longest = longestDietSequence(
          meals.map(({ diet, datetime }) => ({
            diet,
            created_at: datetime.toISOString(),
          })),
        )

        meals.forEach(async (meal) => {
          await request(app.server)
            .post('/meals')
            .auth(token, { type: 'bearer' })
            .send(meal)
        })

        const response = await request(app.server)
          .get('/meals/sequence')
          .auth(token, { type: 'bearer' })
          .expect(200)

        expect(response.body.sequence).toBe(longest.sequence)
      },
      { timeout: 10000 },
    )
  })

  describe('PUT /meals/:mealId', () => {
    it('should deny unauthorized requests', async () => {
      const mealId = faker.string.uuid()
      const [updatedMeal] = newMeal()

      await request(app.server)
        .put(`/meals/${mealId}`)
        .send(updatedMeal)
        .expect(401)
    })

    it('should deny bad formatted UUID', async () => {
      const token = await authenticate()
      const [updatedMeal] = newMeal()
      const mealId = 'bad-formatted-uuid'

      await request(app.server)
        .put(`/meals/${mealId}`)
        .auth(token, { type: 'bearer' })
        .send(updatedMeal)
        .expect(400)
    })

    it('should deny bad formatted meal objects', async () => {
      const token = await authenticate()
      const [meal] = newMeal()

      await request(app.server)
        .post('/meals')
        .auth(token, { type: 'bearer' })
        .send(meal)

      const response = await request(app.server)
        .get('/meals')
        .auth(token, { type: 'bearer' })

      const mealId = response.body.meals[0].id
      const [updatedMeal] = newMeal()

      await request(app.server)
        .put(`/meals/${mealId}`)
        .auth(token, { type: 'bearer' })
        .send({
          ...updatedMeal,
          datetime: '30/07/2023 23h18', // wrong date format
        })
        .expect(400)
    })

    it('should update meal details by its ID', async () => {
      const token = await authenticate()
      const [meal] = newMeal()

      await request(app.server)
        .post('/meals')
        .auth(token, { type: 'bearer' })
        .send(meal)

      const response = await request(app.server)
        .get('/meals')
        .auth(token, { type: 'bearer' })

      const mealId = response.body.meals[0].id
      const [updatedMeal] = newMeal()

      await request(app.server)
        .put(`/meals/${mealId}`)
        .auth(token, { type: 'bearer' })
        .send(updatedMeal)
        .expect(201)
    })

    it('should not update records by non-existing ID', async () => {
      const token = await authenticate()
      const [meal] = newMeal()

      await request(app.server)
        .post('/meals')
        .auth(token, { type: 'bearer' })
        .send(meal)

      const mealId = faker.string.uuid() // non-existing ID
      const [updatedMeal] = newMeal()

      await request(app.server)
        .put(`/meals/${mealId}`)
        .auth(token, { type: 'bearer' })
        .send(updatedMeal)
        .expect(404)
    })
  })

  describe('DELETE /meals/:mealId', () => {
    it('should deny unauthorized requests', async () => {
      const mealId = faker.string.uuid()

      await request(app.server).delete(`/meals/${mealId}`).expect(401)
    })

    it('should deny bad formatted UUID', async () => {
      const token = await authenticate()
      const mealId = 'bad-formatted-uuid'

      await request(app.server)
        .delete(`/meals/${mealId}`)
        .auth(token, { type: 'bearer' })
        .expect(400)
    })

    it('should not delete records by non-existing ID', async () => {
      const token = await authenticate()
      const mealId = faker.string.uuid() // non-existing ID

      await request(app.server)
        .delete(`/meals/${mealId}`)
        .auth(token, { type: 'bearer' })
        .expect(404)
    })

    it('should delete a meal record by its ID', async () => {
      const token = await authenticate()
      const [meal] = newMeal()

      await request(app.server)
        .post('/meals')
        .auth(token, { type: 'bearer' })
        .send(meal)

      const response = await request(app.server)
        .get('/meals')
        .auth(token, { type: 'bearer' })

      const mealId = response.body.meals[0].id

      await request(app.server)
        .delete(`/meals/${mealId}`)
        .auth(token, { type: 'bearer' })
        .expect(204)
    })
  })
})

async function authenticate() {
  const credentials = {
    name: 'Saul Goodman',
    username: 'itsallgoodman',
    password: '123123',
  }

  await request(app.server).post(`/sign-up`).send(credentials)

  const { username, password } = credentials

  const response = await request(app.server)
    .post('/sign-in')
    .send({ username, password })

  const { token } = response.body

  return token
}

function newMeal(quantity = 1) {
  const meals = []

  for (let i = 0; i < quantity; i++) {
    meals.push({
      name: faker.animal.cow(),
      description: faker.lorem.lines(1),
      diet: faker.datatype.boolean(),
      datetime: new Date(),
    })
  }

  return meals
}
