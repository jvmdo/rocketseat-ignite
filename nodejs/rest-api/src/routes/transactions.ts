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
        })
        .into('transactions')
    } catch (err) {
      return reply.status(500).send(err)
    }

    return reply.status(201).send()
  })

  app.get('/', async (_, reply) => {
    let transactions

    try {
      transactions = await knex.select('*').from('transactions')
    } catch (err) {
      return reply.status(500).send(err)
    }

    return reply.status(200).send({ transactions })
  })

  app.get('/:id', async (request, reply) => {
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
        .where({ id: transactionParams.id })
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

  app.get('/summary', async (_, reply) => {
    let summary

    try {
      // summary = await knex.sum('amount', { as: 'amount' }).from('transactions').first()
      // summary = await knex.select({ amount: knex.sum('amount') }).from('transactions').first()
      summary = await knex.sum('amount as amount').from('transactions')
    } catch (err) {
      return reply.status(500).send(err)
    }

    return reply.status(200).send({ summary })
  })
}
