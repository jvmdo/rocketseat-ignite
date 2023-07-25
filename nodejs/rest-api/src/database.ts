import createKnex, { Knex } from 'knex'
import { env } from './env/index.js'

export const knexConfig: Knex.Config = {
  client: env.DATABASE_CLIENT,
  connection:
    env.DATABASE_CLIENT === 'sqlite'
      ? {
          filename: env.DATABASE_URL,
        }
      : env.DATABASE_URL,
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
}

// ? Although TypeScript accuses an error, default knex instance is actually working
export const knex = createKnex(knexConfig)
