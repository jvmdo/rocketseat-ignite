import { describe, it, beforeEach, expect } from 'vitest'
import { CheckInsRepository } from '@/repository/in-memory/check-ins'
import { GetUserMetricsUseCase } from './get-user-metrics'

let checkInsRepository: CheckInsRepository
let sut: GetUserMetricsUseCase

describe('Create Gym use case', () => {
  beforeEach(() => {
    checkInsRepository = new CheckInsRepository()
    sut = new GetUserMetricsUseCase(checkInsRepository)
  })

  it('should be able to get user metrics', async () => {
    for (let i = 0; i < 20; i++) {
      await checkInsRepository.create({
        gymId: 'How did you meet?',
        userId: `Don't tell me "it just happened"...`,
      })
    }

    const numberOfCheckIns = await sut.execute({
      userId: `Don't tell me "it just happened"...`,
    })

    expect(numberOfCheckIns).toBe(20)
  })
})
