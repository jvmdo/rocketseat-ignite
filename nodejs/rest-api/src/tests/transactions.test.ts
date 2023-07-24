import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest'
import { execSync } from 'node:child_process'
import { env } from '../env/index.js'
import { app } from '../app.js'
import request from 'supertest'

describe('My very first test suite', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    // Fresh new database for each test
    execSync('npm run knex -- migrate:rollback --all')
    execSync('npm run knex -- migrate:latest')
  })

  it('should assert the current environment', () => {
    const response = request(app.server)
    expect(env.NODE_ENV).toEqual('test')
  })
})
