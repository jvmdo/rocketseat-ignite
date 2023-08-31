import { GymsRepository } from '@/repository/prisma/gyms'
import { FetchNearbyGymsUseCase } from '../gyms/fetch-nearby-gyms'

export function makeFetchNearbyGymsUseCase() {
  const gymsRepository = new GymsRepository()

  const useCase = new FetchNearbyGymsUseCase(gymsRepository)

  return useCase
}
