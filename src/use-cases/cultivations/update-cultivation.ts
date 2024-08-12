import { CultivationsRepository } from '@/repositories/interfaces/cultivations-repository'
import { Cultivation } from '@prisma/client'
import { NotFoundError } from '../errors/not-found-error'

interface UpdateCultivationUseCaseRequest {
  cultivationId: string
  name?: string
  description?: string
  probableHarvestDate?: string
}

interface UpdateCultivationUseCaseResponse {
  cultivation: Cultivation
}

export class UpdateCultivationUseCase {
  constructor (private readonly cultivationRepository: CultivationsRepository) {}

  async execute (
    {
      cultivationId,
      name,
      description,
      probableHarvestDate
    }: UpdateCultivationUseCaseRequest): Promise<UpdateCultivationUseCaseResponse> {
    const cultivation = await this.cultivationRepository.findById(cultivationId)

    if (!cultivation) {
      throw new NotFoundError()
    }

    const updateData: Partial<Cultivation> = cultivation

    if (name) updateData.name = name
    if (description) updateData.description = description
    if (probableHarvestDate) updateData.probable_harvest_date = probableHarvestDate

    const updateCultivation = await this.cultivationRepository.update(cultivationId, updateData)

    return {
      cultivation: updateCultivation
    }
  }
}
