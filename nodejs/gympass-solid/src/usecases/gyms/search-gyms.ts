import { IGymsRepository } from '@/repository/gyms-repository'

interface ISearchGymsUseCase {
  query: string
  page: number
}

export class SearchGymsUseCase {
  constructor(private gymsRepository: IGymsRepository) {}

  async execute({ query, page }: ISearchGymsUseCase) {
    const gyms = await this.gymsRepository.findMany(query, page)

    return gyms
  }
}
