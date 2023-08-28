import { describe, it, beforeEach, expect } from 'vitest'
import { GymsRepository } from '@/repository/in-memory/gyms'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: GymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch nearby gyms use case', () => {
  beforeEach(() => {
    gymsRepository = new GymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'SmartFit',
      description: 'A very known gym franchise Brazil-wide',
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    await gymsRepository.create({
      title: 'SelFit',
      description: 'I like this name',
      phone: null,
      latitude: -27.0610928,
      longitude: -49.5229501,
    })

    const gyms = await sut.execute({
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    })

    expect(gyms.length).toBe(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'SmartFit' })])
  })
})
