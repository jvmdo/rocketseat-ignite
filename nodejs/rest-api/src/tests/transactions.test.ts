import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest'
import { execSync } from 'node:child_process'
import { app } from '../app.js'
import request from 'supertest'
import { randomUUID } from 'node:crypto'

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

  describe('GET /transactions', () => {
    it('should refuse unauthorized requests', async () => {
      await request(app.server).get('/transactions').expect(401)
    })

    it('should return all transactions of a single user', async () => {
      const postResponse = await request(app.server)
        .post('/transactions')
        .send({
          title: 'New transaction',
          amount: 5000,
          type: 'credit',
        })

      const sessionId = postResponse.get('Set-Cookie')

      const transactionsResponse = await request(app.server)
        .get('/transactions')
        .set('Cookie', sessionId)
        .expect(200)

      expect(transactionsResponse.body.transactions).toEqual([
        expect.objectContaining({
          title: 'New transaction',
          amount: 5000,
        }),
      ])
    })
  })

  describe('GET /transactions/:id', () => {
    it('should refuse unauthorized request', async () => {
      await request(app.server).get(`/transactions/${randomUUID()}`).expect(401)
    })

    it('should handle params schema validation', async () => {
      const postResponse = await request(app.server)
        .post('/transactions')
        .send({
          title: 'New transaction',
          amount: 5000,
          type: 'credit',
        })

      const sessionId = postResponse.get('Set-Cookie')

      await request(app.server)
        .get(`/transactions/wrong-uuid-value`)
        .set('Cookie', sessionId)
        .expect(400)
    })

    it('should return the matching transaction', async () => {
      const postResponse = await request(app.server)
        .post('/transactions')
        .send({
          title: 'New transaction',
          amount: 5000,
          type: 'credit',
        })

      const sessionId = postResponse.get('Set-Cookie')

      const transactionsResponse = await request(app.server)
        .get('/transactions')
        .set('Cookie', sessionId)

      const transaction = transactionsResponse.body.transactions[0]

      await request(app.server)
        .get(`/transactions/${transaction.id}`)
        .set('Cookie', sessionId)
        .expect(200)

      expect(transaction).toEqual(
        expect.objectContaining({
          title: 'New transaction',
          amount: 5000,
        }),
      )
    })
  })

  describe('GET /transaction/summary', () => {
    it('should refuse unauthorized requests', async () => {
      await request(app.server).get('/transactions/summary').expect(401)
    })

    it('should return the summary of a single user', async () => {
      const postResponse1 = await request(app.server)
        .post('/transactions')
        .send({
          title: 'Post 1',
          amount: 12000,
          type: 'credit',
        })

      const sessionId = postResponse1.get('Set-Cookie')

      const postResponse2 = await request(app.server)
        .post('/transactions')
        .set('Cookie', sessionId)
        .send({
          title: 'Post 2',
          amount: 8000,
          type: 'debit',
        })

      const summaryResponse = await request(app.server)
        .get('/transactions/summary')
        .set('Cookie', sessionId)
        .expect(200)

      expect(summaryResponse.body.summary).toEqual(
        expect.objectContaining({
          amount: 4000,
        }),
      )
    })
  })
})
