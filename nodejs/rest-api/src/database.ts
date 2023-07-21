import Knex from 'knex'

export const knex = Knex.default({
  client: 'sqlite3',
  connection: {
    filename: './app.db',
  },
  useNullAsDefault: true,
})
