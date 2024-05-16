import { MappedAreasRepository } from '@/repositories/interfaces/mapped-area-repository'
import { MappedArea } from '@prisma/client'

interface GetMappedAreaUseCaseResponse {
  mappedAreas: MappedArea[]
}

export class GetMappedAreaUseCase {
  constructor (private readonly mappedAreasRepository: MappedAreasRepository) {}

  async execute (): Promise<GetMappedAreaUseCaseResponse> {
    const mappedAreas = await this.mappedAreasRepository.getAll()

    if (!mappedAreas) {
      // throw new ResourceNotFoundError()
      console.error('MappedArea not found')
    }

    return {
      mappedAreas
    }
  }
}
