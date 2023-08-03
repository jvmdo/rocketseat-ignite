import { UsersRepository } from '@/repository/prisma/users'
import bcrypt from 'bcryptjs'
import { UserAlreadyExistsError } from '../errors/user-already-exists'

interface ISignUpUseCase {
  name: string
  email: string
  password: string
}

export class SignUpUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: ISignUpUseCase) {
    const userExists = await this.usersRepository.findByEmail(email)

    if (userExists) {
      throw new UserAlreadyExistsError()
    }

    const passwordHash = await bcrypt.hash(password, 6)

    const user = await this.usersRepository.create({
      name,
      email,
      passwordHash,
    })

    return user
  }
}
