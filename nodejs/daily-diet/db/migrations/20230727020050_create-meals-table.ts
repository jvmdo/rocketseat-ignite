import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('meals', (table) => {
    table.uuid('id').defaultTo(knex.fn.uuid()).primary()
    table.string('name').notNullable()
    table.string('description').notNullable()
    table.boolean('diet').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.foreign('id', 'user_id').references('users.id')
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('meals')
}
