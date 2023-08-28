import { randomUUID } from 'node:crypto'
import { IGymsRepository } from '../gyms-repository'
import { Gym, Prisma } from '@prisma/client'

export class GymsRepository implements IGymsRepository {
  private gyms: Gym[] = []

  async create(data: Prisma.GymCreateInput) {
    const gym: Gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.description ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
    }

    this.gyms.push(gym)

    return gym
  }

  async findById(gymId: string) {
    const gym = this.gyms.find((gym) => gym.id === gymId)

    return gym ?? null
  }

  async findMany(query: string, page: number) {
    const gyms = this.gyms
      .filter((gym) => gym.title.toLowerCase().includes(query.toLowerCase()))
      .slice((page - 1) * 20, page * 20)

    return gyms
  }
}
