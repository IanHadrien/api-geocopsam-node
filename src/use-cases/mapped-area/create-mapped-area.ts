import { UsersRepository } from '@/repositories/interfaces/users-repository'
import { MappedArea } from '@prisma/client'
import { MappedAreasRepository } from '@/repositories/interfaces/mapped-area-repository'

interface CreateMappedAreaUseCaseRequest {
  name: string
  geospatialData: string
  totalArea: string
  centerPont?: string

  userId: string
}

interface CreateMappedAreaUseCaseResponse {
  mappedArea: MappedArea
}

export class CreateMappedAreaUseCase {
  constructor (
    private readonly mappedAreasRepository: MappedAreasRepository,
    private readonly usersRepository: UsersRepository
  ) {}

  async execute (
    {
      name,
      geospatialData,
      totalArea,
      centerPont,
      userId
    }: CreateMappedAreaUseCaseRequest): Promise<CreateMappedAreaUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new Error('User not found')
    }

    const mappedArea = await this.mappedAreasRepository.create({
      name,
      geospatial_data: geospatialData,
      total_area: totalArea,
      center_pont: centerPont,
      user: {
        connect: { id: userId }
      }
    })

    return {
      mappedArea
    }
  }
}
