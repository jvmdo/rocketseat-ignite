import { UsersRepository } from '@/repository/prisma/users'
import { GetUserProfileUseCase } from '../users/get-user-profile'

export function makeGetUserProfileUseCase() {
  const usersRepository = new UsersRepository()

  const useCase = new GetUserProfileUseCase(usersRepository)

  return useCase
}
