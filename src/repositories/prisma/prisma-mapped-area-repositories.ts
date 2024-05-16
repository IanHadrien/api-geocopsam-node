import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { MappedAreasRepository } from '../interfaces/mapped-area-repository'

export class PrismaMappedAreaRepository implements MappedAreasRepository {
  async getAll () {
    const mappedArea = await prisma.mappedArea.findMany()

    return mappedArea
  }

  async create (data: Prisma.MappedAreaCreateInput) {
    const mappedArea = await prisma.mappedArea.create({
      data
    })

    return mappedArea
  }
}
