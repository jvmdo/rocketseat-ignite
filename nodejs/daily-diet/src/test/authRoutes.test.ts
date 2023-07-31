import { execSync } from 'child_process'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
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
    it('should create a new user', async () => {
      const credentials = {
        name: 'Saul Goodman',
        username: 'itsallgoodman',
        password: '123123',
      }

      await request(app.server).post(`/sign-up`).send(credentials).expect(201)
    })

    it('should reject creating two accounts with the same username', async () => {
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

  describe('POST /sign-in', () => {
    it('should sign an user in and return the access token', async () => {
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
        .expect(200)

      expect(response.body).toEqual(
        expect.objectContaining({
          message: 'You are signed in.',
          token: expect.stringMatching(
            /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/,
          ),
        }),
      )
    })

    it('should reject signing in with wrong credentials values', async () => {
      const credentials = {
        name: 'Saul Goodman',
        username: 'itsallgoodman',
        password: '123123',
      }

      await request(app.server).post(`/sign-up`).send(credentials)

      await request(app.server)
        .post('/sign-in')
        .send({
          username: 'notgoodman',
          password: 'wrong-password',
        })
        .expect(401)
    })

    it('should reject signing in with wrong credentials format', async () => {
      const credentials = {
        name: 'Saul Goodman',
        username: 'itsallgoodman',
        password: '123123',
      }

      await request(app.server).post(`/sign-up`).send(credentials)

      await request(app.server)
        .post('/sign-in')
        .send({
          username: 'notgoodman',
          password: 123123, // should be string
        })
        .expect(400)
    })

    it('should deny sign-in for non-existent users', async () => {
      const credentials = {
        name: 'Saul Goodman',
        username: 'itsallgoodman',
        password: '123123',
      }

      // ? The account is not registered
      // await request(app.server).post(`/sign-up`).send(credentials)

      const { username, password } = credentials

      await request(app.server)
        .post('/sign-in')
        .send({ username, password })
        .expect(401)
    })
  })
})
