import { CheckInsRepository } from '@/repository/in-memory/check-ins'

interface IFetchCheckInsUseCase {
  userId: string
  page: number
}

export class FetchCheckInsUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({ userId, page }: IFetchCheckInsUseCase) {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    return checkIns
  }
}
