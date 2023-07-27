import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table) => {
    table.uuid('id').defaultTo(knex.fn.uuid()).primary()
    table.string('name').notNullable()
    table.string('username').notNullable().unique()
    table.string('password').notNullable()
    table.string('avatar_url').defaultTo('https://picsum.photos/200')
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users')
}
