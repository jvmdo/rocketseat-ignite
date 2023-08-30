import { Gym, Prisma } from '@prisma/client'
import { FindManyNearbyParams, IGymsRepository } from '../gyms-repository'
import { prisma } from '@/lib/prisma'

export class GymsRepository implements IGymsRepository {
  async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({
      data,
    })

    return gym
  }

  async findById(gymId: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id: gymId,
      },
    })

    return gym
  }

  async findMany(query: string, page: number) {
    const gyms = await prisma.gym.findMany({
      skip: (page - 1) * 20,
      take: 20,
      where: {
        title: {
          contains: query,
        },
      },
    })

    return gyms
  }

  async findManyNearby({ latitude, longitude }: FindManyNearbyParams) {
    const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT * FROM gyms
      WHERE ( 
        6371 * 
        acos( 
          cos( radians(${latitude}) ) * 
          cos( radians( latitude ) ) * 
          cos( radians( longitude ) - radians(${longitude}) ) + 
          sin( radians(${latitude}) ) * 
          sin( radians( latitude ) ) 
        ) 
      ) <= 10
    `

    return gyms
  }
}
