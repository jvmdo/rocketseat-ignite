import { GymsRepository } from '@/repository/in-memory/gyms'
import { describe, it, beforeEach, expect } from 'vitest'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: GymsRepository
let sut: CreateGymUseCase

describe('Create Gym use case', () => {
  beforeEach(() => {
    gymsRepository = new GymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to create a gym', async () => {
    const gym = await sut.execute({
      title: 'I dug a grave for me to lay in',
      description: 'Will this ever end?',
      phone: null,
      latitude: -3.1216832,
      longitude: -60.0361888,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
