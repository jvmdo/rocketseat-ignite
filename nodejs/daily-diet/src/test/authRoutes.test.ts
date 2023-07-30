import { execSync } from 'child_process'
import { afterAll, beforeAll, beforeEach, describe, it } from 'vitest'
import { app } from '../app'
import request from 'supertest'

describe('Authentication routes', () => {
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

  describe('POST /sign-up', () => {
    it.skip('should create a new user', async () => {
      const credentials = {
        name: 'Saul Goodman',
        username: 'itsallgoodman',
        password: '123123',
      }

      await request(app.server).post(`/sign-up`).send(credentials).expect(201)
    })

    it.skip('should reject creating two accounts with the same username', async () => {
      const credentials = {
        name: 'Saul Goodman',
        username: 'itsallgoodman',
        password: '123123',
      }

      await request(app.server).post(`/sign-up`).send(credentials)
      await request(app.server).post(`/sign-up`).send(credentials).expect(409)
    })

    it('should reject creating an account with wrong credentials format', async () => {
      const credentials = {
        name: 'Saul Goodman',
        username: 'itsallgoodman',
        password: 123123, // should be string
      }

      await request(app.server).post(`/sign-up`).send(credentials).expect(400)
    })
  })
})
