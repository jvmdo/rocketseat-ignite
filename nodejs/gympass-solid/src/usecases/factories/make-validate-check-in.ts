import { CheckInsRepository } from '@/repository/prisma/check-ins'
import { ValidateCheckInUseCase } from '../check-ins/validate-check-in'

export function makeValidateCheckInUseCase() {
  const checkInsRepository = new CheckInsRepository()

  const useCase = new ValidateCheckInUseCase(checkInsRepository)

  return useCase
}
