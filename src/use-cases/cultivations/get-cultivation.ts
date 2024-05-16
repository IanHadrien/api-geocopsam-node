import { CultivationsRepository } from '@/repositories/interfaces/cultivations-repository'
import { Cultivation } from '@prisma/client'

interface GetCultivationUseCaseResponse {
  cultivations: Cultivation[]
}

export class GetCultivationUseCase {
  constructor (private readonly cultivationsRepository: CultivationsRepository) {}

  async execute (): Promise<GetCultivationUseCaseResponse> {
    const cultivations = await this.cultivationsRepository.getAll()

    if (!cultivations) {
      // throw new ResourceNotFoundError()
      console.error('Cultivations not found')
    }

    return {
      cultivations
    }
  }
}
