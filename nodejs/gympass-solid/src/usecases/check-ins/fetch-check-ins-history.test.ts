import { describe, it, beforeEach, expect } from 'vitest'
import { FetchCheckInsUseCase } from './fetch-check-ins-history'
import { CheckInsRepository } from '@/repository/in-memory/check-ins'

let checkInsRepository: CheckInsRepository
let sut: FetchCheckInsUseCase

describe('Create Gym use case', () => {
  beforeEach(() => {
    checkInsRepository = new CheckInsRepository()
    sut = new FetchCheckInsUseCase(checkInsRepository)
  })

  it('should be able to fetch user check-ins history', async () => {
    for (let i = 0; i < 20; i++) {
      await checkInsRepository.create({
        gymId: 'Gym Grey',
        userId: `What Am I actually felling?`,
      })
    }

    const checkIns = await sut.execute({
      userId: 'What Am I actually felling?',
      page: 1,
    })

    expect(checkIns.length).toBe(20)
    expect(checkIns[2]).toEqual(
      expect.objectContaining({
        userId: expect.stringMatching('What Am I actually felling?'),
      }),
    )
  })

  it('should be able to fetch paginated results', async () => {
    for (let i = 0; i < 32; i++) {
      await checkInsRepository.create({
        gymId: 'Gym Grey',
        userId: `What Am I actually felling?`,
        id: `Anxiety ${i}`,
      })
    }

    const checkIns = await sut.execute({
      userId: 'What Am I actually felling?',
      page: 2,
    })

    expect(checkIns[10]).toEqual(
      expect.objectContaining({
        id: expect.stringMatching('Anxiety 30'),
      }),
    )

    expect(checkIns[11].id).toBe('Anxiety 31')
  })
})
