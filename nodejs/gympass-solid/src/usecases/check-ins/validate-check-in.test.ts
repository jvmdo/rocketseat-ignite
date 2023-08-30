import { describe, it, beforeEach, expect, vi, afterEach } from 'vitest'
import { ValidateCheckInUseCase } from './validate-check-in'
import { CheckInsRepository } from '@/repository/in-memory/check-ins'
import { ResourceNotFoundError } from '../errors/resource-not-found'
import { LateCheckInValidationError } from '../errors/late-check-in-validation-error'

let checkInsRepository: CheckInsRepository
let sut: ValidateCheckInUseCase

describe('Validate check in use case', () => {
  beforeEach(() => {
    checkInsRepository = new CheckInsRepository()
    sut = new ValidateCheckInUseCase(checkInsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate check-ins', async () => {
    const checkIn = await checkInsRepository.create({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    const validatedCheckIn = await sut.execute({
      checkInId: checkIn.id,
    })

    expect(validatedCheckIn.validatedAt).toBeTruthy()
    expect(validatedCheckIn.validatedAt).toEqual(expect.any(Date))
  })

  it('should not be able to validate non-existing check-ins', async () => {
    await expect(
      sut.execute({
        checkInId: 'not an actual check-in ID',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to validate check-ins created after past 20 minutes', async () => {
    vi.setSystemTime(new Date(2023, 7, 29, 17, 0, 0))

    const checkIn = await checkInsRepository.create({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    vi.advanceTimersByTime(1000 * 60 * 21) // 21 minutes

    expect(sut.execute({ checkInId: checkIn.id })).rejects.toBeInstanceOf(
      LateCheckInValidationError,
    )
  })
})
