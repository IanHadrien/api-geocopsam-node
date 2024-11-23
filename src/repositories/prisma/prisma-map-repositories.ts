import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { MapRepository } from '../interfaces/map-repository'

export class PrismaMapRepository implements MapRepository {
  async getAll () {
    const maps = await prisma.mapLatLng.findMany({
      orderBy: {
        position: 'asc'
      }
    })

    const groupedMaps = maps.reduce<Record<string, Array<{ lat: number, lng: number }>>>((acc, map) => {
      const { mappedAreaId, lat, lng } = map
      if (!acc[mappedAreaId]) {
        acc[mappedAreaId] = []
      }
      acc[mappedAreaId].push({ lat: parseFloat(lat), lng: parseFloat(lng) })
      return acc
    }, {})

    // console.log(Object.values(groupedMaps))

    return Object.values(groupedMaps)
  }

  async findById (id: string) {
    const maps = await prisma.mapLatLng.findMany({
      where: {
        mappedAreaId: id
      },
      orderBy: {
        position: 'asc'
      }
    })

    const groupedMaps = maps.reduce<Record<string, Array<{ lat: number, lng: number }>>>((acc, map) => {
      const { mappedAreaId, lat, lng } = map
      if (!acc[mappedAreaId]) {
        acc[mappedAreaId] = []
      }
      acc[mappedAreaId].push({ lat: parseFloat(lat), lng: parseFloat(lng) })
      return acc
    }, {})

    return Object.values(groupedMaps)
  }

  async createMany (data: Prisma.MapLatLngCreateManyInput[]) {
    const mappedAreas = await prisma.mapLatLng.createMany({ data })

    return mappedAreas
  }
}
