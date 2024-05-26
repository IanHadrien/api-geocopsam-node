import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { MappedAreasRepository } from '../interfaces/mapped-area-repository'

export class PrismaMappedAreaRepository implements MappedAreasRepository {
  async getAll () {
    const mappedArea = await prisma.mappedArea.findMany()

    return mappedArea
  }

  async findById (id: string) {
    const mappedArea = await prisma.mappedArea.findUnique({
      where: {
        id
      }
    })

    return mappedArea
  }

  async create (data: Prisma.MappedAreaCreateInput) {
    const mappedArea = await prisma.mappedArea.create({
      data
    })

    return mappedArea
  }

  async update (id: string, data: Prisma.MappedAreaUpdateInput) {
    const mappedArea = await prisma.mappedArea.update({
      where: { id },
      data
    })

    return mappedArea
  }

  async delete (id: string) {
    const mappedArea = await prisma.mappedArea.delete({
      where: { id }
    })

    return mappedArea
  }
}
