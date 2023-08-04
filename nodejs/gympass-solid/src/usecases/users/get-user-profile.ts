import { UsersRepository } from '@/repository/prisma/users'
import { ResourceNotFoundError } from '../errors/resource-not-found'

interface IGetUserProfile {
  userId: string
}

export class GetUserProfile {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ userId }: IGetUserProfile) {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return user
  }
}
