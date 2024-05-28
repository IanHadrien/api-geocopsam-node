import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { MapRepository } from '../interfaces/map-repository'

export class PrismaMapRepository implements MapRepository {
  async createMany (data: Prisma.MapLatLngCreateManyInput[]) {
    const mappedAreas = await prisma.mapLatLng.createMany({ data })

    return mappedAreas
  }
}
