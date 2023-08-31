import { GymsRepository } from '@/repository/prisma/gyms'
import { SearchGymsUseCase } from '../gyms/search-gyms'

export function makeSearchGymsUseCase() {
  const gymsRepository = new GymsRepository()

  const useCase = new SearchGymsUseCase(gymsRepository)

  return useCase
}
