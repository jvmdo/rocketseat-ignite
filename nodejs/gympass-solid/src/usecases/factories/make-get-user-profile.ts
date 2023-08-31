import { UsersRepository } from '@/repository/prisma/users'
import { GetUserProfile } from '../users/get-user-profile'

export function makeGetUserProfileUseCase() {
  const usersRepository = new UsersRepository()

  const useCase = new GetUserProfile(usersRepository)

  return useCase
}
