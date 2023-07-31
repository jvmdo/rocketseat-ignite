import { execSync } from 'child_process'
import { afterAll, beforeAll, beforeEach, describe, it } from 'vitest'
import { app } from '../app'
import request from 'supertest'
import { faker } from '@faker-js/faker'

faker.seed(322)

describe('Meals CRUD routes', () => {
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
