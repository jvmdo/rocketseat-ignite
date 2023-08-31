import { ResourceNotFoundError } from '../errors/resource-not-found'
import { IUsersRepository } from '@/repository/users-repository'

interface IGetUserProfile {
  userId: string
}

export class GetUserProfile {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ userId }: IGetUserProfile) {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return user
  }
}
