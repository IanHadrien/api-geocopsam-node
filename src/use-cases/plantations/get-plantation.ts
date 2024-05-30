import { PlantationsRepository } from '@/repositories/interfaces/plantation-repository'
import { Plantation } from '@prisma/client'

interface GetPlantationUseCaseResponse {
  plantations: Plantation[]
}

export class GetPlantationUseCase {
  constructor (private readonly plantationsRepository: PlantationsRepository) {}

  async execute (): Promise<GetPlantationUseCaseResponse> {
    const plantations = await this.plantationsRepository.getAll()

    if (!plantations) {
      // throw new ResourceNotFoundError()
      console.error('Plantations not found')
    }

    return {
      plantations
    }
  }
}
