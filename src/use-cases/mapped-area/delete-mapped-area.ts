import { MappedArea } from '@prisma/client'
import { NotFoundError } from '../errors/not-found-error'
import { MappedAreasRepository } from '@/repositories/interfaces/mapped-area-repository'

interface DeleteMappedAreaUseCaseRequest {
  mappedAreaId: string
}

interface DeleteMappedAreaUseCaseResponse {
  mappedArea: MappedArea
}

export class DeleteMappedAreaUseCase {
  constructor (private readonly mappedAreasRepository: MappedAreasRepository) {}

  async execute (
    {
      mappedAreaId
    }: DeleteMappedAreaUseCaseRequest): Promise<DeleteMappedAreaUseCaseResponse> {
    const mappedArea = await this.mappedAreasRepository.findById(mappedAreaId)

    if (!mappedArea) {
      throw new NotFoundError()
    }

    const deleteResult = await this.mappedAreasRepository.delete(mappedAreaId)

    return {
      mappedArea: deleteResult
    }
  }
}
