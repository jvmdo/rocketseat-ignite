import { UsersRepository } from '@/repository/prisma/users'
import { SignInUseCase } from '../auth/sign-in'

export function makeSignInUseCase() {
  const usersRepository = new UsersRepository()
  const signInUseCase = new SignInUseCase(usersRepository)

  return signInUseCase
}
