import createKnex, { Knex } from 'knex'
import { env } from './env/index.js'

export const knexConfig: Knex.Config = {
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

// ? Although TypeScript accuses an error, default knex instance is actually working
export const knex = createKnex(knexConfig)
