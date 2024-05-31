import { PlantationsRepository } from '@/repositories/interfaces/plantation-repository'
import { Plantation } from '@prisma/client'

interface GetPlantationUseCaseResponse {
  plantations: Plantation[]
  from: number
  to: number
  page: number
  pageSize: number
  totalCount: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export class GetPlantationUseCase {
  constructor (private readonly plantationsRepository: PlantationsRepository) {}

  async execute (page: number, pageSize: number): Promise<GetPlantationUseCaseResponse> {
    const { data, totalCount } = await this.plantationsRepository.getAll(page, pageSize)

    if (!data) {
      console.error('Plantations not found')
    }

    const from = (page - 1) * pageSize + 1
    const to = from + data.length - 1
    const hasNextPage = to < totalCount
    const hasPreviousPage = from > 1

    return {
      plantations: data,
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
