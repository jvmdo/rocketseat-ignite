import { CheckInsRepository } from '@/repository/prisma/check-ins'
import { FetchCheckInsUseCase } from '../check-ins/fetch-check-ins-history'

export function makeFetchCheckInsHistoryUseCase() {
  const checkInsRepository = new CheckInsRepository()

  const useCase = new FetchCheckInsUseCase(checkInsRepository)

  return useCase
}
