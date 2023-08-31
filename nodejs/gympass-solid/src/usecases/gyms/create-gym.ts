import { IGymsRepository } from '@/repository/gyms-repository'

interface ICreateGymUseCase {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

export class CreateGymUseCase {
  constructor(private gymsRepository: IGymsRepository) {}

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: ICreateGymUseCase) {
    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    })

    return gym
  }
}
