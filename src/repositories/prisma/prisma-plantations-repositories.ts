import { Plantation, Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { PlantationsRepository } from '../interfaces/plantation-repository'
import { PaginationType } from '@/@types/paginate'

interface MapLatLng {
  lat: string
  lng: string
}

interface MapData {
  lat: number
  lng: number
}

interface FindMapDataResult {
  mapFormatted: MapData[]
  centerPoint: MapData
}

export class PrismaPlantationsRepository implements PlantationsRepository {
  private async findMapDataByMappedAreaId (mappedAreaId: string): Promise<FindMapDataResult> {
    const maps: MapLatLng[] = await prisma.mapLatLng.findMany({
      where: { mappedAreaId },
      orderBy: { position: 'asc' }
    })

    const mapFormatted: MapData[] = maps.map(map => ({
      lat: parseFloat(map.lat),
      lng: parseFloat(map.lng)
    }))

    let sumLat = 0
    let sumLng = 0
    const count = mapFormatted.length

    mapFormatted.forEach(coord => {
      sumLat += coord.lat
      sumLng += coord.lng
    })

    const centerPoint: MapData = {
      lat: sumLat / count,
      lng: sumLng / count
    }

    return { mapFormatted, centerPoint }
  }

  async getAll (page?: number, pageSize?: number, userId?: string | null, cultivationId?: string | null): Promise<PaginationType<Plantation>> {
    let skip: number | undefined
    let take: number | undefined

    if (page && pageSize) {
      skip = (page - 1) * pageSize
      take = pageSize
    }

    const whereClause: any = {}

    // Aplica os filtros se os parâmetros não forem nulos
    if (userId) {
      whereClause.userId = userId
    }

    if (cultivationId) {
      whereClause.cultivationId = cultivationId
    }

    const [data, totalCount] = await Promise.all([
      prisma.plantation.findMany({
        where: whereClause,
        skip,
        take,
        include: {
          user: true,
          cultivation: true,
          mappedArea: true
        },
        orderBy: {
          created_at: 'asc'
        }
      }),
      prisma.plantation.count({
        where: whereClause
      })
    ])

    const dataWithMapData = await Promise.all(
      data.map(async (plantation) => {
        const { mapFormatted, centerPoint } = await this.findMapDataByMappedAreaId(plantation.mappedAreaId)
        return { ...plantation, mapFormatted, centerPoint }
      })
    )

    console.log(dataWithMapData)

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
