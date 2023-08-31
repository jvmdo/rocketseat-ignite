import { ICheckInsRepository } from '@/repository/check-ins-repository'

interface IFetchCheckInsUseCase {
  userId: string
  page: number
}

export class FetchCheckInsUseCase {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async execute({ userId, page }: IFetchCheckInsUseCase) {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    return checkIns
  }
}
