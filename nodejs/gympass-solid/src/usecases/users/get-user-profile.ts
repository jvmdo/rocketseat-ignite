import { ResourceNotFoundError } from '../errors/resource-not-found'
import { IUsersRepository } from '@/repository/users-repository'

interface IGetUserProfileUseCase {
  userId: string
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ userId }: IGetUserProfileUseCase) {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return user
  }
}
