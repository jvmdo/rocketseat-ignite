import { GymsRepository } from '@/repository/in-memory/gyms'

interface IFetchNearbyGymsUseCase {
  userLatitude: number
  userLongitude: number
}

export class FetchNearbyGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({ userLatitude, userLongitude }: IFetchNearbyGymsUseCase) {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return gyms
  }
}
