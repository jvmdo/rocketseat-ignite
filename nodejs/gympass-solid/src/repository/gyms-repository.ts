import { Gym } from '@prisma/client'

export interface IGymsRepository {
  findById(gymId: string): Promise<Gym | null>
}
