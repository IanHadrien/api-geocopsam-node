import { CultivationsRepository } from '@/repositories/interfaces/cultivations-repository'
import { Cultivation } from '@prisma/client'

interface CreateCultivationUseCaseRequest {
  name: string
  description?: string
  color?: string
  probableHarvestDate: string
}

interface CreateCultivationUseCaseResponse {
  cultivation: Cultivation
}

export class CreateCultivationUseCase {
  constructor (private readonly cultivationRepository: CultivationsRepository) {}

  async execute (
    {
      name,
      description,
      probableHarvestDate,
      color
    }: CreateCultivationUseCaseRequest): Promise<CreateCultivationUseCaseResponse> {
    // Verificar se existe mais alguma platação com o mesmo nome

    const cultivation = await this.cultivationRepository.create({
      name,
      description,
      probable_harvest_date: probableHarvestDate,
      color
    })

    return {
      cultivation
    }
  }
}
