import { FastifyInstance } from "fastify";
import { ZodError, z } from "zod";
import { knex } from "../database.js";
import { randomUUID } from "crypto";

const transactionBodySchema = z.object({
  title: z.string(),
  amount: z.number().gt(0),
  type: z.enum(['credit', 'debit']),
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
      await knex.insert({
        id: randomUUID(),
        title,
        amount: type === 'credit' ? amount : -amount,
      }).into('transactions')
    } catch (err) {
      return reply.status(500).send(err)
    }

    return reply.status(201).send()
  })
}