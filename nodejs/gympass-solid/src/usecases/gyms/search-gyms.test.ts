import { describe, it, beforeEach, expect } from 'vitest'
import { SearchGymsUseCase } from './search-gyms'
import { GymsRepository } from '@/repository/in-memory/gyms'

let gymsRepository: GymsRepository
let sut: SearchGymsUseCase

describe('Search gyms use case', () => {
  beforeEach(() => {
    gymsRepository = new GymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms by title', async () => {
    await gymsRepository.create({
      title: 'SmartFit',
      description: 'A very known gym franchise Brazil-wide',
      phone: null,
      latitude: -3.1216832,
      longitude: -60.0361888,
    })

    await gymsRepository.create({
      title: 'SelFit',
      description: 'I like this name',
      phone: null,
      latitude: -3.1216832,
      longitude: -60.0361888,
    })

    const gyms = await sut.execute({ query: 'fit', page: 1 })

    expect(gyms.length).toBe(2)
    expect(gyms[0].title.toLowerCase()).includes('fit')
  })

  it('should be able to fetch paginated search results', async () => {
    for (let i = 0; i < 32; i++) {
      await gymsRepository.create({
        title: `MyGym ${i + 1}`,
        description: 'No pain, no gain.',
        phone: null,
        latitude: -3.1216832,
        longitude: -60.0361888,
      })
    }

    const gyms = await sut.execute({
      query: 'gym',
      page: 2,
    })

    expect(gyms.length).toBe(12)
    expect(gyms.at(-1)?.title).toBe('MyGym 32')
  })
})
