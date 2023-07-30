import { execSync } from 'child_process'
import { afterAll, beforeAll, beforeEach, describe, it } from 'vitest'
import { app } from '../app'
import request from 'supertest'

describe('Authentication routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    execSync('npm run knex -- migrate:rollback --all')
    execSync('npm run knex -- migrate:latest')
  })
})
