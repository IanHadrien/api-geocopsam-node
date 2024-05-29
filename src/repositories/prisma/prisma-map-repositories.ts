import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { MapRepository } from '../interfaces/map-repository'

export class PrismaMapRepository implements MapRepository {
  async getAll (id: string) {
    const maps = await prisma.mapLatLng.findMany({
      where: {
        mappedAreaId: id
      },
      select: {
        lat: true,
        lng: true
      }
    })

    return maps
  }

  async createMany (data: Prisma.MapLatLngCreateManyInput[]) {
    const mappedAreas = await prisma.mapLatLng.createMany({ data })

    return mappedAreas
  }
}
