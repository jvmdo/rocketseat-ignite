import { IGymsRepository } from '../gyms-repository'
import { Gym } from '@prisma/client'

export class GymsRepository implements IGymsRepository {
  gyms: Gym[] = []

  async findById(gymId: string) {
    const gym = this.gyms.find((gym) => gym.id === gymId)

    return gym ?? null
  }
}
