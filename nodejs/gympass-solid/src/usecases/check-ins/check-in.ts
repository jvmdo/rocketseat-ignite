import { ResourceNotFoundError } from '../errors/resource-not-found'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'
import { MaxAllowedDistanceError } from '../errors/max-allowed-distance'
import { MaxNumberOfCheckInsError } from '../errors/max-number-of-check-ins'
import { ICheckInsRepository } from '@/repository/check-ins-repository'
import { IGymsRepository } from '@/repository/gyms-repository'

interface ICheckInUseCase {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

export class CheckInUseCase {
  constructor(
    private checkInsRepository: ICheckInsRepository,
    private gymsRepository: IGymsRepository,
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: ICheckInUseCase) {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    const distanceFromUserToGym = getDistanceBetweenCoordinates(
      {
        latitude: userLatitude,
        longitude: userLongitude,
      },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    )

    const MAX_ALLOWED_DISTANCE_IN_KM = 0.1

    if (distanceFromUserToGym > MAX_ALLOWED_DISTANCE_IN_KM) {
      throw new MaxAllowedDistanceError()
    }

    const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if (checkInOnSameDate) {
      throw new MaxNumberOfCheckInsError()
    }

    const checkIn = await this.checkInsRepository.create({
      userId,
      gymId,
    })

    return checkIn
  }
}
