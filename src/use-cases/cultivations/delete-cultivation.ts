import { Cultivation } from '@prisma/client'
import { NotFoundError } from '../errors/not-found-error'
import { CultivationsRepository } from '@/repositories/interfaces/cultivations-repository'

interface DeleteCultivationUseCaseResquest {
  cultivationId: string
}

interface DeleteCultivationUseCaseResponse {
  cultivation: Cultivation
}

export class DeleteCultivationUseCase {
  constructor (private readonly cultivationsRepository: CultivationsRepository) {}

  async execute ({
    cultivationId
  }: DeleteCultivationUseCaseResquest): Promise<DeleteCultivationUseCaseResponse> {
    const cultivation = await this.cultivationsRepository.findById(cultivationId)

    if (!cultivation) {
      throw new NotFoundError()
    }

    const cultivationResult = await this.cultivationsRepository.delete(cultivationId)

    return { cultivation: cultivationResult }
  }
}
