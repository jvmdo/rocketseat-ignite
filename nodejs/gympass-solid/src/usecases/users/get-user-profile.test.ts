import { describe, it, beforeEach, expect } from 'vitest'
import { GetUserProfileUseCase } from './get-user-profile'
import { UsersRepository } from '@/repository/in-memory/users'
import { hashSync } from 'bcryptjs'
import { ResourceNotFoundError } from '../errors/resource-not-found'

let usersRepository: UsersRepository
let sut: GetUserProfileUseCase

describe('Get user profile use case', () => {
  beforeEach(() => {
    usersRepository = new UsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('should retrieve an user profile by id', async () => {
    const data = {
      name: 'Everything S. Today',
      email: 'everything_sucks@today.com',
      passwordHash: hashSync('every_thing'),
    }

    const user = await usersRepository.create(data)

    const { id: userId } = user

    const record = await sut.execute({ userId })

    expect(record?.id).toBe(userId)
  })

  it('should raise not found error for non-existing id', async () => {
    await expect(
      sut.execute({ userId: 'non-existing-id' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)

    try {
      await sut.execute({ userId: 'non-existing-id' })
    } catch (error) {
      expect((error as ResourceNotFoundError).statusCode).toBe(404)
    }
  })
})
