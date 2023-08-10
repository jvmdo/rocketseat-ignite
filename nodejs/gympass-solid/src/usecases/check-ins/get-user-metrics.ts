import { CheckInsRepository } from '@/repository/in-memory/check-ins'

interface IGetUserMetricsUseCase {
  userId: string
}

export class GetUserMetricsUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({ userId }: IGetUserMetricsUseCase) {
    const numberOfCheckIns = await this.checkInsRepository.countByUserId(userId)

    return numberOfCheckIns
  }
}
