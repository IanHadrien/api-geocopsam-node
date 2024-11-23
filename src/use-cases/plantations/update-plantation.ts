import { Plantation } from '@prisma/client'
import { NotFoundError } from '../errors/not-found-error'
import { UsersRepository } from '@/repositories/interfaces/users-repository'
import { PlantationsRepository } from '@/repositories/interfaces/plantation-repository'

interface UpdatePlantationUseCaseRequest {
  plantationId: string
  name?: string
  plantingDate?: Date
  previousCulture?: string

  userId?: string
  cultivationId?: string
  mappedAreaId?: string
}

interface UpdatePlantationUseCaseResponse {
  plantation: Plantation
}

export class UpdatePlantationUseCase {
  constructor (
    private readonly plantationsRepository: PlantationsRepository,
    private readonly usersRepository: UsersRepository
  ) {}

  async execute (
    {
      plantationId,
      name,
      plantingDate,
      previousCulture,
      cultivationId,
      mappedAreaId,
      userId
    }: UpdatePlantationUseCaseRequest): Promise<UpdatePlantationUseCaseResponse> {
    if (userId) {
      const user = await this.usersRepository.findById(userId)

      if (!user) {
        throw new Error('User not found')
      }
    }

    const plantation = await this.plantationsRepository.findById(plantationId)

    if (!plantation) {
      throw new NotFoundError()
    }

    const updateData: Partial<Plantation> = plantation

    if (name) updateData.name = name
    if (plantingDate) updateData.planting_date = plantingDate
    if (previousCulture) updateData.previous_culture = previousCulture
    if (cultivationId) updateData.cultivationId = cultivationId
    if (mappedAreaId) updateData.mappedAreaId = mappedAreaId
    if (userId) updateData.userId = userId

    const update = await this.plantationsRepository.update(plantationId, updateData)

    return {
      plantation: update
    }
  }
}
