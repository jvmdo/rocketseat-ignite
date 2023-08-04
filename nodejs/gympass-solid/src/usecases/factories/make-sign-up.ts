import { UsersRepository } from '@/repository/prisma/users'
import { SignUpUseCase } from '../auth/sign-up'

export function makeSignUp() {
  const usersRepository = new UsersRepository()
  const signUpUseCase = new SignUpUseCase(usersRepository)

  return signUpUseCase
}
