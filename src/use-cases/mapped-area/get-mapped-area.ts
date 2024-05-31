import { MappedAreasRepository } from '@/repositories/interfaces/mapped-area-repository'
import { MappedArea } from '@prisma/client'

interface GetMappedAreaUseCaseResponse {
  mappedAreas: MappedArea[]
  from: number
  to: number
  page: number
  pageSize: number
  totalCount: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export class GetMappedAreaUseCase {
  constructor (private readonly mappedAreasRepository: MappedAreasRepository) {}

  async execute (page: number, pageSize: number): Promise<GetMappedAreaUseCaseResponse> {
    const { data, totalCount } = await this.mappedAreasRepository.getAll(page, pageSize)

    if (!data) {
      // throw new ResourceNotFoundError()
      console.error('MappedArea not found')
    }

    const from = (page - 1) * pageSize + 1
    const to = from + data.length - 1
    const hasNextPage = to < totalCount
    const hasPreviousPage = from > 1

    return {
      mappedAreas: data,
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
