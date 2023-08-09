import { CheckInsRepository } from '@/repository/in-memory/check-ins'
import { describe, it, beforeEach, expect, vi, afterAll } from 'vitest'
import { CheckInUseCase } from './check-in'
import { GymsRepository } from '@/repository/in-memory/gyms'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxAllowedDistanceError } from '../errors/max-allowed-distance'
import { MaxNumberOfCheckInsError } from '../errors/max-number-of-check-ins'

let checkInsRepository: CheckInsRepository
let gymsRepository: GymsRepository
let sut: CheckInUseCase

describe('Check Ins use case', () => {
  beforeEach(() => {
    checkInsRepository = new CheckInsRepository()
    gymsRepository = new GymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    vi.useFakeTimers()

    gymsRepository.create({
      id: 'gym-01',
      title: 'Strife',
      description: 'This burden tortures me deep in my soul',
      phone: '',
      latitude: new Decimal(-3.1216832),
      longitude: new Decimal(-60.0361888),
    })
  })

  afterAll(() => {
    vi.useRealTimers()
  })

  it('should be able to check users in', async () => {
    const checkIn = await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -3.1216832,
      userLongitude: -60.0361888,
    })

    expect(checkIn).toEqual(
      expect.objectContaining({
        id: expect.stringMatching(
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
        ),
      }),
    )
  })

  it('should not be able to check an user in twice per day', async () => {
    vi.setSystemTime(new Date('2023-08-08T21:46:33'))

    await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -3.1216832,
      userLongitude: -60.0361888,
    })

    await expect(
      sut.execute({
        userId: 'user-01',
        gymId: 'gym-01',
        userLatitude: -3.1216832,
        userLongitude: -60.0361888,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check users in on different days', async () => {
    vi.setSystemTime(new Date('2023-08-08T17:46:33'))

    await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -3.1216832,
      userLongitude: -60.0361888,
    })

    vi.setSystemTime(new Date('2023-08-09T21:46:33'))

    const checkIn = await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -3.1216832,
      userLongitude: -60.0361888,
    })

    expect(checkIn).toEqual(
      expect.objectContaining({
        id: expect.any(String),
      }),
    )
  })

  it('should not be able to check in out of range users', async () => {
    gymsRepository.create({
      id: 'gym-02',
      title: 'My anxiety is crawling',
      description: 'Out from deep within me',
      phone: 'It burns within as my throat begins to cauterize',
      latitude: new Decimal(-3.0928139),
      longitude: new Decimal(-60.0233933),
    })

    await expect(
      sut.execute({
        userId: 'user-01',
        gymId: 'gym-02',
        userLatitude: -3.1216832,
        userLongitude: -60.0361888,
      }),
    ).rejects.toBeInstanceOf(MaxAllowedDistanceError)
  })
})
