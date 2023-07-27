import createKnex, { Knex } from 'knex'
import { env } from './env'

export const knexConfig: Knex.Config = {
  client: env.DATABASE_CLIENT,
  connection: {
    filename: 'db/app.db',
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: 'db/migrations',
  },
}

export const knex = createKnex(knexConfig)
