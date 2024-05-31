import { CultivationsRepository } from '@/repositories/interfaces/cultivations-repository'
import { Cultivation } from '@prisma/client'

interface GetCultivationUseCaseResponse {
  cultivations: Cultivation[]
  from: number
  to: number
  page: number
  pageSize: number
  totalCount: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export class GetCultivationUseCase {
  constructor (private readonly cultivationsRepository: CultivationsRepository) {}

  async execute (page: number, pageSize: number): Promise<GetCultivationUseCaseResponse> {
    const { data, totalCount } = await this.cultivationsRepository.getAll(page, pageSize)

    if (!data) {
      console.error('Cultivations not found')
    }

    const from = (page - 1) * pageSize + 1
    const to = from + data.length - 1
    const hasNextPage = to < totalCount
    const hasPreviousPage = from > 1

    return {
      cultivations: data,
      from,
      to,
      page,
      pageSize,
      totalCount,
      hasNextPage,
      hasPreviousPage
    }
  }
}
