import { Plantation } from '@prisma/client'
import { NotFoundError } from '../errors/not-found-error'
import { PlantationsRepository } from '@/repositories/interfaces/plantation-repository'

interface DeletePlantationUseCaseRequest {
  plantationId: string
}

interface DeletePlantationUseCaseResponse {
  plantation: Plantation
}

export class DeletePlantationUseCase {
  constructor (private readonly plantationsRepository: PlantationsRepository) {}

  async execute (
    {
      plantationId
    }: DeletePlantationUseCaseRequest): Promise<DeletePlantationUseCaseResponse> {
    const plantation = await this.plantationsRepository.findById(plantationId)

    if (!plantation) {
      throw new NotFoundError()
    }

    const deleteResult = await this.plantationsRepository.delete(plantationId)

    return {
      plantation: deleteResult
    }
  }
}
