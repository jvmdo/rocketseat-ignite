import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('meals', (table) => {
    table.uuid('user_id')
    table.foreign('user_id').references('users.id')
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('meals', (table) => {
    table.dropColumn('user_id')
    table.dropForeign('user_id')
  })
}
