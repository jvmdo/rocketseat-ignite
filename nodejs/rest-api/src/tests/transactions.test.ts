import { describe, it, beforeAll, afterAll, beforeEach } from 'vitest'
import { execSync } from 'node:child_process'
import { app } from '../app.js'
import request from 'supertest'

describe('Transactions routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    // Fresh new database for each test
    execSync('npm run knex -- migrate:rollback --all')
    execSync('npm run knex -- migrate:latest')
  })

  describe('POST /transactions', () => {
    it('should create a new transaction', async () => {
      await request(app.server)
        .post('/transactions')
        .send({
          title: 'New test transaction',
          amount: 5000,
          type: 'credit',
        })
        .expect(201)
    })

    it('should handle body schema validation', async () => {
      await request(app.server)
        .post('/transactions')
        .send({
          title: 'Bad formatted transactions',
          amount: '-777',
          type: 'débito',
        })
        .expect(404)
    })
  })
})
