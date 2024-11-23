import { MappedArea } from '@prisma/client'
import { NotFoundError } from '../errors/not-found-error'
import { MappedAreasRepository } from '@/repositories/interfaces/mapped-area-repository'
import { UsersRepository } from '@/repositories/interfaces/users-repository'

interface UpdateMappedAreaUseCaseRequest {
  mappedAreaId: string
  name?: string
  geospatialData?: string
  totalArea?: string
  centerPont?: string

  userId?: string
}

interface UpdateMappedAreaUseCaseResponse {
  mappedArea: MappedArea
}

export class UpdateMappedAreaUseCase {
  constructor (
    private readonly mappedAreasRepository: MappedAreasRepository,
    private readonly usersRepository: UsersRepository
  ) {}

  async execute (
    {
      mappedAreaId,
      centerPont,
      geospatialData,
      name,
      totalArea,
      userId
    }: UpdateMappedAreaUseCaseRequest): Promise<UpdateMappedAreaUseCaseResponse> {
    if (userId) {
      const user = await this.usersRepository.findById(userId)

      if (!user) {
        throw new Error('User not found')
      }
    }

    const mappedArea = await this.mappedAreasRepository.findById(mappedAreaId)

    if (!mappedArea) {
      throw new NotFoundError()
    }

    const updateData: Partial<MappedArea> = mappedArea

    if (name) updateData.name = name
    if (centerPont) updateData.center_pont = centerPont
    if (geospatialData) updateData.geospatial_data = geospatialData
    if (totalArea) updateData.total_area = totalArea
    if (userId) updateData.userId = userId

    const update = await this.mappedAreasRepository.update(mappedAreaId, updateData)

    return {
      mappedArea: update
    }
  }
}
