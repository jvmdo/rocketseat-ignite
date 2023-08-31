import { CheckInsRepository } from '@/repository/prisma/check-ins'
import { CheckInUseCase } from '../check-ins/check-in'
import { GymsRepository } from '@/repository/prisma/gyms'

export function makeCheckInUseCase() {
  const checkInsRepository = new CheckInsRepository()
  const gymsRepository = new GymsRepository()

  const useCase = new CheckInUseCase(checkInsRepository, gymsRepository)

  return useCase
}
