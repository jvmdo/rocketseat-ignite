import { UsersRepository } from '@/repository/in-memory/users'
import { describe, expect, it } from 'vitest'
import { SignUpUseCase } from './sign-up'
import bcrypt from 'bcryptjs'
import { UserAlreadyExistsError } from '../errors/user-already-exists'

describe('Sign up use case', () => {
  it('should create a new user', async () => {
    const usersRepository = new UsersRepository()
    const signUpUseCase = new SignUpUseCase(usersRepository)

    const data = {
      name: 'Jane Doe',
      email: 'jane_doe@example.com',
      password: 'jane123',
    }

    const user = await signUpUseCase.execute(data)

    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

    expect(user).toHaveProperty('id')
    expect(user.id).toMatch(uuidRegex)
  })

  it('should hash the provided password', async () => {
    const usersRepository = new UsersRepository()
    const signUpUseCase = new SignUpUseCase(usersRepository)

    const data = {
      name: 'Jane Doe',
      email: 'jane_doe@example.com',
      password: 'jane123',
    }

    const user = await signUpUseCase.execute(data)

    const isPasswordCorrectlyHashed = await bcrypt.compare(
      data.password,
      user.passwordHash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should throw on duplicated emails', async () => {
    const usersRepository = new UsersRepository()
    const signUpUseCase = new SignUpUseCase(usersRepository)

    const data = {
      name: 'Jane Doe',
      email: 'jane_doe@example.com',
      password: 'jane123',
    }

    await signUpUseCase.execute(data)

    await expect(signUpUseCase.execute(data)).rejects.toBeInstanceOf(
      UserAlreadyExistsError,
    )

    try {
      await signUpUseCase.execute(data)
    } catch (error) {
      expect(error).toHaveProperty('statusCode', 409)
    }
  })
})
