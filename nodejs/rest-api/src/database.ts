import Knex from 'knex'
import { env } from './env/index.js'

export const knexConfig: Knex.Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: env.DATABASE_URL,
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
}

export const knex = Knex.default(knexConfig)
