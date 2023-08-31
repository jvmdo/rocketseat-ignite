import { CheckInsRepository } from '@/repository/prisma/check-ins'
import { GetCheckInMetricsByUserUseCase } from '../check-ins/get-check-in-metrics-by-user'

export function makeGetCheckInMetricsByUserUseCase() {
  const checkInsRepository = new CheckInsRepository()

  const useCase = new GetCheckInMetricsByUserUseCase(checkInsRepository)

  return useCase
}
