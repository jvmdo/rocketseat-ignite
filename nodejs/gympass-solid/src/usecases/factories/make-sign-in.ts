import { UsersRepository } from '@/repository/prisma/users'
import { SignInUseCase } from '../auth/sign-in'

export function makeSignIn() {
  const usersRepository = new UsersRepository()
  const signInUseCase = new SignInUseCase(usersRepository)

  return signInUseCase
}
