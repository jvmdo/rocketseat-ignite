import { UsersRepository } from '@/repository/in-memory/users'
import { describe, it, beforeEach, expect } from 'vitest'
import { SignInUseCase } from './sign-in'
import { hashSync } from 'bcryptjs'
import { InvalidCredentialsError } from '../errors/invalid-credentials'

let usersRepository: UsersRepository
let sut: SignInUseCase

describe('Sign in use case', () => {
  beforeEach(() => {
    usersRepository = new UsersRepository()
    sut = new SignInUseCase(usersRepository)
  })

  it('should sign an user in', async () => {
    const credentials = {
      email: 'billy_joe@example.com',
      password: 'billy123',
    }

    const data = {
      name: 'Billy Joe',
      email: credentials.email,
      passwordHash: hashSync(credentials.password, 6),
    }

    await usersRepository.create(data)

    const user = await sut.execute({
      email: credentials.email,
      password: credentials.password,
    })

    expect(user).toHaveProperty(
      'id',
      expect.stringMatching(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
      ),
    )
  })

  it('should raise an error for invalid credentials', async () => {
    const credentials = {
      email: 'billy_joe@example.com',
      password: 'billy123',
    }

    const data = {
      name: 'Billy Joe',
      email: credentials.email,
      passwordHash: hashSync(credentials.password, 6),
    }

    await usersRepository.create(data)

    await expect(
      sut.execute({
        email: credentials.email,
        password: 'wrong-password',
      }),
    ).rejects.toThrowError(InvalidCredentialsError)

    try {
      await sut.execute({
        email: 'wrong-email',
        password: credentials.password,
      })
    } catch (error) {
      expect((error as InvalidCredentialsError).statusCode).toBe(401)
    }
  })
})
