import { FastifyInstance } from 'fastify'
import { ZodError, z } from 'zod'
import { knex } from '../database.js'
import { randomUUID } from 'crypto'

const transactionBodySchema = z.object({
  title: z.string(),
  amount: z.number().gt(0),
  type: z.enum(['credit', 'debit']),
})

const transactionParamsSchema = z.object({
  id: z.string().uuid(),
})

export default async function (app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    let sessionId = request.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()
    }

    let transactionBody

    try {
      transactionBody = transactionBodySchema.parse(request.body)
    } catch (err) {
      return reply.status(404).send((err as ZodError).message)
    }

    const { title, amount, type } = transactionBody

    try {
      await knex
        .insert({
          id: randomUUID(),
          title,
          amount: type === 'credit' ? amount : -amount,
          session_id: sessionId,
        })
        .into('transactions')
    } catch (err) {
      return reply.status(500).send(err)
    }

    return reply.status(201).cookie('sessionId', sessionId).send()
  })

  app.get('/', async (request, reply) => {
    const sessionId = request.cookies.sessionId

    if (!sessionId) {
      return reply
        .status(401)
        .send('No active session. Create a transaction then try again')
    }

    let transactions

    try {
      transactions = await knex.select('*').from('transactions').where({
        session_id: sessionId,
      })
    } catch (err) {
      return reply.status(500).send(err)
    }

    return reply.status(200).send({ transactions })
  })

  app.get('/:id', async (request, reply) => {
    const sessionId = request.cookies.sessionId

    if (!sessionId) {
      return reply
        .status(401)
        .send('No active session. Create a transaction then try again')
    }

    let transactionParams

    try {
      transactionParams = transactionParamsSchema.parse(request.params)
    } catch (err) {
      return reply.status(400).send((err as ZodError).message)
    }

    let transaction

    try {
      transaction = await knex
        .select('*')
        .from('transactions')
        .where({
          id: transactionParams.id,
          session_id: sessionId,
        })
        .first()

      if (!transaction) {
        // no record found
        throw new Error(`No transaction found for id ${transactionParams.id}`)
      }
    } catch (err) {
      return reply.status(404).send(err)
    }

    return reply.status(200).send({ transaction })
  })

  app.get('/summary', async (request, reply) => {
    const sessionId = request.cookies.sessionId

    if (!sessionId) {
      return reply
        .status(401)
        .send('No active session. Create a transaction then try again')
    }

    let summary

    try {
      // summary = await knex.sum('amount', { as: 'amount' }).from('transactions').first()
      // summary = await knex.select({ amount: knex.sum('amount') }).from('transactions').first()
      summary = await knex
        .sum('amount as amount')
        .from('transactions')
        .where({
          session_id: sessionId,
        })
        .first()
    } catch (err) {
      return reply.status(500).send(err)
    }

    return reply.status(200).send({ summary })
  })
}
