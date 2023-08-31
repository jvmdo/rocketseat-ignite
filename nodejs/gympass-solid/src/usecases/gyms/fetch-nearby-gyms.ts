import { IGymsRepository } from '@/repository/gyms-repository'

interface IFetchNearbyGymsUseCase {
  userLatitude: number
  userLongitude: number
}

export class FetchNearbyGymsUseCase {
  constructor(private gymsRepository: IGymsRepository) {}

  async execute({ userLatitude, userLongitude }: IFetchNearbyGymsUseCase) {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return gyms
  }
}
