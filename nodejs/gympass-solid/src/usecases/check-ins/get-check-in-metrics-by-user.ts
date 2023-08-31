import { ICheckInsRepository } from '@/repository/check-ins-repository'

interface IGetUserMetricsUseCase {
  userId: string
}

export class GetCheckInMetricsByUserUseCase {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async execute({ userId }: IGetUserMetricsUseCase) {
    const numberOfCheckIns = await this.checkInsRepository.countByUserId(userId)

    return numberOfCheckIns
  }
}
