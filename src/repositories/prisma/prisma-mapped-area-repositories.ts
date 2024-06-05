import { MappedArea, Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { MappedAreasRepository } from '../interfaces/mapped-area-repository'
import { PaginationType } from '@/@types/paginate'

export class PrismaMappedAreaRepository implements MappedAreasRepository {
  async getAll (page: number, pageSize: number): Promise<PaginationType<MappedArea>> {
    const skip = (page - 1) * pageSize
    const take = pageSize

    const [data, totalCount] = await Promise.all([
      prisma.mappedArea.findMany({
        skip,
        take,
        include: {
          user: true
        }
      }),
      prisma.mappedArea.count()
    ])

    return { data, totalCount }
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
