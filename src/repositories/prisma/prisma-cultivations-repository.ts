import { Cultivation, Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { CultivationsRepository } from '../interfaces/cultivations-repository'
import { PaginationType } from '@/@types/paginate'

export class PrismaCultivationsRepository implements CultivationsRepository {
  async findById (id: string) {
    const cultivation = await prisma.cultivation.findUnique({
      where: {
        id
      }
    })

    return cultivation
  }

  async getAll (page: number, pageSize: number): Promise<PaginationType<Cultivation>> {
    const skip = (page - 1) * pageSize
    const take = pageSize

    const [data, totalCount] = await Promise.all([
      prisma.cultivation.findMany({
        skip,
        take
      }),
      prisma.cultivation.count()
    ])

    return { data, totalCount }
  }

  async create (data: Prisma.CultivationCreateInput) {
    const cultivation = await prisma.cultivation.create({
      data
    })

    return cultivation
  }

  async update (id: string, data: Prisma.CultivationUpdateInput) {
    const cultivation = await prisma.cultivation.update({
      where: { id },
      data
    })

    return cultivation
  }

  async delete (id: string) {
    const cultivation = await prisma.cultivation.delete({
      where: { id }
    })

    return cultivation
  }
}
