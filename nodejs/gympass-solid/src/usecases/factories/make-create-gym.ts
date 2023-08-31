import { GymsRepository } from '@/repository/prisma/gyms'
import { CreateGymUseCase } from '../gyms/create-gym'

export function makeCreateGymUseCase() {
  const gymsRepository = new GymsRepository()

  const useCase = new CreateGymUseCase(gymsRepository)

  return useCase
}
