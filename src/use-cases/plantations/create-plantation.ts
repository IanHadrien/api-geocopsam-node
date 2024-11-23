import { UsersRepository } from '@/repositories/interfaces/users-repository'
import { Plantation } from '@prisma/client'
import { PlantationsRepository } from '@/repositories/interfaces/plantation-repository'

interface CreatePlantationUseCaseRequest {
  name: string
  plantingDate: Date
  previousCulture: string

  userId: string
  cultivationId: string
  mappedAreaId: string
}

interface CreatePlantationUseCaseResponse {
  plantation: Plantation
}

export class CreatePlantationUseCase {
  constructor (
    private readonly plantationsRepository: PlantationsRepository,
    private readonly usersRepository: UsersRepository
  ) {}

  async execute (
    {
      name,
      plantingDate,
      previousCulture,
      cultivationId,
      mappedAreaId,
      userId
    }: CreatePlantationUseCaseRequest): Promise<CreatePlantationUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new Error('User not found')
    }

    const plantation = await this.plantationsRepository.create({
      name,
      planting_date: plantingDate,
      previous_culture: previousCulture,
      mappedArea: {
        connect: { id: mappedAreaId }
      },
      user: {
        connect: { id: userId }
      },
      cultivation: {
        connect: { id: cultivationId }
      }
    })

    return {
      plantation
    }
  }
}
