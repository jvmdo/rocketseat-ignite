import { UsersRepository } from '@/repository/prisma/users'
import { InvalidCredentialsError } from '../errors/invalid-credentials'
import bcrypt from 'bcryptjs'

interface ISignInUseCase {
  email: string
  password: string
}

export class SignInUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email, password }: ISignInUseCase) {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError(
        'Invalid email and password combination.',
      )
    }

    const doesPasswordsMatch = await bcrypt.compare(password, user.passwordHash)

    if (!doesPasswordsMatch) {
      throw new InvalidCredentialsError(
        'Invalid email and password combination.',
      )
    }

    return user
  }
}
