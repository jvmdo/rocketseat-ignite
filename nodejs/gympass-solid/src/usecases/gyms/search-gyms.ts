import { GymsRepository } from '@/repository/in-memory/gyms'

interface ISearchGymsUseCase {
  query: string
  page: number
}

export class SearchGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({ query, page }: ISearchGymsUseCase) {
    const gyms = await this.gymsRepository.findMany(query, page)

    return gyms
  }
}
