import { Plantation, Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { PlantationsRepository } from '../interfaces/plantation-repository'
import { PaginationType } from '@/@types/paginate'

export class PrismaPlantationsRepository implements PlantationsRepository {
  private async findMapDataByMappedAreaId (mappedAreaId: string): Promise<Array<{ lat: number, lng: number }>> {
    const maps = await prisma.mapLatLng.findMany({
      where: { mappedAreaId },
      orderBy: { position: 'asc' }
    })

    return maps.map(map => ({
      lat: parseFloat(map.lat),
      lng: parseFloat(map.lng)
    }))
  }

  async getAll (page: number, pageSize: number): Promise<PaginationType<Plantation>> {
    const skip = (page - 1) * pageSize
    const take = pageSize

    const [data, totalCount] = await Promise.all([
      prisma.plantation.findMany({
        skip,
        take,
        include: {
          user: true,
          cultivation: true,
          mappedArea: true
        }
      }),
      prisma.plantation.count()
    ])

    const dataWithMapData = await Promise.all(
      data.map(async (plantation) => {
        const mapData = await this.findMapDataByMappedAreaId(plantation.mappedAreaId)
        return { ...plantation, mapData }
      })
    )

    return { data: dataWithMapData, totalCount }
  }

  async findById (id: string) {
    const plantation = await prisma.plantation.findUnique({
      where: {
        id
      }
    })

    return plantation
  }

  async create (data: Prisma.PlantationCreateInput) {
    const plantation = await prisma.plantation.create({
      data
    })

    return plantation
  }

  async update (id: string, data: Prisma.PlantationUpdateInput) {
    const plantation = await prisma.plantation.update({
      where: { id },
      data
    })

    return plantation
  }

  async delete (id: string) {
    const Plantation = await prisma.plantation.delete({
      where: { id }
    })

    return Plantation
  }
}
